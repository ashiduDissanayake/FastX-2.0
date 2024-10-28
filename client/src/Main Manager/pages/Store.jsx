// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const Store = () => {
//     const [driverData, setDriverData] = useState([]);
//     const [assistantData, setAssistantData] = useState([]);
//     const [truckData, setTruckData] = useState([]);
//     const [storeData, setStoreData] = useState([]);
//     const [routeData, setRouteData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [orderData, setOrderData] = useState([]); 
//     const [activePage, setActivePage] = useState("Schedule a New Trip");

//     const [selectedDriver, setSelectedDriver] = useState("");
//     const [selectedAssistant, setSelectedAssistant] = useState("");
//     const [selectedTruck, setSelectedTruck] = useState("");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [selectedRoute, setSelectedRoute] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     const loadTrucksByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/manager/gettruck/${storeId}`);
//             setTruckData(response.data);
//         } catch (error) {
//             console.error("Error loading trucks", error);
//         }
//     };

//     const loadRoutesByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/manager/getroute/${storeId}`);
//             setRouteData(response.data);
//         } catch (error) {
//             console.error("Error loading routes", error);
//         }
//     };

//     const loadDriversByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/manager/getdriver/${storeId}`);
//             setDriverData(response.data);
//         } catch (error) {
//             console.error("Error loading drivers", error);
//         }
//     };

//     const loadAssistantsByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/manager/getdriverassistant/${storeId}`);
//             setAssistantData(response.data);
//         } catch (error) {
//             console.error("Error loading assistants", error);
//         }
//     };

//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadDriversByStore(storeId);
//         loadAssistantsByStore(storeId);
//         loadRoutesByStore(storeId);
//         loadTrucksByStore(storeId);
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar
//                 activePage={activePage}
//                 setActivePage={setActivePage}
//                 handleNavigation={handleNavigation}
//             />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 <form
//                     className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600"
//                 >
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">{order.status}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;




//1st edit with only show up corresponding order table when i select a store.

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';


// const Store = () => {
//     const [driverData, setDriverData] = useState([]);
//     const [assistantData, setAssistantData] = useState([]);
//     const [truckData, setTruckData] = useState([]);
//     const [storeData, setStoreData] = useState([]);
//     const [routeData, setRouteData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");

//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // State to track progress
//     const [barVisible, setBarVisible] = useState(true); // State to track visibility of the progress bar
//     const [buttonLabel, setButtonLabel] = useState("Ship"); // State for button label

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//     };

//     // Function to handle button click and update progress
//     const handleStatusClick = () => {
//         // Show the progress bar if it's not visible
//         setBarVisible(true);

//         // Increment the progress by 10% each time the button is pressed
//         setProgress((prevProgress) => {
//             const newProgress = Math.min(prevProgress + 10, 100); // Cap at 100%
//             return newProgress;
//         });

//         // Change button label to "Shipped" when button is pressed
//         setButtonLabel("Shipped");
//     };

//     // Function to handle the new button click to reset the progress bar
//     const handleResetButtonClick = () => {
//         // Hide the progress bar and reset it to 0%
//         if (progress === 100) {
//             setBarVisible(false); // Hide the bar
//             setProgress(0); // Reset progress to 0%
//             setButtonLabel("Ship"); // Reset button label back to "Ship"
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Huge Progress Bar and Button */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress}%
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                     <button 
//                         className="btn btn-reset" 
//                         onClick={handleResetButtonClick} 
//                         disabled={progress < 100}
//                         style={{
//                             padding: '10px 20px',
//                             backgroundColor: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: progress < 100 ? 'not-allowed' : 'pointer',
//                             marginLeft: '10px', // Spacing between the bar and the button
//                         }}
//                     >
//                         Hide Progress Bar
//                     </button>
//                     <button 
//                         className="btn btn-ship" 
//                         onClick={handleStatusClick}
//                         style={{
//                             padding: '10px 20px',
//                             backgroundColor: '#28a745',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             marginLeft: '10px', // Spacing between buttons
//                         }}
//                     >
//                         {buttonLabel}
//                     </button>
//                 </div>

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button className="btn btn-shipped" onClick={handleStatusClick}>
//                                                     {order.status}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;







//2nd edit with progressbar

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [driverData, setDriverData] = useState([]);
//     const [assistantData, setAssistantData] = useState([]);
//     const [truckData, setTruckData] = useState([]);
//     const [storeData, setStoreData] = useState([]);
//     const [routeData, setRouteData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");

//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // State to track progress
//     const [barVisible, setBarVisible] = useState(true); // State to track visibility of the progress bar
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);
//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_ID] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
        
//         // Reset progress and visibility when selecting a new store
//         setProgress(0); // Reset progress to 0%
//         setBarVisible(true); // Make the progress bar visible again
//     };

//     // Function to handle button click and update progress
//     const handleStatusClick = (orderId) => {
//         // Update the status to "Shipped" for the clicked order
//         setOrderStatuses((prevStatuses) => ({
//             ...prevStatuses,
//             [orderId]: 'Shipped' // Change status to "Shipped"
//         }));

//         // Show the progress bar if it's not visible
//         setBarVisible(true);

//         // Increment the progress by 10% each time the button is pressed
//         setProgress((prevProgress) => {
//             const newProgress = Math.min(prevProgress + 10, 100); // Cap at 100%
//             return newProgress; // Return the new progress
//         });
//     };

//     // Function to handle the new button click to reset the progress bar
//     const handleResetButtonClick = () => {
//         // Hide the progress bar and reset it to 0%
//         if (progress === 100) {
//             setBarVisible(false); // Hide the bar
//             setProgress(0); // Reset progress to 0%
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Huge Progress Bar and Button */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress}%
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                     <button 
//                         className="btn btn-reset" 
//                         onClick={handleResetButtonClick} 
//                         disabled={progress < 100}
//                         style={{
//                             padding: '10px 20px',
//                             backgroundColor: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: progress < 100 ? 'not-allowed' : 'pointer',
//                             marginLeft: '10px', // Spacing between the bar and the button
//                         }}
//                     >
//                         Ship
//                     </button>
//                 </div>

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button className="btn btn-shipped" onClick={() => handleStatusClick(order.order_ID)}>
//                                                     {orderStatuses[order.order_ID] || order.status} {/* Display updated status */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;





//3rd edit with show the capacity of the corresponding train in progress bar when i select a store... 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [storeData, setStoreData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // Progress for train capacity
//     const [barVisible, setBarVisible] = useState(true); // To toggle progress bar visibility
//     const [trainCapacity, setTrainCapacity] = useState(0); // Train capacity for the selected store
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);

//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_ID] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     // Function to fetch train capacity for the selected store and set progress
//     const loadTrainCapacityByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
//             const capacity = response.data.capacity; // Assuming capacity comes in the response
//             setTrainCapacity(capacity);
//             setProgress(capacity); // Assign capacity directly to the progress
//         } catch (error) {
//             console.error("Error loading train capacity", error);
//         }
//     };

//     // Handle store change event
//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadTrainCapacityByStore(storeId); // Load train capacity for the selected store

//         // Reset the progress bar visibility and progress
//         setBarVisible(true);
//     };

//     // Function to handle button click and update progress
//     const handleStatusClick = (orderId) => {
//         // Update the status to "Shipped" for the clicked order
//         setOrderStatuses((prevStatuses) => ({
//             ...prevStatuses,
//             [orderId]: 'Shipped' // Change status to "Shipped"
//         }));
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Select Store */}
//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {/* Train Capacity Section */}
//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Train Capacity for Store {selectedStore}</h2>

//                         {/* Progress Bar for Train Capacity */}
//                         <div className="mb-4">
//                             {barVisible && (
//                                 <div
//                                     className="huge-progress-bar-container"
//                                     style={{
//                                         marginBottom: '20px',
//                                         width: '100%',
//                                         height: '50px',
//                                         backgroundColor: '#e0e0e0',
//                                         borderRadius: '10px',
//                                         overflow: 'hidden',
//                                     }}
//                                 >
//                                     <div
//                                         className="huge-progress-bar"
//                                         style={{
//                                             width: `${progress}%`,
//                                             backgroundColor: '#4caf50',
//                                             height: '100%',
//                                             transition: 'width 0.5s ease-in-out',
//                                         }}
//                                     >
//                                         <span
//                                             className="progress-text"
//                                             style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                         >
//                                             {progress}% Capacity
//                                         </span>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Orders Table */}
//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     className="btn btn-shipped"
//                                                     onClick={() => handleStatusClick(order.order_ID)}
//                                                 >
//                                                     {orderStatuses[order.order_ID] || order.status} {/* Display updated status */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;





//4th edit with show up the corresponding train capacity along progressbar

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [storeData, setStoreData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // Progress for train capacity
//     const [barVisible, setBarVisible] = useState(true); // To toggle progress bar visibility
//     const [trainCapacity, setTrainCapacity] = useState(0); // Train capacity for the selected store
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);

//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_ID] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     // Function to fetch train capacity for the selected store
//     const loadTrainCapacityByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
//             const capacity = response.data.capacity; // Assuming capacity comes in the response
//             setTrainCapacity(capacity);
//         } catch (error) {
//             console.error("Error loading train capacity", error);
//         }
//     };

//     // Handle store change event
//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadTrainCapacityByStore(storeId); // Load train capacity for the selected store

//         // Reset the progress bar visibility and progress
//         setBarVisible(true);
//         setProgress(0); // Reset progress when switching stores
//     };

//     // Function to handle status button click
//     const handleStatusClick = (orderId) => {
//         // Update the status to "Shipped" for the clicked order
//         setOrderStatuses((prevStatuses) => ({
//             ...prevStatuses,
//             [orderId]: 'Shipped' // Change status to "Shipped"
//         }));

//         // Fill the progress bar by a set amount (e.g., 10%)
//         setProgress((prevProgress) => Math.min(prevProgress + 10, 100)); // Ensure progress doesn't exceed 100%
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Progress Bar for Train Capacity */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress}% Capacity
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Display Train Capacity */}
//                 {selectedStore && (
//                     <div className="mb-4">
//                         <h2 className="text-xl font-bold">Train Capacity for Store {selectedStore}: {trainCapacity}</h2>
//                     </div>
//                 )}

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     className="btn btn-shipped"
//                                                     onClick={() => handleStatusClick(order.order_ID)}
//                                                 >
//                                                     {orderStatuses[order.order_ID] || order.status} {/* Display updated status */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;




//5th edition

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [storeData, setStoreData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // Progress for train capacity
//     const [barVisible, setBarVisible] = useState(true); // To toggle progress bar visibility
//     const [trainCapacity, setTrainCapacity] = useState(0); // Train capacity for the selected store
//     const [availableCapacity, setAvailableCapacity] = useState(0); // Track available capacity
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);

//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_ID] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     // Function to fetch train capacity for the selected store
//     const loadTrainCapacityByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
//             const capacity = response.data.capacity; // Assuming capacity comes in the response
//             setTrainCapacity(capacity);
//             setAvailableCapacity(capacity); // Initialize available capacity
//         } catch (error) {
//             console.error("Error loading train capacity", error);
//         }
//     };

//     // Handle store change event
//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadTrainCapacityByStore(storeId); // Load train capacity for the selected store

//         // Reset the progress bar visibility and progress
//         setBarVisible(true);
//         setProgress(0); // Reset progress when switching stores
//     };

//     // Function to handle status button click
//     const handleStatusClick = (orderId) => {
//         const order = filteredData.find(order => order.order_ID === orderId);
        
//         if (order) {
//             // Update the status to "Shipped" for the clicked order
//             setOrderStatuses((prevStatuses) => ({
//                 ...prevStatuses,
//                 [orderId]: 'Shipped' // Change status to "Shipped"
//             }));

//             // Deduct the order capacity from available capacity
//             setAvailableCapacity((prevCapacity) => Math.max(prevCapacity - order.capacity, 0)); // Ensure it doesn't go below 0
            
//             // Fill the progress bar by a set amount (e.g., 10%)
//             setProgress((prevProgress) => Math.min(prevProgress + 10, 100)); // Ensure progress doesn't exceed 100%
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Progress Bar for Train Capacity */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress}% Capacity
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Display Train Capacity and Available Capacity */}
//                 {selectedStore && (
//                     <div className="mb-4">
//                         <h2 className="text-xl font-bold">Train Capacity for Store {selectedStore}: {trainCapacity}</h2>
//                         <h3 className="text-lg">Available Capacity: {availableCapacity}</h3>
//                     </div>
//                 )}

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     className="btn btn-shipped"
//                                                     onClick={() => handleStatusClick(order.order_ID)}
//                                                 >
//                                                     {orderStatuses[order.order_ID] || order.status} {/* Display updated status */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;




//6th edition

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [storeData, setStoreData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // Progress for train capacity
//     const [barVisible, setBarVisible] = useState(true); // To toggle progress bar visibility
//     const [trainCapacity, setTrainCapacity] = useState(0); // Train capacity for the selected store
//     const [availableCapacity, setAvailableCapacity] = useState(0); // Track available capacity
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);

//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_ID] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     // Function to fetch train capacity for the selected store
//     const loadTrainCapacityByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
//             const capacity = response.data.capacity; // Assuming capacity comes in the response
//             setTrainCapacity(capacity);
//             setAvailableCapacity(capacity); // Initialize available capacity
//         } catch (error) {
//             console.error("Error loading train capacity", error);
//         }
//     };

//     // Handle store change event
//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadTrainCapacityByStore(storeId); // Load train capacity for the selected store

//         // Reset the progress bar visibility and progress
//         setBarVisible(true);
//         setProgress(0); // Reset progress when switching stores
//     };

//     // Function to handle status button click
//     const handleStatusClick = (orderId) => {
//         const order = filteredData.find(order => order.order_ID === orderId);
        
//         if (order) {
//             // Update the status to "Shipped" for the clicked order
//             setOrderStatuses((prevStatuses) => ({
//                 ...prevStatuses,
//                 [orderId]: 'Shipped' // Change status to "Shipped"
//             }));

//             // Deduct the order capacity from available capacity
//             setAvailableCapacity((prevCapacity) => Math.max(prevCapacity - order.capacity, 0)); // Ensure it doesn't go below 0
            
//             // Fill the progress bar by a set amount (e.g., 10%)
//             setProgress((prevProgress) => Math.min(prevProgress + 10, 100)); // Ensure progress doesn't exceed 100%
//         }
//     };

//     // Function to handle the new button click
//     const handleNewButtonClick = () => {
//         // Add logic for what this button should do
//         console.log("New button clicked!"); // Placeholder action
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Progress Bar for Train Capacity */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress}% Capacity
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* New Button near the Progress Bar */}
//                 <div className="mb-4">
//                     <button
//                         onClick={handleNewButtonClick}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//                     >
//                         Ship
//                     </button>
//                 </div>

//                 {/* Display Train Capacity and Available Capacity */}
//                 {selectedStore && (
//                     <div className="mb-4">
//                         <h2 className="text-xl font-bold">Train Capacity for Store {selectedStore}: {trainCapacity}</h2>
//                         <h3 className="text-lg">Available Capacity: {availableCapacity}</h3>
//                     </div>
//                 )}

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     className="btn btn-shipped"
//                                                     onClick={() => handleStatusClick(order.order_ID)}
//                                                 >
//                                                     {orderStatuses[order.order_ID] || order.status} {/* Display updated status */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [storeData, setStoreData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // Progress for train capacity
//     const [barVisible, setBarVisible] = useState(true); // To toggle progress bar visibility
//     const [trainCapacity, setTrainCapacity] = useState(0); // Train capacity for the selected store
//     const [availableCapacity, setAvailableCapacity] = useState(0); // Track available capacity
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses
//     const [shipButtonLabel, setShipButtonLabel] = useState("Ship"); // State for ship button label

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);

//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_ID] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };

//     // Function to fetch train capacity for the selected store
//     const loadTrainCapacityByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
//             const capacity = response.data.capacity; // Assuming capacity comes in the response
//             setTrainCapacity(capacity);
//             setAvailableCapacity(capacity); // Initialize available capacity
//         } catch (error) {
//             console.error("Error loading train capacity", error);
//         }
//     };

//     // Handle store change event
//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadTrainCapacityByStore(storeId); // Load train capacity for the selected store

//         // Reset the progress bar visibility and progress
//         setBarVisible(true);
//         setProgress(0); // Reset progress when switching stores

//         // Reset button label to default
//         setShipButtonLabel("Ship"); // Reset button label
//     };

//     // Function to handle status button click
//     const handleStatusClick = (orderId) => {
//         const order = filteredData.find(order => order.order_ID === orderId);
        
//         if (order) {
//             // Update the status to "Shipped" for the clicked order
//             setOrderStatuses((prevStatuses) => ({
//                 ...prevStatuses,
//                 [orderId]: 'Shipped' // Change status to "Shipped"
//             }));

//             // Deduct the order capacity from available capacity
//             setAvailableCapacity((prevCapacity) => Math.max(prevCapacity - order.capacity, 0)); // Ensure it doesn't go below 0
            
//             // Fill the progress bar by a set amount (e.g., 10%)
//             setProgress((prevProgress) => Math.min(prevProgress + 10, 100)); // Ensure progress doesn't exceed 100%
//         }
//     };

//     // Function to handle the new button click
//     const handleNewButtonClick = () => {
//         setShipButtonLabel("Shipped"); // Change button label to "Shipped"
//         // Add logic for what this button should do
//         console.log("New button clicked!"); // Placeholder action
//     };

//     // Reset button label if there are no orders
//     useEffect(() => {
//         if (filteredData.length === 0) {
//             setShipButtonLabel("Ship"); // Reset button label if no orders are available
//         }
//     }, [filteredData]); // Effect runs whenever filteredData changes

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Progress Bar for Train Capacity */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress}% Capacity
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* New Button near the Progress Bar */}
//                 <div className="mb-4">
//                     <button
//                         onClick={handleNewButtonClick}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//                     >
//                         {shipButtonLabel} {/* Dynamic button label */}
//                     </button>
//                 </div>

//                 {/* Display Train Capacity and Available Capacity */}
//                 {selectedStore && (
//                     <div className="mb-4">
//                         <h2 className="text-xl font-bold">Train Capacity for Store {selectedStore}: {trainCapacity}</h2>
//                         <h3 className="text-lg">Available Capacity: {availableCapacity}</h3>
//                     </div>
//                 )}

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Cart ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                     <th className="px-4 py-2 border">Store ID</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_ID}>
//                                             <td className="px-4 py-2 border">{order.order_ID}</td>
//                                             <td className="px-4 py-2 border">{order.cart_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_ID}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                             <td className="px-4 py-2 border">{order.store_ID}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button
//                                                     className="btn btn-shipped"
//                                                     onClick={() => handleStatusClick(order.order_ID)}
//                                                 >
//                                                     {orderStatuses[order.order_ID] || order.status} {/* Display updated status */}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No Orders Available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;





//7th edition now

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';

// const Store = () => {
//     const [storeData, setStoreData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [activePage, setActivePage] = useState("Schedule a New Trip");
//     const [selectedStore, setSelectedStore] = useState("");
//     const [progress, setProgress] = useState(0); // Progress for train capacity
//     const [barVisible, setBarVisible] = useState(true); // To toggle progress bar visibility
//     const [trainCapacity, setTrainCapacity] = useState(0); // Train capacity for the selected store
//     const [availableCapacity, setAvailableCapacity] = useState(0); // Track available capacity
//     const [orderStatuses, setOrderStatuses] = useState({}); // State to track order statuses
//     const [shipButtonLabel, setShipButtonLabel] = useState("Ship"); // State for ship button label

//     const handleNavigation = (item) => {
//         setActivePage(item);
//     };

//     useEffect(() => {
//         loadStores();
//     }, []);

//     const loadStores = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/manager/getstore");
//             setStoreData(response.data);
//         } catch (error) {
//             console.error("Error loading stores", error);
//         }
//     };

//     const loadOrdersByStore = async (storeId) => {
//         try {
//             const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
//             setFilteredData(response.data);

//             // Initialize order statuses for the new store
//             const initialStatuses = {};
//             response.data.forEach(order => {
//                 initialStatuses[order.order_id] = order.status; // Set initial status
//             });
//             setOrderStatuses(initialStatuses);
//         } catch (error) {
//             console.error("Error loading orders", error);
//         }
//     };



//     // Function to fetch train capacity for the selected store
//     const loadTrainCapacityByStore = async (storeId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
//             const capacity = response.data.capacity; // Assuming capacity comes in the response
//             setTrainCapacity(capacity);
//             setAvailableCapacity(capacity); // Initialize available capacity
//         } catch (error) {
//             console.error("Error loading train capacity", error);
//         }
//     };

//     // Handle store change event
//     const handleStoreChange = (e) => {
//         const storeId = e.target.value;
//         setSelectedStore(storeId);
//         loadOrdersByStore(storeId); // Load orders when store is selected
//         loadTrainCapacityByStore(storeId); // Load train capacity for the selected store

//         // Reset the progress bar visibility and progress
//         setBarVisible(true);
//         setProgress(0); // Reset progress when switching stores

//         // Reset button label to default
//         setShipButtonLabel("Ship"); // Reset button label
//     };

//     // Function to handle status button click
//     const handleStatusClick = (orderId) => {
//         const order = filteredData.find(order => order.order_id === orderId);
        
//         if (order) {
//             // Update the status to "Shipped" for the clicked order
//             setOrderStatuses((prevStatuses) => ({
//                 ...prevStatuses,
//                 [orderId]: 'Shipped' // Change status to "Shipped"
//             }));

//             // Calculate the new available capacity first
//             const newAvailableCapacity = Math.max(availableCapacity - order.capacity, 0); // Ensure it doesn't go below 0
//             setAvailableCapacity(newAvailableCapacity); // Update available capacity

//             // Calculate the new progress based on the new available capacity
//             const newProgress = ((trainCapacity - newAvailableCapacity) / trainCapacity) * 100; // Calculate the percentage of used capacity
//             setProgress(Math.min(newProgress, 100)); // Ensure progress doesn't exceed 100%
//         }
//     };

//     // Function to handle the new button click
//     const handleNewButtonClick = () => {
//         setShipButtonLabel("Shipped"); // Change button label to "Shipped"
//         // Add logic for what this button should do
//         console.log("New button clicked!"); // Placeholder action
//     };

//     // Reset button label if there are no orders
//     useEffect(() => {
//         if (filteredData.length === 0) {
//             setShipButtonLabel("Ship"); // Reset button label if no orders are available
//         }
//     }, [filteredData]); // Effect runs whenever filteredData changes

//     // Determine if the button should be disabled
//     const isButtonDisabled = filteredData.length === 0 || availableCapacity === 0 || progress === 0; // Disable if no orders, capacity is 0, or progress is 0

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

//             <div className="w-3/4 p-6">
//                 <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

//                 {/* Progress Bar for Train Capacity */}
//                 <div className="mb-4">
//                     {barVisible && (
//                         <div
//                             className="huge-progress-bar-container"
//                             style={{
//                                 marginBottom: '20px',
//                                 width: '100%',
//                                 height: '50px',
//                                 backgroundColor: '#e0e0e0',
//                                 borderRadius: '10px',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <div
//                                 className="huge-progress-bar"
//                                 style={{
//                                     width: `${progress}%`,
//                                     backgroundColor: '#4caf50',
//                                     height: '100%',
//                                     transition: 'width 0.5s ease-in-out',
//                                 }}
//                             >
//                                 <span
//                                     className="progress-text"
//                                     style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
//                                 >
//                                     {progress.toFixed(2)}% Capacity
//                                 </span>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* New Button near the Progress Bar */}
//                 <div className="mb-4">
//                     <button
//                         onClick={handleNewButtonClick}
//                         className={`px-4 py-2 rounded transition duration-200 ${isButtonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//                         disabled={isButtonDisabled} // Disable button if no orders, capacity is 0, or progress is 0
//                     >
//                         {shipButtonLabel} {/* Dynamic button label */}
//                     </button>
//                 </div>

//                 {/* Display Train Capacity and Available Capacity */}
//                 {selectedStore && (
//                     <div className="mb-4">
//                         <h2 className="text-xl font-bold">Train Capacity for Store {selectedStore}: {trainCapacity}</h2>
//                         <h3 className="text-lg">Available Capacity: {availableCapacity}</h3>
//                     </div>
//                 )}

//                 <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
//                     <div className="mb-4">
//                         <label className="block mb-2 text-gray-700">Select Store</label>
//                         <select
//                             value={selectedStore}
//                             onChange={handleStoreChange}
//                             className="w-full px-3 py-2 border rounded-lg"
//                             required
//                         >
//                             <option value="">-- Select Store --</option>
//                             {storeData.map((store) => (
//                                 <option key={store.store_ID} value={store.store_ID}>
//                                     {store.store_ID}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </form>

//                 {selectedStore && (
//                     <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

//                         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//                             <thead>
//                                 <tr>
//                                     <th className="px-4 py-2 border">Order ID</th>
//                                     <th className="px-4 py-2 border">Customer ID</th>
//                                     <th className="px-4 py-2 border">Route ID</th>
//                                     <th className="px-4 py-2 border">Order Date Time</th>
//                                     <th className="px-4 py-2 border">Total Amount</th>
//                                     <th className="px-4 py-2 border">Status</th>
//                                     <th className="px-4 py-2 border">Capacity Limit</th>
//                                     <th className="px-4 py-2 border">Capacity</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((order) => (
//                                         <tr key={order.order_id}>
//                                             <td className="px-4 py-2 border">{order.order_id}</td>
//                                             <td className="px-4 py-2 border">{order.customer_ID}</td>
//                                             <td className="px-4 py-2 border">{order.route_id}</td>
//                                             <td className="px-4 py-2 border">{order.order_date}</td>
//                                             <td className="px-4 py-2 border">{order.total_amount}</td>
//                                             <td className="px-4 py-2 border">
//                                                 {orderStatuses[order.order_id]} {/* Display order status */}
//                                                 {orderStatuses[order.order_id] !== 'Shipped' && (
//                                                     <button
//                                                         onClick={() => handleStatusClick(order.order_id)}
//                                                         className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                                                     >
//                                                         Ship
//                                                     </button>
//                                                 )}
//                                             </td>
//                                             <td className="px-4 py-2 border">{order.capacity_limit}</td>
//                                             <td className="px-4 py-2 border">{order.capacity}</td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="px-4 py-2 border text-center">No orders found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Store;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Store = () => {
    const [storeData, setStoreData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activePage, setActivePage] = useState("Schedule a New Trip");
    const [selectedStore, setSelectedStore] = useState("");
    const [progress, setProgress] = useState(0);
    const [barVisible, setBarVisible] = useState(true);
    const [trainCapacity, setTrainCapacity] = useState(0);
    const [availableCapacity, setAvailableCapacity] = useState(0);
    const [orderStatuses, setOrderStatuses] = useState({});
    const [shipButtonLabel, setShipButtonLabel] = useState("Ship");

    const handleNavigation = (item) => {
        setActivePage(item);
    };

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

    const loadOrdersByStore = async (storeId) => {
        try {
            const response = await axios.post(`http://localhost:8080/mainmanager/getorder/${storeId}`);
            setFilteredData(response.data);

            const initialStatuses = {};
            response.data.forEach(order => {
                initialStatuses[order.order_id] = order.status;
            });
            setOrderStatuses(initialStatuses);
        } catch (error) {
            console.error("Error loading orders", error);
        }
    };

    const loadTrainCapacityByStore = async (storeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/mainmanager/getTrainCapacity/${storeId}`);
            const capacity = response.data.capacity;
            setTrainCapacity(capacity);
            setAvailableCapacity(capacity);
        } catch (error) {
            console.error("Error loading train capacity", error);
        }
    };

    const handleStoreChange = (e) => {
        const storeId = e.target.value;
        setSelectedStore(storeId);
        loadOrdersByStore(storeId);
        loadTrainCapacityByStore(storeId);

        setBarVisible(true);
        setProgress(0);
        setShipButtonLabel("Ship");
    };

    // Function to handle status button click and update in the database
    const handleStatusClick = async (orderId) => {
        const order = filteredData.find(order => order.order_id === orderId);

        if (order) {
            setOrderStatuses((prevStatuses) => ({
                ...prevStatuses,
                [orderId]: 'Shipped'
            }));

            const newAvailableCapacity = Math.max(availableCapacity - order.capacity, 0);
            setAvailableCapacity(newAvailableCapacity);

            const newProgress = ((trainCapacity - newAvailableCapacity) / trainCapacity) * 100;
            setProgress(Math.min(newProgress, 100));

            await updateOrderStatus(orderId, 'Shipped');
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:8080/mainmanager/updateOrderStatus`, {
                order_id: orderId,
                status: status
            });
            console.log(`Order ${orderId} status updated to ${status} in the database.`);
        } catch (error) {
            console.error("Error updating order status", error);
        }
    };

    const handleNewButtonClick = () => {
        setShipButtonLabel("Shipped");
        console.log("New button clicked!");
    };

    useEffect(() => {
        if (filteredData.length === 0) {
            setShipButtonLabel("Ship");
        }
    }, [filteredData]);

    const isButtonDisabled = filteredData.length === 0 || availableCapacity === 0 || progress === 0;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} handleNavigation={handleNavigation} />

            <div className="w-3/4 p-6">
                <h1 className="text-3xl text-center font-bold mb-6">Store</h1>

                <div className="mb-4">
                    {barVisible && (
                        <div
                            className="huge-progress-bar-container"
                            style={{
                                marginBottom: '20px',
                                width: '100%',
                                height: '50px',
                                backgroundColor: '#e0e0e0',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                className="huge-progress-bar"
                                style={{
                                    width: `${progress}%`,
                                    backgroundColor: '#4caf50',
                                    height: '100%',
                                    transition: 'width 0.5s ease-in-out',
                                }}
                            >
                                <span
                                    className="progress-text"
                                    style={{ color: 'white', paddingLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}
                                >
                                    {progress.toFixed(2)}% Capacity
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <button
                        onClick={handleNewButtonClick}
                        className={`px-4 py-2 rounded transition duration-200 ${isButtonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        disabled={isButtonDisabled}
                    >
                        {shipButtonLabel}
                    </button>
                </div>

                {selectedStore && (
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Train Capacity for Store {selectedStore}: {trainCapacity}</h2>
                        <h3 className="text-lg">Available Capacity: {availableCapacity}</h3>
                    </div>
                )}

                <form className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg text-gray-600">
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
                </form>

                {selectedStore && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Details for Store {selectedStore}</h2>

                        <table className="table-auto w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Order ID</th>
                                    <th className="px-4 py-2 border">Customer ID</th>
                                    <th className="px-4 py-2 border">Route ID</th>
                                    <th className="px-4 py-2 border">Order Date Time</th>
                                    <th className="px-4 py-2 border">Total Amount</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Capacity Limit</th>
                                    <th className="px-4 py-2 border">Capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((order) => (
                                        <tr key={order.order_id}>
                                            <td className="px-4 py-2 border">{order.order_id}</td>
                                            <td className="px-4 py-2 border">{order.customer_ID}</td>
                                            <td className="px-4 py-2 border">{order.route_id}</td>
                                            <td className="px-4 py-2 border">{order.order_date}</td>
                                            <td className="px-4 py-2 border">{order.total_amount}</td>
                                            <td className="px-4 py-2 border">
                                                {orderStatuses[order.order_id]}
                                                {orderStatuses[order.order_id] !== 'Shipped' && (
                                                    <button
                                                        onClick={() => handleStatusClick(order.order_id)}
                                                        className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                    >
                                                        Ship
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 border">{order.capacity_limit}</td>
                                            <td className="px-4 py-2 border">{order.capacity}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-2 border text-center">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Store;
