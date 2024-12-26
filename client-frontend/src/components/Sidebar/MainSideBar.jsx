import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaArrowRightToBracket,
    FaBuildingUser,
    FaChevronRight,
    FaCode,
    FaMoneyBillTrendUp,
    FaPlus,
    FaRegMoneyBill1,
  } from "react-icons/fa6";
  import {
    FaArrowLeft,
    FaCalendarAlt,
    FaHandsHelping,
    FaRegCalendarAlt,
    FaTasks,
  } from "react-icons/fa";
  import { TbReportSearch, TbSection } from "react-icons/tb";
  import { IoIosChatboxes } from "react-icons/io";
  import { SiAuthelia, SiMarketo } from "react-icons/si";
  import { CgProfile } from "react-icons/cg";
  import { Toolbar, Tooltip } from "@mui/material";
  import {
    MdAccountBalance,
    MdDashboard,
    MdLocalCafe,
    MdMeetingRoom,
    MdOutlineLocalCafe,
    MdOutlineManageAccounts,
    MdOutlinePayment,
    MdOutlineWifiTethering,
    MdPolicy,
  } from "react-icons/md";
  import {
    HiColorSwatch,
    HiCurrencyDollar,
    HiOutlineChatAlt2,
    HiOutlineClipboardList,
  } from "react-icons/hi";
  import { AiOutlineProduct, AiOutlineSecurityScan } from "react-icons/ai";
  import {
    RiAccountCircleLine,
    RiCustomerService2Line,
    RiDashboardLine,
  } from "react-icons/ri";
  import { BsCashCoin, BsFillPersonCheckFill } from "react-icons/bs";
  import useAuth from "../../hooks/useAuth";
  import { GrDocumentUpdate } from "react-icons/gr";
  import { IoSettingsOutline } from "react-icons/io5";
  
  

const MainSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const departments = [
    {
      name: "Frontend",
      icon: <FaCode />,
      route: "/frontend",
      modules: [
        { title: "Edit Live Theme", route: "/frontend/live-theme", icon: <HiOutlineClipboardList /> },
        { title: "Themes", route: "/frontend/themes", icon: <HiOutlineClipboardList /> },
        { title: "Updates", route: "/frontend/updates", icon: <HiOutlineClipboardList /> },
      ],
    },
    {
      name: "HR",
      icon: <FaBuildingUser />,
      route: "/hr",
      modules: [
        {
          title: "Onboarding",
          route: "/hr/onboarding",
          icon: <HiOutlineClipboardList />,
        },
        {
          title: "Attendance",
          route: "/hr/attendance",
          icon: <HiOutlineClipboardList />,
        },
      ],
    },
    { name: "Finance", icon: <MdAccountBalance />, route: "/finance" },
    { name: "Sales", icon: <BsCashCoin />, route: "/sales" },
    { name: "IT", icon: <MdOutlineWifiTethering />, route: "/it" },
    { name: "Maintainance", icon: <FaHandsHelping />, route: "/maintainance" },
    { name: "Legal", icon: <AiOutlineSecurityScan />, route: "/legal" },
  ];

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <div key={item.route} className="ml-4">
        <Link
          to={item.route}
          className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${
            location.pathname === item.route ? "bg-blue-500 text-white" : ""
          }`}
        >
          {item.icon}
          {!collapsed && <span>{item.title}</span>}
        </Link>
      </div>
    ));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 right-[-10px] bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
        >
          <FaChevronRight
            className={`transform transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sidebar Items */}
        <div className="p-4">
          <div className="mb-4">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${
                location.pathname === "/dashboard"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <HiOutlineClipboardList />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </div>

          {departments.map((department) => (
            <div key={department.route} className="mb-4">
              {/* Department Header */}
              <div
                className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => navigate(department.route)}
              >
                {department.icon}
                {!collapsed && <span>{department.name}</span>}
              </div>

              {/* Render Modules if Available */}
              {department.modules && (
                <div className="ml-4">
                  {renderMenuItems(department.modules)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
