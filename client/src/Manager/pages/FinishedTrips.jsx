import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaTruck } from "react-icons/fa";

const FinishedTrips = () => {
    const [storeID, setStoreID] = useState("");
    const [stores, setStores] = useState([]);
    const [trips, setTrips] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [activePage, setActivePage] = useState("Finished Trips");

    // Load stores for the dropdown when the component mounts
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get("http://localhost:8080/manager/getstore");
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
    };

    // Fetch finished trips for the selected storeID
    const fetchTrips = async () => {
        if (!storeID) {
            setErrorMessage("Please select a valid Store.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/manager/getfinishedtrips/${storeID}`);
            if (response.data.length === 0) {
                setErrorMessage(`No finished trips found for Store ID: ${storeID}`);
                setTrips([]);
            } else {
                setErrorMessage("");
                setTrips(response.data);
            }
        } catch (error) {
            setErrorMessage("Error fetching trips. Please try again.");
            console.error("Error fetching trips:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-purple-50">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />

            <div className="w-3/4 p-6">
                <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">Finished Trips</h1>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Select Store</label>
                    <select
                        value={storeID}
                        onChange={handleStoreIDChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <button
                    onClick={fetchTrips}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
                >
                    View Finished Trips
                </button>

                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                {trips.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Finished Trips for Store ID: {storeID}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {trips.map((trip) => (
                                <div
                                    key={trip.schedule_ID}
                                    className="relative bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 overflow-hidden"
                                    style={{
                                        backgroundColor: "#f9f9f9",
                                    }}
                                >
                                    {/* Background Truck Icon */}
                                    <FaTruck
                                        className="absolute top-2 right-2 text-blue-600 opacity-20"
                                        style={{ fontSize: "8rem", zIndex: 0 }}
                                    />

                                    <h3 className="text-xl font-semibold text-gray-800 z-10">Trip ID: {trip.schedule_ID}</h3>
                                    <p className="text-gray-600 z-10">Driver ID: {trip.driver_ID}</p>
                                    <p className="text-gray-600 z-10">Assistant ID: {trip.assistant_ID}</p>
                                    <p className="text-gray-600 z-10">Truck ID: {trip.truck_ID}</p>
                                    <p className="text-gray-600 z-10">Route ID: {trip.route_ID}</p>
                                    <p className="text-gray-600 z-10">Start Time: {trip.start_time}</p>
                                    <p className="text-gray-600 z-10">End Time: {trip.end_time}</p>
                                    <p className="text-gray-600 z-10">Duration: {trip.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinishedTrips;
