const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require('../config/db')

// dotenv config
dotenv.config();

const DriverModel = require('../models/drivermodel');
// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.message === "email already registered") {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.SECRET, {
//     expiresIn: maxAge,
//   });
// };

// Controller to handle requests
const driverController = {


  driverLogin : (req, res) => {
    const { username, password } = req.body;

    // Call the model to interact with the database
    DriverModel.login(username, password, (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Error occurred during login' });
        }

        const rows = result[0];

        // Check if login was successful
        if (rows.length > 0 && rows[0].message === 'Successful login') {
            const driver_id = rows[0].driver_id;

            // Generate a JWT token
            const token = jwt.sign(
                { driver_id, username }, // Payload with some user info
                process.env.SECRET, // Secret key
                { expiresIn: '1h' } // Token expiry (e.g., 1 hour)
            );

            // Set the token as an HTTP-only cookie (more secure)
            res.cookie('token', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
                maxAge: 3600000, // 1 hour in milliseconds
            });

            // Send response with login success and token
            return res.status(200).json({
                message: 'Login successful',
                driver_id,
                token, // Optional: Send the token in the response too
            });
        } else {
            return res.status(401).json({
                message: rows[0] ? rows[0].message : 'Login failed: Incorrect username or password',
            });
        }
    });
},




  getDriver: (req, res) => {
    const storeId = req.params.storeId; // Get the storeId from the request parameters
    const sqlGet = "SELECT * FROM driver WHERE store_ID = ?"; 
    db.query(sqlGet, [storeId], (error, result) => {
        if (error) {
            return res.status(500).send({ message: "Error retrieving drivers", error });
        }
        res.send(result); 
    });
  },

  //get driver assistant details
  getDriverAssistant:(req, res) => {
    const storeId = req.params.storeId; // Get the storeId from the request parameters
    const sqlGet="SELECT * FROM driver_assistant WHERE store_ID = ?"; 
    db.query(sqlGet, [storeId], (error, result) => {
        if (error) {
            return res.status(500).send({ message: "Error retrieving driver assistents", error });
        }
        res.send(result); 
    });
  },

  //get truck details
  getTruck:(req, res) => {
    const storeId = req.params.storeId; 
    const sqlGet="SELECT * FROM truck WHERE store_ID = ?"; 
    db.query(sqlGet, [storeId], (error, result) => {
        if (error) {
            return res.status(500).send({ message: "Error retrieving trucks", error });
        }
        res.send(result); 
    });
  },


    //get order details
    getorder:(req, res) => {
        const sqlGet="SELECT * FROM orders";
        db.query(sqlGet,(error,result) => {
            res.send(result);
        }
    );
    },

    getselectorder: (req, res) => {
      const storeId = req.params.storeId;
      // const sqlGet = "SELECT * FROM `\order\` WHERE store_ID = ? AND status='Pending'"; 
      const sqlGet = "SELECT * FROM `\Route\` WHERE store_ID = ? AND status='Pending' AND Route.route_ID==Order.route_ID"; 
      
      db.query(sqlGet, [storeId], (error, result) => {
          if (error) {
              return res.status(500).json({ message: "Error retrieving orders", error });
          }
          res.send(result);  
      });
    },


// Backend code for updating order status
updateOrderStatus: (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // Expects { status: 'Shipped' }

  const sqlUpdate = "UPDATE orders SET status = ? WHERE order_ID = ?";
  db.query(sqlUpdate, [status, orderId], (error, result) => {
      if (error) {
          return res.status(500).json({ message: "Error updating order status", error });
      }
      res.status(200).json({ message: "Order status updated successfully" });
  });
},








    scheduleTrip: async (req, res) => {
      const { truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time } = req.body;
      if (!truck_ID || !driver_ID || !assistant_ID || !store_ID || !route_ID || !start_time) {
          return res.status(400).send({ message: 'All fields are required.' });
      }
      try {
          const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
          const formattedStartTime = `${currentDate} ${start_time}:00`;
          const query = `INSERT INTO truck_schedule ( truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time)
          VALUES ( ?, ?, ?, ?, ?, ?, ?);`;
          await db.promise().execute(query, [truck_ID, driver_ID, assistant_ID, store_ID, route_ID, formattedStartTime, null]);
          res.status(200).send({ message: 'Trip scheduled successfully!' });
      } catch (error) {
          console.error('Error scheduling trip:', error);
          res.status(500).send({ message: 'Failed to schedule trip', error: error.message });
      }
      }
    };
    
    
    
    
    module.exports = mainmanagerController;



  
  module.exports = mainmanagerController;

