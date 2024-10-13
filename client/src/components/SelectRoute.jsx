import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Truck, ShoppingBag } from 'lucide-react';
import CustomAlert from './CustomeAlert'; // Import the custom Alert component

const SelectRoute = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [endLocations, setEndLocations] = useState([]);
  const [selectedEndLocation, setSelectedEndLocation] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [selectedRouteID, setSelectedRouteID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (selectedStore) fetchEndLocations(selectedStore);
  }, [selectedStore]);

  useEffect(() => {
    if (selectedStore && selectedEndLocation) fetchRouteImage();
  }, [selectedStore, selectedEndLocation]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/user/stores');
      setStores(response.data);
    } catch (error) {
      setError('Error fetching stores. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEndLocations = async (storeId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/user/end-locations/${storeId}`);
      setEndLocations(response.data);
    } catch (error) {
      setError('Error fetching end locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRouteImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/user/route-image', {
        params: {
          store: selectedStore,
          endLocation: selectedEndLocation.route
        }
      });
      setImageLink(response.data.imageLink);
    } catch (error) {
      setError('Error fetching route image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEndLocationChange = (e) => {
    const selected = endLocations.find(location => location.route === e.target.value);
    setSelectedEndLocation(selected);
    if (selected) {
      setSelectedRouteID(selected.route_ID);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/user/placeorder",
        { route_ID: selectedRouteID },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Order placed successfully!");
      } else {
        setError(response.data.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-20">
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-rose-400">
        Where to deliver?
      </h1>
      
      <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-lg rounded-lg shadow-xl p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="storeSelect" className="block text-lg font-medium mb-2 flex items-center text-pink-200">
              <MapPin className="mr-2" /> Select Store
            </label>
            <select
              id="storeSelect"
              className="w-full bg-black/30 border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-400 transition"
              value={selectedStore}
              onChange={(e) => {
                setSelectedStore(e.target.value);
                setSelectedEndLocation('');
                setImageLink('');
                setSelectedRouteID('');
              }}
            >
              <option value="">--Select a store--</option>
              {stores.map((store, index) => (
                <option key={index} value={store.store_ID}>{store.city}</option>
              ))}
            </select>
          </div>

          {selectedStore && (
            <div>
              <label htmlFor="endLocationSelect" className="block text-lg font-medium mb-2 flex items-center text-pink-200">
                <Truck className="mr-2" /> Select End Location
              </label>
              <select
                id="endLocationSelect"
                className="w-full bg-black/30 border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-400 transition"
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

          {selectedStore && selectedEndLocation && (
            <div className="text-center space-y-4">
              <p className="text-lg text-pink-200">
                Selected route: <span className="font-bold">{selectedStore}</span> to <span className="font-bold">{selectedEndLocation.route}</span>
              </p>
              <p className="text-sm">Route ID: {selectedRouteID}</p>
              {imageLink && (
                <div className="mt-4 relative group">
                  <img 
                    src={imageLink} 
                    alt={`Route from ${selectedStore} to ${selectedEndLocation.route}`} 
                    className="w-full h-64 object-cover rounded-lg transition duration-300 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="bg-black bg-opacity-60 text-white px-4 py-2 rounded">View Larger</span>
                  </div>
                </div>
              )}
              <button 
                className="bg-gradient-to-r from-pink-300 to-rose-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-pink-400 hover:to-rose-500 transition duration-300 flex items-center justify-center w-full"
                onClick={placeOrder}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : (
                  <ShoppingBag className="mr-2" />
                )}
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <CustomAlert title="Error" variant="destructive">
          {error}
        </CustomAlert>
      )}
    </div>
  );
};

export default SelectRoute;
