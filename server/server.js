const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Import the routes
const userRoutes = require('./routes/userRoute');
const managerRoutes = require('./routes/managerRoute');
const mainmanagerRoutes = require('./routes/mainmanagerRoute');
const adminRoutes = require('./routes/adminRoute');

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
app.use(bodyParser.urlencoded({ extended: true }));

// Cross platform Middleware
app.use(cors(corsOptions));
// Middleware to parse incoming JSON requests
app.use(express.json());

// Multer Middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/products')); // Path to save the file
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage: storage });

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
const port = process.env.PORT || 5000;

// Routes
// User routes
app.use('/user', userRoutes);
app.use('/manager', managerRoutes);
app.use('/mainmanager', mainmanagerRoutes)
app.use('/admin', adminRoutes);

// Root route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = `/products/${req.file.filename}`; // Relative path to the uploaded file
  res.json({ filePath }); // Send the file path to the frontend
});

// Updated Product Addition Route: Use the existing database connection
app.post('/admin/addProduct', (req, res) => {
  const {
    productName,
    price,
    weight,
    volume,
    availableQty,
    description,
    category,
    subcategory,
    image_link
  } = req.body;

  const query = `
    INSERT INTO Product (
      product_Name,
      price,
      weight,
      volume,
      available_Qty,
      description,
      category,
      subcategory,
      image_link,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    productName,
    price,
    weight,
    volume,
    availableQty,
    description,
    category,
    subcategory,
    image_link
  ];

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
    .then(() => {
      res.status(200).json({ message: 'Product added successfully!' });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Failed to add product', error: error.message });
    });
});

// Updated route for fetching pending orders












// Update order status

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
