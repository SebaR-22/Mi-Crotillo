# app/SQL/SQL.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

# Obtener la URL de la base de datos desde .env (o usar valor por defecto)
DATABASE_URL = os.getenv("DATABASE_URL")

# Asegurarse de que DATABASE_URL no sea None
if not DATABASE_URL:
    raise ValueError("❌ La variable DATABASE_URL no está definida en .env")

# Crear el motor de conexión
engine = create_engine(DATABASE_URL, echo=False)

# Crear la fábrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base para los modelos
Base = declarative_base()