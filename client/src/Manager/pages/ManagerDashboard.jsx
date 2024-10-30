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
      bgColor: "bg-gradient-to-r from-[#A56EFF] to-[#7F56D9]",
      icon: <FaStore />,
      navigateTo: "/manager-view-orders",
    },
    {
      title: "Schedule a New Trip",
      description: "Organize and plan new delivery routes.",
      bgColor: "bg-gradient-to-r from-[#A56EFF] to-[#7F56D9]",
      icon: <FaTruck />,
      navigateTo: "/manager-schedule-trip",
    },
    {
      title: "Active Trips",
      description: "Monitor ongoing trips and logistics.",
      bgColor: "bg-gradient-to-r from-[#A56EFF] to-[#7F56D9]",
      icon: <FaTasks />,
      navigateTo: "/manager-active-trips",
    },
    {
      title: "Finished Trips",
      description: "Review completed trips and performance.",
      bgColor: "bg-gradient-to-r from-[#A56EFF] to-[#7F56D9]",
      icon: <FaClipboardList />,
      navigateTo: "/manager-finished-trips",
    },
    {
      title: "Reports",
      description: "View working hours and truck usage reports.",
      bgColor: "bg-gradient-to-r from-[#A56EFF] to-[#7F56D9]",
      icon: <FaChartBar />,
      navigateTo: "/manager-reports",
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <main className="flex-1 p-0">
        {/* Header Section */}
        <div className="bg-white p-5 text-center rounded-lg">
          <h1 className="text-4xl font-bold text-[#42307D]">Branch Manager Dashboard</h1>
        </div>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${card.bgColor} text-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer relative flex flex-col`}
              onClick={() => navigate(card.navigateTo)}
            >
              <div className="absolute top-2 right-5 opacity-10 text-6xl">
                {card.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-[#FCFAFF] mt-2">{card.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ManagerDashBoard;
