import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidePanel from './MainManagerSidepanel';
import ReportSelectionbar from "./ReportSelectionbar";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function SalesbyCity() {
    const [store, setStore] = useState('1'); // Default to Store 1
    const [dateRange, setDateRange] = useState('7'); // Default to 1 day
    const [revenueData, setRevenueData] = useState([]);

    // Fetch revenue data based on store and date range
    const fetchRevenueData = () => {
        axios.get('http://localhost:8080/mainmanager/route-revenue', {
            params: { store_id: store, date_range: dateRange },
            withCredentials: true
        })
        .then(response => setRevenueData(response.data))
        .catch(error => console.error('Error fetching revenue data:', error));
    };

    // Automatically fetch data when store or dateRange changes
    useEffect(() => {
        if (store) fetchRevenueData();
    }, [store, dateRange]);

    // Prepare data for Chart.js with conditional colors
    const chartData = {
        labels: revenueData.map(item => item.route),
        datasets: [
            {
                label: 'Total Revenue',
                data: revenueData.map(item => item.total_revenue),
                backgroundColor: revenueData.map(item => 
                    item.total_revenue > 1000 ? 'rgba(34, 139, 34, 0.8)' : 'rgba(144, 238, 144, 0.8)'
                ),
                borderColor: revenueData.map(item => 
                    item.total_revenue > 1000 ? 'rgba(34, 139, 34, 1)' : 'rgba(144, 238, 144, 1)'
                ),
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="flex">
            {/* SidePanel on the left */}
            <div className="w-1/5">
                <SidePanel />
            </div>

            {/* Main Content on the right */}
            <div className="w-4/5 p-6 bg-gray-50">
                <ReportSelectionbar />
                <p className="text-xl font-semibold text-gray-800 mt-4">Sales by City</p>

                {/* Route Revenue Chart */}
                <h2 className="text-xl font-semibold mt-25 text-gray-800">Route Revenue</h2>
                <div className="flex items-center space-x-4 mt-4 mb-8">
                    <div>
                        <label className="mr-2 font-medium text-gray-700">Store:</label>
                        <select 
                            className="border border-gray-300 bg-gradient-to-r from-green-200 to-green-300 rounded-full px-4 py-2 text-gray-700 font-semibold hover:from-green-300 hover:to-green-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={store} 
                            onChange={(e) => setStore(e.target.value)}
                        >
                            <option value="">Select Store</option>
                            {Array.from({ length: 6 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>Store {index + 1}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mr-2 font-medium text-gray-700">Sort by Date:</label>
                        <select 
                            className="border border-gray-300 bg-gradient-to-r from-green-200 to-green-300 rounded-full px-4 py-2 text-gray-700 font-semibold hover:from-green-300 hover:to-green-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={dateRange} 
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="1">1 day</option>
                            <option value="7">1 week</option>
                            <option value="30">1 month</option>
                        </select>
                    </div>
                </div>

                {/* Render Bar chart only if revenueData has entries */}
                {revenueData.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-lg mx-auto" style={{ height: '400px', width: '90%' }}>
                        <Bar 
                            data={chartData} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'Route Revenue by Date Range' }
                                },
                                scales: {
                                    y: { 
                                        beginAtZero: true,
                                        ticks: { color: '#4B5563' },
                                    },
                                    x: {
                                        ticks: { color: '#4B5563' },
                                    }
                                }
                            }} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SalesbyCity;
