import React from 'react';
import SidePanel from './MainManagerSidepanel';
import StoreSidebar from './StoreSidebar'

function MainmanagerCustomer() {
  return (
    <div className="flex">
      {/* SidePanel on the left */}
      <div className="w-1/4">
        <SidePanel />
      </div>

      {/* MainmanagerReport on the right */}
      <div className="w-3/4 p-8">
        <StoreSidebar/>
        <p>Hi</p>
      </div>
    </div>
  );
}

export default MainmanagerCustomer;
