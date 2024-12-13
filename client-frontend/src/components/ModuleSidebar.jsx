import React, { useState, useEffect } from "react";
import {
  FaArrowRightToBracket,
  FaBuildingUser,
  FaCode,
  FaMoneyBillTrendUp,
  FaPlus,
  FaRegUser,
} from "react-icons/fa6";
import {
  FaArrowLeft,
  FaRegCalendarAlt,
  FaHandsHelping,
  FaTasks,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

import { MdMeetingRoom, MdTask } from "react-icons/md";
import { TbReportSearch, TbSection } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { SiMarketo } from "react-icons/si";
import { Tooltip } from "@mui/material";
import {
  MdAccountBalance,
  MdLocalCafe,
  MdOutlineLocalCafe,
  MdOutlineViewModule,
  MdOutlineWifiTethering,
  MdPolicy,
  MdOutlineManageAccounts,
} from "react-icons/md";
import {
  HiColorSwatch,
  HiCurrencyDollar,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { RiAppsLine, RiCustomerService2Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import { AiOutlineProduct, AiOutlineSecurityScan } from "react-icons/ai";

const ModuleSidebar = ({ mainSideBar }) => {
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // setIsDepartmentsOpen(false)
  };

  const { department } = useParams();

  const frontendModules = [
    {
      title: "Themes",
      route: "/frontend/themes",
      icon: <HiColorSwatch />,
    },
    {
      title: "Updates",
      route: "/frontend/updates",
      icon: <GrDocumentUpdate />,
    },
    {
      title: "Budget",
      route: "/frontend/budget",
      icon: <BsCashCoin />,
      subMenus: [
        {
          title: "Budget Overview",
          route: "/frontend/budget/overview",
          icon: <BsCashCoin />,
        },
        {
          title: "Budget Report",
          route: "/frontend/budget/report",
          icon: <BsCashCoin />,
        },
        {
          title: "Payment Tracker",
          route: "/frontend/budget/payment-tracker",
          icon: <BsCashCoin />,
        },
      ],
    },
  ];

  const hrModules = [
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
    {
      title: "Leaves",
      route: "/hr/leaves",
      icon: <HiOutlineClipboardList />,
      subMenus: [
        // ...(user.role === "Employee" && user.department === "Finance"
        //   ? []
        //   : [
        //       {
        //         title: "Pending Leaves",
        //         route: "/hr/leaves/pending-leaves",
        //         icon: <HiOutlineClipboardList />,
        //       },
        //     ]),
        // ,
        {
          title: "My Leaves",
          route: "/hr/leaves/my-leaves",
          icon: <HiOutlineClipboardList />,
        },

        ...(user.role === "Employee" && user.department === "Finance"
          ? []
          : [
              {
                title: "Reports",
                route: "/hr/leaves/leave-reports",
                icon: <HiOutlineClipboardList />,
              },
            ]),
      ],
    },
    {
      title: "Payroll",
      route: "/hr/payroll",
      icon: <HiCurrencyDollar />,
    },
    {
      title: "Payslip",
      route: "/hr/payslips",
      icon: <HiCurrencyDollar />,
    },
    {
      title: "SOP",
      route: "/hr/sops",
      icon: <HiCurrencyDollar />,
    },
    {
      title: "Policies",
      route: "/hr/policies",
      icon: <HiCurrencyDollar />,
    },
    {
      title: "Holidays",
      route: "/hr/holidays",
      icon: <HiCurrencyDollar />,
    },
    {
      title: "Comapny Settings",
      route: "/hr/company-settings",
      icon: <IoSettingsOutline />,
    },
  ];

  const itModules = [
    {
      title: "Assets",
      index: 0,
      route: "/it/kpi",
      icon: <AiOutlineProduct />,
      subMenus: [
        ...(user.department === "IT" ||
        user.department === "Maintainance" ||
        user.role === "Master Admin" ||
        user.role === "Super Admin"
          ? [
              {
                title: "Manage Asset",
                route: "/it/asset/manage",
                icon: <MdOutlineManageAccounts />,
              },
            ]
          : []),
        {
          title: "My Assets",
          route: "/it/asset/my-assets",
          icon: <FaRegUser />,
        },
        {
          title: "Reports",
          route: "/it/asset/reports",
          icon: <TbReportSearch />,
        },
      ],
    },
    {
      title: "Tickets",
      index: 1,
      route: "/it/tickets",
      icon: <HiOutlineClipboardList />,
      subMenus: [
        ...(user.role === "Employee" && user.department === "Finance"
          ? []
          : [
              {
                title: "Received Tickets",
                route: "/it/tickets/view-tickets",
                icon: <HiOutlineClipboardList />,
              },
            ]),
        ,
        {
          title: "My Tickets",
          route: "/it/tickets/my-tickets",
          icon: <HiOutlineClipboardList />,
        },
        ...(user.role === "Employee"
          ? []
          : [
              {
                title: "Members",
                route: "/it/tickets/members",
                icon: <MdOutlineManageAccounts />,
              },
            ]),
        ...(user.role === "Master Admin" || user.role === "Super Admin"
          ? [
              {
                title: "All Tickets",
                route: "/it/tickets/all-tickets",
                icon: <MdOutlineManageAccounts />,
              },
            ]
          : []),

        ...(user.role === "Employee" && user.department === "Finance"
          ? []
          : [
              {
                title: "Reports",
                route: "/it/tickets/ticket-reports",
                icon: <HiOutlineClipboardList />,
              },
            ]),
      ],
    },
    {
      title: "Meetings",
      index: 2,
      route: "/it/meetings",
      icon: <MdMeetingRoom />,
      subMenus: [
        {
          title: "Calendar",
          route: "/it/meetings/booking",
          icon: <FaRegCalendarAlt />,
        },
        ...(user.department === "Tech"
          ? []
          : [
              {
                title: "Add new Room",
                route: "/it/meetings/add-room",
                icon: <FaPlus />,
              },
            ]),

        {
          title: "Reports",
          route: "/it/meetings/reports",
          icon: <TbReportSearch />,
        },
      ],
    },
  ];
  const finance = [
    {
      title: "Assets",
      index: 0,
      route: "/customer/kpi",
      icon: <AiOutlineProduct />,
      subMenus: [
        {
          title: "Manage asset",
          route: "/customer/asset/manage",
          icon: <MdOutlineManageAccounts />,
        },
        {
          title: "Reports",
          route: "/customer/asset/reports",
          icon: <TbReportSearch />,
        },
      ],
    },
    {
      title: "Tickets",
      index: 1,
      route: "/customer/tickets",
      icon: <HiOutlineClipboardList />,
      subMenus: [
        {
          title: "View Tickets",
          route: "/customer/tickets/view-tickets",
          icon: <HiOutlineClipboardList />,
        },
        {
          title: "My Tickets",
          route: "/customer/tickets/my-tickets",
          icon: <HiOutlineClipboardList />,
        },
        // {
        //   title: "Members",
        //   route: "/customer/tickets/members",
        //  icon: <MdOutlineManageAccounts />,
        // },
        {
          title: "Ticket Reports",
          route: "/customer/tickets/ticket-reports",
          icon: <HiOutlineClipboardList />,
        },
      ],
    },
    {
      title: "Meetings",
      index: 2,
      route: "/customer/meetings",
      icon: <MdMeetingRoom />,
      subMenus: [
        {
          title: "Calendar",
          route: "/customer/meetings/booking",
          icon: <FaRegCalendarAlt />,
        },
        {
          title: "Add new Room",
          route: "/customer/meetings/add-room",
          icon: <FaPlus />,
        },
        {
          title: "Reports",
          route: "/customer/meetings/reports",
          icon: <TbReportSearch />,
        },
      ],
    },
  ];
  const tasks = [
    {
      title: "Projects",
      route: "/tasks/tasklist",
      icon: <FaProjectDiagram />,
    },
    {
      title: "Tasklist",
      route: "/tasks/tasklistfirstmenu",
      icon: <FaTasks />,
    },
    ...(user?.role === "Master Admin" || user?.role === "Admin"
      ? [
          {
            title: "Teams",
            route: "/tasks/teams",
            icon: <FaUsers />,
          },
        ]
      : []),
    {
      title: "My Tasks",
      route: "/tasks/mytasks",
      icon: <MdTask />,
    },
  ];

  // Get the department based on the current path
  let passedDepartment = location.pathname.split("/")[1];

  // Replace "customer" with "cms"

  // Determine which module array to render based on the department in the URL
  let modules = [];
  let taskModules = [];
  if (passedDepartment === "frontend") {
    modules = frontendModules;
  } else if (passedDepartment === "hr") {
    modules = hrModules;
  } else if (passedDepartment === "it") {
    modules = itModules;
  } else if (passedDepartment === "tasks") {
    taskModules = tasks;
  } else if (passedDepartment === "finance") {
    taskModules = finance;
  }

  const departments = [
    { name: "FRONTEND", icon: <FaCode /> },
    { name: "FINANCE", icon: <MdAccountBalance /> },
    { name: "SALES", icon: <FaMoneyBillTrendUp /> },
    { name: "HUMAN RESOURCE", icon: <FaBuildingUser /> },
    { name: "CMS", icon: <RiCustomerService2Line /> },
    { name: "MARKETING", icon: <SiMarketo /> },
    { name: "CAFE (F&B)", icon: <MdLocalCafe /> },
    { name: "IT", icon: <MdOutlineWifiTethering /> },
    { name: "MAINTENANCE", icon: <FaHandsHelping /> },
    { name: "LEGAL", icon: <MdPolicy /> },
  ];

  // Close sidebar when navigating to any route
  useEffect(() => {
    if (location.pathname === "/frontend") {
      setIsSidebarOpen(true);
    } else if (location.pathname === "/reports") {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(true);
    }
  }, [location.pathname]);

  const { departmentName } = location.state || {};

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
    Tech: ["FRONTEND", "CMS"],
    Finance: ["FINANCE"],
    Sales: ["SALES"],
    HR: ["HUMAN RESOURCE", "CMS"],
    CMS: ["CMS"],
    Marketing: ["MARKETING"],
    Cafe: ["CAFE (F&B)"],
    IT: ["IT"],
    Maintenance: ["MAINTENANCE", "CMS"],
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
  // Handle manual toggling of dropdowns
  const handleMenuClick = (index) => {
    // If the clicked menu is already open, close it; otherwise, open it
    setIsDepartmentsOpen(isDepartmentsOpen === index ? false : index);
    setIsSidebarOpen(true);
  };

  // Use useEffect to update dropdown open state based on the route

  return (
    <div className="">
      <div
        className={`${
          isSidebarOpen ? "w-60" : "w-20"
        } bg-white text-black flex-shrink-0 h-full sticky top-10 overflow-y-auto transition-all duration-300`}>
        {/*Dashboard */}
        <div className="flex flex-col gap-2 mt-5 px-3 relative">
          {/* Title/Dashboard */}
          <div
            onClick={() => navigate(`/${passedDepartment}/dashboard`)}
            className={`flex border-b-[1px] ${
              isSidebarOpen ? "pl-[1rem]" : "justify-center"
            } items-center py-3 wono-blue wono-blue-text rounded-md `}>
            <div className="flex justify-center w-5 text-2xl">
              <MdOutlineViewModule />
            </div>
            {isSidebarOpen && (
              <span className="pl-5 font-bold uppercase">
                {passedDepartment === "customer" ? "CMS" : passedDepartment}
              </span>
            )}
          </div>

          {/* Collapse-button */}
          <Tooltip
            title={isSidebarOpen ? "Close" : "Collapse"}
            placement="right">
            <button
              onClick={toggleSidebar}
              className={`text-black text-[0.8rem] p-2 hover:block  focus:outline-none text-end absolute top-[0.6rem] ${
                isSidebarOpen ? "left-[11rem]" : "left-[3.2rem]"
              } `}>
              {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRightToBracket />}
            </button>
          </Tooltip>

          {/* SubModules-Items */}

          {modules.map(({ title, route, icon, subMenus }, index) => {
            return (
              <div key={index}>
                {/* Main Menu Item */}
                <Tooltip title={title} placement="right">
                  <div
                    onClick={() => {
                      navigate(route);

                      handleMenuClick(index); // Toggle the dropdown on click
                    }}
                    className={`flex border-b-[1px] ${
                      isSidebarOpen ? "pl-[1rem]" : "justify-center"
                    } items-center cursor-pointer py-2 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                      location.pathname === route
                        ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                        : "bg-white"
                    }`}>
                    <div className="flex justify-center w-5 text-2xl">
                      {icon}
                    </div>

                    {isSidebarOpen && (
                      <div className="flex w-full justify-between pr-3">
                        <span className="pl-5 text-[0.8rem]">{title}</span>
                        <div>
                          {isSidebarOpen ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className={`w-4 h-4 transform ${
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
                        </div>
                      </div>
                    )}
                  </div>
                </Tooltip>

                {/* Submenu Items */}
                {subMenus && isDepartmentsOpen === index && (
                  <div className="ml-4">
                    {" "}
                    {/* Submenu container */}
                    <div className="flex flex-col py-2">
                      {subMenus.map((menu, subIndex) => (
                        <Tooltip
                          title={menu.title}
                          placement="right"
                          key={subIndex}>
                          <div
                            onClick={() => navigate(menu.route)}
                            className={`flex items-center border-b-[1px] p-3 gap-3 cursor-pointer hover:wono-blue-dark hover:text-white hover:rounded-md  ${
                              location.pathname === menu.route
                                ? "wono-blue border-r-4 border-b-[0px]  border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                                : "bg-white"
                            } `}>
                            <div className="flex justify-center w-6 text-[1rem]">
                              {menu.icon || <RiAppsLine />}
                            </div>
                            {isSidebarOpen && (
                              <span className="pl-5 text-[0.8rem]">
                                {menu.title}
                              </span>
                            )}
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Tasks */}

          {taskModules.map(({ title, route, icon, subMenus }, index) => (
            <div key={index}>
              {/* Main Menu Item */}
              <Tooltip title={title} placement="right">
                <div
                  onClick={() => {
                    navigate(route);

                    setIsDepartmentsOpen(
                      isDepartmentsOpen === index ? null : index
                    ); // Toggle specific dropdown
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer py-2 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === route
                      ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-5 text-2xl">{icon}</div>

                  {isSidebarOpen && (
                    <div className="flex w-full gap-x-10">
                      <span className="pl-5 text-[0.8rem]">{title}</span>
                      <div>
                        {/* {isSidebarOpen ? (
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
                          )} */}
                      </div>
                    </div>
                  )}
                </div>
              </Tooltip>

              {/* Submenu Items */}
              {subMenus && isDepartmentsOpen === index && (
                <div className="ml-4">
                  {" "}
                  {/* Submenu container */}
                  <div className="flex flex-col p-2">
                    {subMenus.map((menu, subIndex) => (
                      <Tooltip
                        title={menu.title}
                        placement="right"
                        key={subIndex}>
                        <div
                          onClick={() => navigate(menu.route)}
                          className={`flex items-center border-b-[1px] py-3 gap-3 cursor-pointer hover:wono-blue-dark hover:text-white hover:rounded-md  ${
                            location.pathname === menu.route
                              ? "wono-blue border-r-4 border-b-[0px]  border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                              : "bg-white"
                          } `}>
                          <div className="flex justify-center w-6 text-[1rem]">
                            {menu.icon || <RiAppsLine />}
                          </div>
                          {isSidebarOpen && (
                            <span className="pl-5 text-[0.8rem]">
                              {menu.title}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Common-submodules-menu */}
          {/* <Tooltip title={"Reports"} placement="right">
            <div
              onClick={() => {
                navigate("#dashboard");
              }}
              className={`flex border-b-[1px] ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-2 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/dashboard"
                  ? "wono-blue rounded-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-6 text-[1.3rem]">
                <TbReportSearch />
              </div>
              {isSidebarOpen && (
                <span className="pl-5 text-[0.8rem]">Reports</span>
              )}
            </div>
          </Tooltip> */}

          {/* Menu Items only for reports */}
          {location.pathname === "/reports" && (
            <>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <FaCode />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Frontend Reports
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <MdAccountBalance />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]"> Finance Reports</span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <BsCashCoin />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]"> Sales Reports</span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <FaBuildingUser />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Human Resource Reports
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <RiCustomerService2Line />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Customer Service Reports
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <SiMarketo />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Marketing Reports
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <MdOutlineLocalCafe />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Cafe(F&B) Reports
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <MdOutlineWifiTethering />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]"> IT Reports</span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <FaHandsHelping />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]">
                      {" "}
                      Maintenance Reports
                    </span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title={"Reports"} placement="right">
                <div
                  onClick={() => {
                    navigate("#dashboard");
                  }}
                  className={`flex border-b-[1px] ${
                    isSidebarOpen ? "pl-[1rem]" : "justify-center"
                  } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                    location.pathname === "/dashboard"
                      ? "wono-blue rounded-md text-[#0DB4EA]"
                      : "bg-white"
                  }`}>
                  <div className="flex justify-center w-6 text-[1.3rem]">
                    <AiOutlineSecurityScan />
                  </div>
                  {isSidebarOpen && (
                    <span className="pl-5 text-[0.8rem]"> Legal Reports</span>
                  )}
                </div>
              </Tooltip>
            </>
          )}

          {/* <Tooltip title={"Reports"} placement="right">
            <div
              onClick={() => {
                navigate("#dashboard");
              }}
              className={`flex border-b-[1px] ${
                isSidebarOpen ? "pl-[1rem]" : "justify-center"
              } items-center cursor-pointer  py-3 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                location.pathname === "/dashboard"
                  ? "wono-blue rounded-md text-[#0DB4EA]"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-center w-6 text-[1.3rem]">
                <FaCode />
              </div>
              {isSidebarOpen && (
                <span className="pl-5 text-[0.8rem]"> Frontend Reports</span>
              )}
            </div>
          </Tooltip> */}
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
