import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaTruck } from "react-icons/fa";

const ActiveTrips = () => {
    const [storeID, setStoreID] = useState("");
    const [stores, setStores] = useState([]);
    const [trips, setTrips] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState("Active Trips");

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get("http://localhost:8080/manager/getstore");
                setStores(response.data);
            } catch (error) {
                setErrorMessage("Error loading stores. Please try again.");
            }
        };
        fetchStores();
    }, []);

    const handleStoreIDChange = (e) => {
        setStoreID(e.target.value);
    };

    const fetchTrips = async () => {
        if (!storeID) {
            setErrorMessage("Please select a valid Store.");
            return;
        }

        setLoading(true); // Set loading state
        try {
            const response = await axios.get(`http://localhost:8080/manager/getactivetrips/${storeID}`);
            if (response.data.length === 0) {
                setErrorMessage(`No active trips found for Store ID: ${storeID}`);
                setTrips([]);
            } else {
                setErrorMessage("");
                setTrips(response.data);
            }
        } catch (error) {
            setErrorMessage("Error fetching trips. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const endTrip = async (schedule_ID) => {
        if (window.confirm("Are you sure you want to end this trip?")) {
            try {
                const response = await axios.post("http://localhost:8080/manager/endtrip", { schedule_ID });
                setSuccessMessage(response.data.message);
                fetchTrips();
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

                    {/* Dropdown for Store Selection */}
                    <div className="mb-6 w-full max-w-md">
                        <label className="block mb-3 text-lg font-semibold text-gray-800">Select Store</label>
                        <select
                            value={storeID}
                            onChange={handleStoreIDChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition ease-in-out duration-200"
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
                        {loading ? "Loading..." : "View Active Trips"}
                    </button>

                    {/* Display Messages */}
                    {errorMessage && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
                    {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}

                    {/* Display Trips */}
                    {trips.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
                                Active Trips for Store ID: {storeID}
                            </h2>
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
