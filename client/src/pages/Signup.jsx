import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, UserPlus } from 'lucide-react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userType: 'user',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation logic here (omitted for brevity)

    try {
      const res = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.errors) {
        setErrors(data.errors);
      }

      if (data.user) {
        window.location.assign('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputClasses = "w-full bg-gray-800 text-pink-100 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-pink-300 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-pink-200 mb-1 block" htmlFor="email">
              <Mail className="inline mr-2" size={18} />
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
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-pink-200 mb-1 block" htmlFor="username">
              <User className="inline mr-2" size={18} />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-pink-200 mb-1 block" htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-pink-200 mb-1 block" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-pink-200 mb-1 block" htmlFor="phoneNumber">
              <Phone className="inline mr-2" size={18} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="text-pink-200 mb-1 block" htmlFor="userType">User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="user">Retail</option>
              <option value="admin">Wholesale</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-pink-200 mb-1 block" htmlFor="password">
              <Lock className="inline mr-2" size={18} />
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
          </div>

          <div>
            <label className="text-pink-200 mb-1 block" htmlFor="confirmPassword">
              <Lock className="inline mr-2" size={18} />
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <UserPlus className="mr-2" size={18} />
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUpForm;