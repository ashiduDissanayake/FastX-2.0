import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaClipboardList } from "react-icons/fa"; // Import icons from react-icons

const ViewOrders = () => {
  const [storeID, setStoreID] = useState("");
  const [stores, setStores] = useState([]);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activePage, setActivePage] = useState("View Orders");

  // Fetch stores for the dropdown
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:8080/manager/getstore");
        setStores(response.data);
      } catch (error) {
        console.error("Error loading stores:", error);
        setErrorMessage("Error loading stores.");
      }
    };
    fetchStores();
  }, []);

  // Handle store selection
  const handleStoreIDChange = (e) => {
    setStoreID(e.target.value);
    setOrders([]);
  };

  // Fetch orders with status "train" for the selected store
  const fetchOrders = async () => {
    if (!storeID) {
      setErrorMessage("Please select a valid store.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/manager/gettrainorders/${storeID}`);
      setOrders(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorMessage("No pending orders to be transferred to the branch.");
      setOrders([]);
    }
  };

  // Update all orders to "branch" status for the selected store
  const updateOrdersStatus = async () => {
    if (!storeID) {
      setErrorMessage("Please select a valid store.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/manager/updatetobranch", {
        storeID,
      });
      setSuccessMessage(response.data.message);
      fetchOrders(); // Refresh the orders after update
    } catch (error) {
      console.error("Error updating orders:", error);
      setErrorMessage("Error updating orders. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-purple-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="w-3/4 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">View Orders</h1>

        {/* Dropdown for Store Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-semibold">Select Store</label>
          <select
            value={storeID}
            onChange={handleStoreIDChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Store --</option>
            {stores.map((store) => (
              <option key={store.store_ID} value={store.store_ID}>
                {store.store_ID}
              </option>
            ))}
          </select>
        </div>

        {/* Fetch Orders Button */}
        <button
          onClick={fetchOrders}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
        >
          <FaClipboardList className="inline mr-2" />
          View Orders
        </button>

        {/* Display Orders */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

        {orders.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Orders for Store ID: {storeID}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div
                  key={order.order_ID}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center mb-2">
                    <span className="font-semibold">Order ID:</span> {order.order_ID}
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold">Route ID:</span> {order.route_ID}
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">Capacity:</span> {order.capacity}
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
            className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
          >
            <FaClipboardList className="inline mr-2" />
            Get all orders to Branch
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
