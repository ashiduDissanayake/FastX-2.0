import React, { useEffect, useState } from 'react';
import img2 from './assets/bg.jpg'; // Background image
import Sidebar from './components/Sidebar.jsx'; // Import the Sidebar component
import Footer from './components/Footer.jsx';
import axios from 'axios'; // Import axios for HTTP requests

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [employeeCount,setEmployeeCount]=useState(0);

  // Fetch customer count and product count from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/admin/countcustomer')
      .then((response) => {
        setCustomerCount(response.data); // Update customerCount from backend
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });

    axios.get('http://localhost:8080/admin/countproduct')
      .then((response) => {
        setProductCount(response.data); // Update productCount from backend
      })
      .catch((error) => {
        console.error('Error fetching product count:', error);
      });
    axios.get('http://localhost:8080/admin/countEmployee')
    .then((response) => {
      setEmployeeCount(response.data); // Update productCount from backend
    })
    .catch((error) => {
      console.error('Error fetching product count:', error);
    });

  }, []);

  return (
    <div className="flex flex-col h-screen font-sans">
      <div className="flex flex-grow">
        <Sidebar />
        {/* Apply the background image to the main content */}
        <div className="flex-grow p-5 bg-cover bg-center bg-no-repeat overflow-y-auto" style={{ backgroundImage: `url(${img2})` }}>
          <Header />
          {/* Pass both customerCount and productCount to the Statistics component */}
          <Statistics customerCount={customerCount} productCount={productCount} employeeCount = {employeeCount} />
          <ActorsAnalysis />
        </div>
      </div>
      {/* Footer should be placed here to stay at the bottom */}
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="mb-5">
    <h1 className="text-3xl font-bold">
      <span className="text-white text-3xl font-bold inline-block animate-pulse">Hello! Yasith</span>
    </h1>
  </header>
);

// Update the Statistics component to accept both customerCount and productCount
const Statistics = ({ customerCount, productCount,employeeCount }) => (
  <div className="flex justify-between bg-[#001f3f] p-5 rounded-lg">
     <Statistic 
  title="Total Sells" 
  value={<span className="text-4xl font-bold">689+</span>}  // Increase font size for "Total Sells"
  change="" 
/>
{/* Display the customerCount with increased font size */}
<Statistic 
  title="Total Customers" 
  value={<span className="text-4xl font-bold">{customerCount}+</span>}  // Increase font size for customerCount
  change="" 
/>
{/* Display the productCount with increased font size */}
<Statistic 
  title="Total Products" 
  value={<span className="text-4xl font-bold">{productCount}+</span>}  // Increase font size for productCount
  change="" 
/>
<Statistic 
  title="Total Employees" 
  value={<span className="text-4xl font-bold">{employeeCount}+</span>}  // Increase font size for productCount
  change="" 
/>

  </div>
);

const Statistic = ({ title, value, change }) => (
  <div className="bg-white p-5 rounded-lg text-center shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-2xl w-1/3">
    <h2 className="text-[#001f3f] text-lg font-bold mb-2">{title}</h2>
    <p className="text-gray-800">{value}</p>
    <small className={change.includes('-') ? 'text-red-600' : 'text-green-600'}>{change}</small>
  </div>
);

const ActorsAnalysis = () => (
  <div className="mt-5 bg-white p-5 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-4">Actors Analyse</h2>
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
