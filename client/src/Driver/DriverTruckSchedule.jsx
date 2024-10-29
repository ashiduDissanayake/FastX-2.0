import React, { useEffect, useState } from 'react';
import SidePanel from './DriverSidePanel';

function DriverProfile() {
  const [truckSchedules, setTruckSchedules] = useState([]);

  useEffect(() => {
    // Fetch truck schedule data from backend
    const fetchTruckSchedules = async () => {
      try {
        const response = await fetch('http://localhost:8080/driver/truck-schedules');
        const data = await response.json();
        setTruckSchedules(data);
      } catch (error) {
        console.error('Error fetching truck schedules:', error);
      }
    };
    fetchTruckSchedules();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* TruckSchedule table on the right */}
      <div className="w-3/4 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Truck Schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-6 py-4 text-left font-semibold uppercase">Schedule ID</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Truck ID</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Driver ID</th>
                <th className="px-6 py-4 text-left font-semibold uppercase">Assistant ID</th>
              </tr>
            </thead>
            <tbody>
              {truckSchedules.map((schedule, index) => (
                <tr
                  key={schedule.schedule_ID}
                  className={`${
                    index % 2 === 0 ? 'bg-blue-100' : 'bg-gray-100'
                  } hover:bg-blue-200 transition duration-200`}
                >
                  <td className="border-t border-blue-200 px-6 py-4 text-blue-900 font-medium">{schedule.schedule_ID}</td>
                  <td className="border-t border-blue-200 px-6 py-4 text-blue-900 font-medium">{schedule.truck_ID}</td>
                  <td className="border-t border-blue-200 px-6 py-4 text-blue-900 font-medium">{schedule.driver_ID}</td>
                  <td className="border-t border-blue-200 px-6 py-4 text-blue-900 font-medium">{schedule.assistant_ID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
