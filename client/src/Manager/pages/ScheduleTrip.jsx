import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const ScheduleTrip = () => {
  const [driverData, setDriverData] = useState([]);
  const [assistantData, setAssistantData] = useState([]);
  const [truckData, setTruckData] = useState([]);
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
  const [warning, setWarning] = useState(""); // Warning message for capacity

  
  const handleNavigation = (item) => {
    setActivePage(item);
  };

  useEffect(() => {
    loadOrdersByStore();
    loadDriversByStore();
    loadAssistantsByStore();
    loadTrucksByStore();
    loadRoutesByStore();
  }, []);

  const loadOrdersByStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getstoreorders`,
        { withCredentials: true }
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

  const loadTrucksByStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/gettruck`,
        { withCredentials: true }
      );
      setTruckData(response.data);
    } catch (error) {
      console.error("Error loading trucks", error);
    }
  };

  const loadRoutesByStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getroute`,
        { withCredentials: true }
      );
      setRouteData(response.data);
    } catch (error) {
      console.error("Error loading routes", error);
    }
  };

  const loadDriversByStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getdriver`,
        { withCredentials: true }
      );
      setDriverData(response.data);
    } catch (error) {
      console.error("Error loading drivers", error);
    }
  };

  const loadAssistantsByStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getdriverassistant`,
        { withCredentials: true }
      );
      setAssistantData(response.data);
    } catch (error) {
      console.error("Error loading assistants", error);
    }
  };

  const handleOrderSelection = (orderId, capacity) => {
    const intCapacity = Math.floor(capacity); // Convert capacity to integer
  
    setSelectedOrders((prevOrders) => {
      const isSelected = prevOrders.includes(orderId);
      const newTotalCapacity = isSelected
        ? totalCapacity - intCapacity
        : totalCapacity + intCapacity;
  
      // Check capacity limit
      if (!isSelected && newTotalCapacity > 500) {
        setWarning(
          `Cannot select order! This will exceed the capacity limit of 500. Current capacity: ${newTotalCapacity}`
        );
        return prevOrders;
      }
  
      setWarning("");
      setTotalCapacity(newTotalCapacity); // Update total capacity here
  
      // Return new list of selected orders
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
      selectedOrders: selectedOrders,
    };

    console.log("Selected orders before submission:", selectedOrders);

    try {
      const response = await axios.post(
        "http://localhost:8080/manager/scheduletrip",
        scheduleData,
        { withCredentials: true }
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

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold ml-2">Loading Packages</span>
          </div>

          <div className="overflow-x-auto">
  {orderData.length > 0 ? (
    Array.from(new Set(orderData.map((order) => order.route_id))).map(
      (routeID) => {
        const isSelectedRoute = selectedRoute === routeID;
        return (
          <div key={routeID} className="mb-4">
            <h3 className="font-bold mb-2 text-center">Route ID: {routeID}</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-center">Select</th>
                  <th className="py-2 px-4 border-b text-center">Order ID</th>
                  <th className="py-2 px-4 border-b text-center">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {orderData
                  .filter((order) => order.route_id === routeID)
                  .map((order) => (
                    <tr
                      key={order.order_id}
                      className={`transition duration-300 ease-in-out hover:bg-green-50 ${
                        selectedOrders.includes(order.order_id) ? "bg-green-200" : ""
                      }`}
                    >
                      <td className="py-2 px-4 border-b text-center">
                        <input
                          type="checkbox"
                          value={order.order_id}
                          checked={selectedOrders.includes(order.order_id)}
                          onChange={() => {
                            handleOrderSelection(order.order_id, order.capacity);
                            if (!isSelectedRoute) {
                              setSelectedRoute(routeID);
                            }
                          }}
                          disabled={selectedRoute && selectedRoute !== routeID}
                          className="mr-2 h-5 w-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                       {order.order_id}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {order.capacity}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
                style={{ width: `${(totalCapacity / 500) * 100}%` }} // Use 500 as the max capacity
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
                    const totalDriverHours =
                    assistant.current_working_time + maxTimeOfRoute;


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
                          assistant.status === "active1" ||
                          assistant.status === "active2" || totalDriverHours >= 60
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
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select Route --</option>
                {routeData.map((route) => (
                  <option key={route.route_ID} value={route.route_ID}>
                    {`${route.route_ID} : ${route.max_time} hrs`}
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
