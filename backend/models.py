from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum
from datetime import datetime

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.USER)
    created_at = Column(DateTime, default=datetime.utcnow)

class TrafficRequest(Base):
    __tablename__ = "traffic_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    required_traffic = Column(Integer)  # количество трафика
    budget = Column(Float)  # бюджет
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="active")  # active, completed, cancelled

    user = relationship("User", back_populates="traffic_requests")

class TrafficProvider(Base):
    __tablename__ = "traffic_providers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    available_traffic = Column(Integer)  # доступный трафик
    price_per_unit = Column(Float)  # цена за единицу трафика
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="active")  # active, inactive

    user = relationship("User", back_populates="traffic_providers")

# Добавляем связи в модель User
User.traffic_requests = relationship("TrafficRequest", back_populates="user")
User.traffic_providers = relationship("TrafficProvider", back_populates="user") 