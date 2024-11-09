import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [user, setUser] = useState('');

  // Menu items array (without DASHBOARD)
  const menuItems = [
    { name: "REPORTS", icon: "https://via.placeholder.com/24" },
    { name: "TASKS", icon: "https://via.placeholder.com/24" },
    { name: "CALENDAR", icon: "https://via.placeholder.com/24" },
    { name: "CHAT", icon: "https://via.placeholder.com/24" },
    { name: "ACCESS", icon: "https://via.placeholder.com/24" },
    { name: "PROFILE", icon: "https://via.placeholder.com/24" },
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
      className={`flex flex-col bg-white text-black ${
        isCollapsed ? "w-20" : "w-64"
      } transition-width duration-300 `}
    >
      {/* Collapse button */}
      <div className="sticky top-20">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-4 flex items-center justify-center focus:outline-none hover:bg-gray-700"
        >
          <motion.div
            className="" // Push arrow to the far right
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            ➤
          </motion.div>
        </button>

        {/* Menu items */}
        <nav className="flex flex-col  mt-3">
          {/* Hardcoded DASHBOARD menu item */}
          <Link
            to="/dashboard"
            className="p-4 hover:bg-gray-700 hover:text-white text-sm"
          >
            {isCollapsed && (
              <img
                src="https://via.placeholder.com/24"
                alt="dashboard"
                className="mr-2 inline-block"
              />
            )}
            <span className={isCollapsed ? "hidden" : ""}>DASHBOARD</span>
          </Link>
          {/* Departments Dropdown */}
          {!isCollapsed && (
            <div className="relative">
              <button
                onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                className="p-4 w-full text-left hover:bg-gray-700 hover:text-white flex justify-between items-center"
              >
                <span>DEPARTMENTS</span>
                <motion.div
                  animate={{ rotate: isDepartmentsOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ➤
                </motion.div>
              </button>

              {/* Dropdown content */}
              <div
                className={`${
                  isDepartmentsOpen ? "max-h-screen" : "max-h-0"
                } overflow-hidden transition-all duration-300 ease-in-out bg-white pl-8 space-y-2`}
              >
                {filteredDepartments.map((dept, index) => (
                  <a
                    key={index}
                    href={`#${dept.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center p-4 hover:bg-gray-700 hover:text-white"
                  >
                    <img
                      src={dept.icon}
                      alt={`${dept.name} icon`}
                      className="mr-3"
                    />
                    <span>{dept.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          {/* Other Menu items */}
          {menuItems
            .filter(
              (item) => !(item.name === "ACCESS" && user.role === "Employee")
            ) // Filter out 'ACCESS' for employee role
            .map((item, index) => (
              <a
                key={index}
                href={`#${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="p-4 hover:bg-gray-700 hover:text-white text-sm border-b-[1px] border-black"
              >
                {isCollapsed && (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="mr-2 inline-block"
                  />
                )}
                <span className={`${isCollapsed ? "hidden" : ""}`}>
                  {item.name}
                </span>
              </a>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
