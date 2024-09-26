const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// dotenv config
dotenv.config();

// rest object
const app = express();
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Pass the database connection to routes
app.use((req, res, next) => {
  req.db = db; // Attach the db connection to the request object
  next();
});

// Port
const port = process.env.PORT;

// routes



// Basic route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
