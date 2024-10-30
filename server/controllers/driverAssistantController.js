const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");
const Manager = require("../models/driverAssistantModel");
const DriverAssistant = require("../models/driverAssistantModel");

// dotenv config
dotenv.config();

const driverAssistantController = {


      loginDriverAssistant: (req, res) => {
        const { username, password } = req.body;
        console.log("Login attempt:", { username, password });
    
        // Call the model to interact with the database
        DriverAssistant.login(username, password, (err, result) => {
          if (err) {
            console.error("Error during login:", err);
            return res.status(500).json({ message: "Error occurred during login" });
          }
    
          const rows = result[0];
          console.log("Query result:", rows); // Log the result from the stored procedure
          console.log("Login message:", rows[0].message); // Log the login message
    
          // Check if login was successful
          if (rows.length > 0 && rows[0].message === "Login successful") {
            const driverAssistantID = rows[0].assistant_ID;
            console.log("Driver Assistant ID:", driverAssistantID);

    
            // Generate a JWT token
            const token = jwt.sign({ driverAssistantID, username }, process.env.SECRET5, {
              expiresIn: "1h",
            });
    
            res.cookie("driverassistanttoken", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 3600000,
            });
    
            return res.status(200).json({
              message: "Login successful",
              driverAssistantID,
              token,
            });
          } else {
            console.log(
              "Login failed:",
              rows[0] ? rows[0].message : "Incorrect credentials"
            ); // Log the failure
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
        const token = req.cookies.driverassistanttoken; // Get the token from cookies
        if (!token) return res.json({ isAuthenticated: false });
    
        jwt.verify(token, process.env.SECRET5, (err, user) => {
          console.log("User:", user);
          console.log("Error:", err);
          if (err) return res.json({ isAuthenticated: false });
          res.json({ isAuthenticated: true });
        });
      },
    
      // Logout user
      logoutDriverAssistant: (req, res) => {
        res.cookie("driverassistanttoken", "", { maxAge: 1 });
        res.redirect("/");
      },

    getWorkingHours: async (req, res) => {
        const driverAssistantID = req.user.driverAssistantID; // Assuming this comes from the JWT token
    
        try {
          // Query the database for the working hours of the driver assistant
          const workingHoursResult = await DriverAssistant.getWorkingHoursByAssistantID(driverAssistantID);
    
          // Check if the result is found
          if (!workingHoursResult) {
            return res.status(404).json({ message: "No working hours found for this driver assistant." });
          }
    
          // Send the working hours in the response
          res.status(200).json({ hours: workingHoursResult }); // Adjust based on your DB schema
        } catch (error) {
          console.error("Error retrieving working hours:", error.message);
          res.status(500).json({ message: "Error retrieving working hours", error });
        }
      },

      getordersbytruckschedule: async (req, res) => {
        const driverAssistantID = req.user.driverAssistantID; // Retrieved from the JWT token
      
        try {
          // Fetch the orders related to the driver's current truck schedule
          const orders = await DriverAssistant.getOrdersByTruckSchedule(driverAssistantID);
      
          // Check if orders were found
          if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this driver assistant." });
          }
      
          // Send the orders in the response
          res.status(200).json({ orders });
        } catch (error) {
          console.error("Error retrieving orders by truck schedule:", error.message);
          res.status(500).json({ message: "Error retrieving orders by truck schedule", error });
        }
      },


      getOrdersByTruckSchedule: async (req, res) => {
        const driverAssistantID = req.user.driverAssistantID; // Assuming user ID is in the token
        try {
          const orders = await DriverAssistant.getOrdersByTruckSchedule(driverAssistantID);
          res.json({ orders });
        } catch (error) {
          console.error("Error retrieving orders:", error);
          res.status(500).json({ message: "Failed to retrieve orders." });
        }
      },
      
      updateOrderStatus: async (req, res) => {
        const { order_id } = req.params;
        const { status } = req.body;
        try {
          const success = await DriverAssistant.updateOrderStatus(order_id, status);
          if (success) {
            res.json({ message: `Order status updated to ${status}.` });
          } else {
            res.status(404).json({ message: "Order not found." });
          }
        } catch (error) {
          console.error("Failed to update order status:", error);
          res.status(500).json({ message: "Could not update order status." });
        }
      },
    
};

module.exports = driverAssistantController;