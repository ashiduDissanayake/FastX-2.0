import React, { useState, useEffect } from 'react';
import SidePanel from '../MainManagerSidepanel';
import StoreSidebar from '../StoreSidebar';

function Store2() {
  const [orders, setOrders] = useState([]);
  const [trainCapacity, setTrainCapacity] = useState(null);
  const [displayCapacity, setDisplayCapacity] = useState(null); // Local display capacity

  useEffect(() => {
    fetchOrders();
    fetchTrainCapacity();
    
    // Retrieve displayCapacity from localStorage
    const savedCapacity = localStorage.getItem('displayCapacity');
    if (savedCapacity) {
      setDisplayCapacity(Number(savedCapacity)); // Convert to number
    }
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:8080/mainmanager/Store2/orders')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const fetchTrainCapacity = () => {
    fetch(`http://localhost:8080/api/train/nearest-capacity/2`)
      .then(response => response.json())
      .then(data => {
        setTrainCapacity(data.capacity);
        setDisplayCapacity(data.capacity); // Initialize local capacity
        // Store initial capacity in localStorage
        localStorage.setItem('displayCapacity', data.capacity);
      })
      .catch(error => console.error('Error fetching train capacity:', error));
  };

  const handleStatusChange = (orderId, orderCapacity) => {
    fetch(`http://localhost:8080/mainmanager/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Shipped' }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        // Update local display capacity
        setDisplayCapacity((prevCapacity) => {
          const newCapacity = prevCapacity - orderCapacity;
          localStorage.setItem('displayCapacity', newCapacity); // Store updated capacity
          return newCapacity;
        });
        fetchOrders(); // Refresh orders after status update
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
                <th className="py-3 px-6 text-left">Capacity</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Array.isArray(orders) && orders.slice(0, 6).map(order => ( // Only take the top 6 orders
                <tr key={order.order_id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{order.order_id}</td>
                  <td className="py-3 px-6">{order.order_date}</td>
                  <td className="py-3 px-6">{order.capacity}</td>
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
                        onClick={() => handleStatusChange(order.order_id, order.capacity)}
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

        {/* Progress Bar */}
        {displayCapacity !== null && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Nearest Train Capacity</h2>
            <div className="w-full bg-gray-300 rounded-full h-6 shadow-lg">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-6 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(displayCapacity / trainCapacity) * 100}%` }}
              >
                <span className="text-white font-semibold pl-2">{displayCapacity} / {trainCapacity}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Store2;
