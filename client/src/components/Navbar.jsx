import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth(); // Make sure you have a logout function in your AuthContext

  const handleLogout = () => {
    logout(); // Call the logout function from context
  };

  return (
    <nav>
      <ul className="flex space-x-4"> {/* Example styling with Tailwind CSS */}
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
