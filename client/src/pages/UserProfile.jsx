import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Simulated AR/VR integration
const ARVRIntegration = ({ children }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-10 blur-3xl"></div>
    {children}
  </div>
);

// Futuristic Button Component
const FuturisticButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    onClick={onClick}
  >
    <Sparkles size={20} />
    <span>{children}</span>
  </motion.button>
);

// Main UserProfile Component (Without Order Details)
const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (auth && !loading) {
      fetchProfile();
    }
  }, [auth, loading]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/profile', { withCredentials: true });
      setProfile(response.data);
      setEditedProfile(response.data); // Initialize editedProfile with the current profile data
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/user/profile', editedProfile, { withCredentials: true });
      setProfile(editedProfile); // Update the profile with the edited data
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div className="text-center text-2xl text-white">Initializing quantum interface...</div>;
  if (!auth) return <div className="text-center text-2xl text-white">Please synchronize your neural link to view your profile.</div>;
  if (!profile) return <div className="text-center text-2xl text-white">Assembling holographic data...</div>;

  return (
    <ARVRIntegration>
      <div className="min-h-screen bg-gray-900 text-white p-8 pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            User Profile
          </h1>
          
          <div className="bg-black bg-opacity-50 backdrop-blur-xl rounded-xl p-8 mb-10">
            <div className="flex items-center space-x-6 mb-6">
              <img src={profile.avatar || '/api/placeholder/300/300'} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-pink-500" />
              <div>
                <h2 className="text-3xl font-bold">{profile.first_name} {profile.last_name}</h2>
                <p className="text-xl text-gray-300">{profile.username}</p>
                <p className="text-gray-400">{profile.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Contact No:</p>
                <p>{profile.phone_number}</p>
              </div>
              <div>
                <p className="text-gray-400">Customer Type:</p>
                <p>{profile.type}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Profile Information</h2>
            <div className="flex space-x-4">
              <FuturisticButton onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </FuturisticButton>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={editedProfile.first_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={editedProfile.last_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={editedProfile.phone_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-6">
                <FuturisticButton type="submit">Save Changes</FuturisticButton>
              </div>
            </form>
          ) : null}
        </motion.div>
      </div>
    </ARVRIntegration>
  );
};

export default UserProfile;
