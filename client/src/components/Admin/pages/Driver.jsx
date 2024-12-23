import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import img2 from './assets/bg.jpg';
import axios from 'axios';

export default function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [searchDriverId, setSearchDriverId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Fetch drivers from the backend
  const fetchDrivers = () => {
    axios.get('http://localhost:8080/admin/getdriver')
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching drivers:', error);
      });
  };

  // Handle Driver ID input change
  const handleInputChange = (e) => {
    setSearchDriverId(e.target.value);
  };

  // Handle searching for the driver by Driver_ID
  const handleFindDriver = () => {
    const foundDriver = drivers.find((driver) => driver.driver_ID.toString() === searchDriverId);
    if (foundDriver) {
      setSelectedDriverId(foundDriver.driver_ID);
    } else {
      alert('Driver not found!');
      setSelectedDriverId(null);
    }
  };

  // Handle deleting a driver by Driver_ID
  const handleDeleteDriver = (driverId) => {
    axios.delete(`http://localhost:8080/admin/deleteDriver/branch/${driverId}`)
      .then(() => {
        // Update the drivers list by removing the deleted driver
        setDrivers(drivers.filter(driver => driver.driver_ID !== driverId));
        alert('Driver deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting driver:', error);
        alert('Failed to delete driver');
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
      className="flex"
    >
      <Sidebar />

      <div className="container mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg flex-grow">
        <h1 className="text-3xl font-bold mb-6">Drivers</h1>

        {/* Form for finding a driver by Driver_ID */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">Find Driver</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Driver ID</label>
              <input
                type="text"
                value={searchDriverId}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
              onClick={handleFindDriver}
            >
              Find
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setSearchDriverId('');
                setSelectedDriverId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Table to list all drivers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Driver List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Driver ID</th>
                <th className="px-4 py-2 border">Store ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Current Working Time</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr
                  key={driver.driver_ID}
                  className={driver.driver_ID === selectedDriverId ? 'bg-yellow-100' : ''}
                >
                  <td className="border px-4 py-2">{driver.driver_ID}</td>
                  <td className="border px-4 py-2">{driver.store_ID}</td>
                  <td className="border px-4 py-2">{driver.status}</td>
                  <td className="border px-4 py-2">{driver.current_working_time}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteDriver(driver.driver_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
