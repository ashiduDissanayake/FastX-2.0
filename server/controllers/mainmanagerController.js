const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require('../config/db')

// dotenv config
dotenv.config();

const MainManagerModel = require('../models/mainManagermodel');
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

  //       // Create JWT token
  //       const token = createToken(userId);
  //       res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  //       res.status(201).json({ user: userId });
  //     }
  //   );
  // },
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
        const sqlGet="SELECT * FROM `Order`";
        db.query(sqlGet,(error,result) => {
            res.send(result);
        }
    );
    },

    getselectorder: (req, res) => {
      const storeId = req.params.storeId;
      
      const sqlGet = "SELECT * FROM `\Order\` JOIN Route ON Order.route_id = Route.route_ID WHERE store_ID = ? AND Order.status = 'Pending'";
      
      db.query(sqlGet, [storeId], (error, result) => {
          if (error) {
              return res.status(500).json({ message: "Error retrieving orders", error });
          }
          res.send(result);  
      });
    },

  //   getTrainSchedule:(req, res) => {
  //     const sqlGet="SELECT * FROM train_schedule";
  //     db.query(sqlGet,(error,result) => {
  //         res.send(result);
  //     }
  // );
  // },

  
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

    // Add this function to mainmanagerController
    getTrainCapacity: (req, res) => {
      const storeId = req.params.storeId;
      const sqlGet = "SELECT capacity FROM TrainSchedule WHERE store_ID = ?";
      
      db.query(sqlGet, [storeId], (error, result) => {
          if (error) {
              return res.status(500).json({ message: "Error retrieving train capacity", error });
          }
          res.send(result[0]); // Assuming the result contains capacity in the first object
      });
  },

//   // Get train schedule
// getTrainSchedule: (req, res) => {
//   const sqlGet = "SELECT * FROM train_schedule";
//   db.query(sqlGet, (error, result) => {
//       if (error) {
//           return res.status(500).json({ message: "Error retrieving train schedule", error });
//       }
//       res.status(200).json(result);
//   });
// },




// // Update train schedule
// updateTrainSchedule: (req, res) => {
//   const { schedule_ID, departure_Time, arrival_Time } = req.body; // Expecting schedule_ID in the request body

//   // Validate input
//   if (!schedule_ID || !departure_Time || !arrival_Time) {
//       return res.status(400).json({ message: "All fields are required" });
//   }

//   // Ensure that departure_Time and arrival_Time are in the correct format
//   // Example: "2024-10-18 16:42:00"
//   const formattedDepartureTime = departure_Time; // Assume it's already in the correct format
//   const formattedArrivalTime = arrival_Time; // Assume it's already in the correct format

//   // Update query
//   const sqlUpdate = "UPDATE train_schedule SET departure_Time = ?, arrival_Time = ? WHERE schedule_ID = ?"; 
//   db.query(sqlUpdate, [formattedDepartureTime, formattedArrivalTime, schedule_ID], (error, result) => {
//       if (error) {
//           console.error("Error updating train schedule:", error);
//           return res.status(500).json({ message: "Error updating train schedule", error });
//       }

//       if (result.affectedRows === 0) {
//           return res.status(404).json({ message: "Schedule ID not found" });
//       }

//       res.status(200).send({ message: "Train schedule updated successfully!" });
//   });
// },
getTrainSchedule: (req, res) => {
  const sqlGet = "SELECT * FROM `TrainSchedule`"; // Adjust the table name as needed

  db.query(sqlGet, (error, result) => {
      if (error) {
          return res.status(500).json({ message: "Error retrieving train schedule", error });
      }
      res.send(result);  
  });
},
updateTrainSchedule: (req, res) => {
  const { schedule_ID, departure_Time, arrival_Time } = req.body; // Destructure incoming data
  const sqlUpdate = "UPDATE `TrainSchedule` SET departure_Time = ?, arrival_Time = ? WHERE schedule_ID = ?"; // Adjust table name as needed

  db.query(sqlUpdate, [departure_Time, arrival_Time, schedule_ID], (error, result) => {
      if (error) {
          return res.status(500).json({ message: "Error updating train schedule", error });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Train schedule not found" });
      }
      res.status(200).json({ message: "Train schedule updated successfully" });
  });
},


updateOrderStatus: (req, res) => {
  const { order_id, status } = req.body; // Destructure incoming data

  const sqlUpdate = "UPDATE `Order` SET status = ? WHERE order_id = ?"; // Adjust table name as needed

  db.query(sqlUpdate, [status, order_id], (error, result) => {
      if (error) {
          return res.status(500).json({ message: "Error updating order status", error });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: `Order ${order_id} status updated to ${status}` });
  });
},


// Remove the previous updateOrderStatus method if exists

// // Add this function to mainmanagerController
// updateOrderStatus: async (req, res) => {
//   const { order_id, status } = req.body;

//   if (!order_id || !status) {
//       return res.status(400).json({ error: "Missing order_id or status" });
//   }

//   try {
//       const query = `UPDATE orders SET status = ? WHERE order_ID = ?`;
//       await db.query(query, [status, order_id]);
      
//       res.status(200).json({ message: `Order ${order_id} status updated to ${status}` });
//   } catch (error) {
//       console.error("Error updating order status:", error);
//       res.status(500).json({ error: "Failed to update order status" });
//   }
// },







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
  
  module.exports = mainmanagerController;



// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// const MainManagerModel = require('../models/mainmanagerModel');

// // Handle errors
// const handleErrors = (err) => {
//   let errors = { email: "", password: "" };

//   if (err.message === "incorrect email") {
//     errors.email = "That email is not registered";
//   }
//   if (err.message === "incorrect password") {
//     errors.password = "That password is incorrect";
//   }
//   if (err.message === "email already registered") {
//     errors.email = "That email is already registered";
//   }
//   if (err.message.includes("user validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

// // Controller to handle requests
// const mainmanagerController = {
//   mainManagerLogin: async (req, res) => {
//     const { username, password } = req.body;

//     try {
//       const result = await MainManagerModel.login(username, password);

//       if (result.length > 0 && result[0].message === 'Successful login') {
//         const { manager_id } = result[0];
//         const token = jwt.sign({ manager_id, username }, process.env.SECRET, { expiresIn: '1h' });

//         res.cookie('token', token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'production',
//           maxAge: 3600000, // 1 hour
//         });

//         return res.status(200).json({
//           message: 'Login successful',
//           manager_id,
//           token,
//         });
//       } else {
//         return res.status(401).json({
//           message: result[0] ? result[0].message : 'Login failed: Incorrect username or password',
//         });
//       }
//     } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).json({ message: 'Error occurred during login' });
//     }
//   },

//   getDriver: async (req, res) => {
//     try {
//       const result = await MainManagerModel.getDriverByStore(req.params.storeId);
//       res.status(200).json(result); // Use status 200 for successful retrieval
//     } catch (err) {
//       console.error("Error retrieving drivers:", err);
//       res.status(500).json({ message: "Error retrieving drivers", error: err.message });
//     }
//   },

//   getDriverAssistant: async (req, res) => {
//     try {
//       const result = await MainManagerModel.getDriverAssistantByStore(req.params.storeId);
//       res.status(200).json(result);
//     } catch (err) {
//       console.error("Error retrieving driver assistants:", err);
//       res.status(500).json({ message: "Error retrieving driver assistants", error: err.message });
//     }
//   },

//   getTruck: async (req, res) => {
//     try {
//       const result = await MainManagerModel.getTruckByStore(req.params.storeId);
//       res.status(200).json(result);
//     } catch (err) {
//       console.error("Error retrieving trucks:", err);
//       res.status(500).json({ message: "Error retrieving trucks", error: err.message });
//     }
//   },

//   getOrder: async (req, res) => {
//     try {
//       const result = await MainManagerModel.getAllOrders();
//       res.status(200).json(result);
//     } catch (err) {
//       console.error("Error retrieving orders:", err);
//       res.status(500).json({ message: "Error retrieving orders", error: err.message });
//     }
//   },

//   getSelectOrder: async (req, res) => {
//     try {
//       const result = await MainManagerModel.getPendingOrdersByStore(req.params.storeId);
//       res.status(200).json(result);
//     } catch (err) {
//       console.error("Error retrieving selected orders:", err);
//       res.status(500).json({ message: "Error retrieving selected orders", error: err.message });
//     }
//   },

//   getTrainSchedule: async (req, res) => {
//     try {
//       const result = await MainManagerModel.getTrainSchedule();
//       res.status(200).json(result);
//     } catch (err) {
//       console.error("Error retrieving train schedule:", err);
//       res.status(500).json({ message: "Error retrieving train schedule", error: err.message });
//     }
//   },

//   updateTrainSchedule: async (req, res) => {
//     const { schedule_ID, departure_Time, arrival_Time } = req.body;
//     try {
//       const result = await MainManagerModel.updateTrainSchedule(schedule_ID, departure_Time, arrival_Time);
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Train schedule not found" });
//       }
//       res.status(200).json({ message: "Train schedule updated successfully" });
//     } catch (err) {
//       console.error("Error updating train schedule:", err);
//       res.status(500).json({ message: "Error updating train schedule", error: err.message });
//     }
//   },

//   updateOrderStatus: async (req, res) => {
//     const { orderId } = req.params; // Get orderId from params
//     const { status } = req.body;
//     try {
//       const result = await MainManagerModel.updateOrderStatus(orderId, status); // Use orderId from params
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Order not found" });
//       }
//       res.status(200).json({ message: `Order ${orderId} status updated to ${status}` });
//     } catch (err) {
//       console.error("Error updating order status:", err);
//       res.status(500).json({ message: "Error updating order status", error: err.message });
//     }
//   },

//   scheduleTrip: async (req, res) => {
//     const { truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time } = req.body;

//     if (!truck_ID || !driver_ID || !assistant_ID || !store_ID || !route_ID || !start_time) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//       const currentDate = new Date().toISOString().split('T')[0];
//       const formattedStartTime = `${currentDate} ${start_time}:00`;
//       await MainManagerModel.scheduleTrip(truck_ID, driver_ID, assistant_ID, store_ID, route_ID, formattedStartTime);
//       res.status(200).json({ message: 'Trip scheduled successfully!' });
//     } catch (err) {
//       console.error('Error scheduling trip:', err);
//       res.status(500).json({ message: 'Failed to schedule trip', error: err.message });
//     }
//   }
// };

// module.exports = mainmanagerController;
