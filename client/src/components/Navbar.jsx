import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { 
  Home, ShoppingBag, ClipboardList, ShoppingCart, User, LogOut, LogIn, UserPlus 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/NavBar/Vn.png"

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} onClick={onClick}>
      <motion.div
        className={`px-4 py-2 rounded-full transition-all duration-300 ${
          isActive 
            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" 
            : "text-gray-300 hover:text-white"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>
    </Link>
  );
};

const IconButton = ({ icon: Icon, onClick, label }) => (
  <motion.button
    className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="sr-only">{label}</span>
  </motion.button>
);

export default function Navbar() {
  const { auth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-4 transform -translate-x-1/2 z-50 w-11/12 max-w-8xl pl-24"
    >
      <div className="bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-full shadow-lg p-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
            <span className="text-white font-bold text-xl font-[Monterest]">VogueNest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/orders">Orders</NavLink>
          </div>

          <div className="flex items-center space-x-2">
            <IconButton icon={ShoppingCart} label="Cart" onClick={() => handleNavigate('/cart')}  />
            {auth ? (
              <>
                <IconButton icon={User} label="Profile" onClick={() => handleNavigate('/profile')} />
                <IconButton icon={LogOut} label="Logout" onClick={handleLogout} />
              </>
            ) : (
              <>
                <IconButton icon={LogIn} label="Login" onClick={() => handleNavigate('/login')} />
                <IconButton icon={UserPlus} label="Signup" onClick={() => handleNavigate('/signup')} />
              </>
            )}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden mt-2 bg-black bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg p-4"
        >
          <div className="flex flex-col space-y-2">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</NavLink>
            <NavLink to="/orders" onClick={() => setIsOpen(false)}>Orders</NavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
