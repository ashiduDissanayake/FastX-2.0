import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SidePanel from './MainManagerSidepanel';
import ReportSelectionbar from "./ReportSelectionbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MostSoldItems() {
  const [selectedStore, setSelectedStore] = useState("1"); // Default to Store 1
  const [dateRange, setDateRange] = useState(7); // Default to 1 Week
  const [chartData, setChartData] = useState(null);
  
  const reportRef = useRef(null); // Reference to the report container

  // Dark color palette for bars
  const colors = [
    '#3B3B98', '#40407A', '#2C2C54', '#706FD3', '#474787',
    '#5758BB', '#4B6587', '#2C3A47', '#6D214F', '#182C61'
  ];

  // Fetch product data whenever the store or date range changes
  useEffect(() => {
    if (selectedStore) {
      axios.get("http://localhost:8080/mainmanager/products/most-sold", {
          params: { storeId: selectedStore, daysRange: dateRange },
          withCredentials: true, // Enable credentials
        })
        .then((response) => {
          const data = response.data[0];
          setChartData({
            labels: data.map((item) => item.Product),
            datasets: [
              {
                label: "Quantity Sold",
                data: data.map((item) => item.Quantity_Sold),
                backgroundColor: colors.slice(0, data.length),
                borderColor: colors.slice(0, data.length),
                borderWidth: 1,
              },
            ],
          });
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [selectedStore, dateRange]);

  // Function to download the report as PDF
  const downloadPDF = () => {
    html2canvas(reportRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Most_Sold_Items_Report.pdf");
    });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* SidePanel on the left */}
      <div className="w-1/5">
        <SidePanel />
      </div>

      {/* Main Content on the right */}
      <div className="w-4/5 p-6" ref={reportRef}>
        <ReportSelectionbar />
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Most Sold Items</h2>
        
        {/* Store and Date Range Selection */}
        <div className="flex items-center mb-6 space-x-4 bg-white p-4 rounded-lg shadow-md">
          <label className="text-gray-600 font-semibold">Select Store:</label>
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-md px-4 py-2 shadow-md hover:from-teal-500 hover:to-green-400 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out"
          >
            {[1, 2, 3, 4, 5, 6].map((storeNumber) => (
              <option key={storeNumber} value={storeNumber}>
                Store {storeNumber}
              </option>
            ))}
          </select>

          <label className="text-gray-600 font-semibold">Select Date Range:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(parseInt(e.target.value))}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-md px-4 py-2 shadow-md hover:from-teal-500 hover:to-green-400 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out"
          >
            <option value={1}>1 Day</option>
            <option value={7}>1 Week</option>
            <option value={30}>1 Month</option>
          </select>
        </div>

        {/* Chart and Legend Container */}
        <div className="flex">
          {/* Bar Chart for Most Sold Products */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    title: {
                      display: true,
                      text: "Most Sold Products",
                      color: '#2D3748',
                      font: { size: 20, weight: 'bold' },
                    },
                    tooltip: {
                      backgroundColor: "rgba(45, 55, 72, 0.8)",
                      titleFont: { size: 14, weight: 'bold', color: '#E2E8F0' },
                      bodyFont: { size: 12, color: '#CBD5E0' },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Quantity Sold",
                        color: '#4A5568',
                        font: { size: 16 },
                      },
                      ticks: { color: '#4A5568' },
                    },
                    x: {
                      ticks: { display: false }, // Hide product names on x-axis
                      title: {
                        display: false,
                      },
                    },
                  },
                }}
                className="w-full h-80"
              />
            ) : (
              <p className="text-center text-gray-500">Loading Bar Chart...</p>
            )}
          </div>

          {/* Product Color Legend */}
          <div className="w-2/5 pl-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Color Legend</h3>
              <div className="space-y-2">
                {chartData &&
                  chartData.labels.map((label, index) => (
                    <div key={label} className="flex items-center space-x-2">
                      <div
                        style={{ backgroundColor: colors[index % colors.length] }}
                        className="w-6 h-6 rounded-full border border-gray-300"
                      />
                      <span className="text-gray-700 font-medium">{label}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={downloadPDF}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out"
        >
          Download Report as PDF
        </button>
      </div>
    </div>
  );
}

export default MostSoldItems;
