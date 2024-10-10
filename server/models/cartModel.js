const db = require("../config/db");

const Cart = {
  // Get all products with the customer_ID
  findByCustomerId: (customer_ID, callback) => {
    const query = `CALL GetCartProductsByCustomerID(?)`;

    db.query(query, [customer_ID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  // Add product to cart
  addToCart: (customer_ID, product_ID, quantity, callback) => {
    const query = `CALL AddProductToCart(?, ?, ?)`;

    db.query(query, [customer_ID, product_ID, quantity], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  },
  getAllStores: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Store';
      db.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },

  getEndLocations: (storeId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT R.route, R.route_ID 
        FROM Route R 
        JOIN Store S ON R.store_ID = S.store_ID 
        WHERE S.store_ID = ?`;
      db.query(query, [storeId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.map(row => ({
          route: row.route,
          route_ID: row.route_ID,
        })));
      });
    });
  },

  getRouteImage: (storeId, route) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT image_link FROM Route WHERE store_ID = ? AND route = ?';
      db.query(query, [storeId, route], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          resolve(results[0].image_link);
        } else {
          reject(new Error('No image found for the selected route'));
        }
      });
    });
  },

};

module.exports = Cart;
