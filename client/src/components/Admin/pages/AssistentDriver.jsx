import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import img2 from './assets/bg.jpg';
import axios from 'axios';

export default function AssistentDriver() {
  const [assistantDrivers, setAssistantDrivers] = useState([]);
  const [newAssistantDriver, setNewAssistantDriver] = useState({ assistant_ID: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [highlightedDriverId, setHighlightedDriverId] = useState(null);

  useEffect(() => {
    fetchAssistantDrivers();
  }, []);

  // Fetch assistant drivers from the backend
  const fetchAssistantDrivers = () => {
    axios.get('http://localhost:8080/admin/getAssistantDriver')
      .then((response) => {
        setAssistantDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assistant drivers:', error);
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssistantDriver({ ...newAssistantDriver, [name]: value });
  };

  // Search for the assistant driver by Assistant ID
  const handleSearchAssistantDriver = () => {
    const foundDriver = assistantDrivers.find(
      (driver) => driver.assistant_ID.toString() === newAssistantDriver.assistant_ID
    );

    if (foundDriver) {
      setHighlightedDriverId(foundDriver.assistant_ID);
      setErrorMessage('');
    } else {
      setHighlightedDriverId(null);
      alert('Assistant Driver not found!');
    }
  };

  // Handle deleting an assistant driver by ID
  const handleDeleteAssistantDriver = (assistantId) => {
    axios.delete(`http://localhost:8080/admin/deleteAssistantDriver/branch/${assistantId}`)
      .then(() => {
        // Update the assistant drivers list by removing the deleted assistant driver
        setAssistantDrivers(assistantDrivers.filter(driver => driver.assistant_ID !== assistantId));
        alert('Assistant Driver deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting assistant driver:', error);
        alert('Failed to delete assistant driver');
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
        <h1 className="text-3xl font-bold mb-6">Assistant Drivers</h1>

        {/* Form for searching assistant drivers */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">Find Assistant Driver</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Assistant ID</label>
              <input
                type="text"
                name="assistant_ID"
                value={newAssistantDriver.assistant_ID}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
              onClick={handleSearchAssistantDriver}
            >
              Find
            </button>
          </div>
          {/* Display error message if driver not found */}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>

        {/* Table to list all assistant drivers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Assistant Driver List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Assistant ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Store ID</th>
                <th className="px-4 py-2 border">Current Working Time</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assistantDrivers.map((driver) => (
                <tr
                  key={driver.assistant_ID}
                  className={`${
                    driver.assistant_ID === highlightedDriverId
                      ? 'bg-yellow-300' // Highlight row if it matches the search
                      : ''
                  }`}
                >
                  <td className="border px-4 py-2">{driver.assistant_ID}</td>
                  <td className="border px-4 py-2">{driver.status}</td>
                  <td className="border px-4 py-2">{driver.store_ID}</td>
                  <td className="border px-4 py-2">{driver.current_working_time}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteAssistantDriver(driver.assistant_ID)}
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
