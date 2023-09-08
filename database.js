const { Pool } = require('pg');
require('dotenv').config();

/**
 * Database connection configurations
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'impactEd',
  password: process.env.DB_PW,
  port: '5432', 
});

module.exports = pool;