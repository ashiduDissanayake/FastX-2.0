import React, { useEffect, useState } from 'react';
import { FaIdBadge, FaStore, FaClock, FaUserCheck } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import SidePanel from './DriverSidePanel';

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
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/5 p-4"> {/* Adjusted width for better fit */}
        <SidePanel />
      </div>

      {/* Main profile section on the right */}
      <div className="w-4/5 p-6"> {/* Adjusted width for profile section */}
        <h2 className="text-2xl font-bold mb-4">Driver Profile</h2>
        {loading ? (
          <p>Loading driver details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : driverDetails ? (
          <div className="p-4 border rounded-lg shadow space-y-4">
            <div className="flex items-center">
              <FaIdBadge className="mr-2 text-blue-500" />
              <p><strong>Driver ID:</strong> {driverDetails.driver_ID}</p>
            </div>
            <div className="flex items-center">
              <FaUserCheck className="mr-2 text-green-500" />
              <p><strong>Status:</strong> {driverDetails.status}</p>
            </div>
            <div className="flex items-center">
              <FaStore className="mr-2 text-yellow-500" />
              <p><strong>Store ID:</strong> {driverDetails.store_ID}</p>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-purple-500" />
              <p><strong>Current Working Time:</strong> {driverDetails.current_working_time} hours</p>
            </div>

            {/* Doughnut Chart for Working Hours */}
            <div className="flex justify-center mt-4">
              <div style={{ width: '250px', height: '250px' }}> {/* Increased size for larger chart */}
                <Doughnut data={progressData} options={{ maintainAspectRatio: false }} />
                <p className="text-center mt-2">
                  {((workingHours / maxWorkingHours) * 100).toFixed(2)}% of maximum working hours used
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Driver details not available.</p>
        )}
      </div>
    </div>
  );
}

export default DriverProfile;
