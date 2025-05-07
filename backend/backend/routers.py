from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Actividad
from .schemas import ActividadSchema

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/actividades/")
def get_actividades(db: Session = Depends(get_db)):
    return db.query(Actividad).all()

@router.post("/actividades/")
def crear_actividad(actividad: ActividadSchema, db: Session = Depends(get_db)):
    nueva_actividad = Actividad(**actividad.dict())
    db.add(nueva_actividad)
    db.commit()
    return nueva_actividad
