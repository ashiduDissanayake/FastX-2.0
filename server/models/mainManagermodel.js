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
      console.log(results[0]);
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

   getMainManagerByID : async (MainManagerID) => {
    try {
        const query = 'SELECT name, email FROM mainmanager WHERE mainmanager_id = ?';
        const [results] = await db.query(query, [MainManagerID]);
        
        return results[0]; // Return the first row if a manager is found
    } catch (error) {
        console.error('Error fetching main manager:', error.message);
        throw error;
    }
},



getMostSoldProducts : (storeId, daysRange) => {
  const query = `CALL GetMostSoldProducts(?, ?);`;

  return new Promise((resolve, reject) => {
    db.query(query, [storeId, daysRange], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
},


getTopCustomerByStore(storeId) {
  console.log(storeId);
  return new Promise((resolve, reject) => {
    db.query(`CALL GetTopCustomerByStore(?)`, [storeId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log(results);
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


   getRouteRevenue : (store_id, date_range) => {
    return new Promise((resolve, reject) => {
        const query = 'CALL GetRouteRevenueByStoreAndDateRange(?, ?)';
        
        db.query(query, [store_id, date_range], (error, results) => {
            if (error) {
                console.log('Error occurred:', error.message); // Log error details
                return reject(error); // Reject the promise with the error
            }
            
            
            console.log(results[0]);
            resolve(results[0]); // Resolve the promise with the first result set
        });
    });
},



  getPendingOrdersStore6: (callback) => {
    const query = 'CALL GetOrdersByPriority(6)';
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
  },
  getWeeklyOrderStats: () => {
    return new Promise((resolve, reject) => {
        const query = 'CALL GetWeeklyOrderStats()';
        
        db.query(query, (error, result) => {
            if (error) return reject(error); // Reject the promise if there's an error
            resolve(result[1]); // Resolve the promise with the result
        });
    });
},

getTrendingProducts: () => {
  return new Promise((resolve, reject) => {
    const query = `CALL GetTredingProductsChart()`;
    
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results[0]); // Return only the data without metadata
    });
  });
},
  
};

module.exports = MainManagerModel;
