import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sliders, ShoppingBag } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchTerm = "", category = "") => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/getallproducts?search=${searchTerm}&category=${category}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else if (data.message) {
        setMessage(data.message);
        setProducts([]);
        setFilteredProducts([]);
      } else {
        setProducts(data);
        setFilteredProducts(data);
        setMessage("");
      }
    } catch (error) {
      setError("Error fetching products: " + error.message);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product detail page
  };

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    fetchProducts(newSearchTerm, category);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    fetchProducts(searchTerm, newCategory);
  };

  return (
    <div className="bg-black min-h-screen p-8 pt-20 text-pink-100 relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-black"></div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-pink-300">Elegant Collection</h1>
        <motion.button
          className="text-pink-300 hover:text-pink-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Sliders className="w-8 h-8" />
        </motion.button>
      </div>

      <motion.div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 shadow-lg transition-transform transform ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={{ x: -300 }}
        animate={{ x: isFilterOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-pink-300 pt-20">
            Refine Selection
          </h2>
          <input
            type="text"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-gray-800 text-pink-100 border border-pink-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 bg-gray-800 text-pink-100 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">All Categories</option>
            <option value="TV">TV</option>
            <option value="Laptops">Laptops</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Refrigerators">Refrigerators</option>
            <option value="Fans">Fans</option>
          </select>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="mt-4 w-full bg-pink-500 text-white font-medium py-2 rounded hover:bg-pink-600 transition"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>

      {error ? (
        <div className="text-center text-red-400 text-2xl">{error}</div>
      ) : message ? (
        <div className="text-center text-pink-300 text-2xl">{message}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.product_ID}
              className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-pink-300/20 transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product.product_ID)} // Click to view details
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={product.image_link}
                alt={product.product_Name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-pink-300">
                  {product.product_Name}
                </h2>
                <p className="text-sm text-pink-100">{product.description}</p>
                <p className="text-lg font-bold text-pink-400 mb-4">
                  ${product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
