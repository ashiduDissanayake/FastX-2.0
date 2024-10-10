const db = require("../config/db");

const Cart = {
  // Get all products with the customer_ID
  getCart: (customerId) => {
    return new Promise((resolve, reject) => {
      const query = 'CALL GetCart(?)';
      db.query(query, [customerId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
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

  updateStatus: (customerId, productId, status) => {
    return new Promise((resolve, reject) => {
      const query = 'CALL UpdateCartStatus(?, ?, ?)';
      db.query(query, [customerId, productId, status], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0][0]);
        }
      });
    });
  },

  placeOrder: (customerId) => {
    return new Promise((resolve, reject) => {
      const query = 'CALL PlaceOrder(?)';
      db.query(query, [customerId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0][0]);
        }
      });
    });
  },
};

module.exports = Cart;
