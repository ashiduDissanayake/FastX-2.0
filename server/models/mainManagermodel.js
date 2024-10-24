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
    const query = 'SELECT o.order_id, o.order_date, o.status, o.route_id FROM `Order` o JOIN Route r ON o.route_id = r.route_ID WHERE o.status = ? AND r.store_id = 1;';
    db.query(query, ['Pending'], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getPendingOrdersStore2: (callback) => {
    const query = 'SELECT o.order_id, o.order_date, o.status, o.route_id FROM `Order` o JOIN Route r ON o.route_id = r.route_ID WHERE o.status = ? AND r.store_id = 2;';
    db.query(query, ['Pending'], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getPendingOrdersStore3: (callback) => {
    const query = 'SELECT o.order_id, o.order_date, o.status, o.route_id FROM `Order` o JOIN Route r ON o.route_id = r.route_ID WHERE o.status = ? AND r.store_id = 3;';
    db.query(query, ['Pending'], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getPendingOrdersStore4: (callback) => {
    const query = 'SELECT o.order_id, o.order_date, o.status, o.route_id FROM `Order` o JOIN Route r ON o.route_id = r.route_ID WHERE o.status = ? AND r.store_id = 4;';
    db.query(query, ['Pending'], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getPendingOrdersStore5: (callback) => {
    const query = 'SELECT o.order_id, o.order_date, o.status, o.route_id FROM `Order` o JOIN Route r ON o.route_id = r.route_ID WHERE o.status = ? AND r.store_id = 5;';
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
