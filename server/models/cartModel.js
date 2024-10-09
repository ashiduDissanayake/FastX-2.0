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
};

module.exports = Cart;
