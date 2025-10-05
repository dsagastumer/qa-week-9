import { pool } from './db';

export type Product = {
  id: number;
  name: string;
  price_cents: number;
  created_at: string;
};

export async function createProduct(name: string, price_cents: number): Promise<Product> {
  if (!name || price_cents == null) throw new Error('name y price_cents son requeridos');
  const sql = `INSERT INTO products(name, price_cents)
               VALUES ($1, $2)
               RETURNING id, name, price_cents, created_at`;
  const { rows } = await pool.query(sql, [name, price_cents]);
  return rows[0];
}

export async function getProducts(): Promise<Product[]> {
  const { rows } = await pool.query(
    `SELECT id, name, price_cents, created_at FROM products ORDER BY id ASC`
  );
  return rows;
}

export async function getProductById(id: number): Promise<Product | null> {
  const { rows } = await pool.query(
    `SELECT id, name, price_cents, created_at FROM products WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}
