let currentLang = localStorage.getItem('askdate_lang') || 'ru';
const translations = {
    'ru': {
        'nav.createGroup': 'Создать группу',
        'nav.joinGroup': 'Присоединиться',
        'nav.profile': 'Профиль',
        'nav.logout': 'Выйти',
        'nav.menu': 'Меню',
        'login.title': 'Вход',
        'login.email': 'Email',
        'login.password': 'Пароль',
        'login.submit': 'Войти',
        'login.noAccount': 'Нет аккаунта?',
        'login.toRegister': 'Регистрация',
        'reg.title': 'Регистрация',
        'reg.email': 'Email',
        'reg.password': 'Пароль',
        'reg.confirmPassword': 'Повторите пароль',
        'reg.firstName': 'Имя',
        'reg.lastName': 'Фамилия',
        'reg.submit': 'Зарегистрироваться',
        'reg.hasAccount': 'Уже есть аккаунт?',
        'reg.toLogin': 'Войти',
        'sidebar.title': 'Мои группы',
        'group.invite': 'Приглашение:',
        'group.copyLink': 'Копировать ссылку',
        'day.participants': 'Участники',
        'day.comments': 'Комментарии',
        'day.addComment': 'Добавить комментарий...',
        'day.send': 'Отправить',
        'modal.createTitle': 'Создать группу',
        'modal.createName': 'Имя группы',
        'modal.createBtn': 'Создать',
        'modal.joinTitle': 'Присоединиться',
        'modal.joinLink': 'Ссылка или код',
        'modal.joinBtn': 'Вступить',
        'modal.editTitle': 'Настройки группы',
        'modal.editSave': 'Сохранить',
        'modal.editParticipants': 'Участники',
        'modal.editDelete': 'Удалить группу',
        'modal.profTitle': 'Настройки профиля',
        'modal.profFirst': 'Имя',
        'modal.profLast': 'Фамилия',
        'modal.profPassTitle': 'Обновить пароль',
        'modal.profPass': 'Новый пароль (оставьте пустым для сохранения текущего)',
        'modal.profSave': 'Сохранить',
        'dialog.ok': 'ОК',
        'dialog.cancel': 'Отмена',
        'js.participants': 'участников',
        'js.events': 'событий',
        'js.creator': 'Создатель',
        'js.member': 'Участник',
        'js.remove': 'Удалить',
        'js.deleteConfirm': 'Вы уверены, что хотите удалить эту группу?',
        'js.enterLink': 'Введите код или ссылку-приглашение',
        'js.joined': 'Присоединились к группе:',
        'js.removeConfirm': 'Удалить этого участника?',
        'js.noDiscussions': 'На этот день нет отметок.',
        'js.addNote': '+ Добавить отметку на этот день',
'js.convenient': 'Отметить неудобным',
  'js.markConvenient': '+ Отметить удобным',
  'js.deleteNote': 'Удалить событие',
  'js.deleteNoteConfirm': 'Удалить событие?',
        'js.edited': '(изменено)',
        'js.edit': 'Изменить',
        'js.deleteCommentConfirm': 'Удалить комментарий?',
        'js.cancel': 'Отмена',
        'js.save': 'Сохранить',
        'js.linkCopied': 'Ссылка скопирована!',
        'js.fillReg': 'Заполните все поля регистрации',
        'js.passwordMismatch': 'Пароли не совпадают',
        'js.regError': 'Ошибка регистрации: ',
        'js.fillLogin': 'Заполните поля входа',
        'js.loginError': 'Ошибка входа',
        'js.profNotFound': 'Профили не найдены',
        'js.profReq': 'Имя и фамилия обязательны.',
        'js.profUpdated': 'Профиль обновлен!',
        'js.profFail': 'Ошибка сохранения профиля',
        'js.profLoadFail': 'Не удалось получить профиль',
        'js.deleteSeries': 'Удалить серию',
        'js.deleteSeriesConfirm': 'Удалить все повторяющиеся отметки этой серии?',
        'js.confirmSeries': 'Участвовать в серии',
        'js.leaveSeries': 'Выйти из серии',
        'js.confirmSeriesConfirm': 'Присоединиться ко всем повторяющимся отметкам этой серии?',
        'js.leaveSeriesConfirm': 'Покинуть все повторяющиеся отметки этой серии?',
        'js.recurrenceInfo': 'Повторяющаяся отметка',
        'rec.type': 'Тип повторения',
        'rec.none': 'Без повторения',
        'rec.daily': 'Ежедневно',
        'rec.weekly': 'Еженедельно',
        'rec.monthly': 'Ежемесячно',
        'rec.interval': 'Интервал (каждые N)',
        'rec.daysOfWeek': 'Дни недели',
        'rec.dayMon': 'Пн', 'rec.dayTue': 'Вт', 'rec.dayWed': 'Ср', 'rec.dayThu': 'Чт',
        'rec.dayFri': 'Пт', 'rec.daySat': 'Сб', 'rec.daySun': 'Вс',
        'rec.endType': 'Окончание',
        'rec.endNever': 'Без окончания',
        'rec.endDate': 'По дате',
        'rec.endCount': 'По количеству',
        'rec.endDateLabel': 'Дата окончания',
        'rec.endCountLabel': 'Количество повторений',
        'rec.apply': 'Применить и создать',
        'modal.recurrenceTitle': 'Повторение',
        'rec.noteTitle': 'Название (необязательно)',
        'rec.noteTitlePlaceholder': 'Название отметки',
        'js.recDaily': 'ежедневно',
        'js.recWeekly': 'еженедельно',
        'js.recMonthly': 'ежемесячно',
        'js.recEvery': 'каждые',
        'js.recDays': 'дн.',
        'js.recWeeks': 'нед.',
        'js.recMonths': 'мес.',
        'js.recUntil': 'до',
        'js.recTimes': 'раз',
        'js.noEvents': 'Нет событий',
        'js.eventOf': 'из',
        'js.editTitle': 'Изменить название',
        'js.saveTitle': 'Сохранить',
        'js.titlePlaceholder': 'Название отметки',
        'js.addTitle': 'Нажмите, чтобы добавить название',
        'nav.calendar': 'Календарь',
        'nav.upcoming': 'Предстоящие',
        'upcoming.title': 'Предстоящие события',
        'upcoming.noEvents': 'Нет предстоящих событий',
        'upcoming.participants': 'участников',
        'upcoming.comments': 'комментариев',
        'upcoming.recurring': 'Регулярное',
        'upcoming.confirmed': 'Вы участвуете',
        'upcoming.notConfirmed': 'Вы не участвуете',
        'upcoming.today': 'Сегодня',
        'upcoming.tomorrow': 'Завтра',
        'upcoming.loadMore': 'Показать еще'
    },
    'en': {
        'nav.createGroup': 'Create Group',
        'nav.joinGroup': 'Join Group',
        'nav.profile': 'Profile',
        'nav.logout': 'Logout',
        'nav.menu': 'Menu',
        'login.title': 'Login',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.submit': 'Login',
        'login.noAccount': 'Don\'t have an account?',
        'login.toRegister': 'Register',
        'reg.title': 'Register',
        'reg.email': 'Email',
        'reg.password': 'Password',
        'reg.confirmPassword': 'Confirm Password',
        'reg.firstName': 'First Name',
        'reg.lastName': 'Last Name',
        'reg.submit': 'Register',
        'reg.hasAccount': 'Already have an account?',
        'reg.toLogin': 'Login',
        'sidebar.title': 'My Groups',
        'group.invite': 'Invite:',
        'group.copyLink': 'Copy Link',
        'day.participants': 'Participants',
        'day.comments': 'Comments',
        'day.addComment': 'Add a comment...',
        'day.send': 'Send',
        'modal.createTitle': 'Create Group',
        'modal.createName': 'Group Name',
        'modal.createBtn': 'Create',
        'modal.joinTitle': 'Join Group',
        'modal.joinLink': 'Invite Link or URL',
        'modal.joinBtn': 'Join',
        'modal.editTitle': 'Group Settings',
        'modal.editSave': 'Save',
        'modal.editParticipants': 'Participants',
        'modal.editDelete': 'Delete Group',
        'modal.profTitle': 'Edit Profile',
        'modal.profFirst': 'First Name',
        'modal.profLast': 'Last Name',
        'modal.profPassTitle': 'Update Password',
        'modal.profPass': 'New Password (leave blank to keep current)',
        'modal.profSave': 'Save',
        'dialog.ok': 'OK',
        'dialog.cancel': 'Cancel',
        'js.participants': 'participants',
        'js.events': 'events',
        'js.creator': 'Creator',
        'js.member': 'Member',
        'js.remove': 'Remove',
        'js.deleteConfirm': 'Are you sure you want to delete this group?',
        'js.enterLink': 'Enter valid invite link',
        'js.joined': 'Joined group: ',
        'js.removeConfirm': 'Remove this participant?',
        'js.noDiscussions': 'No discussions for this day.',
        'js.addNote': '+ Add Note for this day',
        'js.convenient': 'Marked Convenient',
        'js.markConvenient': '+ Mark Convenient',
        'js.deleteNote': 'Delete Note',
        'js.noParticipants': 'No participants yet.',
        'js.deleteNoteConfirm': 'Delete note?',
        'js.edited': '(edited)',
        'js.edit': 'Edit',
        'js.deleteCommentConfirm': 'Delete comment?',
        'js.cancel': 'Cancel',
        'js.save': 'Save',
        'js.linkCopied': 'Link copied!',
        'js.fillReg': 'Fill all registration fields',
        'js.passwordMismatch': 'Passwords do not match',
        'js.regError': 'Registration failed: ',
        'js.fillLogin': 'Fill login fields',
        'js.loginError': 'Login failed',
        'js.profNotFound': 'No profiles found for this user',
        'js.profReq': 'First name and last name are required.',
        'js.profUpdated': 'Profile updated!',
        'js.profFail': 'Error saving profile',
        'js.profLoadFail': 'Failed to load profile',
        'js.deleteSeries': 'Delete series',
        'js.deleteSeriesConfirm': 'Delete all recurring notes in this series?',
        'js.confirmSeries': 'Join series',
        'js.leaveSeries': 'Leave series',
        'js.confirmSeriesConfirm': 'Join all recurring notes in this series?',
        'js.leaveSeriesConfirm': 'Leave all recurring notes in this series?',
        'js.recurrenceInfo': 'Recurring note',
        'rec.type': 'Repeat type',
        'rec.none': 'No repeat',
        'rec.daily': 'Daily',
        'rec.weekly': 'Weekly',
        'rec.monthly': 'Monthly',
        'rec.interval': 'Interval (every N)',
        'rec.daysOfWeek': 'Days of week',
        'rec.dayMon': 'Mon', 'rec.dayTue': 'Tue', 'rec.dayWed': 'Wed', 'rec.dayThu': 'Thu',
        'rec.dayFri': 'Fri', 'rec.daySat': 'Sat', 'rec.daySun': 'Sun',
        'rec.endType': 'End',
        'rec.endNever': 'Never',
        'rec.endDate': 'By date',
        'rec.endCount': 'By count',
        'rec.endDateLabel': 'End date',
        'rec.endCountLabel': 'Number of occurrences',
        'rec.apply': 'Apply and create',
        'modal.recurrenceTitle': 'Recurrence',
        'rec.noteTitle': 'Title (optional)',
        'rec.noteTitlePlaceholder': 'Note title',
        'js.recDaily': 'daily',
        'js.recWeekly': 'weekly',
        'js.recMonthly': 'monthly',
        'js.recEvery': 'every',
        'js.recDays': 'days',
        'js.recWeeks': 'weeks',
        'js.recMonths': 'months',
        'js.recUntil': 'until',
        'js.recTimes': 'times',
        'js.noEvents': 'No events',
        'js.eventOf': 'of',
        'js.editTitle': 'Edit title',
        'js.saveTitle': 'Save',
        'js.titlePlaceholder': 'Note title',
        'js.addTitle': 'Click to add title',
        'nav.calendar': 'Calendar',
        'nav.upcoming': 'Upcoming',
        'upcoming.title': 'Upcoming Events',
        'upcoming.noEvents': 'No upcoming events',
        'upcoming.participants': 'participants',
        'upcoming.comments': 'comments',
        'upcoming.recurring': 'Recurring',
        'upcoming.confirmed': 'You are attending',
        'upcoming.notConfirmed': 'Not attending',
        'upcoming.today': 'Today',
        'upcoming.tomorrow': 'Tomorrow',
        'upcoming.loadMore': 'Show more'
    }
}

function getT(key) {
    return translations[currentLang][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = getT(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = getT(key);
    });
    const langBtn = document.getElementById('langSwitchBtn');
    if (langBtn) {
        langBtn.innerText = currentLang === 'ru' ? 'EN' : 'RU';
    }

    if (window.appCalendar) {
        window.appCalendar.render(); // Re-render to update translations inside calendar events
    }

    // Update participant count label immediately
    const groupParticipantCountLabel = document.getElementById('groupParticipantCountLabel');
    if (groupParticipantCountLabel) {
        groupParticipantCountLabel.innerText = getT('js.participants');
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('askdate_lang', currentLang);
    applyTranslations();
    fetchGroups(); // Re-render groups/participants language strings
}

const API_URL = '/api';
const USERS_API_URL = '/api';
window.token = localStorage.getItem('askdate_token') || '';
window.profileId = localStorage.getItem('askdate_profileId') || '';
window.refreshToken = localStorage.getItem('askdate_refresh_token') || '';
window.currentGroupId = null;
window.currentGroupCreatorId = null;
window.autoRefreshInterval = null;

// --- JWT Token Helpers ---
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function isTokenExpired(token) {
    if (!token) return true;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
    // Check with 30 second buffer to avoid edge cases
    return (payload.exp * 1000) < (Date.now() - 30000);
}

function forceLogout(showMessage) {
    window.token = '';
    window.profileId = '';
    window.refreshToken = '';
    window.currentGroupId = null;
    window.currentGroupCreatorId = null;
    localStorage.removeItem('askdate_token');
    localStorage.removeItem('askdate_profileId');
    localStorage.removeItem('askdate_refresh_token');
    localStorage.removeItem('askdate_currentGroupId');
    if (window.autoRefreshInterval) {
        clearInterval(window.autoRefreshInterval);
        window.autoRefreshInterval = null;
    }
    showView('loginView');
    if (showMessage) {
        appAlert(currentLang === 'ru' ? 'Сессия истекла. Пожалуйста, войдите заново.' : 'Session expired. Please log in again.');
    }
}

async function tryRefreshToken() {
    const rt = window.refreshToken || localStorage.getItem('askdate_refresh_token');
    if (!rt) return false;

    try {
        const res = await fetch(`${USERS_API_URL}/User/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: rt })
        });

        if (!res.ok) return false;

        const data = await res.json();
        window.token = data.token;
        window.refreshToken = data.refreshToken;
        localStorage.setItem('askdate_token', data.token);
        localStorage.setItem('askdate_refresh_token', data.refreshToken);
        return true;
    } catch (e) {
        console.error('Token refresh failed:', e);
        return false;
    }
}

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
    applyTranslations();
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode) {
        localStorage.setItem('pending_join', joinCode);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (window.token && window.profileId) {
        if (isTokenExpired(window.token)) {
            // Try refresh before logging out
            (async () => {
                const refreshed = await tryRefreshToken();
                if (refreshed) {
                    checkAuth();
                } else {
                    forceLogout(false);
                }
            })();
        } else {
            checkAuth();
        }
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
    navigator.clipboard.writeText(fullUrl).then(() => showToast(getT('js.linkCopied')));
}

async function fetchCurrentUserName() {
    try {
        if (isTokenExpired(window.token)) {
            const refreshed = await tryRefreshToken();
            if (!refreshed) {
                forceLogout(true);
                return;
            }
        }
        const res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
            headers: { 'Authorization': `Bearer ${window.token}` }
        });
        if (res.status === 401) {
            const refreshed = await tryRefreshToken();
            if (refreshed) {
                const retryRes = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
                    headers: { 'Authorization': `Bearer ${window.token}` }
                });
                if (retryRes.ok) {
                    const profile = await retryRes.json();
                    document.getElementById('headerUserName').innerText = `${profile.firstName} ${profile.lastName}`;
                }
            } else {
                forceLogout(true);
            }
            return;
        }
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
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const firstName = document.getElementById('regFirstName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
        return appAlert(getT('js.fillReg'));
    }

    if (password !== confirmPassword) {
        return appAlert(getT('js.passwordMismatch'));
    }

    try {
        const regRes = await fetch(`${USERS_API_URL}/User/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirmPassword })
        });

        if (!regRes.ok) {
            return appAlert(getT('js.regError') + await regRes.text());
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

        setTokens(loginData.token, newProfileId, loginData.refreshToken);
    } catch (e) {
        console.error(e);
        appAlert("Error connecting to UsersApi");
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) return appAlert(getT('js.fillLogin'));

    try {
        const res = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) return appAlert(getT('js.loginError'));

        const data = await res.json();

        // Fetch profiles
        const profRes = await fetch(`${USERS_API_URL}/Profile/user/${data.userId}`);
        if (!profRes.ok) return appAlert(getT('js.profNotFound'));

        const profiles = await profRes.json();
        if (!profiles || profiles.length === 0) return appAlert(getT('js.profNotFound'));

        setTokens(data.token, profiles[0].id, data.refreshToken);
    } catch (e) {
        console.error(e);
        appAlert("Error connecting to UsersApi");
    }
}

function setTokens(t, pId, rt) {
    window.token = t;
    window.profileId = pId;
    window.refreshToken = rt || '';
    localStorage.setItem('askdate_token', window.token);
    localStorage.setItem('askdate_profileId', window.profileId);
    if (rt) localStorage.setItem('askdate_refresh_token', rt);
    checkAuth();
}

function logoutUser() {
    window.token = '';
    window.profileId = '';
    window.refreshToken = '';
    window.currentGroupId = null;
    window.currentGroupCreatorId = null;
    localStorage.removeItem('askdate_token');
    localStorage.removeItem('askdate_profileId');
    localStorage.removeItem('askdate_refresh_token');
    localStorage.removeItem('askdate_currentGroupId');
    if (window.autoRefreshInterval) {
        clearInterval(window.autoRefreshInterval);
        window.autoRefreshInterval = null;
    }
    showView('loginView');
}

async function checkAuth() {
    if (window.token && window.profileId) {
        // Validate token isn't expired before showing main content
        if (isTokenExpired(window.token)) {
            // Try refresh before force logout
            const refreshed = await tryRefreshToken();
            if (!refreshed) {
                forceLogout(true);
                return;
            }
        }
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
    // Pre-check token expiry — try refresh first
    if (isTokenExpired(window.token)) {
        const refreshed = await tryRefreshToken();
        if (!refreshed) {
            forceLogout(true);
            return false;
        }
    }

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
            // Try refresh token before force logout
            const refreshed = await tryRefreshToken();
            if (refreshed) {
                // Retry the original request with new token
                options.headers['Authorization'] = `Bearer ${window.token}`;
                const retryResponse = await fetch(`${API_URL}${endpoint}`, options);
                if (!retryResponse.ok) {
                    if (retryResponse.status === 401) {
                        forceLogout(true);
                    } else if (retryResponse.status === 204) {
                        return null;
                    } else {
                        appAlert(`Ошибка: ${retryResponse.status} ${retryResponse.statusText}`);
                    }
                    return false;
                }
                if (retryResponse.status === 204) return true;
                const retryText = await retryResponse.text();
                return retryText ? JSON.parse(retryText) : true;
            }
            forceLogout(true);
        } else if (response.status === 204) {
            return null; // OK no content
        } else {
            appAlert(`Ошибка: ${response.status} ${response.statusText}`);
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
    document.getElementById('groupParticipantCount').innerText = `${(group.participants || []).length}`;

    const deleteGroupBtn = document.getElementById('deleteGroupBtn');
    if (deleteGroupBtn) {
        deleteGroupBtn.classList.toggle('hidden', !isAdmin);
    }

    // update participants for modal
    const pList = document.getElementById('modalGroupParticipantsList');
    pList.innerHTML = '';

    (group.participants || []).forEach(p => {
        const canDelete = isAdmin || String(p.profileId) === String(window.profileId);

        const roleLabel = p.role === 1 ? getT('js.creator') : getT('js.member');

        const liModal = document.createElement('li');
        liModal.className = 'list-item';
        liModal.innerHTML = `<span>${p.profileName} (${roleLabel})</span> 
        ${canDelete ? `<span style="cursor:pointer; color:var(--danger); font-size:12px; text-decoration:underline;" onclick="event.stopPropagation(); removeParticipant(${p.profileId})" title="${getT('js.remove')}">${getT('js.remove')}</span>` : ''}`;
        pList.appendChild(liModal);
    });

    fetchNotes();
}

// --- Tab switching (calendar / upcoming events) ---
window._activeTab = 'calendar';

function switchTab(tab) {
    window._activeTab = tab;
    document.getElementById('calendarTab').classList.toggle('hidden', tab !== 'calendar');
    document.getElementById('upcomingTab').classList.toggle('hidden', tab !== 'upcoming');
    document.getElementById('tabCalendar').classList.toggle('tab-active', tab === 'calendar');
    document.getElementById('tabUpcoming').classList.toggle('tab-active', tab === 'upcoming');

    if (tab === 'upcoming') {
        renderUpcomingEvents();
    } else if (tab === 'calendar' && window.appCalendar) {
        // FullCalendar can't size correctly while hidden — recalc on show
        setTimeout(() => window.appCalendar.updateSize(), 0);
    }
}

window._upcomingShownCount = 0;
const UPCOMING_PAGE_SIZE = 50;

function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEventsList');
    if (!container) return;

    const notes = window.currentNotes || [];
    const today = new Date().toISOString().split('T')[0];

    // Filter to upcoming (today and future), sort by date
    let upcoming = notes.filter(n => n.date.split('T')[0] >= today);
    upcoming.sort((a, b) => a.date.split('T')[0].localeCompare(b.date.split('T')[0]));

    // Store for lazy loading
    window._upcomingAll = upcoming;
    window._upcomingShownCount = 0;

    appendUpcomingEvents(container, true);
}

function appendUpcomingEvents(container, isInitial) {
    const upcoming = window._upcomingAll || [];
    const pageSize = UPCOMING_PAGE_SIZE;
    const start = window._upcomingShownCount;
    const end = Math.min(start + pageSize, upcoming.length);

    if (isInitial && upcoming.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px 0; color:var(--text-secondary);">${getT('upcoming.noEvents')}</div>`;
        return;
    }

    const profileId = parseInt(window.profileId);
    const pageItems = upcoming.slice(start, end);

    // Group by date within this page
    const grouped = {};
    pageItems.forEach(n => {
        const d = n.date.split('T')[0];
        if (!grouped[d]) grouped[d] = [];
        grouped[d].push(n);
    });

    let html = '';
    const todayObj = new Date(); todayObj.setHours(12,0,0,0);
    const tomorrowObj = new Date(todayObj); tomorrowObj.setDate(tomorrowObj.getDate() + 1);

    Object.keys(grouped).sort().forEach(dateStr => {
        const dateObj = new Date(dateStr + 'T12:00:00');
        let dateLabel;
        if (dateStr === todayObj.toISOString().split('T')[0]) {
            dateLabel = getT('upcoming.today');
        } else if (dateStr === tomorrowObj.toISOString().split('T')[0]) {
            dateLabel = getT('upcoming.tomorrow');
        } else {
            dateLabel = dateObj.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' });
        }

        html += `<div class="upcoming-date-header">${dateLabel}</div>`;
        html += `<div class="upcoming-date-group">`;

        grouped[dateStr].forEach(note => {
            const isRecurring = (note.recurrenceType && note.recurrenceType !== 'none') || note.parentNoteId || note.isVirtual;
            const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(profileId);
            const participantCount = note.confirmedProfileNames ? note.confirmedProfileNames.length : 0;
            const commentCount = note.comments ? note.comments.length : 0;
            const hasTitle = note.title && note.title.trim();

            html += `
            <div class="upcoming-card ${isRecurring ? 'upcoming-card-recurring' : ''}" onclick="openDayPanelFromUpcoming('${dateStr}', ${note.id})">
                <div class="upcoming-card-header">
                    ${hasTitle ? `<span class="upcoming-card-title">${note.title}</span>` : ''}
                    ${isRecurring ? `<span class="upcoming-badge recurring-badge">&#x21bb; ${getT('upcoming.recurring')}</span>` : ''}
                </div>
                <div class="upcoming-card-body">
                    <div class="upcoming-card-info">
                        <svg class="upcoming-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        ${participantCount} ${getT('upcoming.participants')}
                    </div>
                    <div class="upcoming-card-info">
                        <svg class="upcoming-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        ${commentCount} ${getT('upcoming.comments')}
                    </div>
                    <div class="upcoming-card-info">
                        <span class="upcoming-status ${isConfirmed ? 'status-confirmed' : 'status-not-confirmed'}">${isConfirmed ? getT('upcoming.confirmed') : getT('upcoming.notConfirmed')}</span>
                    </div>
                </div>
                ${!hasTitle ? `<div class="upcoming-card-creator">${note.creatorName || ''}</div>` : ''}
            </div>`;
        });

        html += `</div>`;
    });

    // Remove old "load more" button if exists
    const oldBtn = container.querySelector('.upcoming-load-more');
    if (oldBtn) oldBtn.remove();

    if (isInitial) {
        container.innerHTML = html;
    } else {
        container.insertAdjacentHTML('beforeend', html);
    }

    window._upcomingShownCount = end;

    // Add "load more" button if there are more items
    if (end < upcoming.length) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline upcoming-load-more';
        btn.style.cssText = 'display:block; width:100%; margin:12px 0;';
        btn.textContent = `${getT('upcoming.loadMore')} (${upcoming.length - end})`;
        btn.onclick = () => appendUpcomingEvents(container, false);
        container.appendChild(btn);
    }
}

window.appendUpcomingEvents = appendUpcomingEvents;

function openDayPanelFromUpcoming(dateStr, noteId) {
    openDayPanel(dateStr);
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
    const confirmed = await appConfirm(getT('js.deleteConfirm'));
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
    if (!link) return appAlert(getT('js.enterLink'));

    if (link.includes('join=')) {
        link = new URLSearchParams(link.substring(link.indexOf('?'))).get('join');
    }

    const group = await apiCall(`/groups/invite/${link}`);
    if (group) {
        await apiCall(`/groups/${group.id}/participants`, 'POST');
        await appAlert(`${getT('js.joined')} ${group.name}`);
        document.getElementById('inviteLinkInput').value = '';
        closeAllModals();
        fetchGroups();
    }
}

async function removeParticipant(userId) {
    const confirmed = await appConfirm(getT('js.removeConfirm'));
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
    if (window._activeTab === 'upcoming') renderUpcomingEvents();
}

function initCalendar(notes) {
    const calendarEl = document.getElementById('calendar');

    // Group notes by date
    const notesByDate = {};
    notes.forEach(n => {
        const d = n.date.split('T')[0];
        if (!notesByDate[d]) notesByDate[d] = [];
        notesByDate[d].push(n);
    });

    // Create one event per date: multi-event days show count of events, single shows participants
    const events = Object.entries(notesByDate).map(([date, dayNotes]) => {
        if (dayNotes.length > 1) {
            const hasRecurring = dayNotes.some(n =>
                (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual
            );
            return {
                id: 'multi-' + date,
                title: String(dayNotes.length),
                date: date,
                extendedProps: { dateStr: date, isMulti: true, count: dayNotes.length },
                classNames: hasRecurring ? ['fc-event-recurring'] : []
            };
        } else {
            const n = dayNotes[0];
            const count = n.confirmedProfileNames ? n.confirmedProfileNames.length : 0;
            const isRecurring = (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual;
            return {
                id: n.id,
                title: String(count),
                date: date,
                extendedProps: { note: n, isMulti: false },
                classNames: isRecurring ? ['fc-event-recurring'] : []
            };
        }
    });

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
            const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === info.dateStr);
            if (dayNotes.length === 0) {
                // No events on this day — open create note modal directly
                createNoteForDate(info.dateStr);
            } else {
                openDayPanel(info.dateStr);
            }
        },
        eventClick: function(info) {
            const dateStr = info.event.startStr;
            const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);
            openDayPanel(dateStr);
        },
        eventContent: function(arg) {
            const isRec = arg.event.classNames.includes('fc-event-recurring');
            const recCls = isRec ? ' fc-event-recurring' : '';
            const recIcon = isRec ? '&#x21bb; ' : '';
            if (arg.event.extendedProps.isMulti) {
                const count = arg.event.extendedProps.count;
                return { html: `<div style="padding: 2px; text-align: center;"><span class="fc-event-badge${recCls}" title="${count} ${getT('js.events')}">${recIcon}${count} <span class="badge-text">${getT('js.events')}</span></span></div>` };
            } else {
                const note = arg.event.extendedProps.note;
                const count = note.confirmedProfileNames ? note.confirmedProfileNames.length : 0;
                return { html: `<div style="padding: 2px; text-align: center;"><span class="fc-event-badge${recCls}" title="${count} ${getT('js.participants')}">${recIcon}${count} <span class="badge-text">${getT('js.participants')}</span></span></div>` };
            }
        }
            });
    window.appCalendar.render();

    document.getElementById('dayPanel').classList.add('hidden');
}

function closeDayPanel() {
    document.getElementById('dayPanel').classList.add('hidden');
}

function getDatesWithNotes() {
    const dates = new Set();
    window.currentNotes.forEach(n => {
        dates.add(n.date.split('T')[0]);
    });
    return [...dates].sort();
}

function navigateDay(direction) {
    const datesWithNotes = getDatesWithNotes();
    const currentDate = window._currentDayDateStr;
    const currentIndex = datesWithNotes.indexOf(currentDate);

    let targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= datesWithNotes.length) return;

    openDayPanel(datesWithNotes[targetIndex]);
}

function updateDayNavButtons() {
    const datesWithNotes = getDatesWithNotes();
    const currentDate = window._currentDayDateStr;
    const currentIndex = datesWithNotes.indexOf(currentDate);

    const prevBtn = document.getElementById('dayNavPrev');
    const nextBtn = document.getElementById('dayNavNext');

    prevBtn.style.display = currentIndex > 0 ? '' : 'none';
    nextBtn.style.display = currentIndex < datesWithNotes.length - 1 ? '' : 'none';
}

function openDayPanel(dateStr) {
    document.getElementById('dayPanel').classList.remove('hidden');
    document.getElementById('dayTitle').innerText = dateStr;
    window._currentDayDateStr = dateStr;

    // Find ALL notes for this date
    const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);

    // Render event list in sidebar
    const eventsList = document.getElementById('dayEventsList');
    eventsList.innerHTML = '';

    const addNoteBtn = document.getElementById('dayAddNoteBtn');
    addNoteBtn.innerText = getT('js.addNote');

    let targetNote = null;

    if (dayNotes.length === 0) {
        // No events at all
        window.selectedNote = null;
        const li = document.createElement('li');
        li.className = 'list-item text-small';
        li.style.padding = '8px';
        li.innerText = getT('js.noEvents');
        eventsList.appendChild(li);
    } else {
        dayNotes.forEach((n, idx) => {
            const li = document.createElement('li');
            li.className = 'list-item day-event-item';
            li.dataset.noteId = n.id;
            const confirmCount = n.confirmedProfileNames ? n.confirmedProfileNames.length : 0;
            const isRecurring = (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual;
            const titleText = n.title ? n.title : `${confirmCount} ${getT('js.participants')}`;
            li.innerHTML = `<span class="day-event-label">${titleText}${isRecurring ? ' <span style="color:var(--accent);font-size:10px;">&#x21bb;</span>' : ''}</span>`;
            li.onclick = () => selectNoteInPanel(n.id);
            eventsList.appendChild(li);
        });

        // Always select the first note for this day
        targetNote = dayNotes[0];
        window.selectedNote = targetNote;
    }

    renderNoteDetail(targetNote);

    // If no notes, hide comment input
    if (!targetNote) {
        document.getElementById('newCommentContainer').style.display = 'none';
    }

    // Highlight selected in list
    highlightSelectedEvent();

    // Update prev/next navigation buttons
    updateDayNavButtons();
}

function highlightSelectedEvent() {
    document.querySelectorAll('.day-event-item').forEach(li => {
        li.classList.toggle('day-event-item-active', window.selectedNote && li.dataset.noteId == String(window.selectedNote.id));
    });
}

function selectNoteInPanel(noteId) {
    const note = window.currentNotes.find(n => n.id === noteId);
    if (!note) return;
    window.selectedNote = note;
    renderNoteDetail(note);
    highlightSelectedEvent();
    document.getElementById('newCommentContainer').style.display = 'flex';
}

function renderNoteDetail(note) {
    const actionsContainer = document.getElementById('dayActions');
    const participantsContainer = document.getElementById('dayParticipantsList');
    const commentsContainer = document.getElementById('dayCommentsList');

    actionsContainer.innerHTML = '';
    participantsContainer.innerHTML = '';
    commentsContainer.innerHTML = '';

    const detailArea = document.getElementById('dayViewDetails');

    if (!note) {
        detailArea.classList.add('hidden');
        document.getElementById('recurrenceIndicator').classList.add('hidden');
        document.getElementById('recurrenceIndicator').style.display = 'none';
        return;
    }

    detailArea.classList.remove('hidden');
    document.getElementById('newCommentContainer').style.display = 'flex';

    const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(parseInt(window.profileId));
    const isAdmin = String(window.profileId) === String(window.currentGroupCreatorId);
    const canDeleteNode = !note.isVirtual && !note.parentNoteId && (isAdmin || String(note.creatorProfileId) === String(window.profileId));

    // Show recurrence indicator if this note is part of a recurring series
    const recIndicator = document.getElementById('recurrenceIndicator');
    const recText = document.getElementById('recurrenceIndicatorText');
    const recActions = document.getElementById('recurrenceActions');
    const recDesc = getRecurrenceDescription(note);
    recActions.innerHTML = '';
    if (recDesc || note.isVirtual || note.parentNoteId) {
        recText.innerText = recDesc || getT('js.recurrenceInfo');
        recIndicator.classList.remove('hidden');
        recIndicator.style.display = 'flex';

        // Series action buttons
        const parentId = note.parentNoteId || note.id;
        const parentNote = window.currentNotes.find(n => n.id === parentId);
        const isSeriesCreator = parentNote && String(parentNote.creatorProfileId) === String(window.profileId);
        const canDeleteSeries = isAdmin || isSeriesCreator;
        const allSeriesConfirmed = isAllSeriesConfirmed(note);
        if (canDeleteSeries) {
            recActions.innerHTML += `<button class="btn btn-danger btn-small" style="font-size:10px; padding:2px 8px;" onclick="deleteNoteSeries()">${getT('js.deleteSeries')}</button>`;
        }
        if (allSeriesConfirmed) {
            recActions.innerHTML += `<button class="btn btn-outline btn-small" style="font-size:10px; padding:2px 8px;" onclick="toggleConfirmSeries(${parentId}, true)">${getT('js.leaveSeries')}</button>`;
        } else {
            recActions.innerHTML += `<button class="btn btn-outline btn-small" style="font-size:10px; padding:2px 8px;" onclick="toggleConfirmSeries(${parentId}, false)">${getT('js.confirmSeries')}</button>`;
        }
    } else {
        recIndicator.classList.add('hidden');
        recIndicator.style.display = 'none';
    }

     actionsContainer.innerHTML = `
        <div id="noteTitleArea" style="margin-bottom:8px; min-height:20px;">
            <span id="noteTitleDisplay" style="font-size:14px; font-weight:600; color:var(--text-primary); cursor:pointer; line-height:20px; display:block; ${note.title ? '' : 'font-style:italic; color:var(--text-secondary); font-weight:400;'}" onclick="startEditNoteTitle()">${note.title || getT('js.addTitle')}</span>
            <div id="noteTitleEdit" class="hidden" style="display:flex; gap:4px; align-items:center; padding-right:28px;">
                <input type="text" id="noteTitleInput" placeholder="${getT('js.titlePlaceholder')}" style="margin:0; height:26px; min-height:0; font-size:12px; flex:1; padding:1px 6px; width:auto; margin-bottom:0;" value="${note.title || ''}">
                <button class="btn btn-small" style="font-size:10px; padding:0 8px; height:26px; min-height:0; line-height:26px;" onclick="saveNoteTitle()">${getT('js.saveTitle')}</button>
                <button class="btn btn-outline btn-small" style="font-size:10px; padding:0 8px; height:26px; min-height:0; line-height:26px;" onclick="cancelEditNoteTitle()">${getT('js.cancel')}</button>
            </div>
        </div>
        <div class="flex-row mb-var">
            <button class="btn btn-outline btn-small" onclick="toggleConfirmNote(${note.id}, ${isConfirmed ? 'true' : 'false'})">
                ${isConfirmed ? getT('js.convenient') : getT('js.markConvenient')}
            </button>
            ${canDeleteNode ? `<button class="btn btn-danger btn-small" onclick="deleteNote(${note.id})">${getT('js.deleteNote')}</button>` : ''}
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
        participantsContainer.innerHTML = `<li class="list-item text-small" style="padding: 8px;">${getT('js.noParticipants')}</li>`;
    }

    fetchComments(note.id);
}

function updateNoteDetailInPlace(note) {
    // Update participants without full re-render to avoid flicker
    const participantsContainer = document.getElementById('dayParticipantsList');
    if (note.confirmedProfileNames && note.confirmedProfileNames.length > 0) {
        participantsContainer.innerHTML = note.confirmedProfileNames.map(name =>
            `<li class="list-item" style="padding:8px;">${name}</li>`
        ).join('');
    } else {
        participantsContainer.innerHTML = `<li class="list-item text-small" style="padding: 8px;">${getT('js.noParticipants')}</li>`;
    }

    // Update confirm button state
    const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(parseInt(window.profileId));
    const confirmBtn = document.querySelector('#dayActions .btn-outline');
    if (confirmBtn) {
        confirmBtn.textContent = isConfirmed ? getT('js.convenient') : getT('js.markConvenient');
        confirmBtn.onclick = () => toggleConfirmNote(note.id, isConfirmed);
    }

    // Update recurrence series confirm button
    const recActions = document.getElementById('recurrenceActions');
    if (recActions && (note.parentNoteId || note.isVirtual)) {
        const parentId = note.parentNoteId || note.id;
        const allSeriesConfirmed = isAllSeriesConfirmed(note);
        const seriesBtn = recActions.querySelector('.btn-outline');
        if (seriesBtn) {
            if (allSeriesConfirmed) {
                seriesBtn.textContent = getT('js.leaveSeries');
                seriesBtn.onclick = () => toggleConfirmSeries(parentId, true);
            } else {
                seriesBtn.textContent = getT('js.confirmSeries');
                seriesBtn.onclick = () => toggleConfirmSeries(parentId, false);
            }
        }
    }
}

async function createNoteForDate(dateStr) {
    if (!window.currentGroupId) return;

    // Store the date for later use in recurrence modal
    window.pendingNoteDate = dateStr;

    // Open recurrence modal
    resetRecurrenceForm();
    openModal('recurrenceModal');
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
    if (id < 0) {
        // Virtual instance — can't delete individually
        return appAlert(currentLang === 'ru' ? 'Нельзя удалить виртуальную отметку. Удалите серию.' : 'Cannot delete a virtual instance. Delete the series instead.');
    }
    const confirmed = await appConfirm(getT('js.deleteNoteConfirm'));
    if(!confirmed) return;
    await apiCall(`/groups/${window.currentGroupId}/notes/${id}`, 'DELETE');
    await fetchNotes();
    // Re-open the day panel for the same date
    const dateStr = window._currentDayDateStr;
    if (dateStr) {
        const remainingNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);
        if (remainingNotes.length > 0) {
            openDayPanel(dateStr);
        } else {
            closeDayPanel();
        }
    } else {
        closeDayPanel();
    }
}

// --- Recurrence helpers ---
let _pendingRecurrenceDate = null;

function resetRecurrenceForm() {
    document.getElementById('recNoteTitle').value = '';
    document.getElementById('recType').value = 'none';
    document.getElementById('recInterval').value = '1';
    document.getElementById('recEndDate').value = '';
    document.getElementById('recEndCount').value = '4';
    document.getElementById('recEndType').value = 'never';
    document.querySelectorAll('.rec-day-cb').forEach(cb => cb.checked = false);
    onRecurrenceTypeChange();
    onRecurrenceEndTypeChange();
}

function onRecurrenceTypeChange() {
    const type = document.getElementById('recType').value;
    document.getElementById('recIntervalGroup').classList.toggle('hidden', type === 'none');
    document.getElementById('recDaysGroup').classList.toggle('hidden', type !== 'weekly');
    document.getElementById('recEndGroup').classList.toggle('hidden', type === 'none');
}

function onRecurrenceEndTypeChange() {
    const endType = document.getElementById('recEndType').value;
    document.getElementById('recEndDateGroup').classList.toggle('hidden', endType !== 'date');
    document.getElementById('recEndCountGroup').classList.toggle('hidden', endType !== 'count');
}

async function applyRecurrenceAndCreate() {
    if (!window.currentGroupId || !window.pendingNoteDate) return;

    const dateStr = window.pendingNoteDate;
    const dateISO = dateStr + "T00:00:00Z";

    const recType = document.getElementById('recType').value;
    const noteTitle = document.getElementById('recNoteTitle').value.trim();
    const body = { date: dateISO };

    if (noteTitle) {
        body.title = noteTitle;
    }

    if (recType !== 'none') {
        body.recurrenceType = recType;
        body.recurrenceInterval = parseInt(document.getElementById('recInterval').value) || 1;

        if (recType === 'weekly') {
            const days = [];
            document.querySelectorAll('.rec-day-cb:checked').forEach(cb => {
                days.push(cb.value);
            });
            if (days.length === 0) {
                // Default to the day of the selected date
                const d = new Date(dateStr);
                let dayNum = d.getDay(); // 0=Sun
                if (dayNum === 0) dayNum = 7;
                days.push(String(dayNum));
            }
            body.recurrenceDaysOfWeek = days.join(',');
        }

        const endType = document.getElementById('recEndType').value;
        if (endType === 'date') {
            const endDate = document.getElementById('recEndDate').value;
            if (endDate) {
                body.recurrenceEndDate = endDate + "T23:59:59Z";
            }
        } else if (endType === 'count') {
            body.recurrenceCount = parseInt(document.getElementById('recEndCount').value) || 4;
        }
    }

    const note = await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', body);
    if (note) {
        closeAllModals();
        await fetchNotes();
        openDayPanel(dateStr);
    }
}

async function deleteNoteSeries() {
    const note = window.selectedNote;
    if (!note) return;

    // Find the parent note id — handle both real and virtual notes
    let parentId;
    if (note.isVirtual) {
        parentId = note.parentNoteId;
    } else {
        parentId = note.parentNoteId || note.id;
    }
    if (!parentId) return;

    const confirmed = await appConfirm(getT('js.deleteSeriesConfirm'));
    if (!confirmed) return;

    await apiCall(`/groups/${window.currentGroupId}/notes/${parentId}/series`, 'DELETE');
    await fetchNotes();
    const dateStr = window._currentDayDateStr;
    if (dateStr) {
        const remainingNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);
        if (remainingNotes.length > 0) {
            openDayPanel(dateStr);
        } else {
            closeDayPanel();
        }
    } else {
        closeDayPanel();
    }
}

function isAllSeriesConfirmed(note) {
    const parentId = note.parentNoteId || note.id;
    const profileId = parseInt(window.profileId);
    
    // For "Leave series", just check if the user confirmed the parent (first day)
    // This indicates they previously joined the series
    const parent = window.currentNotes.find(n => n.id === parentId);
    if (parent) {
        return parent.confirmedProfileIds && parent.confirmedProfileIds.includes(profileId);
    }
    // Fallback: check the note itself
    return note.confirmedProfileIds && note.confirmedProfileIds.includes(profileId);
}

async function toggleConfirmSeries(parentId, isLeaving) {
    const msg = isLeaving ? getT('js.leaveSeriesConfirm') : getT('js.confirmSeriesConfirm');
    const confirmed = await appConfirm(msg);
    if (!confirmed) return;

    if (isLeaving) {
        await apiCall(`/groups/${window.currentGroupId}/notes/${parentId}/confirm/series`, 'DELETE');
    } else {
        await apiCall(`/groups/${window.currentGroupId}/notes/${parentId}/confirm/series`, 'POST');
    }

    await fetchNotes();
    const dateStr = window._currentDayDateStr;
    if (dateStr) {
        const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);
        const currentNote = window.selectedNote;
        const refreshed = dayNotes.find(n => n.id === (currentNote?.id));
        openDayPanel(dateStr);
    }
}

function getRecurrenceDescription(note) {
    if (!note) return null;
    
    // For virtual instances or real children, get the parent's recurrence info
    if (note.isVirtual || (note.parentNoteId && (!note.recurrenceType || note.recurrenceType === 'none'))) {
        const parentId = note.parentNoteId;
        const parent = window.currentNotes.find(n => n.id === parentId);
        if (parent) return getRecurrenceDescription(parent);
        // If parent not found, just show generic info
        return null;
    }
    
    if (note.recurrenceType === 'none' || note.recurrenceType === undefined) return null;
    
    const type = note.recurrenceType;
    const interval = note.recurrenceInterval || 1;
    
    let desc = '';
    if (type === 'daily') {
        desc = interval === 1 ? getT('js.recDaily') : `${getT('js.recEvery')} ${interval} ${getT('js.recDays')}`;
    } else if (type === 'weekly') {
        desc = interval === 1 ? getT('js.recWeekly') : `${getT('js.recEvery')} ${interval} ${getT('js.recWeeks')}`;
        if (note.recurrenceDaysOfWeek) {
            const dayNames = note.recurrenceDaysOfWeek.split(',').map(d => {
                const dayKey = ['', 'rec.dayMon', 'rec.dayTue', 'rec.dayWed', 'rec.dayThu', 'rec.dayFri', 'rec.daySat', 'rec.daySun'][parseInt(d)];
                return dayKey ? getT(dayKey) : '';
            }).filter(Boolean).join(', ');
            if (dayNames) desc += ` (${dayNames})`;
        }
    } else if (type === 'monthly') {
        desc = interval === 1 ? getT('js.recMonthly') : `${getT('js.recEvery')} ${interval} ${getT('js.recMonths')}`;
    }
    
    if (note.recurrenceEndDate) {
        desc += `, ${getT('js.recUntil')} ${note.recurrenceEndDate.split('T')[0]}`;
    } else if (note.recurrenceCount) {
        desc += `, ${note.recurrenceCount} ${getT('js.recTimes')}`;
    }
    
    return desc;
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
        if (updated) {
            window.selectedNote = updated;
            renderNoteDetail(updated);
            // Also refresh the event list sidebar item text
            const dateStr = window._currentDayDateStr;
            if (dateStr) {
                const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);
                const eventsList = document.getElementById('dayEventsList');
                eventsList.innerHTML = '';
                dayNotes.forEach(n => {
                    const li = document.createElement('li');
                    li.className = 'list-item day-event-item';
                    li.dataset.noteId = n.id;
                    const confirmCount = n.confirmedProfileNames ? n.confirmedProfileNames.length : 0;
                    const isRecurring = (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual;
                    const titleText = n.title ? n.title : `${confirmCount} ${getT('js.participants')}`;
                    li.innerHTML = `<span class="day-event-label">${titleText}${isRecurring ? ' <span style="color:var(--accent);font-size:10px;">&#x21bb;</span>' : ''}</span>`;
                    li.onclick = () => selectNoteInPanel(n.id);
                    eventsList.appendChild(li);
                });
                highlightSelectedEvent();
            }
        }
    }
}

// --- Note title editing ---
function startEditNoteTitle() {
    const display = document.getElementById('noteTitleDisplay');
    const edit = document.getElementById('noteTitleEdit');
    if (display) display.classList.add('hidden');
    if (edit) edit.classList.remove('hidden');
    const input = document.getElementById('noteTitleInput');
    if (input) input.focus();
}

function cancelEditNoteTitle() {
    const display = document.getElementById('noteTitleDisplay');
    const edit = document.getElementById('noteTitleEdit');
    if (display) display.classList.remove('hidden');
    if (edit) edit.classList.add('hidden');
}

async function saveNoteTitle() {
    if (!window.selectedNote) return;
    const input = document.getElementById('noteTitleInput');
    const newTitle = input ? input.value.trim() : '';
    
    const result = await apiCall(`/groups/${window.currentGroupId}/notes/${window.selectedNote.id}/title`, 'PUT', { title: newTitle || null });
    if (result) {
        await fetchNotes();
        const dateStr = window._currentDayDateStr;
        if (dateStr) {
            const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === dateStr);
            const updated = dayNotes.find(n => n.id === window.selectedNote.id);
            if (updated) {
                window.selectedNote = updated;
                renderNoteDetail(updated);
                // Refresh sidebar list text
                const eventsList = document.getElementById('dayEventsList');
                eventsList.innerHTML = '';
                dayNotes.forEach(n => {
                    const li = document.createElement('li');
                    li.className = 'list-item day-event-item';
                    li.dataset.noteId = n.id;
                    const confirmCount = n.confirmedProfileNames ? n.confirmedProfileNames.length : 0;
                    const isRecurring = (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual;
                    const titleText = n.title ? n.title : `${confirmCount} ${getT('js.participants')}`;
                    li.innerHTML = `<span class="day-event-label">${titleText}${isRecurring ? ' <span style="color:var(--accent);font-size:10px;">&#x21bb;</span>' : ''}</span>`;
                    li.onclick = () => selectNoteInPanel(n.id);
                    eventsList.appendChild(li);
                });
                highlightSelectedEvent();
            }
        }
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
                     dateStr += ` <span style="color:var(--text-secondary);font-size:10px;">${getT('js.edited')}</span>`;
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
                        ${isAuthor ? `<span style="cursor:pointer; color:var(--text-secondary); font-size:12px; margin-right:12px; text-decoration:underline;" onclick="startEditComment(${c.id})">${getT('js.edit')}</span>` : ''}
                        ${canDeleteComment ? `<span style="cursor:pointer; color:var(--danger); font-size:12px; text-decoration:underline;" onclick="deleteComment(${noteId}, ${c.id})">${getT('js.remove')}</span>` : ''}
                    </div>
                </div>
                <div class="mt-var text-small" style="line-height:1.4;">${c.content}</div>
                <input type="hidden" id="rawContent_${c.id}" value="${escapeQuotes(c.content)}">
            </div>
            <div id="commentEdit_${c.id}" class="hidden mt-var">
                <input type="text" id="editInput_${c.id}" style="margin-bottom:8px; width:100%;">
                <div class="flex-row">
                    <button class="btn btn-small" onclick="saveComment(${noteId}, ${c.id})">${getT('js.save')}</button>
                    <button class="btn btn-outline btn-small" onclick="cancelEditComment(${c.id})">${getT('js.cancel')}</button>
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
    const confirmed = await appConfirm(getT('js.deleteCommentConfirm'));
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
window.deleteNoteSeries = deleteNoteSeries;
window.toggleConfirmSeries = toggleConfirmSeries;
window.switchTab = switchTab;
window.onRecurrenceTypeChange = onRecurrenceTypeChange;
window.onRecurrenceEndTypeChange = onRecurrenceEndTypeChange;
window.applyRecurrenceAndCreate = applyRecurrenceAndCreate;
window.selectNoteInPanel = selectNoteInPanel;
window.startEditNoteTitle = startEditNoteTitle;
window.cancelEditNoteTitle = cancelEditNoteTitle;
window.saveNoteTitle = saveNoteTitle;

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
        appAlert(getT('js.profLoadFail'));
    }
}

async function saveProfile() {
    const firstName = document.getElementById('profFirstName').value.trim();
    const lastName = document.getElementById('profLastName').value.trim();
    const newPassword = document.getElementById('profNewPassword').value;

    if (!firstName || !lastName) {
        return appAlert(getT('js.profReq'));
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
            showToast(getT('js.profUpdated'));
        } else {
            appAlert(getT('js.profFail'));
        }
    } catch (e) {
        appAlert(getT('js.profFail'));
    }
}
window.openProfileModal = openProfileModal;
window.saveProfile = saveProfile;

// Auto-refresh periodically
window.autoRefreshInterval = setInterval(async () => {
    if (!window.currentGroupId || !window.token) return;
    try {
        const group = await apiCall(`/groups/${window.currentGroupId}`);
        if (!group) return;

        document.getElementById('groupParticipantCount').innerText = `${(group.participants || []).length}`;

        const notes = await apiCall(`/groups/${window.currentGroupId}/notes`);
        if (notes) {
            window.currentNotes = notes;
            initCalendar(notes);

            if (window.selectedNote && !document.getElementById('dayPanel').classList.contains('hidden')) {
                const activeDate = window._currentDayDateStr;
                if (activeDate) {
                    const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === activeDate);

                    // Incrementally update the event list sidebar (avoid flicker)
                    const eventsList = document.getElementById('dayEventsList');
                    const existingIds = new Set();
                    dayNotes.forEach(n => {
                        existingIds.add(String(n.id));
                        const li = eventsList.querySelector(`[data-note-id="${n.id}"]`);
                        const confirmCount = n.confirmedProfileNames ? n.confirmedProfileNames.length : 0;
                        const isRecurring = (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual;
                        const titleText = n.title ? n.title : `${confirmCount} ${getT('js.participants')}`;
                        const inner = `<span class="day-event-label">${titleText}${isRecurring ? ' <span style="color:var(--accent);font-size:10px;">&#x21bb;</span>' : ''}</span>`;
                        if (li) {
                            li.innerHTML = inner;
                        } else {
                            const newLi = document.createElement('li');
                            newLi.className = 'list-item day-event-item';
                            newLi.dataset.noteId = n.id;
                            newLi.innerHTML = inner;
                            newLi.onclick = () => selectNoteInPanel(n.id);
                            eventsList.appendChild(newLi);
                        }
                    });
                    // Remove items for notes that no longer exist on this date
                    eventsList.querySelectorAll('.day-event-item').forEach(li => {
                        if (!existingIds.has(li.dataset.noteId)) li.remove();
                    });

                    // Refresh selected note detail if still exists (skip if user is editing title)
                    const titleEditEl = document.getElementById('noteTitleEdit');
                    const isEditingTitle = titleEditEl && !titleEditEl.classList.contains('hidden');
                    const updatedNote = window.currentNotes.find(n => n.id === window.selectedNote.id);
                    if (updatedNote) {
                        window.selectedNote = updatedNote;
                        if (!isEditingTitle) {
                            updateNoteDetailInPlace(updatedNote);
                        }
                    } else if (dayNotes.length > 0) {
                        // Selected note was deleted, select first
                        window.selectedNote = dayNotes[0];
                        renderNoteDetail(dayNotes[0]);
                    } else {
                        // All notes deleted, close panel
                        closeDayPanel();
                        return;
                    }
                    highlightSelectedEvent();
                    updateDayNavButtons();
                }
            }
        }
    } catch(e) { }
}, 15000);