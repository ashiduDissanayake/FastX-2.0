// // const db = require("../config/db");


// // const login = (username, password, callback) => {
// //     const query = 'CALL MainManagerLogin(?, ?)';
// //     db.query(query, [username, password], (err, result) => {
// //         if (err) {
// //             return callback(err, null);
// //         }
// //         callback(null, result);
// //     });
// // };

// // module.exports = { login };

// const db = require('../config/db');
// const bcrypt = require('bcrypt');

// const MainManager = {
//   // Login function
//   login: async (username, password, callback) => {
//     try {
//       // Query to find the user by username
//       const query = "SELECT * FROM main_manager WHERE username = ?";
//       const [rows] = await db.promise().query(query, [username]);

//       // If no user is found
//       if (rows.length === 0) {
//         return callback({ message: "incorrect email" }, null);
//       }

//       const mainManager = rows[0];
      
//       // Compare provided password with the stored hashed password
//       const auth = await bcrypt.compare(password, mainManager.password);
      
//       if (!auth) {
//         return callback({ message: "incorrect password" }, null);
//       }

//       // If login is successful, return the main manager's ID
//       callback(null, [{ message: "Successful login", manager_id: mainManager.manager_id }]);
//     } catch (error) {
//       console.error("Error in MainManagerModel login:", error);
//       callback({ message: "An error occurred" }, null);
//     }
//   },

//   // Register function (if needed)
//   register: async (username, password, email, callback) => {
//     try {
//       // Check if email is already registered
//       const [existingUser] = await db.promise().query("SELECT * FROM main_manager WHERE email = ?", [email]);
//       if (existingUser.length > 0) {
//         return callback({ message: "email already registered" }, null);
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10); // Specify salt rounds for security
//       const hashedPassword = await bcrypt.hash(password, salt);

//       // Insert new manager into the database
//       const query = "INSERT INTO main_manager (username, password, email) VALUES (?, ?, ?)";
//       const [result] = await db.promise().query(query, [username, hashedPassword, email]);

//       // Return the new manager's ID
//       callback(null, { manager_id: result.insertId });
//     } catch (error) {
//       console.error("Error in MainManagerModel register:", error);
//       callback({ message: "An error occurred" }, null);
//     }
//   },

//   // Get all main managers (example of another function if required)
//   getAllManagers: async (callback) => {
//     try {
//       const [managers] = await db.promise().query("SELECT * FROM main_manager");
//       callback(null, managers);
//     } catch (error) {
//       console.error("Error retrieving main managers:", error);
//       callback({ message: "An error occurred while retrieving managers" }, null);
//     }
//   }
// };

// module.exports = MainManager;
