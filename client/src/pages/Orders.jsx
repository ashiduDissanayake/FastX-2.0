import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

// Expandable Order Component
const Order = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-gray-800 rounded-lg p-6 mb-4"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Order #{order.order_id}</h3>
        <p className="text-sm">{new Date(order.order_date).toLocaleString()}</p>
        <p className={`text-sm ${order.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>
          {order.status}
        </p>
      </div>

      {expanded && (
        <div className="mt-4">
          <p className="text-lg mb-2">Total Amount: ${order.total_amount}</p>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={item.image_link}
                  alt={item.product_Name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-semibold">{item.product_Name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
      console.log("Orders:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-2xl text-white">Loading orders...</div>;
  }

  if (!auth) {
    return <div className="text-center text-2xl text-white">Please log in to view your orders.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8">Order History</h2>
        <AnimatePresence>
          {orders.map((order) => (
            <Order key={order.order_id} order={order} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Orders;
