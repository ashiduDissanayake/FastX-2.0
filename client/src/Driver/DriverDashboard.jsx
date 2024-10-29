import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidePanel from './DriverSidePanel';

function DriverDashboard() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/driver/order-deliver', { withCredentials: true });
      setOrders(response.data.orders);
    } catch (error) {
      setError('Failed to load orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsDelivered = async (order_id) => {
    try {
      await axios.patch(`http://localhost:8080/driver/deliver/${order_id}`, {}, { withCredentials: true });
      setOrders((prevOrders) => 
        prevOrders.map(order =>
          order.order_id === order_id ? { ...order, status: 'Delivered' } : order
        )
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
      setError('Could not mark order as delivered');
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-1/4">
        <SidePanel />
      </div>

      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Driver Dashboard</h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          orders ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Order Date and Time</th>
                    <th className="px-6 py-3 text-left font-semibold">Capacity</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50`}>
                      <td className="border px-6 py-4 text-gray-700">{order.order_id}</td>
                      <td className="border px-6 py-4 text-gray-700">{new Date(order.date).toLocaleString()}</td>
                      <td className="border px-6 py-4 text-gray-700">{order.capacity}</td>
                      <td className="border px-6 py-4">
                        {order.status === 'Delivered' ? (
                          <span className="text-green-600 font-semibold">Delivered</span>
                        ) : (
                          <button
                            onClick={() => markAsDelivered(order.order_id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
          ) : (
            <p className="text-lg text-gray-600">Loading orders...</p>
          )
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
