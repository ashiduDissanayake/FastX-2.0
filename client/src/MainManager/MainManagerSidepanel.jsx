import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/MainManagerAuthContext";
import { FaUserCircle } from "react-icons/fa";

const SidePanel = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-8 font-raleway">
      <div className="flex items-center flex-col mb-8">
        <FaUserCircle className="text-5xl mr-4 mb-6" />
        <h2 className="text-2xl font-semibold tracking-wide">
          Ashidu Dissanayake
        </h2>
        <p className="text-sm opacity-75">Main Manager</p>
      </div>

      <nav className="space-y-4">
        <Link
          to="/mainmanager-dashboard"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${
            location.pathname === "/mainmanager-dashboard" 
              ? "bg-purple-600 text-white" 
              : "hover:bg-purple-600 text-white"
          }`}
        >
          <DashboardIcon />
          <span className="ml-2 text-lg">Dashboard</span>
        </Link>
        <Link
          to="/store1"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${
            location.pathname === "/store1" 
              ? "bg-purple-600 text-white" 
              : "hover:bg-purple-600 text-white"
          }`}
        >
          <PeopleIcon />
          <span className="ml-2 text-lg">Ship Orders</span>
        </Link>
        <Link
          to="/mainmanager-trainschedule"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${
            location.pathname === "/mainmanager-trainschedule" 
              ? "bg-purple-600 text-white" 
              : "hover:bg-purple-600 text-white"
          }`}
        >
          <GroupWorkIcon />
          <span className="ml-2 text-lg">TrainSchedule</span>
        </Link>
        <Link
          to="/quarterly-sales"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${
            location.pathname === "/quarterly-sales" 
              ? "bg-purple-600 text-white" 
              : "hover:bg-purple-600 text-white"
          }`}
        >
          <AnalyticsIcon />
          <span className="ml-2 text-lg">Report</span>
        </Link>
        <Link
          to="/mainmanager-profile"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${
            location.pathname === "/mainmanager-profile" 
              ? "bg-purple-600 text-white" 
              : "hover:bg-purple-600 text-white"
          }`}
        >
          <AccountCircleIcon />
          <span className="ml-2 text-lg">Profile</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <Link
          to="/mainmanager-login"
          className="flex items-center p-3 rounded-lg hover:bg-purple-600 text-white transition-all"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span className="ml-2 text-lg">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;
