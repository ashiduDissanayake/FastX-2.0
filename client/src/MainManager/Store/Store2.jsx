import React, { useState, useEffect } from 'react';
import SidePanel from '../MainManagerSidepanel';
import StoreSidebar from '../StoreSidebar';

function Store2() {
  const [orders, setOrders] = useState([]);
  const [trainCapacity, setTrainCapacity] = useState(0);
  const [displayCapacity, setDisplayCapacity] = useState(0);

  useEffect(() => {
    // Fetch data immediately when component mounts
    fetchOrders();
    fetchTrainCapacity();

    // Set up polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchOrders();
      fetchTrainCapacity();
    }, 5000); // Adjust the interval time as needed

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
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
    fetch('http://localhost:8080/api/train/nearest-capacity/2')
      .then(response => response.json())
      .then(data => {
        setTrainCapacity(data.capacity);
        setDisplayCapacity(data.Availabale_capacity); // Check for typo in "Availabale_capacity"
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
          throw new Error('Error updating order status: ' + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        // After successfully updating the order status, reduce the train capacity
        return fetch('http://localhost:8080/api/train/reduce-capacity/2', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ capacity: orderCapacity }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error reducing train capacity: ' + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        // Update display capacity after reducing the train capacity
        setDisplayCapacity(prevCapacity => prevCapacity - orderCapacity);
        // Optionally refresh orders to ensure the latest state
        fetchOrders();
      })
      .catch(error => console.error('Error processing status change:', error));
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SidePanel />
      </div>

      <div className="w-3/4 p-8">
        <StoreSidebar />
        

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
              {Array.isArray(orders) && orders.slice(0, 6).map(order => (
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
                className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full transition-all duration-300 ease-in-out"
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
