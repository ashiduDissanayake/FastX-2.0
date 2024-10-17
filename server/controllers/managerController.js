const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");
const Manager = require("../models/managerModel");

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

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", ""); // Remove the comma
};

const calculateDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate - startDate; // Difference in milliseconds
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert ms to hours
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes
  return `${diffHours}h ${diffMinutes}m`;
};

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.SECRET, {
//     expiresIn: maxAge,
//   });
// };

// Controller to handle requests
const managerController = {
  // Create new user
  createManager: async (req, res) => {
    const {
      email,
      username,
      password,
      firstname,
      lastname,
      phonenumber,
      type,
    } = req.body;

    // Call the create function from the user model
    User.create(
      { email, username, password, firstname, lastname, phonenumber, type },
      (err, result) => {
        if (err) {
          const errors = handleErrors(err);
          return res.status(400).json({ errors });
        }

        // Assuming your stored procedure returns the user ID
        const userId = result;

        // Create JWT token
        const token = createToken(userId);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: userId });
      }
    );
  },

  // Login user
  loginManager: (req, res) => {
    const { email, password } = req.body;

    Manager.login(email, password, (err, user) => {
      if (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors }); // Send the error response
      }
      // Create JWT token
      const token = createToken(user.customer_ID);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user.customer_ID }); // Send user ID in response
    });
  },

  // Check Auth
  checkAuth: (req, res) => {
    const token = req.cookies.jwt; // Get the token from cookies
    if (!token) return res.json({ isAuthenticated: false });

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.json({ isAuthenticated: false });
      res.json({ isAuthenticated: true });
    });
  },

  // Logout user
  logoutManager: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  },

  // get driver details
  getDriverByStoreId: async (req, res) => {
    const storeId = req.params.storeId; // Get the store ID from request parameters

    try {
      const drivers = await Manager.getDriversByStore(storeId); 
      res.status(200).json(drivers); 
    } catch (error) {
      console.error("Error retrieving drivers:", error.message); 
      res.status(500).json({ message: "Error retrieving drivers", error }); 
    }
  },

  //get driver assistant details
  getDriverAssistant: async (req, res) => {
    const storeId = req.params.storeId;

    try {
      const driverAssistants = await Manager.getDriverAssistantsByStore(storeId);
      res.status(200).json(driverAssistants); 
    } catch (error) {
      console.error("Error retrieving driver assistants:", error.message); 
      res.status(500).json({ message: "Error retrieving driver assistants", error }); 
    }
  },

  //get truck details
  getTruck: async (req, res) => {
    const storeId = req.params.storeId; // Get the store ID from request parameters

    try {
      const trucks = await Manager.getTrucksByStore(storeId); 
      res.status(200).json(trucks); 
    } catch (error) {
      console.error("Error retrieving trucks:", error.message); 
      res.status(500).json({ message: "Error retrieving trucks", error }); 
    }
  },

  getStore: async (req, res) => {
    try {
      const stores = await Manager.getAllStores();
      res.status(200).json(stores); 
    } catch (error) {
      console.error("Error fetching stores:", error);
      res.status(500).json({ error: "An error occurred while fetching stores." });
    }
  },

  getRoute: async (req, res) => {
    const storeId = req.params.storeId; // Get the store ID from request parameters

    try {
      const routes = await Manager.getRoutesByStore(storeId); 
      res.status(200).json(routes); 
    } catch (error) {
      console.error("Error retrieving routes:", error.message);
      res.status(500).json({ message: "Error retrieving routes", error }); 
    }
  },

  getStoreOrders: async (req, res) => {
    const storeId = req.params.storeId; 

    try {
      const orders = await Manager.getStoreOrders(storeId); 
      console.log("Orders retrieved:", orders); 
      res.status(200).json(orders); 
    } catch (error) {
      console.error("Error retrieving orders:", error.message);
      res.status(500).json({ message: "Error retrieving orders", error }); 
    }
  },

  getActiveTripsByStore: async (req, res) => {
    try {
      const storeID = req.params.storeId; // Get the store ID from request parameters
      const trips = await Manager.getActiveTripsByStore(storeID);

      const formattedTrips = trips.map((trip) => ({
        ...trip,
        start_time: formatDateTime(trip.start_time),
      }));

      res.json(formattedTrips);
    } catch (err) {
      console.error("Error fetching active trips for store:", err);
      res.status(500).json({
        error: err.message || "An error occurred while fetching active trips.",
      });
    }
  },

  // getScheduleTrip: (req, res) => {
  //   console.log("GET request received");
  //   res.send("Schedule Trip Endpoint");
  // },

  endTrip: async (req, res) => {
    const { schedule_ID } = req.body;

    if (!schedule_ID) {
      return res.status(400).send({ message: "Trip ID is required to end the trip." });
    }

    try {
      const result = await Manager.endTripById(schedule_ID);
      
      res.status(200).send(result);
    } catch (error) {
      console.error("Error ending trip:", error);
      res.status(500).send({ message: "Failed to end trip", error: error.message });
    }
  },

  getFinishedTripsByStore: async (req, res) => {
    const storeID = req.params.storeId;

    try {
      const trips = await Manager.getFinishedTripsByStore(storeID);

      if (trips.length === 0) {
        return res
          .status(404)
          .json({ message: "No finished trips found for the given store." });
      }

      const formattedTrips = trips.map((trip) => ({
        ...trip,
        start_time: formatDateTime(trip.start_time),
        end_time: formatDateTime(trip.end_time),
        duration: calculateDuration(trip.start_time, trip.end_time),
      }));

      res.json(formattedTrips);
    } catch (err) {
      console.error("Error fetching finished trips for store:", err);
      res.status(500).json({
        error:
          err.message || "An error occurred while fetching finished trips.",
      });
    }
  },

  getTrainOrdersByStore: async (req, res) => {
    const storeID = req.params.storeId; 

    try {
      const orders = await Manager.getTrainOrdersByStore(storeID); 

      if (orders.length === 0) {
        return res.status(404).json({
          message: "No orders with status 'train' found for this store.",
        });
      }

      res.status(200).json(orders); 
    } catch (err) {
      console.error("Error fetching train orders:", err);
      res.status(500).json({ error: err.message || "An error occurred while fetching train orders." });
    }
  },

  updateOrdersToBranch: async (req, res) => {
    const { storeID } = req.body;

    if (!storeID) {
      return res.status(400).send({ message: "Store ID is required." });
    }

    try {
      const result = await Manager.updateOrdersToBranch(storeID);
      res.status(200).send({ message: result.success_message }); 
    } catch (error) {
      console.error("Error updating orders to 'branch':", error);
      res.status(500).send({ message: "Failed to update orders", error: error.message });
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
        selectedOrders,
    } = req.body;

    if (
        !truck_ID ||
        !driver_ID ||
        !assistant_ID ||
        !store_ID ||
        !route_ID ||
        !start_time ||
        selectedOrders.length === 0
    ) {
        return res.status(400).send({
            message:
                "All fields are required and at least one order must be selected.",
        });
    }

    try {
        const routeMaxTime = await Manager.getRouteMaxTime(route_ID);

        const driverHours = await Manager.checkDriverHours(driver_ID);
        if (driverHours + routeMaxTime > 40) {
            return res.status(400).send({ message: "Driver exceeds the 40-hour working limit." });
        }

        const assistantHours = await Manager.checkAssistantHours(assistant_ID);
        if (assistantHours + routeMaxTime > 60) {
            return res.status(400).send({ message: "Assistant exceeds the 60-hour working limit." });
        }

        const currentDate = new Date().toISOString().split("T")[0];
        const formattedStartTime = `${currentDate} ${start_time}:00`;

        await Manager.scheduleTrip([
            truck_ID,
            driver_ID,
            assistant_ID,
            store_ID,
            route_ID,
            formattedStartTime,
        ]);

        const orderIds = selectedOrders.join(", ");

        await Manager.updateOrderStatus(orderIds);

        res.status(200).send({ message: "Trip scheduled and orders updated successfully!" });
    } catch (error) {
        console.error("Error scheduling trip:", error);
        res.status(500).send({ message: "Failed to schedule trip", error: error.message });
    }
},


};

module.exports = managerController;
