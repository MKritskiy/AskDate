let currentLang = localStorage.getItem('askdate_lang') || 'ru';
const translations = {
    'ru': {
        'nav.createGroup': 'Создать группу',
        'nav.joinGroup': 'Присоединиться',
        'nav.profile': 'Профиль',
        'nav.logout': 'Выйти',
        'nav.menu': 'Меню',
        'nav.admin': 'Админ',
        'nav.notifications': 'Уведомления',
        'realtime.online': 'Онлайн — изменения приходят мгновенно',
        'realtime.offline': 'Нет соединения — включён резервный режим',
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
        'group.qr': 'QR-код',
        'day.participants': 'Участники',
        'day.comments': 'Комментарии',
        'day.addComment': 'Добавить комментарий...',
        'day.send': 'Отправить',
        'day.copy': 'Копировать день',
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
        'modal.adminTitle': 'Админ-панель',
        'modal.statsTitle': 'Статистика группы',
        'modal.qrTitle': 'QR-код приглашения',
        'dialog.ok': 'ОК',
        'dialog.cancel': 'Отмена',
        'mode.free': 'Отмечаю свободные дни',
        'mode.busy': 'Отмечаю занятые дни',
        'mode.switchedFree': 'Режим: отмечаю свободные дни',
        'mode.switchedBusy': 'Режим: отмечаю занятые дни',
        'mode.freeTip': 'Зелёным отмечены дни, когда вы свободны',
        'mode.busyTip': 'Красным отмечены дни, когда вы заняты',
        'mode.shortFree': 'свободен',
        'mode.shortBusy': 'занят',
        'admin.selfRole': 'Нельзя менять свою роль',
        'legend.free': 'Мои свободные дни',
        'legend.busy': 'Мои занятые дни',
        'legend.allFree': 'Все участники свободны',
        'toolbar.stats': 'Статистика',
        'toolbar.export': 'Экспорт iCal',
        'hint.calendar': 'Кликните на день, чтобы создать отметку. Выделите диапазон мышью — создадутся сразу несколько.',
        'empty.noGroups': 'Пока нет групп. Создайте первую или присоединитесь по приглашению.',
        'upcoming.search': 'Поиск по названию или создателю...',
        'admin.reset': 'Сбросить пароль',
        'admin.delete': 'Удалить',
        'admin.makeAdmin': 'Сделать админом',
        'admin.removeAdmin': 'Снять админа',
        'admin.verified': 'подтверждён',
        'admin.notVerified': 'не подтверждён',
        'admin.created': 'создан',
        'admin.empty': 'Нет пользователей',
        'admin.newPassword': 'Новый пароль для',
        'admin.confirmDelete': 'Удалить пользователя',
        'admin.confirmRole': 'Изменить роль пользователя',
        'admin.toAdmin': 'на администратора?',
        'admin.toUser': 'на обычного пользователя?',
        'stats.total': 'Всего событий',
        'stats.upcoming': 'Предстоящих событий',
        'stats.participation': 'Моё участие',
        'stats.topParticipant': 'Самый активный участник',
        'stats.members': 'Участников в группе',
        'stats.commonDays': 'Дней, когда свободны все',
        'notif.enabled': 'Уведомления включены',
        'notif.disabled': 'Уведомления выключены',
        'notif.unsupported': 'Браузер не поддерживает уведомления',
        'notif.blocked': 'Разрешение на уведомления не выдано',
        'notif.newNotes': 'Обновление событий группы',
        'notif.newComments': 'Новый комментарий',
        'notif.groupChanged': 'Изменения в группе',
        'js.participants': 'участников',
        'js.events': 'событий',
        'js.creator': 'Создатель',
        'js.member': 'Участник',
        'js.you': 'вы',
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
        'js.copiedDay': 'День скопирован в буфер обмена',
        'js.exportDone': 'Календарь экспортирован в iCal',
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
        'rec.time': 'Время (необязательно)',
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
        'js.rangeConfirm': 'Создать отметки на',
        'js.rangeDays': 'дн. (с',
        'js.rangeTo': 'по',
        'js.editTitle': 'Изменить название',
        'js.saveTitle': 'Сохранить',
        'js.titlePlaceholder': 'Название отметки',
        'js.addTitle': 'Нажмите, чтобы добавить название',
        'nav.calendar': 'Календарь',
        'nav.upcoming': 'Предстоящие',
        'upcoming.title': 'Предстоящие события',
        'upcoming.noEvents': 'Нет предстоящих событий',
        'upcoming.noMatch': 'Ничего не найдено',
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
        'nav.admin': 'Admin',
        'nav.notifications': 'Notifications',
        'realtime.online': 'Online — changes arrive instantly',
        'realtime.offline': 'No connection — fallback mode active',
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
        'group.qr': 'QR code',
        'day.participants': 'Participants',
        'day.comments': 'Comments',
        'day.addComment': 'Add a comment...',
        'day.send': 'Send',
        'day.copy': 'Copy day',
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
        'modal.adminTitle': 'Admin panel',
        'modal.statsTitle': 'Group stats',
        'modal.qrTitle': 'Invite QR code',
        'dialog.ok': 'OK',
        'dialog.cancel': 'Cancel',
        'mode.free': 'I mark free days',
        'mode.busy': 'I mark busy days',
        'mode.switchedFree': 'Mode: marking free days',
        'mode.switchedBusy': 'Mode: marking busy days',
        'mode.freeTip': 'Green highlights show days you are free',
        'mode.busyTip': 'Red highlights show days you are busy',
        'mode.shortFree': 'free',
        'mode.shortBusy': 'busy',
        'admin.selfRole': 'You cannot change your own role',
        'legend.free': 'My free days',
        'legend.busy': 'My busy days',
        'legend.allFree': 'Everyone is available',
        'toolbar.stats': 'Stats',
        'toolbar.export': 'Export iCal',
        'hint.calendar': 'Click a day to create an event. Drag over a range to create several at once.',
        'empty.noGroups': 'No groups yet. Create one or join via invite.',
        'upcoming.search': 'Search by title or creator...',
        'admin.reset': 'Reset password',
        'admin.delete': 'Delete',
        'admin.makeAdmin': 'Make admin',
        'admin.removeAdmin': 'Revoke admin',
        'admin.verified': 'verified',
        'admin.notVerified': 'not verified',
        'admin.created': 'created',
        'admin.empty': 'No users',
        'admin.newPassword': 'New password for',
        'admin.confirmDelete': 'Delete user',
        'admin.confirmRole': 'Change role of user',
        'admin.toAdmin': 'to administrator?',
        'admin.toUser': 'to regular user?',
        'stats.total': 'Total events',
        'stats.upcoming': 'Upcoming events',
        'stats.participation': 'My participation',
        'stats.topParticipant': 'Most active participant',
        'stats.members': 'Group members',
        'stats.commonDays': 'Days when everyone is free',
        'notif.enabled': 'Notifications enabled',
        'notif.disabled': 'Notifications disabled',
        'notif.unsupported': 'Browser does not support notifications',
        'notif.blocked': 'Notification permission denied',
        'notif.newNotes': 'Group events updated',
        'notif.newComments': 'New comment',
        'notif.groupChanged': 'Group changes',
        'js.participants': 'participants',
        'js.events': 'events',
        'js.creator': 'Creator',
        'js.member': 'Member',
        'js.you': 'you',
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
        'js.copiedDay': 'Day copied to clipboard',
        'js.exportDone': 'Calendar exported to iCal',
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
        'rec.time': 'Time (optional)',
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
        'js.rangeConfirm': 'Create marks for',
        'js.rangeDays': 'days (from',
        'js.rangeTo': 'to',
        'js.editTitle': 'Edit title',
        'js.saveTitle': 'Save',
        'js.titlePlaceholder': 'Note title',
        'js.addTitle': 'Click to add title',
        'nav.calendar': 'Calendar',
        'nav.upcoming': 'Upcoming',
        'upcoming.title': 'Upcoming Events',
        'upcoming.noEvents': 'No upcoming events',
        'upcoming.noMatch': 'Nothing found',
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
    document.querySelectorAll('[data-title-i18n]').forEach(el => {
        el.title = getT(el.getAttribute('data-title-i18n'));
    });
    const langBtn = document.getElementById('langSwitchBtn');
    if (langBtn) {
        langBtn.innerText = currentLang === 'ru' ? 'EN' : 'RU';
    }
    setRealtimeStatus(window._realtimeOnline === true);
    updateModeTooltips();
    updateNotifyButton();
    updateAvailabilitySummary();

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
    // Update FullCalendar locale
    if (window.appCalendar) {
        window.appCalendar.setOption('locale', currentLang);
    }
}

const API_URL = '/api';
const USERS_API_URL = '/api';
window.token = localStorage.getItem('askdate_token') || '';
window.profileId = localStorage.getItem('askdate_profileId') || '';
window.refreshToken = localStorage.getItem('askdate_refresh_token') || '';
window.currentGroupId = null;
window.currentGroupCreatorId = null;
window.currentGroup = null;
window.autoRefreshInterval = null;

// --- Small utilities ---
function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const AVATAR_COLORS = ['#EE6C4D', '#3D5A80', '#98C1D9', '#52B788', '#5C9CE6', '#B5838D', '#6D9773', '#C9ADA7'];

function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
}

function avatarHtml(name, id, small) {
    const initials = String(name || '?').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
    const color = AVATAR_COLORS[(id || hashStr(name || '?')) % AVATAR_COLORS.length];
    return `<span class="avatar${small ? ' avatar-small' : ''}" style="background:${color}" title="${esc(name)}">${esc(initials)}</span>`;
}

function debounce(fn, ms) {
    let t = null;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
}

function toLocalIsoStr(d) {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

function todayStr() {
    return toLocalIsoStr(new Date());
}

function addDaysIso(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().split('T')[0];
}

function noteTime(note) {
    const m = String(note.date || '').match(/T(\d{2}):(\d{2})/);
    if (!m) return null;
    return (m[1] === '00' && m[2] === '00') ? null : `${m[1]}:${m[2]}`;
}

function formatDateHuman(dateStr, opts) {
    const d = new Date(dateStr + 'T12:00:00');
    const locale = currentLang === 'ru' ? 'ru-RU' : 'en-US';
    return d.toLocaleDateString(locale, opts || { day: 'numeric', month: 'long' });
}

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

// JWT claim readers — tolerate both short and full-URI claim names
function jwtRole(payload) {
    return payload?.role || payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
}

function jwtUserId(payload) {
    return payload?.nameid || payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/nameidentifier'];
}

function isAdminUser() {
    const payload = parseJwt(window.token);
    return !!payload && jwtRole(payload) === 'Administrator';
}

function updateAdminVisibility() {
    const admin = isAdminUser();
    const adminBtn = document.getElementById('adminBtn');
    const adminLink = document.getElementById('adminMenuLink');
    if (adminBtn) adminBtn.classList.toggle('hidden', !admin);
    if (adminLink) adminLink.classList.toggle('hidden', !admin);
}

function forceLogout(showMessage) {
    window.token = '';
    window.profileId = '';
    window.refreshToken = '';
    window.currentGroupId = null;
    window.currentGroupCreatorId = null;
    window.currentGroup = null;
    localStorage.removeItem('askdate_token');
    localStorage.removeItem('askdate_profileId');
    localStorage.removeItem('askdate_refresh_token');
    localStorage.removeItem('askdate_currentGroupId');
    if (window.autoRefreshInterval) {
        clearInterval(window.autoRefreshInterval);
        window.autoRefreshInterval = null;
    }
    stopRealtime();
    updateAdminVisibility();
    setRealtimeStatus(false);
    commentsCache.clear();
    document.getElementById('groupDetails').classList.add('hidden');
    document.getElementById('calendarLegend').classList.add('hidden');
    document.getElementById('dayPanel').classList.add('hidden');
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
        updateAdminVisibility();
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

function showToast(msg, type) {
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ` toast-${type}` : '');
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

function toggleMobileMenu() {
    document.getElementById('mobileMenuDropdown').classList.toggle('hidden');
}

// --- Skeleton loaders ---
function showGroupsSkeleton() {
    const list = document.getElementById('groupsList');
    list.innerHTML = Array.from({ length: 3 }, () => '<li class="skeleton skeleton-line" style="padding:0;"></li>').join('');
}

function showCalendarSkeleton() {
    document.getElementById('calendarSkeleton').classList.remove('hidden');
}

function hideCalendarSkeleton() {
    document.getElementById('calendarSkeleton').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode) {
        localStorage.setItem('pending_join', joinCode);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const searchInput = document.getElementById('upcomingSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => renderUpcomingEvents(), 200));
    }

    setupKeyboardShortcuts();

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

function copyInviteLink() {
    const link = document.getElementById('groupInviteLink').innerText;
    const fullUrl = `${window.location.origin}/?join=${link}`;
    navigator.clipboard.writeText(fullUrl).then(() => showToast(getT('js.linkCopied'), 'success'));
}

function showInviteQr() {
    const link = document.getElementById('groupInviteLink').innerText;
    if (!link) return;
    document.getElementById('qrInviteCode').innerText = link;
    const container = document.getElementById('qrContainer');
    container.innerHTML = '';
    if (typeof QRCode === 'undefined') {
        showToast('QR library failed to load', 'error');
        return;
    }
    openModal('qrModal');
    // Render after the modal becomes visible (needs layout)
    setTimeout(() => {
        new QRCode(container, {
            text: `${window.location.origin}/?join=${link}`,
            width: 200,
            height: 200,
            colorDark: '#293241',
            colorLight: '#E0FBFC',
            correctLevel: QRCode.CorrectLevel.M
        });
    }, 50);
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
        const headers = { 'Authorization': `Bearer ${window.token}` };
        let res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, { headers });
        if (res.status === 401) {
            const refreshed = await tryRefreshToken();
            if (refreshed) {
                headers['Authorization'] = `Bearer ${window.token}`;
                res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, { headers });
            } else {
                forceLogout(true);
                return;
            }
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

        // Add profile (Profile API now requires authentication)
        const profileRes = await fetch(`${USERS_API_URL}/Profile/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
            },
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

        // Fetch profiles (authorized)
        const profRes = await fetch(`${USERS_API_URL}/Profile/user/${data.userId}`, {
            headers: { 'Authorization': `Bearer ${data.token}` }
        });
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
    updateAdminVisibility();
    checkAuth();
}

function logoutUser() {
    window.token = '';
    window.profileId = '';
    window.refreshToken = '';
    window.currentGroupId = null;
    window.currentGroupCreatorId = null;
    window.currentGroup = null;
    localStorage.removeItem('askdate_token');
    localStorage.removeItem('askdate_profileId');
    localStorage.removeItem('askdate_refresh_token');
    localStorage.removeItem('askdate_currentGroupId');
    if (window.autoRefreshInterval) {
        clearInterval(window.autoRefreshInterval);
        window.autoRefreshInterval = null;
    }
    stopRealtime();
    updateAdminVisibility();
    setRealtimeStatus(false);
    commentsCache.clear();
    document.getElementById('groupDetails').classList.add('hidden');
    document.getElementById('calendarLegend').classList.add('hidden');
    document.getElementById('dayPanel').classList.add('hidden');
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
        updateAdminVisibility();
        fetchCurrentUserName();
        ensureRealtime();

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

    let response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
        if (response.status === 401) {
            // Try refresh token before force logout
            const refreshed = await tryRefreshToken();
            if (refreshed) {
                // Retry the original request with new token
                options.headers['Authorization'] = `Bearer ${window.token}`;
                response = await fetch(`${API_URL}${endpoint}`, options);
            } else {
                forceLogout(true);
                return false;
            }
        }
        if (!response.ok) {
            if (response.status === 204) {
                return null; // OK no content
            }
            appAlert(`Ошибка: ${response.status} ${response.statusText}`);
            return false;
        }
    }

    if (response.status === 204) return true; // changed from null so if checks pass

    const text = await response.text();
    return text ? JSON.parse(text) : true;
}

// Authorized call to the Users API (admin panel, profile)
async function usersApi(endpoint, method = 'GET', body = null) {
    if (isTokenExpired(window.token)) {
        const refreshed = await tryRefreshToken();
        if (!refreshed) {
            forceLogout(true);
            return null;
        }
    }

    const headers = { 'Authorization': `Bearer ${window.token}` };
    if (body) headers['Content-Type'] = 'application/json';

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    let response = await fetch(`${USERS_API_URL}${endpoint}`, options);
    if (response.status === 401) {
        if (await tryRefreshToken()) {
            headers['Authorization'] = `Bearer ${window.token}`;
            response = await fetch(`${USERS_API_URL}${endpoint}`, options);
        } else {
            forceLogout(true);
            return null;
        }
    }
    if (!response.ok) {
        appAlert(`Ошибка: ${response.status} ${response.statusText}`);
        return null;
    }
    const text = await response.text();
    return text ? JSON.parse(text) : true;
}

// --- Groups ---
async function fetchGroups() {
    showGroupsSkeleton();
    const groups = await apiCall('/groups');
    if (!groups) { hideGroupsSkeleton(); return; }

    const list = document.getElementById('groupsList');
    list.innerHTML = '';
    const emptyState = document.getElementById('groupsEmpty');
    if (emptyState) emptyState.classList.toggle('hidden', groups.length > 0);

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

function hideGroupsSkeleton() {
    const list = document.getElementById('groupsList');
    if (list && list.querySelector('.skeleton')) {
        list.innerHTML = '';
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
        if (group.id) loadGroup(group.id);
    }
}

async function loadGroup(id) {
    const group = await apiCall(`/groups/${id}`);
    if (!group) return;

    if (document.getElementById('dayPanel')) closeDayPanel();

    // Switch realtime channel
    joinRealtimeGroup(id);

    window.currentGroupId = id;
    localStorage.setItem('askdate_currentGroupId', id);
    window.currentGroup = group;
    window.currentGroupCreatorId = group.creatorProfileId;

    document.getElementById('groupDetails').classList.remove('hidden');
    renderGroupHeader(group);
    renderParticipantsModal(group);
    renderAvailabilitySwitch();
    updateLegendVisibility();

    // Show calendar hint only while the group has no notes
    document.getElementById('calendarHint').classList.toggle('hidden', (window.currentNotes || []).length > 0);

    fetchNotes();
}

function renderGroupHeader(group) {
    const isAdmin = String(window.profileId) === String(group.creatorProfileId);

    document.getElementById('groupTitle').innerText = group.name;
    document.getElementById('editGroupNameInput').value = group.name;
    document.getElementById('saveGroupNameBtn').style.display = 'none';
    document.getElementById('groupInviteLink').innerText = group.inviteLink;
    document.getElementById('groupParticipantCount').innerText = `${(group.participants || []).length}`;

    const deleteGroupBtn = document.getElementById('deleteGroupBtn');
    if (deleteGroupBtn) {
        deleteGroupBtn.classList.toggle('hidden', !isAdmin);
    }
}

function renderParticipantsModal(group) {
    const isAdmin = String(window.profileId) === String(group.creatorProfileId);
    const pList = document.getElementById('modalGroupParticipantsList');
    pList.innerHTML = '';

    (group.participants || []).forEach(p => {
        const canDelete = isAdmin || String(p.profileId) === String(window.profileId);
        const roleLabel = p.role === 1 ? getT('js.creator') : getT('js.member');
        const modeLabel = p.availabilityMode === 1 ? getT('mode.shortBusy') : getT('mode.shortFree');

        const liModal = document.createElement('li');
        liModal.className = 'list-item';
        liModal.innerHTML = `<span class="participant-row">${avatarHtml(p.profileName, p.profileId)}<span class="participant-name">${esc(p.profileName)} (${roleLabel})</span></span>
        <span class="flex-row" style="gap:10px;">
            <span class="text-small" style="font-size:10px; opacity:0.7;" title="${getT(p.availabilityMode === 1 ? 'mode.busyTip' : 'mode.freeTip')}">${esc(modeLabel)}</span>
            ${canDelete ? `<span style="cursor:pointer; color:var(--danger); font-size:12px; text-decoration:underline;" onclick="event.stopPropagation(); removeParticipant(${p.profileId})" title="${getT('js.remove')}">${getT('js.remove')}</span>` : ''}
        </span>`;
        pList.appendChild(liModal);
    });
}

// --- Availability mode (free/busy marking) ---
function getMyAvailabilityMode() {
    const participants = (window.currentGroup && window.currentGroup.participants) || [];
    const me = participants.find(p => String(p.profileId) === String(window.profileId));
    return me ? (me.availabilityMode || 0) : 0;
}

function renderAvailabilitySwitch() {
    const mode = getMyAvailabilityMode();
    const freeBtn = document.getElementById('modeFreeBtn');
    const busyBtn = document.getElementById('modeBusyBtn');
    if (!freeBtn || !busyBtn) return;
    freeBtn.classList.toggle('active', mode !== 1);
    freeBtn.classList.toggle('free-active', mode !== 1);
    busyBtn.classList.toggle('active', mode === 1);
    busyBtn.classList.toggle('busy-active', mode === 1);
    updateModeTooltips();
}

function updateModeTooltips() {
    const sw = document.getElementById('availabilitySwitch');
    if (sw) sw.title = getT(getMyAvailabilityMode() === 1 ? 'mode.busyTip' : 'mode.freeTip');
}

async function setAvailabilityMode(mode) {
    if (!window.currentGroupId) return;
    if (getMyAvailabilityMode() === mode) return;

    const result = await apiCall(`/groups/${window.currentGroupId}/availability-mode`, 'PUT', { availabilityMode: mode });
    if (result === false) return;

    // Optimistic update — realtime broadcast will confirm
    const me = ((window.currentGroup && window.currentGroup.participants) || []).find(p => String(p.profileId) === String(window.profileId));
    if (me) me.availabilityMode = mode;

    renderAvailabilitySwitch();
    computeAvailability();
    if (window.appCalendar) window.appCalendar.render();
    updateAvailabilitySummary();
    updateLegendVisibility();
    showToast(getT(mode === 1 ? 'mode.switchedBusy' : 'mode.switchedFree'), 'success');
}

function updateLegendVisibility() {
    const legend = document.getElementById('calendarLegend');
    if (legend) legend.classList.toggle('hidden', !window.currentGroupId);
}

/**
 * Computes per-day availability colors:
 * - my marks colored by my mode (free = green, busy = red)
 * - days where every group member is available get an outline
 */
function computeAvailability() {
    window._dayColor = { free: new Set(), busy: new Set() };
    window._allFreeDates = new Set();
    if (!window.currentGroupId || !window.currentGroup) return;

    const participants = window.currentGroup.participants || [];
    const myMode = getMyAvailabilityMode();
    const profileIdStr = String(window.profileId);
    const notesByDate = groupNotesByDate();

    for (const [dateStr, dayNotes] of Object.entries(notesByDate)) {
        const confirmedMe = dayNotes.some(n => (n.confirmedProfileIds || []).map(String).includes(profileIdStr));
        if (confirmedMe) {
            (myMode === 1 ? window._dayColor.busy : window._dayColor.free).add(dateStr);
        }

        if (participants.length > 0) {
            const allFree = participants.every(p => {
                const confirmed = dayNotes.some(n => (n.confirmedProfileIds || []).includes(p.profileId));
                return p.availabilityMode === 1 ? !confirmed : confirmed;
            });
            if (allFree) window._allFreeDates.add(dateStr);
        }
    }
}

function updateAvailabilitySummary() {
    const el = document.getElementById('availabilitySummary');
    if (!el || !window.currentGroupId || !window._dayColor) { if (el) el.innerText = ''; return; }

    const cal = window.appCalendar;
    if (!cal) { el.innerText = ''; return; }
    const view = cal.view;
    if (!view || !view.activeStart) { el.innerText = ''; return; }

    const startStr = toLocalIsoStr(view.activeStart);
    const endStr = toLocalIsoStr(view.activeEnd);

    const countInRange = set => [...set].filter(d => d >= startStr && d < endStr).length;
    const free = countInRange(window._dayColor.free);
    const busy = countInRange(window._dayColor.busy);
    const common = countInRange(window._allFreeDates);

    el.innerText = currentLang === 'ru'
        ? `В этом месяце: ${free} свободных · ${busy} занятых · ${common} общих`
        : `This month: ${free} free · ${busy} busy · ${common} common`;
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

function getUpcomingFilter() {
    const input = document.getElementById('upcomingSearch');
    return input ? input.value.trim().toLowerCase() : '';
}

function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEventsList');
    if (!container) return;

    const notes = window.currentNotes || [];
    const today = todayStr();
    const filter = getUpcomingFilter();

    // Filter to upcoming (today and future), sort by date, apply search filter
    let upcoming = notes
        .filter(n => n.date.split('T')[0] >= today)
        .filter(n => {
            if (!filter) return true;
            const haystack = `${n.title || ''} ${n.creatorName || ''}`.toLowerCase();
            return haystack.includes(filter);
        });
    upcoming.sort((a, b) => a.date.split('T')[0].localeCompare(b.date.split('T')[0]));

    // Store for lazy loading
    window._upcomingAll = upcoming;
    window._upcomingShownCount = 0;

    const countEl = document.getElementById('upcomingCount');
    if (countEl) {
        countEl.innerText = filter
            ? `${upcoming.length} ${getT('js.eventOf')} ${notes.filter(n => n.date.split('T')[0] >= today).length}`
            : `${upcoming.length}`;
    }

    appendUpcomingEvents(container, true);
}

function appendUpcomingEvents(container, isInitial) {
    const upcoming = window._upcomingAll || [];
    const pageSize = UPCOMING_PAGE_SIZE;
    const start = window._upcomingShownCount;
    const end = Math.min(start + pageSize, upcoming.length);

    if (isInitial && upcoming.length === 0) {
        const filter = getUpcomingFilter();
        container.innerHTML = `<div style="text-align:center; padding:40px 0; color:var(--text-secondary);">${filter ? getT('upcoming.noMatch') : getT('upcoming.noEvents')}</div>`;
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

        html += `<div class="upcoming-date-header">${esc(dateLabel)}</div>`;
        html += `<div class="upcoming-date-group">`;

        grouped[dateStr].forEach(note => {
            const isRecurring = (note.recurrenceType && note.recurrenceType !== 'none') || note.parentNoteId || note.isVirtual;
            const isConfirmed = note.confirmedProfileIds && note.confirmedProfileIds.includes(profileId);
            const participantCount = note.confirmedProfileNames ? note.confirmedProfileNames.length : 0;
            const commentCount = note.comments ? note.comments.length : 0;
            const hasTitle = note.title && note.title.trim();
            const time = noteTime(note);

            html += `
            <div class="upcoming-card ${isRecurring ? 'upcoming-card-recurring' : ''}" onclick="openDayPanelFromUpcoming('${dateStr}', ${note.id})">
                <div class="upcoming-card-header">
                    ${hasTitle ? `<span class="upcoming-card-title">${esc(note.title)}</span>` : ''}
                    ${time ? `<span class="time-chip">${esc(time)}</span>` : ''}
                    ${isRecurring ? `<span class="upcoming-badge recurring-badge">&#x21bb; ${esc(getT('upcoming.recurring'))}</span>` : ''}
                </div>
                <div class="upcoming-card-body">
                    <div class="upcoming-card-info">
                        <svg class="upcoming-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        ${participantCount} ${esc(getT('upcoming.participants'))}
                    </div>
                    <div class="upcoming-card-info">
                        <svg class="upcoming-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        ${commentCount} ${esc(getT('upcoming.comments'))}
                    </div>
                    <div class="upcoming-card-info">
                        <span class="upcoming-status ${isConfirmed ? 'status-confirmed' : 'status-not-confirmed'}">${esc(isConfirmed ? getT('upcoming.confirmed') : getT('upcoming.notConfirmed'))}</span>
                    </div>
                </div>
                ${!hasTitle ? `<div class="upcoming-card-creator">${esc(note.creatorName || '')}</div>` : ''}
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
    switchTab('calendar');
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
    window.currentGroup = null;
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
    computeAvailability();
    initCalendar(notes);
    updateAvailabilitySummary();
    document.getElementById('calendarHint').classList.toggle('hidden', notes.length > 0);
    updateLegendVisibility();
    refreshOpenDayPanel();
    if (window._activeTab === 'upcoming') renderUpcomingEvents();
}

function groupNotesByDate() {
    const map = {};
    (window.currentNotes || []).forEach(n => {
        const d = n.date.split('T')[0];
        if (!map[d]) map[d] = [];
        map[d].push(n);
    });
    return map;
}

function initCalendar(notes) {
    const calendarEl = document.getElementById('calendar');

    // Group notes by date
    const notesByDate = groupNotesByDate();

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
        locale: window.currentLang || 'ru',
        height: 'auto',
        events: events,
        // Scroll to current month on first load (today is visible by default in month view)
        nowIndicator: false,
        // Drag-select a range of days to create several marks at once
        selectable: true,
        selectMirror: true,
        select: onCalendarSelect,
        datesSet: () => updateAvailabilitySummary(),
        dayCellClassNames: function(arg) {
            const classes = [];
            const dateLocal = toLocalIsoStr(arg.date);
            if (window._dayColor) {
                if (window._dayColor.free.has(dateLocal)) classes.push('day-free');
                if (window._dayColor.busy.has(dateLocal)) classes.push('day-busy');
                if (window._allFreeDates && window._allFreeDates.has(dateLocal)) classes.push('day-all-free');
            }
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
            openDayPanel(dateStr);
        },
        eventContent: function(arg) {
            const isRec = arg.event.classNames.includes('fc-event-recurring');
            const recCls = isRec ? ' fc-event-recurring' : '';
            const recIcon = isRec ? '&#x21bb; ' : '';
            if (arg.event.extendedProps.isMulti) {
                const count = arg.event.extendedProps.count;
                return { html: `<div style="padding: 2px; text-align: center;"><span class="fc-event-badge${recCls}" title="${count} ${esc(getT('js.events'))}">${recIcon}${count} <span class="badge-text">${esc(getT('js.events'))}</span></span></div>` };
            } else {
                const note = arg.event.extendedProps.note;
                const count = note.confirmedProfileNames ? note.confirmedProfileNames.length : 0;
                const time = noteTime(note);
                return { html: `<div style="padding: 2px; text-align: center;"><span class="fc-event-badge${recCls}" title="${count} ${esc(getT('js.participants'))}">${time ? esc(time) + ' · ' : ''}${recIcon}${count} <span class="badge-text">${esc(getT('js.participants'))}</span></span></div>` };
            }
        }
    });
    window.appCalendar.render();

    document.getElementById('dayPanel').classList.add('hidden');
}

// Drag-select handler: create marks for the whole selected range at once
async function onCalendarSelect(info) {
    const startStr = info.startStr.slice(0, 10);
    const endStr = info.endStr.slice(0, 10); // exclusive
    const days = Math.round((new Date(endStr + 'T00:00:00Z') - new Date(startStr + 'T00:00:00Z')) / 86400000);

    if (days < 1) return;

    if (days === 1) {
        // Single-day selection behaves like a click on an empty day
        createNoteForDate(startStr);
        return;
    }

    const confirmed = await appConfirm(
        `${getT('js.rangeConfirm')} ${days} ${getT('js.rangeDays')} ${formatDateHuman(startStr)} ${getT('js.rangeTo')} ${formatDateHuman(addDaysIso(endStr, -1))})?`
    );
    if (!confirmed || !window.currentGroupId) return;

    for (let i = 0; i < days; i++) {
        const dateStr = addDaysIso(startStr, i);
        await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', { date: `${dateStr}T00:00:00Z` });
    }
    await fetchNotes();
    openDayPanel(startStr);
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
    document.getElementById('dayTitle').innerText = formatDateHuman(dateStr, { weekday: 'long', day: 'numeric', month: 'long' });
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
        dayNotes.forEach((n) => {
            const li = document.createElement('li');
            li.className = 'list-item day-event-item';
            li.dataset.noteId = n.id;
            const confirmCount = n.confirmedProfileNames ? n.confirmedProfileNames.length : 0;
            const isRecurring = (n.recurrenceType && n.recurrenceType !== 'none') || n.parentNoteId || n.isVirtual;
            const time = noteTime(n);
            const titleText = n.title ? esc(n.title) : `${confirmCount} ${getT('js.participants')}`;
            li.innerHTML = `<span class="day-event-label">${time ? `<span class="time-chip">${esc(time)}</span> ` : ''}${titleText}${isRecurring ? ' <span style="color:var(--accent);font-size:10px;">&#x21bb;</span>' : ''}</span>`;
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

/**
 * Refreshes the open day panel after data changed, preserving selection.
 * Skipped while the user is editing the note title (like the old poll guard).
 */
function refreshOpenDayPanel() {
    const panel = document.getElementById('dayPanel');
    if (panel.classList.contains('hidden') || !window._currentDayDateStr) return;

    const titleEditEl = document.getElementById('noteTitleEdit');
    const isEditingTitle = titleEditEl && !titleEditEl.classList.contains('hidden');
    if (isEditingTitle) return;

    const selectedId = window.selectedNote ? window.selectedNote.id : null;
    const dayNotes = window.currentNotes.filter(n => n.date.split('T')[0] === window._currentDayDateStr);

    if (dayNotes.length === 0) {
        closeDayPanel();
        return;
    }

    openDayPanel(window._currentDayDateStr);
    if (selectedId != null && dayNotes.some(n => n.id === selectedId)) {
        selectNoteInPanel(selectedId);
    }
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
        const recIndicator = document.getElementById('recurrenceIndicator');
        recIndicator.classList.add('hidden');
        recIndicator.style.display = 'none';
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
            recActions.innerHTML += `<button class="btn btn-danger btn-small" style="font-size:10px; padding:2px 8px;" onclick="deleteNoteSeries()">${esc(getT('js.deleteSeries'))}</button>`;
        }
        if (allSeriesConfirmed) {
            recActions.innerHTML += `<button class="btn btn-outline btn-small" style="font-size:10px; padding:2px 8px;" onclick="toggleConfirmSeries(${parentId}, true)">${esc(getT('js.leaveSeries'))}</button>`;
        } else {
            recActions.innerHTML += `<button class="btn btn-outline btn-small" style="font-size:10px; padding:2px 8px;" onclick="toggleConfirmSeries(${parentId}, false)">${esc(getT('js.confirmSeries'))}</button>`;
        }
    } else {
        recIndicator.classList.add('hidden');
        recIndicator.style.display = 'none';
    }

     actionsContainer.innerHTML = `
        <div id="noteTitleArea" style="margin-bottom:8px; min-height:20px;">
            <span id="noteTitleDisplay" style="font-size:14px; font-weight:600; color:var(--text-primary); cursor:pointer; line-height:20px; display:block; ${note.title ? '' : 'font-style:italic; color:var(--text-secondary); font-weight:400;'}" onclick="startEditNoteTitle()">${note.title ? esc(note.title) : esc(getT('js.addTitle'))}</span>
            <div id="noteTitleEdit" class="hidden" style="display:flex; gap:4px; align-items:center; padding-right:28px;">
                <input type="text" id="noteTitleInput" placeholder="${esc(getT('js.titlePlaceholder'))}" style="margin:0; height:26px; min-height:0; font-size:12px; flex:1; padding:1px 6px; width:auto; margin-bottom:0;" value="${esc(note.title || '')}">
                <button class="btn btn-small" style="font-size:10px; padding:0 8px; height:26px; min-height:0; line-height:26px;" onclick="saveNoteTitle()">${esc(getT('js.saveTitle'))}</button>
                <button class="btn btn-outline btn-small" style="font-size:10px; padding:0 8px; height:26px; min-height:0; line-height:26px;" onclick="cancelEditNoteTitle()">${esc(getT('js.cancel'))}</button>
            </div>
        </div>
        <div class="flex-row mb-var">
            <button class="btn btn-outline btn-small" onclick="toggleConfirmNote(${note.id}, ${isConfirmed ? 'true' : 'false'})">
                ${esc(isConfirmed ? getT('js.convenient') : getT('js.markConvenient'))}
            </button>
            ${canDeleteNode ? `<button class="btn btn-danger btn-small" onclick="deleteNote(${note.id})">${esc(getT('js.deleteNote'))}</button>` : ''}
        </div>
    `;

    if (note.confirmedProfileNames && note.confirmedProfileNames.length > 0) {
        note.confirmedProfileNames.forEach((name, idx) => {
            const li = document.createElement('li');
            li.className = 'list-item';
            li.style.padding = '8px';
            const isMe = String(note.confirmedProfileIds?.[idx]) === String(window.profileId);
            li.innerHTML = `<span class="participant-row">${avatarHtml(name, note.confirmedProfileIds ? note.confirmedProfileIds[idx] : undefined)}<span class="participant-name">${esc(name)}${isMe ? ` <span class="text-small" style="opacity:0.6;">(${esc(getT('js.you'))})</span>` : ''}</span></span>`;
            participantsContainer.appendChild(li);
        });
    } else {
        participantsContainer.innerHTML = `<li class="list-item text-small" style="padding: 8px;">${esc(getT('js.noParticipants'))}</li>`;
    }

    fetchComments(note.id);
}

// --- Comments cache (fetch once per note; realtime events invalidate) ---
const commentsCache = new Map();

async function fetchComments(noteId, force = false) {
    if (!force && commentsCache.has(noteId)) {
        renderComments(noteId, commentsCache.get(noteId));
        return;
    }

    const comments = await apiCall(`/notes/${noteId}/comments`);
    if (!comments) return;

    commentsCache.set(noteId, comments);
    renderComments(noteId, comments);
}

function renderComments(noteId, comments) {
    // Only render if this note is still the one displayed
    if (!window.selectedNote || window.selectedNote.id !== noteId) return;

    const container = document.getElementById('dayCommentsList');
    if (!container) return;

    container.innerHTML = '';
    comments.forEach(c => {
        const isAuthor = String(c.authorProfileId) === String(window.profileId);
        const isAdmin = String(window.profileId) === String(window.currentGroupCreatorId);
        const canDeleteComment = isAdmin || isAuthor;

        const div = document.createElement('div');
        div.style.cssText = 'margin-bottom:8px; padding:12px; background-color:var(--bg-elevated); border-radius:var(--radius);';

        let dateStr = '';
        if (c.created) {
             const createdDate = new Date(c.created).toLocaleString();
             dateStr = ` • <span style="color:var(--text-secondary);font-size:10px;">${esc(createdDate)}</span>`;
             if (c.lastModified) {
                 const tCreated = new Date(c.created).getTime();
                 const tMod = new Date(c.lastModified).getTime();
                 // Show edited only if diff > 10 seconds
                 if (tMod - tCreated > 10000) {
                     dateStr += ` <span style="color:var(--text-secondary);font-size:10px;">${esc(getT('js.edited'))}</span>`;
                 }
             }
        }

        div.innerHTML = `
            <div id="commentView_${c.id}">
                <div style="display: flex; justify-content: space-between; align-items:center;">
                    <div class="participant-row">
                        ${avatarHtml(c.authorName, c.authorProfileId, true)}
                        <span class="text-small" style="font-weight:bold; color: var(--accent);">${esc(c.authorName)}</span>${dateStr}
                    </div>
                    <div>
                        ${isAuthor ? `<span style="cursor:pointer; color:var(--text-secondary); font-size:12px; margin-right:12px; text-decoration:underline;" onclick="startEditComment(${c.id})">${esc(getT('js.edit'))}</span>` : ''}
                        ${canDeleteComment ? `<span style="cursor:pointer; color:var(--danger); font-size:12px; text-decoration:underline;" onclick="deleteComment(${noteId}, ${c.id})">${esc(getT('js.remove'))}</span>` : ''}
                    </div>
                </div>
                <div class="mt-var text-small" style="line-height:1.4;">${esc(c.content)}</div>
                <input type="hidden" id="rawContent_${c.id}" value="${esc(c.content)}">
            </div>
            <div id="commentEdit_${c.id}" class="hidden mt-var">
                <input type="text" id="editInput_${c.id}" style="margin-bottom:8px; width:100%;" value="${esc(c.content)}">
                <div class="flex-row">
                    <button class="btn btn-small" onclick="saveComment(${noteId}, ${c.id})">${esc(getT('js.save'))}</button>
                    <button class="btn btn-outline btn-small" onclick="cancelEditComment(${c.id})">${esc(getT('js.cancel'))}</button>
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
    document.getElementById(`editInput_${id}`).focus();
}

function cancelEditComment(id) {
    document.getElementById(`commentEdit_${id}`).classList.add('hidden');
    document.getElementById(`commentView_${id}`).classList.remove('hidden');
}

async function saveComment(noteId, id) {
    const val = document.getElementById(`editInput_${id}`).value.trim();
    if (!val) return;
    const res = await apiCall(`/notes/${noteId}/comments/${id}`, 'PUT', { content: val });
    if (res === false) return;
    commentsCache.delete(noteId);
    fetchComments(noteId, true);
}

async function addCommentToCurrentDay() {
    if (!window.selectedNote) return;
    const noteId = window.selectedNote.id;
    const content = document.getElementById('newCommentText').value.trim();
    if (!content) return;

    const res = await apiCall(`/notes/${noteId}/comments`, 'POST', { content });
    if (res) {
        document.getElementById('newCommentText').value = '';
        commentsCache.delete(noteId);
        fetchComments(noteId, true);
    }
}

async function deleteComment(noteId, commentId) {
    const confirmed = await appConfirm(getT('js.deleteCommentConfirm'));
    if(!confirmed) return;
    const res = await apiCall(`/notes/${noteId}/comments/${commentId}`, 'DELETE');
    if (res === false) return;
    commentsCache.delete(noteId);
    fetchComments(noteId, true);
}

// --- Note actions ---
async function deleteNote(id) {
    if (id < 0) {
        // Virtual instance — can't delete individually
        return appAlert(currentLang === 'ru' ? 'Нельзя удалить виртуальную отметку. Удалите серию.' : 'Cannot delete a virtual instance. Delete the series instead.');
    }
    const confirmed = await appConfirm(getT('js.deleteNoteConfirm'));
    if(!confirmed) return;
    const res = await apiCall(`/groups/${window.currentGroupId}/notes/${id}`, 'DELETE');
    if (res === false) return;
    await fetchNotes();
}

// --- Recurrence helpers ---
function resetRecurrenceForm() {
    document.getElementById('recNoteTitle').value = '';
    document.getElementById('recNoteTime').value = '';
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

async function createNoteForDate(dateStr) {
    if (!window.currentGroupId) return;

    // Store the date for later use in recurrence modal
    window.pendingNoteDate = dateStr;

    // Open recurrence modal
    resetRecurrenceForm();

    // Auto-check the weekday of the clicked date
    const date = new Date(dateStr + 'T00:00:00Z');
    const jsDay = date.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const isoDay = jsDay === 0 ? 7 : jsDay; // 1=Mon, ..., 7=Sun
    const cb = document.getElementById('recDay' + isoDay);
    if (cb) cb.checked = true;

    openModal('recurrenceModal');
}

async function applyRecurrenceAndCreate() {
    if (!window.currentGroupId || !window.pendingNoteDate) return;

    const dateStr = window.pendingNoteDate;
    const timeVal = document.getElementById('recNoteTime').value; // "HH:MM" or ""
    const dateISO = dateStr + 'T' + (timeVal ? timeVal + ':00' : '00:00') + 'Z';

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
                const d = new Date(dateStr + 'T00:00:00Z');
                let dayNum = d.getUTCDay();
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

    const res = await apiCall(`/groups/${window.currentGroupId}/notes/${parentId}/series`, 'DELETE');
    if (res === false) return;
    await fetchNotes();
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

    const res = await apiCall(
        `/groups/${window.currentGroupId}/notes/${parentId}/confirm/series`,
        isLeaving ? 'DELETE' : 'POST'
    );
    if (res === false) return;
    await fetchNotes();
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
    const res = await apiCall(
        `/groups/${window.currentGroupId}/notes/${id}/confirm`,
        isConfirmed ? 'DELETE' : 'POST'
    );
    if (res === false) return;
    await fetchNotes();
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
        // Close the editor first — refreshOpenDayPanel skips re-render while editing
        cancelEditNoteTitle();
        await fetchNotes();
    }
}

// --- Copy day summary to clipboard ---
async function copyDaySummary() {
    const dateStr = window._currentDayDateStr;
    if (!dateStr) return;
    const dayNotes = window.currentNotes
        .filter(n => n.date.split('T')[0] === dateStr)
        .sort((a, b) => a.date.localeCompare(b.date));
    if (!dayNotes.length) return;

    const lines = [formatDateHuman(dateStr, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })];
    dayNotes.forEach(n => {
        const time = noteTime(n);
        const title = n.title || `${(n.confirmedProfileNames || []).length} ${getT('js.participants')}`;
        lines.push(`• ${title}${time ? ` (${time})` : ''} — ${(n.confirmedProfileNames || []).length} ${getT('js.participants')}`);
    });

    try {
        await navigator.clipboard.writeText(lines.join('\n'));
        showToast(getT('js.copiedDay'), 'success');
    } catch (e) {
        showToast('Clipboard error', 'error');
    }
}

// --- Group statistics ---
function openStatsModal() {
    if (!window.currentGroupId || !window.currentGroup) return;
    const notes = window.currentNotes || [];
    const today = todayStr();
    const upcoming = notes.filter(n => n.date.split('T')[0] >= today).length;
    const participants = window.currentGroup.participants || [];

    // Participation counts per participant name
    const counts = {};
    notes.forEach(n => (n.confirmedProfileNames || []).forEach(nm => {
        counts[nm] = (counts[nm] || 0) + 1;
    }));
    const topEntry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

    const myConfirmed = notes.filter(n => (n.confirmedProfileIds || []).map(String).includes(String(window.profileId))).length;
    const participation = notes.length ? Math.round((myConfirmed / notes.length) * 100) : 0;

    const rows = [
        [getT('stats.total'), notes.length],
        [getT('stats.upcoming'), upcoming],
        [getT('stats.members'), participants.length],
        [getT('stats.participation'), `${participation}%`],
        [getT('stats.commonDays'), (window._allFreeDates ? window._allFreeDates.size : 0)],
        [getT('stats.topParticipant'), topEntry ? `${topEntry[0]} (${topEntry[1]})` : '—']
    ];

    const container = document.getElementById('statsContent');
    container.innerHTML = rows.map(([label, value]) =>
        `<div class="stats-row"><span>${esc(label)}</span><span class="stats-value">${esc(value)}</span></div>`
    ).join('');

    openModal('statsModal');
}

// --- iCal export ---
function icalEscape(s) {
    return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function exportIcal() {
    const notes = (window.currentNotes || []).slice().sort((a, b) => a.date.localeCompare(b.date));
    if (!notes.length) {
        showToast(getT('js.noEvents'));
        return;
    }

    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AskDate//RU', 'CALSCALE:GREGORIAN'];
    const seen = new Set();

    notes.forEach(n => {
        const d = n.date.split('T')[0];
        const key = `${d}|${n.title || ''}|${noteTime(n) || ''}`;
        if (seen.has(key)) return;
        seen.add(key);

        const time = noteTime(n);
        const startDate = time ? `${d.replace(/-/g, '')}T${time.replace(':', '')}00Z` : d.replace(/-/g, '');
        const endDate = addDaysIso(d, 1).replace(/-/g, '');
        const summary = n.title || (n.creatorName ? `AskDate — ${n.creatorName}` : 'AskDate');

        lines.push('BEGIN:VEVENT');
        lines.push(`UID:askdate-${n.id}-${d}@askdate.local`);
        lines.push(`DTSTAMP:${stamp}`);
        if (time) {
            lines.push(`DTSTART:${startDate}`);
        } else {
            lines.push(`DTSTART;VALUE=DATE:${startDate}`);
            lines.push(`DTEND;VALUE=DATE:${endDate}`);
        }
        lines.push(`SUMMARY:${icalEscape(summary)}`);
        if (n.confirmedProfileNames && n.confirmedProfileNames.length) {
            lines.push(`DESCRIPTION:${icalEscape(n.confirmedProfileNames.join(', '))}`);
        }
        lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const groupName = (window.currentGroup && window.currentGroup.name ? window.currentGroup.name : 'group').replace(/[^\w\-]+/g, '_');
    a.download = `askdate-${groupName}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    showToast(getT('js.exportDone'), 'success');
}

// --- Browser notifications (opt-in) ---
function notificationsEnabled() {
    return localStorage.getItem('askdate_notify') === '1'
        && typeof Notification !== 'undefined'
        && Notification.permission === 'granted';
}

async function toggleNotifications() {
    if (typeof Notification === 'undefined') {
        showToast(getT('notif.unsupported'), 'error');
        return;
    }
    if (!notificationsEnabled()) {
        const perm = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
        if (perm === 'granted') {
            localStorage.setItem('askdate_notify', '1');
            showToast(getT('notif.enabled'), 'success');
        } else {
            showToast(getT('notif.blocked'), 'error');
        }
    } else {
        localStorage.setItem('askdate_notify', '0');
        showToast(getT('notif.disabled'));
    }
    updateNotifyButton();
}

function updateNotifyButton() {
    const btn = document.getElementById('notifyToggleBtn');
    if (btn) btn.classList.toggle('toggled', notificationsEnabled());
}

function realtimeNotify(body) {
    if (!notificationsEnabled() || document.visibilityState === 'visible') return;
    try {
        new Notification('AskDate', { body, icon: 'favicon.svg', tag: 'askdate-realtime' });
    } catch (e) { /* some browsers require SW — ignore */ }
}

// --- Realtime updates (SignalR over WebSocket) ---
let _notesRefreshTimer = null;
let _participantsRefreshTimer = null;
let _joinedGroupId = null;

function setRealtimeStatus(online) {
    window._realtimeOnline = online;
    const dot = document.getElementById('realtimeStatus');
    if (!dot) return;
    dot.classList.toggle('online', online);
    dot.classList.toggle('offline', !online);
    dot.title = getT(online ? 'realtime.online' : 'realtime.offline');
}

function ensureRealtime() {
    if (typeof signalR === 'undefined') {
        // CDN unavailable — fallback polling keeps the page usable
        console.warn('SignalR client not loaded, using fallback polling');
        scheduleFallbackPoll();
        return;
    }
    if (window._hubConn) return;

    const conn = new signalR.HubConnectionBuilder()
        .withUrl('/hub', {
            accessTokenFactory: () => window.token,
            transport:
                signalR.HttpTransportType.WebSockets |
                signalR.HttpTransportType.ServerSentEvents |
                signalR.HttpTransportType.LongPolling
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Error)
        .build();

    window._hubConn = conn;

    conn.on('notesChanged', () => {
        realtimeNotify(getT('notif.newNotes'));
        debouncedNotesRefresh();
    });

    conn.on('commentsChanged', (data) => {
        if (data && typeof data.noteId === 'number') {
            commentsCache.delete(data.noteId);
            if (window.selectedNote && window.selectedNote.id === data.noteId
                && !document.getElementById('dayPanel').classList.contains('hidden')) {
                fetchComments(data.noteId, true);
                realtimeNotify(getT('notif.newComments'));
            }
        }
    });

    conn.on('participantsChanged', () => {
        realtimeNotify(getT('notif.groupChanged'));
        debouncedParticipantsRefresh();
    });

    conn.on('groupUpdated', (data) => onGroupUpdated(data || {}));

    conn.onreconnecting(() => setRealtimeStatus(false));
    conn.onreconnected(async () => {
        setRealtimeStatus(true);
        _joinedGroupId = null;
        joinRealtimeGroup(window.currentGroupId);
        await refreshAfterReconnect();
    });
    conn.onclose(() => {
        setRealtimeStatus(false);
        scheduleFallbackPoll();
    });

    conn.start()
        .then(() => {
            setRealtimeStatus(true);
            joinRealtimeGroup(window.currentGroupId);
        })
        .catch(() => {
            setRealtimeStatus(false);
            scheduleFallbackPoll();
        });
}

function stopRealtime() {
    if (window._hubConn) {
        window._hubConn.stop().catch(() => {});
        window._hubConn = null;
    }
    _joinedGroupId = null;
    setRealtimeStatus(false);
}

function joinRealtimeGroup(groupId) {
    if (!window._hubConn || !groupId) return;
    if (window._hubConn.state !== signalR.HubConnectionState.Connected) return; // will rejoin on connect/reconnect
    if (_joinedGroupId === groupId) return;
    const leave = _joinedGroupId;
    _joinedGroupId = groupId;
    const doJoin = () => {
        if (leave && leave !== groupId) {
            window._hubConn.invoke('LeaveGroup', parseInt(leave)).catch(() => {});
        }
        window._hubConn.invoke('JoinGroup', parseInt(groupId)).catch(() => {});
    };
    doJoin();
}

function debouncedNotesRefresh() {
    clearTimeout(_notesRefreshTimer);
    _notesRefreshTimer = setTimeout(async () => {
        if (!window.currentGroupId) return;
        await fetchNotes();
    }, 250);
}

function debouncedParticipantsRefresh() {
    clearTimeout(_participantsRefreshTimer);
    _participantsRefreshTimer = setTimeout(async () => {
        if (!window.currentGroupId) return;
        await refreshCurrentGroup();
        fetchGroups();
    }, 250);
}

async function refreshCurrentGroup() {
    if (!window.currentGroupId) return;
    const group = await apiCall(`/groups/${window.currentGroupId}`);
    if (!group) return;
    window.currentGroup = group;
    window.currentGroupCreatorId = group.creatorProfileId;
    renderGroupHeader(group);
    renderParticipantsModal(group);
    renderAvailabilitySwitch();
    computeAvailability();
    if (window.appCalendar) window.appCalendar.render();
    updateAvailabilitySummary();
}

function onGroupUpdated(data) {
    const { groupId, deleted } = data;
    if (deleted) {
        if (String(groupId) === String(window.currentGroupId)) {
            window.currentGroupId = null;
            window.currentGroup = null;
            localStorage.removeItem('askdate_currentGroupId');
            document.getElementById('groupDetails').classList.add('hidden');
            closeDayPanel();
        }
        fetchGroups();
        return;
    }
    if (String(groupId) === String(window.currentGroupId)) {
        refreshCurrentGroup();
    }
    fetchGroups();
}

async function refreshAfterReconnect() {
    await refreshCurrentGroup();
    await fetchNotes();
    fetchGroups();
}

// Fallback polling when realtime is unavailable (CDN blocked, proxy without WS, etc.)
function scheduleFallbackPoll() {
    if (window._fallbackPoll) return;
    window._fallbackPoll = setInterval(async () => {
        if (!window.token || !window.currentGroupId) return;
        // Realtime is back — no polling needed
        if (window._hubConn && typeof signalR !== 'undefined'
            && window._hubConn.state === signalR.HubConnectionState.Connected) {
            clearInterval(window._fallbackPoll);
            window._fallbackPoll = null;
            return;
        }
        try {
            await refreshCurrentGroup();
            await fetchNotes();
        } catch (e) { /* transient */ }
    }, 45000);
}

// --- Keyboard shortcuts ---
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlayOpen = !document.getElementById('customDialogOverlay').classList.contains('hidden');
            if (overlayOpen) return; // dialog handles its own buttons
            if (!document.getElementById('appOverlay').classList.contains('hidden')) {
                closeAllModals();
                return;
            }
            if (!document.getElementById('dayPanel').classList.contains('hidden')) {
                closeDayPanel();
            }
            return;
        }

        const tag = (e.target.tagName || '').toLowerCase();
        if (['input', 'textarea', 'select'].includes(tag) || e.target.isContentEditable) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (!window.token || !window.currentGroupId) return;

        const dayPanelOpen = !document.getElementById('dayPanel').classList.contains('hidden');

        if (e.key === 'ArrowLeft' && dayPanelOpen) {
            navigateDay(-1);
        } else if (e.key === 'ArrowRight' && dayPanelOpen) {
            navigateDay(1);
        } else if (e.key.toLowerCase() === 'n') {
            createNoteForDate(todayStr());
        } else if (e.key.toLowerCase() === 't' && window.appCalendar) {
            window.appCalendar.gotoDate(todayStr());
        }
    });
}

// --- Admin panel ---
async function openAdminModal() {
    openModal('adminModal');
    await refreshAdminUsers();
}

async function refreshAdminUsers() {
    const container = document.getElementById('adminUsersList');
    container.innerHTML = '<div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div>';

    const users = await usersApi('/User/all');
    if (!users || users === true) {
        container.innerHTML = '';
        return;
    }

    const myUserId = String(jwtUserId(parseJwt(window.token)) || '');
    container.innerHTML = '';

    users.forEach(u => {
        const isAdmin = u.role === 'Administrator';
        const isSelf = String(u.id) === myUserId;

        const row = document.createElement('div');
        row.className = 'admin-user-row';
        row.innerHTML = `
            <div class="admin-user-info">
                <div class="admin-user-email">${esc(u.email)}</div>
                <div class="admin-user-meta">#${u.id} · ${esc(u.verified ? getT('admin.verified') : getT('admin.notVerified'))} · ${esc(getT('admin.created'))} ${esc(new Date(u.created).toLocaleDateString())}</div>
            </div>
            <span class="role-badge${isAdmin ? ' role-admin' : ''}">${isAdmin ? 'admin' : 'user'}</span>
            <div class="admin-actions"></div>
        `;

        const actions = row.querySelector('.admin-actions');

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-outline btn-small';
        resetBtn.innerText = getT('admin.reset');
        resetBtn.onclick = () => adminResetPassword(u.id, u.email);
        actions.appendChild(resetBtn);

        const roleBtn = document.createElement('button');
        roleBtn.className = 'btn btn-outline btn-small';
        roleBtn.innerText = isAdmin ? getT('admin.removeAdmin') : getT('admin.makeAdmin');
        if (!isSelf) {
            roleBtn.onclick = () => adminSetRole(u.id, u.email, isAdmin);
        } else {
            roleBtn.disabled = true;
            roleBtn.title = getT('admin.selfRole');
        }
        actions.appendChild(roleBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-small';
        deleteBtn.innerText = getT('admin.delete');
        if (!isSelf) {
            deleteBtn.onclick = () => adminDeleteUser(u.id, u.email);
        } else {
            deleteBtn.disabled = true;
        }
        actions.appendChild(deleteBtn);

        container.appendChild(row);
    });

    if (!users.length) {
        container.innerHTML = `<div class="text-small">${esc(getT('admin.empty'))}</div>`;
    }
}

async function adminResetPassword(userId, email) {
    const confirmed = await appConfirm(`${getT('admin.reset')} — ${email}?`);
    if (!confirmed) return;

    const res = await usersApi(`/User/${userId}/reset-password`, 'PUT', {});
    if (!res || res === true) return;

    // Show the generated password once
    await appAlert(`${getT('admin.newPassword')} ${email}:\n${res.password}`);
    refreshAdminUsers();
}

async function adminSetRole(userId, email, isAdminNow) {
    const target = isAdminNow ? getT('admin.toUser') : getT('admin.toAdmin');
    const confirmed = await appConfirm(`${getT('admin.confirmRole')} ${email} ${target}`);
    if (!confirmed) return;

    const role = isAdminNow ? 'User' : 'Administrator';
    const res = await usersApi(`/User/${userId}/role`, 'PUT', { role });
    if (res === null) return;
    refreshAdminUsers();
}

async function adminDeleteUser(userId, email) {
    const confirmed = await appConfirm(`${getT('admin.confirmDelete')} ${email}?`);
    if (!confirmed) return;

    const res = await usersApi(`/User/delete/${userId}`, 'DELETE');
    if (res === null) return;
    showToast(getT('admin.delete') + ': OK', 'success');
    refreshAdminUsers();
}

// make functions global for index.html onclicks
window.showView = showView;
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.fetchGroups = fetchGroups;
window.createGroup = createGroup;
window.fetchNotes = fetchNotes;
window.deleteNote = deleteNote;
window.toggleConfirmNote = toggleConfirmNote;
window.deleteComment = deleteComment;
window.openModal = openModal;
window.closeAllModals = closeAllModals;
window.copyInviteLink = copyInviteLink;
window.showInviteQr = showInviteQr;
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
window.openProfileModal = openProfileModal;
window.saveProfile = saveProfile;
window.setAvailabilityMode = setAvailabilityMode;
window.openAdminModal = openAdminModal;
window.openStatsModal = openStatsModal;
window.exportIcal = exportIcal;
window.copyDaySummary = copyDaySummary;
window.toggleNotifications = toggleNotifications;
window.navigateDay = navigateDay;
window.openDayPanelFromUpcoming = openDayPanelFromUpcoming;

async function openProfileModal() {
    try {
        if (isTokenExpired(window.token)) {
            const refreshed = await tryRefreshToken();
            if (!refreshed) {
                forceLogout(true);
                return;
            }
        }
        let res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
            headers: { 'Authorization': `Bearer ${window.token}` }
        });
        if (res.status === 401) {
            if (await tryRefreshToken()) {
                res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
                    headers: { 'Authorization': `Bearer ${window.token}` }
                });
            } else {
                forceLogout(true);
                return;
            }
        }
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
        if (isTokenExpired(window.token)) {
            const refreshed = await tryRefreshToken();
            if (!refreshed) {
                forceLogout(true);
                return;
            }
        }

        let res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
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

        if (res.status === 401) {
            if (await tryRefreshToken()) {
                res = await fetch(`${USERS_API_URL}/Profile/${window.profileId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${window.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ firstName, lastName, currentAvatar: "", status: 1 })
                });
            }
        }

        if (res.ok) {
            if (newPassword && window.currentUserId) {
                // Update own password (backend enforces ownership)
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
                // Password change revokes refresh tokens — refresh now
                await tryRefreshToken();
            }

            closeAllModals();
            fetchCurrentUserName();
            showToast(getT('js.profUpdated'), 'success');
        } else {
            appAlert(getT('js.profFail'));
        }
    } catch (e) {
        appAlert(getT('js.profFail'));
    }
}
