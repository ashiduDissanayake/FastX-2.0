import React, { useEffect, useState } from 'react';
import SidePanel from './MainManagerSidepanel';
import ReportSelectionbar from "./ReportSelectionbar";
import { Pie } from 'react-chartjs-2';
import { FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function Quarterly() {
  const [revenuePast3Months, setRevenuePast3Months] = useState(0);
  const [revenuePrev3Months, setRevenuePrev3Months] = useState(0);
  const [topSoldItems, setTopSoldItems] = useState([]);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await fetch('http://localhost:8080/mainmanager/sales-data');
        const data = await response.json();

        setRevenuePast3Months(data.revenue_past_3_months);
        setRevenuePrev3Months(data.revenue_prev_3_months);
        setTopSoldItems(data.top_sold_items.slice(0, 10));
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchSalesData();
  }, []);

  const revenueChange = revenuePast3Months - revenuePrev3Months;
  const isIncrease = revenueChange >= 0;

  const pieChartData = {
    labels: topSoldItems.map(item => item.product_Name),
    datasets: [
      {
        data: topSoldItems.map(item => item.total_quantity),
        backgroundColor: [
          '#4B0082', '#8A2BE2', '#DA70D6', '#FF69B4', '#FF4500',
          '#FF6347', '#FFD700', '#ADFF2F', '#7FFF00', '#32CD32'
        ],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex">
      <div className="w-1/5">
        <SidePanel />
      </div>
      <div className="w-4/5 p-4">
        <ReportSelectionbar />
        
        <div className="p-4 bg-white min-h-screen font-sans text-gray-800 flex flex-col space-y-4">
          <div className="bg-gray-100 p-4 rounded-xl shadow-lg flex justify-between items-center transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-500 flex items-center">
              <FaChartLine className="mr-2" /> Revenue Comparison
            </h2>
            <div className="text-lg flex space-x-4">
              <div className="bg-green-100 p-2 rounded-lg shadow">
                <p className="text-gray-500">Past 3 Months:</p>
                <span className="font-bold text-blue-600">${revenuePast3Months.toLocaleString()}</span>
              </div>
              <div className="bg-green-100 p-2 rounded-lg shadow">
                <p className="text-gray-500">Previous 3 Months:</p>
                <span className="font-bold text-blue-600">${revenuePrev3Months.toLocaleString()}</span>
              </div>
            </div>
            <div className={`text-2xl font-semibold flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
              {isIncrease ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
              <span>{isIncrease ? '+' : ''}${Math.abs(revenueChange).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl shadow-lg flex items-center justify-between transition-shadow hover:shadow-xl">
            <div className="w-1/2" style={{ height: '400px' }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="w-1/2 ml-4">
              <h2 className="text-xl font-semibold mb-4 text-green-500">Top Sold Items</h2>
              <ul className="space-y-2">
                {topSoldItems.map((item, index) => (
                  <li key={item.product_Name} className="flex items-center">
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-gray-700">{item.product_Name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quarterly;
