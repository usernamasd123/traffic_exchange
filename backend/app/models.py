from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class Status(str, enum.Enum):
    ACTIVE = "active"
    PENDING = "pending"
    INACTIVE = "inactive"

class RequestType(str, enum.Enum):
    PROVIDER = "provider"
    ADVERTISER = "advertiser"

class TrafficProvider(Base):
    __tablename__ = "traffic_providers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(Status), default=Status.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Advertiser(Base):
    __tablename__ = "advertisers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(Status), default=Status.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(RequestType))
    target_id = Column(Integer)
    telegram = Column(String)
    message = Column(String)
    status = Column(Enum(Status), default=Status.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 