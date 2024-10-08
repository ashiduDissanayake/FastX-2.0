import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/user/getallproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.message === "No products found") {
          setError(data.message);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => setError("Error fetching products: " + error.message));
  }, []);

  const handleProductClick = (productId) => {
    console.log(productId)
    // Navigate to product detail page
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-gradient-to-r from-purple-200 to-teal-200 min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-900">
        Shop Our Collection
      </h1>
      {error ? (
        <div className="text-center text-red-600 text-2xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
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
