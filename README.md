# Биржа трафика

Веб-приложение для обмена трафиком между пользователями.

## Функциональность

- Регистрация и авторизация пользователей
- Создание заявок на получение трафика
- Создание предложений по продаже трафика
- Просмотр активных заявок и предложений
- Управление статусами заявок и предложений
- Административная панель

## Технологии

- Backend: FastAPI (Python)
- Frontend: React + TypeScript
- База данных: PostgreSQL
- ORM: SQLAlchemy

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd traffic_exchange
```

2. Создайте виртуальное окружение и активируйте его:
```bash
python -m venv venv
source venv/bin/activate  # для Linux/Mac
# или
venv\Scripts\activate  # для Windows
```

3. Установите зависимости:
```bash
cd backend
pip install -r requirements.txt
```

4. Создайте базу данных PostgreSQL и настройте переменные окружения:
- Создайте файл `.env` в директории `backend`
- Укажите параметры подключения к базе данных и другие настройки

5. Примените миграции базы данных:
```bash
alembic upgrade head
```

## Запуск

1. Запустите бэкенд:
```bash
cd backend
uvicorn main:app --reload
```

2. Запустите фронтенд (в отдельном терминале):
```bash
cd frontend
npm install
npm start
```

## API Документация

После запуска бэкенда, документация API доступна по адресу:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Структура проекта

```
traffic_exchange/
├── backend/
│   ├── routers/
│   │   ├── auth.py
│   │   ├── traffic_requests.py
│   │   └── traffic_providers.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
└── frontend/
    └── ...
``` 