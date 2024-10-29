const db = require("../config/db");

const MainManagerModel = {
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

  getNearestTrainCapacity: (storeId, callback) => {
    const query = 'CALL GetNearestTrainCapacity(?)';
    db.query(query, [storeId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  },

  reduceTrainCapacity: (storeId, capacity, callback) => {
    const updateQuery = `
      UPDATE TrainSchedule
      SET Availabale_capacity = Availabale_capacity - ?
      WHERE store_id = ? AND arrival_time >= NOW()
      ORDER BY arrival_time ASC
      LIMIT 1;
    `;
    
    db.query(updateQuery, [capacity, storeId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
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

  getMainManagerByID(MainManagerID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT name, email FROM mainmanager WHERE mainmanager_id = ?';

      db.query(query, [MainManagerID], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]); // Return the first row if a driver is found
      });
    });
  },
  


   async getMostSoldItems() {
    const query = `
        SELECT p.product_Name, SUM(oi.quantity) AS total_quantity
        FROM OrderItem oi
        JOIN Product p ON oi.product_id = p.product_ID
        GROUP BY p.product_Name
        ORDER BY total_quantity DESC
        LIMIT 10;
    `;
    
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
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

  getRevenuePastThreeMonths: () => {
    return new Promise((resolve, reject) => {
        db.query(`CALL GetRevenuePastThreeMonths()`, (error, results) => {
            if (error) return reject(error);
            resolve(results[0][0].revenue_past_3_months);
        });
    });
},

getRevenuePreviousThreeMonths: () => {
    return new Promise((resolve, reject) => {
        db.query(`CALL GetRevenuePreviousThreeMonths()`, (error, results) => {
            if (error) return reject(error);
            resolve(results[0][0].revenue_prev_3_months);
        });
    });
},

getTopProductsLastThreeMonths: () => {
    return new Promise((resolve, reject) => {
        db.query(`CALL GetTopProductsLastThreeMonths()`, (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
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

module.exports = MainManagerModel;
