const { Pool } = require("pg");

// Create a connection pool to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Export query function
module.exports = {
  query: (text, params) => pool.query(text, params),
};
