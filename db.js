import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'JC',
  password: process.env.PGPASSWORD || 'tu_contraseña',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

export default pool;