# main.py
from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from app.SQL.SQL import SessionLocal
from app.SQL.security.hash import hash_password, verify_password
from app.SQL.security.auth import crear_token_acceso, verificar_token
from enum import Enum
from datetime import datetime, date
from sqlalchemy import func, extract

app = FastAPI(title="MiBolsillo API", description="API para gestión de finanzas personales")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir el router del chat
from app.SQL.chat_assistant import router as chat_router
app.include_router(chat_router, prefix="/api", tags=["chat"])

# Modelos de validación
class RegistroUsuario(BaseModel):
    nombre: str
    email: str
    password: str

class LoginUsuario(BaseModel):
    email: str
    password: str

# Dependencia para la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", status_code=status.HTTP_201_CREATED)
def registrar(usuario: RegistroUsuario, db=Depends(get_db)):
    # Verificar si el email ya existe
    result = db.execute(text("SELECT 1 FROM usuarios WHERE email = :email"), {"email": usuario.email}).fetchone()
    if result:
        raise HTTPException(status_code=400, detail="Email ya registrado")

    # Validar longitud de contraseña
    if len(usuario.password) < 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")

    # Hashear y guardar
    hashed_pw = hash_password(usuario.password)
    db.execute(
        text("INSERT INTO usuarios (nombre, email, password, activo) VALUES (:nombre, :email, :password, TRUE)"),
        {"nombre": usuario.nombre, "email": usuario.email, "password": hashed_pw}
    )
    db.commit()
    return {"mensaje": "Usuario registrado exitosamente"}

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "MiBolsillo backend is running!"}

@app.post("/login")
def login(usuario: LoginUsuario, db=Depends(get_db)):
    # Buscar usuario
    result = db.execute(
        text("SELECT email, password FROM usuarios WHERE email = :email"),
        {"email": usuario.email}
    ).fetchone()

    if not result or not verify_password(usuario.password, result.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Generar token
    token = crear_token_acceso({"sub": result.email})
    return {"access_token": token, "token_type": "bearer"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# Dependencia para obtener el ID del usuario actual
# Dependencia para obtener el ID del usuario actual
def get_usuario_actual(token: str = Depends(OAuth2PasswordBearer(tokenUrl="/login")), db=Depends(get_db)):
    payload = verificar_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    result = db.execute(
        text("SELECT id FROM usuarios WHERE email = :email"),
        {"email": email}  # ← Ahora es un string
    ).fetchone()
    
    if not result:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return result.id

# Enums
class TipoTransaccion(str, Enum):
    ingreso = "ingreso"
    gasto = "gasto"

class TipoCuenta(str, Enum):
    efectivo = "efectivo"
    banco = "banco"
    tarjeta = "tarjeta"
    otro = "otro"

class PeriodoPresupuesto(str, Enum):
    semanal = "semanal"
    mensual = "mensual"
    anual = "anual"

# Modelos para Categorías
class CategoriaBase(BaseModel):
    nombre: str
    tipo: TipoTransaccion
    icono: str | None = None
    color: str | None = None

class CategoriaCrear(CategoriaBase):
    pass

class Categoria(CategoriaBase):
    id: int
    usuario_id: int
    activo: bool

    class Config:
        from_attributes = True

# Modelos para Cuentas
class CuentaBase(BaseModel):
    nombre: str
    tipo: TipoCuenta
    saldo_inicial: float = 0.0
    moneda: str = "ARS"

class CuentaCrear(CuentaBase):
    pass

class Cuenta(CuentaBase):
    id: int
    usuario_id: int
    saldo_actual: float
    activo: bool
    fecha_creacion: datetime

    class Config:
        from_attributes = True

# Modelos para Transacciones
class TransaccionBase(BaseModel):
    cuenta_id: int
    categoria_id: int
    tipo: TipoTransaccion
    monto: float
    descripcion: str | None = None
    fecha: date
    notas: str | None = None

class TransaccionCrear(TransaccionBase):
    pass

class Transaccion(TransaccionBase):
    id: int
    usuario_id: int
    fecha_registro: datetime

    class Config:
        from_attributes = True

# Modelos para Presupuestos
class PresupuestoBase(BaseModel):
    categoria_id: int
    monto_limite: float
    periodo: PeriodoPresupuesto
    fecha_inicio: date
    fecha_fin: date

class PresupuestoCrear(PresupuestoBase):
    pass

class Presupuesto(PresupuestoBase):
    id: int
    usuario_id: int
    activo: bool

    class Config:
        from_attributes = True

# --- CATEGORÍAS ---
@app.post("/categorias", response_model=Categoria, status_code=201)
def crear_categoria(
    categoria: CategoriaCrear,
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    query = text("""
        INSERT INTO categorias (usuario_id, nombre, tipo, icono, color, activo)
        VALUES (:usuario_id, :nombre, :tipo, :icono, :color, TRUE)
        RETURNING id, usuario_id, nombre, tipo, icono, color, activo;
    """)
    result = db.execute(query, {
        "usuario_id": usuario_id,
        "nombre": categoria.nombre,
        "tipo": categoria.tipo,
        "icono": categoria.icono,
        "color": categoria.color
    })
    db.commit()
    return result.fetchone()

@app.get("/categorias", response_model=list[Categoria])
def listar_categorias(
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    result = db.execute(
        text("SELECT id, usuario_id, nombre, tipo, icono, color, activo FROM categorias WHERE usuario_id = :usuario_id AND activo = TRUE"),
        {"usuario_id": usuario_id}
    ).fetchall()
    return result

@app.get("/categorias/{categoria_id}", response_model=Categoria)
def obtener_categoria(
    categoria_id: int,
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    result = db.execute(
        text("SELECT id, usuario_id, nombre, tipo, icono, color, activo FROM categorias WHERE id = :id AND usuario_id = :usuario_id AND activo = TRUE"),
        {"id": categoria_id, "usuario_id": usuario_id}
    ).fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return result

@app.put("/categorias/{categoria_id}", response_model=Categoria)
def actualizar_categoria(
    categoria_id: int,
    categoria: CategoriaBase,
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    # Verificar que la categoría pertenezca al usuario
    verif = db.execute(
        text("SELECT 1 FROM categorias WHERE id = :id AND usuario_id = :usuario_id AND activo = TRUE"),
        {"id": categoria_id, "usuario_id": usuario_id}
    ).fetchone()
    if not verif:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    query = text("""
        UPDATE categorias
        SET nombre = :nombre, tipo = :tipo, icono = :icono, color = :color
        WHERE id = :id
        RETURNING id, usuario_id, nombre, tipo, icono, color, activo;
    """)
    result = db.execute(query, {
        "id": categoria_id,
        "nombre": categoria.nombre,
        "tipo": categoria.tipo,
        "icono": categoria.icono,
        "color": categoria.color
    })
    db.commit()
    return result.fetchone()

@app.delete("/categorias/{categoria_id}")
def eliminar_categoria(
    categoria_id: int,
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    # Verificar pertenencia
    verif = db.execute(
        text("SELECT 1 FROM categorias WHERE id = :id AND usuario_id = :usuario_id AND activo = TRUE"),
        {"id": categoria_id, "usuario_id": usuario_id}
    ).fetchone()
    if not verif:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    # Actualizar activo = FALSE (soft delete)
    db.execute(
        text("UPDATE categorias SET activo = FALSE WHERE id = :id"),
        {"id": categoria_id}
    )
    db.commit()
    return {"mensaje": "Categoría eliminada"}



@app.get("/estadisticas/categorias")
def obtener_estadisticas_categorias(
    year: int,
    month: int,
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    # Obtener gastos del mes por categoría
    query = text("""
        SELECT 
            c.nombre AS categoria,
            c.color,
            c.icono,
            SUM(t.monto) AS total
        FROM transacciones t
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = :usuario_id
          AND t.tipo = 'gasto'
          AND EXTRACT(YEAR FROM t.fecha) = :year
          AND EXTRACT(MONTH FROM t.fecha) = :month
        GROUP BY c.id, c.nombre, c.color, c.icono
        ORDER BY total DESC
    """)
    result = db.execute(query, {
        "usuario_id": usuario_id,
        "year": year,
        "month": month
    }).fetchall()

    # Convertir a lista de dicts
    datos = [
        {
            "categoria": row.categoria,
            "color": row.color or "#95a5a6",
            "icono": row.icono or "💰",
            "total": float(row.total)
        }
        for row in result
    ]

    # Calcular total general
    total_general = sum(item["total"] for item in datos)
    
    # Añadir porcentaje
    for item in datos:
        item["porcentaje"] = round((item["total"] / total_general) * 100, 2) if total_general > 0 else 0

    return {
        "year": year,
        "month": month,
        "categorias": datos,
        "total_gastos": round(total_general, 2)
    }


@app.get("/transacciones")
def listar_transacciones(
    usuario_id: int = Depends(get_usuario_actual),
    db=Depends(get_db)
):
    """Devuelve las transacciones del usuario (id, fecha, descripcion, monto)."""
    result = db.execute(
        text("SELECT id, fecha, descripcion, monto FROM transacciones WHERE usuario_id = :usuario_id ORDER BY fecha DESC"),
        {"usuario_id": usuario_id}
    ).fetchall()

    transacciones = [
        {
            "id": row.id,
            "fecha": row.fecha.isoformat() if getattr(row, 'fecha', None) is not None else None,
            "descripcion": row.descripcion,
            "monto": float(row.monto) if getattr(row, 'monto', None) is not None else 0,
        }
        for row in result
    ]

    return transacciones