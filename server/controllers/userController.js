const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");

// dotenv config
dotenv.config();

// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.message === "Email already registered") {
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

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

// Controller to handle requests
const userController = {
  // Create new user
  createUser: async (req, res) => {
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      phoneNumber,
      userType,
    } = req.body;

    try {
      // Call the create function from the user model
      const userId = await User.create({
        email,
        username,
        password,
        firstName,
        lastName,
        phoneNumber,
        userType,
      });

      // Create JWT token after user is created
      const token = createToken(userId);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      res.status(201).json({ user: userId });
    } catch (err) {
      const errors = handleErrors(err);
      return res.status(400).json({ errors });
    }
  },

  // loginUser: async function with Promises
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Attempt to login the user by calling User.login which returns a promise
      const user = await User.login(email, password);

      // Create JWT token
      const token = createToken(user.customer_ID);

      // Set the token as an HTTP-only cookie
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

      // Respond with the user ID
      res.status(200).json({ user: user.customer_ID });
    } catch (err) {
      const errors = handleErrors(err);
      return res.status(400).json({ errors }); // Send error response
    }
  },

  // Check Auth
  checkAuth: (req, res) => {
    const token = req.cookies.jwt; // Get the token from cookies
    if (!token) return res.json({ isAuthenticated: false });

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.json({ isAuthenticated: false });
      res.json({ isAuthenticated: true });
    });
  },

  // Logout user and save cart
  logoutUser: async (req, res) => {
    const { cartItems } = req.body; // Get cart items from the request body
    const userId = req.user.id; // Assuming the user ID is available in req.user

    try {
      // If cartItems are provided, save them using the model
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        // Save each cart item using the stored procedure via the model
        for (const item of cartItems) {
          const { productId, quantity } = item;
          await Cart.saveCartItem(userId, productId, quantity); // Call the model function
        }
      }

      // Clear the JWT cookie to log out the user
      res.cookie("jwt", "", { maxAge: 1 });

      // Send success response
      res.status(200).json({ message: "Cart saved and user logged out" });
    } catch (err) {
      console.error("Error during logout and cart save:", err);
      res.status(500).json({ error: "Failed to save cart or log out user" });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      const user = await User.fetchUserProfile(req.user.id);
      res.json(user);
    } catch (error) {
      const statusCode = error.message === "User not found" ? 404 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  updateProfile: async (req, res) => {
    const { email, username, first_name, last_name, phone_number } = req.body;

    try {
      const results = await User.updateUserProfile(
        req.user.id,
        email,
        username,
        first_name,
        last_name,
        phone_number
      );

      res.json({ message: "Profile updated successfully", results });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getOrders: async (req, res) => {
    const customerId = req.user.id;

    try {
      const orders = await User.fetchCustomerOrders(customerId);

      if (orders.length === 0) {
        // Return a specific message if there are no orders
        return res
          .status(404)
          .json({ message: "No orders found for this customer" });
      }

      // Group orders by `order_id`
      const groupedOrders = orders.reduce((acc, order) => {
        const {
          order_id,
          order_date,
          status,
          total_amount,
          product_Name,
          image_link,
          quantity,
          price,
        } = order;

        if (!acc[order_id]) {
          acc[order_id] = {
            order_id,
            order_date,
            status,
            total_amount,
            items: [],
          };
        }

        acc[order_id].items.push({
          product_Name,
          image_link,
          quantity,
          price,
        });

        return acc;
      }, {});

      res.status(200).json(Object.values(groupedOrders));
    } catch (error) {
      console.error("Detailed error:", error);
      res
        .status(500)
        .json({ message: "Error retrieving orders", error: error.message });
    }
  },

  // Get all products with error handling
  getAllProducts: async (req, res) => {
    const search = req.query.search || "";
    const category = req.query.category || "";

    try {
      const results = await Product.getAllProducts(search, category);

      if (results.length === 0) {
        return res.json({ message: "No products found" });
      }

      return res.json(results);
    } catch (err) {
      return res.status(500).json({ error: "Database query error" });
    }
  },

  // Post a product
  postProduct: (req, res) => {
    const {
      product_Name,
      price,
      image,
      description,
      weight,
      volume,
      available_Qty,
    } = req.body;

    // Validate input data (you can add more validation logic as needed)
    if (
      !product_Name ||
      !price ||
      !image ||
      !description ||
      !weight ||
      !volume ||
      !available_Qty
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate numerical fields
    if (
      isNaN(price) ||
      isNaN(weight) ||
      isNaN(volume) ||
      isNaN(available_Qty)
    ) {
      return res.status(400).json({
        error:
          "Price, weight, volume, and available quantity must be valid numbers",
      });
    }

    // Call the create function from the Product model with all necessary parameters
    Product.create(
      {
        product_Name,
        price,
        image_link: image,
        description,
        weight,
        volume,
        available_Qty,
      },
      (err, result) => {
        if (err) {
          console.error("Error posting product:", err); // Log error for debugging
          return res
            .status(500)
            .json({ error: err.message || "Database error" });
        }
        res.status(201).json(result); // Return success response with message
      }
    );
  },

  // Get product by ID
  getProductById: (req, res) => {
    const { id } = req.params;
    Product.getProductById(id, (err, product) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    });
  },

  // Delete product
  deleteProduct: (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    Product.delete(productId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Product deleted" });
    });
  },

  // Update product
  updateProduct: (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    Product.update(productId, updatedData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Product updated" });
    });
  },

  async getcategoryProducts(req, res) {
    const { search, category } = req.query; // Extract query parameters

    try {
      const products = await ProductModel.getcategoryProducts(
        search || "",
        category || ""
      );
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving products" });
    }
  },

  // Payment
  payment: async (req, res) => {
    const { amount } = req.body;

    // Call the payment function from the model
    const { status, transactionId } = await User.payment(amount);

    if (status === "success") {
      res.json({ status, transactionId });
    } else {
      res.status(400).json({ status });
    }
  },

  // Place order
  placeOrder: async (req, res) => {
    const { route_ID, store_ID, cartItems } = req.body; // Get cart items from local storage

    const userId = req.user.id; // Authenticated user ID from the token

    try {
      // Check if cart has items
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Start the order process, use stored procedures for DB interactions
      const result = await Order.placeOrder(
        userId,
        route_ID,
        store_ID,
        cartItems
      );

      // Return success message and order ID
      return res.status(200).json({ success: true, orderId: result.orderId });
    } catch (err) {
      console.error("Order placement failed:", err);
      return res.status(500).json({ error: "Failed to place order" });
    }
  },
};

module.exports = userController;
