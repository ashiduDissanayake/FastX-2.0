const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");

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
  return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
  }).replace(",", ""); // Remove the comma
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

  getStoreOrders: (req, res) => {
    const storeId = req.params.storeId;

    const sqlGet = `
      SELECT o.order_ID, o.route_ID, o.capacity
      FROM \`order\` o
      JOIN  store s USING (store_ID)
      WHERE s.store_ID = ? AND o.status = 'branch'
      ORDER BY o.Route_ID
    `;

    db.query(sqlGet, [storeId], (error, result) => {
        if (error) {
            console.error("Error executing SQL query:", error.message); // Log the error message
            return res.status(500).send({ message: "Error retrieving orders", error });
        }
        console.log("Orders retrieved:", result); // Log successful retrieval
        res.send(result);
    });
},

getActiveTripsByStore: async (req, res) => {
const storeID = req.params.storeId;

try {
    const query = `
        SELECT schedule_ID, truck_ID, driver_ID, assistant_ID, route_ID, start_time
        FROM truck_schedule
        WHERE store_ID = ? AND end_time IS NULL
    `;
    const [trips] = await db.promise().execute(query, [storeID]);

    if (trips.length === 0) {
        return res.status(404).send({ message: "No active trips found for the given store." });
    }

    // Format the start_time for better readability
    const formattedTrips = trips.map(trip => ({
        ...trip,
        start_time: formatDateTime(trip.start_time),  // Format start_time
    }));

    res.status(200).send(formattedTrips);
} catch (error) {
    console.error("Error fetching active trips for store:", error);
    res.status(500).send({ message: "Error fetching trips" });
}
},

  getScheduleTrip: (req, res) => {
    console.log("GET request received");
    res.send("Schedule Trip Endpoint");
  },

  endTrip: async (req, res) => {
    const { schedule_ID } = req.body;

    if (!schedule_ID) {
        return res.status(400).send({ message: "Trip ID is required to end the trip." });
    }

    try {
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current timestamp

        // Fetch the start_time, driver_ID, and assistant_ID from the trip
        const [tripData] = await db.promise().execute(`
            SELECT start_time, driver_ID, assistant_ID 
            FROM truck_schedule 
            WHERE schedule_ID = ?
        `, [schedule_ID]);

        if (!tripData.length) {
            return res.status(404).send({ message: "Trip not found." });
        }

        const { start_time, driver_ID, assistant_ID } = tripData[0];

        // Parse the start_time as a UTC time and current time as well
        const startTime = new Date(start_time);
        const endTime = new Date();  // No need to format, use the raw JS Date object for accuracy

        // Calculate the total working hours (end_time - start_time)
        const diffMilliseconds = endTime.getTime() - startTime.getTime(); // Time difference in milliseconds
        const diffHours = diffMilliseconds / (1000 * 60 * 60); // Convert to hours
        const roundedDiffHours = Math.round(diffHours * 100) / 100; // Round to two decimal places

        // Update the truck schedule to set the end_time
        await db.promise().execute(`
            UPDATE truck_schedule
            SET end_time = ?
            WHERE schedule_ID = ?
        `, [endTime.toISOString().slice(0, 19).replace('T', ' '), schedule_ID]); // Set accurate end time

        // Update the driver's working hours and set status to 'inactive'
        await db.promise().execute(`
            UPDATE driver
            SET current_working_time = current_working_time + ?, status = 'inactive'
            WHERE driver_ID = ?
        `, [roundedDiffHours, driver_ID]);

        // Check if an assistant is assigned and fetch assistant status
        if (assistant_ID) {
            const [assistantData] = await db.promise().execute(`
                SELECT status
                FROM driver_assistant
                WHERE assistant_ID = ?
            `, [assistant_ID]);

            if (assistantData.length > 0) {
                const assistantStatus = assistantData[0].status;
                let newStatus = 'available'; // Default to available after trip

                // Update assistant status based on their current status
                if (assistantStatus === 'active2') {
                    newStatus = 'inactive'; // Set to inactive if they are active2
                }

                // Update the assistant status
                await db.promise().execute(`
                    UPDATE driver_assistant
                    SET status = ?
                    WHERE assistant_ID = ?
                `, [newStatus, assistant_ID]);
            }
        }

        res.status(200).send({ message: "Trip ended successfully, driver and assistant updated!" });

    } catch (error) {
        console.error("Error ending trip:", error);
        res.status(500).send({ message: "Failed to end trip", error: error.message });
    }
},

getFinishedTripsByStore: async (req, res) => {
  const storeID = req.params.storeId;

  try {
      const query = `
          SELECT schedule_ID, truck_ID, driver_ID, assistant_ID, route_ID, start_time, end_time
          FROM truck_schedule
          WHERE store_ID = ? AND end_time IS NOT NULL
          ORDER BY end_time DESC
      `;
      const [trips] = await db.promise().execute(query, [storeID]);

      if (trips.length === 0) {
          return res.status(404).send({ message: "No finished trips found for the given store." });
      }

      // Format start_time, end_time and calculate duration
      const formattedTrips = trips.map(trip => ({
          ...trip,
          start_time: formatDateTime(trip.start_time),
          end_time: formatDateTime(trip.end_time),
          duration: calculateDuration(trip.start_time, trip.end_time) // Add duration field
      }));

      res.status(200).send(formattedTrips);
  } catch (error) {
      console.error("Error fetching finished trips for store:", error);
      res.status(500).send({ message: "Error fetching finished trips" });
  }
},

getTrainOrdersByStore: async (req, res) => {
  const storeID = req.params.storeId;

  try {
    const query = `
      SELECT order_ID, route_ID, capacity 
      FROM \`order\`
      WHERE store_ID = ? AND status = 'train'
    `;
    const [orders] = await db.promise().execute(query, [storeID]);

    if (orders.length === 0) {
      return res.status(404).send({ message: "No orders with status 'train' found for this store." });
    }

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching train orders:", error);
    res.status(500).send({ message: "Error fetching orders" });
  }
},

updateOrdersToBranch:async (req, res) => {
  const { storeID } = req.body;

  if (!storeID) {
    return res.status(400).send({ message: "Store ID is required." });
  }

  try {
    const query = `
      UPDATE \`order\`
      SET status = 'branch'
      WHERE store_ID = ? AND status = 'train'
    `;
    await db.promise().execute(query, [storeID]);

    res.status(200).send({ message: "All orders updated for the selected store!" });
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
        end_time,
        selectedOrders, // Get selected orders from the request body
    } = req.body;

    if (!truck_ID || !driver_ID || !assistant_ID || !store_ID || !route_ID || !start_time || selectedOrders.length === 0) {
        return res.status(400).send({ message: "All fields are required and at least one order must be selected." });
    }

    try {
        // Schedule the trip by inserting into truck_schedule
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
        const formattedStartTime = `${currentDate} ${start_time}:00`;

        const scheduleQuery = `
            INSERT INTO truck_schedule (truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        await db.promise().execute(scheduleQuery, [
            truck_ID, driver_ID, assistant_ID, store_ID, route_ID, formattedStartTime, null
        ]);

        // Convert selectedOrders array into a dynamic SQL placeholders string
        const placeholders = selectedOrders.map(() => '?').join(', ');

        // Update the status of selected orders to 'delivered'
        const orderUpdateQuery = `
            UPDATE \`order\`
            SET status = 'delivered'
            WHERE order_ID IN (${placeholders})
        `;

        // Execute the update query with selectedOrders
        await db.promise().execute(orderUpdateQuery, selectedOrders);

        res.status(200).send({ message: "Trip scheduled and orders updated successfully!" });
    } catch (error) {
        console.error("Error scheduling trip:", error);
        res.status(500).send({ message: "Failed to schedule trip", error: error.message });
    }
},

};

module.exports = managerController;
