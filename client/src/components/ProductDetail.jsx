import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black"); // Default color
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
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
    <div className="bg-black p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col md:flex-row text-pink-100 space-y-6 md:space-y-0">
        
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <img
            src={product.image_link
              .replace(/^".\/?/, '/public/')
              .replace(/"$/, '')}
            alt={product.product_Name}
            className="w-40px h-10px object-cover rounded-lg transition-transform transform hover:scale-105"
          />
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs tracking-wide uppercase shadow">
              New
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 md:pl-10 flex flex-col justify-between space-y-6">
          
          {/* Product Name */}
          <div>
            <h1 className="text-4xl font-bold mb-2 text-pink-300 leading-tight">
              {product.product_Name}
            </h1>
            <p className="text-lg text-pink-200">{product.description}</p>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-pink-400">${product.price}</div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-3">
            <label className="text-lg font-medium text-pink-200">Quantity:</label>
            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
              <button
                className="p-2 bg-gray-800 hover:bg-gray-700 transition-all text-pink-100"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 p-2 text-center bg-gray-800 text-pink-100 outline-none border-l border-r border-gray-700"
              />
              <button
                className="p-2 bg-gray-800 hover:bg-gray-700 transition-all text-pink-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-pink-500 text-white font-medium py-3 rounded-lg hover:bg-pink-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-600"
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
