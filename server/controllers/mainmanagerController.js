const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require('../config/db');
const MainManagerModel = require('../models/mainManagermodel');


// dotenv config
dotenv.config();


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
const mainmanagerController = {
  // // Create new user
  // createUser: async (req, res) => {
  //   const {
  //     email,
  //     username,
  //     password,
  //     firstname,
  //     lastname,
  //     phonenumber,
  //     type,
  //   } = req.body;

  //   // Call the create function from the user model
  //   User.create(
  //     { email, username, password, firstname, lastname, phonenumber, type },
  //     (err, result) => {
  //       if (err) {
  //         const errors = handleErrors(err);
  //         return res.status(400).json({ errors });
  //       }

  //       // Assuming your stored procedure returns the user ID
  //       const userId = result;

  //       // Create JWT token
  //       const token = createToken(userId);
  //       res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  //       res.status(201).json({ user: userId });
  //     }
  //   );
  // },

  // // Login user
  // loginUser: (req, res) => {
  //   const { email, password } = req.body;

  //   User.login(email, password, (err, user) => {
  //     if (err) {
  //       const errors = handleErrors(err);
  //       return res.status(400).json({ errors }); // Send the error response
  //     }

  //     // Create JWT token
  //     console.log(user);
  //     const token = createToken(user.customer_ID);
  //     res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  //     res.status(200).json({ user: user.customer_ID }); // Send user ID in response
  //   });
  // },

  // // Check Auth
  // checkAuth: (req, res) => {
  //   const token = req.cookies.jwt; // Get the token from cookies
  //   if (!token) return res.json({ isAuthenticated: false });

  //   jwt.verify(token, process.env.SECRET, (err, user) => {
  //     if (err) return res.json({ isAuthenticated: false });
  //     res.json({ isAuthenticated: true });
  //   });
  // },

  // // Logout user
  // logoutUser: (req, res) => {
  //   res.cookie("jwt", "", { maxAge: 1 });
  //   res.redirect("/");
  // },

  // // Get all users
  // getUsers: (req, res) => {
  //   User.findAll((err, users) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Database error" });
  //     }
  //     res.json(users);
  //   });
  // },

  // // Get user by ID
  // getUserById: (req, res) => {
  //   const userId = req.params.id;
  //   User.findById(userId, (err, user) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Database error" });
  //     }
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     res.json(user);
  //   });
  // },

  // // Update user
  // updateUser: (req, res) => {
  //   const userId = req.params.id;
  //   const updatedData = req.body;
  //   User.update(userId, updatedData, (err, result) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Database error" });
  //     }
  //     res.json({ message: "User updated" });
  //   });
  // },

  // Manager 
  // get driver details
   mainManagerLogin : (req, res) => {
    const { username, password } = req.body;

    // Call the model to interact with the database
    MainManagerModel.login(username, password, (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Error occurred during login' });
        }

        const rows = result[0];

        // Check if login was successful
        if (rows.length > 0 && rows[0].message === 'Successful login') {
            const mainmanager_id = rows[0].manager_id;

            // Generate a JWT token
            const token = jwt.sign(
                { mainmanager_id, username }, // Payload with some user info
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
                mainmanager_id,
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

  getStore:(req, res) => {
    const sqlGet="SELECT * FROM store";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
  },

  getRoute:(req,res) => {
    const storeId = req.params.storeId; 
    const sqlGet="SELECT * FROM route WHERE store_ID = ?"; 
    db.query(sqlGet, [storeId], (error, result) => {
        if (error) {
            return res.status(500).send({ message: "Error retrieving routes", error });
        }
        res.send(result); 
    });

  },

  getScheduleTrip:(req,res) => {
    console.log('GET request received');
    res.send("Schedule Trip Endpoint");
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