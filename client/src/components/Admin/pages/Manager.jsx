import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import img2 from './assets/bg.jpg'; // Background image

// Sample data for managers (You can fetch this from your backend)
const initialManagers = [
  { id: 1, name: 'Samuel Adams', email: 'samuel@example.com', phone: '0779876543', role: 'Operations Manager' },
  { id: 2, name: 'Maria Garcia', email: 'maria@example.com', phone: '0779876544', role: 'Sales Manager' },
];


export default function Manager() {
  const [managers, setManagers] = useState(initialManagers);
  const [newManager, setNewManager] = useState({ name: '', email: '', phone: '', role: '' });
  const [editManagerId, setEditManagerId] = useState(null);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager({ ...newManager, [name]: value });
  };

  // Add new manager
  const handleAddManager = () => {
    const newId = managers.length + 1;
    setManagers([...managers, { ...newManager, id: newId }]);
    setNewManager({ name: '', email: '', phone: '', role: '' });
  };

  // Edit manager
  const handleEditManager = (manager) => {
    setEditManagerId(manager.id);
    setNewManager(manager);
  };

  // Save edited manager
  const handleSaveManager = () => {
    setManagers(managers.map((m) => (m.id === editManagerId ? newManager : m)));
    setEditManagerId(null);
    setNewManager({ name: '', email: '', phone: '', role: '' });
  };

  // Delete manager
  const handleDeleteManager = (id) => {
    setManagers(managers.filter((manager) => manager.id !== id));
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
        <h1 className="text-3xl font-bold mb-6">Managers</h1>

        {/* Form for adding/editing managers */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">{editManagerId ? 'Edit Manager' : 'Add New Manager'}</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newManager.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={newManager.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={newManager.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={newManager.role}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            {editManagerId ? (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                onClick={handleSaveManager}
              >
                Save Manager
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                onClick={handleAddManager}
              >
                Add Manager
              </button>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setEditManagerId(null);
                setNewManager({ name: '', email: '', phone: '', role: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Table to list all managers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Manager List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager.id}>
                  <td className="border px-4 py-2">{manager.name}</td>
                  <td className="border px-4 py-2">{manager.email}</td>
                  <td className="border px-4 py-2">{manager.phone}</td>
                  <td className="border px-4 py-2">{manager.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                      onClick={() => handleEditManager(manager)}
                    >
                      Edit
                    </button>
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
