import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaCheckCircle } from "react-icons/fa";

const FinishedTrips = () => {
  const [storeID, setStoreID] = useState("");
  const [stores, setStores] = useState([]);
  const [trips, setTrips] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("Finished Trips");

  // Load stores for the dropdown when the component mounts
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/manager/getstore"
        );
        setStores(response.data);
      } catch (error) {
        setErrorMessage("Error loading stores. Please try again.");
        console.error("Error loading stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handleStoreIDChange = (e) => {
    setStoreID(e.target.value);
    setTrips([]); // Clear previous trips when the store changes
    setErrorMessage(""); // Clear any previous error message
  };

  const fetchTrips = async () => {
    if (!storeID) {
      setErrorMessage("Please select a valid Store.");
      setTrips([]); // Clear trips if no valid store is selected
      return;
    }

    setLoading(true); // Set loading state
    try {
      const response = await axios.get(
        `http://localhost:8080/manager/getfinishedtrips/${storeID}`
      );
      if (response.data.length === 0) {
        setErrorMessage(""); // Clear previous error messages
        setTrips([]); // Clear trips if no finished trips found
      } else {
        setErrorMessage(""); // Clear error message if trips are found
        setTrips(response.data);
      }
    } catch (error) {
      setErrorMessage("Error fetching trips. Please try again.");
      console.error("Error fetching trips:", error);
      setTrips([]); // Clear trips on error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800 mb-8">
            Finished Trips
          </h1>
          {/* Store Selection Dropdown */}
          <div className="mb-6 w-full max-w-md">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Select Store
            </label>
            <select
              value={storeID}
              onChange={handleStoreIDChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            >
              <option value="">-- Select Store --</option>
              {stores.map((store) => (
                <option key={store.store_ID} value={store.store_ID}>
                  {store.store_ID}
                </option>
              ))}
            </select>
          </div>

          {/* Fetch Trips Button */}
          <button
            onClick={fetchTrips}
            className="w-full max-w-md bg-blue-500 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
          >
            {loading ? "Loading..." : "View Finished Trips"}
          </button>

          {/* Error Message */}
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}

          {/* Display Finished Trips */}
          {trips.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Finished Trips for Store ID: {storeID}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                  <div
                    key={trip.schedule_ID}
                    className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Background Tick Icon */}
                    <FaCheckCircle
                      className="absolute top-2 right-2 text-green-500 opacity-10"
                      style={{ fontSize: "7rem", zIndex: 0 }}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Trip ID: {trip.schedule_ID}
                      </h3>
                      <p className="text-gray-600">Driver ID: {trip.driver_ID}</p>
                      <p className="text-gray-600">Assistant ID: {trip.assistant_ID}</p>
                      <p className="text-gray-600">Truck ID: {trip.truck_ID}</p>
                      <p className="text-gray-600">Route ID: {trip.route_ID}</p>
                      <p className="text-gray-600">Start Time: {trip.start_time}</p>
                      <p className="text-gray-600">End Time: {trip.end_time}</p>
                      <p className="text-gray-600">Duration: {trip.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            storeID && ( // Only show the message if a store has been selected
              <p className="text-red-600 mt-4">
                No finished trips found for Store ID: {storeID}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishedTrips;
