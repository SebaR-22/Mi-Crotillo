# login.py
import sys
import os
sys.path.insert(0, os.path.abspath("."))

from app.SQL.SQL import SessionLocal
from app.SQL.security.hash import verify_password
from sqlalchemy import text

def login(email: str, password: str):
    db = SessionLocal()
    try:
        # Buscar usuario por email
        result = db.execute(
            text("SELECT id, email, password FROM usuarios WHERE email = :email"),
            {"email": email}
        ).fetchone()
        
        if not result:
            print("❌ Usuario no encontrado")
            return False
        
        # Verificar contraseña
        if verify_password(password, result.password):
            print(f"✅ ¡Bienvenido, {result.email}!")
            return True
        else:
            print("❌ Contraseña incorrecta")
            return False
    finally:
        db.close()

# Prueba
if __name__ == "__main__":
    login("messi@example.com", "123456677")  # Debe dar ✅