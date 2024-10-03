import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; 


const ScheduleTrip = () => {
    const [driverData, setDriverData] = useState([]);
    const [assistantData, setAssistantData] = useState([]);
    const [truckData, setTruckData] = useState([]);
    const [storeData, setStoreData] = useState([]);
    const [routeData, setRouteData] = useState([]);
    const [activePage, setActivePage] = useState("Schedule a New Trip");

    const [selectedDriver, setSelectedDriver] = useState("");
    const [selectedAssistant, setSelectedAssistant] = useState("");
    const [selectedTruck, setSelectedTruck] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleNavigation = (item) => {
        setActivePage(item);
        // Handle additional navigation logic if needed
      };

    // Load data for dropdowns
    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {
        try {
            const response = await axios.get("http://localhost:8080/manager/getstore");
            setStoreData(response.data);
        } catch (error) {
            console.error("Error loading stores", error);
        }
    };

    const loadTrucksByStore = async (storeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/gettruck/${storeId}`);
            setTruckData(response.data);
        } catch (error) {
            console.error("Error loading trucks", error);
        }
    };

    const loadRoutesByStore = async (storeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/getroute/${storeId}`);
            setRouteData(response.data);
        } catch (error) {
            console.error("Error loading routes", error);
        }
    };

    const loadDriversByStore = async (storeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/getdriver/${storeId}`);
            setDriverData(response.data);
        } catch (error) {
            console.error("Error loading drivers", error);
        }
    };

    const loadAssistantsByStore = async (storeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/getdriverassistant/${storeId}`);
            setAssistantData(response.data);
        } catch (error) {
            console.error("Error loading assistants", error);
        }
    };

    const handleStoreChange = (e) => {
        const storeId = e.target.value;
        setSelectedStore(storeId);
        loadDriversByStore(storeId);
        loadAssistantsByStore(storeId);
        loadRoutesByStore(storeId);
        loadTrucksByStore(storeId);
    };

    // Handle form submission
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
        };
    
        try {
            const response = await axios.post('http://localhost:8080/manager/scheduletrip', scheduleData);
            alert('Trip scheduled successfully!');
            console.log('Response:', response.data);
        } catch (error) {
            // Handle the error response and show the message to the manager
            if (error.response) {
                alert(error.response.data.message);  // Show the error message from the backend
            } else {
                alert('An error occurred while scheduling the trip.');
            }
            console.error('Error scheduling the trip', error);
        }
    };
    

    return (
        <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleNavigation={handleNavigation}
      />

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl text-center font-bold mb-6">Schedule A Trip</h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600"
            >
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
                            <option key={driver.driver_ID} value={driver.driver_ID} disabled={driver.status !== "inactive" || driver.current_working_time === 40}>
                                {`${driver.driver_ID} - worked ${driver.current_working_time} hrs`} {driver.status === "inactive" ? "" : "(active)"}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Assistant Selection */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Select Assistant</label>
                    <select
                        value={selectedAssistant}
                        onChange={(e) => setSelectedAssistant(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="">-- Select Assistant --</option>
                        {assistantData.map((assistant) => (
                            <option key={assistant.assistant_ID} value={assistant.assistant_ID} disabled={assistant.status !== "inactive" || assistant.current_working_time === 60}>
                                {`${assistant.assistant_ID} - worked ${assistant.current_working_time} hrs`}  {assistant.status === "inactive" ? "" : "(active)"}
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
                            <option key={truck.truck_ID} value={truck.truck_ID} disabled={truck.status !== "inactive"}>
                                {truck.truck_ID} {truck.status === "inactive" ? "" : "(active)"}
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

                {/* End Time Selection */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">End Time</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
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
        </div>
        </div>
   
    );
};

export default ScheduleTrip;