const db = require("../config/db");

const Order = {
  placeOrder: async (userId, routeId, storeId, cartItems) => {
    return new Promise((resolve, reject) => {
      console.log(cartItems);
      const query = "CALL PlaceOrder(?, ?, ?, ?)";

      // Convert cart items to a JSON string to pass as an argument to the procedure
      const cartItemsJson = JSON.stringify(cartItems);

      db.query(
        query,
        [userId, storeId, routeId, cartItemsJson],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          // Resolve with the order ID from the result
          console.log(result)
          resolve({ orderId: result[0][0].order_id });
        }
      );
    });
  },
};

module.exports = Order;