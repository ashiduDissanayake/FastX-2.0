// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const db = require('../config/db');


// // dotenv config
// dotenv.config();

// const MainManagerModel = require('../models/mainManagermodel');

// // handle errors
// const handleErrors = (err) => {
//   let errors = { email: "", password: "" };

//   // incorrect email
//   if (err.message === "incorrect email") {
//     errors.email = "That email is not registered";
//   }

//   // incorrect password
//   if (err.message === "incorrect password") {
//     errors.password = "That password is incorrect";
//   }

//   // duplicate email error
//   if (err.message === "email already registered") {
//     errors.email = "that email is already registered";
//     return errors;
//   }

//   // validation errors
//   if (err.message.includes("user validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

// // create json web token
// // const maxAge = 3 * 24 * 60 * 60;
// // const createToken = (id) => {
// //   return jwt.sign({ id }, process.env.SECRET, {
// //     expiresIn: maxAge,
// //   });
// // };

// // Controller to handle requests
// const railwaymanagerController = {
//   getTrainSchedule: (req, res) => {
//     const sqlGet = "SELECT * FROM `TrainSchedule`"; // Adjust the table name as needed

//     db.query(sqlGet, (error, result) => {
//       if (error) {
//         return res.status(500).json({ message: "Error retrieving train schedule", error });
//       }
//       res.send(result);
//     });
//   },
//   updateTrainSchedule: (req, res) => {
//     const { schedule_ID, departure_Time, arrival_Time } = req.body; // Destructure incoming data
//     const sqlUpdate = "UPDATE `TrainSchedule` SET departure_Time = ?, arrival_Time = ? WHERE schedule_ID = ?"; // Adjust table name as needed

//     db.query(sqlUpdate, [departure_Time, arrival_Time, schedule_ID], (error, result) => {
//       if (error) {
//         return res.status(500).json({ message: "Error updating train schedule", error });
//       }
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Train schedule not found" });
//       }
//       res.status(200).json({ message: "Train schedule updated successfully" });
//     });
//   },
//   scheduleTrip: async (req, res) => {
//     const { truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time } = req.body;

//     if (!truck_ID || !driver_ID || !assistant_ID || !store_ID || !route_ID || !start_time) {
//       return res.status(400).send({ message: 'All fields are required.' });
//     }

//     try {
//       const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
//       const formattedStartTime = `${currentDate} ${start_time}:00`;

//       const query = `INSERT INTO truck_schedule (truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time)
//         VALUES (?, ?, ?, ?, ?, ?, ?);`;

//       await db.promise().execute(query, [truck_ID, driver_ID, assistant_ID, store_ID, route_ID, formattedStartTime, null]);

//       res.status(200).send({ message: 'Trip scheduled successfully!' });
//     } catch (error) {
//       console.error('Error scheduling trip:', error);
//       res.status(500).send({ message: 'Failed to schedule trip', error: error.message });
//     }
//   }
// };

// module.exports = railwaymanagerController;



const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const RailwayManager = require('../models/railwaymanagerModel');  // Updated model
const db = require('../config/db');

dotenv.config();

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.message === "email already registered") {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// Controller to handle requests
const railwaymanagerController = {
  getTrainSchedule: async (req, res) => {
    try {
      const result = await RailwayManager.getTrainSchedule();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error retrieving train schedule:', error);
      res.status(500).json({ message: 'Error retrieving train schedule', error: error.message });
    }
  },

  updateTrainSchedule: async (req, res) => {
    const { schedule_ID, departure_Time, arrival_Time } = req.body;

    if (!schedule_ID || !departure_Time || !arrival_Time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const result = await RailwayManager.updateTrainSchedule(schedule_ID, departure_Time, arrival_Time);
      res.status(200).json({ message: 'Train schedule updated successfully', result });
    } catch (error) {
      console.error('Error updating train schedule:', error);
      res.status(500).json({ message: 'Error updating train schedule', error: error.message });
    }
  },

  scheduleTrip: async (req, res) => {
    const { truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time } = req.body;

    if (!truck_ID || !driver_ID || !assistant_ID || !store_ID || !route_ID || !start_time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const formattedStartTime = `${currentDate} ${start_time}:00`;

      await RailwayManager.scheduleTrip({
        truck_ID,
        driver_ID,
        assistant_ID,
        store_ID,
        route_ID,
        start_time: formattedStartTime,
        end_time: end_time || null
      });

      res.status(200).send({ message: 'Trip scheduled successfully!' });
    } catch (error) {
      console.error('Error scheduling trip:', error);
      res.status(500).send({ message: 'Failed to schedule trip', error: error.message });
    }
  }
};

module.exports = railwaymanagerController;

