const db = require("../config/db");

const OrderModel = {
  // Login function for Main Manager
  login: (username, password, callback) => {
    const query = 'CALL MainManagerLogin(?, ?)';
    db.query(query, [username, password], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  
  // Get pending orders
  getPendingOrdersStore1: (callback) => {
    const query = 'CALL GetOrdersByPriority(1)';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]); // Access the actual result set
    });
  },

  getAllTrainSchedules: (callback) => {
    const sqlGet = "SELECT * FROM `TrainSchedule`"; // Adjust the table name as needed
    db.query(sqlGet, (error, results) => {
        callback(error, results);
    });
  },

  getPendingOrdersStore2: (callback) => {
    const query = 'CALL GetOrdersByPriority(2)';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]); // Access the actual result set
    });
  },

  getPendingOrdersStore3: (callback) => {
    const query = 'CALL GetOrdersByPriority(3)';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]); // Access the actual result set
    });
  },
  getPendingOrdersStore4: (callback) => {
    const query = 'CALL GetOrdersByPriority(4)';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]); // Access the actual result set
    });
  },

  getPendingOrdersStore5: (callback) => {
    const query = 'CALL GetOrdersByPriority(5)';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]); // Access the actual result set
    });
  },


  // Update order status
  updateOrderStatus: (id, status, callback) => {
    const query = 'UPDATE `Order` SET status = ? WHERE order_id = ?';
    db.query(query, [status, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
};

module.exports = OrderModel;
