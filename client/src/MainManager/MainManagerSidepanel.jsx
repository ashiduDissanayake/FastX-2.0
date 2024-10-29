import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/MainManagerAuthContext';

const SidePanel = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <div className="bg-[#0A2540] text-white w-64 h-screen p-6 font-raleway">
      <div className="flex items-center flex-col mb-8">
        <img
          src="https://via.placeholder.com/100" // Replace with actual profile image URL
          alt="Profile"
          className="rounded-full w-24 h-24 mb-4"
        />
        <h2 className="text-2xl font-semibold tracking-wide">Ashidu Dissanayake</h2>
        <p className="text-sm opacity-75">Main Manager</p>
      </div>

      <nav className="space-y-4">
        <Link to="/mainmanager-profile" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <DashboardIcon />
          <span className="ml-2 text-lg">Profile</span>
        </Link>
        <Link to="/store1" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <PeopleIcon />
          <span className="ml-2 text-lg">Dashboard</span>
        </Link>
        <Link to="/mainmanager-trainschedule" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <GroupWorkIcon />
          <span className="ml-2 text-lg">TrainSchedule</span>
        </Link>
        <Link to="/quarterly-sales" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <AnalyticsIcon />
          <span className="ml-2 text-lg">Report</span>
        </Link>
        <Link to="/mainmanager-customers" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all">
          <AccountCircleIcon />
          <span className="ml-2 text-lg">Customer</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <Link to="/#" className="flex items-center p-3 rounded-lg hover:bg-[#12365C] transition-all" onClick={handleLogout}>
          <LogoutIcon />
          <span className="ml-2 text-lg">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;
