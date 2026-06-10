# AskDate

Сервис для совместного планирования дат и событий. Позволяет создавать группы, отмечать удобные дни в календаре и координировать встречи с участниками.

## Технологии

- **Backend**: .NET 8/10 (ASP.NET Core) — два микросервиса
- **Frontend**: Vanilla JS SPA (FullCalendar 6)
- **База данных**: PostgreSQL 16 + EF Core
- **Инфраструктура**: Docker Compose, nginx, GitHub Actions CI/CD

## Архитектура

```
nginx (:80)
├── /api/User/*, /api/Profile/* → users.web (:8080)
└── /api/*                       → askdate.web (:8080)

askdate.db (:5432)  — PostgreSQL (AskDateDB)
users.db  (:5432)  — PostgreSQL (UserDB)
```

### Микросервисы

| Сервис | Описание | Порт |
|--------|----------|------|
| `askdate.web` | Основной API: группы, события, комментарии, подтверждения | 5146 → 8080 |
| `users.web` | API авторизации: регистрация, вход, JWT, refresh-токены | 50002 → 8080 |
| `nginx` | Обратный прокси + раздача статики | 80 |
| `askdate.db` | PostgreSQL для основного сервиса | 5433 → 5432 |
| `users.db` | PostgreSQL для сервиса авторизации | 5434 → 5432 |

## Запуск

### Локальная разработка

```bash
# Клонирование
git clone https://github.com/MKritskiy/AskDate.git
cd AskDate
git checkout develop

# Запуск через Docker Compose
docker compose up --build
```

Приложение будет доступно на **http://localhost:80**.

### Production

```bash
docker compose -f docker-compose.prod.yml up -d
```

Образы тянутся из Docker Hub. Watchtower автоматически обновляет контейнеры при появлении новых образов.

### Переменные окружения

Создайте `.env` файл (см. `.env.example`):

```env
DB_PASSWORD=your_secure_password
JWT_KEY=your_jwt_secret_key
JWT_ISSUER=AskDateIssuer
JWT_AUDIENCE=AskDateAudience
DOCKERHUB_USERNAME=your_dockerhub_username
```

## Возможности

- **Группы** — создание и вступление по пригласительной ссылке
- **Календарь** — визуальный выбор дат с отображением событий
- **События** — разовые и регулярные (ежедневные, еженедельные, ежемесячные)
- **Участие** — отметка удобных/неудобных дней, массовое присоединение к серии
- **Комментарии** — обсуждение под каждым событием
- **Предстоящие события** — вкладка со списком ближайших событий
- **Авторизация** — JWT + refresh-токены, автоматическое продление сессии
- **Локализация** — русский и английский языки

## CI/CD

- **`develop`** — ветка разработки
- **`main`** — продакшен, автоматически собирается через GitHub Actions
- Docker-образы публикуются в Docker Hub: `askdate-web`, `users-web`
- Watchtower на сервере подхватывает обновления каждые 60 секунд

## Структура проекта

```
AskDate/
├── Application/          # Бизнес-логика (сервисы, DTO, интерфейсы)
├── Domain/               # Сущности и доменные модели
├── Infra/                # DbContext, миграции, репозитории
├── Infrastructure/       # Generic repository
├── Helpers/              # Утилиты
├── Share/                # Общие библиотеки (BaseEntity)
├── Web/                  # AskDate API + фронтенд
│   ├── Controllers/
│   └── wwwroot/          # index.html, app.js, style.css
├── User.API/             # Микросервис авторизации
│   ├── User.Application/
│   ├── User.Domain/
│   ├── User.Infrastructure/
│   └── User.Web/
├── docker-compose.yml
├── docker-compose.prod.yml
├── nginx.conf
└── .github/workflows/    # GitHub Actions
```

## Авторы

- [MKritskiy](https://github.com/MKritskiy)
