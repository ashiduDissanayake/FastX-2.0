import React, { useState } from 'react';

const SignUpForm = () => {
  // State for form fields and error messages
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('user'); // default user type
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setErrors({});

    // Simple client-side validation
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!username) newErrors.username = 'Username is required';
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    try {
      const res = await fetch('/api/user/signup', { // Adjusted API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, firstName, lastName, phoneNumber, userType }),
      });
      const data = await res.json();
      console.log(data);

      // Handle errors returned from the server
      if (data.errors) {
        setErrors(data.errors);
      }

      // Redirect to homepage on successful registration
      if (data.user) {
        window.location.assign('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-96"
      >
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{errors.email}</div>

        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{errors.username}</div>

        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{errors.firstName}</div>

        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{errors.lastName}</div>

        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{errors.phoneNumber}</div>

        <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
          User Type
        </label>
        <select
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

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
        <div className="text-red-500 text-sm mb-2">{errors.password}</div>

        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-red-500 text-sm mb-2">{errors.confirmPassword}</div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
