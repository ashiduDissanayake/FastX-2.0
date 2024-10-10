import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import img2 from './assets/bg.jpg'; // Background image
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample sales data for each product for each month
const salesData = {
  January: { 'Product A': 120, 'Product B': 100, 'Product C': 90 },
  February: { 'Product A': 200, 'Product B': 150, 'Product C': 180 },
  March: { 'Product A': 300, 'Product B': 280, 'Product C': 250 },
  April: { 'Product A': 250, 'Product B': 220, 'Product C': 190 },
  May: { 'Product A': 320, 'Product B': 300, 'Product C': 260 },
  June: { 'Product A': 280, 'Product B': 290, 'Product C': 240 },
  July: { 'Product A': 150, 'Product B': 180, 'Product C': 170 },
  August: { 'Product A': 400, 'Product B': 370, 'Product C': 340 },
  September: { 'Product A': 350, 'Product B': 320, 'Product C': 310 },
  October: { 'Product A': 270, 'Product B': 240, 'Product C': 230 },
  November: { 'Product A': 220, 'Product B': 210, 'Product C': 200 },
  December: { 'Product A': 320, 'Product B': 290, 'Product C': 260 },
};


  export default function Report() {
    const [selectedMonth, setSelectedMonth] = useState('January'); // Default month selection
  
    // Get sales data for the selected month
    const productSales = salesData[selectedMonth];
    const productLabels = Object.keys(productSales); // Product names for x-axis
    const productValues = Object.values(productSales); // Corresponding sales for y-axis
  
    // Chart data
    const data = {
      labels: productLabels, // Products on x-axis
      datasets: [
        {
          label: `Sales in ${selectedMonth}`,
          data: productValues, // Sales for the selected month
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Color for bars
        },
      ],
    };
  
    // Chart options
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Sales Report for ${selectedMonth}`,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Products',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Sales',
          },
          beginAtZero: true,
        },
      },
    };
  
    // Handle month change
    const handleMonthChange = (event) => {
      setSelectedMonth(event.target.value);
    };
  
    return (
      <div className="flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar Component */}
        <Sidebar />
  
        {/* Report Content */}
        <div
          style={{
            backgroundImage: `url(${img2})`, // Set the background image
            backgroundSize: 'cover', // Cover the entire container
            backgroundPosition: 'center', // Center the background image
            padding: '20px',
          }}
          className="container mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg flex-grow"
        >
          {/* Updated Text to White */}
          <h1 className="text-3xl font-bold mb-6 text-white">Sales Report</h1>
  
          {/* Month Dropdown */}
          <div className="mb-6">
            <label htmlFor="month-select" className="block text-lg font-medium mb-2 text-white">
              Select Month:
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              {Object.keys(salesData).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
  
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded shadow-lg">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    );
  }
