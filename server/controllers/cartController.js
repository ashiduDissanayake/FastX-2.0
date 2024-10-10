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

  // Delete product
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const result = await Cart.removeProduct(req.user.id, productId);
      res.json(result);
    } catch (err) {
      console.error('Error removing product from cart:', err);
      res.status(500).json({ error: "An error occurred while removing the product from the cart" });
    }
  },

  // Update product
  updateProductInCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const customerId = req.user.id; // Assuming the user ID is stored in the token
      const result = await Cart.updateCart(customerId, productId, quantity);
      res.json(result);
    } catch (err) {
      console.error('Error updating cart:', err);
      res.status(500).json({ error: "An error occurred while updating the cart" });
    }
  },

  // Place order
  placeOrder: async (req, res) => {
    try {
      const { products } = req.body;
      const customerId = req.user.id; // Assuming the user ID is stored in the token
      // Call the Cart model function to place order
      const result = await Cart.placeOrder(customerId, products);
      res.json(result);
    } catch (err) {
      console.error('Error placing order:', err);
      res.status(500).json({ error: "An error occurred while placing the order" });
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
  
  getStores: async (req, res) => {
    try {
      const stores = await Cart.getAllStores();
      res.json(stores);
    } catch (error) {
      console.error('Error fetching store names:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  getEndLocations: async (req, res) => {
    const storeId = req.params.store;
    try {
      const endLocations = await Cart.getEndLocations(storeId);
      res.json(endLocations);
    } catch (error) {
      console.error('Error fetching end locations:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  getRouteImage: async (req, res) => {
    const { store, endLocation } = req.query;
    try {
      const imageLink = await Cart.getRouteImage(store, endLocation);
      res.json({ imageLink });
    } catch (error) {
      if (error.message === 'No image found for the selected route') {
        res.status(404).json({ error: error.message });
      } else {
        console.error('Error fetching image link:', error);
        res.status(500).json({ error: 'Database error' });
      }
    }
  },

};

module.exports = productController;
