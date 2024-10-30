const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");

// dotenv config
dotenv.config();

const MainManagerModel = require("../models/mainManagermodel");
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
  // Manager
  // get driver details
  mainManagerLogin: (req, res) => {
    const { username, password } = req.body;

    // Call the model to interact with the database
    MainManagerModel.login(username, password, (err, result) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Error occurred during login" });
      }

      const rows = result[0];

      // Check if login was successful
      if (rows.length > 0 && rows[0].message === "Successful login") {
        const mainmanager_id = rows[0].manager_id;

        // Generate a JWT token
        const token = jwt.sign(
          { mainmanager_id, username }, // Payload with some user info
          process.env.SECRET3, // Secret key
          { expiresIn: "1h" } // Token expiry (e.g., 1 hour)
        );

        // Set the token as an HTTP-only cookie (more secure)
        res.cookie("token", token, {
          httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
          maxAge: 3600000, // 1 hour in milliseconds
        });

        // Send response with login success and token
        return res.status(200).json({
          message: "Login successful",
          mainmanager_id,
          token, // Optional: Send the token in the response too
        });
      } else {
        return res.status(401).json({
          message: rows[0]
            ? rows[0].message
            : "Login failed: Incorrect username or password",
        });
      }
    });
  },

  // Check Auth
  checkAuth: (req, res) => {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) return res.json({ isAuthenticated: false });

    jwt.verify(token, process.env.SECRET3, (err, user) => {
      if (err) return res.json({ isAuthenticated: false });
      res.json({ isAuthenticated: true });
    });
  },

  // Logout user and save cart
  logout: async (req, res) => {
    try {
      // Clear the JWT cookie to log out the user
      res.cookie("token", "", { maxAge: 1 });

      // Send success response
      res.status(200).json({ message: "Mainmanager logged out" });
    } catch (err) {
      console.error("Error during logout:", err);
      res.status(500).json({ error: "Failed to log out Main manager" });
    }
  },

  getPendingOrdersStore1: (req, res) => {
    MainManagerModel.getPendingOrdersStore1((err, orders) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(orders);
    });
  },

  getSchedules: async (req, res) => {
    try {
      const schedules = await MainManagerModel.getAllTrain();
      res.status(200).json(schedules);
    } catch (error) {
      console.error("Error fetching train schedules:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getPendingOrdersStore2: (req, res) => {
    MainManagerModel.getPendingOrdersStore2((err, orders) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(orders);
    });
  },

  getPendingOrdersStore3: (req, res) => {
    MainManagerModel.getPendingOrdersStore3((err, orders) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(orders);
    });
  },

  getPendingOrdersStore4: (req, res) => {
    MainManagerModel.getPendingOrdersStore4((err, orders) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(orders);
    });
  },

  getPendingOrdersStore5: (req, res) => {
    MainManagerModel.getPendingOrdersStore5((err, orders) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(orders);
    });
  },

  getPendingOrdersStore6: (req, res) => {
    MainManagerModel.getPendingOrdersStore6((err, orders) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(orders);
    });
  },

  updateOrderStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    MainManagerModel.updateOrderStatus(id, status, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error updating order status" });
      }
      res.json({ message: "Order status updated successfully" });
    });
  },

  getDriver: (req, res) => {
    const storeId = req.params.storeId; // Get the storeId from the request parameters
    const sqlGet = "SELECT * FROM driver WHERE store_ID = ?";
    db.query(sqlGet, [storeId], (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error retrieving drivers", error });
      }
      res.send(result);
    });
  },

  //get driver assistant details
  getDriverAssistant: (req, res) => {
    const storeId = req.params.storeId; // Get the storeId from the request parameters
    const sqlGet = "SELECT * FROM driver_assistant WHERE store_ID = ?";
    db.query(sqlGet, [storeId], (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error retrieving driver assistents", error });
      }
      res.send(result);
    });
  },

  //get truck details
  getTruck: (req, res) => {
    const storeId = req.params.storeId;
    const sqlGet = "SELECT * FROM truck WHERE store_ID = ?";
    db.query(sqlGet, [storeId], (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error retrieving trucks", error });
      }
      res.send(result);
    });
  },

  //get order details
  getorder: (req, res) => {
    const sqlGet = "SELECT * FROM orders";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  },

  getselectorder: (req, res) => {
    const storeId = req.params.storeId;
    const sqlGet =
      "SELECT * FROM `order` WHERE store_ID = ? AND status='branch'";

    db.query(sqlGet, [storeId], (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error retrieving orders", error });
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

  getStore: (req, res) => {
    const sqlGet = "SELECT * FROM store";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  },
  getRoute: (req, res) => {
    const storeId = req.params.storeId;
    const sqlGet = "SELECT * FROM route WHERE store_ID = ?";
    db.query(sqlGet, [storeId], (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error retrieving routes", error });
      }
      res.send(result);
    });
  },


  getMainManagerDetails : async (req, res) => {
    try {
        
      const MainManagerID = req.user.mainmanager_id; // Get the driver ID from middleware
      console.log(MainManagerID);
      
      const mainmanager = await MainManagerModel.getMainManagerByID(MainManagerID);
  
      if (!mainmanager) {
        return res.status(404).json({ message: "Driver not found" });
      }
  
      res.json(mainmanager);
    } catch (error) {
      console.error("Error fetching driver details:", error);
      res.status(500).json({ message: "Server error" });
    }
  },



  getScheduleTrip: (req, res) => {
    console.log("GET request received");
    res.send("Schedule Trip Endpoint");
  },

  // Add this function to mainmanagerController
  getTrainCapacity: (req, res) => {
    const storeId = req.params.storeId;
    const sqlGet = "SELECT capacity FROM TrainSchedule WHERE store_ID = ?";

    db.query(sqlGet, [storeId], (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error retrieving train capacity", error });
      }
      res.send(result[0]); // Assuming the result contains capacity in the first object
    });
  },


  getRouteRevenue : async (req, res) => {
    
    const { store_id, date_range } = req.query;
    
    try {
        const revenueData = await MainManagerModel.getRouteRevenue(store_id, date_range);
        res.json(revenueData);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch route revenue.' });
    }
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
        return res
          .status(500)
          .json({ message: "Error retrieving train schedule", error });
      }
      res.send(result);
    });
  },
  updateTrainSchedule: (req, res) => {
    const { schedule_ID, departure_Time, arrival_Time } = req.body; // Destructure incoming data
    const sqlUpdate =
      "UPDATE `TrainSchedule` SET departure_Time = ?, arrival_Time = ? WHERE schedule_ID = ?"; // Adjust table name as needed

    db.query(
      sqlUpdate,
      [departure_Time, arrival_Time, schedule_ID],
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error updating train schedule", error });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Train schedule not found" });
        }
        res
          .status(200)
          .json({ message: "Train schedule updated successfully" });
      }
    );
  },

  getNearestCapacity: (req, res) => {
    const { storeId } = req.params;

    MainManagerModel.getNearestTrainCapacity(storeId, (error, results) => {
      if (error) {
        console.error("Error executing stored procedure:", error);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length > 0) {
        const { capacity, Availabale_capacity, departure_Time } = results[0];
        return res.json({ capacity, Availabale_capacity, departure_Time });
      } else {
        return res.status(404).json({ message: "No upcoming train found" });
      }
    });
  },

  reduceCapacity: (req, res) => {
    const { storeId } = req.params; // Get the storeId from the URL parameters
    const { capacity } = req.body; // Get the capacity from the request body

    MainManagerModel.reduceTrainCapacity(
      storeId,
      capacity,
      (error, results) => {
        if (error) {
          console.error("Error updating train capacity:", error);
          return res.status(500).json({ message: "Server error" }); // Handle errors
        }
        res.json({ message: "Train capacity updated" }); // Respond with a success message
      }
    );
  },

  // Backend code for updating order status

  getMostSoldItems: async (req, res) => {
    try {
      const results = await MainManagerModel.getMostSoldItems();
      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching most sold items:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch most sold items",
          error: error.message,
        });
    }
  },

  getSalesData: async (req, res) => {
    try {
      const revenuePast3Months =
        await MainManagerModel.getRevenuePastThreeMonths();
      const revenuePrev3Months =
        await MainManagerModel.getRevenuePreviousThreeMonths();
      const topSoldItems =
        await MainManagerModel.getTopProductsLastThreeMonths();

      res.json({
        revenue_past_3_months: revenuePast3Months,
        revenue_prev_3_months: revenuePrev3Months,
        top_sold_items: topSoldItems,
      });
    } catch (error) {
      console.error("Error fetching sales data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  scheduleTrip: async (req, res) => {
    const {
      truck_ID,
      driver_ID,
      assistant_ID,
      store_ID,
      route_ID,
      start_time,
      end_time,
    } = req.body;
    if (
      !truck_ID ||
      !driver_ID ||
      !assistant_ID ||
      !store_ID ||
      !route_ID ||
      !start_time
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
      const formattedStartTime = `${currentDate} ${start_time}:00`;
      const query = `INSERT INTO truck_schedule ( truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time)
          VALUES ( ?, ?, ?, ?, ?, ?, ?);`;
      await db
        .promise()
        .execute(query, [
          truck_ID,
          driver_ID,
          assistant_ID,
          store_ID,
          route_ID,
          formattedStartTime,
          null,
        ]);
      res.status(200).send({ message: "Trip scheduled successfully!" });
    } catch (error) {
      console.error("Error scheduling trip:", error);
      res
        .status(500)
        .send({ message: "Failed to schedule trip", error: error.message });
    }
  },
};

module.exports = mainmanagerController;

scheduleTrip: async (req, res) => {
  const {
    truck_ID,
    driver_ID,
    assistant_ID,
    store_ID,
    route_ID,
    start_time,
    end_time,
  } = req.body;

  if (
    !truck_ID ||
    !driver_ID ||
    !assistant_ID ||
    !store_ID ||
    !route_ID ||
    !start_time
  ) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    const formattedStartTime = `${currentDate} ${start_time}:00`;

    const query = `INSERT INTO truck_schedule ( truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time)
        VALUES ( ?, ?, ?, ?, ?, ?, ?);`;

    await db
      .promise()
      .execute(query, [
        truck_ID,
        driver_ID,
        assistant_ID,
        store_ID,
        route_ID,
        formattedStartTime,
        null,
      ]);

    res.status(200).send({ message: "Trip scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling trip:", error);
    res
      .status(500)
      .send({ message: "Failed to schedule trip", error: error.message });
  }
};

module.exports = mainmanagerController;
