import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const WorkingHoursReport = () => {
  const [drivers, setDrivers] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activePage, setActivePage] = useState("Working Hours Report");

  useEffect(() => {
    fetchWorkingHoursReport();
  }, []);

  const fetchWorkingHoursReport = async () => {
    try {
      await fetchWorkingHoursDrivers();
      await fetchWorkingHoursDriverAssistants();
      await fetchUsedHoursTrucks();
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching working hours report:", error);
      setErrorMessage("Error fetching working hours data.");
    }
  };

  const fetchWorkingHoursDrivers = async () => {
    const response = await axios.get(`http://localhost:8080/manager/getdriver`, { withCredentials: true });
    setDrivers(response.data);
  };

  const fetchWorkingHoursDriverAssistants = async () => {
    const response = await axios.get(`http://localhost:8080/manager/getdriverassistant`, { withCredentials: true });
    setAssistants(response.data);
  };

  const fetchUsedHoursTrucks = async () => {
    const response = await axios.get(`http://localhost:8080/manager/gettruck`, { withCredentials: true });
    setTrucks(response.data);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="w-3/4 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-blue-800 mb-8">
            Working Hours Report
          </h1>

          {/* Messages */}
          {errorMessage && <p className="text-red-500 mt-6 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-6 text-center">{successMessage}</p>}

          {/* Display Drivers Table */}
          {drivers.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-xl p-4 w-full max-w-3xl overflow-hidden">
              <h2 className="text-3xl font-semibold text-center mb-6">Working Hours for Drivers</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-center text-sm font-medium">Driver ID</th>
                    <th className="px-4 py-2 text-center text-sm font-medium">Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver, index) => (
                    <tr
                      key={driver.driver_id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-purple-100 transition-colors duration-300`}
                    >
                      <td className="border px-4 py-2 text-center">{driver.driver_ID}</td>
                      <td className="border px-4 py-2 text-center">{driver.current_working_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Display Assistants Table */}
          {assistants.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-xl p-4 w-full max-w-3xl overflow-hidden">
              <h2 className="text-3xl font-semibold text-center mb-6">Working Hours for Assistants</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-center text-sm font-medium">Assistant ID</th>
                    <th className="px-4 py-2 text-center text-sm font-medium">Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {assistants.map((assistant, index) => (
                    <tr
                      key={assistant.assistant_id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-purple-100 transition-colors duration-300`}
                    >
                      <td className="border px-4 py-2 text-center">{assistant.assistant_ID}</td>
                      <td className="border px-4 py-2 text-center">{assistant.current_working_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Display Trucks Table */}
          {trucks.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-xl p-4 w-full max-w-3xl overflow-hidden">
              <h2 className="text-3xl font-semibold text-center mb-6">Used Hours for Trucks</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-center text-sm font-medium">Truck ID</th>
                    <th className="px-4 py-2 text-center text-sm font-medium">Used Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {trucks.map((truck, index) => (
                    <tr
                      key={truck.truck_id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-purple-100 transition-colors duration-300`}
                    >
                      <td className="border px-4 py-2 text-center">{truck.truck_ID}</td>
                      <td className="border px-4 py-2 text-center">{truck.used_hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursReport;
