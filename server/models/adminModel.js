const db = require("../config/db");
const bcrypt = require("bcrypt");

// User model
const Admin = {
  // Create new user
  create: async (userData, callback) => {
    const salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(userData.password, salt);

    const query = "CALL CreateUser(?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        userData.email,
        userData.username,
        hashedPassword,
        userData.firstname,
        userData.lastname,
        userData.phonenumber,
        userData.type,
      ],
      (err, result) => {
        if (err) {
          if (err.sqlState === "45000") {
            // Custom error for email all ready registered
            throw Error("email already registered");
          }
          return callback(err, null);
        }
        return callback(null, result);
      }
    );
  },

  // Method to login user
  login: async (email, password, callback) => {
    const query = "CALL GetUserByEmail(?)";

    db.query(query, [email], async (err, result) => {
      if (err) {
        // Handle SQL error (including custom errors from the stored procedure)
        if (err.sqlState === "45000") {
          return callback(new Error("incorrect email"), null); // Return error through callback
        }
        return callback(err, null); // Handle any other SQL errors
      }

      const user = result[0][0];
      const auth = await bcrypt.compare(password, user.password);

      if (auth) {
        return callback(null, user); // Return user on success
      } else {
        return callback(new Error("incorrect password"), null); // Handle incorrect password
      }
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
};

module.exports = Admin;
