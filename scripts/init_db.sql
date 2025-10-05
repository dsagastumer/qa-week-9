-- Crea esquema mínimo para pruebas de integración
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Estado limpio para pruebas (idempotente)
TRUNCATE TABLE products RESTART IDENTITY;
