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
      if (
        result[0] &&
        result[0][0] &&
        result[0][0].message === "No products available."
      ) {
        return callback({ message: "No products available" }, null);
      }

      // Return the products result on success
      return callback(null, result[0]);
    });
  },

  // /app/models/productModel.js

  getProductById: (id, callback) => {
    const query = `
    SELECT *
    FROM product 
    WHERE product_ID = ?;
  `;

    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results[0]); // Return the first product (since IDs are unique)
    });
  },

  // Create a new product in the database
  create: (product, callback) => {
    const query = "CALL CreateProduct(?, ?, ?, ?, ?, ?, ?)";

    // Execute the stored procedure with all necessary parameters
    db.query(
      query,
      [
        product.product_Name,
        product.price,
        product.image_link,
        product.description,
        product.weight,
        product.volume,
        product.available_Qty,
      ],
      (err, result) => {
        if (err) {
          // Log error for debugging purposes
          console.error("Database query error:", err);

          // Handle MySQL-specific errors and return custom error messages
          if (err.code === "ER_DUP_ENTRY") {
            return callback(
              { message: "Product already exists", error: err },
              null
            );
          } else if (err.code === "ER_BAD_FIELD_ERROR") {
            return callback(
              { message: "Database field error", error: err },
              null
            );
          } else {
            // General database error
            return callback(
              { message: "Database query failed", error: err },
              null
            );
          }
        }

        // If no errors, return the result from the stored procedure
        if (result && result[0] && result[0][0].message) {
          return callback(null, { message: result[0][0].message });
        } else {
          return callback(null, { message: "Product created successfully" });
        }
      }
    );
  },

  // Get a product by ID
  findById: (productId, callback) => {
    const query = "CALL GetProductById(?)";
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return callback({ message: "Database query failed", error: err }, null);
      }
      if (result[0] && result[0][0].message === "Product not found") {
        return callback({ message: "Product not found" }, null);
      }
      return callback(null, result[0][0]);
    });
  },

  // Delete a product by ID
  delete: (productId, callback) => {
    const query = "CALL DeleteProductByID(?)";
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return callback({ message: "Database query failed", error: err }, null);
      }
      if (result[0] && result[0][0].message === "Product not found") {
        return callback({ message: "Product not found" }, null);
      }
      return callback(null, { message: "Product deleted" });
    });
  },

  // Update a product by ID
  update: (productId, updatedData, callback) => {
    const query = "CALL UpdateProductByID(?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [
        productId,
        updatedData.product_Name, // Ensure this is under 20 characters
        updatedData.price,
        updatedData.image_link,
        updatedData.description,
        updatedData.weight,
        updatedData.volume,
        updatedData.available_Qty,
      ],
      (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          return callback(
            { message: "Database query failed", error: err },
            null
          );
        }

        // Check if result exists and if there's a message
        if (result && result[0] && result[0][0]) {
          const message = result[0][0].message;

          if (message === "Product not found") {
            return callback({ message: "Product not found" }, null);
          } else {
            return callback(null, { message: message });
          }
        } else {
          return callback(null, { message: "Unknown result from database" });
        }
      }
    );
  },
};

module.exports = Product;
