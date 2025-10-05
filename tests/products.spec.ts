import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { pool } from '../src/db';
import { createProduct, getProducts, getProductById } from '../src/products';

async function ensureSchema() {
  await pool.query(`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );`);
}

beforeAll(async () => {
  await ensureSchema();
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE products RESTART IDENTITY;');
});

afterAll(async () => {
  await pool.end();
});

describe('Products integration', () => {
  it('crea un producto y devuelve sus campos', async () => {
    const p = await createProduct('Laptop', 99900);
    expect(p.id).toBe(1);
    expect(p.name).toBe('Laptop');
    expect(p.price_cents).toBe(99900);
    expect(new Date(p.created_at).getTime()).toBeTypeOf('number');
  });

  it('getProducts devuelve la lista en orden por id', async () => {
    await createProduct('A', 100);
    await createProduct('B', 200);
    const list = await getProducts();
    expect(list.map(x => x.name)).toEqual(['A', 'B']);
  });

  it('getProductById devuelve null si no existe', async () => {
    const p = await getProductById(999);
    expect(p).toBeNull();
  });
});
