import React from 'react';
import SidePanel from './MainManagerSidepanel';

function MainmanagerReport() {
  return (
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* MainmanagerReport on the right */}
      <div className="w-3/4 p-8">
        <p>MainmanagerReport</p>
      </div>
    </div>
  );
}

export default MainmanagerReport;
