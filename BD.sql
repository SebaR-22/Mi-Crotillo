
CREATE DATABASE mi_bolsillo_db;


CREATE TYPE tipo_transaccion AS ENUM ('ingreso', 'gasto');
CREATE TYPE tipo_cuenta AS ENUM ('efectivo', 'banco', 'tarjeta', 'otro');
CREATE TYPE periodo_presupuesto AS ENUM ('semanal', 'mensual', 'anual');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);


CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    tipo tipo_transaccion NOT NULL,
    icono VARCHAR(50),
    color VARCHAR(7), -- formato hexadecimal #RRGGBB
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


CREATE TABLE cuentas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo tipo_cuenta NOT NULL,
    saldo_inicial NUMERIC(15, 2) DEFAULT 0.00,
    saldo_actual NUMERIC(15, 2) DEFAULT 0.00,
    moneda VARCHAR(3) DEFAULT 'ARS',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


CREATE TABLE transacciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    cuenta_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    tipo tipo_transaccion NOT NULL,
    monto NUMERIC(15, 2) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notas TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id) ON DELETE RESTRICT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

CREATE TABLE presupuestos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    monto_limite NUMERIC(15, 2) NOT NULL,
    periodo periodo_presupuesto NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);


CREATE INDEX idx_transacciones_usuario ON transacciones(usuario_id);
CREATE INDEX idx_transacciones_fecha ON transacciones(fecha);
CREATE INDEX idx_transacciones_categoria ON transacciones(categoria_id);
CREATE INDEX idx_transacciones_cuenta ON transacciones(cuenta_id);
CREATE INDEX idx_categorias_usuario ON categorias(usuario_id);
CREATE INDEX idx_cuentas_usuario ON cuentas(usuario_id);
CREATE INDEX idx_presupuestos_usuario ON presupuestos(usuario_id);