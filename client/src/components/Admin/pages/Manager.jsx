import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import img2 from './assets/bg.jpg'; // Background image
import axios from 'axios';

export default function Manager() {
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({ manager_ID: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [highlightedManagerId, setHighlightedManagerId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/getManager')
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching managers:', error);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager({ ...newManager, [name]: value });
  };

  // Search for a manager by Manager ID
  const handleSearchManager = () => {
    const foundManager = managers.find(
      (manager) => manager.manager_ID.toString() === newManager.manager_ID
    );

    if (foundManager) {
      setHighlightedManagerId(foundManager.manager_ID);
      setErrorMessage('');
    } else {
      setHighlightedManagerId(null);
      alert('Manager not found!');
    }
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
        <h1 className="text-3xl font-bold mb-6">Managers</h1>

        {/* Form for searching manager */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">Find Manager</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Manager ID</label>
              <input
                type="text"
                name="manager_ID"
                value={newManager.manager_ID}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
              onClick={handleSearchManager}
            >
              Find
            </button>
          </div>
          {/* Display error message if manager not found */}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>

        {/* Table to list all managers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Manager List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Manager ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Store ID</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr
                  key={manager.manager_ID}
                  className={`${
                    manager.manager_ID === highlightedManagerId
                      ? 'bg-yellow-300' // Highlight the row if it matches the search
                      : ''
                  }`}
                >
                  <td className="border px-4 py-2">{manager.manager_ID}</td>
                  <td className="border px-4 py-2">{manager.name}</td>
                  <td className="border px-4 py-2">{manager.email}</td>
                  <td className="border px-4 py-2">{manager.store_ID}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteManager(manager.id)}
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
