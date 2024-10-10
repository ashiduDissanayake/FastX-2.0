import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectRoute = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [endLocations, setEndLocations] = useState([]);
  const [selectedEndLocation, setSelectedEndLocation] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [selectedRouteID, setSelectedRouteID] = useState('');

  // Fetch stores on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/user/stores')
      .then(response => setStores(response.data))
      .catch(error => console.error('Error fetching stores:', error));
  }, []);

  // Fetch end locations when a store is selected
  useEffect(() => {
    if (selectedStore) {
      axios.get(`http://localhost:8080/user/end-locations/${selectedStore}`)
        .then(response => setEndLocations(response.data))
        .catch(error => console.error('Error fetching end locations:', error));
    }
  }, [selectedStore]);

  // Fetch image link when store and end location are selected
  useEffect(() => {
    if (selectedStore && selectedEndLocation) {
      axios.get('http://localhost:8080/user/route-image', {
        params: {
          store: selectedStore,
          endLocation: selectedEndLocation.route // Accessing the selected route object
        }
      })
      .then(response => setImageLink(response.data.imageLink))
      .catch(error => console.error('Error fetching image link:', error));
    }
  }, [selectedStore, selectedEndLocation]);

  // Handle end location change
  const handleEndLocationChange = (e) => {
    const selected = endLocations.find(location => location.route === e.target.value);
    setSelectedEndLocation(selected);
    if (selected) {
      setSelectedRouteID(selected.route_ID); // Set the selected route ID
    }
  };

  // Handle purchasing the selected items
  const placeOrder = async (selectedRouteID) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/placeorder",
        { route_ID: selectedRouteID }, // No need to send products, as they're already marked in the database
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Order placed successfully!");
      } else {
        alert(
          response.data.message || "Failed to place order. Please try again."
        );
      }
    } catch (error) {
      console.error("Order placement failed", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-pink-500">Select Route</h1>
      
      {/* Store selection */}
      <div className="mb-6">
        <label htmlFor="storeSelect" className="block mb-2 text-lg">Select Store:</label>
        <select
          id="storeSelect"
          className="border border-pink-500 rounded p-3 w-full bg-gray-800 text-white"
          value={selectedStore}
          onChange={(e) => {
            setSelectedStore(e.target.value);
            setSelectedEndLocation('');  // Clear end location when store changes
            setImageLink('');  // Clear image when store changes
            setSelectedRouteID(''); // Clear route ID when store changes
          }}
        >
          <option value="">--Select a store--</option>
          {stores.map((store, index) => (
            <option key={index} value={store.store_ID}>{store.city}</option> // Adjusted to use store_ID
          ))}
        </select>
      </div>

      {/* End location selection */}
      {selectedStore && (
        <div className="mb-6">
          <label htmlFor="endLocationSelect" className="block mb-2 text-lg">Select End Location:</label>
          <select
            id="endLocationSelect"
            className="border border-pink-500 rounded p-3 w-full bg-gray-800 text-white"
            value={selectedEndLocation.route || ''}
            onChange={handleEndLocationChange}
          >
            <option value="">--Select an end location--</option>
            {endLocations.map((location, index) => (
              <option key={index} value={location.route}>{location.route}</option>
            ))}
          </select>
        </div>
      )}

      <button 
        className="bg-pink-500 text-white font-semibold rounded p-3 w-full hover:bg-pink-600 transition duration-200"
        onClick={() => placeOrder(selectedRouteID)}
      >Place the Order</button>

      {/* Display selected details, route ID, and image */}
      {selectedStore && selectedEndLocation && (
        <div className="mt-6 text-center">
          <p className="text-lg">
            You selected <strong>{selectedStore}</strong> with end location <strong>{selectedEndLocation.route}</strong> (Route ID: <strong>{selectedRouteID}</strong>).
          </p>
          {imageLink && (
            <div className="mt-4">
              <img src={imageLink} alt={`Route image for ${selectedStore} to ${selectedEndLocation.route}`} className="max-w-full h-auto rounded" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectRoute;
