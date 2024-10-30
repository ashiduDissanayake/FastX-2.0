import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import img2 from "../assets/bg.jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ManagerId, setManagerId] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/manager/managerlogin",
        { username, password },
        { withCredentials: true }
      );

      if (response.data.message === "Login successful") {
        setManagerId(response.data.manager_ID);
        setMessage("Login successful!");
        navigate("/manager-dashboard");
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/20 border border-white/20 rounded-lg shadow-lg backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white flex items-center">
              <Mail className="mr-2" size={18} />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white flex items-center">
              <Lock className="mr-2" size={18} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 font-medium bg-white text-gray-800 rounded-full shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <LogIn className="mr-2" size={18} />
            Login
          </motion.button> */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium bg-white text-gray-800 rounded-full shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300">
              Login
          </button>
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
            <p className="text-sm text-gray-200">Manager ID: {ManagerId}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
