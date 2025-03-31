from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models import UserRole

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class TrafficRequestBase(BaseModel):
    title: str
    description: str
    required_traffic: int
    budget: float

class TrafficRequestCreate(TrafficRequestBase):
    pass

class TrafficRequest(TrafficRequestBase):
    id: int
    user_id: int
    created_at: datetime
    status: str

    class Config:
        from_attributes = True

class TrafficProviderBase(BaseModel):
    title: str
    description: str
    available_traffic: int
    price_per_unit: float

class TrafficProviderCreate(TrafficProviderBase):
    pass

class TrafficProvider(TrafficProviderBase):
    id: int
    user_id: int
    created_at: datetime
    status: str

    class Config:
        from_attributes = True 