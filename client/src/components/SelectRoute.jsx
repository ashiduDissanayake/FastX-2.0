import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Truck, ShoppingBag } from "lucide-react";
import CustomAlert from "./CustomeAlert"; // Fixed typo in import
import { useNavigate } from "react-router-dom";

const SelectRoute = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [endLocations, setEndLocations] = useState([]);
  const [enteredLocation, setEnteredLocation] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleApiError = (error, customMessage) => {
    console.error(customMessage, error);
    setError(error.response?.data?.error || customMessage);
    setLoading(false);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (selectedStore) {
      setEnteredLocation("");
      setImageLink("");
      setSelectedRoute(null);
      fetchEndLocations(selectedStore);
    }
  }, [selectedStore]);

  useEffect(() => {
    if (selectedStore && selectedRoute) {
      fetchRouteImage();
    }
  }, [selectedRoute]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/user/stores");
      setStores(response.data);
    } catch (error) {
      handleApiError(error, "Error fetching stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEndLocations = async (storeId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/user/end-locations/${storeId}`
      );
      setEndLocations(response.data);
    } catch (error) {
      handleApiError(error, "Error fetching end locations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRouteImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/user/route-image",
        {
          params: {
            store: selectedStore,
            route: selectedRoute.route,
          },
        }
      );
      setImageLink(response.data.imageLink);
    } catch (error) {
      handleApiError(error, "Error fetching route image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationInput = (e) => {
    setEnteredLocation(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const matchingRoute = endLocations.find((location) =>
        location.end_locations.some((loc) =>
          loc.toLowerCase().includes(enteredLocation.toLowerCase())
        )
      );
      setSelectedRoute(matchingRoute || null);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      if (!cartItems.length) {
        setError("Cart is empty. Please add items before placing an order.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/user/placeorder",
        {
          route_ID: selectedRoute.route_ID,
          store_ID: selectedStore,
          cartItems,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.removeItem("cart");
        alert("Order placed successfully!");
        navigate("/orders");
      }
    } catch (error) {
      handleApiError(error, "Failed to place order. Please try again.");
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
          {/* Store Selection */}
          <div>
            <label
              htmlFor="storeSelect"
              className="block text-lg font-medium mb-2 flex items-center text-pink-200"
            >
              <MapPin className="mr-2" /> Select Store
            </label>
            <select
              id="storeSelect"
              className="w-full bg-black/30 border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-400 transition"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              disabled={loading}
            >
              <option value="">--Select a store--</option>
              {stores.map((store) => (
                <option key={store.store_ID} value={store.store_ID}>
                  {store.city}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          {selectedStore && (
            <div>
              <label
                htmlFor="endLocationInput"
                className="block text-lg font-medium mb-2 flex items-center text-pink-200"
              >
                <Truck className="mr-2" /> Enter Delivery Location
              </label>
              <input
                id="endLocationInput"
                type="text"
                className="w-full bg-black/30 border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-400 transition"
                placeholder="Type your end location and press Enter"
                value={enteredLocation}
                onChange={handleLocationInput}
                onKeyPress={handleKeyPress} // Detect Enter key press
                disabled={loading}
              />
            </div>
          )}

          {/* Route Display and Order Button */}
          {selectedStore && selectedRoute && (
            <div className="text-center space-y-4">
              <p className="text-lg text-pink-200">
                Selected route:{" "}
                <span className="font-bold">{selectedRoute.route}</span>
              </p>
              {imageLink && (
                <div className="mt-4 relative group">
                  <iframe
                    src={imageLink}
                    width="700"
                    height="450"
                    style={{ border: "0" }} // Updated to an object
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              )}
              <button
                className="bg-gradient-to-r from-pink-300 to-rose-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-pink-400 hover:to-rose-500 transition duration-300 flex items-center justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={placeOrder}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : (
                  <ShoppingBag className="mr-2" />
                )}
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <CustomAlert
          title="Error"
          variant="destructive"
          onClose={() => setError("")}
        >
          {error}
        </CustomAlert>
      )}
    </div>
  );
};

export default SelectRoute;
