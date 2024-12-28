import React, { useState } from "react";

const TestDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white flex-shrink-0 h-full sticky top-0 overflow-y-auto transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white p-4 focus:outline-none"
        >
          {isSidebarOpen ? "Close" : "Open"}
        </button>
        <div className="mt-5">
          {isSidebarOpen && (
            <ul>
              <li className="px-4 py-2 hover:bg-gray-600">Dashboard</li>
              <li className="px-4 py-2 hover:bg-gray-600">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-600">Settings</li>
            </ul>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
          <h1 className="text-xl font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis suscipit beatae similique voluptates odit vel modi atque dolore fugiat libero facilis soluta pariatur, repudiandae minus maiores dolores. Accusantium, ullam laborum.</h1>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
