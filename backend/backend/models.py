from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class Actividad(Base):
    __tablename__ = "actividades"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(String(500))
    fecha = Column(DateTime, nullable=False)
    cupo = Column(Integer, default=0)
