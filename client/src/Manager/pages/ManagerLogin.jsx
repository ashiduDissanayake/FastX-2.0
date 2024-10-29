import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ManagerId, setManagerId] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8080/manager/managerlogin",
        {
          username,
          password,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );
  
      if (response.data.message === "Login successful") {
        setManagerId(response.data.manager_ID);
        setMessage("Login successful!");
        window.location.href = '/manager-dashboard';
        // Move this after state updates
      } else {
        setMessage(response.data.message);
        setManagerId(null);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Error occurred during login.");
      setManagerId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="text-sm font-medium text-pink-300 flex items-center"
              htmlFor="username"
            >
              <Mail className="mr-2" size={18} />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-black/60 text-white border border-pink-400 rounded-md focus:ring-pink-500 focus:border-pink-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-pink-300 flex items-center"
              htmlFor="password"
            >
              <Lock className="mr-2" size={18} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-black/60 text-white border border-pink-400 rounded-md focus:ring-pink-500 focus:border-pink-500 focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
          >
            <LogIn className="mr-2" size={18} />
            Login
          </motion.button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {ManagerId && (
          <div className="mt-6 text-center">
            <p className="text-sm text-pink-200">Manager ID: {ManagerId}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
