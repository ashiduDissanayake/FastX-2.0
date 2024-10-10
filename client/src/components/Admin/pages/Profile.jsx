import React, { useState } from 'react';
import img1 from './assets/yasith.png'; // Admin's profile picture
import img2 from './assets/bg.jpg'; // Background image
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Yasith Gamage',
    email: 'yasith@example.com',
    phone: '0771234567',
    address: 'Colombo, Sri Lanka',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Profile updated:', formData);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="bg-white bg-opacity-30 backdrop-blur-lg w-full max-w-4xl mx-auto rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Admin Profile</h1>
        <div className="flex items-center mb-6">
          <img src={img1} alt="Admin" className="w-[150px] h-[150px] rounded-full mr-6" />
          <div className="text-white">
            <h2 className="text-xl font-bold">{formData.name}</h2>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            <p>{formData.address}</p>
          </div>
        </div>

        {editMode ? (
          <div>
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block font-medium text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium text-white">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium text-white">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            </form>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}

        <hr className="my-6" />

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium text-navy-blue">Current Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-navy-blue">New Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-navy-blue">Confirm New Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>

          <div className="mt-6 flex justify-end">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
