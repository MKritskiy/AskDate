const API_URL = '/api';
const USERS_API_URL = 'http://localhost:50002/api';
window.token = localStorage.getItem('askdate_token') || '';
window.profileId = localStorage.getItem('askdate_profileId') || '';
window.currentGroupId = null;
window.currentGroupCreatorId = null;

window.appAlert = function(msg) {
    return new Promise(resolve => {
        document.getElementById('customDialogOverlay').classList.remove('hidden');
        document.getElementById('customDialogBox').classList.remove('hidden');
        document.getElementById('customDialogText').innerText = msg;
        const okBtn = document.getElementById('customDialogOk');
        const cancelBtn = document.getElementById('customDialogCancel');
        cancelBtn.classList.add('hidden');

        okBtn.onclick = () => {
            document.getElementById('customDialogOverlay').classList.add('hidden');
            resolve();
        };
    });
};

window.appConfirm = function(msg) {
    return new Promise(resolve => {
        document.getElementById('customDialogOverlay').classList.remove('hidden');
        document.getElementById('customDialogBox').classList.remove('hidden');
        document.getElementById('customDialogText').innerText = msg;
        const okBtn = document.getElementById('customDialogOk');
        const cancelBtn = document.getElementById('customDialogCancel');
        cancelBtn.classList.remove('hidden');

        // Remove existing listeners
        const newOk = okBtn.cloneNode(true);
        const newCancel = cancelBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOk, okBtn);
        cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

        newOk.onclick = () => {
            document.getElementById('customDialogOverlay').classList.add('hidden');
            resolve(true);
        };
        newCancel.onclick = () => {
            document.getElementById('customDialogOverlay').classList.add('hidden');
            resolve(false);
        };
    });
};

function toggleMobileMenu() {
    document.getElementById('mobileMenuDropdown').classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode) {
        localStorage.setItem('pending_join', joinCode);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (window.token && window.profileId) {
        checkAuth();
    } else {
        showView('loginView');
    }
});

function openModal(id) {
    if (document.getElementById('dayPanel')) closeDayPanel();
    document.getElementById('appOverlay').classList.remove('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function closeAllModals() {
    document.getElementById('appOverlay').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--accent)';
    toast.style.color = '#000';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.zIndex = '3000';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

function copyInviteLink() {
    const link = document.getElementById('groupInviteLink').innerText;
    const fullUrl = `${window.location.origin}/?join=${link}`;
    navigator.clipboard.writeText(fullUrl).then(() => showToast('Link copied!'));
}

async function fetchCurrentUserName() {
    try {
        const res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
            headers: { 'Authorization': `Bearer ${window.token}` }
        });
        if (res.ok) {
            const profile = await res.json();
            document.getElementById('headerUserName').innerText = `${profile.firstName} ${profile.lastName}`;
        }
    } catch(e) {}
}

function showView(viewId) {
    document.getElementById('loginView').classList.add('hidden');
    document.getElementById('registerView').classList.add('hidden');
    document.getElementById('mainView').classList.add('hidden');
    document.getElementById('navMenu').classList.add('hidden');

    document.getElementById(viewId).classList.remove('hidden');

    if (viewId === 'mainView') {
        document.getElementById('navMenu').classList.remove('hidden');
    }
}

async function registerUser() {
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const firstName = document.getElementById('regFirstName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();

    if (!email || !password || !firstName || !lastName) {
        return appAlert("Fill all registration fields");
    }

    try {
        const regRes = await fetch(`${USERS_API_URL}/User/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!regRes.ok) {
            return appAlert("Registration failed: " + await regRes.text());
        }

        // Now login
        const loginRes = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!loginRes.ok) return appAlert("Login after register failed");

        const loginData = await loginRes.json();

        // Add profile
        const profileRes = await fetch(`${USERS_API_URL}/Profile/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                age: 0,
                gender: "Unspecified",
                about: "",
                currentAvatar: "",
                status: 1,
                userId: loginData.userId
            })
        });

        if (!profileRes.ok) return appAlert("Profile creation failed: " + await profileRes.text());

        const newProfileId = await profileRes.json();

        setTokens(loginData.token, newProfileId);
    } catch (e) {
        console.error(e);
        appAlert("Error connecting to UsersApi");
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) return appAlert("Fill login fields");

    try {
        const res = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) return appAlert("Login failed");

        const data = await res.json();

        // Fetch profiles
        const profRes = await fetch(`${USERS_API_URL}/Profile/user/${data.userId}`);
        if (!profRes.ok) return appAlert("Failed to fetch profiles");

        const profiles = await profRes.json();
        if (!profiles || profiles.length === 0) return appAlert("No profiles found for this user");

        setTokens(data.token, profiles[0].id);
    } catch (e) {
        console.error(e);
        appAlert("Error connecting to UsersApi");
    }
}

function setTokens(t, pId) {
    window.token = t;
    window.profileId = pId;
    localStorage.setItem('askdate_token', window.token);
    localStorage.setItem('askdate_profileId', window.profileId);
    checkAuth();
}

function logoutUser() {
    window.token = '';
    window.profileId = '';
    localStorage.removeItem('askdate_token');
    localStorage.removeItem('askdate_profileId');
    localStorage.removeItem('askdate_currentGroupId');
    showView('loginView');
}

async function checkAuth() {
    if (window.token && window.profileId) {
        showView('mainView');
        fetchCurrentUserName();

        const pendingJoin = localStorage.getItem('pending_join');
        if (pendingJoin) {
            localStorage.removeItem('pending_join');
            // Try to auto join
            try {
                const group = await apiCall(`/groups/invite/${pendingJoin}`);
                if (group) {
                    await apiCall(`/groups/${group.id}/participants`, 'POST');
                    await fetchGroups();
                    loadGroup(group.id);
                    return;
                }
            } catch(e) {}
        }

        fetchGroups();
    } else {
        showView('loginView');
    }
}

async function apiCall(endpoint, method = 'GET', body = null) {
    const headers = {
        'Authorization': `Bearer ${window.token}`,
        'X-Profile-Id': window.profileId
    };
    if (body) {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method,
        headers
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
        if (response.status === 401) {
            appAlert("Unauthorized! Check your token.");
        } else if (response.status === 204) {
            return null; // OK no content
        } else {
            appAlert(`Error: ${response.status} ${response.statusText}`);
        }
        return false;
    }

    if (response.status === 204) return true; // changed from null so if checks pass

    const text = await response.text();
    return text ? JSON.parse(text) : true;
}

// --- Groups ---
async function fetchGroups() {
    const groups = await apiCall('/groups');
    if (!groups) return;

    const list = document.getElementById('groupsList');
    list.innerHTML = '';
    groups.forEach(g => {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerText = g.name;
        li.onclick = () => loadGroup(g.id);
        list.appendChild(li);
    });

    const savedGroupId = localStorage.getItem('askdate_currentGroupId');
    if (savedGroupId && !window.currentGroupId) {
        if (groups.some(g => String(g.id) === savedGroupId)) {
            loadGroup(savedGroupId);
        }
    }
}

async function createGroup() {
    const name = document.getElementById('newGroupName').value.trim();
    if (!name) return;

    const group = await apiCall('/groups', 'POST', { name });
    if (group) {
        document.getElementById('newGroupName').value = '';
        closeAllModals();
        fetchGroups();
    }
}

async function loadGroup(id) {
    const group = await apiCall(`/groups/${id}`);
    if (!group) return;

    if (document.getElementById('dayPanel')) closeDayPanel();

    window.currentGroupId = id;
    localStorage.setItem('askdate_currentGroupId', id);
    window.currentGroupCreatorId = group.creatorProfileId;

    const isAdmin = String(window.profileId) === String(group.creatorProfileId);

    document.getElementById('groupDetails').classList.remove('hidden');
    document.getElementById('groupTitle').innerText = group.name;
    document.getElementById('editGroupNameInput').value = group.name;
    document.getElementById('saveGroupNameBtn').style.display = 'none';
    document.getElementById('groupInviteLink').innerText = group.inviteLink;
    document.getElementById('groupParticipantCount').innerText = `${(group.participants || []).length} participant(s)`;

    const deleteGroupBtn = document.getElementById('deleteGroupBtn');
    if (deleteGroupBtn) {
        deleteGroupBtn.classList.toggle('hidden', !isAdmin);
    }

    // update participants for modal
    const pList = document.getElementById('modalGroupParticipantsList');
    pList.innerHTML = '';

    (group.participants || []).forEach(p => {
        const canDelete = isAdmin || String(p.profileId) === String(window.profileId);

        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `<span>${p.profileName} (${p.role === 1 ? 'Creator' : 'Member'})</span> 
        ${canDelete ? `<span style="cursor:pointer; color:var(--danger); font-size:12px; text-decoration:underline;" onclick="event.stopPropagation(); removeParticipant(${p.profileId})" title="Remove">Remove</span>` : ''}`;
        pList.appendChild(li);
    });

    fetchNotes();
}

async function saveGroupName() {
    const newName = document.getElementById('editGroupNameInput').value.trim();
    if (!newName) return;

    try {
        await apiCall(`/groups/${window.currentGroupId}`, 'PUT', { name: newName });
    } catch(e) {}
    document.getElementById('groupTitle').innerText = newName;
    document.getElementById('saveGroupNameBtn').style.display = 'none';
    fetchGroups();
}

async function deleteCurrentGroup() {
    const confirmed = await appConfirm('Are you sure you want to delete this group?');
    if (!confirmed) return;

    await apiCall(`/groups/${window.currentGroupId}`, 'DELETE');
    document.getElementById('groupDetails').classList.add('hidden');
    closeAllModals();
    window.currentGroupId = null;
    localStorage.removeItem('askdate_currentGroupId');
    fetchGroups();
}

async function joinGroupFromModal() {
    let link = document.getElementById('inviteLinkInput').value.trim();
    if (!link) return appAlert('Enter valid invite link');

    if (link.includes('join=')) {
        link = new URLSearchParams(link.substring(link.indexOf('?'))).get('join');
    }

    const group = await apiCall(`/groups/invite/${link}`);
    if (group) {
        await apiCall(`/groups/${group.id}/participants`, 'POST');
        await appAlert(`Joined group: ${group.name}`);
        document.getElementById('inviteLinkInput').value = '';
        closeAllModals();
        fetchGroups();
    }
}

async function removeParticipant(userId) {
    const confirmed = await appConfirm("Remove this participant?");
    if(!confirmed) return;
    await apiCall(`/groups/${window.currentGroupId}/participants/${userId}`, 'DELETE');
    loadGroup(window.currentGroupId);
}

window.currentNotes = [];
window.selectedNote = null;

// --- Notes (Dates) ---
async function fetchNotes() {
    if (!window.currentGroupId) return;
    const notes = await apiCall(`/groups/${window.currentGroupId}/notes`);
    if (!notes) return;

    window.currentNotes = notes;
    initCalendar(notes);
}

function initCalendar(notes) {
    const calendarEl = document.getElementById('calendar');
    const events = notes.map(n => ({
        id: n.id,
        title: `${n.confirmedProfileNames ? n.confirmedProfileNames.length : 0} participant(s)`,
        date: n.date.split('T')[0],
        extendedProps: { note: n }
    }));

    if (window.appCalendar) {
        const source = window.appCalendar.getEventSources()[0];
        if (source) source.remove();
        window.appCalendar.addEventSource(events);
        window.appCalendar.render(); // force re-render rules
        return;
    }

    window.appCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        firstDay: 1,
        height: 'auto',
        events: events,
        dayCellClassNames: function(arg) {
            const classes = [];
            // Parse local date strictly without time changes
            const dateLocal = new Date(arg.date.getTime() - (arg.date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const hasEvent = window.currentNotes.some(n => n.date.split('T')[0] === dateLocal);
            if (hasEvent) classes.push('calendar-marked');
            return classes;
        },
        dateClick: function(info) {
            const note = window.currentNotes.find(n => n.date.split('T')[0] === info.dateStr);
            openDayPanel(info.dateStr, note);
        },
        eventClick: function(info) {
            openDayPanel(info.event.startStr, info.event.extendedProps.note);
        },
        eventContent: function(arg) {
            const note = arg.event.extendedProps.note;
            const count = note.confirmedProfileNames ? note.confirmedProfileNames.length : 0;
            return { html: `<div style="padding: 2px; text-align: center;"><span class="fc-event-badge" title="${count} participants">${count} <span class="badge-text">participants</span></span></div>` };
        }
    });
    window.appCalendar.render();

    document.getElementById('dayPanel').classList.add('hidden');
}

function closeDayPanel() {
    document.getElementById('dayPanel').classList.add('hidden');
}

function showDayParticipants() {
    document.getElementById('dayViewDetails').classList.add('hidden');
    document.getElementById('dayViewParticipants').classList.remove('hidden');
}

function showDayDetails() {
    document.getElementById('dayViewParticipants').classList.add('hidden');
    document.getElementById('dayViewDetails').classList.remove('hidden');
}

function openDayPanel(dateStr, note) {
    document.getElementById('dayPanel').classList.remove('hidden');
    document.getElementById('dayTitle').innerText = dateStr;
    window.selectedNote = note;

    showDayDetails();

    const actionsContainer = document.getElementById('dayActions');
    const participantsContainer = document.getElementById('dayParticipantsList');
    const commentsContainer = document.getElementById('dayCommentsList');

    actionsContainer.innerHTML = '';
    participantsContainer.innerHTML = '';
    commentsContainer.innerHTML = '';

    if (!note) {
        actionsContainer.innerHTML = `
            <p class="text-small mb-var">No discussions for this day.</p>
            <button class="btn btn-outline btn-small w-full" onclick="createNoteForDate('${dateStr}')">+ Add Note for this day</button>
        `;
        document.getElementById('newCommentContainer').style.display = 'none';
        return;
    }

    document.getElementById('newCommentContainer').style.display = 'flex';

    const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(parseInt(window.profileId));
    const isAdmin = String(window.profileId) === String(window.currentGroupCreatorId);
    const canDeleteNode = isAdmin || String(note.creatorProfileId) === String(window.profileId);

    actionsContainer.innerHTML = `
        <div class="flex-row mb-var">
            <button class="btn btn-outline btn-small" onclick="toggleConfirmNote(${note.id}, ${isConfirmed ? 'true' : 'false'})">
                ${isConfirmed ? 'Marked Convenient' : '+ Mark Convenient'}
            </button>
            ${canDeleteNode ? `<button class="btn btn-danger btn-small" onclick="deleteNote(${note.id})">Delete Note</button>` : ''}
        </div>
    `;

    if (note.confirmedProfileNames && note.confirmedProfileNames.length > 0) {
        note.confirmedProfileNames.forEach(name => {
            const li = document.createElement('li');
            li.className = 'list-item';
            li.style.padding = '8px';
            li.innerText = name;
            participantsContainer.appendChild(li);
        });
    } else {
        participantsContainer.innerHTML = '<li class="list-item text-small" style="padding: 8px;">No participants yet.</li>';
    }

    fetchComments(note.id);
}

async function createNoteForDate(dateStr) {
    if (!window.currentGroupId) return;

    // Send UTC midnight to avoid local offsets splitting the day
    const dateISO = dateStr + "T00:00:00Z";

    const note = await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', { date: dateISO });
    if (note) {
        await fetchNotes();
        const updatedNote = window.currentNotes.find(n => n.date.split('T')[0] === dateStr);
        openDayPanel(dateStr, updatedNote);
    }
}

async function createNote() {
    const dateValue = document.getElementById('newNoteDate').value;
    if (!dateValue) return appAlert('Select a date');

    const dateStr = new Date(dateValue).toISOString();

    const note = await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', { date: dateStr });
    if (note) {
        fetchNotes();
    }
}

async function deleteNote(id) {
    const confirmed = await appConfirm('Delete note?');
    if(!confirmed) return;
    await apiCall(`/groups/${window.currentGroupId}/notes/${id}`, 'DELETE');
    await fetchNotes();
    document.getElementById('dayPanel').classList.add('hidden');
}

async function toggleConfirmNote(id, isConfirmed) {
    if (isConfirmed) {
        await apiCall(`/groups/${window.currentGroupId}/notes/${id}/confirm`, 'DELETE');
    } else {
        await apiCall(`/groups/${window.currentGroupId}/notes/${id}/confirm`, 'POST');
    }
    await fetchNotes();
    if (window.selectedNote && window.selectedNote.id === id) {
        const updated = window.currentNotes.find(n => n.id === id);
        // Retain panel title date
        openDayPanel(document.getElementById('dayTitle').innerText, updated);
    }
}

// --- Comments ---
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

async function fetchComments(noteId) {
    const comments = await apiCall(`/notes/${noteId}/comments`);
    if (!comments) return;

    const container = document.getElementById('dayCommentsList');
    if (!container) return;

    container.innerHTML = '';
    comments.forEach(c => {
        const isAuthor = String(c.authorProfileId) === String(window.profileId);
        const isAdmin = String(window.profileId) === String(window.currentGroupCreatorId);
        const canDeleteComment = isAdmin || isAuthor;

        const div = document.createElement('div');
        div.style.marginBottom = '8px';
        div.style.padding = '12px';
        div.style.backgroundColor = 'var(--bg-elevated)';
        div.style.borderRadius = 'var(--radius)';

        let dateStr = '';
        if (c.created) {
             const createdDate = new Date(c.created).toLocaleString();
             dateStr = ` • <span style="color:var(--text-secondary);font-size:10px;">${createdDate}</span>`;
             if (c.lastModified) {
                 const tCreated = new Date(c.created).getTime();
                 const tMod = new Date(c.lastModified).getTime();
                 // Show edited only if diff > 10 seconds
                 if (tMod - tCreated > 10000) {
                     dateStr += ` <span style="color:var(--text-secondary);font-size:10px;">(edited)</span>`;
                 }
             }
        }

        div.innerHTML = `
            <div id="commentView_${c.id}">
                <div style="display: flex; justify-content: space-between; align-items:center;">
                    <div>
                        <span class="text-small" style="font-weight:bold; color: var(--accent);">${c.authorName}</span>${dateStr}
                    </div>
                    <div>
                        ${isAuthor ? `<span style="cursor:pointer; color:var(--text-secondary); font-size:12px; margin-right:12px; text-decoration:underline;" onclick="startEditComment(${c.id})">Edit</span>` : ''}
                        ${canDeleteComment ? `<span style="cursor:pointer; color:var(--danger); font-size:12px; text-decoration:underline;" onclick="deleteComment(${noteId}, ${c.id})">Delete</span>` : ''}
                    </div>
                </div>
                <div class="mt-var text-small" style="line-height:1.4;">${c.content}</div>
                <input type="hidden" id="rawContent_${c.id}" value="${escapeQuotes(c.content)}">
            </div>
            <div id="commentEdit_${c.id}" class="hidden mt-var">
                <input type="text" id="editInput_${c.id}" style="margin-bottom:8px; width:100%;">
                <div class="flex-row">
                    <button class="btn btn-small" onclick="saveComment(${noteId}, ${c.id})">Save</button>
                    <button class="btn btn-outline btn-small" onclick="cancelEditComment(${c.id})">Cancel</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function startEditComment(id) {
    const rawVal = document.getElementById(`rawContent_${id}`).value;
    document.getElementById(`commentView_${id}`).classList.add('hidden');
    document.getElementById(`commentEdit_${id}`).classList.remove('hidden');
    document.getElementById(`editInput_${id}`).value = rawVal;
}

function cancelEditComment(id) {
    document.getElementById(`commentEdit_${id}`).classList.add('hidden');
    document.getElementById(`commentView_${id}`).classList.remove('hidden');
}

async function saveComment(noteId, id) {
    const val = document.getElementById(`editInput_${id}`).value.trim();
    if (!val) return;
    await apiCall(`/notes/${noteId}/comments/${id}`, 'PUT', { content: val });
    fetchComments(noteId);
}

async function addCommentToCurrentDay() {
    if (!window.selectedNote) return;
    const noteId = window.selectedNote.id;
    const content = document.getElementById('newCommentText').value.trim();
    if (!content) return;

    const res = await apiCall(`/notes/${noteId}/comments`, 'POST', { content });
    if (res) {
        document.getElementById('newCommentText').value = '';
        fetchComments(noteId);
    }
}

async function addComment(noteId) {
    const content = document.getElementById(`newComment_${noteId}`).value.trim();
    if (!content) return;
    
    const res = await apiCall(`/notes/${noteId}/comments`, 'POST', { content });
    if (res) {
        fetchComments(noteId);
    }
}

async function deleteComment(noteId, commentId) {
    const confirmed = await appConfirm('Delete comment?');
    if(!confirmed) return;
    await apiCall(`/notes/${noteId}/comments/${commentId}`, 'DELETE');
    fetchComments(noteId);
}

// make functions global for index.html onclicks
window.showView = showView;
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.fetchGroups = fetchGroups;
window.createGroup = createGroup;
window.fetchNotes = fetchNotes;
window.createNote = createNote;
window.deleteNote = deleteNote;
window.toggleConfirmNote = toggleConfirmNote;
window.addComment = addComment;
window.deleteComment = deleteComment;
window.openModal = openModal;
window.closeAllModals = closeAllModals;
window.copyInviteLink = copyInviteLink;
window.showDayDetails = showDayDetails;
window.showDayParticipants = showDayParticipants;
window.removeParticipant = removeParticipant;
window.joinGroupFromModal = joinGroupFromModal;
window.deleteCurrentGroup = deleteCurrentGroup;
window.loadGroup = loadGroup;
window.closeDayPanel = closeDayPanel;
window.startEditComment = startEditComment;
window.cancelEditComment = cancelEditComment;
window.saveComment = saveComment;
window.addCommentToCurrentDay = addCommentToCurrentDay;
window.toggleMobileMenu = toggleMobileMenu;
window.saveGroupName = saveGroupName;
window.createNoteForDate = createNoteForDate;
window.showToast = showToast;
window.fetchComments = fetchComments;

async function openProfileModal() {
    try {
        const res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
            headers: { 'Authorization': `Bearer ${window.token}` }
        });
        if (res.ok) {
            const profile = await res.json();
            document.getElementById('profFirstName').value = profile.firstName || '';
            document.getElementById('profLastName').value = profile.lastName || '';
            document.getElementById('profNewPassword').value = '';

            // Save userId globally to update password
            window.currentUserId = profile.userId;

            openModal('profileModal');
        }
    } catch (e) {
        appAlert("Failed to load profile");
    }
}

async function saveProfile() {
    const firstName = document.getElementById('profFirstName').value.trim();
    const lastName = document.getElementById('profLastName').value.trim();
    const newPassword = document.getElementById('profNewPassword').value;

    if (!firstName || !lastName) {
        return appAlert("First name and last name are required.");
    }

    try {
        const res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${window.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                currentAvatar: "",
                status: 1
            })
        });

        if (res.ok) {
            if (newPassword && window.currentUserId) {
                // Try updating the password
                await fetch(`${USERS_API_URL}/User/update?userId=${window.currentUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${window.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: newPassword,
                        phoneNumber: ""
                    })
                });
            }

            closeAllModals();
            fetchCurrentUserName();
            showToast("Profile updated!");
        } else {
            appAlert("Failed to update profile");
        }
    } catch (e) {
        appAlert("Error saving profile");
    }
}
window.openProfileModal = openProfileModal;
window.saveProfile = saveProfile;

// Auto-refresh periodically
setInterval(async () => {
    if (!window.currentGroupId) return;
    try {
        const group = await apiCall(`/groups/${window.currentGroupId}`);
        if (!group) return;

        document.getElementById('groupParticipantCount').innerText = `${(group.participants || []).length} participant(s)`;

        const notes = await apiCall(`/groups/${window.currentGroupId}/notes`);
        if (notes) {
            window.currentNotes = notes;
            initCalendar(notes);

            if (window.selectedNote && !document.getElementById('dayPanel').classList.contains('hidden')) {
                const activeDate = document.getElementById('dayTitle').innerText;
                const updatedNote = window.currentNotes.find(n => n.date.split('T')[0] === activeDate);

                if (updatedNote) {
                    window.selectedNote = updatedNote;
                    const participantsContainer = document.getElementById('dayParticipantsList');
                    participantsContainer.innerHTML = '';
                    if (updatedNote.confirmedProfileNames && updatedNote.confirmedProfileNames.length > 0) {
                        updatedNote.confirmedProfileNames.forEach(name => {
                            const li = document.createElement('li');
                            li.className = 'list-item';
                            li.style.padding = '8px';
                            li.innerText = name;
                            participantsContainer.appendChild(li);
                        });
                    } else {
                        participantsContainer.innerHTML = '<li class="list-item text-small" style="padding: 8px;">No participants yet.</li>';
                    }

                    fetchComments(updatedNote.id);
                }
            }
        }
    } catch(e) { }
}, 15000);