import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/user/getcart/", {
        withCredentials: true,
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axios.delete("http://localhost:8080/user/removecart", {
        data: { productId },
        withCredentials: true,
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to remove product", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        "http://localhost:8080/user/updatecart",
        { productId, quantity },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const updateItemStatus = async (productId, status) => {
    try {
      await axios.put(
        "http://localhost:8080/user/updatecartstatus",
        { productId, status },
        { withCredentials: true }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to update item status", error);
    }
  };

  const placeOrder = () => {
    navigate(`/placeorder`);
  };

  const calculateTotal = () => {
    return cart
      .filter((item) => item.status === "Selected")
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-pink-300">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ShoppingBag className="w-12 h-12" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-pink-100 p-8 pt-20">
      <h1 className="text-4xl font-bold text-pink-300 mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty.</p>
      ) : (
        <div className="grid gap-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900 rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-pink-300">
                      {item.name}
                    </h2>
                    <p className="text-pink-200">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-pink-300 hover:text-pink-400 transition"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() =>
                      updateItemStatus(
                        item.id,
                        item.status === "Active" ? "Selected" : "Active"
                      )
                    }
                    className={`px-4 py-2 rounded-full transition ${
                      item.status === "Selected"
                        ? "bg-pink-500 text-white hover:bg-pink-600"
                        : "bg-gray-700 text-pink-300 hover:bg-gray-600"
                    }`}
                  >
                    {item.status === "Selected" ? "Selected" : "Select"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-2xl font-semibold">
              Total: <span className="text-pink-300">${calculateTotal()}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={placeOrder}
              className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition flex items-center"
            >
              Place Order
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
