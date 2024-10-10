const Cart = require("../models/cartModel");

// Handle errors
// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "Customer not found.") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.message === "email already registered") {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Product controller to handle product-related operations
const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    // Get all products using customer_ID in mysql
    const customerId = req.user.id;
    Cart.findByCustomerId(customerId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ cart: results });
    });
  },

  // Add product to cart
  addToCart: (req, res) => {
    const { product_ID, quantity } = req.body;
    const customer_ID = req.user.id; // Assumes customer_ID is available from authentication

    // Call the Cart model function to add product
    Cart.addToCart(customer_ID, product_ID, quantity, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Product added to cart", cart: result });
    });
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      await Product.update(req.params.id, req.body);
      res.json({ message: "Product updated" });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      await Product.delete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = productController;
