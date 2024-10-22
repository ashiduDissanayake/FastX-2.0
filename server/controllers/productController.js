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
};

module.exports = productController;