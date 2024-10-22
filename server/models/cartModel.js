const db = require("../config/db");

const Cart = {
  // Get all products with the customer_ID
  getCart: (customerId) => {
    return new Promise((resolve, reject) => {
      const query = "CALL GetCart(?)";
      db.query(query, [customerId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]); // Assuming result[0] contains the cart items
      });
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

  // Delete product from cart
  removeProduct: (customerId, productId) => {
    return new Promise((resolve, reject) => {
      const query = "CALL RemoveProductFromCart(?, ?)";
      db.query(query, [customerId, productId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0][0]); // Extract the message from the stored procedure result
        }
      });
    });
  },

  // Function to save cart items using the stored procedure
  saveCartItem: (userId, productId, quantity) => {
    return new Promise((resolve, reject) => {
      const query = "CALL SaveCartItem(?, ?, ?)";
      db.query(query, [userId, productId, quantity], (err, result) => {
        if (err) {
          return reject(err); // Handle any errors
        }
        resolve(result); // Resolve the result if successful
      });
    });
  },

  // Update product in cart
  updateCart: (customerId, productId, quantity) => {
    return new Promise((resolve, reject) => {
      const query = "CALL UpdateProductQuantityInCart(?, ?, ?)";
      db.query(query, [customerId, productId, quantity], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0][0]); // Extract the message from the stored procedure result
        }
      });
    });
  },

  getAllStores: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Store";
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
        resolve(
          results.map((row) => ({
            route: row.route,
            route_ID: row.route_ID,
          }))
        );
      });
    });
  },

  getRouteImage: (storeId, route) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT image_link FROM Route WHERE store_ID = ? AND route = ?";
      db.query(query, [storeId, route], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          resolve(results[0].image_link);
        } else {
          reject(new Error("No image found for the selected route"));
        }
      });
    });
  },

  updateStatus: (customerId, productId, status) => {
    return new Promise((resolve, reject) => {
      const query = "CALL UpdateCartStatus(?, ?, ?)";
      db.query(query, [customerId, productId, status], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0][0]);
        }
      });
    });
  },

  placeOrder: (customerId, storeId, routeId) => {
    //using promise
    return new Promise((resolve, reject) => {
      const query = "CALL PlaceOrder(?, ?, ?)";
      db.query(query, [customerId, storeId, routeId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0][0]);
      });
    })
  },

  clearCart: (userId) => {
    return new Promise((resolve, reject) => {
        // Delete all items from Cart_Items and Cart for the user
        db.query(
            "DELETE FROM Cart_Items WHERE cart_id = (SELECT cart_id FROM Cart WHERE customer_ID = ?); DELETE FROM Cart WHERE customer_ID = ?;",
            [userId, userId],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
  },
};

module.exports = Cart;
