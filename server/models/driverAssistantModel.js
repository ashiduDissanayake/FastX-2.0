const db = require("../config/db");

const DriverAssistant = {
  login: (username, password, callback) => {
    const query = "CALL DriverAssistantLogin(?, ?)";
    db.query(query, [username, password], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  getWorkingHoursByAssistantID: async (driverAssistantID) => {
    return new Promise((resolve, reject) => {
      const query = "CALL GetCurrentWorkingTimeByAssistantID(?)";
      db.query(query, [driverAssistantID], (error, results) => {
        if (error) {
          return reject(error);
        }

        if (results.length > 0 && results[0].length > 0) {
          resolve(results[0][0].current_working_time);
        } else {
          resolve(null); // Handle case where no data is returned
        }
      });
    });
  },

  getOrdersByTruckSchedule: async (driverAssistantID) => {
    return new Promise((resolve, reject) => {
      const query = "CALL GetOrdersByTruckSchedule(?)";
      db.query(query, [driverAssistantID], (error, results) => {
        if (error) {
          return reject(error);
        }
        // results[0] will contain the output of the stored procedure
        resolve(results[0]);
      });
    });
  },

  updateOrderStatus: (order_id, status) => {
    return new Promise((resolve, reject) => {
      const query = "CALL UpdateOrderStatus(?, ?)";
      db.query(query, [order_id, status], (error, results) => {
        if (error) {
          console.error("Error executing the stored procedure:", error);
          return reject(error);
        }
        // Check if the procedure execution was successful
        resolve(results[0][0].message || "Order status updated successfully.");
      });
    });
  },
};

module.exports = DriverAssistant;
