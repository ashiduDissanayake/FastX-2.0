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
  getPendingOrders: (callback) => {
    const query = 'SELECT order_id, order_date, route_id, status FROM `Order` WHERE status = ?';
    db.query(query, ['Pending'], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
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
