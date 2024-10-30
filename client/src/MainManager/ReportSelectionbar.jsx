import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionBar = () => {
  const navigate = useNavigate();

  // Navigation handlers for each report
  const goToQuarterlySalesReport = () => navigate('/quarterly-sales');
  const goToItemsWithMostOrders = () => navigate('/most-ordered-items');
  const goToSalesByCityAndRoute = () => navigate('/sales-by-city-route');
  const goToCustomerOrderRoute = () => navigate('/customerorder-route');


  return (
    <div className="flex justify-around bg-gray-100 py-4">
      <button
        className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={goToQuarterlySalesReport}
      >
        Quarterly Sales Report
      </button>
      <button
        className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={goToItemsWithMostOrders}
      >
        Items with Most Orders
      </button>
      <button
        className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={goToSalesByCityAndRoute}
      >
        Sales by City and Route
      </button>
      <button
        className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={goToCustomerOrderRoute}
      >
        Customer and Orders
      </button>
    </div>
  );
};

export default SelectionBar;
