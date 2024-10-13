import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Package, Brain, Rocket, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Simulated AR/VR integration
const ARVRIntegration = ({ children }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-10 blur-3xl"></div>
    {children}
  </div>
);

// Futuristic Button Component
const FuturisticButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    onClick={onClick}
  >
    <Sparkles size={20} />
    <span>{children}</span>
  </motion.button>
);

// Holographic Order Display
const HolographicOrder = ({ order }) => {
  const stages = ["Pending", "Processing", "Shipped", "In Branch", "Delivered"];
  const currentStageIndex = stages.indexOf(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-black bg-opacity-50 backdrop-blur-lg rounded-xl p-6 text-white mb-8"
    >
      <div className="flex justify-between items-center mb-4"></div>
      <div className="flex items-center space-x-6 mb-6">
        <div className="relative w-32 h-32">
          <img
            src={order.image_link}
            alt={order.product_Name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 rounded-lg"></div>
        </div>
        <div>
          <p className="text-xl font-semibold">{order.product_Name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Price: ${parseFloat(order.price).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <div key={stage} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: index <= currentStageIndex ? 1 : 0.5 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStageIndex
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gray-600"
              }`}
            >
              {index === 0 && <Package size={30} />}
              {index === 1 && <Brain size={30} />}
              {index === 2 && <Rocket size={30} />}
              {index === 3 && <Zap size={30} />}
              {index === 4 && <Sparkles size={30} />}
            </motion.div>
            <p className="text-xs mt-2">{stage}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (auth && !loading) {
      fetchOrders();
    }
  }, [auth, loading]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/orders", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center text-2xl text-white">
        Initializing quantum interface...
      </div>
    );
  if (!auth)
    return (
      <div className="text-center text-2xl text-white">
        Please synchronize your neural link to view your profile.
      </div>
    );

  return (
    <ARVRIntegration>
      <div className="min-h-screen bg-gray-900 text-white p-8 pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Order History</h2>
          </div>
          <AnimatePresence>
            {orders.map((order) => (
              <HolographicOrder key={order.cart_ID} order={order} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </ARVRIntegration>
  );
};

export default Orders;
