from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import TrafficProvider, Advertiser, Request, Status, RequestType
from app.schemas import TrafficProvider as TrafficProviderSchema, Advertiser as AdvertiserSchema, Request as RequestSchema, RequestCreate
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

async def send_telegram_notification(message: str):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    
    async with httpx.AsyncClient() as client:
        await client.post(url, json=data)

@router.get("/providers", response_model=List[TrafficProviderSchema])
def get_traffic_providers(db: Session = Depends(get_db)):
    return db.query(TrafficProvider).all()

@router.get("/providers/{provider_id}", response_model=TrafficProviderSchema)
def get_traffic_provider(provider_id: int, db: Session = Depends(get_db)):
    provider = db.query(TrafficProvider).filter(TrafficProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Traffic provider not found")
    return provider

@router.get("/advertisers", response_model=List[AdvertiserSchema])
def get_advertisers(db: Session = Depends(get_db)):
    return db.query(Advertiser).all()

@router.get("/advertisers/{advertiser_id}", response_model=AdvertiserSchema)
def get_advertiser(advertiser_id: int, db: Session = Depends(get_db)):
    advertiser = db.query(Advertiser).filter(Advertiser.id == advertiser_id).first()
    if not advertiser:
        raise HTTPException(status_code=404, detail="Advertiser not found")
    return advertiser

@router.post("/requests", response_model=RequestSchema)
async def create_request(request: RequestCreate, db: Session = Depends(get_db)):
    db_request = Request(**request.dict())
    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    # Отправляем уведомление в Telegram
    target_name = ""
    if request.type == RequestType.PROVIDER:
        target = db.query(TrafficProvider).filter(TrafficProvider.id == request.target_id).first()
        if target:
            target_name = target.name
    else:
        target = db.query(Advertiser).filter(Advertiser.id == request.target_id).first()
        if target:
            target_name = target.name

    message = f"Новая заявка:\nТип: {request.type.value}\nЦель: {target_name}\nTelegram: {request.telegram}\nСообщение: {request.message}"
    await send_telegram_notification(message)

    return db_request 