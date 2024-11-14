import React, { useState } from "react";
import { FaHome, FaUser, FaChartPie, FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      <div className="flex">

      <div
        className={`h-screen relative bg-gray-800 text-white flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        } transition-width duration-300`}
      >
        <nav className="flex-1">
          <ul className="space-y-4 p-4">
            <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
              <FaHome size={20} />
              {!isCollapsed && <span>Home</span>}
            </li>
            <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
              <FaUser size={20} />
              {!isCollapsed && <span>Profile</span>}
            </li>
            <li className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
              <FaChartPie size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </li>
          </ul>
        </nav>
      </div>

      <div className={`flex items-center  justify-between p-4 absolute top-20  ${isCollapsed ? 'left-16' : 'left-60'} transition-all duration-300`}>
        <h1 className={`text-lg font-bold ${isCollapsed ? "hidden" : "block"}`}>
        </h1>
        <button
          onClick={toggleSidebar}
          className="bg-gray-800 text-white focus:outline-none p-1"
        >
          {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
        </button>
      </div>
      </div>

      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-xl font-semibold">Main Content</h2>
        <p className="mt-4">This is the main content area.</p>
      </main>
    </div>
  );
}

export default Sidebar;
