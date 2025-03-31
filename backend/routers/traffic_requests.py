from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import User, TrafficRequest
from schemas import TrafficRequestCreate, TrafficRequest as TrafficRequestSchema
from routers.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=TrafficRequestSchema)
def create_traffic_request(
    request: TrafficRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_request = TrafficRequest(
        **request.dict(),
        user_id=current_user.id
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

@router.get("/", response_model=List[TrafficRequestSchema])
def get_traffic_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    requests = db.query(TrafficRequest).filter(
        TrafficRequest.status == "active"
    ).offset(skip).limit(limit).all()
    return requests

@router.get("/my", response_model=List[TrafficRequestSchema])
def get_my_traffic_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    requests = db.query(TrafficRequest).filter(
        TrafficRequest.user_id == current_user.id
    ).all()
    return requests

@router.get("/{request_id}", response_model=TrafficRequestSchema)
def get_traffic_request(
    request_id: int,
    db: Session = Depends(get_db)
):
    request = db.query(TrafficRequest).filter(TrafficRequest.id == request_id).first()
    if request is None:
        raise HTTPException(status_code=404, detail="Request not found")
    return request

@router.put("/{request_id}/status")
def update_request_status(
    request_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    request = db.query(TrafficRequest).filter(TrafficRequest.id == request_id).first()
    if request is None:
        raise HTTPException(status_code=404, detail="Request not found")
    if request.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    request.status = status
    db.commit()
    return {"message": "Status updated successfully"} 