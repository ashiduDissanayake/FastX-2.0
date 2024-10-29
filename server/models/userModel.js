const db = require("../config/db");
const bcrypt = require("bcrypt");

// User model
const User = {
  // Create new user
  create: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const query = "CALL CreateUser(?, ?, ?, ?, ?, ?, ?)";
        db.query(
          query,
          [
            userData.email,
            userData.username,
            hashedPassword,
            userData.firstName,
            userData.lastName,
            userData.phoneNumber,
            userData.userType,
          ],
          (err, result) => {
            if (err) {
              if (err.sqlState === "45000") {
                // Custom error for email already registered
                return reject(new Error("Email already registered"));
              }
              console.log(err);
              return reject(err);
            }
            // Assuming the stored procedure returns the inserted user ID
            const userId = result[0][0].user_id; // Adjust according to the actual response
            resolve(userId);
          }
        );
      } catch (err) {
        console.log(result[0][0]);
        reject(err);
      }
    });
  },

  // Method to login user
  login: async (email, password, callback) => {
    return new Promise((resolve, reject) => {
      // Query the database to find the user by email
      const query = "CALL GetUserByEmail(?)";

      db.query(query, [email], async (err, results) => {
        if (err) {
          if (err.sqlState === "45000") {
            return reject(new Error("incorrect email"));
          } else {
            return reject(err);
          }
        }

        const user = results[0][0];
        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
          return reject(new Error("incorrect password"));
        }

        resolve(user);
      });
    });
  },

  // Method to fetch user profile
  fetchUserProfile: (customerID) => {
    return new Promise((resolve, reject) => {
      const query = "CALL GetUserProfileByID(?)";

      db.query(query, [customerID], (error, results) => {
        if (error) {
          return reject(new Error("Database error fetching user profile"));
        }

        if (results[0].length > 0) {
          resolve(results[0][0]);
        } else {
          reject(new Error("User not found"));
        }
      });
    });
  },

  // Update user
  updateUserProfile: (
    customerID,
    email,
    username,
    firstName,
    lastName,
    phoneNumber
  ) => {
    return new Promise((resolve, reject) => {
      const query = "CALL UpdateUserProfile(?, ?, ?, ?, ?, ?)";

      db.query(
        query,
        [customerID, email, username, firstName, lastName, phoneNumber],
        (error, results) => {
          if (error) {
            // Pass the SQL error message back to the controller
            return reject(
              new Error(
                error.sqlMessage || "Database error updating user profile"
              )
            );
          }

          resolve(results);
        }
      );
    });
  },

  // Retrieve all orders of the user
  fetchCustomerOrders: (customerId) => {
    return new Promise((resolve, reject) => {
      const query = "CALL GetCustomerOrders(?)";

      db.query(query, [customerId], (error, results) => {
        if (error) {
          if (error.sqlMessage === "No orders found for this customer") {
            return resolve([]); // Resolve with an empty array for no orders
          }
          return reject(
            new Error(error.sqlMessage || "Database error retrieving orders")
          );
        }

        resolve(results[0]); // `results[0]` contains the main query result from the stored procedure
      });
    });
  },


  // payement using promise
  payment: (amount) => {
    return new Promise((resolve, reject) => {
      // Payment logic
      // Assuming the payment is successful
      // Write a payment logic
      // const success = Math.random() > 0.2;  // 80% chance of success
      // if (success) {
      //     res.status(200).json({ status: 'success', transactionId: 'dummy-transaction-id' });
      // } else {
      //     res.status(400).json({ status: 'failure', message: 'Payment failed' });
      // }
      const success = Math.random() > 0.2; // 80% chance of success
      if (!success) {
        return reject(new Error("Payment failed"));
      }
      resolve("Payment successful");
    });
  },
};

module.exports = User;
