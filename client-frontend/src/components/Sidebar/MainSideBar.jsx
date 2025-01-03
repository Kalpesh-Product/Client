import React, { useState, useEffect } from "react";
import {
  FaAngleDown,
  FaArrowRightToBracket,
  FaBuildingUser,
  FaChevronUp,
  FaCode,
  FaMoneyBillTrendUp,
  FaPlus,
  FaRegMoneyBill1,
  FaUserClock,
  FaUsers,
} from "react-icons/fa6";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaHandsHelping,
  FaProjectDiagram,
  FaRegCalendarAlt,
  FaTasks,
} from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { TbReportSearch, TbSection } from "react-icons/tb";
import { IoIosChatboxes, IoMdNotifications } from "react-icons/io";
import { SiAuthelia, SiMarketo } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { Toolbar, Tooltip } from "@mui/material";
import {
  MdAccountBalance,
  MdDashboard,
  MdLocalCafe,
  MdMeetingRoom,
  MdOutlineHolidayVillage,
  MdOutlineLocalCafe,
  MdOutlineManageAccounts,
  MdOutlinePayment,
  MdOutlineSubdirectoryArrowRight,
  MdOutlineWifiTethering,
  MdPolicy,
  MdTask,
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
  RiLoginBoxLine,
} from "react-icons/ri";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  BsCashCoin,
  BsFillPersonCheckFill,
  BsPersonCheck,
} from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { useSidebar } from "../../contexts/SideBarContext";

const MainSideBar = () => {
  const { auth: authUser } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");
  const [sideBarOpen, setSidebarOpen] = useState(isSidebarOpen);
  const [departmentDrop, setDepartmentDrop] = useState(null);
  const [expandedDepartment, setExpandedDepartment] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(isSidebarOpen);
  //   setExpandedDepartment(false);
  // };

  console.log("in sidebar comp : ", isSidebarOpen);

  // Menu items array (without DASHBOARD)
  const menuItems = [
    {
      name: "Reports",
      icon: <TbReportSearch />,
      route: "/reports",
    },

    { name: "Calendar", icon: <FaRegCalendarAlt />, route: "/calendar" },
    { name: "Chat", icon: <HiOutlineChatAlt2 />, route: "/chat" },
    { name: "Access", icon: <SiAuthelia />, route: "/access" },
    {
      name: "Notifications",
      icon: <IoMdNotifications />,
      route: "/notifications",
    },
    // { name: "Profile", icon: <CgProfile />, route: "/profile" },
  ];

  const defaultModules = [
    {
      id: 1,
      icon: <FaTasks />,
      route: "/tasks",
      title: "Tasks",
      submenus: [
        {
          id: 2,
          title: "Projects",
          icon: <FaProjectDiagram />,
          route: "/tasks/tasklist",
        },
        {
          id: 3,
          title: "Task List",
          icon:<FaTasks />,
          route: "/tasks/tasklistfirstmenu",
        },
        {
          id: 4,
          title: "Teams",
          route: "/tasks/teams",
          icon : <FaUsers />,
        },
        {
          id: 5,
          title: "My Tasks",
          route: "/tasks/mytasks",
          icon : <MdTask />,
        },
      ],
    },
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
        {
          id: 2,
          title: "View Tickets",
          icon: <MdOutlineLocalCafe />,
          route: "/tickets/view-tickets",
        },
        {
          id: 4,
          title: "Ticket Reports",
          icon: <HiOutlineClipboardList />,
          route: "/tickets/ticket-reports",
        },
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

  const departments = [
    {
      name: "Frontend",
      icon: <FaCode />,
      route: "/frontend",
      modules: [
        { title: "Edit Live Theme", route: "/frontend/live-theme" },
        { title: "Themes", route: "/frontend/themes" },
        { title: "Updates", route: "/frontend/updates" },
      ],
    },
    {
      name: "HR",
      icon: <BsPersonCheck />,
      route: "/hr",
      modules: [
        {
          title: "Onboarding",
          icon: <GoPersonAdd />,
          route: "/hr/onboarding",
        },
        {
          title: "Attendance",
          icon: <FaUserClock />,
          route: "/hr/attendance",
          subMenus: [
            {
              title: "Employee wise Attendance",
              route: "/hr/attandence/shift-time-usage",
            },
          ],
        },
        {
          title: "Leaves",
          icon: <MdOutlineHolidayVillage />,
          route: "/hr/leaves",
          subMenus: [
            {
              title: "My Leaves",
              route: "/hr/leaves/my-leaves",
              icon: <HiOutlineClipboardList />,
            },
            {
              title: "View Past Leaves",
              route: "/hr/leaves/past-leaves",
              icon: <HiOutlineClipboardList />,
            },
            {
              title: "Subordinate Due Approvals",
              route: "/hr/leaves/due-approvals",
              icon: <HiOutlineClipboardList />,
            },
            {
              title: "Manage Leaves",
              route: "/hr/leaves/manage-leaves",
              icon: <HiOutlineClipboardList />,
            },

            // ...(authUser.user.role === "Employee" &&
            // authUser.user.department === "Finance"
            //   ? []
            //   : [
            //       {
            //         title: "Reports",
            //         route: "/hr/leaves/leave-reports",
            //         icon: <HiOutlineClipboardList />,
            //       },
            //     ]),
          ],
        },
        {
          title: "Payroll",
          route: "/hr/payroll",
          icon: <HiCurrencyDollar />,
          subMenus: [
            {
              title: "Payroll Value",
              route: "/hr/payroll/value",
              icon: <FaRegMoneyBill1 />,
            },
            {
              title: "Total Employees",
              route: "/hr/payroll/employee-count",
              icon: <RiAccountCircleLine />,
            },
            {
              title: "Due Payout",
              route: "/hr/payroll/due-payout",
              icon: <MdOutlinePayment />,
            },
          ],
        },
        {
          title: "Payslip",
          route: "/hr/payslips",
          icon: <HiCurrencyDollar />,
        },
        {
          title: "Employment Agreement",
          route: "/hr/employment-agreement",
          icon: <HiCurrencyDollar />,
        },
        {
          title: "Company Handbook",
          route: "/hr/company-handbook",
          icon: <HiCurrencyDollar />,
          // subMenus: [
          //   {
          //     title: "SOP",
          //     route: "/hr/company-handbook/sop",
          //     icon: <HiOutlineClipboardList />,
          //   },
          //   {
          //     title: "Policies",
          //     route: "/hr/company-handbook/policies",
          //     icon: <HiOutlineClipboardList />,
          //   },
          // ],
        },
        // {
        //   title: "SOP",
        //   route: "/hr/sops",
        //   icon: <HiCurrencyDollar />,
        // },
        // {
        //   title: "Policies",
        //   route: "/hr/policies",
        //   icon: <HiCurrencyDollar />,
        // },
        {
          title: "Holidays",
          route: "/hr/holidays",
          icon: <HiCurrencyDollar />,
        },
        {
          title: "Events",
          route: "/hr/events",
          icon: <IoSettingsOutline />,
        },

        // {
        //   title: "Leaves",
        //   route: "/hr/leaves",
        //   icon: <HiOutlineClipboardList />,
        //   subMenus: [
        //     {
        //       title: "My Leaves",
        //       route: "/hr/leaves/my-leaves",
        //       icon: <HiOutlineClipboardList />,
        //     },

        //     ...(authUser.user.role === "Employee" && authUser.user.department === "Finance"
        //       ? []
        //       : [
        //           {
        //             title: "Reports",
        //             route: "/hr/leaves/leave-reports",
        //             icon: <HiOutlineClipboardList />,
        //           },
        //         ]),
        //   ],
        // },
        {
          title: "CV Dump",
          route: "/hr/cvdump",
          icon: <HiOutlineClipboardList />,
          subMenus: [
            {
              title: "Applicants",
              route: "/hr/cvdump/applicants",
              icon: <HiOutlineClipboardList />,
            },
          ],
        },
        {
          title: "Comapny Settings",
          route: "/hr/company-settings",
          icon: <IoSettingsOutline />,
        },
      ],
    },
    {
      name: "Finance",
      icon: <TbSection />,
      route: "/finance",
    },
    {
      name: "Sales",
      icon: <TbSection />,
      route: "/sales",
    },

    {
      name: "IT",
      icon: <TbSection />,
      route: "/it",
    },
  ];

  const departmentMapping = {
    TopManagement: [
      "Frontend",
      "HR",
      "Finance",
      "Sales",
      "Maintainance",
      "Legal",
      "IT",
    ],
    Tech: ["Frontend", "HR"],
    Finance: ["Finance"],
    // Sales: ["SALES"],
    HR: ["HR", "Finance"],
    // CMS: ["CMS"],
    // Marketing: ["MARKETING"],
    // Cafe: ["CAFE (F&B)"],
    // IT: ["IT", "HUMAN RESOURCE", "FINANCE"],
    // Maintainance: ["CMS"],
    // Legal: ["LEGAL"],
  };

  // Filter departments based on user's department using departmentMapping
  const filteredDepartments = departments.filter((dept) =>
    (
      departmentMapping[authUser?.user?.department.map((dept) => dept.name)] ||
      []
    ).includes(dept.name)
  );

  const toggleDepartment = (index) => {
    setExpandedDepartment((prev) => (prev === index ? null : index));
    setExpandedModule(null); // Collapse any expanded modules
  };

  const toggleModule = (index) => {
    setExpandedModule((prev) => (prev === index ? null : index));
  };

  const renderSubMenus = (subMenus) => (
    <ul className="pl-4">
      {subMenus.map((subMenu, idx) => (
        <li
          key={idx}
          className="cursor-pointer py-3 pl-4 hover:wono-blue-dark  hover:rounded-md hover:text-white border-b-2 border-gray-200 motion-preset-slide-down-sm"
          onClick={() => navigate(subMenu.route)}
        >
          <div className="flex items-center gap-3">
            <div>
              <MdOutlineSubdirectoryArrowRight />
            </div>
            {isSidebarOpen ? <div>{subMenu.title}</div> : ""}
          </div>
        </li>
      ))}
    </ul>
  );
  const isActive = (path) => location.pathname.startsWith(path);
  console.log(departmentDrop);

  return (
    <div className={`flex flex-col h-[87vh] bg-gray p-2`}>
      <div
        // onMouseEnter={() => setIsSidebarOpen(true)}
        // onMouseLeave={() => setIsSidebarOpen(false)}
        className={`${
          isSidebarOpen ? "w-60 rounded-md" : "w-20 rounded-lg"
        } bg-white border-2  text-black flex flex-shrink-0 h-[87vh] overflow-y-auto transition-all duration-300 z-[1]`}
      >
        <div className="flex relative w-full">
          {/*Dashboard */}
          <div className="p-1 flex flex-col gap-0 w-full">
            <Tooltip title={"Dashboard"} placement="right">
              <div
                onClick={() => {
                  navigate("/dashboard");
                }}
                className={`flex border-b-[1px] ${
                  isSidebarOpen ? "pl-[1rem]" : "justify-center"
                } items-center cursor-pointer  py-4 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                  location.pathname === "/dashboard"
                    ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-center w-6 text-md">
                  <RiDashboardLine />
                </div>
                {isSidebarOpen && <span className="pl-5 text-md">Dashboard</span>}
              </div>
            </Tooltip>

            {/* Department dropdown */}
            <ul>
              {filteredDepartments.length > 1 ? (
                <>
                  <Tooltip title="Department" placement="right">
                    <div
                      className={`py-4 px-4 flex border-b-[1px] border-gray-200 ${
                        !isSidebarOpen ? "justify-center" : "justify-between"
                      } items-center hover:wono-blue-dark hover:text-white cursor-pointer rounded-md`}
                      onClick={() => {
                        setDepartmentDrop(!departmentDrop);
                        setIsSidebarOpen(true);
                      }}
                    >
                      <div className="flex gap-6 items-center">
                        <div className="text-md">
                          <TbSection />
                        </div>
                        {isSidebarOpen && <span className="text-md">Departments</span>}
                      </div>
                      <>
                        {isSidebarOpen &&
                          (departmentDrop ? <FaChevronUp /> : <FaAngleDown />)}
                      </>
                    </div>
                  </Tooltip>
                  {departmentDrop ? (
                    <div className="motion-preset-slide-down-sm">
                      {filteredDepartments.map((dept, index) => (
                        <li key={index} className="border-b">
                          <Tooltip title={dept.name} placement="right">
                            <div
                              className={`cursor-pointer flex items-center py-4 px-4  hover:wono-blue-dark hover:text-white hover:rounded-md  ${
                                isActive(dept.route)
                                  ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                                  : "bg-white border-b-[1px] border-gray-200"
                              }`}
                              onClick={() => {
                                setIsSidebarOpen(true);

                                navigate(dept.route);
                              }}
                            >
                              <div className="flex w-full pl-4 justify-between items-center">
                                <div className="flex items-center">
                                  <div className="text-md">{dept.icon}</div>
                                  <div>
                                    {isSidebarOpen && (
                                      <span className="pl-4 text-md">{dept.name}</span>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  {isSidebarOpen && dept.modules && (
                                    <span
                                      onClick={() => {
                                        dept.modules && toggleDepartment(index);
                                      }}
                                      className="ml-auto transition-all"
                                    >
                                      {expandedDepartment === index &&
                                      isSidebarOpen ? (
                                        <FaChevronUp />
                                      ) : (
                                        <FaAngleDown />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Tooltip>
                          {expandedDepartment === index && dept.modules && (
                            <ul className="pl-1">
                              {dept.modules.map((module, idx) => (
                                <li
                                  key={idx}
                                  className="pt-0 motion-preset-slide-down-lg"
                                >
                                  <Tooltip
                                    title={module.title}
                                    placement="right"
                                  >
                                    <div
                                      className={`cursor-pointer  flex pl-5 pr-2 py-4 justify-between hover:wono-blue-dark hover:text-white hover:rounded-md ${
                                        isActive(module.route)
                                          ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                                          : "bg-white border-b-[1px] border-gray-200"
                                      } `}
                                      onClick={() => {
                                        module.subMenus && toggleModule(idx);
                                        navigate(module.route);
                                        setIsSidebarOpen(true);
                                      }}
                                    >
                                      <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <span className="text-md">{module.icon}</span>
                                          {isSidebarOpen ? (
                                            <span className="text-md">{module.title}</span>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        {module.subMenus && isSidebarOpen && (
                                          <span>
                                            {expandedModule === idx ? (
                                              <FaChevronUp />
                                            ) : (
                                              <FaAngleDown />
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </Tooltip>
                                  {expandedModule === idx &&
                                    module.subMenus &&
                                    renderSubMenus(module.subMenus)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {filteredDepartments.map((dept, index) => (
                    <li key={index} className="border-b">
                      <div
                        className={`cursor-pointer flex items-center py-2 px-4  hover:wono-blue-dark hover:text-white hover:rounded-md  ${
                          isActive(dept.route)
                            ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                            : "bg-white border-b-[1px] border-gray-200"
                        }`}
                        onClick={() => {
                          setSidebarOpen(true);
                          dept.modules && toggleDepartment(index);
                          navigate(dept.route);
                        }}
                      >
                        <div className="flex w-full justify-between items-center">
                          <div className="flex">
                            <div className="text-xl">{dept.icon}</div>
                            <div>
                              {isSidebarOpen && (
                                <span className="pl-4">{dept.name}</span>
                              )}
                            </div>
                          </div>
                          <div>
                            {isSidebarOpen && dept.modules && (
                              <span className="ml-auto transition-all">
                                {expandedDepartment === index ? (
                                  <FaChevronUp />
                                ) : (
                                  <FaAngleDown />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {expandedDepartment === index && dept.modules && (
                        <ul className="pl-1">
                          {dept.modules.map((module, idx) => (
                            <li
                              key={idx}
                              className="pt-0 motion-preset-slide-down-md"
                            >
                              <Tooltip title={module.title} placement="right">
                                <div
                                  className={`items-center flex pl-5 pr-2 py-3 justify-between hover:wono-blue-dark hover:text-white hover:rounded-md ${
                                    isActive(module.route)
                                      ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                                      : "bg-white border-b-[1px] border-gray-200"
                                  } `}
                                  onClick={() => {
                                    module.subMenus && toggleModule(idx);
                                    navigate(module.route);
                                    setIsSidebarOpen(true);
                                  }}
                                >
                                  <div className="flex items-center gap-4">
                                    <span>{module.icon}</span>
                                    <span>{module.name}</span>
                                  </div>
                                  {module.subMenus && (
                                    <span>
                                      {expandedModule === idx ? (
                                        <FaChevronUp />
                                      ) : (
                                        <FaAngleDown />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </Tooltip>
                              {expandedModule === idx &&
                                module.subMenus &&
                                renderSubMenus(module.subMenus)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </>
              )}
            </ul>

            {menuItems.map((item, index) => (
              <Tooltip title={item.name} placement="right">
                <div
                  key={index}
                  onClick={() => handleMenuOpen(item)}
                  className={`cursor-pointer flex ${
                    isSidebarOpen
                      ? "pl-[1rem] hover:wono-blue-dark hover:rounded-md hover:text-white"
                      : "justify-center"
                  } items-center border-b-[1px] py-4 ${
                    location.pathname === item.route
                      ? "wono-blue border-r-4 border-b-[0px]  border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                      : "bg-white"
                  } `}
                >
                  {/* <img src={item.icon} alt={item.name} className="w-6 h-6 mr-3" /> */}
                  <div className="flex justify-center w-6 text-md">
                    {item.icon}
                  </div>
                  {isSidebarOpen && <span className="pl-5 text-md">{item.name}</span>}
                </div>
              </Tooltip>
            ))}

            <div>
              {defaultModules.map((module, index) => (
                <Tooltip title={module.title} placement="right">
                  <div key={index} className="border-b">
                    <div
                      className={`cursor-pointer flex justify-center items-center py-4 px-4 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                        isActive(module.route)
                          ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                          : "bg-white border-b-[1px] border-gray-200"
                      }`}
                      onClick={() => {
                        module.submenus && toggleModule(index);
                        navigate(module.route);
                      }}
                    >
                      <div className="text-md">{module.icon}</div>
                      {isSidebarOpen && (
                        <span className="pl-5 text-md">{module.title}</span>
                      )}
                      {isSidebarOpen && module.submenus && (
                        <span className="ml-auto">
                          {expandedModule === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </span>
                      )}
                    </div>
                    {expandedModule === index && module.submenus && (
                      <div className="pl-4">
                        {module.submenus.map((submenu, idx) => (
                          <Tooltip title={submenu.title} placement="right">
                            <div
                              key={idx}
                              className={`cursor-pointer py-4 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                                isActive(submenu.route)
                                  ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                                  : "bg-white border-b-[1px] border-gray-200"
                              } `}
                              onClick={() => navigate(submenu.route)}
                            >
                              <div
                                className={`flex items-center ${
                                  isSidebarOpen
                                    ? "justify-start pl-4"
                                    : "justify-center"
                                }`}
                              >
                                <div
                                  className={`${
                                    isSidebarOpen ? "text-md" : "text-md"
                                  }`}
                                >
                                  {submenu.icon}
                                </div>
                                {isSidebarOpen && (
                                  <span className="pl-4">{submenu.title}</span>
                                )}
                              </div>
                            </div>
                          </Tooltip>
                        ))}
                      </div>
                    )}
                  </div>
                </Tooltip>
              ))}
            </div>

            <Tooltip title={"Profile"} placement="right">
              <div
                onClick={() => {
                  navigate("/profile");
                }}
                className={`flex border-b-[1px] ${
                  isSidebarOpen ? "pl-[1rem]" : "justify-center"
                } items-center cursor-pointer  py-4 hover:wono-blue-dark hover:text-white hover:rounded-md ${
                  location.pathname === "/profile"
                    ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-center w-6 text-md">
                  <CgProfile />
                </div>
                {isSidebarOpen && <span className="pl-5 text-md">Profile</span>}
              </div>
            </Tooltip>
          </div>

          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
