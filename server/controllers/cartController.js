

// Product controller to handle product-related operations
const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      if (!products)
        return res.status(404).json({ message: "No products found" });
      res.json(products);
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

  // Create new product
  postProduct: async (req, res) => {
    const {
      product_Name,
      price,
      image,
      description,
      weight,
      volume,
      available_Qty,
    } = req.body;
    if (
      !product_Name ||
      !price ||
      !image ||
      !description ||
      isNaN(price) ||
      isNaN(weight) ||
      isNaN(volume) ||
      isNaN(available_Qty)
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required and must be valid numbers" });
    }
    try {
      const product = await Product.create({
        product_Name,
        price,
        image,
        description,
        weight,
        volume,
        available_Qty,
      });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
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
};

module.exports = productController;
