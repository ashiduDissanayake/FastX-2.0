import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import img2 from './assets/bg.jpg'; // Background image

// Sample data for customers (You can fetch this from your backend)
const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '0771234567', address: 'Colombo, Sri Lanka' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0771234578', address: 'Kandy, Sri Lanka' },
];

// Main Customer Component
export default function Customer() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [editCustomerId, setEditCustomerId] = useState(null);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  // Add new customer
  const handleAddCustomer = () => {
    const newId = customers.length + 1;
    setCustomers([...customers, { ...newCustomer, id: newId }]);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
  };

  // Edit customer
  const handleEditCustomer = (customer) => {
    setEditCustomerId(customer.id);
    setNewCustomer(customer);
  };

  // Save edited customer
  const handleSaveCustomer = () => {
    setCustomers(customers.map((c) => (c.id === editCustomerId ? newCustomer : c)));
    setEditCustomerId(null);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
  };

  // Delete customer
  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
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

        {/* Form for adding/editing customers */}
        <div className="bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl mb-4">{editCustomerId ? 'Edit Customer' : 'Add New Customer'}</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={newCustomer.address}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div className="mt-6 flex justify-end">
            {editCustomerId ? (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                onClick={handleSaveCustomer}
              >
                Save Customer
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                onClick={handleAddCustomer}
              >
                Add Customer
              </button>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setEditCustomerId(null);
                setNewCustomer({ name: '', email: '', phone: '', address: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Table to list all customers */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Customer List</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer.email}</td>
                  <td className="border px-4 py-2">{customer.phone}</td>
                  <td className="border px-4 py-2">{customer.address}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      Edit
                    </button>
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
