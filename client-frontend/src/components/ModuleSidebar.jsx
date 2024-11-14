import React, { useState, useEffect } from "react";
import {
  FaArrowRightToBracket,
  FaBuildingUser,
  FaCode,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaHandsHelping,
  FaTasks,
} from "react-icons/fa";
import { BsArrowLeftSquare } from "react-icons/bs";
import { TbReportSearch, TbSection } from "react-icons/tb";
import { IoIosChatboxes } from "react-icons/io";
import { SiAuthelia, SiMarketo } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { Toolbar, Tooltip } from "@mui/material";
import {
  MdAccountBalance,
  MdDashboard,
  MdLocalCafe,
  MdOutlineAddBox,
  MdOutlineWifiTethering,
  MdPolicy,
} from "react-icons/md";
import { HiColorSwatch } from "react-icons/hi";
import { RiCustomerService2Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";

const ModuleSidebar = ({ mainSideBar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Menu items array (without DASHBOARD)
  const menuItems = [
    {
      name: "Reports",
      icon: <TbReportSearch />,
      route: "#reports",
    },
    { name: "Tasks", icon: <FaTasks />, route: "#tasks" },
    { name: "Calendar", icon: <FaCalendarAlt />, route: "/calendar" },
    { name: "Chat", icon: <IoIosChatboxes />, route: "/chat" },
    { name: "Access", icon: <SiAuthelia />, route: "/access" },
    { name: "Profile", icon: <CgProfile />, route: "/profile" },
  ];

  const departments = [
    { name: "FRONTEND", icon: <FaCode /> },
    { name: "FINANCE & ACCOUNTING", icon: <MdAccountBalance /> },
    { name: "SALES", icon: <FaMoneyBillTrendUp /> },
    { name: "HUMAN RESOURCE", icon: <FaBuildingUser /> },
    { name: "CUSTOMER SERVICE", icon: <RiCustomerService2Line /> },
    { name: "MARKETING", icon: <SiMarketo /> },
    { name: "CAFE (F&B)", icon: <MdLocalCafe /> },
    { name: "IT", icon: <MdOutlineWifiTethering /> },
    { name: "MAINTENANCE", icon: <FaHandsHelping /> },
    { name: "LEGAL", icon: <MdPolicy /> },
  ];

  const iconMap = {
    FaCode: <FaCode />,
    MdAccountBalance: <MdAccountBalance />,
    FaMoneyBillTrendUp: <FaMoneyBillTrendUp />,
    FaBuildingUser: <FaBuildingUser />,
    RiCustomerService2Line: <RiCustomerService2Line />,
    SiMarketo: <SiMarketo />,
    MdLocalCafe: <MdLocalCafe />,
    MdOutlineWifiTethering: <MdOutlineWifiTethering />,
    FaHandsHelping: <FaHandsHelping />,
    MdPolicy: <MdPolicy />
  };
    // Close sidebar when navigating to any route
    useEffect(() => {
      if( location.pathname === '/frontend'){
        setIsSidebarOpen(true);
      }else{
        setIsSidebarOpen(false)
      } 
    }, [location.pathname]);
  
    const { departmentName } = location.state || {};


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

  const handleActive = (index) => {
    setIsActive(index);
    console.log("Menu clicked");
  };
 


  return (
    <div
      className=''
    >
      <div className={`${
        isSidebarOpen ? "w-60" : "w-20"
      } bg-white text-black flex-shrink-0 h-full sticky top-10 overflow-y-auto transition-all duration-300`}>
        {/*Dashboard */}
        <div className="mt-5 px-3 relative">
          
            <div
              className={`flex ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center py-3 wono-blue wono-blue-text rounded-md `}
            >
              <div className="flex justify-center w-5 text-2xl">
              <CgWebsite />
              </div>
              {isSidebarOpen && <span className="pl-5 font-bold">{departmentName}</span>}
            </div>
            <Tooltip title={isSidebarOpen ? 'Close' : 'Collapse'} placement="right">
            <button
              onClick={toggleSidebar}
              className={`text-black text-[0.8rem] p-2 focus:outline-none text-end absolute top-[0.6rem] ${
                isSidebarOpen ? "left-[11rem]" : "left-[3.2rem]"
              } `}
            >
              {isSidebarOpen ? (
                <FaArrowLeft />
              ) : (
                <FaArrowRightToBracket />
              )}
            </button>
          </Tooltip>

          <Tooltip title={"Themes"} placement="right">
            <div
              onClick={() => {
                navigate("/frontend/themes");
              }}
              className={`flex ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/frontend/themes"
                  ? "wono-blue rounded-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-5 text-2xl">
              <HiColorSwatch />
              </div>
              {isSidebarOpen && <span className="pl-5">Themes</span>}
            </div>
          </Tooltip>


          <Tooltip title={"Themes"} placement="right">
            <div
              onClick={() => {
                navigate("/frontend/updates");
              }}
              className={`flex ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/dashboard"
                  ? "wono-blue rounded-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-5 text-2xl">
              <GrDocumentUpdate />
              </div>
              {isSidebarOpen && <span className="pl-5">Update</span>}
            </div>
          </Tooltip>
          <Tooltip title={"Dashboard"} placement="right">
            <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className={`flex ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/dashboard"
                  ? "wono-blue rounded-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-6 text-2xl">
                <MdDashboard />
              </div>
              {isSidebarOpen && <span className="pl-5">Reports</span>}
            </div>
          </Tooltip>

          {/* {menuItems.map((item, index) => (
          <Tooltip title={item.name} placement="right">
            <div
              key={index}
              onClick={()=>{
               navigate(item.route);
                }}
              className={`cursor-pointer flex ${isSidebarOpen ? 'pl-[1rem]' : 'justify-center'} items-center py-[1rem] hover:wono-blue-dark  hover:rounded-md hover:text-white  ${location.pathname === item.route ? 'wono-blue rounded-md text-[#0DB4EA]' : 'bg-white'} `}
            >
              <div className="flex justify-center w-6 text-[1.3rem]">
                {item.icon}
              </div>
              {isSidebarOpen && <span className="pl-5">{item.name}</span>}
            </div>
          </Tooltip>
        ))} */}
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
