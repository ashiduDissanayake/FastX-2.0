import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  console.log(productId);

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

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <img
          src={product.image_link}
          alt={product.product_Name}
          className="w-full h-auto mb-4 object-cover"
        />
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          {product.product_Name}
        </h1>
        <p className="text-lg mb-4 text-gray-700">{product.longDescription}</p>
        <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>
        <button className="w-full bg-teal-600 text-white font-medium py-3 rounded hover:bg-teal-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
