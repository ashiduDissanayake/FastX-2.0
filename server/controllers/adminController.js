const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");
const Admin = require("../models/adminModel");


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

const adminController = {
  // Get all the customers
  getCustomer: async (req, res) => {
    try {
      const result = await Admin.getCustermer();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err); 
      console.log(errors);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const result = await Product.getAllProducts();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  postProduct: async (req, res) => {
    try {
      const result = await Product.postProduct(req.body);
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  // updateProduc: async (req, res) => {
  //   try {
  //     const result = await Product.updateProduct(req.params.id, req.body);
  //     res.json(result);
  //   } catch (err) {
  //     const errors = handleErrors(err);
  //     console.log(errors);
  //   }
  // },

  updateProduct: async (req, res) => {
    try {
      const result = await Product.updateProduct(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  }
  ,

  deleteProduct: async (req, res) => {
    try {
      const result = await Product.deleteProduct(req.params.id);
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  getDriver: async (req, res) => {
    try {
      const result = await Admin.getDriver();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  countCustomer: async (req, res) => {
    try {
      const result = await Admin.countCustomer();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  countProduct: async (req, res) => {
    try {
      const result = await Admin.countProduct();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  countEmployee: async (req, res) => {
    try {
      const result = await Admin.countEmployee();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  getAssistantDriver: async (req, res) => {
    try {
      const result = await Admin.getAssistantDriver();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  getManager : async (req, res) => {
    try {
      const result = await Admin.getManager();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  getOrderCount: async (req, res) => {
    try {
      const result = await Admin.getOrderCount();
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  },

  deleteManager: async (req, res) => {
    try {
      const result = await Admin.deleteManager(req.params.id);
      res.json(result);
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
    }
  }


};

  

module.exports = adminController;
