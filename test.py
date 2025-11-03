# test.py
from app.SQL.security.hash import hash_password, verify_password

contraseña = "123456"
hashed = hash_password(contraseña)
print("✅ Hash:", hashed)
print("✅ Verificación correcta:", verify_password("123456", hashed))
print("✅ Verificación incorrecta:", verify_password("mala", hashed))