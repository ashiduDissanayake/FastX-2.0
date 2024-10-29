const Cart = require("../models/cartModel");

// Product controller to handle product-related operations
const productController = {
  // Get all products
  getCart: async (req, res) => {
    try {
      const customerId = req.user.id; // Assuming the customer ID is available from req.user
      const cartItems = await Cart.getCart(customerId);
      res.status(200).json({ cart: cartItems });
    } catch (err) {
      console.error("Error fetching cart:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the cart" });
    }
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
      console.error("Error removing product from cart:", err);
      res
        .status(500)
        .json({
          error: "An error occurred while removing the product from the cart",
        });
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
      console.error("Error updating cart:", err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the cart" });
    }
  },

  // Update cart status
  updateCartStatus: async (req, res) => {
    try {
      const { productId, status } = req.body;
      const customerId = req.user.id;
      const result = await Cart.updateStatus(customerId, productId, status);
      res.json(result);
    } catch (err) {
      console.error("Error updating cart status:", err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the cart status" });
    }
  },

  placeOrder: async (req, res) => {
    try {
      const customerId = req.user.id;
      const { route_ID } = req.body;
      const result = await Cart.placeOrder(customerId, route_ID);
      res.json(result);
    } catch (err) {
      console.error("Error placing order:", err);
      res
        .status(500)
        .json({ error: "An error occurred while placing the order" });
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

  // Method to get all stores
  getStores: async (req, res) => {
    try {
      const stores = await Cart.getAllStores();
      res.json(stores);
    } catch (error) {
      console.error("Error fetching store names:", error);
      res.status(500).json({ error: "Failed to fetch stores. Please try again." });
    }
  },

  getEndLocations: async (req, res) => {
    const { store } = req.params;
    if (!store) {
      return res.status(400).json({ error: "Store ID is required" });
    }

    try {
      const endLocations = await Cart.getEndLocations(store);
      res.json(endLocations);
    } catch (error) {
      console.error("Error fetching end locations:", error);
      res.status(500).json({ error: "Failed to fetch end locations. Please try again." });
    }
  },

  getRouteImage: async (req, res) => {
    const { store, route } = req.query;
    if (!store || !route) {
      return res.status(400).json({ error: "Store and route are required" });
    }

    try {
      const imageLink = await Cart.getRouteImage(store, route);
      res.json({ imageLink });
    } catch (error) {
      console.error("Error fetching route image:", error);
      if (error.message === "No image found for the selected route") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to fetch route image. Please try again." });
      }
    }
  }
};

module.exports = productController;
