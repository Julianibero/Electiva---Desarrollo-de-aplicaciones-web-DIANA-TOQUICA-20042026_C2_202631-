-- database/schema.sql
-- Esquema relacional normalizado en 3FN para PostgreSQL 16
-- Distribuciones Comerciales del Centro S.A.S.

CREATE DATABASE distribuciones_db
  WITH ENCODING = 'UTF8'
  LC_COLLATE = 'es_CO.UTF-8'
  TEMPLATE = template0;

\c distribuciones_db;

-- ── Usuarios del sistema ──────────────────────────────────────────────
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(120) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20)  NOT NULL CHECK (role IN ('admin','vendedor','bodega','director')),
  active     BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Categorías de producto ────────────────────────────────────────────
CREATE TABLE categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE
);

-- ── Catálogo de productos ─────────────────────────────────────────────
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(160) NOT NULL,
  sku         VARCHAR(40)  NOT NULL UNIQUE,
  category_id INTEGER      NOT NULL REFERENCES categories(id),
  stock       INTEGER      NOT NULL DEFAULT 0 CHECK (stock >= 0),
  price       NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  active      BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Ventas ────────────────────────────────────────────────────────────
CREATE TABLE sales (
  id         SERIAL PRIMARY KEY,
  seller_id  INTEGER      NOT NULL REFERENCES users(id),
  total      NUMERIC(14,2) NOT NULL CHECK (total >= 0),
  status     VARCHAR(20)  NOT NULL DEFAULT 'completada' CHECK (status IN ('completada','anulada')),
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Detalle de cada venta ─────────────────────────────────────────────
CREATE TABLE sale_items (
  id         SERIAL PRIMARY KEY,
  sale_id    INTEGER      NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id INTEGER      NOT NULL REFERENCES products(id),
  qty        INTEGER      NOT NULL CHECK (qty > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  subtotal   NUMERIC(14,2) GENERATED ALWAYS AS (qty * unit_price) STORED
);

-- ── Movimientos de inventario (trazabilidad) ──────────────────────────
CREATE TABLE inventory_movements (
  id           SERIAL PRIMARY KEY,
  product_id   INTEGER     NOT NULL REFERENCES products(id),
  type         VARCHAR(20) NOT NULL CHECK (type IN ('entrada','salida','ajuste')),
  qty          INTEGER     NOT NULL,
  reason       VARCHAR(200),
  reference_id INTEGER,
  user_id      INTEGER     REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Índices de rendimiento ────────────────────────────────────────────
CREATE INDEX idx_products_category  ON products(category_id);
CREATE INDEX idx_products_stock     ON products(stock);
CREATE INDEX idx_sales_seller       ON sales(seller_id);
CREATE INDEX idx_sales_created      ON sales(created_at);
CREATE INDEX idx_sale_items_sale    ON sale_items(sale_id);
CREATE INDEX idx_inv_movements_prod ON inventory_movements(product_id);

-- ── Datos iniciales ───────────────────────────────────────────────────
INSERT INTO categories (name) VALUES
  ('Granos'),('Aceites'),('Dulces'),('Harinas'),('Lácteos'),
  ('Bebidas'),('Aseo'),('Pastas'),('Conservas'),('Condimentos'),('Salsas');

INSERT INTO users (name, email, password, role) VALUES
  ('Julian Vega Joya', 'admin@distribuciones.co',  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
  ('María López',      'ventas@distribuciones.co', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'vendedor'),
  ('Carlos Ruiz',      'bodega@distribuciones.co', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'bodega');
-- Contraseña de todos los usuarios de prueba: "password"
