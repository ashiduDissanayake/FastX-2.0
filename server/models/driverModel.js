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
    


};

module.exports = DriverModel;