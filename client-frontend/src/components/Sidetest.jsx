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
  MdOutlineLocalCafe,
  MdOutlineWifiTethering,
  MdPolicy,
} from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { RiCustomerService2Line, RiDashboardLine } from "react-icons/ri";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
// import { useSidebar } from "./GlobalContext";

const TestSide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsDepartmentsOpen(false);
  };

  // Menu items array (without DASHBOARD)
  const menuItems = [
    {
      name: "Reports",
      icon: <TbReportSearch />,
      route: "/reports",
    },
    { name: "Tasks", icon: <FaTasks />, route: "/tasks" },
    { name: "Calendar", icon: <FaRegCalendarAlt />, route: "/calendar" },
    { name: "Chat", icon: <HiOutlineChatAlt2 />, route: "/chat" },
    { name: "Access", icon: <SiAuthelia />, route: "/access" },
    { name: "Profile", icon: <CgProfile />, route: "/profile" },
  ];

  const handleMenuOpen = (item) => {
   
    console.log(isSidebarOpen);
    navigate(item.route);
  };

  // Close sidebar when navigating to any route
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/profile") {
      setIsSidebarOpen(true);
    }else if (location.pathname === "/reports") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/access") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/calendar") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/chat") {
      setIsSidebarOpen(true);
    }
    else {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const departments = [
    {
      name: "FRONTEND",
      icon: <FaCode />,
      iconName: "FaCode",
      route: "/frontend",
    },
    {
      name: "FINANCE",
      icon: <MdAccountBalance />,
      iconName: "MdAccountBalance",
      route: "/finance",
    },
    {
      name: "SALES",
      icon: <BsCashCoin />,
      iconName: "FaMoneyBillTrendUp",
      route: "/sales",
    },
    {
      name: "HUMAN RESOURCE",
      icon: <FaBuildingUser />,
      iconName: "FaBuildingUser",
      route: "/hr",
    },
    {
      name: "CMS",
      icon: <RiCustomerService2Line />,
      iconName: "RiCustomerService2Line",
      route: "/customer",
    },
    {
      name: "MARKETING",
      icon: <SiMarketo />,
      iconName: "SiMarketo",
      route: "/marketing",
    },
    {
      name: "CAFE (F&B)",
      icon: <MdOutlineLocalCafe />,
      iconName: "MdLocalCafe",
      route: "/cafe",
    },
    {
      name: "IT",
      icon: <MdOutlineWifiTethering />,
      iconName: "MdOutlineWifiTethering",
      route: "/it",
    },
    {
      name: "MAINTENANCE",
      icon: <FaHandsHelping />,
      iconName: "FaHandsHelping",
      route: "/maintainance",
    },
    {
      name: "LEGAL",
      icon: <AiOutlineSecurityScan />,
      iconName: "MdPolicy",
      route: "/legal",
    },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const { department } = useParams();

  const departmentMapping = {
    TopManagement: [
      "FRONTEND",
      "FINANCE",
      "SALES",
      "HUMAN RESOURCE",
      "CMS",
      "MARKETING",
      "CAFE (F&B)",
      "IT",
      "MAINTENANCE",
      "LEGAL",
    ],
    Tech: ["FRONTEND"],
    Finance: ["FINANCE", "CMS"],
    Sales: ["SALES"],
    HR: ["HUMAN RESOURCE", "CMS"],
    CMS: ["CMS"],
    Marketing: ["MARKETING"],
    Cafe: ["CAFE (F&B)"],
    IT: ["IT", "CMS"],
    Maintainance: ["CMS"],
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
      className={` ${
        isSidebarOpen ? "w-60" : "w-20"
      } bg-white  border-gray-300 text-black flex-shrink-0  overflow-y-auto transition-all duration-300 z-[1]`}
    >
      <div className="flex relative w-full">
        {/*Dashboard */}
        <div className="mt-5 px-3 flex flex-col gap-2">
          <Tooltip title={"Dashboard"} placement="right">
            <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className={`flex border-b-[1px] ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/dashboard"
                  ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-6 text-2xl">
                <RiDashboardLine />
              </div>
              {isSidebarOpen && <span className="pl-5">Dashboard</span>}
            </div>
          </Tooltip>

          {/* Department dropdown */}

          <div>
            <button
              onClick={() => {
                setIsDepartmentsOpen(!isDepartmentsOpen);
                setIsSidebarOpen(true);
                handleActive(-2);
              }}
              className={`flex items-center border-b-[1px] px-4 py-3 w-full text-black bg-white hover:wono-blue-dark hover:rounded-md hover:text-white ${
                location.pathname === "/:department"
                  ? "wono-blue rounded-md wono-blue-text"
                  : "bg-white"
              }`}
            >
              {isSidebarOpen ? (
                <div className="flex items-center justify-center">
                  <div className="flex justify-center w-6 text-2xl">
                    <TbSection />
                  </div>
                  <span className="pl-5 ">Departments</span>
                </div>
              ) : (
                <span>
                  {" "}
                  <TbSection />
                </span>
              )}
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-4 h-4 ml-3 transform ${
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
              ) : (
                ""
              )}
            </button>

            {isDepartmentsOpen && (
              <ul
                className={`cursor-pointer ${isSidebarOpen ? "px-3" : "px-0"}`}
              >
                {filteredDepartments.map((dept, index) => (
                  <Tooltip title={dept.name} placement="right">
                    <div
                      key={index}
                      onClick={() => {
                        handleActive(index);
                        navigate(dept.route, {
                          state: { departmentName: dept.name },
                        });
                      }}
                      className={`flex items-center border-b-[1px] py-3 gap-3 hover:wono-blue-dark pl-[1rem] hover:text-white  hover:rounded-md `}
                    >
                      {/* <img src={item.icon} alt={item.name} className="w-6 h-6 mr-3" /> */}
                      <div className="flex justify-center w-6 text-[1.3rem]">
                        {dept.icon}
                      </div>
                      {isSidebarOpen && (
                        <span className="pl-5 text-[0.8rem]">{dept.name}</span>
                      )}
                    </div>
                  </Tooltip>
                ))}
              </ul>
            )}
          </div>

          {menuItems.map((item, index) => (
            <Tooltip title={item.name} placement="right">
              <div
                key={index}
                onClick={() => handleMenuOpen(item)}
                className={`cursor-pointer flex ${
                  isSidebarOpen ? "pl-[1rem]" : "justify-center"
                } items-center border-b-[1px] py-3 hover:wono-blue-dark  hover:rounded-md hover:text-white  ${
                  location.pathname === item.route
                    ? "wono-blue border-r-4 border-b-[0px]  border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                    : "bg-white"
                } `}
              >
                {/* <img src={item.icon} alt={item.name} className="w-6 h-6 mr-3" /> */}
                <div className="flex justify-center w-6 text-[1.3rem]">
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <span className="pl-5 text-black">{item.name}</span>
                )}
              </div>
            </Tooltip>
          ))}
        </div>

        <div
          onClick={toggleSidebar}
          className={`flex ${
            isSidebarOpen ? "justify-end" : "justify-center "
          } items-center  bg-white text-black cursor-pointer fixed top-[6.8rem] ${
            isSidebarOpen ? "left-[14.3rem]" : "left-[4rem]"
          } transition-all duration-300 rounded-md`}
        >
          <button
            onClick={toggleSidebar}
            className="text-black text-[0.8rem] p-2 focus:outline-none text-end"
          >
            {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRightToBracket />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSide;
