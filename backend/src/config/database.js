// src/config/database.js
// Configuración de conexión a PostgreSQL
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'distribuciones_db',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

pool.on('connect', () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('[DB] Conexión a PostgreSQL establecida.');
  }
});

pool.on('error', (err) => {
  console.error('[DB] Error inesperado en el pool:', err.message);
});

module.exports = pool;
