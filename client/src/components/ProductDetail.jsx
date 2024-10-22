import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black"); // Default color
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const colors = ["black", "red", "blue", "green", "white"];
  const navigate = useNavigate();

  const addToCart = (productId, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        productId,
        name: product.product_Name,
        price: product.price,
        quantity,
        color: selectedColor,
        image: product.image_link,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart successfully");
    navigate("/cart"); // Optionally navigate to the cart page
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getproduct/${productId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    } catch (error) {
      setError("Error fetching product: " + error.message);
    }
  };

  if (error) {
    return <div className="text-center text-red-400 text-2xl">{error}</div>;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-pink-500 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row text-pink-100">
        <div className="md:w-1/2">
          <img
            src={product.image_link}
            alt={product.product_Name}
            className="w-full h-auto object-cover rounded-lg mb-4 md:mb-0"
          />
        </div>

        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4 text-pink-300">
            {product.product_Name}
          </h1>
          <p className="text-lg mb-4 text-pink-200">{product.description}</p>
          <p className="text-2xl font-bold text-pink-400 mb-4">${product.price}</p>

          <div className="mb-4">
            <label className="text-lg font-medium text-pink-200">
              Select Color:
            </label>
            <div className="flex space-x-3 mt-4">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform duration-200 ease-in-out transform ${
                    selectedColor === color
                      ? "border-4 border-pink-400 scale-110"
                      : "border-2 border-pink-200"
                  } shadow-md hover:scale-105`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-pink-200">Quantity:</label>
            <div className="flex items-center mt-2">
              <button
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-l text-pink-100"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 p-2 border-t border-b border-gray-700 text-center bg-gray-800 text-pink-100"
              />
              <button
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-r text-pink-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="w-full bg-pink-500 text-white font-medium py-3 rounded hover:bg-pink-600 transition"
            onClick={() => addToCart(productId, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
