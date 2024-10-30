import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaTasks, FaChartBar, FaClipboardList, FaStore } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const ManagerDashBoard = () => {
  const [activePage, setActivePage] = useState("Home");
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  // States to store data from the backend
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [activeDrivers, setActiveDrivers] = useState(0);
  const [totalAssistants, setTotalAssistants] = useState(0);
  const [activeAssistants, setActiveAssistants] = useState(0);
  const [totalTrucks, setTotalTrucks] = useState(0);
  const [activeTrucks, setActiveTrucks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/manager/dashboard-data", { withCredentials: true });
        const data = response.data.data;

        if (data) {
          setTotalDrivers(data.TotalDrivers);
          setActiveDrivers(data.ActiveDrivers);
          setTotalAssistants(data.TotalAssistants);
          setActiveAssistants(data.ActiveAssistants);
          setTotalTrucks(data.TotalTrucks);
          setActiveTrucks(data.ActiveTrucks);
        } else {
          console.warn("Data format is incorrect:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate progress values
  const driverProgress = totalDrivers > 0 ? (activeDrivers / totalDrivers) * 100 : 0;
  const assistantProgress = totalAssistants > 0 ? (activeAssistants / totalAssistants) * 100 : 0;
  const truckProgress = totalTrucks > 0 ? (activeTrucks / totalTrucks) * 100 : 0;

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

      {/* Main Content and Right Column */}
      <div className="flex-1 p-0 flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="bg-white p-5 text-center rounded-lg  mb-6">
            <h1 className="text-4xl font-bold text-[#42307D]">Branch Manager Dashboard</h1>
          </div>

          {/* Progress Bars Section */}
          <section className="flex justify-around gap-6 mb-8">
            {/* Active Drivers Progress Card */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center w-1/3">
              <h3 className="text-lg font-semibold mb-4 text-[#42307D]">Active Drivers</h3>
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={driverProgress}
                  text={`${activeDrivers}/${totalDrivers}`}
                  styles={buildStyles({
                    pathColor: "#7F56D9",
                    textColor: "#42307D",
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
            </div>

            {/* Active Assistants Progress Card */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center w-1/3">
              <h3 className="text-lg font-semibold mb-4 text-[#42307D]">Active Assistants</h3>
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={assistantProgress}
                  text={`${activeAssistants}/${totalAssistants}`}
                  styles={buildStyles({
                    pathColor: "#7F56D9",
                    textColor: "#42307D",
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
            </div>

            {/* Active Trucks Progress Card */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center w-1/3">
              <h3 className="text-lg font-semibold mb-4 text-[#42307D]">Active Trucks</h3>
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={truckProgress}
                  text={`${activeTrucks}/${totalTrucks}`}
                  styles={buildStyles({
                    pathColor: "#7F56D9",
                    textColor: "#42307D",
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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

        {/* Right Column - Calendar */}
        <aside className="w-1/4 p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-xl font-bold mt-4 mb-6 text-[#42307D]">Your Timeline</h2>
  <Calendar onChange={setDate} value={date} className="rounded-lg shadow-md mb-6" />

  {/* Daily Highlights */}
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-[#42307D] mb-4">Daily Highlights</h3>
    <div className="space-y-4">

      {/* Reminders */}
      <div className="flex items-center p-4 bg-[#FFF0F6] rounded-lg shadow">
        <div className="text-[#F06595] text-2xl mr-3">
          <FaClipboardList />
        </div>
        <div>
          <h4 className="font-bold">3 Pending Reports</h4>
          <p className="text-sm text-gray-600">Review performance data</p>
        </div>
      </div>
      {/* Alerts */}
      <div className="flex items-center p-4 bg-[#EBFBF0] rounded-lg shadow">
        <div className="text-[#32D583] text-2xl mr-3">
          <FaStore />
        </div>
        <div>
          <h4 className="font-bold">New Stock Arrival</h4>
          <p className="text-sm text-gray-600">Check inventory for updates</p>
        </div>
      </div>
    </div>
  </div>
</aside>


      </div>
    </div>
  );
};

export default ManagerDashBoard;
