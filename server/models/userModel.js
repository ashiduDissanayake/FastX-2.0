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

  // Update user
  update: (id, userData, callback) => {
    const query = "UPDATE users SET ? WHERE id = ?";
    db.query(query, [userData, id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete user
  delete: (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
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
