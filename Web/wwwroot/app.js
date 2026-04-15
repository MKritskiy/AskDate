const API_URL = '/api';
const USERS_API_URL = 'http://localhost:50002/api';
window.token = localStorage.getItem('askdate_token') || '';
window.profileId = localStorage.getItem('askdate_profileId') || '';
window.currentGroupId = null;
window.currentGroupCreatorId = null;

document.addEventListener('DOMContentLoaded', () => {
    if (window.token && window.profileId) {
        checkAuth();
    } else {
        showView('loginView');
    }
});

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
        return alert("Fill all registration fields");
    }

    try {
        const regRes = await fetch(`${USERS_API_URL}/User/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!regRes.ok) {
            return alert("Registration failed: " + await regRes.text());
        }

        // Now login
        const loginRes = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!loginRes.ok) return alert("Login after register failed");

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

        if (!profileRes.ok) return alert("Profile creation failed: " + await profileRes.text());

        const newProfileId = await profileRes.json();

        setTokens(loginData.token, newProfileId);
    } catch (e) {
        console.error(e);
        alert("Error connecting to UsersApi");
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) return alert("Fill login fields");

    try {
        const res = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) return alert("Login failed");

        const data = await res.json();

        // Fetch profiles
        const profRes = await fetch(`${USERS_API_URL}/Profile/user/${data.userId}`);
        if (!profRes.ok) return alert("Failed to fetch profiles");

        const profiles = await profRes.json();
        if (!profiles || profiles.length === 0) return alert("No profiles found for this user");

        setTokens(data.token, profiles[0].id);
    } catch (e) {
        console.error(e);
        alert("Error connecting to UsersApi");
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
    showView('loginView');
}

function checkAuth() {
    if (window.token && window.profileId) {
        showView('mainView');
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
            alert("Unauthorized! Check your token.");
        } else if (response.status === 204) {
            return null; // OK no content
        } else {
            alert(`Error: ${response.status} ${response.statusText}`);
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
}

async function createGroup() {
    const name = document.getElementById('newGroupName').value.trim();
    if (!name) return alert('Enter group name');

    const group = await apiCall('/groups', 'POST', { name });
    if (group) {
        document.getElementById('newGroupName').value = '';
        fetchGroups();
    }
}

async function loadGroup(id) {
    const group = await apiCall(`/groups/${id}`);
    if (!group) return;

    window.currentGroupId = id;
    window.currentGroupCreatorId = group.creatorProfileId; // Assumes property is creatorProfileId

    const isAdmin = String(window.profileId) === String(group.creatorProfileId);

    document.getElementById('groupDetails').classList.remove('hidden');
    document.getElementById('groupTitle').innerText = group.name;
    document.getElementById('groupInviteLink').innerText = group.inviteLink;

    const deleteGroupBtn = document.getElementById('deleteGroupBtn');
    if (deleteGroupBtn) {
        deleteGroupBtn.style.display = isAdmin ? 'inline-block' : 'none';
    }

    // update participants
    const pList = document.getElementById('participantsList');
    pList.innerHTML = '';

    (group.participants || []).forEach(p => {
        const canDelete = isAdmin || String(p.profileId) === String(window.profileId);

        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `<span>${p.profileName} (${p.role === 1 ? 'Creator' : 'Member'})</span> 
        ${canDelete ? `<button class="btn btn-danger btn-small" onclick="event.stopPropagation(); removeParticipant(${p.profileId})">Remove</button>` : ''}`;
        pList.appendChild(li);
    });

    fetchNotes();
}

async function deleteCurrentGroup() {
    if (!confirm('Are you sure you want to delete this group?')) return;

    await apiCall(`/groups/${window.currentGroupId}`, 'DELETE');
    document.getElementById('groupDetails').classList.add('hidden');
    window.currentGroupId = null;
    fetchGroups();
}

// --- Join Group ---
async function joinGroup() {
    const link = document.getElementById('inviteLinkInput').value.trim();
    if (!link) return alert('Enter valid invite link');
    
    const group = await apiCall(`/groups/invite/${link}`);
    if (group) {
        await apiCall(`/groups/${group.id}/participants`, 'POST');
        alert(`Joined group: ${group.name}`);
        fetchGroups();
    }
}

async function removeParticipant(userId) {
    if(!confirm("Remove this participant?")) return;
    await apiCall(`/groups/${window.currentGroupId}/participants/${userId}`, 'DELETE');
    loadGroup(window.currentGroupId); // Refresh UI
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
    if (window.appCalendar) {
        window.appCalendar.destroy();
    }

    window.appCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        firstDay: 1,
        height: 'auto',
        events: notes.map(n => ({
            id: n.id,
            title: `${n.confirmedProfileNames ? n.confirmedProfileNames.length : 0} marked`,
            date: n.date.split('T')[0],
            extendedProps: { note: n }
        })),
        dateClick: function(info) {
            const note = notes.find(n => n.date.split('T')[0] === info.dateStr);
            openDayPanel(info.dateStr, note);
        },
        eventClick: function(info) {
            openDayPanel(info.event.startStr, info.event.extendedProps.note);
        },
        eventContent: function(arg) {
            const note = arg.event.extendedProps.note;
            const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(parseInt(window.profileId));
            const count = note.confirmedProfileNames ? note.confirmedProfileNames.length : 0;

            let html = `
                <div style="position:relative; width: 100%; height: 100%; cursor: pointer; padding: 2px;">
                    <div>${count} participant(s)</div>
                    <button class="join-btn btn btn-small" style="display:none; position:absolute; top:50%; right:2px; transform:translateY(-50%); background-color: var(--success); color:#000; min-height: 24px; padding: 0 6px;" onclick="event.stopPropagation(); toggleConfirmNote(${note.id}, ${isConfirmed ? 'true' : 'false'})">${isConfirmed ? '-' : '+'}</button>
                </div>`;
            return { html: html };
        },
        eventMouseEnter: function(info) {
            const btn = info.el.querySelector('.join-btn');
            if (btn) btn.style.display = 'block';
        },
        eventMouseLeave: function(info) {
            const btn = info.el.querySelector('.join-btn');
            if (btn) btn.style.display = 'none';
        },
        eventDidMount: function(info) {
            const cell = info.el.closest('.fc-daygrid-day');
            if (cell) {
                cell.style.backgroundColor = 'rgba(187, 134, 252, 0.15)';
            }
        }
    });
    window.appCalendar.render();

    document.getElementById('dayPanel').classList.add('hidden');
}

function closeDayPanel() {
    document.getElementById('dayPanel').classList.add('hidden');
}

function openDayPanel(dateStr, note) {
    document.getElementById('dayPanel').classList.remove('hidden');
    document.getElementById('dayTitle').innerText = dateStr;
    window.selectedNote = note;

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
        return;
    }

    const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(parseInt(window.profileId));
    const isAdmin = String(window.profileId) === String(window.currentGroupCreatorId);
    const canDeleteNode = isAdmin || String(note.creatorProfileId) === String(window.profileId);

    actionsContainer.innerHTML = `
        <div class="flex-row mb-var">
            <button class="btn btn-outline btn-small" onclick="toggleConfirmNote(${note.id}, ${isConfirmed ? 'true' : 'false'})">
                ${isConfirmed ? '✓ Convenient' : '+ Mark Convenient'}
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

    // Local time at midnight or selected time. We'll use midnight UTC approx
    const dateObj = new Date(dateStr + "T00:00:00Z");
    const dateISO = dateObj.toISOString();

    const note = await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', { date: dateISO });
    if (note) {
        await fetchNotes();
        const updatedNote = window.currentNotes.find(n => n.date.split('T')[0] === dateStr);
        openDayPanel(dateStr, updatedNote);
    }
}

async function createNote() {
    const dateValue = document.getElementById('newNoteDate').value;
    if (!dateValue) return alert('Select a date');

    const dateStr = new Date(dateValue).toISOString();

    const note = await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', { date: dateStr });
    if (note) {
        fetchNotes();
    }
}

async function deleteNote(id) {
    if(!confirm('Delete note?')) return;
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
        div.style.padding = '8px';
        div.style.backgroundColor = 'var(--bg-elevated)';
        div.style.borderRadius = 'var(--radius)';
        div.innerHTML = `
            <div id="commentView_${c.id}">
                <div style="display: flex; justify-content: space-between; align-items:center;">
                    <span class="text-small" style="font-weight:bold; color: var(--accent);">${c.authorName}</span>
                    <div>
                        ${isAuthor ? `<span style="cursor:pointer; margin-right:8px;" onclick="startEditComment(${c.id})">✏️</span>` : ''}
                        ${canDeleteComment ? `<span style="cursor:pointer; color: var(--danger);" onclick="deleteComment(${noteId}, ${c.id})">❌</span>` : ''}
                    </div>
                </div>
                <div class="mt-var text-small">${c.content}</div>
                <input type="hidden" id="rawContent_${c.id}" value="${escapeQuotes(c.content)}">
            </div>
            <div id="commentEdit_${c.id}" class="hidden mt-var">
                <input type="text" id="editInput_${c.id}" style="margin-bottom:8px;">
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
    if(!confirm('Delete comment?')) return;
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
window.joinGroup = joinGroup;
window.fetchNotes = fetchNotes;
window.createNote = createNote;
window.deleteNote = deleteNote;
window.toggleConfirmNote = toggleConfirmNote;
window.addComment = addComment;
window.deleteComment = deleteComment;
window.removeParticipant = removeParticipant;
window.deleteCurrentGroup = deleteCurrentGroup;
window.loadGroup = loadGroup;
window.closeDayPanel = closeDayPanel;
window.startEditComment = startEditComment;
window.cancelEditComment = cancelEditComment;
window.saveComment = saveComment;
window.addCommentToCurrentDay = addCommentToCurrentDay;