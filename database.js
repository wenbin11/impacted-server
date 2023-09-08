const { Pool } = require('pg');

/**
 * Database connection configurations
 */
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'impactEd',
  password: 'wenbin11',
  port: '5432', 
});

module.exports = pool;