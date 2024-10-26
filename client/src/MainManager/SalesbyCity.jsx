import React from 'react';
import SidePanel from './MainManagerSidepanel';
import ReportSelectionbar from "./ReportSelectionbar";

function SalesbyCity() {
  return (
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/5">
        <SidePanel />
      </div>

      {/* Main Content on the right */}
      <div className="w-4/5 p-4">
        <ReportSelectionbar />
        <p className="text-lg font-semibold mt-4">Sales by City</p>
        {/* Content related to sales by city can be added here */}
      </div>
    </div>
  );
}

export default SalesbyCity;
