import React, { useState, useEffect } from "react";

const TestSide = () => {
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [user, setUser] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Menu items array (without DASHBOARD)
  const menuItems = [
    { name: "Reports", icon: "https://via.placeholder.com/24" },
    { name: "Tasks", icon: "https://via.placeholder.com/24" },
    { name: "Calendar", icon: "https://via.placeholder.com/24" },
    { name: "Chat", icon: "https://via.placeholder.com/24" },
    { name: "Access", icon: "https://via.placeholder.com/24" },
    { name: "Profile", icon: "https://via.placeholder.com/24" },
  ];

  const departments = [
    { name: "FRONTEND", icon: "https://via.placeholder.com/24" },
    { name: "FINANCE & ACCOUNTING", icon: "https://via.placeholder.com/24" },
    { name: "SALES", icon: "https://via.placeholder.com/24" },
    { name: "HUMAN RESOURCE", icon: "https://via.placeholder.com/24" },
    { name: "CUSTOMER SERVICE", icon: "https://via.placeholder.com/24" },
    { name: "MARKETING", icon: "https://via.placeholder.com/24" },
    { name: "CAFE (F&B)", icon: "https://via.placeholder.com/24" },
    { name: "IT", icon: "https://via.placeholder.com/24" },
    { name: "MAINTENANCE", icon: "https://via.placeholder.com/24" },
    { name: "LEGAL", icon: "https://via.placeholder.com/24" },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const departmentMapping = {
    TopManagement: [
      "FRONTEND",
      "FINANCE & ACCOUNTING",
      "SALES",
      "HUMAN RESOURCE",
      "CUSTOMER SERVICE",
      "MARKETING",
      "CAFE (F&B)",
      "IT",
      "MAINTENANCE",
      "LEGAL",
    ],
    Tech: ["FRONTEND"],
    Finance: ["FINANCE & ACCOUNTING"],
    Sales: ["SALES"],
    HR: ["HUMAN RESOURCE", "CUSTOMER SERVICE"],
    Marketing: ["MARKETING"],
    Cafe: ["CAFE (F&B)"],
    IT: ["IT"],
    Maintenance: ["MAINTENANCE"],
    Legal: ["LEGAL"],
  };

  // Filter departments based on user's department using departmentMapping
  const filteredDepartments = departments.filter((dept) =>
    (departmentMapping[user?.department] || []).includes(dept.name)
  );

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white text-black flex-shrink-0 h-full sticky top-10 overflow-y-auto transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="text-black p-4 focus:outline-none"
      >
        {isSidebarOpen ? "Close" : "Open"}
      </button>

      {/* Menu items */}
      <div className="mt-5">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center px-4 py-4 hover:bg-gray-600">
            <img src={item.icon} alt={item.name} className="w-6 h-6 mr-3" />
            {isSidebarOpen && <span>{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Department dropdown */}
      <div className="mt-5">
        <button
          onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
          className="flex items-center px-4 py-2 w-full text-white bg-gray-700 hover:bg-gray-600"
        >
          {isSidebarOpen ? (
            <span>Departments</span>
          ) : <span> Dep</span>}
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-4 h-4 ml-2 transform ${
              isDepartmentsOpen ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDepartmentsOpen && (
          <ul>
            {filteredDepartments.map((dept, index) => (
              <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-600">
                <img src={dept.icon} alt={dept.name} className="w-6 h-6 mr-3" />
                {isSidebarOpen && <span>{dept.name}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestSide;
