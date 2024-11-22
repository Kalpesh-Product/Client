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
  MdOutlineLocalCafe,
  MdOutlineAddBox,
  MdOutlineViewModule,
  MdOutlineWifiTethering,
  MdPolicy,
} from "react-icons/md";
import {
  HiColorSwatch,
  HiCurrencyDollar,
  HiOutlineClipboardList,
  HiUsers,
} from "react-icons/hi";
import {
  RiAppsLine,
  RiCustomerService2Line,
  RiDashboardLine,
} from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CgWebsite } from "react-icons/cg";
import { BsCashCoin } from "react-icons/bs";
import { AiOutlineSecurityScan } from "react-icons/ai";

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
  ];

  const hrModules = [
    {
      title: "Attendance",
      route: "#hr/leave-requests",
      icon: <HiOutlineClipboardList />,
    },
    {
      title: "Payroll",
      route: "#hr/payroll",
      icon: <HiCurrencyDollar />,
    },
  ];

  const itModules = [
    {
      title: "Assets",
      route: "/customer/kpi",
      icon: <RiDashboardLine />,
      subMenus: [
        {
          title: "Manage asset",
          route: "/customer/asset/manage",
        },
        {
          title: "View asset",
          route: "/customer/asset/view",
        },

        {
          title: "Delete asset",
          route: "/customer/asset/delete",
        },
      ],
    },
    {
      title: "Tickets",
      route: "/customer/tickets",
      icon: <HiOutlineClipboardList />,
      subMenus: [
        {
          title: "View Tickets",
          route: "/customer/tickets/view-tickets",
        },
        {
          title: "My Tickets",
          route: "/customer/tickets/my-tickets",
        },
        // {
        //   title: "Members",
        //   route: "/customer/tickets/members",
        // },
        {
          title: "Ticket Reports",
          route: "/customer/tickets/ticket-reports",
        },
      ],
    },
    {
      title: "Meetings",
      route: "#customer/meetings",
      icon: <HiCurrencyDollar />,
      subMenus: [
        {
          title: "Room Booking",
          route: "/customer/meetings/booking",
        },
      ],
    },
  ];
  const tasks = [
    {
      title: "Tasks",
      route: "/tasks",
      subMenus: [
        {
          title: "Dashboard",
          route: "",
        },
        {
          title: "Tasklist",
          route: "",
        },
        {
          title: "Team",
          route: "",
        },
      ],
    },
  ];

  // Get the department based on the current path
  const passedDepartment = location.pathname.split("/")[1];

  // Determine which module array to render based on the department in the URL
  let modules = [];
  if (passedDepartment === "frontend") {
    modules = frontendModules;
  } else if (passedDepartment === "hr") {
    modules = hrModules;
  } else if (passedDepartment === "customer") {
    modules = itModules;
  } else if (passedDepartment === "tasks") {
    modules = tasks;
  }

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
    CMS: ["CUSTOMER SERVICE"],
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
                {passedDepartment}
              </span>
            )}
          </div>

          {/* Collapse-button */}
          <Tooltip
            title={isSidebarOpen ? "Close" : "Collapse"}
            placement="right">
            <button
              onClick={toggleSidebar}
              className={`text-black text-[0.8rem] p-2 focus:outline-none text-end absolute top-[0.6rem] ${
                isSidebarOpen ? "left-[11rem]" : "left-[3.2rem]"
              } `}>
              {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRightToBracket />}
            </button>
          </Tooltip>

          {/* SubModules-Items */}

          {modules.map(({ title, route, icon, subMenus }, index) => (
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
          <Tooltip title={"Reports"} placement="right">
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
              }`}>
              <div className="flex justify-center w-6 text-[1.3rem]">
                <TbReportSearch />
              </div>
              {isSidebarOpen && (
                <span className="pl-5 text-[0.8rem]">Reports</span>
              )}
            </div>
          </Tooltip>

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
                <span className="pl-5 text-[0.8rem]"> Frontend Reports</span>
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
