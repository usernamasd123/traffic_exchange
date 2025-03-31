from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models import Status, RequestType

class TrafficProviderBase(BaseModel):
    name: str
    description: str
    status: Status = Status.PENDING

class TrafficProviderCreate(TrafficProviderBase):
    pass

class TrafficProvider(TrafficProviderBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class AdvertiserBase(BaseModel):
    name: str
    description: str
    status: Status = Status.PENDING

class AdvertiserCreate(AdvertiserBase):
    pass

class Advertiser(AdvertiserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class RequestBase(BaseModel):
    type: RequestType
    target_id: int
    telegram: str
    message: str
    status: Status = Status.PENDING

class RequestCreate(RequestBase):
    pass

class Request(RequestBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True 