# app/SQL/security/hash.py
import bcrypt

def hash_password(password: str) -> str:
    """Hashea una contraseña en texto plano."""
    # Convierte la contraseña a bytes
    password_bytes = password.encode('utf-8')
    # Genera un salt y hashea
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    # Devuelve como string (decodificado)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica que una contraseña coincida con el hash."""
    password_bytes = plain_password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)