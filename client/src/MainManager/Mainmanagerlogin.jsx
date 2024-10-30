import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img2 from './assets/bg.jpeg';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mainManagerId, setMainManagerId] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/mainmanager/mainmanagerlogin",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data); // Log response for debugging

      if (response.data.message === "Login successful") {
        setMainManagerId(response.data.mainmanager_id);
        setMessage("Login successful!");
        window.location.href = "/mainmanager-dashboard";
      } else {
        setMessage(response.data.message);
        setMainManagerId(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error occurred during login.");
      setMainManagerId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-[#1F1A37] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2C2541] p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#C8A2F6] to-[#9E77ED] mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-[#A56EFF] flex items-center" htmlFor="username">
              <Mail className="mr-2" size={18} />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-[#2C1C5F] text-white border border-[#9E77ED] rounded-md focus:ring-[#A56EFF] focus:border-[#A56EFF] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#A56EFF] flex items-center" htmlFor="password">
              <Lock className="mr-2" size={18} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 bg-[#2C1C5F] text-white border border-[#9E77ED] rounded-md focus:ring-[#A56EFF] focus:border-[#A56EFF] focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#9E77ED] to-[#A56EFF] text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
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

        {mainManagerId && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[#C8A2F6]">Main Manager ID: {mainManagerId}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
