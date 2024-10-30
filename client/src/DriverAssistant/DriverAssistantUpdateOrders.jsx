import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidePanel from './DriverAssistantSideBar'; // Sidebar component for navigation

function UpdateOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/driverassistant/getordersbytruckschedule', { withCredentials: true });
      if (response.data.orders) {
        setOrders(response.data.orders);
      } else {
        setError('No orders found for this driver assistant');
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (order_id, status) => {
    try {
      await axios.patch(`http://localhost:8080/driverassistant/updateorders/${order_id}`, { status }, { withCredentials: true });
      setOrders((prevOrders) => 
        prevOrders.map(order =>
          order.order_id === order_id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error(`Failed to update order status to ${status}:`, error);
      setError(`Could not update order status to ${status}`);
    }
  };  

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Update Orders</h1>

        {loading ? (
          <p className="text-lg text-gray-600">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg text-center">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-3 font-semibold">Schedule ID</th>
                  <th className="px-6 py-3 font-semibold">Order ID</th>
                  <th className="px-6 py-3 font-semibold">Capacity</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50`}>
                    <td className="border px-6 py-4 text-gray-700">{order.schedule_ID}</td>
                    <td className="border px-6 py-4 text-gray-700">{order.order_id}</td>
                    <td className="border px-6 py-4 text-gray-700">{order.capacity}</td>
                    <td className="border px-6 py-4 space-x-2 flex justify-center">
                      {order.status === 'Delivered' || order.status === 'In Branch' ? (
                        <span className="text-gray-700 font-semibold">{order.status}</span>
                      ) : (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.order_id, 'Delivered')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mr-2"
                          >
                            Mark as Delivered
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.order_id, 'In Branch')}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                          >
                            Set as In Branch
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateOrders;
