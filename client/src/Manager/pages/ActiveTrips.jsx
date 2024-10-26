import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaTruck } from "react-icons/fa";

const ActiveTrips = () => {
    const [trips, setTrips] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState("Active Trips");

    // Fetch trips when the component mounts
    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/manager/getactivetrips", { withCredentials: true });
                if (response.data.length === 0) {
                    setErrorMessage("No active trips found.");
                    setTrips([]);
                } else {
                    setErrorMessage("");
                    setTrips(response.data);
                }
            } catch (error) {
                setErrorMessage("Error fetching trips. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrips(); // Fetch trips immediately after mounting
    }, []);

    const endTrip = async (schedule_ID) => {
        if (window.confirm("Are you sure you want to end this trip?")) {
            try {
                const response = await axios.post("http://localhost:8080/manager/endtrip", { schedule_ID });
                setSuccessMessage(response.data.message);
                // Fetch updated list of trips after ending one
                const fetchUpdatedTrips = await axios.get("http://localhost:8080/manager/getactivetrips", { withCredentials: true });
                setTrips(fetchUpdatedTrips.data);
            } catch (error) {
                setErrorMessage("Error ending trip. Please try again.");
            }
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
                        Active Trips
                    </h1>

                    {/* Loading or Error Message */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : errorMessage ? (
                        <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
                    ) : (
                        successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>
                    )}

                    {/* Display Trips */}
                    {trips.length > 0 && (
                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {trips.map((trip) => (
                                    <div key={trip.schedule_ID} className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                        <FaTruck className="absolute top-4 right-4 text-blue-600 opacity-10" style={{ fontSize: "5rem" }} />
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Trip ID: {trip.schedule_ID}</h3>
                                        <p className="text-gray-600">Driver ID: {trip.driver_ID}</p>
                                        <p className="text-gray-600">Assistant ID: {trip.assistant_ID}</p>
                                        <p className="text-gray-600">Truck ID: {trip.truck_ID}</p>
                                        <p className="text-gray-600">Route ID: {trip.route_ID}</p>
                                        <p className="text-gray-600">Start Time: {trip.start_time}</p>
                                        <button
                                            className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-transform duration-300 transform hover:-translate-y-1"
                                            onClick={() => endTrip(trip.schedule_ID)}
                                        >
                                            End Trip
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveTrips;
