import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import img2 from './assets/bg.jpg'; // Background image

// Sample data for assistant drivers (You can fetch this from your backend)
const initialAssistantDrivers = [
  { id: 1, name: 'Charlie Green', email: 'charlie@example.com', phone: '0771234590', vehicle: 'Nissan Altima' },
  { id: 2, name: 'Diana White', email: 'diana@example.com', phone: '0771234591', vehicle: 'Ford Fusion' },
];


export default function AssistentDriver() {
    const [assistantDrivers, setAssistantDrivers] = useState(initialAssistantDrivers);
  const [newAssistantDriver, setNewAssistantDriver] = useState({ name: '', email: '', phone: '', vehicle: '' });
  const [editAssistantDriverId, setEditAssistantDriverId] = useState(null);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssistantDriver({ ...newAssistantDriver, [name]: value });
  };

  // Add new assistant driver
  const handleAddAssistantDriver = () => {
    const newId = assistantDrivers.length + 1;
    setAssistantDrivers([...assistantDrivers, { ...newAssistantDriver, id: newId }]);
    setNewAssistantDriver({ name: '', email: '', phone: '', vehicle: '' });
  };

  // Edit assistant driver
  const handleEditAssistantDriver = (driver) => {
    setEditAssistantDriverId(driver.id);
    setNewAssistantDriver(driver);
  };

  // Save edited assistant driver
  const handleSaveAssistantDriver = () => {
    setAssistantDrivers(assistantDrivers.map((d) => (d.id === editAssistantDriverId ? newAssistantDriver : d)));
    setEditAssistantDriverId(null);
    setNewAssistantDriver({ name: '', email: '', phone: '', vehicle: '' });
  };

  // Delete assistant driver
  const handleDeleteAssistantDriver = (id) => {
    setAssistantDrivers(assistantDrivers.filter((driver) => driver.id !== id));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img2})`, // Set the background image
        backgroundSize: 'cover',         // Cover the entire container
        backgroundPosition: 'center',    // Center the background image
        minHeight: '100vh',              // Make sure it covers the full screen
        padding: '20px',
      }}
      className="flex"
    >
      <Sidebar />

      <div className="container mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg flex-grow">
        <h1 className="text-3xl font-bold mb-6">Assistant Drivers</h1>

        {/* Form for adding/editing assistant drivers */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">{editAssistantDriverId ? 'Edit Assistant Driver' : 'Add New Assistant Driver'}</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newAssistantDriver.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={newAssistantDriver.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={newAssistantDriver.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Vehicle</label>
              <input
                type="text"
                name="vehicle"
                value={newAssistantDriver.vehicle}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            {editAssistantDriverId ? (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                onClick={handleSaveAssistantDriver}
              >
                Save Assistant Driver
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                onClick={handleAddAssistantDriver}
              >
                Add Assistant Driver
              </button>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setEditAssistantDriverId(null);
                setNewAssistantDriver({ name: '', email: '', phone: '', vehicle: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Table to list all assistant drivers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Assistant Driver List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Vehicle</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assistantDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="border px-4 py-2">{driver.name}</td>
                  <td className="border px-4 py-2">{driver.email}</td>
                  <td className="border px-4 py-2">{driver.phone}</td>
                  <td className="border px-4 py-2">{driver.vehicle}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                      onClick={() => handleEditAssistantDriver(driver)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteAssistantDriver(driver.id)}
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
