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
      const newTotalCapacity = isSelected
        ? totalCapacity - capacity
        : totalCapacity + capacity;

      if (!isSelected && newTotalCapacity > 500) {
        setWarning(
          `Cannot select order! This will exceed the capacity limit of 500. Current capacity: ${newTotalCapacity}`
        );
        return prevOrders;
      }

      setWarning("");
      return isSelected
        ? prevOrders.filter((id) => id !== orderId)
        : [...prevOrders, orderId];
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
      selectedOrders: selectedOrders,
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

  const [maxTimeOfRoute, setMaxTimeOfRoute] = useState(0);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleNavigation={handleNavigation}
      />

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800">
            Schedule A Trip
          </h1>
        </div>

        {/* Store Selection */}
        <div className="mb-6 flex flex-col items-center">
          <label className="block mb-2 text-gray-700 text-lg font-semibold">
            Select Store
          </label>
          <select
            value={selectedStore}
            onChange={handleStoreChange}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold ml-2">Loading Packages</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {orderData.length > 0 ? (
              Array.from(new Set(orderData.map((order) => order.route_ID))).map(
                (routeID) => {
                  const isSelectedRoute = selectedRoute === routeID;
                  return (
                    <div
                      key={routeID}
                      className="bg-white p-4 rounded-lg shadow"
                    >
                      <h3 className="font-bold mb-2">Route ID: {routeID}</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {orderData
                          .filter((order) => order.route_ID === routeID)
                          .map((order) => (
                            <div
                              key={order.order_ID}
                              className={`flex items-center p-4 bg-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out ${
                                selectedOrders.includes(order.order_ID)
                                  ? "bg-green-200"
                                  : ""
                              } hover:bg-green-50`}
                            >
                              <input
                                type="checkbox"
                                value={order.order_ID}
                                checked={selectedOrders.includes(
                                  order.order_ID
                                )}
                                onChange={() => {
                                  handleOrderSelection(
                                    order.order_ID,
                                    order.capacity
                                  );
                                  if (!isSelectedRoute) {
                                    setSelectedRoute(routeID);
                                  }
                                }}
                                disabled={
                                  selectedRoute && selectedRoute !== routeID
                                }
                                className="mr-2 h-5 w-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                              />
                              <span className="text-gray-700 font-semibold">
                                Order #{order.order_ID} - Capacity:{" "}
                                {order.capacity}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                }
              )
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
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                style={{ width: `${(totalCapacity / 500) * 100}%` }} // Calculate width based on total capacity
              />
            </div>
            <p className="text-sm mt-1 text-center">
              {totalCapacity} / 500 Capacity Used
            </p>
          </div>
        </div>

        {/* Trip Scheduling Form */}
        {selectedOrders.length > 0 && (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600"
          >
            {/* driver selection */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Driver</label>
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select Driver --</option>
                {driverData.map((driver) => {
                  // Calculate total working hours
                  const totalDriverHours =
                    driver.current_working_time + maxTimeOfRoute;

                  return (
                    <option
                      key={driver.driver_ID}
                      value={driver.driver_ID}
                      disabled={
                        driver.status !== "inactive" || totalDriverHours >= 40
                      }
                    >
                      {`${driver.driver_ID} - worked ${driver.current_working_time} hrs`}
                      {driver.status === "inactive" ? "" : "(active)"}
                    </option>
                  );
                })}
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
                {assistantData
                  .sort((a, b) => {
                    // Sorting: "inactive" first, then "available"
                    if (a.status === "inactive" && b.status !== "inactive")
                      return -1;
                    if (a.status !== "inactive" && b.status === "inactive")
                      return 1;
                    if (a.status === "available" && b.status !== "available")
                      return -1;
                    if (a.status !== "available" && b.status === "available")
                      return 1;
                    return 0;
                  })
                  .map((assistant) => {
                    // Set status display text
                    let statusText = "";
                    if (assistant.status === "inactive") {
                      statusText = "(Inactive)";
                    } else if (assistant.status === "available") {
                      statusText = "(Available)";
                    } else if (assistant.status === "active1") {
                      statusText = "(Active 1)";
                    } else if (assistant.status === "active2") {
                      statusText = "(Active 2)";
                    }

                    return (
                      <option
                        key={assistant.assistant_ID}
                        value={assistant.assistant_ID}
                        disabled={
                          assistant.status !== "inactive" &&
                          assistant.status !== "available"
                        }
                      >
                        {`${assistant.assistant_ID} - worked ${assistant.current_working_time} hrs ${statusText}`}
                      </option>
                    );
                  })}
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
                onChange={(e) => {
                  const selectedRouteId = e.target.value;
                  setSelectedRoute(selectedRouteId);
                  const selectedRouteData = routeData.find(
                    (route) => route.route_ID === selectedRouteId
                  );
                  if (selectedRouteData) {
                    setMaxTimeOfRoute(selectedRouteData.max_time);
                  }
                }}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
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
