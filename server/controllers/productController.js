const Product = require("../models/productModel");

const productController = {
  getProducts: async (req, res) => {
    const { criteria } = req.params;
    const { category, subcategory, minPrice, maxPrice, sortBy, limit } =
      req.query;

    try {
      // Call the model to fetch products based on the criteria (new_arrivals, trending, etc.)
      const products = await Product.fetchProducts(
        criteria,
        category,
        subcategory,
        minPrice,
        maxPrice,
        sortBy,
        limit
      );

      // Send the products as a JSON response
      res.status(200).json(products);
    } catch (error) {
      // Handle any errors
      res
        .status(500)
        .json({ message: "Failed to fetch products", error: error.message });
    }
  },

  // Controller for fetching new arrivals
  getNewArrivals: async (req, res) => {
    const limit = parseInt(req.query.limit) || 8;
    try {
      const products = await Product.getNewArrivals(limit);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch new arrivals",
          error: error.message,
        });
    }
  },

  // Controller for fetching trending products
  getTrendingProducts: async (req, res) => {
    const limit = parseInt(req.query.limit) || 8;

    try {
      const products = await Product.getTrendingProducts(limit);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching trending products:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch trending products",
          error: error.message,
        });
    }
  },

  // Controller for filtering products
  filterProducts: async (req, res) => {
    const category = req.query.category || "all";
    const subcategory = req.query.subcategory || "all";
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || 1000;
    const sortBy = req.query.sortBy || "newest";
    const limit = parseInt(req.query.limit) || 8;

    try {

    }
    catch(error) {
      console.error("Error filtering products:", error);
      res.status(500).json({
        message: "Failed to fetch filtered products",
        error: error.message,
      });
    }

    Product.filterProducts(
      category,
      subcategory,
      minPrice,
      maxPrice,
      sortBy,
      limit
    )
      .then((products) => res.status(200).json(products))
      .catch((error) =>
        res
          .status(500)
          .json({
            message: "Failed to fetch filtered products",
            error: error.message,
          })
      );
  },
};

module.exports = productController;
