// App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import SidePanel from './MainManagerSidepanel';
import ReportSelectionbar from "./ReportSelectionbar";

const App = () => {
    const [selectedStore, setSelectedStore] = useState('');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    // Hardcoded stores
    const stores = [
        { store_ID: 1, name: 'Store 1' },
        { store_ID: 2, name: 'Store 2' },
        { store_ID: 3, name: 'Store 3' },
        { store_ID: 4, name: 'Store 4' },
        { store_ID: 5, name: 'Store 5' },
        { store_ID: 6, name: 'Store 6' },
    ];

    const fetchTopCustomers = async (storeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/mainmanager/top-customers/${storeId}`, {
                withCredentials: true,
            });
            const data = response.data; // Customer data array from API
            const usernames = data.map(row => row.username);
            const orderCounts = data.map(row => row.order_count);

            setChartData({
                labels: usernames,
                datasets: [
                    {
                        label: 'Order Count',
                        data: orderCounts,
                        backgroundColor: '#3B3B98',
                        borderColor: '#3B3B98',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching top customers:', error);
        }
    };

    const handleStoreChange = (e) => {
        const storeId = e.target.value;
        setSelectedStore(storeId);
        fetchTopCustomers(storeId);
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* SidePanel on the left */}
            <div className="w-1/5">
                <SidePanel />
            </div>

            {/* Main Content on the right */}
            <div className="w-4/5 p-6">
                <ReportSelectionbar />
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Top Customers by Store</h2>
                
                {/* Store Selection */}
                <div className="flex items-center mb-6 space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <label className="text-gray-600 font-semibold">Select Store:</label>
                    <select
                        value={selectedStore}
                        onChange={handleStoreChange}
                        className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-md px-4 py-2 shadow-md hover:from-teal-500 hover:to-green-400 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out"
                    >
                        <option value="">-- Select Store --</option>
                        {stores.map((store) => (
                            <option key={store.store_ID} value={store.store_ID}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Chart Container */}
                <div className="flex">
                    {/* Bar Chart for Top Customers */}
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
                        {chartData.labels.length > 0 ? (
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { display: false },
                                        title: {
                                            display: true,
                                            text: "Top Customers by Order Count",
                                            color: '#2D3748',
                                            font: { size: 20, weight: 'bold' },
                                        },
                                        tooltip: {
                                            backgroundColor: "rgba(45, 55, 72, 0.8)",
                                            titleFont: { size: 14, weight: 'bold', color: '#E2E8F0' },
                                            bodyFont: { size: 12, color: '#CBD5E0' },
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: "Order Count",
                                                color: '#4A5568',
                                                font: { size: 16 },
                                            },
                                            ticks: { color: '#4A5568' },
                                        },
                                        x: {
                                            ticks: { display: false }, // Hide usernames on x-axis
                                            title: {
                                                display: false,
                                            },
                                        },
                                    },
                                }}
                                className="w-full h-80"
                            />
                        ) : (
                            <p className="text-center text-gray-500">Loading Bar Chart...</p>
                        )}
                    </div>

                    {/* Customer Legend */}
                    <div className="w-2/5 pl-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Customer Legend</h3>
                            <div className="space-y-2">
                                {chartData.labels.map((label, index) => (
                                    <div key={label} className="flex items-center space-x-2">
                                        <div
                                            style={{ backgroundColor: '#3B3B98' }}
                                            className="w-6 h-6 rounded-full border border-gray-300"
                                        />
                                        <span className="text-gray-700 font-medium">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
