import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { BsCashCoin, BsFillPersonCheckFill } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

const MainSideBar = () => {
  const { auth: authUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.pathname);

  const departments = [
    {
      name: "Frontend",
      icon: <FaCode />,
      route: "/frontend",
      modules: [
        {
          title: "Edit Live Theme",
          route: "/frontend/live-theme",
          icon: <HiColorSwatch />,
        },
        { title: "Themes", route: "/frontend/themes", icon: <HiColorSwatch /> },
        {
          title: "Updates",
          route: "/frontend/updates",
          icon: <GrDocumentUpdate />,
        },
      ],
    },
    {
      name: "Finance",
      icon: <MdAccountBalance />,
      route: "/finance",
    },
    {
      name: "Sales",
      icon: <BsCashCoin />,
      route: "/sales",
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
          subMenus: [
            ...(authUser.user.role.roleTitle !== "Employee"
              ? [
                  {
                    title: "Employee wise Attendance",
                    route: "/hr/attandence/shift-time-usage",
                    icon: <BsFillPersonCheckFill />,
                  },
                ]
              : []),
          ],
        },
        {
          title: "Leaves",
          route: "/hr/leaves",
          icon: <HiOutlineClipboardList />,
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
      name: "IT",
      icon: <MdOutlineWifiTethering />,
      route: "/it",
    },
    {
      name: "Maintainance",
      icon: <FaHandsHelping />,
      route: "/maintainance",
    },
    {
      name: "Legal",
      icon: <AiOutlineSecurityScan />,
      route: "/legal",
    },
  ];

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.subMenus && item.subMenus.length > 0) {
        // Render nested SubMenu for subMenus
        return (
          <SubMenu key={item.route} label={item.title} icon={item.icon}>
            {renderMenuItems(item.subMenus)}
          </SubMenu>
        );
      }
      // Render regular MenuItem
      return (
        <MenuItem
          className={`${
            location.pathname.includes(item.route)
              ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
              : "bg-white"
          }`}
          key={item.route}
          icon={item.icon}
          onClick={() => navigate(item.route)}
        >
          {item.title}
        </MenuItem>
      );
    });
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

  //default tables
  const defaultModules = [
    {
      id: 1,
      title: "Meetings",
      route: "/meetings",
      icon: <MdMeetingRoom />,
      modules: [
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
  return (
    <div>
      <Sidebar className="h-[90vh] relative" collapsed={collapsed}>
        <div className="absolute top-5 right-[-2px] z-20">
          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaChevronRight />
          </button>
        </div>
        <Menu className="w-full">
          <MenuItem
            className={`${
              location.pathname === "/dashboard"
                ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                : "bg-white"
            } w-full`}
          >
            <Link to="/dashboard" className="w-full p-2 items-center">
              <span className={`${collapsed ? "hidden" : "ml-2"}`}>
                Dashboard
              </span>
            </Link>
          </MenuItem>

          {/* Render Departments */}
          {departments.map((department) => (
            <SubMenu
              key={department.route}
              label={department.name}
              icon={department.icon}
              onClick={() => navigate(department.route)}
            >
              {/* Render modules if available */}
              {department.modules && renderMenuItems(department.modules)}
            </SubMenu>
          ))}
          {menuItems.map((item) => (
            <MenuItem
              key={item.route}
              className={`${
                location.pathname === item.route
                  ? "wono-blue border-r-4 border-[#0DB4EA] rounded-tl-md rounded-bl-md text-[#0DB4EA]"
                  : "bg-white"
              } w-full`}
            >
              <Link to={item.route} className="w-full p-2 flex items-center">
                <div className="flex gap-4">
                  <div>{item.icon}</div>
                  <span className={`${collapsed ? "hidden" : "ml-2"}`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            </MenuItem>
          ))}
          {defaultModules.map((module) => (
            <SubMenu
              key={module.route}
              label={module.title}
              icon={module.icon}
              onClick={() => navigate(module.route)}
            >
              {/* Render modules if available */}
              {module.modules && renderMenuItems(module.modules)}
            </SubMenu>
          ))}
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MainSideBar;
