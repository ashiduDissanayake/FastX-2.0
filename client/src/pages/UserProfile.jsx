import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (auth && !loading) {
      fetchProfile();
      fetchOrders();
    }
  }, [auth, loading]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/profile', {
        withCredentials: true
      });
      setProfile(response.data);
      setEditedProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/orders', {
        withCredentials: true
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/user/profile', editedProfile, {
        withCredentials: true
      });
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!auth) return <div>Please log in to view your profile.</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">User Profile</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={editedProfile.username}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={editedProfile.first_name}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={editedProfile.last_name}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number:</label>
            <input
              type="tel"
              name="phone_number"
              value={editedProfile.phone_number}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-500 transition duration-300">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      ) : (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-lg">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
          <p><strong>Phone:</strong> {profile.phone_number}</p>
          <p><strong>Account Type:</strong> {profile.type}</p>
          <button onClick={() => setIsEditing(true)} className="bg-pink-600 text-white px-4 py-2 rounded mt-2 shadow hover:bg-pink-500 transition duration-300">Edit Profile</button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-pink-600">Order History</h2>

      {orders.length > 0 ? (
        <table className="w-full border-collapse border shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-4">Order ID</th>
              <th className="border p-4">Product</th>
              <th className="border p-4">Image</th>
              <th className="border p-4">Quantity</th>
              <th className="border p-4">Price</th>
              <th className="border p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.cart_ID} className="hover:bg-gray-100">
                <td className="border p-4">{order.cart_ID}</td>
                <td className="border p-4">{order.product_Name}</td>
                <td className="border p-4">
                  <img src={order.image_link} alt={order.product_Name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border p-4">{order.quantity}</td>
                <td className="border p-4">${parseFloat(order.final_Price).toFixed(2)}</td>
                <td className="border p-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No orders found.</p>
      )}
    </div>
  );
};

export default UserProfile;
