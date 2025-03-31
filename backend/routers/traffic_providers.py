from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import User, TrafficProvider
from schemas import TrafficProviderCreate, TrafficProvider as TrafficProviderSchema
from routers.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=TrafficProviderSchema)
def create_traffic_provider(
    provider: TrafficProviderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_provider = TrafficProvider(
        **provider.dict(),
        user_id=current_user.id
    )
    db.add(db_provider)
    db.commit()
    db.refresh(db_provider)
    return db_provider

@router.get("/", response_model=List[TrafficProviderSchema])
def get_traffic_providers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    providers = db.query(TrafficProvider).filter(
        TrafficProvider.status == "active"
    ).offset(skip).limit(limit).all()
    return providers

@router.get("/my", response_model=List[TrafficProviderSchema])
def get_my_traffic_providers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    providers = db.query(TrafficProvider).filter(
        TrafficProvider.user_id == current_user.id
    ).all()
    return providers

@router.get("/{provider_id}", response_model=TrafficProviderSchema)
def get_traffic_provider(
    provider_id: int,
    db: Session = Depends(get_db)
):
    provider = db.query(TrafficProvider).filter(TrafficProvider.id == provider_id).first()
    if provider is None:
        raise HTTPException(status_code=404, detail="Provider not found")
    return provider

@router.put("/{provider_id}/status")
def update_provider_status(
    provider_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    provider = db.query(TrafficProvider).filter(TrafficProvider.id == provider_id).first()
    if provider is None:
        raise HTTPException(status_code=404, detail="Provider not found")
    if provider.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    provider.status = status
    db.commit()
    return {"message": "Status updated successfully"}

@router.put("/{provider_id}/available_traffic")
def update_available_traffic(
    provider_id: int,
    available_traffic: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    provider = db.query(TrafficProvider).filter(TrafficProvider.id == provider_id).first()
    if provider is None:
        raise HTTPException(status_code=404, detail="Provider not found")
    if provider.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    provider.available_traffic = available_traffic
    db.commit()
    return {"message": "Available traffic updated successfully"} 