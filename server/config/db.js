const mysql = require('mysql2');
const dotenv = require('dotenv');

// dotenv config
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,     // Replace with your DB host
  user: process.env.DB_ROOT,          // Replace with your MySQL username
  password: process.env.DB_PASSWORD,  // Replace with your MySQL password
  database: process.env.DB_DATABASE // Replace with your database name
});

module.exports = db;
