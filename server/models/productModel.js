const db = require("../config/db");

const Product = {
    // Get All Products with error handling
    getAllProducts: (callback) => {
        const query = "CALL GetAllProducts()";
        db.query(query, (err, result) => {
            if (err) {
                // Log the error for debugging purposes
                console.error("Database query error:", err);
                // Pass error to the callback with a custom error message
                return callback({ message: "Database query failed", error: err }, null);
            }

            // Check if the result contains the 'message' field (meaning no products)
            if (result[0] && result[0][0] && result[0][0].message === "No products available.") {
                return callback({ message: "No products available" }, null);
            }

            // Return the products result on success
            return callback(null, result[0]);
        });
    },

// Create a new product in the database
create: (product, callback) => {
    const query = "CALL CreateProduct(?, ?, ?, ?)";
    
    // Execute the stored procedure
    db.query(query, [product.product_Name, product.price, product.image, product.description], (err, result) => {
      if (err) {
        // Log error for debugging purposes
        console.error("Database query error:", err);

        // Handle MySQL-specific errors and return custom error messages
        if (err.code === 'ER_DUP_ENTRY') {
          return callback({ message: "Product already exists", error: err }, null);
        } else if (err.code === 'ER_BAD_FIELD_ERROR') {
          return callback({ message: "Database field error", error: err }, null);
        } else {
          // General database error
          return callback({ message: "Database query failed", error: err }, null);
        }
      }

      // If no errors, return the result from the stored procedure
      if (result && result[0] && result[0][0].message) {
        return callback(null, { message: result[0][0].message });
      } else {
        return callback(null, { message: "Product created successfully" });
      }
    });
  },
};

module.exports = Product;