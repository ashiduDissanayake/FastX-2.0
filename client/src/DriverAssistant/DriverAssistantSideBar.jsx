import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../context/DriverAssistantAuthContext'

const DriverAssistantSideBar = () => {
  const { logout } = useAuth();
  const handlelogout = () => {
    logout();
  }
  return (
    <div className="bg-[#0A2540] text-white w-64 h-screen p-6 font-raleway">
      <div className="flex items-center flex-col mb-8">
        <FaUserCircle className="text-5xl mr-4 mb-2" />
        <h2 className="text-2xl font-semibold tracking-wide">John Doe</h2>
        <p className="text-sm opacity-75">Driver Assistant</p>
      </div>

      <nav className="space-y-4">
        <NavLink 
          to="/driver-assistant-dashboard" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-[#12365C] text-blue-300' : 'hover:bg-[#12365C]'}`}
        >
          <DashboardIcon />
          <span className="ml-2 text-lg">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/driver-assistant-update-orders" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-[#12365C] text-blue-300' : 'hover:bg-[#12365C]'}`}
        >
          <UpdateIcon />
          <span className="ml-2 text-lg">Update Orders</span>
        </NavLink>
      </nav>
      <div className="mt-auto">
        <NavLink 
          to="/driver-assistant-login" 
          className={({ isActive }) => `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-[#12365C] text-yellow-300' : 'hover:bg-[#12365C]'}`}
          onClick={handlelogout}
        >
          <LogoutIcon />
          <span className="ml-2 text-lg">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default DriverAssistantSideBar;
