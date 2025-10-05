import 'dotenv/config';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL no está definida. Configura .env o variables de entorno.');
}

export const pool = new Pool({ connectionString: databaseUrl });

export async function pgPing(): Promise<boolean> {
  const res = await pool.query('SELECT 1 as ok');
  return res.rows[0]?.ok === 1;
}
