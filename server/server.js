const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Import the routes
const userRoutes = require('./routes/userRoute');

// dotenv config
dotenv.config();

// rest object
const app = express();

// Middlewares
//Middleware for cross platform
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

//Routes
// User routes
app.use('/users', userRoutes);

// Root route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
