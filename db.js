import { Pool } from 'pg';
import nextConnect from 'next-connect';

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const db = nextConnect();

db.use(async (req, res, next) => {
  req.db = pool;
  return next();
});

export default db;
