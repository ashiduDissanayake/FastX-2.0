import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalSidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Stores</h2>
        <div className="flex flex-1 justify-around">
          <Link to="/store1" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Colombo
          </Link>
          <Link to="/store2" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Negombo
          </Link>
          <Link to="/store3" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Galle
          </Link>
          <Link to="/store4" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Matara
          </Link>
          <Link to="/store5" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Jaffna
          </Link>
          <Link to="/store6" className="hover:bg-gray-700 py-2 px-4 rounded transition duration-300">
            Trinco
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSidebar;
