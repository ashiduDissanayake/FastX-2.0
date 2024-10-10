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
};

module.exports = Cart;
