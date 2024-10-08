const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { get } = require("../routes/userRoute");

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
      firstname,
      lastname,
      phonenumber,
      type,
    } = req.body;

    // Call the create function from the user model
    User.create(
      { email, username, password, firstname, lastname, phonenumber, type },
      (err, result) => {
        if (err) {
          const errors = handleErrors(err);
          return res.status(400).json({ errors });
        }

        // Assuming your stored procedure returns the user ID
        const userId = result;

        // Create JWT token
        const token = createToken(userId);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: userId });
      }
    );
  },

  // Login user
  loginUser: (req, res) => {
    const { email, password } = req.body;

    User.login(email, password, (err, user) => {
      if (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors }); // Send the error response
      }

      // Create JWT token
      console.log(user);
      const token = createToken(user.customer_ID);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user.customer_ID }); // Send user ID in response
    });
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

  // Logout user
  logoutUser: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  },

  // Get all products
  // Get all products with error handling
  getAllProducts: (req, res) => {
    Product.getAllProducts((err, products) => {
      if (err) {
        // Handle database or other errors
        return res.status(500).json({ error: err.message || "Database error" });
      }

      if (!products) {
        // Handle the case where no products are available
        return res.status(404).json({ message: "No products found" });
      }

      // If everything is fine, return the products
      res.json(products);
    });
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
      return res
        .status(400)
        .json({
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
        return res.status(500).json({ error: 'Server error' });
      }
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    });
  },

  // Delete product
  deleteProduct: (req, res) => {
    const productId = req.params.id;
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















  // Get all users
  getUsers: (req, res) => {
    User.findAll((err, users) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(users);
    });
  },

  // Get user by ID
  getUserById: (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    });
  },

  // Update user
  updateUser: (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    User.update(userId, updatedData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "User updated" });
    });
  },

  // Delete user
  deleteUser: (req, res) => {
    const userId = req.params.id;
    User.delete(userId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "User deleted" });
    });
  },
};

module.exports = userController;
