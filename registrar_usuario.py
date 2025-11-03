# registrar.py
import sys
import os
import re
sys.path.insert(0, os.path.abspath("."))

from app.SQL.SQL import SessionLocal
from app.SQL.security.hash import hash_password
from sqlalchemy import text

def validar_email(email: str) -> bool:
    """Verifica que el email tenga un formato válido."""
    patron = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(patron, email) is not None

def email_existe(email: str, db) -> bool:
    """Verifica si el email ya está registrado."""
    result = db.execute(
        text("SELECT 1 FROM usuarios WHERE email = :email"),
        {"email": email}
    ).fetchone()
    return result is not None

def registrar_usuario(nombre: str, email: str, password: str):
    db = SessionLocal()
    try:
        # Validación 1: email válido
        if not validar_email(email):
            print("❌ El email no tiene un formato válido.")
            return False

        # Validación 2: email no repetido
        if email_existe(email, db):
            print("❌ Ya existe una cuenta con ese email.")
            return False

        # Validación 3 (opcional): contraseña mínima
        if len(password) < 6:
            print("❌ La contraseña debe tener al menos 6 caracteres.")
            return False

        # Hashear y guardar
        hashed_pw = hash_password(password)
        query = text("""
            INSERT INTO usuarios (nombre, email, password, activo)
            VALUES (:nombre, :email, :password, TRUE)
            RETURNING id, email;
        """)
        result = db.execute(query, {
            "nombre": nombre,
            "email": email,
            "password": hashed_pw
        })
        db.commit()
        usuario = result.fetchone()
        print(f"✅ Usuario registrado: {usuario.email} (ID: {usuario.id})")
        return True

    except Exception as e:
        db.rollback()
        print("❌ Error al registrar usuario:", e)
        return False
    finally:
        db.close()

# Ejemplo de uso
if __name__ == "__main__":
    nombre = input("Nombre: ")
    email = input("Email: ")
    password = input("Contraseña: ")
    registrar_usuario(nombre, email, password)