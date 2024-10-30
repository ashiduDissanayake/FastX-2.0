import React, { useEffect, useState } from 'react';
import { FaIdBadge, FaStore, FaClock, FaUserCheck } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import SidePanel from './DriverSidePanel';
import img2 from './assets/bg1.jpg';

function DriverProfile() {
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDriverDetails() {
      try {
        const response = await fetch('http://localhost:8080/driver/profile', {
          method: 'GET',
          credentials: 'include', // Include credentials with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch driver details");
        }

        const data = await response.json();
        setDriverDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDriverDetails();
  }, []);

  const maxWorkingHours = 40;
  const workingHours = driverDetails ? driverDetails.current_working_time : 0;
  const progressData = {
    datasets: [
      {
        data: [workingHours, maxWorkingHours - workingHours],
        backgroundColor: ['#4CAF50', '#E0E0E0'], // Colors for filled and remaining
      },
    ],
    labels: ['Current Working Time', 'Remaining Time'],
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* Main profile section on the right */}
      <div className="w-3/4 p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Driver Profile</h2> {/* Increased font size */}
        {loading ? (
          <p className="text-gray-600">Loading driver details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : driverDetails ? (
          <div className="grid grid-cols-2 gap-6"> {/* Increased gap between tiles */}
            {/* Colorful Tiles for Driver Details */}
            <div className="bg-blue-200 p-6 rounded-lg shadow-md flex items-center"> {/* Increased padding */}
              <FaIdBadge className="mr-2 text-blue-500 text-3xl" /> {/* Increased icon size */}
              <p className="text-lg"><strong>Driver ID:</strong> {driverDetails.driver_ID}</p>
            </div>
            <div className="bg-green-200 p-6 rounded-lg shadow-md flex items-center"> {/* Increased padding */}
              <FaUserCheck className="mr-2 text-green-500 text-3xl" /> {/* Increased icon size */}
              <p className="text-lg"><strong>Status:</strong> {driverDetails.status}</p>
            </div>
            <div className="bg-yellow-200 p-6 rounded-lg shadow-md flex items-center"> {/* Increased padding */}
              <FaStore className="mr-2 text-yellow-500 text-3xl" /> {/* Increased icon size */}
              <p className="text-lg"><strong>Store ID:</strong> {driverDetails.store_ID}</p>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg shadow-md flex items-center"> {/* Increased padding */}
              <FaClock className="mr-2 text-purple-500 text-3xl" /> {/* Increased icon size */}
              <p className="text-lg"><strong>Current Working Time:</strong> {driverDetails.current_working_time} hours</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Driver details not available.</p>
        )}

        {/* Doughnut Chart for Working Hours - positioned outside of the profile box */}
        <div className="flex justify-center mt-8">
          <div className="relative flex items-center justify-center" style={{ width: '300px', height: '300px' }}>
            <Doughnut data={progressData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Text Below the Pie Chart */}
        <div className="flex justify-center mt-4">
          <p className="text-lg text-gray-800 text-center">
            {((workingHours / maxWorkingHours) * 100).toFixed(2)}%
            <br />
            <span className="text-sm text-gray-600">of maximum working hours used</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;