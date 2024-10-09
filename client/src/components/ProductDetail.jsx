import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black"); // Default color
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const colors = ["black", "red", "blue", "green", "white"];

  useEffect(() => {
    // Fetch product details from the backend
    fetch(`http://localhost:8080/user/getproduct/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
        }
      })
      .catch((error) => setError("Error fetching product: " + error.message));
  }, [productId]);

  if (error) {
    return <div className="text-center text-red-600 text-2xl">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) setQuantity(value); // Ensure quantity is at least 1
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image_link}
            alt={product.product_Name}
            className="w-full h-auto object-cover rounded-lg mb-4 md:mb-0"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {product.product_Name}
          </h1>
          <p className="text-lg mb-4 text-gray-700">{product.longDescription}</p>
          <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="text-lg font-medium text-gray-700">Select Color:</label>
            <div className="flex space-x-3 mt-4">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 ease-in-out transform ${
                    selectedColor === color
                      ? "border-4 border-teal-600 scale-110"
                      : "border-2 border-gray-300"
                  } shadow-md`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="text-lg font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              className="ml-2 w-16 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          <button className="w-full bg-teal-600 text-white font-medium py-3 rounded hover:bg-teal-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
