// AskDate API smoke test (run against local docker compose)
const BASE = 'http://localhost:80/api';
let failures = 0;

function check(name, cond, extra = '') {
    if (cond) console.log(`  OK  ${name}`);
    else { failures++; console.log(`FAIL  ${name} ${extra}`); }
}

function decodeJwt(token) {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const p = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    // Normalize short/full-URI claim names
    p.role = p.role || p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    p.nameid = p.nameid || p['http://schemas.microsoft.com/ws/2008/06/identity/claims/nameidentifier'];
    return p;
}

async function api(path, { method = 'GET', token, profileId, body } = {}) {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (profileId) headers['X-Profile-Id'] = String(profileId);
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const res = await fetch(BASE + path, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch { json = text; }
    return { status: res.status, json };
}

const stamp = Date.now();
const adminEmail = `admin${stamp}@test.io`;
const userEmail = `user${stamp}@test.io`;
const password = 'Passw0rd!234';

async function registerAndLogin(email) {
    let r = await api('/User/register', { method: 'POST', body: { email, password, confirmPassword: password } });
    check(`register ${email}`, r.status === 200, `status=${r.status}`);
    r = await api('/User/login', { method: 'POST', body: { email, password } });
    check(`login ${email}`, r.status === 200 && r.json?.token, `status=${r.status}`);
    return r.json; // { token, refreshToken, userId }
}

async function addProfile(token, userId, first, last) {
    const r = await api('/Profile/add', { method: 'POST', token, body: { firstName: first, lastName: last, age: 0, gender: 'X', about: '', currentAvatar: '', status: 1, userId } });
    check(`profile add ${first}`, r.status === 200, `status=${r.status}`);
    return typeof r.json === 'number' ? r.json : Number(r.json);
}

async function run() {
    // 1. First user = admin
    const admin = await registerAndLogin(adminEmail);
    const adminClaims = decodeJwt(admin.token);
    check('first user role = Administrator', adminClaims.role === 'Administrator', adminClaims.role);
    const adminProfileId = await addProfile(admin.token, admin.userId, 'Ada', 'Admin');

    // 2. profileId claim in JWT after login (profile added after token issuance — refresh to re-embed)
    let r = await api('/User/refresh', { method: 'POST', body: { refreshToken: admin.refreshToken } });
    check('refresh ok', r.status === 200 && r.json?.token, `status=${r.status}`);
    const adminToken2 = r.json.token;
    const claims2 = decodeJwt(adminToken2);
    check('JWT contains profileId claim', String(claims2.profileId) === String(adminProfileId), JSON.stringify(claims2.profileId));

    // 3. Create group + note
    r = await api('/groups', { method: 'POST', token: adminToken2, profileId: adminProfileId, body: { name: 'Test Group' } });
    check('create group', r.status === 201, `status=${r.status}`);
    const groupId = r.json?.id;

    r = await api(`/groups/${groupId}`, { token: adminToken2, profileId: adminProfileId });
    const inviteLink = r.json?.inviteLink;
    check('get group + inviteLink', !!inviteLink);
    check('group participant has availabilityMode=0', r.json?.participants?.[0]?.availabilityMode === 0, JSON.stringify(r.json?.participants?.[0]));

    r = await api(`/groups/${groupId}/notes`, { method: 'POST', token: adminToken2, profileId: adminProfileId, body: { date: new Date().toISOString().split('T')[0] + 'T18:00:00Z' } });
    check('create note with time', r.status === 200 && r.json?.id, `status=${r.status}`);
    const noteId = r.json?.id;

    r = await api(`/groups/${groupId}/notes`, { token: adminToken2, profileId: adminProfileId });
    const notes = r.json;
    check('notes list has 1 note with time', Array.isArray(notes) && notes.length === 1 && notes[0].date.includes('T18:00'), JSON.stringify(notes?.[0]?.date));
    check('creator auto-confirmed', notes?.[0]?.confirmedProfileIds?.includes(adminProfileId) === true);

    // 4. Comments
    r = await api(`/notes/${noteId}/comments`, { method: 'POST', token: adminToken2, profileId: adminProfileId, body: { content: '<script>alert(1)</script> hello' } });
    check('add comment', r.status === 200 && r.json?.id, `status=${r.status}`);
    const commentId = r.json?.id;

    // 5. Second user joins, sets busy mode
    const user = await registerAndLogin(userEmail);
    const userProfileId = await addProfile(user.token, user.userId, 'Us', 'Er');
    r = await api('/User/refresh', { method: 'POST', body: { refreshToken: user.refreshToken } });
    const userToken = r.json.token;
    const userClaims = decodeJwt(userToken);
    check('second user role = User', userClaims.role === 'User', userClaims.role);
    check('second user has profileId claim', String(userClaims.profileId) === String(userProfileId), JSON.stringify(userClaims.profileId));

    r = await api(`/groups/invite/${inviteLink}`, { token: userToken, profileId: userProfileId });
    check('lookup group by invite', r.status === 200 && r.json?.id === groupId);

    r = await api(`/groups/${groupId}/participants`, { method: 'POST', token: userToken, profileId: userProfileId });
    check('join group', r.status === 200, `status=${r.status}`);

    r = await api(`/groups/${groupId}/availability-mode`, { method: 'PUT', token: userToken, profileId: userProfileId, body: { availabilityMode: 1 } });
    check('set availability mode = busy', r.status === 200, `status=${r.status}`);

    r = await api(`/groups/${groupId}`, { token: userToken, profileId: userProfileId });
    const me = r.json?.participants?.find(p => p.profileId === userProfileId);
    check('mode persisted = 1', me?.availabilityMode === 1, JSON.stringify(me));

    // 6. Unconfirm + confirm note
    r = await api(`/groups/${groupId}/notes/${noteId}/confirm`, { method: 'POST', token: userToken, profileId: userProfileId });
    check('confirm note', r.status === 200, `status=${r.status}`);
    r = await api(`/groups/${groupId}/notes/${noteId}/confirm`, { method: 'DELETE', token: userToken, profileId: userProfileId });
    check('unconfirm note', r.status === 204 || r.status === 200, `status=${r.status}`);

    // 7. Security: user cannot change admin's password (ownership check)
    r = await api(`/User/update?userId=${admin.userId}`, { method: 'PUT', token: userToken, body: { password: 'Hacked!123' } });
    check('own-password update forbidden for others', r.status === 403, `status=${r.status}`);

    // 8. Admin endpoints
    r = await api('/User/all', { token: userToken });
    check('/User/all forbidden for non-admin', r.status === 403, `status=${r.status}`);
    r = await api('/User/all', { token: adminToken2 });
    check('/User/all for admin', r.status === 200 && Array.isArray(r.json) && r.json.length === 2, `status=${r.status} len=${r.json?.length}`);

    r = await api(`/User/${admin.userId + 100000}/reset-password`, { method: 'PUT', token: adminToken2, body: {} });
    check('reset-password unknown user -> 400', r.status === 400, `status=${r.status}`);

    r = await api(`/User/${user.userId}/reset-password`, { method: 'PUT', token: adminToken2, body: {} });
    check('reset-password generates password', r.status === 200 && typeof r.json?.password === 'string' && r.json.password.length >= 8, JSON.stringify(r.json));

    // login with generated password
    r = await api('/User/login', { method: 'POST', body: { email: userEmail, password: r.json.password } });
    check('login with generated password', r.status === 200 && r.json?.token, `status=${r.status}`);

    // role change
    r = await api(`/User/${user.userId}/role`, { method: 'PUT', token: adminToken2, body: { role: 'Administrator' } });
    check('promote user to admin', r.status === 200, `status=${r.status}`);
    r = await api(`/User/${user.userId}/role`, { method: 'PUT', token: adminToken2, body: { role: 'User' } });
    check('demote user back', r.status === 200, `status=${r.status}`);
    r = await api(`/User/${admin.userId}/role`, { method: 'PUT', token: adminToken2, body: { role: 'User' } });
    check('cannot change own role', r.status === 400, `status=${r.status}`);

    // 9. SignalR hub negotiate (auth via access_token query param)
    const negotRes = await fetch('http://localhost:80/hub/negotiate?negotiateVersion=1&access_token=' + encodeURIComponent(userToken), { method: 'POST' });
    check('SignalR negotiate authorized', negotRes.status === 200, `status=${negotRes.status}`);
    const noAuth = await fetch('http://localhost:80/hub/negotiate?negotiateVersion=1', { method: 'POST' });
    check('SignalR negotiate unauthorized without token', noAuth.status === 401, `status=${noAuth.status}`);

    // 10. Comment cleanup + note delete
    r = await api(`/notes/${noteId}/comments/${commentId}`, { method: 'DELETE', token: adminToken2, profileId: adminProfileId });
    check('delete comment', r.status === 204 || r.status === 200, `status=${r.status}`);

    console.log(failures === 0 ? '\nALL PASSED' : `\n${failures} FAILURES`);
    process.exit(failures === 0 ? 0 : 1);
}

run().catch(e => { console.error('CRASH:', e); process.exit(1); });
