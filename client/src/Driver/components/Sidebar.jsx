// Sidebar.js
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Sidebar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle navigation logic
  const handleNavigation = (item) => {
    setActivePage(item); // Update the active page state

    // Navigate to the corresponding route
    switch (item) {
      case "Home":
        navigate("/maindashboard"); // Adjust the route as per your application structure
        break;
      case "Orders":
        navigate("/orders");
        break;
      case "Train schedule":
        navigate("/trainschedule");
        break;
    //   case "Finished Trips":
    //     navigate("/finished-trips");
    //     break;
      case "Reports":
        navigate("/reports");
        break;
      case "Logout":
        // Implement logout logic here, e.g., clear auth tokens
        navigate("/login"); // Redirect to login or home page after logout
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
          <p className="text-sm text-gray-400">Main Manager</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-4">
          {[
            "Home",
            // "Stores",
            "Orders",
            "Train schedule",
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
