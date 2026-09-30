const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const useSsl = connectionString?.includes('sslmode=require') || process.env.DATABASE_SSL === 'true';

const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('Connected to Neon PostgreSQL');
});

module.exports = pool;
