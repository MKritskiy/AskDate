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
        'common.close': 'Закрыть',
        'error.prefix': 'Ошибка',
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
        'group.settings': 'Настройки',
        'day.participants': 'Участники',
        'day.comments': 'Комментарии',
        'day.addComment': 'Добавить комментарий...',
        'day.send': 'Отправить',
        'day.copy': 'Копировать день',
        'day.prev': 'Предыдущий день',
        'day.next': 'Следующий день',
        'day.noEvents': 'В этот день нет событий',
        'day.createEvent': '+ Создать событие',
        'day.myAvailability': 'Я',
        'day.free': 'Свободен',
        'day.busy': 'Занят',
        'day.nobodyMarked': 'В этот день ещё никто не оставлял отметок',
        'day.noMarks': 'нет отметок',
        'day.myMarksEmpty': 'На этот день отметок нет',
        'day.editingMark': 'Изменение отметки',
        'day.editMark': 'изменить',
        'day.removeMark': 'снять',
        'day.busyAllDay': 'Занят весь день',
        'day.freeAllDay': 'Свободен весь день',
        // how other members' days are described (neutral wording)
        'day.busyWholeDay': 'занято весь день',
        'day.freeWholeDay': 'свободно весь день',
        'day.busyFor': 'занято {range}',
        'day.freeFor': 'свободно {range}',
        'day.commonFree': 'Все свободны: {ranges}',
        'day.commonFreeAllDay': 'Все свободны весь день',
        'day.noCommonFree': 'Общего свободного времени в этот день нет',
        'day.busyWarning': 'Вы заняты на это время',
        'day.busyWarningDay': 'Вы заняты в этот день',
        'day.atTimeBusy': 'В {time} заняты: {names}',
        'day.thatDayBusy': 'Заняты в этот день: {names}',
        'day.atTimeUnknown': 'В {time} не отметили: {names}',
        'range.label': 'Время отметки',
        'range.allDay': 'весь день',
        'range.from': 'с',
        'range.to': 'до',
        'time.hour': 'час',
        'time.minute': 'минуты',
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
        'modal.profLogin': 'Логин',
        'modal.profFirst': 'Имя',
        'modal.profLast': 'Фамилия',
        'modal.profPassTitle': 'Обновить пароль',
        'modal.profPass': 'Новый пароль (оставьте пустым для сохранения текущего)',
        'modal.profSave': 'Сохранить',
        'role.admin': 'Администратор',
        'modal.adminTitle': 'Админ-панель',
        'modal.statsTitle': 'Статистика группы',
        'modal.qrTitle': 'QR-код приглашения',
        'dialog.ok': 'ОК',
        'dialog.cancel': 'Отмена',
        'tool.label': 'Инструмент',
        'tool.view': 'Просмотр',
        'tool.free': 'Свободен',
        'tool.busy': 'Занят',
        'tool.done': 'Готово',
        'tool.viewTip': 'Клик по дню открывает его: доступность, события, комментарии (клавиша 1)',
        'tool.freeTip': 'Кисть «Свободен»: кликайте по дням или выделите диапазон (клавиша 2)',
        'tool.busyTip': 'Кисть «Занят»: кликайте по дням или выделите диапазон (клавиша 3)',
        'hint.viewEmpty': 'Кликните по дню, чтобы отметить доступность или создать событие. Для быстрой разметки выберите кисть «Свободен» или «Занят».',
        'hint.brushFree': 'Кисть «Свободен»: кликайте по дням или выделите диапазон. Повторный клик по такой же отметке снимает её.',
        'hint.brushBusy': 'Кисть «Занят»: кликайте по дням или выделите диапазон. Повторный клик по такой же отметке снимает её.',
        'cal.today': 'Сегодня',
        'cal.prevHint': 'Предыдущий месяц',
        'cal.nextHint': 'Следующий месяц',
        'cal.more': 'Ещё {n}',
        'cal.participantsShort': 'уч.',
        'cal.eventsShort': 'соб.',
        'legend.free': 'Мои свободные дни',
        'legend.busy': 'Мои занятые дни',
        'legend.event': 'Дни с событиями',
        'legend.allFree': 'Все свободны',
        'legend.groupBar': 'Доступность группы',
        'legend.groupBarTip': 'Полоса внизу дня — это сутки: зелёным — в это время свободны все, красным — кто-то занят, серым — не все отметили',
        'legend.defaultFree': 'Неотмеченные дни считать свободными',
        'legend.defaultFreeTip': 'Включите, если вы свободны всегда, кроме отмеченных занятыми дней: тогда для группы неотмеченные дни будут считаться свободными',
        'legend.defaultFreeShort': 'неотмеченные дни — свободны',
        'summary.text': 'В этом месяце: свободных {free} · занятых {busy} · подходят всем {common}',
        'toolbar.stats': 'Статистика',
        'toolbar.export': 'Экспорт iCal',
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
        'admin.selfRole': 'Нельзя менять свою роль',
        'admin.selfDelete': 'Нельзя удалить свой аккаунт',
        'stats.total': 'Всего событий',
        'stats.upcoming': 'Предстоящих событий',
        'stats.participation': 'Моё участие',
        'stats.topParticipant': 'Самый активный участник',
        'stats.members': 'Участников в группе',
        'stats.commonDays': 'Дней, когда всем подходит время',
        'stats.myMarks': 'Мои отметки',
        'stats.myMarksValue': '{free} свободных · {busy} занятых',
        'settings.myMarks': 'Мои отметки доступности',
        'settings.clearMarks': 'Очистить мои отметки',
        'settings.clearMarksConfirm': 'Снять все ваши отметки в этой группе?',
        'settings.marksCleared': 'Ваши отметки сняты',
        'settings.noMarks': 'У вас пока нет отметок в этой группе',
        'notif.enabled': 'Уведомления включены',
        'notif.disabled': 'Уведомления выключены',
        'notif.unsupported': 'Браузер не поддерживает уведомления',
        'notif.blocked': 'Разрешение на уведомления не выдано',
        'notif.newNotes': 'Обновление событий группы',
        'notif.newComments': 'Новый комментарий',
        'notif.groupChanged': 'Изменения в группе',
        'notif.availability': 'Кто-то обновил отметки доступности',
        'js.participants': 'участников',
        'js.events': 'событий',
        'js.creator': 'Создатель',
        'js.member': 'Участник',
        'js.you': 'вы',
        'js.remove': 'Удалить',
        'js.deleteConfirm': 'Вы уверены, что хотите удалить эту группу?',
        'js.groupDeleted': 'Группа «{name}» удалена',
        'js.enterLink': 'Введите код или ссылку-приглашение',
        'js.badLink': 'Приглашение не найдено. Проверьте ссылку или код.',
        'js.joined': 'Вы вступили в группу',
        'js.removeConfirm': 'Удалить этого участника?',
        'js.leaveConfirm': 'Покинуть группу «{name}»?',
        'js.convenient': 'Отметить неудобным',
        'js.markConvenient': '+ Отметить удобным',
        'js.deleteNote': 'Удалить событие',
        'js.deleteNoteConfirm': 'Удалить событие?',
        'js.virtualDelete': 'Это повторение серии. Отдельно его удалить нельзя — удалите серию.',
        'js.noParticipants': 'Пока никто не отметил',
        'js.edited': '(изменено)',
        'js.edit': 'Изменить',
        'js.deleteCommentConfirm': 'Удалить комментарий?',
        'js.noComments': 'Комментариев пока нет',
        'js.cancel': 'Отмена',
        'js.save': 'Сохранить',
        'js.linkCopied': 'Ссылка скопирована!',
        'js.copiedDay': 'День скопирован в буфер обмена',
        'js.exportDone': 'Календарь экспортирован в iCal',
        'js.clipboardError': 'Не удалось скопировать в буфер обмена',
        'js.fillReg': 'Заполните все поля регистрации',
        'js.passwordMismatch': 'Пароли не совпадают',
        'js.regError': 'Ошибка регистрации: ',
        'js.fillLogin': 'Заполните поля входа',
        'js.loginError': 'Неверный email или пароль',
        'js.networkError': 'Не удалось связаться с сервером',
        'js.profNotFound': 'Профиль не найден',
        'js.profReq': 'Имя и фамилия обязательны.',
        'js.profUpdated': 'Профиль обновлен!',
        'js.profFail': 'Ошибка сохранения профиля',
        'js.profLoadFail': 'Не удалось загрузить профиль',
        'js.deleteSeries': 'Удалить серию',
        'js.deleteSeriesConfirm': 'Удалить все повторяющиеся события этой серии?',
        'js.confirmSeries': 'Участвовать в серии',
        'js.leaveSeries': 'Выйти из серии',
        'js.confirmSeriesConfirm': 'Присоединиться ко всем повторяющимся событиям этой серии?',
        'js.leaveSeriesConfirm': 'Покинуть все повторяющиеся события этой серии?',
        'js.recurrenceInfo': 'Повторяющееся событие',
        'js.noEvents': 'Нет событий',
        'js.eventOf': 'из',
        'js.editTitle': 'Изменить название',
        'js.saveTitle': 'Сохранить',
        'js.titlePlaceholder': 'Название события',
        'js.addTitle': 'Нажмите, чтобы добавить название',
        'toast.freeDay': 'Свободен: {date}',
        'toast.busyDay': 'Занят: {date}',
        'toast.clearedDay': 'Отметка снята: {date}',
        'toast.freeTime': 'Свободен {start}–{end}: {date}',
        'toast.busyTime': 'Занят {start}–{end}: {date}',
        'toast.freeRangeTime': 'Свободен {start}–{end}, дней: {count}',
        'toast.busyRangeTime': 'Занят {start}–{end}, дней: {count}',
        'toast.timeRequired': 'Укажите начало и конец времени',
        'toast.timeOrder': 'Конец должен быть позже начала',
        'toast.rangeFree': 'Свободных дней: {count}',
        'toast.rangeBusy': 'Занятых дней: {count}',
        'toast.markError': 'Не удалось сохранить отметку',
        'toast.leftGroup': 'Вы покинули группу',
        'toast.removedFromGroup': 'Вас удалили из группы',
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
        'rec.endDateRequired': 'Укажите дату окончания',
        'rec.endCountLabel': 'Количество повторений',
        'rec.apply': 'Создать',
        'modal.recurrenceTitle': 'Новое событие',
        'rec.noteTitle': 'Название (необязательно)',
        'rec.noteTitlePlaceholder': 'Название события',
        'js.recDaily': 'ежедневно',
        'js.recWeekly': 'еженедельно',
        'js.recMonthly': 'ежемесячно',
        'js.recEvery': 'каждые',
        'js.recDays': 'дн.',
        'js.recWeeks': 'нед.',
        'js.recMonths': 'мес.',
        'js.recUntil': 'до',
        'js.recTimes': 'раз',
        'nav.calendar': 'Календарь',
        'nav.upcoming': 'Предстоящие',
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
        'common.close': 'Close',
        'error.prefix': 'Error',
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
        'group.copyLink': 'Copy link',
        'group.qr': 'QR code',
        'group.settings': 'Settings',
        'day.participants': 'Participants',
        'day.comments': 'Comments',
        'day.addComment': 'Add a comment...',
        'day.send': 'Send',
        'day.copy': 'Copy day',
        'day.prev': 'Previous day',
        'day.next': 'Next day',
        'day.noEvents': 'No events on this day',
        'day.createEvent': '+ New event',
        'day.myAvailability': 'Me',
        'day.free': 'Free',
        'day.busy': 'Busy',
        'day.nobodyMarked': 'Nobody has marked this day yet',
        'day.noMarks': 'no marks',
        'day.myMarksEmpty': 'No marks on this day',
        'day.editingMark': 'Editing a mark',
        'day.editMark': 'edit',
        'day.removeMark': 'remove',
        'day.busyAllDay': 'Busy all day',
        'day.freeAllDay': 'Free all day',
        // how other members' days are described
        'day.busyWholeDay': 'busy all day',
        'day.freeWholeDay': 'free all day',
        'day.busyFor': 'busy {range}',
        'day.freeFor': 'free {range}',
        'day.commonFree': 'Everyone is free: {ranges}',
        'day.commonFreeAllDay': 'Everyone is free all day',
        'day.noCommonFree': 'No time works for everyone this day',
        'day.busyWarning': 'You are busy at that time',
        'day.busyWarningDay': 'You are busy that day',
        'day.atTimeBusy': 'Busy at {time}: {names}',
        'day.thatDayBusy': 'Busy that day: {names}',
        'day.atTimeUnknown': 'Not marked for {time}: {names}',
        'range.label': 'Mark time',
        'range.allDay': 'all day',
        'range.from': 'from',
        'range.to': 'to',
        'time.hour': 'hour',
        'time.minute': 'minutes',
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
        'modal.profLogin': 'Login',
        'modal.profFirst': 'First Name',
        'modal.profLast': 'Last Name',
        'modal.profPassTitle': 'Update Password',
        'modal.profPass': 'New Password (leave blank to keep current)',
        'modal.profSave': 'Save',
        'role.admin': 'Administrator',
        'modal.adminTitle': 'Admin panel',
        'modal.statsTitle': 'Group stats',
        'modal.qrTitle': 'Invite QR code',
        'dialog.ok': 'OK',
        'dialog.cancel': 'Cancel',
        'tool.label': 'Tool',
        'tool.view': 'View',
        'tool.free': 'Free',
        'tool.busy': 'Busy',
        'tool.done': 'Done',
        'tool.viewTip': 'Click a day to open it: availability, events, comments (key 1)',
        'tool.freeTip': '“Free” brush: click days or drag over a range (key 2)',
        'tool.busyTip': '“Busy” brush: click days or drag over a range (key 3)',
        'hint.viewEmpty': 'Click a day to mark your availability or create an event. For quick marking pick the “Free” or “Busy” brush.',
        'hint.brushFree': '“Free” brush: click days or drag over a range. Click an identical mark again to remove it.',
        'hint.brushBusy': '“Busy” brush: click days or drag over a range. Click an identical mark again to remove it.',
        'cal.today': 'Today',
        'cal.prevHint': 'Previous month',
        'cal.nextHint': 'Next month',
        'cal.more': '{n} more',
        'cal.participantsShort': 'ppl',
        'cal.eventsShort': 'ev.',
        'legend.free': 'My free days',
        'legend.busy': 'My busy days',
        'legend.event': 'Days with events',
        'legend.allFree': 'Everyone is free',
        'legend.groupBar': 'Group availability',
        'legend.groupBarTip': 'The bar at the bottom of a day is the whole day: green — everyone is free, red — someone is busy, grey — not everyone has marked',
        'legend.defaultFree': 'Treat unmarked days as free',
        'legend.defaultFreeTip': 'Turn on if you are free every day except the ones marked busy: unmarked days then count as free for the group',
        'legend.defaultFreeShort': 'unmarked days are free',
        'summary.text': 'This month: {free} free · {busy} busy · {common} work for everyone',
        'toolbar.stats': 'Stats',
        'toolbar.export': 'Export iCal',
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
        'admin.selfRole': 'You cannot change your own role',
        'admin.selfDelete': 'You cannot delete your own account',
        'stats.total': 'Total events',
        'stats.upcoming': 'Upcoming events',
        'stats.participation': 'My participation',
        'stats.topParticipant': 'Most active participant',
        'stats.members': 'Group members',
        'stats.commonDays': 'Days with a time that suits everyone',
        'stats.myMarks': 'My marks',
        'stats.myMarksValue': '{free} free · {busy} busy',
        'settings.myMarks': 'My availability marks',
        'settings.clearMarks': 'Clear my marks',
        'settings.clearMarksConfirm': 'Remove all your marks in this group?',
        'settings.marksCleared': 'Your marks were cleared',
        'settings.noMarks': 'You have no marks in this group yet',
        'notif.enabled': 'Notifications enabled',
        'notif.disabled': 'Notifications disabled',
        'notif.unsupported': 'Browser does not support notifications',
        'notif.blocked': 'Notification permission denied',
        'notif.newNotes': 'Group events updated',
        'notif.newComments': 'New comment',
        'notif.groupChanged': 'Group changes',
        'notif.availability': 'Availability marks were updated',
        'js.participants': 'participants',
        'js.events': 'events',
        'js.creator': 'Creator',
        'js.member': 'Member',
        'js.you': 'you',
        'js.remove': 'Remove',
        'js.deleteConfirm': 'Are you sure you want to delete this group?',
        'js.groupDeleted': 'Group “{name}” was deleted',
        'js.enterLink': 'Enter an invite link or code',
        'js.badLink': 'Invite not found. Check the link or code.',
        'js.joined': 'You joined the group',
        'js.removeConfirm': 'Remove this participant?',
        'js.leaveConfirm': 'Leave the group “{name}”?',
        'js.convenient': 'Mark as unavailable',
        'js.markConvenient': '+ Mark as available',
        'js.deleteNote': 'Delete event',
        'js.deleteNoteConfirm': 'Delete this event?',
        'js.virtualDelete': 'This is a repeat of a series. It cannot be deleted on its own — delete the series instead.',
        'js.noParticipants': 'No participants yet',
        'js.edited': '(edited)',
        'js.edit': 'Edit',
        'js.deleteCommentConfirm': 'Delete comment?',
        'js.noComments': 'No comments yet',
        'js.cancel': 'Cancel',
        'js.save': 'Save',
        'js.linkCopied': 'Link copied!',
        'js.copiedDay': 'Day copied to clipboard',
        'js.exportDone': 'Calendar exported to iCal',
        'js.clipboardError': 'Could not copy to clipboard',
        'js.fillReg': 'Fill in all registration fields',
        'js.passwordMismatch': 'Passwords do not match',
        'js.regError': 'Registration failed: ',
        'js.fillLogin': 'Fill in the login fields',
        'js.loginError': 'Wrong email or password',
        'js.networkError': 'Could not reach the server',
        'js.profNotFound': 'Profile not found',
        'js.profReq': 'First name and last name are required.',
        'js.profUpdated': 'Profile updated!',
        'js.profFail': 'Error saving profile',
        'js.profLoadFail': 'Failed to load profile',
        'js.deleteSeries': 'Delete series',
        'js.deleteSeriesConfirm': 'Delete every recurring event of this series?',
        'js.confirmSeries': 'Join series',
        'js.leaveSeries': 'Leave series',
        'js.confirmSeriesConfirm': 'Join all recurring events of this series?',
        'js.leaveSeriesConfirm': 'Leave all recurring events of this series?',
        'js.recurrenceInfo': 'Recurring event',
        'js.noEvents': 'No events',
        'js.eventOf': 'of',
        'js.editTitle': 'Edit title',
        'js.saveTitle': 'Save',
        'js.titlePlaceholder': 'Event title',
        'js.addTitle': 'Click to add a title',
        'toast.freeDay': 'Free: {date}',
        'toast.busyDay': 'Busy: {date}',
        'toast.clearedDay': 'Mark cleared: {date}',
        'toast.freeTime': 'Free {start}–{end}: {date}',
        'toast.busyTime': 'Busy {start}–{end}: {date}',
        'toast.freeRangeTime': 'Free {start}–{end}, days: {count}',
        'toast.busyRangeTime': 'Busy {start}–{end}, days: {count}',
        'toast.timeRequired': 'Set both the start and the end time',
        'toast.timeOrder': 'The end must be later than the start',
        'toast.rangeFree': 'Free days: {count}',
        'toast.rangeBusy': 'Busy days: {count}',
        'toast.markError': 'Could not save the mark',
        'toast.leftGroup': 'You left the group',
        'toast.removedFromGroup': 'You were removed from the group',
        'rec.type': 'Repeat',
        'rec.none': 'Does not repeat',
        'rec.daily': 'Daily',
        'rec.weekly': 'Weekly',
        'rec.monthly': 'Monthly',
        'rec.time': 'Time (optional)',
        'rec.interval': 'Repeat every',
        'rec.daysOfWeek': 'Days of the week',
        'rec.dayMon': 'Mon', 'rec.dayTue': 'Tue', 'rec.dayWed': 'Wed', 'rec.dayThu': 'Thu',
        'rec.dayFri': 'Fri', 'rec.daySat': 'Sat', 'rec.daySun': 'Sun',
        'rec.endType': 'Ends',
        'rec.endNever': 'Never',
        'rec.endDate': 'On a date',
        'rec.endCount': 'After occurrences',
        'rec.endDateLabel': 'End date',
        'rec.endDateRequired': 'Pick an end date',
        'rec.endCountLabel': 'Number of occurrences',
        'rec.apply': 'Create',
        'modal.recurrenceTitle': 'New event',
        'rec.noteTitle': 'Title (optional)',
        'rec.noteTitlePlaceholder': 'Event title',
        'js.recDaily': 'daily',
        'js.recWeekly': 'weekly',
        'js.recMonthly': 'monthly',
        'js.recEvery': 'every',
        'js.recDays': 'days',
        'js.recWeeks': 'weeks',
        'js.recMonths': 'months',
        'js.recUntil': 'until',
        'js.recTimes': 'times',
        'nav.calendar': 'Calendar',
        'nav.upcoming': 'Upcoming',
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
};

// ============================================================
// i18n
// ============================================================
function getT(key) {
    const table = translations[currentLang];
    return (table && table[key]) || translations.ru[key] || key;
}

// Replaces {name} placeholders in a translated template
function fmt(template, params) {
    return String(template).replace(/\{(\w+)\}/g, (_, name) => (params && params[name] != null) ? params[name] : '');
}

function tF(key, params) {
    return fmt(getT(key), params);
}

const el = id => document.getElementById(id);

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(node => { node.innerText = getT(node.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => { node.placeholder = getT(node.getAttribute('data-i18n-placeholder')); });
    document.querySelectorAll('[data-title-i18n]').forEach(node => { node.title = getT(node.getAttribute('data-title-i18n')); });
    document.querySelectorAll('[data-aria-i18n]').forEach(node => { node.setAttribute('aria-label', getT(node.getAttribute('data-aria-i18n'))); });

    el('langSwitchBtn').innerText = currentLang === 'ru' ? 'EN' : 'RU';
    el('groupParticipantCountLabel').innerText = getT('js.participants');

    setRealtimeStatus(window._realtimeOnline === true);
    updateNotifyButton();
    updateToolUi();
    updateCalendarTexts();
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('askdate_lang', currentLang);
    applyTranslations();
    fetchGroups(); // group names and participant roles
    if (window.currentGroup) renderParticipantsModal(window.currentGroup);
    redrawAvailability();
}

// ============================================================
// Constants and state
// ============================================================
const API_URL = '/api';
const USERS_API_URL = '/api';
const MARK_FREE = 1;
const MARK_BUSY = 2;

window.token = localStorage.getItem('askdate_token') || '';
window.profileId = localStorage.getItem('askdate_profileId') || '';
window.refreshToken = localStorage.getItem('askdate_refresh_token') || '';
window.currentGroupId = null;
window.currentGroupCreatorId = null;
window.currentGroup = null;   // GroupDto of the opened group (with participants)
window.currentNotes = [];     // events of the opened group (including virtual instances)
window.currentMarks = [];     // every member's marks: [{ profileId, date: 'YYYY-MM-DD', type: MARK_FREE | MARK_BUSY }]
window.selectedNote = null;
let currentTool = 'view';     // 'view' | 'free' | 'busy' — what a click on the calendar does
let groupsLoaded = false;
const commentsCache = new Map(); // noteId -> comments; realtime events invalidate it

// ============================================================
// Small utilities
// ============================================================
function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

const AVATAR_COLORS = ['#EE6C4D', '#3D5A80', '#98C1D9', '#52B788', '#5C9CE6', '#B5838D', '#6D9773', '#C9ADA7'];

function hashStr(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
    return Math.abs(hash);
}

function avatarHtml(name, id, small) {
    const initials = String(name || '?').trim().split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase() || '?';
    const color = AVATAR_COLORS[(id || hashStr(name || '?')) % AVATAR_COLORS.length];
    return `<span class="avatar${small ? ' avatar-small' : ''}" style="background:${color}" aria-hidden="true">${esc(initials)}</span>`;
}

function debounce(fn, ms) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

// FullCalendar hands out local-midnight Dates; this turns them back into 'YYYY-MM-DD'
function toLocalIsoStr(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
}

function todayStr() {
    return toLocalIsoStr(new Date());
}

function addDaysIso(dateStr, n) {
    const date = new Date(dateStr + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + n);
    return date.toISOString().split('T')[0];
}

// end is exclusive, as in FullCalendar's select callback
function dayCount(startStr, endStr) {
    return Math.max(1, Math.round((Date.parse(endStr) - Date.parse(startStr)) / 86400000));
}

function dateLocale() {
    return currentLang === 'ru' ? 'ru-RU' : 'en-US';
}

function formatDateHuman(dateStr, options) {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString(dateLocale(), options || { day: 'numeric', month: 'long' });
}

function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const day = toLocalIsoStr(date);
    const dayLabel = day === todayStr() ? getT('upcoming.today') : formatDateHuman(day, { day: 'numeric', month: 'short' });
    return `${dayLabel}, ${date.toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' })}`;
}

// 'HH:MM' when the event has a time, null for whole-day events
function noteTime(note) {
    const match = String(note.date || '').match(/T(\d{2}):(\d{2})/);
    if (!match) return null;
    return (match[1] === '00' && match[2] === '00') ? null : `${match[1]}:${match[2]}`;
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        console.error('Clipboard write failed:', e);
        return false;
    }
}

// ============================================================
// JWT helpers
// ============================================================
function parseJwt(token) {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(atob(base64).split('').map(ch => '%' + ('00' + ch.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

// Tokens issued now carry short claim names; older ones use the full URI forms
function jwtRole(payload) {
    return payload?.role || payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
}

function jwtUserId(payload) {
    return payload?.nameid || payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/nameidentifier'];
}

function isTokenExpired(token) {
    if (!token) return true;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
    return (payload.exp * 1000) < (Date.now() - 30000); // 30s buffer against clock skew
}

function isAdminUser() {
    return jwtRole(parseJwt(window.token)) === 'Administrator';
}

function updateAdminVisibility() {
    const admin = isAdminUser();
    el('adminBtn').classList.toggle('hidden', !admin);
    el('adminMenuLink').classList.toggle('hidden', !admin);
}

// ============================================================
// Session
// ============================================================
function resetAppState() {
    window.currentGroupId = null;
    window.currentGroupCreatorId = null;
    window.currentGroup = null;
    window.currentNotes = [];
    window.currentMarks = [];
    window.selectedNote = null;
    window._currentDayDateStr = null;
    window._avail = computeAvailability();
    currentTool = 'view';
    groupsLoaded = false;
    commentsCache.clear();

    closeDayPanel();
    el('groupDetails').classList.add('hidden');
    el('groupsList').innerHTML = '';
    el('groupsEmpty').classList.add('hidden');
    el('headerUserName').innerText = '';
    el('headerUserName').title = '';
    el('upcomingSearch').value = '';
    el('upcomingEventsList').innerHTML = '';
    updateToolUi();
}

function clearSession() {
    window.token = '';
    window.profileId = '';
    window.refreshToken = '';
    ['askdate_token', 'askdate_profileId', 'askdate_refresh_token', 'askdate_currentGroupId'].forEach(key => localStorage.removeItem(key));
    stopRealtime();
    updateAdminVisibility();
    resetAppState();
}

function forceLogout(showMessage) {
    clearSession();
    showView('loginView');
    if (showMessage) {
        appAlert(currentLang === 'ru' ? 'Сессия истекла. Пожалуйста, войдите заново.' : 'Session expired. Please log in again.');
    }
}

// Refresh tokens are single-use and rotated on every call: two requests sharing one invalidate
// each other and end the session. Within a tab every caller shares one request; across tabs a
// lock in localStorage makes the others wait for the first one's result and take over its tokens.
let refreshInFlight = null;
const REFRESH_LOCK_KEY = 'askdate_refresh_lock';

// Takes the tokens another tab has stored; false when there are none
function adoptStoredTokens() {
    const token = localStorage.getItem('askdate_token');
    if (!token) return false;

    window.token = token;
    window.refreshToken = localStorage.getItem('askdate_refresh_token') || window.refreshToken;
    updateAdminVisibility();
    return true;
}

async function tryRefreshToken() {
    if (!refreshInFlight) refreshInFlight = refreshSession().finally(() => { refreshInFlight = null; });
    return refreshInFlight;
}

async function refreshSession() {
    if (await waitForOtherTab()) return true;

    const refreshToken = window.refreshToken || localStorage.getItem('askdate_refresh_token');
    if (!refreshToken) return false;

    localStorage.setItem(REFRESH_LOCK_KEY, String(Date.now()));
    try {
        try {
            const res = await fetch(`${USERS_API_URL}/User/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
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
    } finally {
        localStorage.removeItem(REFRESH_LOCK_KEY);
    }
}

// True when another tab refreshed the session in the meantime and this tab took over its tokens.
// A lock older than ten seconds belongs to a tab that is gone: refresh on our own then.
async function waitForOtherTab() {
    const tokenBefore = localStorage.getItem('askdate_token');
    for (let waited = 0; waited < 8000; waited += 200) {
        const lockedAt = Number(localStorage.getItem(REFRESH_LOCK_KEY) || 0);
        if (!lockedAt || Date.now() - lockedAt > 10000) return false;
        await new Promise(resolve => setTimeout(resolve, 200));
        if (adoptStoredTokens() && window.token !== tokenBefore) return true;
    }
    return false;
}

// Another tab of this browser refreshed or ended the session: follow it
window.addEventListener('storage', event => {
    if (event.storageArea !== localStorage || !event.key || !event.key.startsWith('askdate_') || !window.token) return;
    if (event.key === 'askdate_token' && !event.newValue) {
        forceLogout(false); // logged out there
        return;
    }
    if (event.key === 'askdate_token' || event.key === 'askdate_refresh_token') adoptStoredTokens();
});

// Refreshes the access token when needed; false means the user was logged out
async function ensureFreshToken() {
    if (!isTokenExpired(window.token)) return true;
    if (await tryRefreshToken()) return true;
    forceLogout(true);
    return false;
}

// ============================================================
// Dialogs and toasts
// ============================================================
// Resolves to true for "OK", to false for "Отмена" / Esc. Enter is left to the focused button,
// so the key press that opened the dialog cannot confirm it by accident.
function showDialog(text, withCancel) {
    return new Promise(resolve => {
        const overlay = el('customDialogOverlay');
        const okBtn = el('customDialogOk');
        const cancelBtn = el('customDialogCancel');
        el('customDialogText').innerText = text;
        cancelBtn.classList.toggle('hidden', !withCancel);
        el('customDialogBox').classList.remove('hidden');
        overlay.classList.remove('hidden');

        const close = value => {
            overlay.classList.add('hidden');
            document.removeEventListener('keydown', onKey);
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            resolve(value);
        };
        const onKey = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                close(!withCancel);
            }
        };

        okBtn.onclick = () => close(true);
        cancelBtn.onclick = () => close(false);
        document.addEventListener('keydown', onKey);
        // For a question the safe answer gets the focus
        (withCancel ? cancelBtn : okBtn).focus();
    });
}

window.appAlert = message => showDialog(message, false);
window.appConfirm = message => showDialog(message, true);

let toastTimer = null;

// One toast at a time: rapid marking replaces the message instead of stacking toasts
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ` toast-${type}` : '');
    toast.innerText = message;
    el('toastHost').replaceChildren(toast);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.style.transition = 'opacity 0.4s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 2200);
}

function toggleMobileMenu() {
    el('mobileMenuDropdown').classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();

    const joinCode = new URLSearchParams(window.location.search).get('join');
    if (joinCode) {
        localStorage.setItem('pending_join', joinCode);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    el('upcomingSearch').addEventListener('input', debounce(() => renderUpcomingEvents(), 200));
    setupKeyboardShortcuts();

    if (!window.token || !window.profileId) {
        showView('loginView');
        return;
    }
    if (isTokenExpired(window.token)) {
        tryRefreshToken().then(refreshed => (refreshed ? checkAuth() : forceLogout(false)));
    } else {
        checkAuth();
    }
});

function openModal(id) {
    closeDayPanel();
    el('appOverlay').classList.remove('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    const modal = el(id);
    modal.classList.remove('hidden');
    modal.scrollTop = 0;
    const focusTarget = modal.querySelector('input:not([type=hidden]):not([disabled]), select, textarea') || modal.querySelector('.close-btn');
    if (focusTarget) setTimeout(() => focusTarget.focus(), 30);
}

function closeAllModals() {
    el('appOverlay').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

function showView(viewId) {
    ['loginView', 'registerView', 'mainView'].forEach(id => el(id).classList.toggle('hidden', id !== viewId));
    el('navMenu').classList.toggle('hidden', viewId !== 'mainView');
    if (viewId !== 'mainView') el('mobileMenuDropdown').classList.add('hidden');
}

// ============================================================
// HTTP
// ============================================================
async function readProblem(response) {
    try {
        const data = await response.clone().json();
        return { detail: data && data.detail, title: data && data.title };
    } catch (e) {
        return { detail: null, title: null };
    }
}

function describeError(response, problem) {
    return `${getT('error.prefix')}: ${(problem && (problem.detail || problem.title)) || `${response.status} ${response.statusText}`}`;
}

async function request(base, endpoint, method, body, opts, isUsersApi) {
    if (!await ensureFreshToken()) return { ok: false, status: 0 };

    const headers = { 'Authorization': `Bearer ${window.token}` };
    if (!isUsersApi) headers['X-Profile-Id'] = window.profileId; // kept for tokens issued before the profileId claim
    const options = { method, headers };
    if (body !== null && body !== undefined) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    let response = await fetch(`${base}${endpoint}`, options);
    if (response.status === 401) {
        if (!await tryRefreshToken()) { forceLogout(true); return { ok: false, status: 401 }; }
        headers['Authorization'] = `Bearer ${window.token}`;
        response = await fetch(`${base}${endpoint}`, options);
        if (response.status === 401) { forceLogout(true); return { ok: false, status: 401 }; }
    }

    window._lastApiStatus = response.status;
    if (!response.ok) {
        if (!opts.silent) appAlert(describeError(response, await readProblem(response)));
        return { ok: false, status: response.status };
    }

    const text = await response.text();
    let data = null;
    if (text) {
        try { data = JSON.parse(text); } catch (e) { data = null; }
    }
    return { ok: true, status: response.status, data };
}

// Main API. Resolves to the parsed body, `true` for an empty 2xx response, or `false` on failure.
// An alert is shown on failure unless opts.silent; the status is left in window._lastApiStatus.
async function apiCall(endpoint, method = 'GET', body = null, opts = {}) {
    const result = await request(API_URL, endpoint, method, body, opts, false);
    if (!result.ok) return false;
    return (result.data !== null) ? result.data : true;
}

// Users / auth microservice. Same contract as apiCall, except that failures resolve to null.
async function usersApi(endpoint, method = 'GET', body = null, opts = {}) {
    const result = await request(USERS_API_URL, endpoint, method, body, opts, true);
    if (!result.ok) return null;
    return (result.data !== null) ? result.data : true;
}

// ============================================================
// Auth views
// ============================================================
async function registerUser() {
    const email = el('regEmail').value.trim();
    const password = el('regPassword').value;
    const confirmPassword = el('regConfirmPassword').value;
    const firstName = el('regFirstName').value.trim();
    const lastName = el('regLastName').value.trim();

    if (!email || !password || !confirmPassword || !firstName || !lastName) return appAlert(getT('js.fillReg'));
    if (password !== confirmPassword) return appAlert(getT('js.passwordMismatch'));

    try {
        const regRes = await fetch(`${USERS_API_URL}/User/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirmPassword })
        });
        if (!regRes.ok) {
            const problem = await readProblem(regRes);
            return appAlert(getT('js.regError') + ((problem && (problem.detail || problem.title)) || regRes.statusText));
        }

        const loginRes = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!loginRes.ok) return appAlert(getT('js.loginError'));
        const loginData = await loginRes.json();

        // The profile is bound to the account that has just logged in
        const profileRes = await fetch(`${USERS_API_URL}/Profile/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loginData.token}` },
            body: JSON.stringify({ firstName, lastName, age: 0, gender: 'Unspecified', about: '', currentAvatar: '', status: 1 })
        });
        if (!profileRes.ok) return appAlert(`${getT('error.prefix')}: ${getT('js.profNotFound')}`);
        const profileId = await profileRes.json();

        setTokens(loginData.token, profileId, loginData.refreshToken);
    } catch (e) {
        console.error(e);
        appAlert(getT('js.networkError'));
    }
}

async function loginUser() {
    const email = el('loginEmail').value.trim();
    const password = el('loginPassword').value;
    if (!email || !password) return appAlert(getT('js.fillLogin'));

    try {
        const res = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) return appAlert(getT('js.loginError'));
        const data = await res.json();

        const profRes = await fetch(`${USERS_API_URL}/Profile/user/${data.userId}`, { headers: { 'Authorization': `Bearer ${data.token}` } });
        if (!profRes.ok) return appAlert(getT('js.profNotFound'));
        const profiles = await profRes.json();
        if (!Array.isArray(profiles) || !profiles.length) return appAlert(getT('js.profNotFound'));

        setTokens(data.token, profiles[0].id, data.refreshToken);
    } catch (e) {
        console.error(e);
        appAlert(getT('js.networkError'));
    }
}

function setTokens(token, profileId, refreshToken) {
    window.token = token;
    window.profileId = profileId;
    window.refreshToken = refreshToken || '';
    localStorage.setItem('askdate_token', token);
    localStorage.setItem('askdate_profileId', profileId);
    if (refreshToken) localStorage.setItem('askdate_refresh_token', refreshToken);
    updateAdminVisibility();
    checkAuth();
}

function logoutUser() {
    clearSession();
    showView('loginView');
}

async function checkAuth() {
    if (!window.token || !window.profileId) { showView('loginView'); return; }
    if (!await ensureFreshToken()) return;

    showView('mainView');
    fetchCurrentUserName();
    ensureRealtime();

    const pendingJoin = localStorage.getItem('pending_join');
    if (pendingJoin) {
        localStorage.removeItem('pending_join');
        // joinGroupByCode refreshes the list and opens the group itself
        if (await joinGroupByCode(pendingJoin)) return;
    }

    const groups = await fetchGroups();
    const savedGroupId = localStorage.getItem('askdate_currentGroupId');
    if (savedGroupId && !window.currentGroupId && Array.isArray(groups) && groups.some(g => String(g.id) === savedGroupId)) {
        loadGroup(savedGroupId);
    }
}

async function fetchCurrentUserName() {
    const profile = await usersApi(`/Profile/${window.profileId}`, 'GET', null, { silent: true });
    if (!profile) return;
    const name = el('headerUserName');
    name.innerText = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();

    const me = await usersApi('/User/me', 'GET', null, { silent: true });
    window.currentUserId = me ? me.userId : null;   // used when changing the password
    window.currentUserEmail = me ? me.email : '';
    window.currentUserRole = me ? me.role : '';
    name.title = window.currentUserEmail;
}

// ============================================================
// Groups
// ============================================================
function showGroupsSkeleton() {
    el('groupsList').innerHTML = Array.from({ length: 3 }, () => '<li class="skeleton skeleton-line" style="padding:0;" aria-hidden="true"></li>').join('');
}

// Updates the list in place: existing rows keep their DOM nodes, so a refresh never flickers
function renderGroupsList(groups) {
    const list = el('groupsList');
    list.querySelectorAll('li:not([data-group-id])').forEach(li => li.remove());

    const existing = new Map(Array.from(list.querySelectorAll('li[data-group-id]'), li => [li.dataset.groupId, li]));
    const seen = new Set();
    const activeId = String(window.currentGroupId);

    groups.forEach(group => {
        const key = String(group.id);
        seen.add(key);
        let li = existing.get(key);
        if (!li) {
            li = document.createElement('li');
            li.className = 'list-item group-item';
            li.dataset.groupId = key;
            li.onclick = () => loadGroup(group.id);
        }
        li.textContent = group.name;
        li.title = group.name;
        li.classList.toggle('list-item-active', key === activeId);
        list.appendChild(li); // keeps the server order
    });

    existing.forEach((li, key) => { if (!seen.has(key)) li.remove(); });

    groupsLoaded = true;
    el('groupsEmpty').classList.toggle('hidden', groups.length > 0);
}

function markActiveGroupInList() {
    const activeId = String(window.currentGroupId);
    document.querySelectorAll('#groupsList li[data-group-id]').forEach(li =>
        li.classList.toggle('list-item-active', li.dataset.groupId === activeId));
}

async function fetchGroups() {
    if (!groupsLoaded && !el('groupsList').querySelector('li[data-group-id]')) showGroupsSkeleton();
    const groups = await apiCall('/groups', 'GET', null, { silent: true });
    if (!Array.isArray(groups)) {
        if (!groupsLoaded) el('groupsList').innerHTML = '';
        return null;
    }
    renderGroupsList(groups);
    return groups;
}

async function createGroup() {
    const name = el('newGroupName').value.trim();
    if (!name) return;

    const group = await apiCall('/groups', 'POST', { name });
    if (!group) return;

    el('newGroupName').value = '';
    closeAllModals();
    await fetchGroups();
    if (group.id) loadGroup(group.id);
}

async function loadGroup(id) {
    const group = await apiCall(`/groups/${id}`, 'GET', null, { silent: true });
    if (!group) {
        // Not accessible any more (removed from the group, or the group is gone)
        if (window._lastApiStatus === 403 || window._lastApiStatus === 404) forgetGroup(id);
        return;
    }

    closeDayPanel();
    joinRealtimeGroup(id);

    window.currentGroupId = id;
    localStorage.setItem('askdate_currentGroupId', id);
    window.currentGroup = group;
    window.currentGroupCreatorId = group.creatorProfileId;

    el('groupDetails').classList.remove('hidden');
    el('calendarLegend').classList.remove('hidden');
    renderGroupHeader(group);
    renderParticipantsModal(group);
    renderDefaultFreeToggle();
    markActiveGroupInList();
    await Promise.all([fetchNotes(), fetchMarks()]);
}

function renderGroupHeader(group) {
    const isCreator = String(window.profileId) === String(group.creatorProfileId);
    el('groupTitle').innerText = group.name;
    el('groupTitle').title = group.name;
    const editingName = document.activeElement === el('editGroupNameInput');
    if (!editingName) {
        el('editGroupNameInput').value = group.name;
        el('saveGroupNameBtn').style.display = 'none';
    }
    el('groupInviteLink').innerText = group.inviteLink;
    el('groupParticipantCount').innerText = `${(group.participants || []).length}`;
    el('deleteGroupBtn').classList.toggle('hidden', !isCreator);
}

function currentParticipants() {
    return (window.currentGroup && window.currentGroup.participants) || [];
}

function currentMember() {
    return currentParticipants().find(p => String(p.profileId) === String(window.profileId)) || null;
}

function renderParticipantsModal(group) {
    const isCreator = String(window.profileId) === String(group.creatorProfileId);
    const list = el('modalGroupParticipantsList');
    list.innerHTML = '';

    const participants = (group.participants || []).slice();
    participants.sort((a, b) => ((b.role === 1) - (a.role === 1)) || (a.profileName || '').localeCompare(b.profileName || ''));

    participants.forEach(p => {
        const isSelf = String(p.profileId) === String(window.profileId);
        // Members remove themselves; the creator removes others. The creator leaves by deleting
        // the group — otherwise it would be left without an owner.
        const canRemove = isSelf ? !isCreator : isCreator;

        const li = document.createElement('li');
        li.className = 'list-item participant-item';
        li.innerHTML = `
            ${avatarHtml(p.profileName, p.profileId)}
            <span class="participant-info">
                <span class="participant-name">${esc(p.profileName)}${isSelf ? ` <span style="opacity:0.6; font-size:12px;">(${esc(getT('js.you'))})</span>` : ''}</span>
                <span class="participant-meta"><span class="role-badge">${esc(p.role === 1 ? getT('js.creator') : getT('js.member'))}</span>${p.unmarkedDaysFree ? ` · ${esc(getT('legend.defaultFreeShort'))}` : ''}</span>
            </span>
            ${canRemove ? `<button type="button" class="btn-link" onclick="removeParticipant(${p.profileId})">${esc(getT('js.remove'))}</button>` : ''}`;
        list.appendChild(li);
    });
}

function renderDefaultFreeToggle() {
    const me = currentMember();
    el('defaultFreeToggle').checked = !!(me && me.unmarkedDaysFree);
}

// Settings are always shown with fresh data
async function openGroupSettings() {
    if (!window.currentGroupId) return;
    await refreshCurrentGroup();
    if (window.currentGroupId) openModal('groupEditModal');
}

async function saveGroupName() {
    const newName = el('editGroupNameInput').value.trim();
    if (!newName || !window.currentGroupId) return;

    const ok = await apiCall(`/groups/${window.currentGroupId}`, 'PUT', { name: newName });
    if (ok === false) return;

    // Update locally right away; the realtime broadcast does the same for everybody else
    if (window.currentGroup) window.currentGroup.name = newName;
    const li = document.querySelector(`#groupsList li[data-group-id="${window.currentGroupId}"]`);
    if (li) { li.textContent = newName; li.title = newName; }
    el('groupTitle').innerText = newName;
    el('groupTitle').title = newName;
    el('saveGroupNameBtn').style.display = 'none';
}

async function deleteCurrentGroup() {
    if (!window.currentGroupId || !await appConfirm(getT('js.deleteConfirm'))) return;

    const groupId = window.currentGroupId;
    const ok = await apiCall(`/groups/${groupId}`, 'DELETE');
    if (ok === false) return;

    closeAllModals();
    leaveGroupView(null);
    fetchGroups();
}

function copyInviteLink() {
    const code = el('groupInviteLink').innerText;
    if (!code) return;
    copyText(`${window.location.origin}/?join=${code}`).then(ok => showToast(ok ? getT('js.linkCopied') : getT('js.clipboardError'), ok ? 'success' : 'error'));
}

function showInviteQr() {
    const code = el('groupInviteLink').innerText;
    if (!code || typeof QRCode === 'undefined') return showToast(getT('error.prefix'), 'error');

    el('qrInviteCode').innerText = code;
    el('qrContainer').innerHTML = '';
    openModal('qrModal');
    // The QR library needs the modal to be laid out before it can measure its container
    setTimeout(() => {
        new QRCode(el('qrContainer'), {
            text: `${window.location.origin}/?join=${code}`,
            width: 200,
            height: 200,
            colorDark: '#293241',
            colorLight: '#E0FBFC',
            correctLevel: QRCode.CorrectLevel.M
        });
    }, 50);
}

// Accepts a bare code or a full invite link
function joinCodeFromInput(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    if (text.includes('join=')) {
        return new URLSearchParams(text.slice(text.indexOf('?'))).get('join') || '';
    }
    return text;
}

async function joinGroupByCode(code, opts = {}) {
    const group = await apiCall(`/groups/invite/${encodeURIComponent(code)}`, 'GET', null, opts);
    if (!group) return false;

    const joined = await apiCall(`/groups/${group.id}/participants`, 'POST', { inviteLink: code }, opts);
    if (joined === false) return false;

    await fetchGroups();
    loadGroup(group.id);
    return true;
}

async function joinGroupFromModal() {
    const code = joinCodeFromInput(el('inviteLinkInput').value);
    if (!code) return appAlert(getT('js.enterLink'));

    const group = await apiCall(`/groups/invite/${encodeURIComponent(code)}`, 'GET', null, { silent: true });
    if (!group) {
        return appAlert(window._lastApiStatus === 404 ? getT('js.badLink') : `${getT('error.prefix')}: ${window._lastApiStatus}`);
    }

    const joined = await apiCall(`/groups/${group.id}/participants`, 'POST', { inviteLink: code });
    if (joined === false) return;

    el('inviteLinkInput').value = '';
    closeAllModals();
    await fetchGroups();
    loadGroup(group.id);
    showToast(`${getT('js.joined')} «${group.name}»`, 'success');
}

async function removeParticipant(profileId) {
    if (!window.currentGroupId) return;
    const leavingSelf = String(profileId) === String(window.profileId);
    const question = leavingSelf
        ? tF('js.leaveConfirm', { name: window.currentGroup ? window.currentGroup.name : '' })
        : getT('js.removeConfirm');
    if (!await appConfirm(question)) return;

    const ok = await apiCall(`/groups/${window.currentGroupId}/participants/${profileId}`, 'DELETE');
    if (ok === false) return;

    if (leavingSelf) {
        // After leaving, the group is no longer readable — close it right away
        closeAllModals();
        leaveGroupView(getT('toast.leftGroup'));
        fetchGroups();
        return;
    }
    await refreshCurrentGroup();
}

// Closes the opened group and returns to the list
function leaveGroupView(message) {
    const groupId = window.currentGroupId;
    window.currentGroupId = null;
    window.currentGroupCreatorId = null;
    window.currentGroup = null;
    window.currentNotes = [];
    window.currentMarks = [];
    window.selectedNote = null;
    window._currentDayDateStr = null;
    commentsCache.clear();
    localStorage.removeItem('askdate_currentGroupId');

    closeDayPanel();
    if (groupId != null) leaveRealtimeGroup(groupId);

    el('groupDetails').classList.add('hidden');
    el('calendarLegend').classList.add('hidden');
    el('upcomingEventsList').innerHTML = '';
    setTool('view');
    markActiveGroupInList();
    if (message) showToast(message);
}

// The group can no longer be read: close it if it is open, and drop it from the remembered id
async function forgetGroup(id) {
    if (localStorage.getItem('askdate_currentGroupId') === String(id)) localStorage.removeItem('askdate_currentGroupId');
    if (String(id) !== String(window.currentGroupId)) return;

    leaveGroupView(getT('toast.removedFromGroup'));
    fetchGroups();
}

async function refreshCurrentGroup() {
    if (!window.currentGroupId) return;
    const group = await apiCall(`/groups/${window.currentGroupId}`, 'GET', null, { silent: true });
    if (!group) {
        if (window._lastApiStatus === 403 || window._lastApiStatus === 404) forgetGroup(window.currentGroupId);
        return;
    }

    window.currentGroup = group;
    window.currentGroupCreatorId = group.creatorProfileId;
    renderGroupHeader(group);
    renderParticipantsModal(group);
    renderDefaultFreeToggle();
    redrawAvailability();
}

// ============================================================
// Tabs: calendar / upcoming events
// ============================================================
window._activeTab = 'calendar';

function switchTab(tab) {
    window._activeTab = tab;
    el('calendarTab').classList.toggle('hidden', tab !== 'calendar');
    el('upcomingTab').classList.toggle('hidden', tab !== 'upcoming');
    el('tabCalendar').classList.toggle('tab-active', tab === 'calendar');
    el('tabUpcoming').classList.toggle('tab-active', tab === 'upcoming');

    if (tab === 'upcoming') {
        renderUpcomingEvents();
    } else if (window.appCalendar) {
        // FullCalendar cannot measure itself while hidden
        setTimeout(() => { window.appCalendar.updateSize(); decorateCells(); }, 0);
    }
}

// ============================================================
// Upcoming events
// ============================================================
window._upcomingShownCount = 0;
const UPCOMING_PAGE_SIZE = 50;

function upcomingFilter() {
    return el('upcomingSearch').value.trim().toLowerCase();
}

function upcomingNotes() {
    const today = todayStr();
    const filter = upcomingFilter();
    return window.currentNotes
        .filter(note => note.date.slice(0, 10) >= today)
        .filter(note => !filter || `${note.title || ''} ${note.creatorName || ''}`.toLowerCase().includes(filter))
        .sort((a, b) => a.date.localeCompare(b.date));
}

function renderUpcomingEvents() {
    const today = todayStr();
    const filter = upcomingFilter();
    const total = window.currentNotes.filter(note => note.date.slice(0, 10) >= today).length;
    const upcoming = upcomingNotes();

    window._upcomingAll = upcoming;
    window._upcomingShownCount = 0;
    el('upcomingCount').innerText = filter ? `${upcoming.length} ${getT('js.eventOf')} ${total}` : String(upcoming.length);
    appendUpcomingEvents(true);
}

function appendUpcomingEvents(isInitial) {
    const container = el('upcomingEventsList');
    const upcoming = window._upcomingAll || [];
    const start = window._upcomingShownCount;
    const end = Math.min(start + UPCOMING_PAGE_SIZE, upcoming.length);

    if (isInitial && upcoming.length === 0) {
        container.innerHTML = `<div class="upcoming-empty">${esc(getT(upcomingFilter() ? 'upcoming.noMatch' : 'upcoming.noEvents'))}</div>`;
        return;
    }

    const profileId = Number(window.profileId);
    const grouped = new Map();
    upcoming.slice(start, end).forEach(note => {
        const date = note.date.slice(0, 10);
        if (!grouped.has(date)) grouped.set(date, []);
        grouped.get(date).push(note);
    });

    const today = todayStr();
    const tomorrow = addDaysIso(today, 1);
    let html = '';

    Array.from(grouped.keys()).sort().forEach(dateStr => {
        let label;
        if (dateStr === today) label = getT('upcoming.today');
        else if (dateStr === tomorrow) label = getT('upcoming.tomorrow');
        else label = formatDateHuman(dateStr, { weekday: 'short', day: 'numeric', month: 'short' });

        html += `<div class="upcoming-date-header">${esc(label)}</div><div class="upcoming-date-group">`;

        grouped.get(dateStr).forEach(note => {
            const isRecurring = (note.recurrenceType && note.recurrenceType !== 'none') || note.parentNoteId || note.isVirtual;
            const isConfirmed = (note.confirmedProfileIds || []).includes(profileId);
            const hasTitle = note.title && note.title.trim();
            const time = noteTime(note);

            html += `
            <div class="upcoming-card${isRecurring ? ' upcoming-card-recurring' : ''}" role="button" tabindex="0"
                 onclick="openDayPanelFromUpcoming('${dateStr}', ${note.id})"
                 onkeydown="if (event.key === 'Enter') openDayPanelFromUpcoming('${dateStr}', ${note.id})">
                <div class="upcoming-card-header">
                    ${hasTitle ? `<span class="upcoming-card-title">${esc(note.title)}</span>` : ''}
                    ${time ? `<span class="time-chip">${esc(time)}</span>` : ''}
                    ${isRecurring ? `<span class="upcoming-badge recurring-badge">&#x21bb; ${esc(getT('upcoming.recurring'))}</span>` : ''}
                </div>
                <div class="upcoming-card-body">
                    <div class="upcoming-card-info">
                        <svg class="upcoming-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        ${(note.confirmedProfileNames || []).length} ${esc(getT('upcoming.participants'))}
                    </div>
                    <div class="upcoming-card-info">
                        <svg class="upcoming-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        ${(note.comments || []).length} ${esc(getT('upcoming.comments'))}
                    </div>
                    <div class="upcoming-card-info">
                        <span class="upcoming-status ${isConfirmed ? 'status-confirmed' : 'status-not-confirmed'}">${esc(isConfirmed ? getT('upcoming.confirmed') : getT('upcoming.notConfirmed'))}</span>
                    </div>
                </div>
                ${!hasTitle ? `<div class="upcoming-card-creator">${esc(note.creatorName || '')}</div>` : ''}
            </div>`;
        });

        html += '</div>';
    });

    const oldBtn = container.querySelector('.upcoming-load-more');
    if (oldBtn) oldBtn.remove();
    if (isInitial) container.innerHTML = html;
    else container.insertAdjacentHTML('beforeend', html);
    window._upcomingShownCount = end;

    if (end < upcoming.length) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-outline upcoming-load-more';
        btn.textContent = `${getT('upcoming.loadMore')} (${upcoming.length - end})`;
        btn.onclick = () => appendUpcomingEvents(false);
        container.appendChild(btn);
    }
}

// Stays on the "Upcoming" tab: the day panel opens on top of the list
function openDayPanelFromUpcoming(dateStr, noteId) {
    openDayPanel(dateStr, noteId);
}

// ============================================================
// Events (notes)
// ============================================================
async function fetchNotes() {
    if (!window.currentGroupId) return false;
    const notes = await apiCall(`/groups/${window.currentGroupId}/notes`, 'GET', null, { silent: true });
    if (!Array.isArray(notes)) return false;

    window.currentNotes = notes;
    redrawAvailability();
    return true;
}

// ============================================================
// Availability marks
// ============================================================
// Derived view of the marks:
//   marksByDate — date -> every member's marks on that day
//   mineByDate  — date -> the current user's marks on that day
//   days        — date -> { byMember, explicitFree, timeline, commonFree } for days that carry a mark
//   eventDates  — dates that have at least one event
// A mark is either whole-day (startTime null) or a [startTime, endTime) interval on one day.
window._avail = { marksByDate: new Map(), mineByDate: new Map(), days: new Map(), eventDates: new Set() };

const DAY_MINUTES = 24 * 60;
// A shorter overlap of everyone's free time is hardly a usable window
const MIN_COMMON_WINDOW = 15;

// Timeline states. The numbers are not ordered by "how bad" a state is — see stateRank.
const T_UNKNOWN = 0;
const T_FREE = 1;
const T_BUSY = 2;

const BAR_COLORS = {
    [T_FREE]: 'rgba(82, 183, 136, 0.85)',
    [T_BUSY]: 'rgba(230, 57, 70, 0.85)',
    [T_UNKNOWN]: 'var(--unknown-tint)'
};

function availabilityUrl() {
    return `/groups/${window.currentGroupId}/availability`;
}

function isMyMark(mark) {
    return String(mark.profileId) === String(window.profileId);
}

function isAllDayMark(mark) {
    return !mark.startTime;
}

function markRange(mark) {
    return mark.startTime ? [toMinutes(mark.startTime), toMinutes(mark.endTime)] : [0, DAY_MINUTES];
}

// My own marks read in the first person ("Занят 9:00–12:00"); other members get the neutral
// wording of memberSummaryText
function markText(mark) {
    if (isAllDayMark(mark)) return getT(mark.type === MARK_BUSY ? 'day.busyAllDay' : 'day.freeAllDay');
    return `${getT(mark.type === MARK_BUSY ? 'day.busy' : 'day.free')} ${mark.startTime}–${mark.endTime}`;
}

function myMarksOn(dateStr) {
    return window._avail.mineByDate.get(dateStr) || [];
}

// Type of my whole-day mark on that day, or 0 — only such marks tint the whole cell
function myAllDayType(dateStr) {
    const mark = myMarksOn(dateStr).find(isAllDayMark);
    return mark ? mark.type : 0;
}

// Whether the mark is exactly the type and span the user is about to paint
function isSameSpan(mark, type, range) {
    if (mark.type !== type) return false;
    return isAllDayMark(mark) ? range.allDay
        : (!range.allDay && mark.startTime === range.start && mark.endTime === range.end);
}

// --- Time helpers ---
function toMinutes(hhmm) {
    const [hours, minutes] = String(hhmm).split(':').map(Number);
    return hours * 60 + minutes;
}

function toHHMM(minutes) {
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

// "09:00" -> "9", "09:30" -> "9:30": for cells too narrow for a full range
function compactTime(hhmm) {
    return String(hhmm).replace(':00', '').replace(/^0/, '');
}

function segmentRange(segment) {
    return `${toHHMM(segment.from)}–${toHHMM(segment.to)}`;
}

// A one-line bar across the day: each segment takes its share of the 24 hours
function segmentsGradient(segments) {
    const stops = segments.map(segment => {
        const from = (segment.from / DAY_MINUTES) * 100;
        const to = (segment.to / DAY_MINUTES) * 100;
        return `${BAR_COLORS[segment.state]} ${from}% ${to}%`;
    });
    return `linear-gradient(90deg, ${stops.join(', ')})`;
}

// --- Timelines ---
// One member's day as [{ state, from, to }], in chronological order and without gaps
function memberTimeline(member, ownMarks) {
    const line = new Uint8Array(DAY_MINUTES).fill(member.unmarkedDaysFree ? T_FREE : T_UNKNOWN);
    ownMarks.forEach(mark => {
        const [from, to] = markRange(mark);
        line.fill(mark.type, from, to);
    });
    return segmentsOf(line);
}

function segmentsOf(line) {
    const segments = [];
    let start = 0;
    for (let minute = 1; minute <= DAY_MINUTES; minute++) {
        if (minute === DAY_MINUTES || line[minute] !== line[start]) {
            segments.push({ state: line[start], from: start, to: minute });
            start = minute;
        }
    }
    return segments;
}

// For the group, the least available member decides: busy beats unknown, unknown beats free
function stateRank(state) {
    return state === T_BUSY ? 2 : state === T_UNKNOWN ? 1 : 0;
}

function groupTimeline(members, byMember) {
    const line = new Uint8Array(DAY_MINUTES).fill(T_FREE);
    members.forEach(member => {
        (byMember.get(String(member.profileId)) || []).forEach(segment => {
            for (let minute = segment.from; minute < segment.to; minute++) {
                if (stateRank(segment.state) > stateRank(line[minute])) line[minute] = segment.state;
            }
        });
    });
    const timeline = segmentsOf(line);
    return { timeline, commonFree: timeline.filter(segment => segment.state === T_FREE && segment.to - segment.from >= MIN_COMMON_WINDOW) };
}

function computeAvailability() {
    const members = currentParticipants();
    const marksByDate = new Map();

    (Array.isArray(window.currentMarks) ? window.currentMarks : []).forEach(mark => {
        let list = marksByDate.get(mark.date);
        if (!list) marksByDate.set(mark.date, list = []);
        list.push(mark);
    });

    const eventDates = new Set(window.currentNotes.map(note => note.date.slice(0, 10)));
    const mineByDate = new Map();
    const days = new Map();

    marksByDate.forEach((marks, date) => {
        const byMember = new Map();
        members.forEach(member => {
            byMember.set(String(member.profileId), memberTimeline(member, marks.filter(mark => String(mark.profileId) === String(member.profileId))));
        });
        mineByDate.set(date, marks.filter(isMyMark));
        days.set(date, {
            byMember,
            explicitFree: marks.some(mark => mark.type === MARK_FREE),
            ...groupTimeline(members, byMember)
        });
    });

    return { marksByDate, mineByDate, days, eventDates };
}

function memberStateAt(dateStr, member, minute) {
    const day = window._avail.days.get(dateStr);
    const segments = day ? day.byMember.get(String(member.profileId)) || [] : [];
    const segment = segments.find(item => minute >= item.from && minute < item.to);
    return segment ? segment.state : (member.unmarkedDaysFree ? T_FREE : T_UNKNOWN);
}

// "Everyone is free" on a day: there is a window (at least MIN_COMMON_WINDOW long) in which no member
// is busy or unknown, and someone has marked the day explicitly. A single-member group gets no
// outline — it would just duplicate the green tint.
function isAllFree(dateStr) {
    const day = window._avail.days.get(dateStr);
    return currentParticipants().length > 1 && !!day && day.explicitFree && day.commonFree.length > 0;
}

// Recomputes everything that depends on marks, members or events
function redrawAvailability() {
    window._avail = computeAvailability();
    refreshCalendarEvents();
    updateAvailabilitySummary();
    updateHint();
    if (window._activeTab === 'upcoming') renderUpcomingEvents();
    refreshOpenDayPanel();
}

// A refresh asked for by the realtime echo. While my own request is in flight, its answer is
// about to bring the same truth, so the echo is deferred instead of racing with that answer.
let pendingMarks = 0;
let marksStale = false;

async function fetchMarks() {
    if (!window.currentGroupId) return false;
    if (pendingMarks > 0) {
        marksStale = true;
        return false;
    }
    const marks = await apiCall(availabilityUrl(), 'GET', null, { silent: true });
    if (!Array.isArray(marks)) return false;

    window.currentMarks = marks;
    redrawAvailability();
    return true;
}

// --- Changing my marks ---
let markQueue = Promise.resolve();

// Replaces my marks on the listed days with the given ones
function applyMyMarks(dates, marks) {
    const touched = new Set(dates.map(String));
    window.currentMarks = window.currentMarks
        .filter(mark => !(isMyMark(mark) && touched.has(mark.date)))
        .concat((Array.isArray(marks) ? marks : []).filter(isMyMark));
    redrawAvailability();
}

// The picture is optimistic: a change shows at once, normalized the same way the server does it,
// and the server's answer — with real ids — replaces it a moment later. Meanwhile the marks carry
// negative provisional ids and cannot be edited: nothing is stored on the server for them yet.
let nextProvisionalId = -1;
const isProvisional = mark => mark.id < 0;

function normalizeDay(dateStr, existing, added) {
    const line = new Uint8Array(DAY_MINUTES);
    existing.forEach(mark => {
        const [from, to] = markRange(mark);
        line.fill(mark.type, from, to);
    });
    if (added) line.fill(added.type, added.from, added.to);

    return segmentsOf(line)
        .filter(segment => segment.state !== T_UNKNOWN)
        .map(segment => {
            const wholeDay = segment.from === 0 && segment.to === DAY_MINUTES;
            return {
                id: nextProvisionalId--,
                profileId: Number(window.profileId),
                date: dateStr,
                type: segment.state,
                startTime: wholeDay ? null : toHHMM(segment.from),
                endTime: wholeDay ? null : (segment.to === DAY_MINUTES ? '24:00' : toHHMM(segment.to))
            };
        });
}

function markToast(type, range, dates) {
    const timed = range && !range.allDay;
    const single = dates.length === 1;
    // toast.freeDay / toast.rangeFree for whole days, toast.freeTime / toast.freeRangeTime for intervals
    const key = timed
        ? `toast.${type === MARK_FREE ? 'free' : 'busy'}${single ? 'Time' : 'RangeTime'}`
        : (single ? `toast.${type === MARK_FREE ? 'free' : 'busy'}Day` : `toast.range${type === MARK_FREE ? 'Free' : 'Busy'}`);
    showToast(tF(key, {
        date: formatDateHuman(dates[0]),
        count: dates.length,
        start: timed ? range.start : '',
        end: timed ? range.end : ''
    }), 'success');
}

// Queued changes in order; "active" marks those that have not been answered yet
const markChanges = [];

// Sends a change through the queue: requests are serialized so that quick consecutive clicks
// reach the server in order, and every answer is applied as is — exactly what is stored now.
function queueMarkRequest(send, touchedDates) {
    const change = { dates: new Set(touchedDates.map(String)), active: true };
    markChanges.push(change);

    markQueue = markQueue.then(async () => {
        pendingMarks++;
        try {
            const marks = await send();
            if (marks === false) {
                showToast(getT('toast.markError'), 'error');
                pendingMarks = 0;        // let the rollback fetch through (see fetchMarks)
                await fetchMarks();
                return;
            }
            // A later queued change covers one of these days too: its answer will describe the day,
            // while this one is already outdated
            const shadowed = markChanges.some(other => other !== change && other.active
                && Array.from(other.dates).some(date => change.dates.has(date)));
            if (!shadowed) applyMyMarks(touchedDates, marks);
        } finally {
            change.active = false;
            markChanges.splice(markChanges.indexOf(change), 1);
            pendingMarks = Math.max(0, pendingMarks - 1);
            if (pendingMarks === 0 && marksStale) {
                marksStale = false;
                fetchMarks();
            }
        }
    });
    return markQueue;
}

// Adds a mark on every listed day. replaceIds: own marks to drop in the same request (editing
// without a gap).
function setMyMarks(dates, type, range = null, replaceIds = null) {
    const list = dates.map(String);
    if (!list.length || !window.currentGroupId) return Promise.resolve();

    const timed = range && !range.allDay;
    const body = { dates: list, type };
    if (timed) {
        body.startTime = range.start;
        body.endTime = range.end;
    }
    if (replaceIds && replaceIds.length) body.replaceIds = replaceIds.map(Number);

    // optimistic picture, normalized the way the server will normalize it
    const added = { type, from: timed ? toMinutes(range.start) : 0, to: timed ? toMinutes(range.end) : DAY_MINUTES };
    const picture = [];
    list.forEach(date => {
        const kept = myMarksOn(date).filter(mark => !(replaceIds || []).includes(mark.id));
        picture.push(...normalizeDay(date, kept, added));
    });
    applyMyMarks(list, picture);

    markToast(type, range, list);

    return queueMarkRequest(() => apiCall(availabilityUrl(), 'PUT', body, { silent: true }), list);
}

// Removes own marks by id, or every own mark on the listed days
function removeMyMarks(ids = [], dates = []) {
    const idList = ids.map(Number).filter(id => id > 0);
    const dateList = dates.map(String);
    if ((!idList.length && !dateList.length) || !window.currentGroupId) return Promise.resolve();

    // The days of the removed marks: the answer lists what is left, so a day left empty must be known
    window.currentMarks.forEach(mark => {
        if (isMyMark(mark) && idList.includes(mark.id) && !dateList.includes(mark.date)) dateList.push(mark.date);
    });

    // optimistic picture: the listed marks are gone, the rest of those days stays as it is
    const remaining = window.currentMarks.filter(mark => isMyMark(mark) && dateList.includes(mark.date) && !idList.includes(mark.id));
    applyMyMarks(dateList, remaining);

    if (dateList.length === 1) showToast(tF('toast.clearedDay', { date: formatDateHuman(dateList[0]) }));

    return queueMarkRequest(
        () => apiCall(availabilityUrl(), 'DELETE', idList.length ? { ids: idList } : { dates: dateList }, { silent: true }),
        dateList
    );
}

async function clearAllMyMarks() {
    if (!window.currentGroupId) return;
    if (!window.currentMarks.some(isMyMark)) return showToast(getT('settings.noMarks'));
    if (!await appConfirm(getT('settings.clearMarksConfirm'))) return;

    const ok = await apiCall(`${availabilityUrl()}/all`, 'DELETE');
    if (ok === false) return;

    window.currentMarks = window.currentMarks.filter(mark => !isMyMark(mark));
    redrawAvailability();
    closeAllModals();
    showToast(getT('settings.marksCleared'), 'success');
}

// "I'm free on every time I did not mark busy" — affects the group summary, never existing marks
async function setDefaultFree(value) {
    if (!window.currentGroupId) return;
    const me = currentMember();
    if (!me || !!me.unmarkedDaysFree === !!value) return;

    me.unmarkedDaysFree = !!value; // optimistic
    redrawAvailability();

    const ok = await apiCall(`/groups/${window.currentGroupId}/availability-default`, 'PUT', { unmarkedDaysFree: !!value }, { silent: true });
    if (ok === false) {
        me.unmarkedDaysFree = !value;
        renderDefaultFreeToggle();
        redrawAvailability();
    }
}

function updateAvailabilitySummary() {
    const summary = el('availabilitySummary');
    const view = window.appCalendar && window.appCalendar.view;
    if (!window.currentGroupId || !view) { summary.innerText = ''; return; }

    const me = currentMember();
    const defaultFree = !!(me && me.unmarkedDaysFree);
    let free = 0;
    let busy = 0;
    let common = 0;

    // currentStart/currentEnd cover the month itself, not the grey days of neighbouring months
    for (let date = toLocalIsoStr(view.currentStart); date < toLocalIsoStr(view.currentEnd); date = addDaysIso(date, 1)) {
        const mine = myMarksOn(date);
        const hasBusy = mine.some(mark => mark.type === MARK_BUSY);
        const hasFree = mine.some(mark => mark.type === MARK_FREE);
        if (hasBusy) busy++;
        if (hasFree || (defaultFree && !hasBusy)) free++;
        if (isAllFree(date)) common++;
    }
    summary.innerText = tF('summary.text', { free, busy, common });
}

// --- Text for people ---
// A day as seen by one member: "занято 9:00–12:00, свободно 14:00–18:00"
function memberSummaryText(segments) {
    if (segments.length === 1 && segments[0].from === 0 && segments[0].to === DAY_MINUTES) {
        return getT(segments[0].state === T_BUSY ? 'day.busyWholeDay' : segments[0].state === T_FREE ? 'day.freeWholeDay' : 'day.noMarks');
    }
    const parts = segments
        .filter(segment => segment.state !== T_UNKNOWN)
        .map(segment => tF(segment.state === T_BUSY ? 'day.busyFor' : 'day.freeFor', { range: segmentRange(segment) }));

    return parts.length ? parts.join(', ') : getT('day.noMarks');
}

// Ranges of the common free windows, or a whole-day phrase
function commonFreeText(day) {
    if (!day || !day.commonFree.length) return '';
    const wholeDay = day.commonFree.length === 1 && day.commonFree[0].from === 0 && day.commonFree[0].to === DAY_MINUTES;
    return wholeDay ? getT('day.commonFreeAllDay') : tF('day.commonFree', { ranges: day.commonFree.map(segmentRange).join(', ') });
}

// ============================================================
// Calendar
// ============================================================
const svgIcon = (paths, strokeWidth) =>
    `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICON_EYE = svgIcon('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>', 2);
const ICON_CHECK = svgIcon('<polyline points="20 6 9 17 4 12"/>', 2.5);
const ICON_CROSS = svgIcon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 2.5);

// The bundled build ships English button captions; months and weekdays come from Intl
function calendarTextOptions() {
    return {
        buttonText: { today: getT('cal.today') },
        buttonHints: { prev: getT('cal.prevHint'), next: getT('cal.nextHint') },
        moreLinkText: info => tF('cal.more', { n: info.num })
    };
}

function onDatesSet() {
    scheduleDecorate();
    updateAvailabilitySummary();
}

function initCalendar() {
    if (typeof FullCalendar === 'undefined') {
        el('calendar').innerHTML = `<div class="upcoming-empty">${esc(getT('js.networkError'))}</div>`;
        return;
    }

    window.appCalendar = new FullCalendar.Calendar(el('calendar'), {
        initialView: 'dayGridMonth',
        firstDay: 1,
        locale: currentLang,
        height: 'auto',
        ...calendarTextOptions(),

        selectable: false,          // switched on by the brushes only
        selectMinDistance: 5,
        select: onCalendarSelect,
        dateClick: onCalendarDateClick,
        eventClick: onCalendarEventClick,

        dayCellClassNames: dayCellClasses,
        dayCellDidMount: info => mountCellBar(info.el),
        datesSet: onDatesSet,
        eventContent: renderEventContent
    });
    window.appCalendar.render();
    new MutationObserver(syncToolbarTexts).observe(el('calendar'), { childList: true, subtree: true, characterData: true });
    scheduleDecorate();
}

// Writes a caption only when it differs, so the observer never triggers itself.
// FullCalendar compiles toolbar captions into its view specs once, so a caption changed
// through setOption at runtime never reaches the toolbar by itself.
function syncToolbarTexts() {
    const calendarEl = el('calendar');
    const today = calendarEl.querySelector('.fc-today-button');
    if (today && today.textContent !== getT('cal.today')) today.textContent = getT('cal.today');

    for (const [selector, key] of [['.fc-prev-button', 'cal.prevHint'], ['.fc-next-button', 'cal.nextHint']]) {
        const button = calendarEl.querySelector(selector);
        if (button && button.title !== getT(key)) button.title = getT(key);
    }
}

// The calendar shows one entry per day for the events, and one chip for each of my time intervals.
// My whole-day marks are not events: they tint the cell (dayCellClasses).
function buildCalendarEvents() {
    const byDate = new Map();
    window.currentNotes.forEach(note => {
        const date = note.date.slice(0, 10);
        if (!byDate.has(date)) byDate.set(date, []);
        byDate.get(date).push(note);
    });

    const eventEntries = Array.from(byDate, ([date, dayNotes]) => {
        const isRecurring = dayNotes.some(note =>
            (note.recurrenceType && note.recurrenceType !== 'none') || note.parentNoteId || note.isVirtual);
        const classNames = isRecurring ? ['fc-event-recurring'] : [];

        if (dayNotes.length > 1) {
            return { id: `multi-${date}`, start: date, title: String(dayNotes.length), classNames, extendedProps: { isMulti: true, count: dayNotes.length } };
        }
        const note = dayNotes[0];
        return {
            id: String(note.id),
            start: date,
            title: String((note.confirmedProfileNames || []).length),
            classNames,
            extendedProps: { isMulti: false, note }
        };
    });

    const markEntries = window.currentMarks
        .filter(mark => isMyMark(mark) && !isAllDayMark(mark))
        .map(mark => ({
            id: `mark-${mark.id}`,
            start: `${mark.date}T${mark.startTime}:00`,
            end: `${mark.date}T${mark.endTime}:00`,
            title: markText(mark),
            classNames: ['mark-event', mark.type === MARK_BUSY ? 'mark-busy' : 'mark-free'],
            extendedProps: { kind: 'mark', mark }
        }));

    return eventEntries.concat(markEntries);
}

function refreshCalendarEvents() {
    if (!window.appCalendar) { initCalendar(); return; }
    const calendar = window.appCalendar;
    calendar.getEventSources().forEach(source => source.remove());
    calendar.addEventSource(buildCalendarEvents());
    calendar.render(); // re-evaluates the day-cell hooks
    scheduleDecorate();
}

function updateCalendarTexts() {
    const calendar = window.appCalendar;
    if (!calendar) return;
    calendar.setOption('locale', currentLang);
    Object.entries(calendarTextOptions()).forEach(([key, value]) => calendar.setOption(key, value));
    scheduleDecorate();
}

// Icon + time range. Narrow cells show the short form ("9–12") instead of "09:00–12:00"
function markChipHtml(mark) {
    const busy = mark.type === MARK_BUSY;
    return `<span class="mark-chip${busy ? ' mark-busy' : ' mark-free'}" title="${esc(markText(mark))}">${busy ? ICON_CROSS : ICON_CHECK}` +
        `<span class="mark-range-long">${esc(mark.startTime)}–${esc(mark.endTime)}</span>` +
        `<span class="mark-range-short">${esc(compactTime(mark.startTime))}–${esc(compactTime(mark.endTime))}</span>` +
        `</span>`;
}

function renderEventContent(arg) {
    const props = arg.event.extendedProps;
    if (props.kind === 'mark') {
        return { html: `<div class="fc-event-wrap">${markChipHtml(props.mark)}</div>` };
    }

    const isRecurring = arg.event.classNames.includes('fc-event-recurring');
    const time = props.isMulti ? null : noteTime(props.note);
    const count = props.isMulti ? props.count : (props.note.confirmedProfileNames || []).length;
    const longLabel = getT(props.isMulti ? 'js.events' : 'js.participants');
    const shortLabel = getT(props.isMulti ? 'cal.eventsShort' : 'cal.participantsShort');
    return {
        html: `<div class="fc-event-wrap">
            <span class="fc-event-badge${isRecurring ? ' fc-event-recurring' : ''}${time ? ' has-time' : ''}" title="${time ? `${esc(time)} · ` : ''}${count} ${esc(longLabel)}">
                ${isRecurring ? '<span class="rec-glyph" aria-hidden="true">&#x21bb;</span> ' : ''}
                ${time ? `<strong class="badge-time">${esc(time)}</strong><span class="badge-sep"> · </span>` : ''}<span class="badge-count">${count}</span> <span class="badge-text">${esc(shortLabel)}</span>
            </span>
        </div>`
    };
}

// --- Cell decorations ---
function dayCellClasses(info) {
    const date = toLocalIsoStr(info.date);
    const classes = [];
    const allDay = myAllDayType(date);

    if (allDay === MARK_BUSY) classes.push('day-busy');
    else if (allDay === MARK_FREE) classes.push('day-free');
    else if (window._avail.eventDates.has(date)) classes.push('day-has-events');

    if (isAllFree(date)) classes.push('day-all-free');
    return classes;
}

// --- The group availability bar ---
// A thin line for the whole day under the cell: green where everyone is free, red where someone
// is busy, grey where not everyone has marked. It lives in an element of our own: FullCalendar
// owns the style attribute of its day cells and rewrites it on every re-render.
function mountCellBar(cell) {
    const bar = document.createElement('span');
    bar.className = 'avail-bar';
    bar.setAttribute('aria-hidden', 'true');
    (cell.querySelector('.fc-daygrid-day-frame') || cell).appendChild(bar);
    cell.__availBar = bar;
    applyCellBar(cell);
}

function applyCellBar(cell) {
    const bar = cell.__availBar && cell.__availBar.isConnected ? cell.__availBar : null;
    if (!bar) return;

    const day = window._avail.days.get(cell.dataset.date);
    if (!day) {
        bar.hidden = true;
        return;
    }
    bar.hidden = false;
    bar.style.background = segmentsGradient(day.timeline);
}

// Paints the bars right away and once more on the next frame: requestAnimationFrame is paused
// while the tab is hidden, and a hidden tab that just received new data must not keep stale bars
function scheduleDecorate() {
    decorateCells();
    requestAnimationFrame(decorateCells);
}

function decorateCells() {
    if (!window.appCalendar) return;
    document.querySelectorAll('#calendar .fc-daygrid-day[data-date]').forEach(applyCellBar);
    syncToolbarTexts();
}

// ============================================================
// Tools: what a click on the calendar does
// ============================================================
const TOOLS = ['view', 'free', 'busy'];
const TOOL_BUTTON = { view: 'toolView', free: 'toolFree', busy: 'toolBusy' };
const TOOL_TYPE = { free: MARK_FREE, busy: MARK_BUSY };

function setTool(tool) {
    if (!TOOLS.includes(tool)) return;
    currentTool = tool;
    updateToolUi();
}

function updateToolUi() {
    const calendar = window.appCalendar;
    if (calendar) {
        calendar.setOption('selectable', currentTool !== 'view');
        if (currentTool === 'view') calendar.unselect();
        scheduleDecorate();
    }

    const calendarEl = el('calendar');
    calendarEl.classList.toggle('tool-free', currentTool === 'free');
    calendarEl.classList.toggle('tool-busy', currentTool === 'busy');

    TOOLS.forEach(tool => {
        const button = el(TOOL_BUTTON[tool]);
        const active = tool === currentTool;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });

    updateHint();
}

function updateHint() {
    const hint = el('toolHint');
    hint.classList.remove('hint-free', 'hint-busy');

    if (currentTool !== 'view') {
        const isFree = currentTool === 'free';
        hint.classList.add(isFree ? 'hint-free' : 'hint-busy');
        el('toolHintIcon').innerHTML = isFree ? ICON_CHECK : ICON_CROSS;
        el('toolHintText').innerText = getT(isFree ? 'hint.brushFree' : 'hint.brushBusy');
        el('toolDoneBtn').classList.remove('hidden');
        el('brushRange').classList.remove('hidden');
        hint.classList.remove('hidden');
        return;
    }

    // In the view mode the hint only teaches the basics until the group has some content
    const isEmpty = !!window.currentGroupId && !window.currentNotes.length && !window.currentMarks.length;
    el('toolHintIcon').innerHTML = ICON_EYE;
    el('toolHintText').innerText = getT('hint.viewEmpty');
    el('toolDoneBtn').classList.add('hidden');
    el('brushRange').classList.add('hidden');
    hint.classList.toggle('hidden', !isEmpty);
}

// --- What a mark covers: the whole day or a time interval ---
// The brush and the day panel each have their own "whole day / from – to" controls
// (inputs named <scope>AllDay, <scope>Start, <scope>End with scope "brush" or "panel").
const DEFAULT_RANGE = { allDay: true, start: '09:00', end: '18:00' };

function loadBrushRange() {
    try {
        const saved = JSON.parse(localStorage.getItem('askdate_brush_range') || 'null');
        if (saved && typeof saved.start === 'string' && typeof saved.end === 'string') {
            return { allDay: saved.allDay !== false, start: saved.start, end: saved.end };
        }
    } catch (e) {
        // a corrupt stored value just falls back to the default
    }
    return { ...DEFAULT_RANGE };
}

// The brush remembers its interval between visits; the panel starts over with each session
const RANGES = { brush: loadBrushRange(), panel: { ...DEFAULT_RANGE } };

// --- Time controls ---
// Hours and minutes are two selects named <prefix>Hour and <prefix>Minute. Native time inputs were
// not kept: they follow the browser locale (AM/PM) and lose the day period on narrow screens.
const TIME_MINUTE_STEP = 5;

function fillTimeSelects() {
    const pad = value => String(value).padStart(2, '0');
    document.querySelectorAll('select.time-hour').forEach(select => {
        const hours = Array.from({ length: 24 }, (_, hour) => `<option value="${pad(hour)}">${pad(hour)}</option>`).join('');
        select.innerHTML = select.dataset.optional ? `<option value="">—</option>${hours}` : hours;
    });
    document.querySelectorAll('select.time-minute').forEach(select => {
        select.innerHTML = Array.from({ length: 60 / TIME_MINUTE_STEP }, (_, index) => {
            const minute = pad(index * TIME_MINUTE_STEP);
            return `<option value="${minute}">${minute}</option>`;
        }).join('');
    });
}

// "HH:MM", or '' when the hour is not chosen
function readTime(prefix) {
    const hour = el(`${prefix}Hour`).value;
    return hour ? `${hour}:${el(`${prefix}Minute`).value || '00'}` : '';
}

function writeTime(prefix, value) {
    const [hour, minute] = value ? value.split(':') : ['', '00'];
    const minutes = el(`${prefix}Minute`);
    // a stored value may lie between the steps of the list
    if (!Array.from(minutes.options).some(option => option.value === minute)) minutes.add(new Option(minute, minute));
    el(`${prefix}Hour`).value = hour;
    minutes.value = minute;
    minutes.disabled = !hour || el(`${prefix}Hour`).disabled;
}

function setTimeDisabled(prefix, disabled) {
    el(`${prefix}Hour`).disabled = disabled;
    el(`${prefix}Minute`).disabled = disabled || !el(`${prefix}Hour`).value;
}

function writeRangeForm(scope) {
    const range = RANGES[scope];
    el(`${scope}AllDay`).checked = range.allDay;
    writeTime(`${scope}Start`, range.start);
    writeTime(`${scope}End`, range.end);
    setTimeDisabled(`${scope}Start`, range.allDay);
    setTimeDisabled(`${scope}End`, range.allDay);
}

function onRangeAllDayChange(scope) {
    RANGES[scope].allDay = el(`${scope}AllDay`).checked;
    if (scope === 'brush') localStorage.setItem('askdate_brush_range', JSON.stringify(RANGES.brush));
    writeRangeForm(scope);
    if (!RANGES[scope].allDay) el(`${scope}StartHour`).focus();
}

function onRangeTimeChange(scope) {
    RANGES[scope].start = readTime(`${scope}Start`) || DEFAULT_RANGE.start;
    RANGES[scope].end = readTime(`${scope}End`) || DEFAULT_RANGE.end;
    if (scope === 'brush') localStorage.setItem('askdate_brush_range', JSON.stringify(RANGES.brush));
}

// The range as filled in, or null after telling what is wrong with it
function validRange(scope) {
    const range = RANGES[scope];
    if (range.allDay) return range;

    if (!readTime(`${scope}Start`) || !readTime(`${scope}End`)) {
        showToast(getT('toast.timeRequired'), 'error');
        return null;
    }
    if (toMinutes(range.end) <= toMinutes(range.start)) {
        showToast(getT('toast.timeOrder'), 'error');
        return null;
    }
    return range;
}

fillTimeSelects();
writeRangeForm('brush');
writeRangeForm('panel');

// --- Painting with a brush ---
// FullCalendar reports a mouse click twice (select + dateClick) and a touch tap once (dateClick only).
// Remembering the last painted range for a moment makes every gesture count exactly once.
let lastPaint = { key: '', at: 0 };

function onCalendarSelect(info) {
    if (currentTool !== 'view') paintRange(info.startStr.slice(0, 10), info.endStr.slice(0, 10));
}

function onCalendarDateClick(info) {
    if (currentTool !== 'view') {
        paintRange(info.dateStr, addDaysIso(info.dateStr, 1));
    } else {
        openDayPanel(info.dateStr);
    }
}

function onCalendarEventClick(info) {
    const props = info.event.extendedProps;
    const note = props.kind === 'mark' ? null : props.note; // a chip of mine opens its day as well
    openDayPanel(info.event.startStr.slice(0, 10), note ? note.id : null);
}

function paintRange(startStr, endStr) {
    const key = `${currentTool}:${startStr}:${endStr}`;
    const now = Date.now();
    if (lastPaint.key === key && now - lastPaint.at < 500) return; // the same gesture reported twice
    lastPaint = { key, at: now };

    const type = TOOL_TYPE[currentTool];
    if (!type) return;

    const range = validRange('brush');
    if (!range) {
        if (window.appCalendar) window.appCalendar.unselect();
        return;
    }

    const count = dayCount(startStr, endStr);
    if (count === 1) {
        // A click on a day that already carries exactly this mark removes it; drags always set the range
        const existing = myMarksOn(startStr).find(mark => mark.id > 0 && isSameSpan(mark, type, range));
        if (existing) {
            removeMyMarks([existing.id]);
            if (window.appCalendar) window.appCalendar.unselect();
            return;
        }
    }

    setMyMarks(Array.from({ length: count }, (_, i) => addDaysIso(startStr, i)), type, range);
    if (window.appCalendar) window.appCalendar.unselect();
}

// ============================================================
// Day panel
// ============================================================
function isMe(member) {
    return String(member.profileId) === String(window.profileId);
}

function notesForDay(dateStr) {
    return window.currentNotes.filter(note => note.date.slice(0, 10) === dateStr);
}

// Days the arrows step through
function datesWithEvents() {
    return [...new Set(window.currentNotes.map(note => note.date.slice(0, 10)))].sort();
}

function navigateDay(direction) {
    const dates = datesWithEvents();
    const index = dates.indexOf(window._currentDayDateStr);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= dates.length) return;
    openDayPanel(dates[target]);
}

function updateDayNavButtons() {
    const dates = datesWithEvents();
    const index = dates.indexOf(window._currentDayDateStr);
    el('dayNavPrev').style.visibility = index > 0 ? 'visible' : 'hidden';
    el('dayNavNext').style.visibility = (index >= 0 && index < dates.length - 1) ? 'visible' : 'hidden';
}

function closeDayPanel() {
    el('dayPanel').classList.add('hidden');
}

function isEditingTitle() {
    const editor = el('noteTitleEdit');
    return !!editor && !editor.classList.contains('hidden');
}

function isEditingComment() {
    return !!document.querySelector('[id^="commentEdit_"]:not(.hidden)');
}

// Re-renders the open panel after data changes, keeping the selected event
function refreshOpenDayPanel() {
    if (el('dayPanel').classList.contains('hidden') || !window._currentDayDateStr) return;
    if (isEditingTitle() || isEditingComment()) return; // never discard text that is being typed
    openDayPanel(window._currentDayDateStr, window.selectedNote ? window.selectedNote.id : null);
}

function openDayPanel(dateStr, noteId = null) {
    const dayNotes = notesForDay(dateStr).sort((a, b) => a.date.localeCompare(b.date));
    if (window._panelDate !== dateStr) {
        window._panelDate = dateStr;
        cancelMarkEdit(); // an edit never carries over to another day
    }
    window._currentDayDateStr = dateStr;

    el('dayPanel').classList.remove('hidden');
    el('dayTitle').innerText = formatDateHuman(dateStr, { weekday: 'long', day: 'numeric', month: 'long' });
    el('dayAddNoteBtn').innerText = getT('day.createEvent');

    const list = el('dayEventsList');
    list.innerHTML = '';
    if (!dayNotes.length) {
        list.innerHTML = `<li class="day-event-empty">${esc(getT('day.noEvents'))}</li>`;
    }
    dayNotes.forEach(note => {
        const time = noteTime(note);
        const isRecurring = (note.recurrenceType && note.recurrenceType !== 'none') || note.parentNoteId || note.isVirtual;
        const label = note.title || `${(note.confirmedProfileNames || []).length} ${getT('js.participants')}`;

        const li = document.createElement('li');
        li.className = 'list-item day-event-item';
        li.dataset.noteId = note.id;
        li.setAttribute('role', 'button');
        li.tabIndex = 0;
        li.innerHTML = `<span class="day-event-label">${time ? `<span class="time-chip">${esc(time)}</span> ` : ''}${esc(label)}${isRecurring ? ' <span class="rec-glyph" aria-hidden="true">&#x21bb;</span>' : ''}</span>`;
        li.onclick = () => selectNoteInPanel(note.id);
        li.onkeydown = event => { if (event.key === 'Enter') selectNoteInPanel(note.id); };
        list.appendChild(li);
    });

    // The requested event when it exists on this day, otherwise the first one
    window.selectedNote = (noteId != null && dayNotes.find(note => note.id === noteId)) || dayNotes[0] || null;
    el('dayPanel').classList.toggle('is-empty', !dayNotes.length);

    renderDayAvailability(dateStr);
    renderNoteDetail(window.selectedNote);
    highlightSelectedEvent();
    updateDayNavButtons();
}

function highlightSelectedEvent() {
    document.querySelectorAll('.day-event-item').forEach(li =>
        li.classList.toggle('day-event-item-active', !!window.selectedNote && li.dataset.noteId == String(window.selectedNote.id)));
}

function selectNoteInPanel(noteId) {
    const note = window.currentNotes.find(n => n.id === noteId);
    if (!note) return;
    window.selectedNote = note;
    renderNoteDetail(note);
    highlightSelectedEvent();
}

// ============================================================
// Day-level block: my marks for this day and everyone's availability
// ============================================================
// The form above the lists is static HTML: it holds what is about to be added
// (a whole day or an interval, see RANGES in the tools section).
// The id of my mark that is being edited through the form, or null
let editingMarkId = null;

function renderDayAvailability(dateStr) {
    renderMyMarks(dateStr);
    renderGroupAvailability(dateStr);
}

// "Свободен" / "Занят" in the form: add a mark for the filled-in span, or replace the edited one
function addMarkFromPanel(type) {
    const dateStr = window._currentDayDateStr;
    if (!dateStr) return;

    const range = validRange('panel');
    if (!range) return;

    const editing = editingMarkId;
    cancelMarkEdit();

    const current = editing != null ? myMarksOn(dateStr).find(mark => mark.id === editing) : null;
    if (current && isSameSpan(current, type, range)) return; // saved unchanged

    setMyMarks([dateStr], type, range, current ? [current.id] : null);
}

// Loads one of my marks of this day into the form
function editMyMark(markId) {
    const mark = markId > 0 ? myMarksOn(window._currentDayDateStr).find(item => item.id === markId) : null;
    if (!mark) return; // a provisional mark has nothing stored to edit yet

    RANGES.panel = isAllDayMark(mark)
        ? { allDay: true, start: RANGES.panel.start, end: RANGES.panel.end }
        : { allDay: false, start: mark.startTime, end: mark.endTime };
    editingMarkId = markId;
    writeRangeForm('panel');
    el('panelEditing').classList.remove('hidden');
    document.querySelectorAll('#dayMyMarks .my-mark').forEach(row =>
        row.classList.toggle('my-mark-editing', Number(row.dataset.markId) === markId));
}

function cancelMarkEdit() {
    if (editingMarkId === null) return;
    editingMarkId = null;
    el('panelEditing').classList.add('hidden');
    document.querySelectorAll('#dayMyMarks .my-mark-editing').forEach(row => row.classList.remove('my-mark-editing'));
}

function removeMyMark(markId) {
    if (!(markId > 0)) return; // a provisional mark is not on the server yet
    if (editingMarkId === markId) cancelMarkEdit();
    removeMyMarks([markId]);
}

function renderMyMarks(dateStr) {
    const mine = myMarksOn(dateStr).slice().sort((a, b) => markRange(a)[0] - markRange(b)[0]); // whole day first
    if (editingMarkId !== null && !mine.some(mark => mark.id === editingMarkId)) cancelMarkEdit(); // changed elsewhere meanwhile

    el('dayMyMarks').innerHTML = mine.length
        ? mine.map(mark => `
            <div class="my-mark${mark.id === editingMarkId ? ' my-mark-editing' : ''}${isProvisional(mark) ? ' is-pending' : ''}" data-mark-id="${mark.id}">
                <span class="mark-chip${mark.type === MARK_BUSY ? ' mark-busy' : ' mark-free'}" aria-hidden="true">${mark.type === MARK_BUSY ? ICON_CROSS : ICON_CHECK}</span>
                <span class="my-mark-text">${esc(markText(mark))}</span>
                ${isProvisional(mark) ? '' : `<span class="my-mark-tools">
                    <button type="button" class="btn-link muted" onclick="editMyMark(${mark.id})">${esc(getT('day.editMark'))}</button>
                    <button type="button" class="btn-link" onclick="removeMyMark(${mark.id})">${esc(getT('day.removeMark'))}</button>
                </span>`}
            </div>`).join('')
        // "no marks" is only worth a line of its own when others have marked the day; a day without
        // any marks is already described by the group block below
        : (window._avail.days.has(dateStr) ? `<div class="avail-empty">${esc(getT('day.myMarksEmpty'))}</div>` : '');
}

// The common free windows, and one line per member with a bar across the day
function renderGroupAvailability(dateStr) {
    const day = window._avail.days.get(dateStr);
    if (!day) {
        el('dayGroupAvail').innerHTML = `<div class="avail-empty">${esc(getT('day.nobodyMarked'))}</div>`;
        return;
    }

    const head = day.commonFree.length
        ? `<div class="avail-common">${ICON_CHECK}<span>${esc(commonFreeText(day))}</span></div>`
        : (day.explicitFree ? `<div class="avail-empty">${esc(getT('day.noCommonFree'))}</div>` : '');

    const rows = currentParticipants().map(member => {
        const segments = day.byMember.get(String(member.profileId)) || [];
        return `
            <div class="member-row${isMe(member) ? ' is-me' : ''}">
                <span class="member-name">${avatarHtml(member.profileName, member.profileId, true)}<span class="participant-name">${esc(member.profileName)}${isMe(member) ? ` <span class="muted">(${esc(getT('js.you'))})</span>` : ''}</span></span>
                <span class="member-bar" style="background:${segmentsGradient(segments)}" aria-hidden="true"></span>
                <span class="member-summary">${esc(memberSummaryText(segments))}</span>
            </div>`;
    }).join('');

    el('dayGroupAvail').innerHTML = head + `<div class="member-rows">${rows}</div>`;
}

// ============================================================
// Event detail
// ============================================================
// Who is busy at the time of an event — or on its day when the event has no time.
// Shown only when the day carries any marks: otherwise there is nothing to compare with.
function eventAvailabilityHtml(dateStr, time) {
    if (!window._avail.days.has(dateStr)) return '';

    const minute = time ? toMinutes(time) : null;
    const busy = [];
    const unknown = [];
    currentParticipants().forEach(member => {
        if (minute !== null) {
            const state = memberStateAt(dateStr, member, minute);
            if (state === T_BUSY) busy.push(member);
            else if (state === T_UNKNOWN) unknown.push(member);
        } else {
            const segments = window._avail.days.get(dateStr).byMember.get(String(member.profileId)) || [];
            if (segments.some(segment => segment.state === T_BUSY)) busy.push(member);
        }
    });

    const names = members => members.map(member => member.profileName).join(', ');
    const othersBusy = busy.filter(member => !isMe(member));
    let html = '';

    if (busy.some(isMe)) {
        html += `<div class="avail-warning">${ICON_CROSS}<span>${esc(getT(time ? 'day.busyWarning' : 'day.busyWarningDay'))}</span></div>`;
    }
    if (othersBusy.length) {
        html += `<div class="event-avail is-busy">${ICON_CROSS}<span>${esc(tF(time ? 'day.atTimeBusy' : 'day.thatDayBusy', { time, names: names(othersBusy) }))}</span></div>`;
    } else if (minute !== null && unknown.length) {
        html += `<div class="event-avail"><span>${esc(tF('day.atTimeUnknown', { time, names: names(unknown) }))}</span></div>`;
    }
    return html;
}

function isSeriesJoined(note) {
    const parentId = note.parentNoteId || note.id;
    const parentNote = window.currentNotes.find(n => n.id === parentId);
    return ((parentNote || note).confirmedProfileIds || []).includes(Number(window.profileId));
}

function renderNoteDetail(note) {
    el('dayEmpty').classList.toggle('hidden', !!note);
    el('dayEventSection').classList.toggle('hidden', !note);
    el('recurrenceIndicator').classList.add('hidden');
    el('dayActions').innerHTML = '';
    el('dayParticipantsList').innerHTML = '';
    el('dayCommentsList').innerHTML = '';
    if (!note) return;

    const profileId = Number(window.profileId);
    const isCreator = String(note.creatorProfileId) === String(window.profileId);
    const isGroupCreator = String(window.profileId) === String(window.currentGroupCreatorId);
    const canEdit = isCreator || isGroupCreator;
    const isStandalone = !note.isVirtual && !note.parentNoteId;
    const participantCount = (note.confirmedProfileNames || []).length;

    if (getRecurrenceDescription(note) || note.isVirtual || note.parentNoteId) {
        const parentId = note.parentNoteId || note.id;
        const parentNote = window.currentNotes.find(n => n.id === parentId);
        const canDeleteSeries = isGroupCreator || (parentNote && String(parentNote.creatorProfileId) === String(window.profileId));
        const joined = isSeriesJoined(note);

        el('recurrenceIndicatorText').innerText = getRecurrenceDescription(note) || getT('js.recurrenceInfo');
        el('recurrenceActions').innerHTML =
            (canDeleteSeries ? `<button type="button" class="btn btn-danger btn-small" onclick="deleteNoteSeries()">${esc(getT('js.deleteSeries'))}</button>` : '') +
            `<button type="button" class="btn btn-outline btn-small" onclick="toggleConfirmSeries(${parentId}, ${joined})">${esc(getT(joined ? 'js.leaveSeries' : 'js.confirmSeries'))}</button>`;
        el('recurrenceIndicator').classList.remove('hidden');
    }

    const heading = note.title || `${participantCount} ${getT('js.participants')}`;
    const titleHtml = canEdit
        ? `<button type="button" id="noteTitleDisplay" class="note-title-display${note.title ? '' : ' is-placeholder'}" title="${esc(getT('js.editTitle'))}" onclick="startEditNoteTitle()">${note.title ? esc(note.title) : esc(getT('js.addTitle'))}</button>
           <div id="noteTitleEdit" class="hidden note-title-edit">
               <input type="text" id="noteTitleInput" aria-label="${esc(getT('js.titlePlaceholder'))}" placeholder="${esc(getT('js.titlePlaceholder'))}" value="${esc(note.title || '')}" onkeydown="if (event.key === 'Enter') saveNoteTitle(); else if (event.key === 'Escape') cancelEditNoteTitle()">
               <button type="button" class="btn btn-small" onclick="saveNoteTitle()">${esc(getT('js.saveTitle'))}</button>
               <button type="button" class="btn btn-outline btn-small" onclick="cancelEditNoteTitle()">${esc(getT('js.cancel'))}</button>
           </div>`
        : `<span class="note-title-display">${esc(heading)}</span>`;

    el('dayActions').innerHTML = `
        <div class="note-title-area">${titleHtml}</div>
        ${eventAvailabilityHtml(window._currentDayDateStr, noteTime(note))}
        <div class="flex-row mb-var">
            <button type="button" class="btn btn-outline btn-small" onclick="toggleConfirmNote(${note.id}, ${(note.confirmedProfileIds || []).includes(profileId)})">
                ${esc((note.confirmedProfileIds || []).includes(profileId) ? getT('js.convenient') : getT('js.markConvenient'))}
            </button>
            ${isStandalone && canEdit ? `<button type="button" class="btn btn-danger btn-small" onclick="deleteNote(${note.id})">${esc(getT('js.deleteNote'))}</button>` : ''}
        </div>`;

    const list = el('dayParticipantsList');
    if (!participantCount) {
        list.innerHTML = `<li class="list-item text-small" style="padding: 8px;">${esc(getT('js.noParticipants'))}</li>`;
    } else {
        note.confirmedProfileNames.forEach((name, index) => {
            const memberId = (note.confirmedProfileIds || [])[index];
            const li = document.createElement('li');
            li.className = 'list-item participant-item';
            li.style.padding = '8px';
            li.innerHTML = `<span class="participant-row">${avatarHtml(name, memberId)}<span class="participant-name">${esc(name)}</span>${isMe({ profileId: memberId }) ? `<span class="text-small" style="opacity:0.6;">(${esc(getT('js.you'))})</span>` : ''}</span>`;
            list.appendChild(li);
        });
    }

    fetchComments(note.id);
}

// --- Event actions ---
async function toggleConfirmNote(id, isConfirmed) {
    if (!window.currentGroupId) return;
    const ok = await apiCall(`/groups/${window.currentGroupId}/notes/${id}/confirm`, isConfirmed ? 'DELETE' : 'POST');
    if (ok === false) return;
    await fetchNotes();
}

async function toggleConfirmSeries(parentId, isLeaving) {
    const message = getT(isLeaving ? 'js.leaveSeriesConfirm' : 'js.confirmSeriesConfirm');
    if (!await appConfirm(message)) return;

    const ok = await apiCall(`/groups/${window.currentGroupId}/notes/${parentId}/confirm/series`, isLeaving ? 'DELETE' : 'POST');
    if (ok === false) return;
    await fetchNotes();
}

async function deleteNote(id) {
    if (id < 0) return appAlert(getT('js.virtualDelete')); // a virtual repeat: delete the series instead
    if (!await appConfirm(getT('js.deleteNoteConfirm'))) return;

    const ok = await apiCall(`/groups/${window.currentGroupId}/notes/${id}`, 'DELETE');
    if (ok === false) return;
    await fetchNotes();
}

async function deleteNoteSeries() {
    const note = window.selectedNote;
    if (!note) return;
    const parentId = note.parentNoteId || note.id;
    if (!await appConfirm(getT('js.deleteSeriesConfirm'))) return;

    const ok = await apiCall(`/groups/${window.currentGroupId}/notes/${parentId}/series`, 'DELETE');
    if (ok === false) return;
    await fetchNotes();
}

// --- Title editing (creator and group creator only) ---
function startEditNoteTitle() {
    el('noteTitleDisplay').classList.add('hidden');
    el('noteTitleEdit').classList.remove('hidden');
    const input = el('noteTitleInput');
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
}

function cancelEditNoteTitle() {
    el('noteTitleEdit').classList.add('hidden');
    el('noteTitleDisplay').classList.remove('hidden');
}

async function saveNoteTitle() {
    if (!window.selectedNote || !window.currentGroupId) return;
    const title = el('noteTitleInput').value.trim();

    const ok = await apiCall(`/groups/${window.currentGroupId}/notes/${window.selectedNote.id}/title`, 'PUT', { title: title || null });
    if (ok === false) return;

    cancelEditNoteTitle(); // refreshOpenDayPanel skips re-rendering while the editor is open
    await fetchNotes();
}

// ============================================================
// Creating events
// ============================================================
function resetRecurrenceForm() {
    el('recNoteTitle').value = '';
    writeTime('recNoteTime', '');
    el('recType').value = 'none';
    el('recInterval').value = '1';
    el('recEndDate').value = '';
    el('recEndCount').value = '4';
    el('recEndType').value = 'never';
    document.querySelectorAll('.rec-day-cb').forEach(cb => { cb.checked = false; });
    onRecurrenceTypeChange();
    onRecurrenceEndTypeChange();
}

function onRecurrenceTypeChange() {
    const type = el('recType').value;
    el('recIntervalGroup').classList.toggle('hidden', type === 'none');
    el('recDaysGroup').classList.toggle('hidden', type !== 'weekly');
    el('recEndGroup').classList.toggle('hidden', type === 'none');
}

// minutes only matter once an hour is chosen
function onEventTimeChange() {
    el('recNoteTimeMinute').disabled = !el('recNoteTimeHour').value;
}

function onRecurrenceEndTypeChange() {
    const endType = el('recEndType').value;
    el('recEndDateGroup').classList.toggle('hidden', endType !== 'date');
    el('recEndCountGroup').classList.toggle('hidden', endType !== 'count');
}

function createNoteForDate(dateStr) {
    if (!window.currentGroupId || !dateStr) return;

    window.pendingNoteDate = dateStr;
    resetRecurrenceForm();

    // Pre-select the weekday of the clicked day for weekly repeats
    const isoDay = new Date(dateStr + 'T00:00:00Z').getUTCDay() || 7;
    el('recDay' + isoDay).checked = true;

    openModal('recurrenceModal');
}

async function applyRecurrenceAndCreate() {
    if (!window.currentGroupId || !window.pendingNoteDate) return;

    const dateStr = window.pendingNoteDate;
    const time = readTime('recNoteTime'); // "HH:MM" or ""
    // The time is a wall-clock time: it is stored as-is and shown as-is to everyone
    const body = { date: `${dateStr}T${time ? `${time}:00` : '00:00:00'}Z` };

    const title = el('recNoteTitle').value.trim();
    if (title) body.title = title;

    const recurrenceType = el('recType').value;
    if (recurrenceType !== 'none') {
        body.recurrenceType = recurrenceType;
        body.recurrenceInterval = parseInt(el('recInterval').value, 10) || 1;

        if (recurrenceType === 'weekly') {
            let days = Array.from(document.querySelectorAll('.rec-day-cb:checked'), cb => cb.value);
            if (!days.length) days = [String(new Date(dateStr + 'T00:00:00Z').getUTCDay() || 7)];
            body.recurrenceDaysOfWeek = days.join(',');
        }

        const endType = el('recEndType').value;
        if (endType === 'date') {
            const endDate = el('recEndDate').value;
            if (!endDate) return appAlert(getT('rec.endDateRequired'));
            body.recurrenceEndDate = `${endDate}T23:59:59Z`;
        } else if (endType === 'count') {
            body.recurrenceCount = parseInt(el('recEndCount').value, 10) || 4;
        }
    }

    const ok = await apiCall(`/groups/${window.currentGroupId}/notes`, 'POST', body);
    if (ok === false) return;

    closeAllModals();
    await fetchNotes();
    openDayPanel(dateStr, ok.id);
}

function getRecurrenceDescription(note) {
    if (!note) return null;

    // Virtual and materialized repeats borrow the description of their series
    if (note.isVirtual || (note.parentNoteId && (!note.recurrenceType || note.recurrenceType === 'none'))) {
        const parent = window.currentNotes.find(n => n.id === note.parentNoteId);
        return parent ? getRecurrenceDescription(parent) : null;
    }
    if (!note.recurrenceType || note.recurrenceType === 'none') return null;

    const interval = note.recurrenceInterval || 1;
    let description = '';

    if (note.recurrenceType === 'daily') {
        description = interval === 1 ? getT('js.recDaily') : `${getT('js.recEvery')} ${interval} ${getT('js.recDays')}`;
    } else if (note.recurrenceType === 'weekly') {
        description = interval === 1 ? getT('js.recWeekly') : `${getT('js.recEvery')} ${interval} ${getT('js.recWeeks')}`;
        const dayKeys = ['', 'rec.dayMon', 'rec.dayTue', 'rec.dayWed', 'rec.dayThu', 'rec.dayFri', 'rec.daySat', 'rec.daySun'];
        const names = String(note.recurrenceDaysOfWeek || '').split(',').map(d => dayKeys[parseInt(d, 10)]).filter(Boolean).map(getT);
        if (names.length) description += ` (${names.join(', ')})`;
    } else if (note.recurrenceType === 'monthly') {
        description = interval === 1 ? getT('js.recMonthly') : `${getT('js.recEvery')} ${interval} ${getT('js.recMonths')}`;
    }

    if (note.recurrenceEndDate) description += `, ${getT('js.recUntil')} ${note.recurrenceEndDate.slice(0, 10)}`;
    else if (note.recurrenceCount) description += `, ${note.recurrenceCount} ${getT('js.recTimes')}`;

    return description;
}

// ============================================================
// Comments
// ============================================================
async function fetchComments(noteId, force = false) {
    if (!force && commentsCache.has(noteId)) {
        renderComments(noteId, commentsCache.get(noteId));
        return;
    }
    const comments = await apiCall(`/notes/${noteId}/comments`, 'GET', null, { silent: true });
    if (!Array.isArray(comments)) return;

    commentsCache.set(noteId, comments);
    if (window.selectedNote && window.selectedNote.id === noteId) renderComments(noteId, comments);
}

function renderComments(noteId, comments) {
    if (!window.selectedNote || window.selectedNote.id !== noteId) return; // another event is open now
    const container = el('dayCommentsList');
    container.innerHTML = '';

    if (!comments.length) {
        container.innerHTML = `<div class="comments-empty">${esc(getT('js.noComments'))}</div>`;
        return;
    }

    comments.forEach(comment => {
        const isAuthor = String(comment.authorProfileId) === String(window.profileId);
        const canDelete = isAuthor || String(window.profileId) === String(window.currentGroupCreatorId);
        const edited = comment.lastModified && (new Date(comment.lastModified) - new Date(comment.created) > 10000);
        const created = formatDateTime(comment.created);

        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `
            <div id="commentView_${comment.id}" class="comment-view">
                <div class="comment-head">
                    <div class="comment-author">
                        ${avatarHtml(comment.authorName, comment.authorProfileId, true)}
                        <span class="comment-author-name">${esc(comment.authorName)}</span>
                        <span class="comment-date">${esc(created)}${edited ? ` ${esc(getT('js.edited'))}` : ''}</span>
                    </div>
                    <div class="comment-tools">
                        ${isAuthor ? `<button type="button" class="btn-link muted" onclick="startEditComment(${comment.id})">${esc(getT('js.edit'))}</button>` : ''}
                        ${canDelete ? `<button type="button" class="btn-link" onclick="deleteComment(${noteId}, ${comment.id})">${esc(getT('js.remove'))}</button>` : ''}
                    </div>
                </div>
                <div class="comment-text">${esc(comment.content)}</div>
            </div>
            <div id="commentEdit_${comment.id}" class="hidden comment-edit">
                <input type="text" id="editInput_${comment.id}" aria-label="${esc(getT('js.edit'))}" value="${esc(comment.content)}"
                       onkeydown="if (event.key === 'Enter') saveComment(${noteId}, ${comment.id}); else if (event.key === 'Escape') cancelEditComment(${comment.id})">
                <div class="flex-row">
                    <button type="button" class="btn btn-small" onclick="saveComment(${noteId}, ${comment.id})">${esc(getT('js.save'))}</button>
                    <button type="button" class="btn btn-outline btn-small" onclick="cancelEditComment(${comment.id})">${esc(getT('js.cancel'))}</button>
                </div>
            </div>`;
        container.appendChild(div);
    });
}

function startEditComment(id) {
    el(`commentView_${id}`).classList.add('hidden');
    el(`commentEdit_${id}`).classList.remove('hidden');
    const input = el(`editInput_${id}`);
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
}

function cancelEditComment(id) {
    el(`commentEdit_${id}`).classList.add('hidden');
    el(`commentView_${id}`).classList.remove('hidden');
}

async function saveComment(noteId, id) {
    const content = el(`editInput_${id}`).value.trim();
    if (!content) return;
    const ok = await apiCall(`/notes/${noteId}/comments/${id}`, 'PUT', { content });
    if (ok === false) return;
    commentsCache.delete(noteId);
    await fetchComments(noteId, true);
}

async function addCommentToCurrentDay() {
    if (!window.selectedNote) return;
    const noteId = window.selectedNote.id;
    const input = el('newCommentText');
    const content = input.value.trim();
    if (!content) return;

    const ok = await apiCall(`/notes/${noteId}/comments`, 'POST', { content });
    if (ok === false) return;

    input.value = '';
    commentsCache.delete(noteId);
    await fetchComments(noteId, true);
}

async function deleteComment(noteId, commentId) {
    if (!await appConfirm(getT('js.deleteCommentConfirm'))) return;
    const ok = await apiCall(`/notes/${noteId}/comments/${commentId}`, 'DELETE');
    if (ok === false) return;
    commentsCache.delete(noteId);
    await fetchComments(noteId, true);
}

// ============================================================
// Copy day as text
// ============================================================
async function copyDaySummary() {
    const dateStr = window._currentDayDateStr;
    if (!dateStr) return;

    const lines = [formatDateHuman(dateStr, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })];

    // my own marks read in the first person
    const mine = myMarksOn(dateStr).slice().sort((a, b) => markRange(a)[0] - markRange(b)[0]);
    lines.push(`${getT('day.myAvailability')}: ${mine.length ? mine.map(markText).join(', ') : getT('day.noMarks')}`);

    const day = window._avail.days.get(dateStr);
    if (day) {
        const common = commonFreeText(day);
        if (common) lines.push(common);
        currentParticipants().forEach(member => {
            lines.push(`${member.profileName}: ${memberSummaryText(day.byMember.get(String(member.profileId)) || [])}`);
        });
    }

    const dayNotes = notesForDay(dateStr).sort((a, b) => a.date.localeCompare(b.date));
    dayNotes.forEach(note => {
        const time = noteTime(note);
        const title = note.title || `${(note.confirmedProfileNames || []).length} ${getT('js.participants')}`;
        lines.push(`• ${title}${time ? ` (${time})` : ''} — ${(note.confirmedProfileNames || []).length} ${getT('js.participants')}`);
    });
    if (!dayNotes.length) lines.push(getT('day.noEvents'));

    const ok = await copyText(lines.join('\n'));
    showToast(ok ? getT('js.copiedDay') : getT('js.clipboardError'), ok ? 'success' : 'error');
}

// ============================================================
// Group statistics
// ============================================================
function openStatsModal() {
    if (!window.currentGroupId) return;

    const notes = window.currentNotes;
    const today = todayStr();
    const myConfirmed = notes.filter(note => (note.confirmedProfileIds || []).map(String).includes(String(window.profileId))).length;

    const joinCounts = {};
    notes.forEach(note => (note.confirmedProfileNames || []).forEach(name => { joinCounts[name] = (joinCounts[name] || 0) + 1; }));
    const top = Object.entries(joinCounts).sort((a, b) => b[1] - a[1])[0];

    // days (not intervals) on which I have a mark of the type
    const myMarkedDays = type => new Set(window.currentMarks
        .filter(mark => isMyMark(mark) && mark.type === type)
        .map(mark => mark.date)).size;

    const rows = [
        [getT('stats.members'), currentParticipants().length],
        [getT('stats.total'), notes.length],
        [getT('stats.upcoming'), notes.filter(note => note.date.slice(0, 10) >= today).length],
        [getT('stats.participation'), notes.length ? `${Math.round((myConfirmed / notes.length) * 100)}%` : '—'],
        [getT('stats.myMarks'), tF('stats.myMarksValue', { free: myMarkedDays(MARK_FREE), busy: myMarkedDays(MARK_BUSY) })],
        [getT('stats.commonDays'), Array.from(window._avail.days.keys()).filter(isAllFree).length],
        [getT('stats.topParticipant'), top ? `${top[0]} (${top[1]})` : '—']
    ];

    el('statsContent').innerHTML = rows.map(([label, value]) =>
        `<div class="stats-row"><span>${esc(label)}</span><span class="stats-value">${esc(value)}</span></div>`).join('');
    openModal('statsModal');
}

// ============================================================
// iCal export
// ============================================================
function icalEscape(text) {
    return String(text || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

function exportIcal() {
    const notes = window.currentNotes.slice().sort((a, b) => a.date.localeCompare(b.date));
    if (!notes.length) return showToast(getT('js.noEvents'));

    const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AskDate//AskDate 2.2//RU', 'CALSCALE:GREGORIAN'];

    notes.forEach(note => {
        const date = note.date.slice(0, 10);
        const compact = date.replace(/-/g, '');
        const time = noteTime(note);

        lines.push('BEGIN:VEVENT', `UID:askdate-${note.id}-${date}@askdate`, `DTSTAMP:${stamp}`);
        if (time) {
            // Floating local time: the app stores wall-clock times, not instants
            lines.push(`DTSTART:${compact}T${time.replace(':', '')}00`);
        } else {
            lines.push(`DTSTART;VALUE=DATE:${compact}`, `DTEND;VALUE=DATE:${addDaysIso(date, 1).replace(/-/g, '')}`);
        }
        lines.push(`SUMMARY:${icalEscape(note.title || 'AskDate')}`);
        if ((note.confirmedProfileNames || []).length) {
            lines.push(`DESCRIPTION:${icalEscape(note.confirmedProfileNames.join(', '))}`);
        }
        lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `askdate-${((window.currentGroup && window.currentGroup.name) || 'calendar').replace(/[^\wа-яё\- ]+/gi, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(getT('js.exportDone'), 'success');
}

// ============================================================
// Browser notifications (opt-in)
// ============================================================
function notificationsEnabled() {
    return localStorage.getItem('askdate_notify') === '1'
        && typeof Notification !== 'undefined'
        && Notification.permission === 'granted';
}

async function toggleNotifications() {
    if (typeof Notification === 'undefined') return showToast(getT('notif.unsupported'), 'error');

    if (notificationsEnabled()) {
        localStorage.setItem('askdate_notify', '0');
        showToast(getT('notif.disabled'));
    } else {
        const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
        if (permission === 'granted') {
            localStorage.setItem('askdate_notify', '1');
            showToast(getT('notif.enabled'), 'success');
        } else {
            showToast(getT('notif.blocked'), 'error');
        }
    }
    updateNotifyButton();
}

function updateNotifyButton() {
    el('notifyToggleBtn').classList.toggle('toggled', notificationsEnabled());
}

// Shown only while the tab is in the background — in the foreground the page already shows the change
function realtimeNotify(body) {
    if (!notificationsEnabled() || document.visibilityState === 'visible') return;
    try {
        new Notification('AskDate', { body, icon: 'favicon.svg', tag: 'askdate-realtime' });
    } catch (e) {
        // Some browsers only allow notifications from a service worker
    }
}

// ============================================================
// Realtime (SignalR over WebSocket)
// ============================================================
// A burst of events (a drag over ten days, several clients at once) results in one refetch
const REFRESH_DEBOUNCE_MS = 250;
const refreshTimers = new Map();

function scheduleRefresh(key, task) {
    clearTimeout(refreshTimers.get(key));
    refreshTimers.set(key, setTimeout(() => {
        refreshTimers.delete(key);
        task().catch(error => console.error(`Refresh "${key}" failed:`, error));
    }, REFRESH_DEBOUNCE_MS));
}

function setRealtimeStatus(online) {
    window._realtimeOnline = online;
    const dot = el('realtimeStatus');
    if (!dot) return;
    dot.classList.toggle('online', online);
    dot.classList.toggle('offline', !online);
    dot.title = getT(online ? 'realtime.online' : 'realtime.offline');
}

function ensureRealtime() {
    if (typeof signalR === 'undefined') {
        scheduleFallbackPoll();
        return;
    }
    if (window._hubConn) return;

    const connection = new signalR.HubConnectionBuilder()
        .withUrl('/hub', { accessTokenFactory: () => window.token })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Error)
        .build();
    window._hubConn = connection;

    connection.on('notesChanged', () => {
        realtimeNotify(getT('notif.newNotes'));
        scheduleRefresh('notes', fetchNotes);
    });

    connection.on('availabilityChanged', () => {
        realtimeNotify(getT('notif.availability'));
        scheduleRefresh('marks', fetchMarks);
    });

    connection.on('participantsChanged', () => {
        realtimeNotify(getT('notif.groupChanged'));
        // Only the opened group depends on participants — the sidebar list does not, so it is not touched
        scheduleRefresh('group', refreshCurrentGroup);
    });

    connection.on('commentsChanged', data => onRemoteComments(data));
    connection.on('groupUpdated', data => onGroupUpdated(data));

    connection.onreconnecting(() => setRealtimeStatus(false));
    connection.onreconnected(() => {
        setRealtimeStatus(true);
        joinDesiredGroup();
        // Whatever happened while the connection was down was missed
        scheduleRefresh('notes', fetchNotes);
        scheduleRefresh('marks', fetchMarks);
        scheduleRefresh('group', refreshCurrentGroup);
        fetchGroups();
    });
    connection.onclose(() => {
        setRealtimeStatus(false);
        scheduleFallbackPoll();
    });

    connection.start()
        .then(() => {
            setRealtimeStatus(true);
            joinDesiredGroup();
        })
        .catch(() => {
            setRealtimeStatus(false);
            scheduleFallbackPoll();
        });
}

function stopRealtime() {
    const connection = window._hubConn;
    window._hubConn = null;
    desiredRealtimeGroup = null;
    setRealtimeStatus(false);
    if (connection) connection.stop().catch(() => {});
}

// The group whose channel this connection should be in; applied as soon as the connection is up
let desiredRealtimeGroup = null;

function joinRealtimeGroup(groupId) {
    desiredRealtimeGroup = String(groupId);
    joinDesiredGroup();
}

function leaveRealtimeGroup(groupId) {
    if (desiredRealtimeGroup !== String(groupId)) return;
    desiredRealtimeGroup = null;
    const connection = window._hubConn;
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        connection.invoke('LeaveGroup', Number(groupId)).catch(() => {});
    }
}

function joinDesiredGroup() {
    const connection = window._hubConn;
    if (!connection || desiredRealtimeGroup === null) return;
    if (connection.state !== signalR.HubConnectionState.Connected) return; // runs from "connected" instead
    connection.invoke('JoinGroup', Number(desiredRealtimeGroup)).catch(() => {});
}

function onRemoteComments(data) {
    const noteId = data ? data.noteId : null;
    if (typeof noteId !== 'number') return;
    commentsCache.delete(noteId);

    scheduleRefresh('comments', async () => {
        await fetchNotes(); // the comment counters on the cards come with the events
        const isOpen = window.selectedNote && window.selectedNote.id === noteId && !el('dayPanel').classList.contains('hidden');
        if (isOpen && !isEditingComment()) {
            await fetchComments(noteId, true);
            realtimeNotify(getT('notif.newComments'));
        }
    });
}

function onGroupUpdated(data) {
    const groupId = data ? data.groupId : null;

    if (data && data.deleted) {
        if (String(groupId) === String(window.currentGroupId)) {
            leaveGroupView(tF('js.groupDeleted', { name: window.currentGroup ? window.currentGroup.name : '' }));
        }
        fetchGroups();
        return;
    }

    if (String(groupId) === String(window.currentGroupId)) scheduleRefresh('group', refreshCurrentGroup);
    fetchGroups(); // renamed
}

// Polling is only a safety net for environments where the WebSocket cannot be established
let fallbackTimer = null;

function scheduleFallbackPoll() {
    if (fallbackTimer) return;
    fallbackTimer = setInterval(async () => {
        if (window._hubConn && typeof signalR !== 'undefined' && window._hubConn.state === signalR.HubConnectionState.Connected) {
            clearInterval(fallbackTimer);
            fallbackTimer = null;
            return;
        }
        if (!window.token || !window.currentGroupId) return;
        await Promise.all([refreshCurrentGroup(), fetchNotes(), fetchMarks()]);
    }, 45000);
}

// ============================================================
// Keyboard shortcuts
// ============================================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', event => {
        if (!el('customDialogOverlay').classList.contains('hidden')) return; // the dialog handles its own Esc

        const target = event.target;
        const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
        if (['input', 'textarea', 'select'].includes(tag) || (target && target.isContentEditable)) return;
        if (event.ctrlKey || event.metaKey || event.altKey) return;

        if (event.key === 'Escape') {
            if (!el('appOverlay').classList.contains('hidden')) { closeAllModals(); return; }
            if (currentTool !== 'view') { setTool('view'); return; }
            if (!el('dayPanel').classList.contains('hidden')) { closeDayPanel(); return; }
            toggleMobileMenuIfOpen();
            return;
        }

        if (!window.token || !window.currentGroupId || window._activeTab !== 'calendar') return;

        const panelOpen = !el('dayPanel').classList.contains('hidden');
        switch (event.key.toLowerCase()) {
            case 'arrowleft': if (panelOpen) navigateDay(-1); break;
            case 'arrowright': if (panelOpen) navigateDay(1); break;
            case 'n': createNoteForDate(todayStr()); break;
            case 't': if (window.appCalendar) window.appCalendar.today(); break;
            case '1': setTool('view'); break;
            case '2': setTool('free'); break;
            case '3': setTool('busy'); break;
        }
    });
}

function toggleMobileMenuIfOpen() {
    if (!el('mobileMenuDropdown').classList.contains('hidden')) toggleMobileMenu();
}

// ============================================================
// Profile
// ============================================================
function jwtEmail() {
    const payload = parseJwt(window.token);
    return (payload && (payload.name || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])) || '';
}

async function openProfileModal() {
    const profile = await usersApi(`/Profile/${window.profileId}`, 'GET', null, { silent: true });
    if (!profile) return appAlert(getT('js.profLoadFail'));

    el('profFirstName').value = profile.firstName || '';
    el('profLastName').value = profile.lastName || '';
    el('profNewPassword').value = '';
    window.currentUserId = profile.userId;

    const me = await usersApi('/User/me', 'GET', null, { silent: true });
    const email = (me && me.email) || window.currentUserEmail || jwtEmail();
    el('profLogin').innerText = email || '—';
    el('profRoleBadge').classList.toggle('hidden', !(me && me.role === 'Administrator'));

    openModal('profileModal');
}

// A password change revokes the refresh token, so the session is renewed with the new password right away
async function renewSessionWithPassword(newPassword) {
    const email = window.currentUserEmail || jwtEmail();
    if (!email) return;

    try {
        const res = await fetch(`${USERS_API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: newPassword })
        });
        if (!res.ok) return;
        const data = await res.json();
        window.token = data.token;
        window.refreshToken = data.refreshToken;
        localStorage.setItem('askdate_token', data.token);
        localStorage.setItem('askdate_refresh_token', data.refreshToken);
    } catch (e) {
        console.error('Login after password change failed:', e);
    }
}

async function saveProfile() {
    const firstName = el('profFirstName').value.trim();
    const lastName = el('profLastName').value.trim();
    const newPassword = el('profNewPassword').value;
    if (!firstName || !lastName) return appAlert(getT('js.profReq'));

    const saved = await usersApi(`/Profile/${window.profileId}`, 'PUT', { firstName, lastName, currentAvatar: '', status: 1 });
    if (saved === null) return appAlert(getT('js.profFail'));

    if (newPassword) {
        const changed = window.currentUserId
            ? await usersApi(`/User/update?userId=${window.currentUserId}`, 'PUT', { password: newPassword, phoneNumber: '' })
            : null;
        if (changed === null) return appAlert(getT('js.profFail'));
        await renewSessionWithPassword(newPassword);
    }

    closeAllModals();
    await fetchCurrentUserName();
    showToast(getT('js.profUpdated'), 'success');
}

// ============================================================
// Admin panel
// ============================================================
async function openAdminModal() {
    openModal('adminModal');
    await refreshAdminUsers();
}

function adminButton(label, className, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.innerText = label;
    button.onclick = onClick;
    return button;
}

async function refreshAdminUsers() {
    const container = el('adminUsersList');
    container.innerHTML = '<div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div>';

    const users = await usersApi('/User/all');
    if (!Array.isArray(users)) {
        container.innerHTML = '';
        return;
    }
    if (!users.length) {
        container.innerHTML = `<div class="upcoming-empty">${esc(getT('admin.empty'))}</div>`;
        return;
    }

    const myId = String(jwtUserId(parseJwt(window.token)) || '');
    const myEmail = String(window.currentUserEmail || '').toLowerCase();
    const rows = document.createDocumentFragment();

    users.forEach(user => {
        const isAdmin = user.role === 'Administrator';
        const isSelf = String(user.id) === myId || (myEmail && String(user.email).toLowerCase() === myEmail);

        const row = document.createElement('div');
        row.className = 'admin-user-row';
        row.innerHTML = `
            <div class="admin-user-info">
                <div class="admin-user-email">${esc(user.email)}</div>
                <div class="admin-user-meta">#${esc(user.id)} · ${esc(getT(user.verified ? 'admin.verified' : 'admin.notVerified'))} · ${esc(getT('admin.created'))} ${esc(new Date(user.created).toLocaleDateString(dateLocale()))}</div>
            </div>
            <span class="role-badge${isAdmin ? ' role-admin' : ''}">${isAdmin ? 'admin' : 'user'}</span>
            <div class="admin-actions"></div>`;

        const actions = row.querySelector('.admin-actions');
        const roleButton = adminButton(getT(isAdmin ? 'admin.removeAdmin' : 'admin.makeAdmin'), 'btn btn-outline btn-small', () => adminSetRole(user.id, user.email, isAdmin));
        const deleteButton = adminButton(getT('admin.delete'), 'btn btn-danger btn-small', () => adminDeleteUser(user.id, user.email));
        if (isSelf) {
            roleButton.disabled = true;
            roleButton.title = getT('admin.selfRole');
            deleteButton.disabled = true;
            deleteButton.title = getT('admin.selfDelete');
        }
        actions.append(
            adminButton(getT('admin.reset'), 'btn btn-outline btn-small', () => adminResetPassword(user.id, user.email)),
            roleButton,
            deleteButton
        );
        rows.appendChild(row);
    });

    container.replaceChildren(rows);
}

async function adminResetPassword(userId, email) {
    if (!await appConfirm(`${getT('admin.reset')} — ${email}?`)) return;

    const result = await usersApi(`/User/${userId}/reset-password`, 'PUT', {});
    if (!result) return;

    await appAlert(`${getT('admin.newPassword')} ${email}:\n${result.password}`); // shown once
    refreshAdminUsers();
}

async function adminSetRole(userId, email, isAdminNow) {
    const target = getT(isAdminNow ? 'admin.toUser' : 'admin.toAdmin');
    if (!await appConfirm(`${getT('admin.confirmRole')} ${email} ${target}`)) return;

    const ok = await usersApi(`/User/${userId}/role`, 'PUT', { role: isAdminNow ? 'User' : 'Administrator' });
    if (ok === null) return;
    refreshAdminUsers();
}

async function adminDeleteUser(userId, email) {
    if (!await appConfirm(`${getT('admin.confirmDelete')} ${email}?`)) return;

    const ok = await usersApi(`/User/delete/${userId}`, 'DELETE');
    if (ok === null) return;
    refreshAdminUsers();
}

// ============================================================
// Functions used from inline handlers in index.html and generated markup
// ============================================================
Object.assign(window, {
    // views / auth
    showView, registerUser, loginUser, logoutUser, toggleMobileMenu, toggleLanguage,
    // modals
    openModal, closeAllModals, appAlert, appConfirm, showToast,
    // groups
    fetchGroups, createGroup, loadGroup, openGroupSettings, saveGroupName, deleteCurrentGroup,
    joinGroupFromModal, removeParticipant, copyInviteLink, showInviteQr,
    // tabs / panel
    switchTab, openDayPanel, openDayPanelFromUpcoming, closeDayPanel, navigateDay,
    // availability
    setTool, setDefaultFree, clearAllMyMarks,
    addMarkFromPanel, editMyMark, cancelMarkEdit, removeMyMark, onRangeAllDayChange, onRangeTimeChange, onEventTimeChange,
    // events
    createNoteForDate, applyRecurrenceAndCreate, onRecurrenceTypeChange, onRecurrenceEndTypeChange,
    selectNoteInPanel, toggleConfirmNote, toggleConfirmSeries, deleteNote, deleteNoteSeries,
    startEditNoteTitle, cancelEditNoteTitle, saveNoteTitle,
    // comments
    startEditComment, cancelEditComment, saveComment, addCommentToCurrentDay, deleteComment,
    // extras
    openStatsModal, exportIcal, copyDaySummary, openProfileModal, saveProfile, openAdminModal
});
