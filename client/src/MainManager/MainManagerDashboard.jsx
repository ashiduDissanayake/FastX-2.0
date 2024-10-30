import React, { useEffect, useState } from "react";
import SidePanel from "./MainManagerSidepanel";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { FaClipboardList, FaStore } from "react-icons/fa";
import { Bar } from "react-chartjs-2";

function MainmanagerDashboard() {
  const [totalOrders, setTotalOrders] = useState(50); // Default total orders for demo
  const [shippedOrders, setShippedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [date, setDate] = useState(new Date());
  const [productData, setProductData] = useState([]); // Data for the bar chart

  useEffect(() => {
    // Fetch order-related data
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/mainmanager/mainmanager-dashboard-data",
          { withCredentials: true }
        );
        const data = response.data;
        if (data) {
          setTotalOrders(data.totalOrders || 50); // Default to 50 if undefined
          setShippedOrders(data.shippedOrders);
          setPendingOrders(data.pendingOrders);
        } else {
          console.warn("Unexpected data format for order data:", data);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    // Fetch trending products data for bar chart
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/mainmanager/mainmanager-tredingproducts",
          { withCredentials: true }
        );
        setProductData(response.data); // Expected format: [{ product_ID, purchase_window_count }]
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchOrderData();
    fetchProductData();
  }, []);

  // Calculate shipped/pending orders progress
  const shippedPendingProgress =
    pendingOrders > 0
      ? (shippedOrders / (shippedOrders + pendingOrders)) * 100
      : 0;

  return (
    <div className="flex min-h-screen bg-white">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* Main manager report on the right */}
      <div className="flex-1 p-0 flex">
        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="bg-white p-5 text-center rounded-lg mb-6">
            <h1 className="text-4xl font-bold text-[#42307D]">
              Main Manager Dashboard
            </h1>
          </div>
          {/* Progress Circles Section */}
          <section className="flex justify-around gap-6 mb-8">
            {/* Total Orders Progress Card */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center w-1/3">
              <h3 className="text-lg font-semibold mb-4 text-[#42307D]">
                Total Orders
              </h3>
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={(totalOrders / 50) * 100} // Show progress out of fixed 50
                  text={`${totalOrders}/50`}
                  styles={buildStyles({
                    pathColor: "#7F56D9",
                    textColor: "#42307D",
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
            </div>

            {/* Shipped Orders / Pending Orders Progress Card */}
            <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center w-1/3">
              <h3 className="text-lg font-semibold mb-4 text-[#42307D]">
                Shipped / Pending Orders
              </h3>
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={shippedPendingProgress}
                  text={`${shippedOrders}/${pendingOrders}`}
                  styles={buildStyles({
                    pathColor: "#7F56D9",
                    textColor: "#42307D",
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
            </div>
          </section>
          {/* Bar Chart Section */}
          <section className="bg-white shadow-lg p-6 rounded-lg mt-6">
  <h3 className="text-lg font-semibold text-[#42307D] ml-10 mb-4">
    Top Products - Purchase Count
  </h3>
  <div className="flex justify-center">
    <div style={{ height: "250px", width: "90%" }}> {/* Centering with a flexible width */}
    <Bar
  data={{
    labels: productData.map((product) => `Product ${product.product_ID}`),
    datasets: [
      {
        // You can keep or remove the label here; it won't matter since the legend will be hidden.
        label: "", // You can leave it or remove this line
        data: productData.map((product) => product.purchase_window_count),
        backgroundColor: productData.map((_, index) => 
          `rgba(${75 + index * 30}, ${192 - index * 30}, 192, 0.6)`),
        borderColor: productData.map((_, index) => 
          `rgba(${75 + index * 30}, ${192 - index * 30}, 192, 1)`),
        borderWidth: 1,
        barThickness: 20, // Set the thickness of the bars
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to take full height of the container
    animation: false,
    scales: {
      x: {
        title: { display: false }, // Disable x-axis title
        ticks: {
          display: true, // Show x-axis labels
        },
        grid: {
          display: false, // Hide grid lines if needed
        },
        categoryPercentage: 0.8, // Adjust to create space between the bars
        barPercentage: 0.9, // Adjust the width of the bars relative to the available space
      },
      y: {
        title: { display: true, text: "Count" },
        beginAtZero: true,
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend completely
      },
    },
  }}
/>


    </div>
  </div>
</section>


        </main>

        {/* Right Column - Calendar and Highlights */}
        <aside className="w-1/4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mt-4 mb-6 text-[#42307D]">
            Your Timeline
          </h2>
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg shadow-md mb-6"
          />

          {/* Daily Highlights */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#42307D] mb-4">
              Daily Highlights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-[#FFF0F6] rounded-lg shadow">
                <div className="text-[#F06595] text-2xl mr-3">
                  <FaClipboardList />
                </div>
                <div>
                  <h4 className="font-bold">4 Pending Reports</h4>
                  <p className="text-sm text-gray-600">
                    Review performance data
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-[#EBFBF0] rounded-lg shadow">
                <div className="text-[#32D583] text-2xl mr-3">
                  <FaStore />
                </div>
                <div>
                  <h4 className="font-bold">New Stock Arrival</h4>
                  <p className="text-sm text-gray-600">
                    Check inventory for updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MainmanagerDashboard;
