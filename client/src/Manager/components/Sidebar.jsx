// Sidebar.js
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useAuth } from "../../context/ManagerAuthContext";

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { logout } = useAuth();

  // Handle logout
  const handlelogout = () => {
    logout();
  };

  // Handle navigation logic
  const handleNavigation = (item) => {
    setActivePage(item); // Update the active page state

    // Navigate to the corresponding route
    switch (item) {
      case "Home":
        navigate("/manager-dashboard"); // Adjust the route as per your application structure
        break;
      case "View Orders":
        navigate("/manager-view-orders");
        break;
      case "Schedule a New Trip":
        navigate("/manager-schedule-trip");
        break;
      case "Active Trips":
        navigate("/manager-active-trips");
        break;
      case "Finished Trips":
        navigate("/manager-finished-trips");
        break;
      case "Reports":
        navigate("/manager-reports");
        break;
      case "Logout":
        // Implement logout logic here, e.g., clear auth tokens
        handlelogout();
        navigate("/manager-login");
        break;
      default:
        break;
    }
  };

  return (
    <aside className="w-1/4 bg-gray-900 text-white p-8 shadow-lg">
      <div className="flex items-center mb-8">
        <FaUserCircle className="text-5xl mr-4" />
        <div>
          <h2 className="text-xl font-semibold">Manager</h2>
          <p className="text-sm text-gray-400">Branch Manager</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-4">
          {[
            "Home",
            "View Orders",
            "Schedule a New Trip",
            "Active Trips",
            "Finished Trips",
            "Reports",
            "Logout",
          ].map((item) => (
            <li
              key={item}
              className={`px-4 py-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer ${
                activePage === item
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-600 hover:text-white text-gray-300"
              }`}
              onClick={() => handleNavigation(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
