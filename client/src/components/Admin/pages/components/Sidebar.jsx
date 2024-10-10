import React, { useState } from 'react';
import img1 from '../assets/yasith.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Sidebar() {
  const [isWorkersOpen, setIsWorkersOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleWorkersDropdown = () => {
    setIsWorkersOpen(!isWorkersOpen);
  };

  const handleLogout = () => {
    // Logic to handle logout can be added here (e.g., clearing tokens, user data, etc.)
    navigate('/login'); // Navigate to the login page on logout
  };

  return (
    <nav className="w-[250px] bg-[#000435] text-white p-5 shadow-lg relative">
      <div className="text-center mb-8">
        <img src={img1} alt="Profile" className="w-[150px] h-[150px] rounded-full mx-auto mb-4 mt-4" />
        <h1 className="mt-5 font-bold">Yasith Gamage</h1>
        <p className='text-red-600 font-bold text-lg'>Admin</p>
      </div>
      <ul className="space-y-4">
        <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
          <Link to="/admin">Dashboard</Link>
        </li>

        {/* Workers Dropdown */}
        <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg" onClick={toggleWorkersDropdown}>
          Workers
        </li>
        {isWorkersOpen && (
          <ul className="pl-4 space-y-2">
            <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
              <Link to="/admindriver">Drivers</Link>
            </li>
            <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
              <Link to="/adminassistentdriver">Assistant Drivers</Link>
            </li>
            <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
              <Link to="/adminmanager">Managers</Link>
            </li>
          </ul>
        )}

        <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
          <Link to="/admincustomer">Customers</Link>
        </li>
        <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
          <Link to="/adminreport">Report</Link>
        </li>
        <li className="cursor-pointer transition-all hover:bg-white hover:bg-opacity-10 hover:pl-2 hover:scale-110 hover:rounded-lg">
          <Link to="/adminprofile">Profile</Link>
        </li>
      </ul>
      <button 
        className="bg-red-600 w-full text-white py-2 mt-8 rounded-md hover:bg-red-700 transition transform hover:scale-110" 
        onClick={handleLogout} // Attach logout handler
      >
        Logout
      </button>
    </nav>
  );
}
