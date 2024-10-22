const db = require("../config/db");

const Product = {
  // Get All Products with error handling
   getAllProducts : (search, category) => {
    let query = `SELECT product_ID, product_Name, description, price, image_link, category FROM Product`;
    let params = [];
  
    if (search || category) {
      query += ` WHERE`;
      if (search) {
        query += ` LOWER(product_Name) LIKE LOWER(?)`;
        params.push(`%${search}%`);
      }
      if (category) {
        if (search) query += ` AND`;
        query += ` LOWER(category) = LOWER(?)`;
        params.push(category);
      }
    }
  
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
   

  // /app/models/productModel.js

  getProductById: (id, callback) => {
    const query = `
    SELECT *
    FROM Product 
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

  fetchProducts: (criteria, category, subcategory, minPrice, maxPrice, sortBy, limit) => {
    return new Promise((resolve, reject) => {
      // SQL procedure call based on the criteria
      const query = 'CALL FetchProducts(?, ?, ?, ?, ?, ?, ?)';
      const params = [criteria, category || 'all', subcategory || 'all', minPrice || 0, maxPrice || 10000, sortBy || 'newest', limit || 8];
  
      // Execute the procedure
      db.query(query, params, (error, results) => {
        if (error) {
          reject(error); // If there is an error, reject the promise
        } else {
          resolve(results[0]); // Resolve the results (first result set from the procedure)
        }
      });
    });
  },
};

module.exports = Product;
