import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activePage, setActivePage] = useState("View Orders");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/manager/gettrainorders`, { withCredentials: true });
      setOrders(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorMessage("No pending orders to be transferred to the branch.");
      setOrders([]);
    }
  };

  const updateOrdersStatus = async () => {
    try {
      const response = await axios.post("http://localhost:8080/manager/updatetobranch", null, { withCredentials: true });
      setSuccessMessage(response.data.message);
      fetchOrders();
    } catch (error) {
      console.error("Error updating orders:", error);
      setErrorMessage("Error updating orders. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="w-3/4 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800 mb-8">
            View Orders
          </h1>

          {/* Fetch Orders Button */}
          <button
            onClick={fetchOrders}
            className="w-full max-w-md bg-blue-500 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
          >
            <FaClipboardList className="inline mr-2" />
            View Orders
          </button>

          {/* Messages */}
          {errorMessage && <p className="text-red-500 mt-6 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-6 text-center">{successMessage}</p>}

          {/* Display Orders */}
          {orders.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-xl p-8 w-full max-w-3xl">
              <h2 className="text-3xl font-semibold text-center mb-6">Orders for Your Store</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">Order ID:</span> {order.order_id}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">Route ID:</span> {order.route_id}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Capacity:</span> {order.capacity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Update Orders Button */}
          {orders.length > 0 && (
            <button
              onClick={updateOrdersStatus}
              className="w-full max-w-md mt-8 bg-green-500 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
            >
              <FaClipboardList className="inline mr-2" />
              Get all orders to Branch
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
