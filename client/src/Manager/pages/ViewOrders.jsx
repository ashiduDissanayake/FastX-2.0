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
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800 mb-8 text-center">
            View Orders
          </h1>

          {/* Messages */}
          {errorMessage && <p className="text-red-500 mt-6 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-6 text-center">{successMessage}</p>}

          {/* Display Orders in Table */}
          {orders.length > 0 && (
            <div className="mt-8 bg-white shadow-xl w-full max-w-4xl overflow-hidden">
              <table className="min-w-full border-collapse">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <tr>
                    <th className="py-3 px-4 text-center font-medium border-r border-white">Order ID</th>
                    <th className="py-3 px-4 text-center font-medium border-r border-white">Route ID</th>
                    <th className="py-3 px-4 text-center font-medium">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id} className="border-b hover:bg-gray-100 transition duration-200">
                      <td className="py-3 px-4 text-center text-gray-800 border-r border-gray-300">{order.order_id}</td>
                      <td className="py-3 px-4 text-center text-gray-800 border-r border-gray-300">{order.route_id}</td>
                      <td className="py-3 px-4 text-center text-gray-800">{order.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
