import React, { useState, useEffect } from 'react';
import SidePanel from '../MainManagerSidepanel';
import StoreSidebar from '../StoreSidebar';

function Store4() {
  const [orders, setOrders] = useState([]);
  const [trainCapacity, setTrainCapacity] = useState(0);
  const [displayCapacity, setDisplayCapacity] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchTrainCapacity();

    const intervalId = setInterval(() => {
      fetchOrders();
      fetchTrainCapacity();
    }, 5000);

    const clockIntervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(clockIntervalId);
    };
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:8080/mainmanager/Store4/orders', {
      method: 'GET',
      credentials: 'include', // This adds withCredentials to the request
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  };

  const fetchTrainCapacity = () => {
    fetch('http://localhost:8080/mainmanager/train/nearest-capacity/4', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setTrainCapacity(data.capacity);
        setDisplayCapacity(data.Availabale_capacity);
        setDepartureTime(new Date(data.departure_Time));
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
        if (!response.ok) throw new Error('Error updating order status: ' + response.statusText);
        return response.json();
      })
      .then(() => {
        return fetch('http://localhost:8080/mainmanager/train/reduce-capacity/4', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ capacity: orderCapacity }),
        });
      })
      .then(response => {
        if (!response.ok) throw new Error('Error reducing train capacity: ' + response.statusText);
        return response.json();
      })
      .then(() => {
        setDisplayCapacity(prevCapacity => prevCapacity - orderCapacity);
        fetchOrders();
      })
      .catch(error => console.error('Error processing status change:', error));
  };

  const formatRemainingTime = (departure) => {
    if (!departure) return 'Loading...';
    const now = new Date();
    const remainingTime = departure - now;

    if (remainingTime <= 0) return 'Departure has passed';

    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex">
      <div className="w-1/5">
        <SidePanel />
      </div>

      <div className="w-4/5 flex flex-col p-6">
        <StoreSidebar className="mb-4" />

        <div className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Remaining Time to Departure</h2>
          <p className="text-4xl font-bold text-center text-blue-600">{formatRemainingTime(departureTime)}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Order List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Order Date and Time</th>
                <th className="py-3 px-4 text-left">Capacity</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Array.isArray(orders) && orders.slice(0, 6).map(order => (
                <tr key={order.order_id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{order.order_id}</td>
                  <td className="py-3 px-4">{order.order_date}</td>
                  <td className="py-3 px-4">{order.capacity}</td>
                  <td className="py-3 px-4">
                    <span 
                      className={`inline-block px-3 py-1 rounded-full text-sm 
                        ${order.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
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

        {displayCapacity !== null && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Nearest Train Capacity</h2>
            <div className="w-full bg-gray-300 rounded-full h-6 shadow-lg">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((trainCapacity-displayCapacity) / trainCapacity) * 100}%` }}
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

export default Store4;
