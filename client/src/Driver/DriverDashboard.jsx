import React from 'react';
import SidePanel from './DriverSidePanel';


function DriverDashboard() {
  return (
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* MainmanagerReport on the right */}
      <div className="w-3/4 p-8">
        <p>DriverDashboard</p>
      </div>
    </div>
  );
}

export default DriverDashboard;
