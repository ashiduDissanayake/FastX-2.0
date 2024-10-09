import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const ScheduleTrip = () => {
  const [driverData, setDriverData] = useState([]);
  const [assistantData, setAssistantData] = useState([]);
  const [truckData, setTruckData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [orderData, setOrderData] = useState([]); // State for orders
  const [activePage, setActivePage] = useState("Schedule a New Trip");

  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]); // State for selected orders
  const [totalCapacity, setTotalCapacity] = useState(0); // State for total capacity
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [warning, setWarning] = useState(""); // Warning message for capacity

  const handleNavigation = (item) => {
    setActivePage(item);
  };

  // Load data for dropdowns
  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/manager/getstore"
      );
      setStoreData(response.data);
    } catch (error) {
      console.error("Error loading stores", error);
    }
  };

  const loadOrdersByStore = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getstoreorders/${storeId}`
      );
      console.log("API Response for orders:", response.data);
      setOrderData(response.data);
    } catch (error) {
      console.error("Error loading orders", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const loadTrucksByStore = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/gettruck/${storeId}`
      );
      setTruckData(response.data);
    } catch (error) {
      console.error("Error loading trucks", error);
    }
  };

  const loadRoutesByStore = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getroute/${storeId}`
      );
      setRouteData(response.data);
    } catch (error) {
      console.error("Error loading routes", error);
    }
  };

  const loadDriversByStore = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getdriver/${storeId}`
      );
      setDriverData(response.data);
    } catch (error) {
      console.error("Error loading drivers", error);
    }
  };

  const loadAssistantsByStore = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getdriverassistant/${storeId}`
      );
      setAssistantData(response.data);
    } catch (error) {
      console.error("Error loading assistants", error);
    }
  };

  const handleStoreChange = (e) => {
    const storeId = e.target.value;
    setSelectedStore(storeId);
    loadOrdersByStore(storeId);
    loadDriversByStore(storeId);
    loadAssistantsByStore(storeId);
    loadTrucksByStore(storeId);
    loadRoutesByStore(storeId);
  };

  const handleOrderSelection = (orderId, capacity) => {
    setSelectedOrders((prevOrders) => {
      const isSelected = prevOrders.includes(orderId);

      // Calculate new total capacity based on the order being selected or deselected
      const newTotalCapacity = isSelected
        ? totalCapacity - capacity // Deselecting reduces capacity
        : totalCapacity + capacity; // Selecting increases capacity

      // Prevent the user from selecting an order if the total capacity exceeds 500
      if (!isSelected && newTotalCapacity > 500) {
        setWarning(
          `Cannot select order! Selecting this order will exceed the capacity limit of 500. Current capacity: ${totalCapacity}`
        );
        return prevOrders; // Return previous state without making changes
      }

      setWarning(""); // Clear any warning if valid selection
      setTotalCapacity(newTotalCapacity); // Update total capacity

      // Add or remove the order based on selection
      return isSelected
        ? prevOrders.filter((id) => id !== orderId) // Deselect
        : [...prevOrders, orderId]; // Select
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scheduleData = {
      truck_ID: selectedTruck,
      driver_ID: selectedDriver,
      assistant_ID: selectedAssistant,
      store_ID: selectedStore,
      route_ID: selectedRoute,
      start_time: startTime,
      end_time: endTime,
      selectedOrders: selectedOrders, // Send the selected orders
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/manager/scheduletrip",
        scheduleData
      );
      alert("Trip scheduled successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred while scheduling the trip.");
      }
      console.error("Error scheduling the trip", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleNavigation={handleNavigation}
      />

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">Schedule A Trip</h1>

        {/* Store Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Select Store</label>
          <select
            value={selectedStore}
            onChange={handleStoreChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">-- Select Store --</option>
            {storeData.map((store) => (
              <option key={store.store_ID} value={store.store_ID}>
                {store.store_ID}
              </option>
            ))}
          </select>
        </div>

       {/* Orders List for the Selected Store */}
{selectedStore && (
  <div className="mb-4">
    <label className="block mb-2 text-gray-700">Select Orders</label>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4"> {/* 5 columns for the lists */}
      {orderData.length > 0 ? (
        // Grouping orders by route_ID
        Array.from(new Set(orderData.map((order) => order.route_ID))).map((routeID) => {
          const isSelectedRoute = selectedRoute === routeID; // Check if this route is selected
          return (
            <div key={routeID} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">Route ID: {routeID}</h3>
              <div className="grid grid-cols-1 gap-2">
                {orderData
                  .filter((order) => order.route_ID === routeID)
                  .map((order) => (
                    <div key={order.order_ID} className="flex items-center">
                      <input
                        type="checkbox"
                        value={order.order_ID}
                        checked={selectedOrders.includes(order.order_ID)}
                        onChange={() => {
                          handleOrderSelection(order.order_ID, order.capacity);
                          if (!isSelectedRoute) {
                            setSelectedRoute(routeID); // Set the selected route
                          }
                        }}
                        disabled={selectedRoute && selectedRoute !== routeID} // Disable if another route is selected
                        className="mr-2"
                      />
                      <span>
                        Order #{order.order_ID} - Capacity: {order.capacity}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })
      ) : (
        <p>No orders found for the selected store.</p>
      )}
    </div>

    {/* Warning Message */}
    {warning && (
      <div className="text-red-500 text-sm mt-2">{warning}</div>
    )}

    {/* Progress Bar for Capacity */}
    <div className="mt-4">
      <div className="relative h-2 bg-gray-200 rounded">
        <div
          className="absolute h-full bg-green-500 rounded"
          style={{ width: `${(totalCapacity / 500) * 100}%` }} // Calculate width based on total capacity
        />
      </div>
      <p className="text-sm mt-1">
        {totalCapacity} / 500 Capacity Used
      </p>
    </div>
  </div>
)}

        {/* Trip Scheduling Form */}
        {selectedOrders.length > 0 && (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600"
          >
            {/* Driver Selection */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Driver</label>
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select Driver --</option>
                {driverData.map((driver) => (
                  <option
                    key={driver.driver_ID}
                    value={driver.driver_ID}
                    disabled={
                      driver.status !== "inactive" ||
                      driver.current_working_time === 40
                    }
                  >
                    {`${driver.driver_ID} - worked ${driver.current_working_time} hrs`}{" "}
                    {driver.status === "inactive" ? "" : "(active)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Assistant Selection */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                Select Assistant
              </label>
              <select
                value={selectedAssistant}
                onChange={(e) => setSelectedAssistant(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">-- Select Assistant --</option>
                {assistantData.map((assistant) => (
                  <option
                    key={assistant.assistant_ID}
                    value={assistant.assistant_ID}
                    disabled={
                      assistant.status !== "inactive" ||
                      assistant.current_working_time === 60
                    }
                  >
                    {`${assistant.assistant_ID} - worked ${assistant.current_working_time} hrs`}{" "}
                    {assistant.status === "inactive"
                      ? ""
                      : assistant.status === "active1"
                      ? "(active1)"
                      : "(active2)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Truck Selection */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Truck</label>
              <select
                value={selectedTruck}
                onChange={(e) => setSelectedTruck(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select Truck --</option>
                {truckData.map((truck) => (
                  <option
                    key={truck.truck_ID}
                    value={truck.truck_ID}
                    disabled={truck.status !== "inactive"}
                  >
                    {truck.truck_ID}{" "}
                    {truck.status === "inactive" ? "" : "(active)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Route Selection */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Route</label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select Route --</option>
                {routeData.map((route) => (
                  <option key={route.route_ID} value={route.route_ID}>
                    {`${route.route_ID} - ${route.max_time} hrs`}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Time Selection */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Schedule Trip
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScheduleTrip;
