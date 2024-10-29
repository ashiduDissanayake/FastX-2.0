import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const DriverSidePanel = () => {
  return (
    <div className="bg-[#0A2540] text-white w-64 h-screen p-6 font-raleway">
      <div className="flex items-center flex-col mb-8">
        <img
          src="https://via.placeholder.com/100" // Replace with actual profile image URL
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
        <h2 className="text-2xl font-semibold tracking-wide">Kasun Dilhara</h2>
        <p className="text-sm opacity-75">Driver</p>
      </div>

      <nav className="space-y-4">
        <Link to="/driver-profile" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <DashboardIcon />
          <span className="ml-2 text-lg">Profile</span>
        </Link>
        
        <Link to="/driver-dashboard" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <GroupWorkIcon />
          <span className="ml-2 text-lg">Assign Trip</span>
        </Link>
        <Link to="/driver-truckschedule" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <AnalyticsIcon />
          <span className="ml-2 text-lg">Truck Schedule</span>
        </Link>
        
      </nav>

      <div className="mt-auto">
        <Link to="/driver-logout" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <LogoutIcon />
          <span className="ml-2 text-lg">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default DriverSidePanel;
