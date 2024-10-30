const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// dotenv config
dotenv.config();

// SSL certificate path
const caCert = fs.readFileSync(path.resolve(__dirname, './ca.pem'));

const db = mysql.createConnection({
  host: process.env.DB_HOST,          // Replace with your DB host
  user: process.env.DB_ROOT,          // Replace with your MySQL username
  password: process.env.DB_PASSWORD,  // Replace with your MySQL password
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;