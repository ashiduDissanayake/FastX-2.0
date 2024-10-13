import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VogueNestLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)

      if (data.errors) {
        setErrors(data.errors);
      }

      if (data.user) {
        login(data.user);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputClasses =
    'w-full bg-black/30 border-b-2 border-pink-300 py-2 px-4 focus:outline-none focus:border-pink-500 transition-colors duration-300 text-white';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400 mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="text-sm font-medium text-pink-300 flex items-center"
              htmlFor="email"
            >
              <Mail className="mr-2" size={18} />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
          >
            <LogIn className="mr-2" size={18} />
            Sign In
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-pink-300 hover:text-pink-400 transition"
          >
            Forgot your password?
          </a>
        </div>
        <p className="mt-4 text-center text-sm text-pink-200">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="font-medium text-pink-400 hover:text-pink-500 transition"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default VogueNestLogin;
