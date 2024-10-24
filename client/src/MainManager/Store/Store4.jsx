import React, { useState, useEffect } from 'react';
import SidePanel from '../MainManagerSidepanel';
import StoreSidebar from '../StoreSidebar';

function Store1() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:8080/mainmanager/Store1/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data); // Ensure the data is an array
      })
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const handleStatusChange = (orderId) => {
    fetch(`http://localhost:8080/mainmanager/Store4/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Shipped' }),
    })
      .then(response => response.json())
      .then(() => {
        fetchOrders(); // Refresh the orders after status update
      })
      .catch(error => console.error('Error updating order status:', error));
  };

  return (
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* MainmanagerReport on the right */}
      <div className="w-3/4 p-8">
        <StoreSidebar />
        <p>Store 1</p>

        {/* Orders Table */}
        <h2 className="text-2xl font-semibold mb-6">Order List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Order Date and Time</th>
                <th className="py-3 px-6 text-left">Route ID</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Array.isArray(orders) && orders.map(order => (
                <tr key={order.order_id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{order.order_id}</td>
                  <td className="py-3 px-6">{order.order_date}</td>
                  <td className="py-3 px-6">{order.route_id}</td>
                  <td className="py-3 px-6">
                    <span 
                      className={`inline-block px-3 py-1 rounded-full text-sm 
                        ${order.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => handleStatusChange(order.order_id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Mark as Shipped
                      </button>
                    )}
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

export default Store1;
