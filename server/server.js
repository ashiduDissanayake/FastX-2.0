const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');

// Import the routes
const userRoutes = require('./routes/userRoute');
const managerRoutes = require('./routes/managerRoute');

// dotenv config
dotenv.config();

// rest object
const app = express();

// Middlewares
// Allow credentials and specify the frontend origin
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,               // Allow credentials (cookies)
};
// Cookie parser middleware
app.use(cookieParser());

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:true}));

// Cross platform Middleware
app.use(cors(corsOptions));
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
app.use('/user', userRoutes);
app.use('/manager', managerRoutes)

// Root route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
