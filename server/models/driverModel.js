const db = require("../config/db");

const DriverModel = {
    login: (username, password, callback) => {

        
        const query = 'CALL DriverLogin(?, ?)';
        db.query(query, [username, password], (err, result) => {
          if (err) {
            
            return callback(err, null);
          }
          
          callback(null, result);
        });
      },
      findById: (driver_ID, callback) => {
        const sql = 'CALL GetOrdersByClosestSchedule(?)';
        db.query(sql, [driver_ID], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);  // Only return the list of orders
        });
    },
    
    updateOrderStatusToDelivered: (order_id, callback) => {
      const sql = 'CALL UpdateOrderStatusToDelivered(?)';
      db.query(sql, [order_id], (err, results) => {
          if (err) return callback(err);
          callback(null, results);
      });
  },

   getAllSchedules(callback) {
    const sql = 'SELECT * FROM TruckSchedule';
    db.query(sql, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },

  getDriverByID(driverID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT driver_ID, status, store_ID, current_working_time FROM Driver WHERE driver_ID = ?';

      db.query(query, [driverID], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]); // Return the first row if a driver is found
      });
    });
  }
    


};

module.exports = DriverModel;