import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaTasks,
  FaFileAlt,
  FaClipboardList,
  FaStore,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const ManagerDashBoard = () => {
  const [activePage, setActivePage] = useState("Home");
  const navigate = useNavigate();

  const cards = [
    {
      title: "View Orders",
      description: "Check and manage orders for all stores.",
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
      icon: <FaStore />,
      navigateTo: "/manager-view-orders",
    },
    {
      title: "Schedule a New Trip",
      description: "Organize and plan new delivery routes.",
      bgColor: "bg-gradient-to-r from-blue-700 to-blue-900",
      icon: <FaTruck />,
      navigateTo: "/manager-schedule-trip",
    },
    {
      title: "Active Trips",
      description: "Monitor ongoing trips and logistics.",
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      icon: <FaTasks />,
      navigateTo: "/manager-active-trips",
    },
    {
      title: "Finished Trips",
      description: "Review completed trips and performance.",
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      icon: <FaClipboardList />,
      navigateTo: "/manager-finished-trips",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <main className="flex-1 p-0">
        {/* Header Section */}
        <div className="bg-gray-900 p-5 shadow-lg mb-6 text-center ">
          <h1 className="text-4xl font-extrabold text-white">Branch Manager Dashboard</h1>
        </div>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 p-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${card.bgColor} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer relative flex flex-col`}
              onClick={() => navigate(card.navigateTo)}
            >
              <div className="absolute top-0 right-0 opacity-10 text-6xl">
                {card.icon}
              </div>
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-semibold">{card.title}</h3>
                <p className="text-gray-200 mt-2">{card.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Analytics Section */}
<section className="m-5">
  <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
    Key Performance Indicators
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: "Total Orders",
        value: 102,
        change: "Up 10% from last month",
        color: "text-blue-600",
        bgColor: "bg-gradient-to-r from-blue-200 to-blue-400",
        iconBg: "bg-blue-100",
        icon: <FaClipboardList className="text-3xl text-blue-600" />,
      },
      {
        title: "Completed Trips",
        value: 45,
        change: "Up 20% from last week",
        color: "text-green-600",
        bgColor: "bg-gradient-to-r from-green-200 to-green-400",
        iconBg: "bg-green-100",
        icon: <FaTasks className="text-3xl text-green-600" />,
      },
      {
        title: "Pending Deliveries",
        value: 8,
        change: "Critical attention required",
        color: "text-red-600",
        bgColor: "bg-gradient-to-r from-red-200 to-red-400",
        iconBg: "bg-red-100",
        icon: <FaTruck className="text-3xl text-red-600" />,
      },
      {
        title: "Revenue Generated",
        value: "Rs. 2.4M",
        change: "Up 15% from last quarter",
        color: "text-purple-600",
        bgColor: "bg-gradient-to-r from-purple-200 to-purple-400",
        iconBg: "bg-purple-100",
        icon: <FaFileAlt className="text-3xl text-purple-600" />,
      },
    ].map((item) => (
      <div
        key={item.title}
        className={`${item.bgColor} p-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-between space-x-4`}
      >
        <div className={`p-3 rounded-full ${item.iconBg}`}>
          {item.icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.title}
          </h3>
          <p className={`text-3xl font-bold mt-2 ${item.color}`}>
            {item.value}
          </p>
          <p className="text-gray-600 mt-1">{item.change}</p>
        </div>
      </div>
    ))}
  </div>
</section>
      </main>
    </div>
  );
};

export default ManagerDashBoard;
