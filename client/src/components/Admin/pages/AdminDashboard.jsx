import React, { useEffect, useState } from 'react';
import img2 from './assets/bg.jpg'; // Background image
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import Footer from './components/Footer.jsx';
import axios from 'axios'; // Import axios for HTTP requests
import { Pie } from 'react-chartjs-2'; // Import Pie chart component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend); // Register the required components

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [displayedCustomerCount, setDisplayedCustomerCount] = useState(0);
  const [displayedProductCount, setDisplayedProductCount] = useState(0);
  const [displayedEmployeeCount, setDisplayedEmployeeCount] = useState(0);

  // Fetch counts from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/admin/countcustomer')
      .then((response) => {
        setCustomerCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });

    axios.get('http://localhost:8080/admin/countproduct')
      .then((response) => {
        setProductCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product count:', error);
      });

    axios.get('http://localhost:8080/admin/countEmployee')
      .then((response) => {
        setEmployeeCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee count:', error);
      });
  }, []);

  // Counter animation
  useEffect(() => {
    animateValue(setDisplayedCustomerCount, customerCount, 1500);
    animateValue(setDisplayedProductCount, productCount, 1500);
    animateValue(setDisplayedEmployeeCount, employeeCount, 1500);
  }, [customerCount, productCount, employeeCount]);

  const animateValue = (setter, finalValue, duration) => {
    let start = 0;
    const increment = finalValue / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setter(finalValue);
        clearInterval(timer);
      } else {
        setter(Math.ceil(start));
      }
    }, 50);
  };

  // Pie chart data
  const pieData = {
    labels: ['Total Sells', 'Total Customers', 'Total Products', 'Total Employees'],
    datasets: [{
      label: 'Counts',
      data: [25, displayedCustomerCount, displayedProductCount, displayedEmployeeCount],
      backgroundColor: [
        'rgba(255, 206, 86, 0.6)', // Yellow
        'rgba(75, 192, 192, 0.6)', // Green
        'rgba(54, 162, 235, 0.6)', // Blue
        'rgba(255, 99, 132, 0.6)',  // Red
      ],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 2,
    }],
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-5 bg-cover bg-center bg-no-repeat overflow-y-auto" style={{ backgroundImage: `url(${img2})` }}>
          <Header />
          <Statistics 
            customerCount={displayedCustomerCount} 
            productCount={displayedProductCount} 
            employeeCount={displayedEmployeeCount} 
          />
          {/* Pie Chart Component */}
          <div className="mt-10 bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Statistics Overview</h2>
            {/* Set width and height for the Pie chart */}
            <div style={{ width: '300px', height: '300px' }}>
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="mb-5">
    <h1 className="text-2xl font-bold">
      <span className="text-white inline-block animate-pulse">Hello! Yasith</span>
    </h1>
  </header>
);

const Statistics = ({ customerCount, productCount, employeeCount }) => (
  <div className="grid grid-cols-2 gap-y-5 gap-x-5 bg-[#001f3f] p-5 rounded-lg">
    <Statistic 
      title="Total Sells" 
      value={<span className="text-4xl font-bold">25<span className="text-red-500 text-5xl">+</span></span>} 
      change="" 
    />
    <Statistic 
      title="Total Customers" 
      value={<span className="text-4xl font-bold">{customerCount}<span className="text-red-500 text-5xl">+</span></span>} 
      change="" 
    />
    <Statistic 
      title="Total Products" 
      value={<span className="text-4xl font-bold">{productCount}<span className="text-red-500 text-5xl">+</span></span>} 
      change="" 
    />
    <Statistic 
      title="Total Employees" 
      value={<span className="text-4xl font-bold">{employeeCount}<span className="text-red-500 text-5xl">+</span></span>} 
      change="" 
    />
  </div>
);

const Statistic = ({ title, value, change }) => (
  <div className="bg-white p-5 rounded-lg text-center shadow-xl w-full transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:h-auto min-h-[150px]">
    <h2 className="text-[#001f3f] text-lg font-bold mb-2">{title}</h2>
    <p className="text-gray-800">{value}</p>
    <small className={change.includes('-') ? 'text-red-600' : 'text-green-600'}>{change}</small>
  </div>
);

const ActorsAnalysis = () => (
  <div className="mt-5 bg-white p-5 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-4">Actors Analysis</h2>
    <div className="space-y-4">
      <ActorLine title="End Customers" percentage={53} />
      <ActorLine title="Retailers" percentage={22} />
      <ActorLine title="Whole Sellers" percentage={15} />
      <ActorLine title="Others" percentage={10} />
    </div>
  </div>
);

const ActorLine = ({ title, percentage }) => (
  <div className="flex items-center">
    <p className="w-1/4 font-semibold">{title}</p>
    <div className="w-3/4 bg-gray-300 rounded-full h-4 relative">
      <div
        className="bg-[#001f3f] h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute right-0 text-xs font-semibold text-gray-800">
        {percentage}%
      </span>
    </div>
  </div>
);

export default AdminDashboard;
