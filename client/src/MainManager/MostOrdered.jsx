import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import SidePanel from './MainManagerSidepanel';
import ReportSelectionbar from "./ReportSelectionbar";

function MostSoldItems() {
  const [mostSoldItems, setMostSoldItems] = useState([]);

  // Darker color palette for the bar chart
  const colors = [
    '#8B0000', '#556B2F', '#2F4F4F', '#8A2BE2', '#483D8B', 
    '#B22222', '#5F9EA0', '#A0522D', '#6A5ACD', '#8B4513'
  ];

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mainmanager/most-sold-items');
        setMostSoldItems(response.data);
      } catch (error) {
        console.error("Error fetching most sold items data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data
  const labels = mostSoldItems.map(item => item.product_Name);
  const dataValues = mostSoldItems.map(item => item.total_quantity);

  // Apply colors to chart (cycling through colors if more items exist)
  const backgroundColors = labels.map((_, index) => colors[index % colors.length]);
  const borderColors = labels.map((_, index) => colors[index % colors.length]);

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Most Sold Items (Quantity)',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        barThickness: 20, // Adjust bar thickness here
      },
    ],
  };

  return (
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* Main manager Report on the right */}
      <div className="w-3/4 p-8">
        <ReportSelectionbar />
        <p className="text-xl font-semibold mb-4">Most Sold Items</p>
        
        {/* Bar Chart */}
        <div className="flex">
          <div className="w-3/4 h-96 mb-8"> {/* Increased height of the chart */}
            {mostSoldItems.length > 0 ? (
              <Bar 
                data={barData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: false, // Disable animation
                  scales: {
                    x: {
                      ticks: {
                        display: false, // Hide product names
                      },
                      grid: {
                        color: 'rgba(0,0,0,0.1)',
                      },
                    },
                    y: {
                      min: 0, // Minimum value on y-axis
                      max: Math.max(...dataValues) + 10, // Set a max value based on data + some buffer
                      ticks: {
                        stepSize: 2, // Set the tick interval to 2
                        color: '#333',
                        font: {
                          size: 12, // Adjust font size for y-axis
                        },
                      },
                      grid: {
                        color: 'rgba(0,0,0,0.1)',
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  layout: {
                    padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    },
                  },
                }} 
              />
            ) : (
              <p className="text-center text-gray-500">Loading Bar Chart...</p>
            )}
          </div>

          {/* Product Color Legend */}
          <div className="w-1/4 pl-4"> {/* Added padding for spacing */}
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Product Color Legend</h4>
            <div className="space-y-2">
              {labels.map((label, index) => (
                <div key={label} className="flex items-center space-x-2">
                  <div style={{
                    backgroundColor: colors[index % colors.length],
                  }} className="w-5 h-5 rounded-full border border-gray-300" />
                  <span className="text-gray-700 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostSoldItems;