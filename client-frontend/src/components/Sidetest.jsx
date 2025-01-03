import React, { useState, useEffect } from "react";
import {
  FaArrowRightToBracket,
  FaBuildingUser,
  FaCode,
  FaMoneyBillTrendUp,
  FaPlus,
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
  MdOutlineWifiTethering,
  MdPolicy,
} from "react-icons/md";
import { HiOutlineChatAlt2, HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineProduct, AiOutlineSecurityScan } from "react-icons/ai";
import { RiCustomerService2Line, RiDashboardLine } from "react-icons/ri";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
// import { useSidebar } from "./GlobalContext";

const TestSide = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);

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
    // { name: "Profile", icon: <CgProfile />, route: "/profile" },
  ];

  const defaultModules = [
    {
      id: 1,
      title: "Meetings",
      route: "/meetings",
      icon: <MdMeetingRoom />,
      submenus: [
        {
          id: 1,
          title: "Calendar",
          icon: <FaRegCalendarAlt />,
          route: "/meetings/booking",
        },
        {
          id: 2,
          title: "Add New Room",
          icon: <FaPlus />,
          route: "/meetings/add-room",
        },
        {
          id: 3,
          title: "Reports",
          icon: <TbReportSearch />,
          route: "/meetings/reports",
        },
      ],
    },
    {
      id: 2,
      title: "Tickets",
      route: "/tickets",
      icon: <HiOutlineClipboardList />,
      submenus: [
        // {
        //   id: 1,
        //   title: "My Tickets",
        //   icon: <MdOutlineLocalCafe />,
        //   route: "/tickets/my-tickets",
        // },
        {
          id: 2,
          title: "View Tickets",
          icon: <MdOutlineLocalCafe />,
          route: "/tickets/view-tickets",
        },
        // {
        //   id: 3,
        //   title: "Members",
        //   icon: <MdOutlineManageAccounts />,
        //   route: "/tickets/members",
        // },
        {
          id: 4,
          title: "Ticket Reports",
          icon: <HiOutlineClipboardList />,
          route: "/tickets/ticket-reports",
        },
        // {
        //   id: 5,
        //   title: "All Ticket",
        //   icon: <HiOutlineClipboardList />,
        //   route: "/tickets/all-tickets",
        // },
      ],
    },
    {
      id: 3,
      title: "Assets",
      route: "/assets",
      icon: <AiOutlineProduct />,
      submenus: [
        {
          id: 1,
          title: "Manage Assets",
          icon: <MdOutlineManageAccounts />,
          route: "/assets/manage",
        },
        // {
        //   id: 2,
        //   title: "My Assets",
        //   icon: <MdOutlineLocalCafe />,
        //   route: "/assets/my-assets",
        // },
        {
          id: 3,
          title: "Reports",
          icon: <TbReportSearch />,
          route: "/assets/reports",
        },
      ],
    },
  ];

  const handleMenuOpen = (item) => {
    console.log(isSidebarOpen);
    navigate(item.route);
  };

  const handleMenuToggle = (menuId) => {
    // Toggle the menu: expand it if closed, collapse it if open
    setExpandedMenu((prev) => (prev === menuId ? null : menuId));
  };

  // Close sidebar when navigating to any route
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/profile") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/reports") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/access") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/calendar") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/chat") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/assets") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/tickets") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/meetings") {
      setIsSidebarOpen(true);
    } else {
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
      "HUMAN RESOURCE",
      "FINANCE",
      "SALES",
      "MAINTENANCE",
      "LEGAL",
      "IT",
    ],
    Tech: ["FRONTEND", "CMS", "HUMAN RESOURCE"],
    Finance: ["FINANCE", "CMS"],
    Sales: ["SALES"],
    HR: ["HUMAN RESOURCE", "CMS"],
    CMS: ["CMS"],
    Marketing: ["MARKETING"],
    Cafe: ["CAFE (F&B)"],
    IT: ["IT", "HUMAN RESOURCE", "FINANCE"],
    Maintainance: ["CMS"],
    Legal: ["LEGAL"],
  };

  // Filter departments based on user's department using departmentMapping
  const filteredDepartments = departments.filter((dept) =>
    (
      departmentMapping[authUser?.user.department.map((dept) => dept.name)] ||
      []
    ).includes(dept.name)
  );

  const handleActive = (index) => {
    setIsActive(index);
  };

  return (
    <div
      className={` ${
        isSidebarOpen ? "w-60" : "w-20"
      } bg-white  border-gray-300 text-black flex flex-shrink-0 h-[90vh] overflow-y-auto transition-all duration-300 z-[1]`}>
      <div className="flex relative w-full">
        {/*Dashboard */}
        <div className="mt-5 px-3 flex flex-col gapy-4 w-full">
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
              }`}>
              <div className="flex justify-center w-6 text-2xl">
                <RiDashboardLine />
              </div>
              {isSidebarOpen && <span className="pl-5">Dashboard</span>}
            </div>
          </Tooltip>

          {/* Department dropdown */}

          <div>
            {filteredDepartments.length === 1 ? (
              // If there's only one department, show it directly
              <div
                className={`flex items-center border-b-[1px] py-3 gap-3 hover:wono-blue-dark pl-[1rem] hover:text-white hover:rounded-md cursor-pointer`}
                onClick={() => {
                  handleActive(0);
                  navigate(filteredDepartments[0].route, {
                    state: { departmentName: filteredDepartments[0].name },
                  });
                }}>
                <div className="flex justify-center w-6 text-[1.3rem]">
                  {filteredDepartments[0].icon}
                </div>
                {isSidebarOpen && (
                  <span className="pl-5 text-[0.8rem]">
                    {filteredDepartments[0].name}
                  </span>
                )}
              </div>
            ) : (
              // If there are multiple departments, show the dropdown
              <>
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
                  }`}>
                  {isSidebarOpen ? (
                    <div className="flex items-center justify-center">
                      <div className="flex justify-center w-6 text-2xl">
                        <TbSection />
                      </div>
                      <span className="pl-5">Departments</span>
                    </div>
                  ) : (
                    <span>
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
                      }`}>
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
                    className={`cursor-pointer ${
                      isSidebarOpen ? "px-3" : "px-0"
                    }`}>
                    {filteredDepartments.map((dept, index) => (
                      <Tooltip title={dept.name} placement="right" key={index}>
                        <div
                          onClick={() => {
                            handleActive(index);
                            navigate(dept.route, {
                              state: { departmentName: dept.name },
                            });
                          }}
                          className={`flex items-center border-b-[1px] py-3 gap-3 hover:wono-blue-dark pl-[1rem] hover:text-white hover:rounded-md`}>
                          <div className="flex justify-center w-6 text-[1.3rem]">
                            {dept.icon}
                          </div>
                          {isSidebarOpen && (
                            <span className="pl-5 text-[0.8rem]">
                              {dept.name}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                    ))}
                  </ul>
                )}
              </>
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
                } `}>
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

          <div>
            {defaultModules.map((module, moduleIndex) => (
              <div key={module.id} className="justify-between hereItis">
                {/* If there's only one submenu, show it directly */}
                {module.submenus.length === 1 ? (
                  <div
                    className={`flex items-center border-b-[1px] py-3 gap-3 hover:wono-blue-dark pl-[1rem] hover:text-white hover:rounded-md cursor-pointer`}
                    onClick={() => navigate(module.submenus[0].route)}>
                    <div className="flex justify-center w-6 text-[1.3rem]">
                      {module.icon || <TbSection />} {/* Icon placeholder */}
                    </div>
                    {isSidebarOpen && (
                      <span className="pl-5 text-[0.8rem]">
                        {module.submenus[0].title}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setExpandedMenu((prev) =>
                          prev === moduleIndex ? null : moduleIndex
                        ); 
                        setIsSidebarOpen(true);
                      }}
                      className={`flex justify-between items-center border-b-[1px] px-4 py-3 w-full text-black bg-white hover:wono-blue-dark hover:rounded-md hover:text-white ${
                        location.pathname === module.route
                          ? "wono-blue rounded-md wono-blue-text"
                          : "bg-white"
                      }`}>
                      {isSidebarOpen ? (
                        <div
                          onClick={() => navigate(module.route)}
                          className="flex items-center justify-center"
                        >
                          <div className="flex justify-center w-full text-xl">
                            {module.icon || <TbSection />}
                          </div>
                          <span className="pl-5">{module.title}</span>
                        </div>
                      ) : (
                        <div className="flex justify-center w-6">
                        {module.icon || <TbSection />}
                      </div>
                      )}
                      {isSidebarOpen ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className={`w-4 h-4 ml-3 transform ${
                            expandedMenu === moduleIndex ? "rotate-180" : ""
                          }`}>
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

                    {expandedMenu === moduleIndex && (
                      <ul
                        className={`cursor-pointer ${
                          isSidebarOpen ? "px-3" : "px-0"
                        }`}>
                        {module.submenus.map((submenu, index) => (
                          <li
                            key={index}
                            onClick={() => navigate(submenu.route)}
                            className={`flex items-center border-b-[1px] py-3 gap-3 hover:wono-blue-dark pl-[1rem] hover:text-white hover:rounded-md cursor-pointer`}
                          >
                            <div className="flex justify-center w-6 text-sm">
                              {submenu.icon || <TbSection />}{" "}
                              {/* Icon placeholder */}
                            </div>
                            {isSidebarOpen && (
                              <span className="pl-5 text-[0.8rem]">
                                {submenu.title}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <Tooltip title={"Profile"} placement="right">
            <div
              onClick={() => {
                navigate("/profile");
              }}
              className={`flex border-b-[1px] ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/profile"
                  ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                  : "bg-white"
              }`}>
              <div className="flex justify-center w-6 text-2xl">
                <CgProfile />
              </div>
              {isSidebarOpen && <span className="pl-5">Profile</span>}
            </div>
          </Tooltip>
        </div>

        <div
          onClick={toggleSidebar}
          className={`flex ${
            isSidebarOpen ? "justify-end" : "justify-center "
          } items-center  bg-white text-black cursor-pointer fixed top-[6.8rem] ${
            isSidebarOpen ? "left-[14.3rem]" : "left-[4rem]"
          } transition-all duration-300 rounded-md`}>
          <button
            onClick={toggleSidebar}
            className="text-black text-[0.8rem] p-2 focus:outline-none text-end">
            {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRightToBracket />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSide;
