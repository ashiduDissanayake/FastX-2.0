import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(""); // For 'No products found' message
  const navigate = useNavigate();

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async (searchTerm = "", category = "") => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/getallproducts?search=${searchTerm}&category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else if (data.message) {
        setMessage(data.message); // Set the "No products found" message
        setProducts([]); // Clear products array if no products found
        setFilteredProducts([]);
      } else {
        setProducts(data);
        setFilteredProducts(data); // Reset filtered products to fetched data
        setMessage(""); // Clear message if products are found
      }
    } catch (error) {
      setError("Error fetching products: " + error.message);
    }
  };

  // Handle product click for navigating to product detail page
  const handleProductClick = (productId) => {
    // Navigate to product detail page
    navigate(`/product/${productId}`);
  };

  // Handle search input change
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    fetchProducts(newSearchTerm, category); // Fetch products based on the new search term and current category
  };

  // Handle category selection change
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    fetchProducts(searchTerm, newCategory); // Fetch products based on the selected category and current search term
  };

  return (
    <div className="bg-gradient-to-r from-purple-200 to-teal-200 min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-900">
        Shop Our Collection
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg"
        />
      </div>

      <div className="flex justify-center mb-6">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="TV">TV</option>
          <option value="Laptops">Laptops</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Refrigerators">Refrigerators</option>
          <option value="Fans">Fans</option>
        </select>
      </div>

      {error ? (
        <div className="text-center text-red-600 text-2xl">{error}</div>
      ) : message ? (
        <div className="text-center text-gray-600 text-2xl">{message}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.product_ID}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product.product_ID)}
            >
              <img
                src={product.image_link}
                alt={product.product_Name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {product.product_Name}
                </h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  ${product.price}
                </p>
                <button className="w-full bg-teal-600 text-white font-medium py-2 rounded hover:bg-teal-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
