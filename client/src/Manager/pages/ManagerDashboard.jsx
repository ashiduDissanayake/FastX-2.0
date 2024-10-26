import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaTasks,
  FaChartBar,
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
    {
      title: "Reports",
      description: "View working hours and truck usage reports.",
      bgColor: "bg-gradient-to-r from-purple-700 to-purple-900",
      icon: <FaChartBar />,
      navigateTo: "/manager-reports",
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
      </main>
    </div>
  );
};

export default ManagerDashBoard;
