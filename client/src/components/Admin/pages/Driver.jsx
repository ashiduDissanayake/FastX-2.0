import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import img2 from './assets/bg.jpg'; // Background image

// Sample data for drivers (You can fetch this from your backend)
const initialDrivers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '0771234567', vehicle: 'Toyota Corolla' },
  { id: 2, name: 'Bob Brown', email: 'bob@example.com', phone: '0771234578', vehicle: 'Honda Accord' },
];


export default function Driver() {
    const [drivers, setDrivers] = useState(initialDrivers);
  const [newDriver, setNewDriver] = useState({ name: '', email: '', phone: '', vehicle: '' });
  const [editDriverId, setEditDriverId] = useState(null);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });
  };

  // Add new driver
  const handleAddDriver = () => {
    const newId = drivers.length + 1;
    setDrivers([...drivers, { ...newDriver, id: newId }]);
    setNewDriver({ name: '', email: '', phone: '', vehicle: '' });
  };

  // Edit driver
  const handleEditDriver = (driver) => {
    setEditDriverId(driver.id);
    setNewDriver(driver);
  };

  // Save edited driver
  const handleSaveDriver = () => {
    setDrivers(drivers.map((d) => (d.id === editDriverId ? newDriver : d)));
    setEditDriverId(null);
    setNewDriver({ name: '', email: '', phone: '', vehicle: '' });
  };

  // Delete driver
  const handleDeleteDriver = (id) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
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
        <h1 className="text-3xl font-bold mb-6">Drivers</h1>

        {/* Form for adding/editing drivers */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">{editDriverId ? 'Edit Driver' : 'Add New Driver'}</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newDriver.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={newDriver.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={newDriver.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Vehicle</label>
              <input
                type="text"
                name="vehicle"
                value={newDriver.vehicle}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            {editDriverId ? (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                onClick={handleSaveDriver}
              >
                Save Driver
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                onClick={handleAddDriver}
              >
                Add Driver
              </button>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setEditDriverId(null);
                setNewDriver({ name: '', email: '', phone: '', vehicle: '' });
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
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Vehicle</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="border px-4 py-2">{driver.name}</td>
                  <td className="border px-4 py-2">{driver.email}</td>
                  <td className="border px-4 py-2">{driver.phone}</td>
                  <td className="border px-4 py-2">{driver.vehicle}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                      onClick={() => handleEditDriver(driver)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteDriver(driver.id)}
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
