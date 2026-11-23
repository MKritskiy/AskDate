// AskDate API smoke test — run against a local `docker compose up` stack:
//   node smoke-test.mjs
// Creates its own test accounts and groups; existing data is left untouched.
import { execSync } from 'node:child_process';

const BASE = 'http://localhost:80/api';
const HUB = 'http://localhost:80/hub';
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
// Far-future dates so the test never collides with marks made by hand in the UI
const D1 = '2031-03-03', D2 = '2031-03-04';

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
    // 1. Admin account. On a fresh database the first user is promoted automatically;
    //    on an existing one the test grants the role the same way ADMIN_EMAIL would.
    let admin = await registerAndLogin(adminEmail);
    if (admin.userId === 1) {
        check('first registered user is Administrator', decodeJwt(admin.token).role === 'Administrator', decodeJwt(admin.token).role);
    } else {
        execSync(`docker exec askdate-users.db-1 psql -U postgres -d UserDB -c "UPDATE \\"Users\\" SET \\"Role\\"='Administrator' WHERE \\"Email\\"='${adminEmail}';"`, { stdio: 'pipe' });
        admin = (await api('/User/login', { method: 'POST', body: { email: adminEmail, password } })).json;
        check('promoted user is Administrator after re-login', decodeJwt(admin.token).role === 'Administrator');
    }
    const adminProfileId = await addProfile(admin.token, admin.userId, 'Ada', 'Admin');

    // 2. Refresh re-issues the token with the profileId claim (profile is created after the first login)
    let r = await api('/User/refresh', { method: 'POST', body: { refreshToken: admin.refreshToken } });
    check('refresh ok', r.status === 200 && r.json?.token, `status=${r.status}`);
    const adminToken = r.json.token;
    check('JWT contains profileId claim', String(decodeJwt(adminToken).profileId) === String(adminProfileId), JSON.stringify(decodeJwt(adminToken).profileId));

    // 3. Group with one timed note and a comment
    r = await api('/groups', { method: 'POST', token: adminToken, profileId: adminProfileId, body: { name: 'Smoke Group' } });
    check('create group', r.status === 201, `status=${r.status}`);
    const groupId = r.json.id;
    const inviteLink = r.json.inviteLink;

    r = await api(`/groups/${groupId}`, { token: adminToken, profileId: adminProfileId });
    check('member reads group', r.status === 200);
    check('participant has unmarkedDaysFree=false', r.json?.participants?.[0]?.unmarkedDaysFree === false, JSON.stringify(r.json?.participants?.[0]));

    r = await api(`/groups/${groupId}/notes`, { method: 'POST', token: adminToken, profileId: adminProfileId, body: { date: '2031-03-03T18:00:00Z' } });
    check('create note with time', r.status === 200 && r.json?.id, `status=${r.status}`);
    const noteId = r.json.id;

    r = await api(`/groups/${groupId}/notes`, { token: adminToken, profileId: adminProfileId });
    check('notes list has 1 timed note, creator confirmed', Array.isArray(r.json) && r.json.length === 1
        && r.json[0].date.includes('T18:00') && r.json[0].confirmedProfileIds?.includes(adminProfileId));

    r = await api(`/notes/${noteId}/comments`, { method: 'POST', token: adminToken, profileId: adminProfileId, body: { content: 'hello <script>alert(1)</script>' } });
    check('member adds comment', r.status === 200 && r.json?.id, `status=${r.status}`);
    const commentId = r.json.id;

    // 4. Second user with a group of their own
    const user = await registerAndLogin(userEmail);
    const userProfileId = await addProfile(user.token, user.userId, 'Us', 'Er');
    r = await api('/User/refresh', { method: 'POST', body: { refreshToken: user.refreshToken } });
    const userToken = r.json.token;
    check('second user role = User', decodeJwt(userToken).role === 'User', decodeJwt(userToken).role);
    check('second user has profileId claim', String(decodeJwt(userToken).profileId) === String(userProfileId));

    r = await api('/groups', { method: 'POST', token: userToken, profileId: userProfileId, body: { name: 'User Own Group' } });
    const ownGroupId = r.json.id;

    // 5. A logged-in user who is not a member must not reach the group by its id
    const U = { token: userToken, profileId: userProfileId };
    r = await api(`/groups/${groupId}`, U);                                   check('non-member: read group -> 403', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/notes`, U);                             check('non-member: read notes -> 403', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/availability`, U);                      check('non-member: read availability -> 403', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/notes`, { ...U, method: 'POST', body: { date: '2031-03-05T00:00:00Z' } });
    check('non-member: create note -> 403', r.status === 403, r.status);
    r = await api(`/groups/${ownGroupId}/notes/${noteId}/confirm`, { ...U, method: 'POST' });
    check('non-member: confirm foreign note via own group route -> 403', r.status === 403, r.status);
    r = await api(`/groups/${ownGroupId}/notes/${noteId}/title`, { ...U, method: 'PUT', body: { title: 'hacked' } });
    check('non-member: retitle foreign note via own group route -> 403', r.status === 403, r.status);
    r = await api(`/notes/${noteId}/comments`, U);                            check('non-member: read comments -> 403', r.status === 403, r.status);
    r = await api(`/notes/${noteId}/comments`, { ...U, method: 'POST', body: { content: 'spam' } });
    check('non-member: add comment -> 403', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/participants`, { ...U, method: 'POST' });
    check('join without invite link -> 403', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/participants`, { ...U, method: 'POST', body: { inviteLink: 'not-the-link' } });
    check('join with wrong invite link -> 403', r.status === 403, r.status);
    r = await api(`/groups/invite/${inviteLink}`, U);
    check('group can be looked up by invite link', r.status === 200 && r.json?.id === groupId, r.status);

    // 6. Join with the link
    r = await api(`/groups/${groupId}/participants`, { ...U, method: 'POST', body: { inviteLink } });
    check('join with invite link', r.status === 200, r.status);
    r = await api(`/groups/${groupId}`, U);
    check('new member reads group', r.status === 200 && r.json.participants?.length === 2, r.status);
    r = await api(`/groups/${groupId}/participants`, { ...U, method: 'POST', body: { inviteLink } });
    check('joining twice is a no-op', r.status === 200 && (await api(`/groups/${groupId}`, U)).json.participants.length === 2, r.status);

    // 7. Typed availability marks: whole days and time intervals
    const A = `/groups/${groupId}/availability`;
    const ADM = { token: adminToken, profileId: adminProfileId };
    const put = (auth, body) => api(A, { ...auth, method: 'PUT', body });
    const mine = async () => (await api(A, U)).json.filter(mark => mark.profileId === userProfileId);
    const shape = list => list.map(m => `${m.date.slice(5)} t${m.type} ${m.startTime || 'day'}-${m.endTime || ''}`).sort().join(' | ');

    r = await put(U, { dates: [D1, D2], type: 2 });
    check('set 2 whole days busy', r.status === 200 && r.json.length === 2 && r.json.every(m => m.type === 2 && m.startTime === null && m.endTime === null), JSON.stringify(r.json));

    r = await put(U, { dates: [D2], type: 1 });
    check('a whole-day mark replaces the other type on that day', r.status === 200 && r.json.length === 1 && r.json[0].date === D2 && r.json[0].type === 1, JSON.stringify(r.json));

    // the server cuts the other type around a new interval
    r = await put(U, { dates: [D2], type: 2, startTime: '10:00', endTime: '12:00' });
    check('busy interval cuts a free day', shape(r.json) === '03-04 t1 00:00-10:00 | 03-04 t1 12:00-24:00 | 03-04 t2 10:00-12:00', shape(r.json));

    // neighbours of the same type merge
    r = await put(U, { dates: [D2], type: 2, startTime: '11:30', endTime: '13:30' });
    check('overlapping busy intervals merge', shape(r.json) === '03-04 t1 00:00-10:00 | 03-04 t1 13:30-24:00 | 03-04 t2 10:00-13:30', shape(r.json));

    // 23:59 means "until the end of the day"
    r = await put(U, { dates: [D2], type: 2, startTime: '22:00', endTime: '23:59' });
    check('23:59 is midnight', shape(r.json) === '03-04 t1 00:00-10:00 | 03-04 t1 13:30-22:00 | 03-04 t2 10:00-13:30 | 03-04 t2 22:00-24:00', shape(r.json));
    const lateId = r.json.find(m => m.type === 2 && m.startTime === '22:00').id;
    const busyId = r.json.find(m => m.type === 2 && m.startTime === '10:00').id;

    // editing = removing the old mark and adding the new one in a single request
    r = await put(U, { dates: [D2], type: 2, startTime: '09:00', endTime: '11:00', replaceIds: [busyId] });
    // the hole left by the old mark is not free: free time is only what a mark says
    check('replaceIds moves a mark', shape(r.json) === '03-04 t1 00:00-09:00 | 03-04 t1 13:30-22:00 | 03-04 t2 09:00-11:00 | 03-04 t2 22:00-24:00', shape(r.json));

    // painting an existing interval again changes nothing, and an untouched mark keeps its id
    r = await put(U, { dates: [D2], type: 2, startTime: '22:00', endTime: '23:30' });
    check('re-adding an existing interval is a no-op that keeps ids', r.json.filter(m => m.type === 2).length === 2 && r.json.find(m => m.startTime === '22:00').id === lateId, shape(r.json));

    // a start without an end means until the end of the day (D1 is busy all day at this point)
    r = await put(U, { dates: [D1], type: 1, startTime: '18:00' });
    check('start without end runs until midnight', r.status === 200 && shape(r.json) === '03-03 t1 18:00-24:00 | 03-03 t2 00:00-18:00', shape(r.json));

    // a whole-day mark collapses the intervals of that day
    r = await put(U, { dates: [D2], type: 1 });
    check('whole-day mark collapses the intervals', r.json.length === 1 && r.json[0].type === 1 && r.json[0].startTime === null, JSON.stringify(r.json));

    // removing one mark leaves the others of that day untouched; the answer still lists them
    r = await put(U, { dates: [D2], type: 2, startTime: '09:00', endTime: '10:00' });
    const cutId = r.json.find(m => m.type === 2).id;
    r = await api(A, { ...U, method: 'DELETE', body: { ids: [cutId] } });
    check('remove by id keeps the other marks of that day', r.status === 200 && shape(r.json) === '03-04 t1 00:00-09:00 | 03-04 t1 10:00-24:00', shape(r.json));

    // other members' marks are visible, and cannot be removed with my requests
    r = await put(ADM, { dates: [D1], type: 2, startTime: '19:00', endTime: '20:00' });
    const adminMarkId = r.json[0].id;
    r = await api(A, U);
    check('members see each other\'s marks', r.status === 200 && r.json.some(m => m.profileId === adminProfileId && m.date === D1 && m.startTime === '19:00'), JSON.stringify(r.json));
    r = await api(A, { ...U, method: 'DELETE', body: { ids: [adminMarkId] } });
    check('cannot remove another member\'s mark', r.status === 200 && r.json.length === 0 && (await api(A, U)).json.some(m => m.id === adminMarkId) && (await mine()).length === 4, JSON.stringify(r.json));

    r = await api(A, { ...U, method: 'DELETE', body: { dates: [D1] } });
    check('remove by dates clears only my marks of that day', r.status === 200 && !r.json.some(m => m.date === D1) && (await api(A, U)).json.some(m => m.id === adminMarkId), JSON.stringify(r.json));

    r = await api(`${A}/all`, { ...U, method: 'DELETE' });
    r = await api(A, U);
    check('remove all clears only own marks', r.status === 200 && r.json.length === 1 && r.json[0].profileId === adminProfileId, JSON.stringify(r.json));

    // validation
    r = await put(U, { dates: [D1], type: 1, startTime: '9:00', endTime: '10:00' });
    check('time not in HH:mm -> 400', r.status === 400, r.status);
    r = await put(U, { dates: [D1], type: 1, startTime: '12:00', endTime: '10:00' });
    check('end before start -> 400', r.status === 400, r.status);
    r = await put(U, { dates: [D1], type: 1, startTime: '12:00', endTime: '12:00' });
    check('end equals start -> 400', r.status === 400, r.status);
    r = await put(U, { dates: [D1], type: 1, endTime: '12:00' });
    check('end without start -> 400', r.status === 400, r.status);
    r = await put(U, { dates: [D1], type: 1, startTime: '25:00', endTime: '26:00' });
    check('hour out of range -> 400', r.status === 400, r.status);
    r = await put(U, { dates: ['03-03-2031'], type: 1 });
    check('invalid date -> 400', r.status === 400, r.status);
    r = await put(U, { dates: [D1], type: 7 });
    check('invalid type -> 400', r.status === 400, r.status);
    r = await put(U, { dates: [], type: 1 });
    check('empty dates -> 400', r.status === 400, r.status);
    r = await put(U, { dates: Array.from({ length: 400 }, (_, i) => D1), type: 1 });
    check('too many dates -> 400', r.status === 400, r.status);
    r = await api(A, { ...U, method: 'DELETE', body: {} });
    check('remove without ids or dates -> 400', r.status === 400, r.status);

    await api(`${A}/all`, { ...ADM, method: 'DELETE' });   // leave the test group clean

    // 8. "Unmarked days are free" preference
    r = await api(`/groups/${groupId}/availability-default`, { ...U, method: 'PUT', body: { unmarkedDaysFree: true } });
    r = await api(`/groups/${groupId}`, U);
    check('unmarkedDaysFree=true persisted', r.json.participants.find(p => p.profileId === userProfileId)?.unmarkedDaysFree === true);
    r = await api(`/groups/${groupId}/availability-default`, { ...U, method: 'PUT', body: { unmarkedDaysFree: false } });
    r = await api(`/groups/${groupId}`, U);
    check('unmarkedDaysFree=false persisted', r.json.participants.find(p => p.profileId === userProfileId)?.unmarkedDaysFree === false);
    r = await api(`/groups/${groupId}/availability-mode`, { ...U, method: 'PUT', body: { availabilityMode: 1 } });
    check('legacy availability-mode endpoint is gone', r.status === 404, r.status);

    // 9. Expected refusals come back as typed ProblemDetails, not 500
    r = await api(`/groups/${groupId}/notes/${noteId}`, { ...U, method: 'DELETE' });
    check('non-creator deletes note -> 403 with detail', r.status === 403 && typeof r.json?.detail === 'string', `${r.status} ${JSON.stringify(r.json)}`);
    r = await api(`/groups/${groupId}`, { ...U, method: 'DELETE' });
    check('non-creator deletes group -> 403', r.status === 403, r.status);
    r = await api(`/groups/999999`, U);
    check('unknown group is not distinguishable from forbidden (403)', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/notes/999999/confirm`, { ...U, method: 'POST' });
    check('unknown note -> 404', r.status === 404, r.status);

    // 10. Member actions on notes
    r = await api(`/groups/${groupId}/notes/${noteId}/confirm`, { ...U, method: 'POST' });
    check('member confirms note', r.status === 200, r.status);
    r = await api(`/groups/${groupId}/notes/${noteId}/confirm`, { ...U, method: 'DELETE' });
    check('member unconfirms note', r.status === 204 || r.status === 200, r.status);

    // 10a. Leaving the group
    r = await api(`/groups/${groupId}/participants/${adminProfileId}`, { token: adminToken, profileId: adminProfileId, method: 'DELETE' });
    check('creator cannot leave own group -> 403', r.status === 403, r.status);
    r = await api(`/groups/${groupId}/notes/${noteId}/confirm`, { ...U, method: 'POST' });
    check('member can still act after refused leave', r.status === 200, r.status);

    // 11. Account security
    r = await api(`/User/update?userId=${admin.userId}`, { method: 'PUT', token: userToken, body: { password: 'Hacked!123' } });
    check('own-password update forbidden for others', r.status === 403, r.status);
    r = await api('/User/all', { token: userToken });
    check('/User/all forbidden for non-admin', r.status === 403, r.status);
    r = await api('/User/all', { token: adminToken });
    check('/User/all for admin', r.status === 200 && Array.isArray(r.json) && r.json.length >= 2, r.status);

    r = await api(`/User/${admin.userId + 100000}/reset-password`, { method: 'PUT', token: adminToken, body: {} });
    check('reset-password unknown user -> 400', r.status === 400, r.status);
    r = await api(`/User/${user.userId}/reset-password`, { method: 'PUT', token: adminToken, body: {} });
    check('reset-password generates password', r.status === 200 && typeof r.json?.password === 'string' && r.json.password.length >= 8, JSON.stringify(r.json));
    r = await api('/User/login', { method: 'POST', body: { email: userEmail, password: r.json.password } });
    check('login with generated password', r.status === 200 && r.json?.token, r.status);
    r = await api(`/User/${user.userId}/role`, { method: 'PUT', token: adminToken, body: { role: 'Administrator' } });
    check('promote user to admin', r.status === 200, r.status);
    r = await api(`/User/${user.userId}/role`, { method: 'PUT', token: adminToken, body: { role: 'User' } });
    check('demote user back', r.status === 200, r.status);
    r = await api(`/User/${admin.userId}/role`, { method: 'PUT', token: adminToken, body: { role: 'User' } });
    check('cannot change own role', r.status === 400, r.status);
    r = await api('/User/me', { token: adminToken });
    check('/User/me returns email and role', r.status === 200 && r.json?.email === adminEmail && r.json?.role === 'Administrator', JSON.stringify(r.json));

    // 12. Realtime hub is authenticated
    const negot = await fetch(`${HUB}/negotiate?negotiateVersion=1&access_token=${encodeURIComponent(userToken)}`, { method: 'POST' });
    check('SignalR negotiate authorized', negot.status === 200, negot.status);
    const noAuth = await fetch(`${HUB}/negotiate?negotiateVersion=1`, { method: 'POST' });
    check('SignalR negotiate unauthorized without token', noAuth.status === 401, noAuth.status);

    // 13. Cleanup
    r = await api(`/notes/${noteId}/comments/${commentId}`, { method: 'DELETE', token: adminToken, profileId: adminProfileId });
    check('delete comment', r.status === 204 || r.status === 200, r.status);

    console.log(failures === 0 ? '\nALL PASSED' : `\n${failures} FAILURES`);
    process.exit(failures === 0 ? 0 : 1);
}

run().catch(e => { console.error('CRASH:', e); process.exit(1); });
