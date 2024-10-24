import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalSidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Stores</h2>
        <div className="flex flex-1 justify-around">
          <Link to="/store1" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Store 1
          </Link>
          <Link to="/store2" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Store 2
          </Link>
          <Link to="/store3" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Store 3
          </Link>
          <Link to="/store4" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Store 4
          </Link>
          <Link to="/store5" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Store 5
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSidebar;
