import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaChartLine, FaClock } from "react-icons/fa";

const Reports = () => {
  const [activePage, setActivePage] = useState("Reports");
  const navigate = useNavigate();

  const reportCards = [
    {
      title: "Sales Report",
      description: "Sales categorized by cities and routes.",
      icon: <FaChartLine />,
      bgColor: "bg-gradient-to-r from-blue-700 to-blue-900",
      navigateTo: "/manager-reports/sales",
    },
    {
      title: "Working Hours Report",
      description: "View driver and truck usage hours.",
      icon: <FaClock />,
      bgColor: "bg-gradient-to-r from-green-600 to-green-800",
      navigateTo: "/manager-reports/working-hours",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="w-full lg:w-3/4 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800 mb-8">
            Reports
          </h1>

          {/* Cards Section */}
          <section className="flex flex-col gap-10 w-full max-w-xl">
            {reportCards.map((card, index) => (
              <div
                key={index}
                className={`${card.bgColor} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer relative flex flex-col`}
                onClick={() => navigate(card.navigateTo)}
                style={{ minHeight: "200px" }} // Increased card size
              >
                <div className="absolute top-4 right-8 opacity-20 text-8xl">
                  {card.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-semibold mb-4">{card.title}</h3>
                  <p className="text-gray-100 text-xl">{card.description}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Reports;
