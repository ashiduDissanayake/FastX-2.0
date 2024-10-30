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
    const { username, password } = req.body;

    // Call the model to interact with the database
    Manager.login(username, password, (err, result) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Error occurred during login" });
      }

      const rows = result[0];

      // Check if login was successful
      if (rows.length > 0 && rows[0].login_message === "Login successful") {
        const manager_ID = rows[0].ManagerID;

        // Generate a JWT token
        const token = jwt.sign({ manager_ID, username }, process.env.SECRET4, {
          expiresIn: "1h",
        });

        res.cookie("managertoken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000,
        });

        return res.status(200).json({
          message: "Login successful",
          manager_ID,
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
    const token = req.cookies.managertoken; // Get the token from cookies
    if (!token) return res.json({ isAuthenticated: false });

    jwt.verify(token, process.env.SECRET4, (err, user) => {
      if (err) return res.json({ isAuthenticated: false });
      res.json({ isAuthenticated: true });
    });
  },

  // Logout user
  logoutManager: (req, res) => {
    res.cookie("managertoken", "", { maxAge: 1 });
    res.redirect("/");
  },

  // get driver details
  getDriverByStore: async (req, res) => {
    const managerID = req.user.manager_ID;

    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID;
      const drivers = await Manager.getDriversByStore(storeID);
      res.status(200).json(drivers);
    } catch (error) {
      console.error("Error retrieving drivers:", error.message);
      res.status(500).json({ message: "Error retrieving drivers", error });
    }
  },

  //get driver assistant details
  getDriverAssistant: async (req, res) => {
    const managerID = req.user.manager_ID;

    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID;
      const driverAssistants = await Manager.getDriverAssistantsByStore(
        storeID
      );
      res.status(200).json(driverAssistants);
    } catch (error) {
      console.error("Error retrieving driver assistants:", error.message);
      res
        .status(500)
        .json({ message: "Error retrieving driver assistants", error });
    }
  },

  //get truck details
  getTruck: async (req, res) => {
    const managerID = req.user.manager_ID;

    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID;
      const trucks = await Manager.getTrucksByStore(storeID);
      res.status(200).json(trucks);
    } catch (error) {
      console.error("Error retrieving trucks:", error.message);
      res.status(500).json({ message: "Error retrieving trucks", error });
    }
  },


  getRoute: async (req, res) => {
    const managerID = req.user.manager_ID;

    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID;
      const routes = await Manager.getRoutesByStore(storeID);
      res.status(200).json(routes);
    } catch (error) {
      console.error("Error retrieving routes:", error.message);
      res.status(500).json({ message: "Error retrieving routes", error });
    }
  },

  getStoreOrders: async (req, res) => {
    const managerID = req.user.manager_ID;
    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID;
      const orders = await Manager.getStoreOrders(storeID);
      console.log("Orders retrieved:", orders);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error retrieving orders:", error.message);
      res.status(500).json({ message: "Error retrieving orders", error });
    }
  },

  getActiveTripsByStore: async (req, res) => {
    const managerID = req.user.manager_ID;
    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID;
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

  endTrip: async (req, res) => {
    const { schedule_ID } = req.body;

    if (!schedule_ID) {
      return res
        .status(400)
        .send({ message: "Trip ID is required to end the trip." });
    }

    try {
      const result = await Manager.endTripById(schedule_ID);

      res.status(200).send(result);
    } catch (error) {
      console.error("Error ending trip:", error);
      res
        .status(500)
        .send({ message: "Failed to end trip", error: error.message });
    }
  },

  getFinishedTripsByStore: async (req, res) => {
    const managerID = req.user.manager_ID; // Get manager ID from token
    try {
      // Get storeID by calling the stored procedure
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      // Check if the result contains the storeID
      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID; // Extract store ID
      const trips = await Manager.getFinishedTripsByStore(storeID);

      if (trips.length === 0) {
        return res
          .status(404)
          .json({ message: "No finished trips found for the given store." });
      }

      // Format the trips before returning them
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
    const managerID = req.user.manager_ID; 

    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }

      const storeID = storeIDResult.store_ID; 
      const orders = await Manager.getTrainOrdersByStore(storeID);

      if (orders.length === 0) {
        return res.status(404).json({
          message: "No orders with status 'train' found for this store.",
        });
      }

      res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching train orders:", err);
      res
        .status(500)
        .json({
          error:
            err.message || "An error occurred while fetching train orders.",
        });
    }
  },

  updateOrdersToBranch: async (req, res) => {
    const managerID = req.user.manager_ID;
   
    try {
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }
      const storeID = storeIDResult.store_ID;   
      const result = await Manager.updateOrdersToBranch(storeID);
      res.status(200).send({ message: result.success_message });
    } catch (error) {
      console.error("Error updating orders to 'branch':", error);
      res
        .status(500)
        .send({ message: "Failed to update orders", error: error.message });
    }
  },

  scheduleTrip: async (req, res) => {
    const managerID = req.user.manager_ID;
    const {
      truck_ID,
      driver_ID,
      assistant_ID,
      route_ID,
      start_time,
      selectedOrders,
    } = req.body;

    if (
      !truck_ID ||
      !driver_ID ||
      !assistant_ID ||
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
      const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

      if (!storeIDResult || !storeIDResult.store_ID) {
        return res
          .status(404)
          .json({ message: "No store associated with this manager." });
      }
      const storeID = storeIDResult.store_ID; 
      const routeMaxTime = await Manager.getRouteMaxTime(route_ID);

      const driverHours = await Manager.checkDriverHours(driver_ID);
      if (driverHours + routeMaxTime > 40) {
        return res
          .status(400)
          .send({ message: "Driver exceeds the 40-hour working limit." });
      }

      const assistantHours = await Manager.checkAssistantHours(assistant_ID);
      if (assistantHours + routeMaxTime > 60) {
        return res
          .status(400)
          .send({ message: "Assistant exceeds the 60-hour working limit." });
      }

      const currentDate = new Date().toISOString().split("T")[0];
      const formattedStartTime = `${currentDate} ${start_time}:00`;

      const newScheduleId = await Manager.scheduleTrip([
        truck_ID,
        driver_ID,
        assistant_ID,
        storeID,
        route_ID,
        formattedStartTime,
      ]);

      const orderIds = selectedOrders.join(", ");

      await Manager.updateOrder(orderIds, newScheduleId);

      res
        .status(200)
        .send({ message: 'Trip scheduled and orders updated successfully.',
          scheduleId: newScheduleId,
          orderIds: orderIds.split(',') });
    } catch (error) {
      console.error("Error scheduling trip:", error);
      res
        .status(500)
        .send({ message: "Failed to schedule trip", error: error.message });
    }
  },

  getDashboardData: async (req, res) => {
    const managerID = req.user.manager_ID;
   
    try {
        const storeIDResult = await Manager.getStoreIDByManagerID(managerID);

        if (!storeIDResult || !storeIDResult.store_ID) {
            return res
                .status(404)
                .json({ message: "No store associated with this manager." });
        }

        const storeID = storeIDResult.store_ID;   
        const dashboardData = await Manager.getDashboardData(storeID);

        res.status(200).json({ data: dashboardData });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch dashboard data", error: error.message });
    }
},

};

module.exports = managerController;
