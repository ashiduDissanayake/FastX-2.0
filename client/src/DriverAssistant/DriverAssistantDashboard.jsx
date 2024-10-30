import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidePanel from './DriverAssistantSideBar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DriverAssistantDashboard = () => {
  const [workingHours, setWorkingHours] = useState(0);
  const maxWorkingHours = 60; // Maximum working hours

  useEffect(() => {
    // Fetch working hours
    const fetchWorkingHours = async () => {
      try {
        const response = await axios.get('http://localhost:8080/driverassistant/working-hours', { withCredentials: true });
        setWorkingHours(response.data.hours);
      } catch (error) {
        console.error("Error fetching working hours:", error);
      }
    };

    fetchWorkingHours();
  }, []);

  // Calculate percentage for the progress circle
  const progressPercentage = Math.min((workingHours / maxWorkingHours) * 100, 100);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Sidebar */}
      <div className="w-1/5 ">
        <SidePanel />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8">Driver Assistant Dashboard</h1>

        {/* Working Hours Section with Enhanced Doughnut Progress */}
        <div className="bg-white p-10 rounded-2xl shadow-xl mb-10 flex flex-col items-center ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Working Hours</h2>
          <div className="w-40 h-40 mb-6">
            <CircularProgressbar
              value={progressPercentage}
              text={`${workingHours} hrs`}
              styles={buildStyles({
                pathColor: progressPercentage > 80 ? '#EF4444' : '#07db2a',
                trailColor: '#E5E7EB',
                textColor: '#111827',
                strokeLinecap: 'round',
              })}
            />
          </div>
          <p className="mt-4 text-lg text-gray-700">
            You have worked <strong>{workingHours}</strong> out of <strong>{maxWorkingHours}</strong> hours.
          </p>
        </div>

        {/* Quick Actions Section with Update Orders Card */}
        <div className="grid grid-cols-1 gap-6">
          <Link
            to="/driver-assistant-update-orders"
            className="block w-90 p-6 bg-white rounded-2xl shadow-lg transition-all border border-gray-200 hover:border-blue-500"
          >
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2 text-blue-600">Update Orders</h3>
              <p className="text-center text-md text-gray-500 mb-4">Click here to mark orders as delivered or update order status.</p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full transition-all transform hover:scale-105 hover:shadow-lg">
                Go to Update
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DriverAssistantDashboard;
