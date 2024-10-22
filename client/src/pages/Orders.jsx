import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

// Expandable Order Component
const Order = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to return status descriptions
  const getStatusDescription = (status) => {
    switch (status) {
      case "Delivered":
        return "Your order has been delivered successfully.";
      case "Shipped":
        return "Your order has been shipped and is on its way.";
      case "Processing":
        return "Your order is currently being processed.";
      case "Cancelled":
        return "This order has been cancelled.";
      default:
        return "Your order status is currently being updated.";
    }
  };

  return (
    <motion.div
      layout
      className="bg-gray-800 rounded-lg p-6 mb-4 flex justify-between"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Left Side: Order Details */}
      <div className="flex-shrink-0 w-1/4">
        <h3 className="text-xl font-semibold">Order #{order.order_id}</h3>
        <p className="text-sm">{new Date(order.order_date).toLocaleString()}</p>
        <p className="text-lg">Total Amount: ${order.total_amount}</p>
      </div>

      {/* Middle: Order Products */}
      <div className="flex-grow w-2/4 px-4">
        {order.items && order.items.length > 0 ? (
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.item_id} className="flex items-center space-x-4">
                <img
                  src={item.image_link || "/default-image.png"} // Fallback image
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
        ) : (
          <p className="text-sm">No items found for this order.</p>
        )}
      </div>

      {/* Right Side: Order Status */}
      <div className="flex-shrink-0 w-1/4 text-right">
        <p
          className={`text-lg font-semibold ${
            order.status === "Delivered" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {order.status}
        </p>
        {expanded && (
          <p className="text-sm mt-2">
            {getStatusDescription(order.status)} {/* Show the meaning of the status */}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// OrdersDetails Component
const OrdersDetails = () => {
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
          {orders.length > 0 ? (
            orders.map((order) => <Order key={order.order_id} order={order} />)
          ) : (
            <div className="text-center">No orders found.</div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default OrdersDetails;
