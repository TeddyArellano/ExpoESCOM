from pydantic import BaseModel
from datetime import datetime

class ActividadSchema(BaseModel):
    nombre: str
    descripcion: str
    fecha: datetime
    cupo: int
