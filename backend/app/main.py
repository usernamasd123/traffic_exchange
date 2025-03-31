from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import traffic
from app.database import engine, Base

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Traffic Exchange API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(traffic.router, prefix="/api/traffic", tags=["traffic"])

@app.get("/")
async def root():
    return {"message": "Welcome to Traffic Exchange API"} 