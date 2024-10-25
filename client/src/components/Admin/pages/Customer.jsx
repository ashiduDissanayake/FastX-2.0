import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import img2 from './assets/bg.jpg'; // Background image
import axios from 'axios';

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [highlightedEmail, setHighlightedEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/admin/get-customer')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  // Handle input change for the search email
  const handleEmailChange = (e) => {
    setSearchEmail(e.target.value);
  };

  // Handle Find customer by email
  const handleFindCustomer = () => {
    const customer = customers.find(c => c.email === searchEmail);
    
    if (customer) {
      setHighlightedEmail(searchEmail);
    } else {
      alert('Customer not found');
      setHighlightedEmail('');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img2})`, // Set the background image
        backgroundSize: 'cover',         // Cover the entire container
        backgroundPosition: 'center',    // Center the background image
        minHeight: '100vh',              // Make sure it covers the full screen
        padding: '20px',
      }}
      className="flex"
    >
      <Sidebar />

      <div className="container mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg flex-grow">
        <h1 className="text-3xl font-bold mb-6">Customers</h1>

        {/* Form for searching customers by email */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">Find Customer by Email</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={searchEmail}
                onChange={handleEmailChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
              onClick={handleFindCustomer}
            >
              Find
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setSearchEmail('');
                setHighlightedEmail('');
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table to list all customers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Customer List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className={highlightedEmail === customer.email ? 'bg-yellow-200' : ''}
                >
                  <td className="border px-4 py-2">{customer.first_name}</td>
                  <td className="border px-4 py-2">{customer.last_name}</td>
                  <td className="border px-4 py-2">{customer.email}</td>
                  <td className="border px-4 py-2">{customer.phone_number}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
