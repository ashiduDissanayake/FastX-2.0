import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const ActiveTrips = () => {
    const [storeID, setStoreID] = useState("");
    const [stores, setStores] = useState([]); // For dropdown options
    const [trips, setTrips] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activePage, setActivePage] = useState("Active Trips");

    // Load stores for the dropdown when the component mounts
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get("http://localhost:8080/manager/getstore");
                setStores(response.data); // Set the stores data from backend
            } catch (error) {
                setErrorMessage("Error loading stores. Please try again.");
                console.error("Error loading stores:", error);
            }
        };
        fetchStores();
    }, []);

    const handleStoreIDChange = (e) => {
        setStoreID(e.target.value);
    };

    // Fetch active trips for the selected storeID
    const fetchTrips = async () => {
        if (!storeID) {
            setErrorMessage("Please select a valid Store.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/manager/getactivetrips/${storeID}`);
            if (response.data.length === 0) {
                setErrorMessage(`No active trips found for Store ID: ${storeID}`);
                setTrips([]);
            } else {
                setErrorMessage("");
                setTrips(response.data); // Store trips data
            }
        } catch (error) {
            setErrorMessage("Error fetching trips. Please try again.");
            console.error("Error fetching trips:", error);
        }
    };

    // End trip function
    const endTrip = async (schedule_ID) => {
        try {
            const response = await axios.post("http://localhost:8080/manager/endtrip", { schedule_ID });
            setSuccessMessage(response.data.message); // Display success message
            fetchTrips(); // Refresh trips after ending a trip
        } catch (error) {
            setErrorMessage("Error ending trip. Please try again.");
            console.error("Error ending trip:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-purple-50">
            {/* Sidebar */}
            <Sidebar activePage={activePage} setActivePage={setActivePage} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">Active Trips</h1>

                {/* Dropdown for Store Selection */}
                <div className="mb-4">
                    <label className="block mb-2 text-lg font-semibold text-gray-700">Select Store</label>
                    <select
                        value={storeID}
                        onChange={handleStoreIDChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    View Active Trips
                </button>

                {/* Display Messages */}
                {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}

                {/* Display Trips */}
                {trips.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Trips for Store ID: {storeID}</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {trips.map((trip) => (
                                <div key={trip.schedule_ID} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800">Trip ID: {trip.schedule_ID}</h3>
                                    <p className="text-gray-600">Driver ID: {trip.driver_ID}</p>
                                    <p className="text-gray-600">Assistant ID: {trip.assistant_ID}</p>
                                    <p className="text-gray-600">Truck ID: {trip.truck_ID}</p>
                                    <p className="text-gray-600">Route ID: {trip.route_ID}</p>
                                    <p className="text-gray-600">Start Time: {trip.start_time}</p>
                                    <button
                                        className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
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
    );
};

export default ActiveTrips;
