import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaTasks,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";

const DriverDashboard = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState("Home");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (item) => {
    setActivePage(item);
    if (item === "Store") {
      navigate("/store"); // Navigate to the schedule-trip page
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleNavigation={handleNavigation}
      />

      {/* Main Content */}
      <main className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>

        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
            //   {
            //     title: "Orders",
            //     bgColor: "bg-blue-500",
            //     icon: <FaTruck />,
            //     navigateTo: "/orders",
            //   },
            //   {
            //     title: "Train schedule",
            //     bgColor: "bg-green-500",
            //     icon: <FaTasks />,
            //     navigateTo: "/trainschedule",
    
                
            //   },
            //   {
            //     title: "Stores",
            //     bgColor: "bg-yellow-500",
            //     icon: <FaClipboardList />,

            //     navigateTo: "/store",
            //   },
              {
                title: "Reports",
                bgColor: "bg-purple-500",
                icon: <FaFileAlt />,
                // navigateTo: "/reports",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className={`${stat.bgColor} text-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden cursor-pointer`}
                onClick={() => {
                  if (stat.navigateTo) {
                    navigate(stat.navigateTo); // Navigate to the corresponding page
                  }
                }}
              >
                <div className="absolute top-0 right-0 opacity-20 text-8xl">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold z-10 relative">{stat.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DriverDashboard;
