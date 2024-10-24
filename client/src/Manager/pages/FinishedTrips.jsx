import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaCheckCircle } from "react-icons/fa";

const FinishedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Finished Trips");

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true); // Start loading
      setErrorMessage(""); // Clear previous error messages
  
      try {
          const response = await axios.get("http://localhost:8080/manager/getfinishedtrips", { withCredentials: true });
  
          if (response.status === 200) {
              if (response.data.length === 0) {
                  setErrorMessage("No finished trips found for your assigned store.");
              } else {
                  setTrips(response.data);
              }
          } else {
              setErrorMessage("Failed to fetch finished trips.");
          }
      } catch (error) {
          console.error("Error loading finished trips:", error); // Log error for debugging
  
          if (error.response && error.response.data) {
              setErrorMessage(error.response.data.message || "Error loading finished trips. Please try again.");
          } else {
              setErrorMessage("Error loading finished trips. Please try again.");
          }
      } finally {
          setLoading(false); // End loading
      }
  };
  
  fetchTrips();
  
  }, []);

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

          {/* Loading State */}
          {loading ? (
            <p className="text-blue-600">Loading trips...</p>
          ) : (
            <>
              {/* Error Message */}
              {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}

              {/* Display Finished Trips */}
              {trips.length > 0 ? (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Finished Trips</h2>
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
                          <h3 className="text-xl font-semibold text-gray-800">Trip ID: {trip.schedule_ID}</h3>
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
                <p className="text-red-600 mt-4">No finished trips found for your assigned store.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishedTrips;
