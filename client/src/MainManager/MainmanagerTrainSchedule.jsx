import React, { useEffect, useState } from 'react';
import SidePanel from './MainManagerSidepanel';

function MainmanagerWorker() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:8080/mainmanager/getTrainSchedule', {
          credentials: 'include' // Include credentials in the fetch request
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        setSchedules(data); // Set the fetched data to state
      } catch (err) {
        console.error('Error fetching train schedules:', err);
        setError(err.message); // Set error message if fetching fails
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchSchedules(); // Call the function to fetch schedules
  }, []);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading...</p>; // Show loading message while fetching
  }

  if (error) {
    return <p className="text-center mt-4 text-red-600 font-semibold">Error: {error}</p>; // Show error message if there's an error
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidePanel />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Train Schedule</h1>
        {schedules.length === 0 ? ( // Check if schedules array is empty
          <p className="text-center mt-4 text-gray-500">No schedules available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-300">
                <tr>
                  <th className="border-b border-gray-200 p-4 text-left text-gray-600">Schedule ID</th>
                  <th className="border-b border-gray-200 p-4 text-left text-gray-600">Store ID</th>
                  <th className="border-b border-gray-200 p-4 text-left text-gray-600">Arrival Time</th>
                  <th className="border-b border-gray-200 p-4 text-left text-gray-600">Departure Time</th>
                  <th className="border-b border-gray-200 p-4 text-left text-gray-600">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule.schedule_ID} className="hover:bg-gray-100 transition duration-200">
                    <td className="border-b border-gray-200 p-4 text-gray-700">{schedule.schedule_ID}</td>
                    <td className="border-b border-gray-200 p-4 text-gray-700">{schedule.store_ID}</td>
                    <td className="border-b border-gray-200 p-4 text-gray-700">{schedule.arrival_Time}</td>
                    <td className="border-b border-gray-200 p-4 text-gray-700">{schedule.departure_Time}</td>
                    <td className="border-b border-gray-200 p-4 text-gray-700">{schedule.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainmanagerWorker;
