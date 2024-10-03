import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // State for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);

      // Handle errors returned from the server
      if (data.errors) {
        setEmailError(data.errors.email || '');
        setPasswordError(data.errors.password || '');
      }

      // Redirect to homepage on successful login
      if (data.user) {
        window.location.assign('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-96"
      >
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{emailError}</div>

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{passwordError}</div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
