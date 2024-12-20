import React, { useEffect, useState } from "react";
import ModuleSidebar from "../../components/ModuleSidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TestSide from "../../components/Sidetest";
import PayRollDash from "../hr/payroll/PayRollDash";
import {
  BudgetApproval,
  CountCard,
  CriticalAlerts,
  PendingTasks,
  ResolvedIssues,
  ServerUptime,
} from "../../Widgets/TechWidgets";
import DoughnutChart from "../../Widgets/DoughnutGraph";
import { WidgetSection } from "../Dashboard";
import {
  AttendanceRate,
  EmployeeCount,
  LeaveRequests,
  NewHires,
  PayrollSummary,
} from "../../Widgets/HR/WidgetsHR";
import RevenueVsExpensesWidget from "../../Widgets/RevenueVsExpensesWidget";
import ProgressDoughnutWidget from "../../Widgets/ProgressDoughnutWidget";
import BarGraphWidget from "../../Widgets/BarGraphWidget";
import useAuth from "../../hooks/useAuth";
import {
  RecurringClients,
  SalesByMonthGraph,
  SalesDistributionGraph,
  SalesProgress,
  SalesTarget,
  SalesTrendGraph,
} from "../../Widgets/SalesWidgets";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import {
  NetworkIssuesResolved,
  PCFixes,
  PCFixesLineGraph,
  PCFixesPending,
  PCFixesProgress,
  WiFiConfiguration,
  WiFiTraffic,
} from "../../Widgets/ITWidgets";
import {
  AssetAllocationWidget,
  AssetsAssigned,
  AssetsCount,
  AssetsInRepair,
  MaintenanceRequests,
  NewAssetsAdded,
  QuantityRemainingWidget,
} from "../../Widgets/CMS/customerServiceWidgets";
import AddAssetForm from "../cms/asset/AddAssetForm";
import { NewModal } from "../../components/NewModal";
import MyAssets from "../cms/asset/MyAssets";
import ViewAssets from "../cms/asset/ViewAssets";
import AssetsData from "../cms/asset/AssetsData";
import ViewTickets from "../cms/tickets/ViewTickets";
import TicketWidget from "../cms/tickets/components/TicketWidget";
import TicketWidget2 from "../cms/tickets/components/TicketWidget2";
import TicketWidget3 from "../cms/tickets/components/TicketWidget3";
import TicketWidget4 from "../cms/tickets/components/TicketWidget4";
import MyTicketsTable from "../../components/Submodules/ticket/MyTicketsTable";
import TicketMembers from "../cms/tickets/TicketMembers";
import TicketReports from "../cms/tickets/TicketReports";
import AddTicketForm from "../cms/tickets/components/AddTicketForm";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { color, motion } from "framer-motion";
import ManageAsset from "../cms/asset/ManageAsset";
import Listing from "../cms/room-booking/Listing";
import Task from "../Task";
import TodaysTickets from "../cms/tickets/components/TodaysTickets";
import MyTicketsPage from "./../cms/tickets/MyTicketsPage";
import { toast } from "sonner";
import AssetReports from "../cms/asset/AssetReports";
import RoomBookingDash from "../cms/room-booking/RoomBookingDash";
import BookingReports from "../cms/room-booking/BookingReports";
import AddRooms from "../cms/room-booking/AddRooms";

import Teams from "../Teams";
import Tasklist from "../Tasklist";
import TasklistTable from "../TasklistTable";
import Tasklistfirstmenu from "../tasklistfirstmenu";
import Mytasks from "../Mytasks";
import { TicketsRemainingWidget } from "../cms/tickets/components/TicketWidgets/TicketsRemainingWidget";
import MyTickets from "../cms/tickets/components/MyTickets";
import Budget from "../Budget";
import AttendanceDash from "../hr/attendance/AttendanceDash";
import LeaveWidgets from "../hr/leaves/Components/LeaveWidgets";
import LeaveWidget2 from "../hr/leaves/Components/LeaveWidget2";
import LeaveWidget3 from "../hr/leaves/Components/LeaveWidget3";
import LeaveWidget4 from "../hr/leaves/Components/LeaveWidget4";
import PendingLeaves from "../hr/leaves/Components/PendingLeaves";
import Holidays from "../hr/holidays/Holidays";
import Sops from "../hr/sops/Sops";
import Policies from "../hr/policies/Policies";
import Payslips from "../hr/payslips/Payslips";
import Onboarding from "../hr/onboarding/Onboarding";
import CompanySettings from "../hr/company-settings/CompanySettings";
import AllTickets from "../cms/tickets/AllTickets";
import { IoMdClose } from "react-icons/io";
import AntiqueCafe from "../../assets/builder-preview/cafe-antique.png";
import Caffo from "../../assets/builder-preview/cafe-caffo.png";
import EditTemplate from "../website-builder/EditTemplate";
import LineGraph from "../../components/Graphs/LineGraph";
import BarGraphMUI from "../../components/Graphs/BarGraphMUI";
import PieChartMUI from "../../components/Graphs/PieChartMUI";

const DepartmentDash = () => {
  const navigate = useNavigate();
  const { auth: authUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const location = useLocation();
  const [value, setValue] = useState(0);
  const handleClose = () => setOpen(false);
  const handleCloseTicket = () => setOpenTicket(false);

  const handleTwo = () => {
    setOpenTicket(false);
    toast.success("Added New Ticket");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const themes = [
    {
      id: 1,
      name: "Cafe Template",
      description: "A clean and minimalistic HTML template",
      folder: "/templates/template-1",
      image: AntiqueCafe,
      features: [
        "Website / Native Apps",
        "Payment Gateway",
        "Booking Engine",
        "Customer Profile",
        "No Code & Self-Serve",
      ],
      demoLink: "/templates/template-1/index.html",
    },
    {
      id: 2,
      name: "Cafe Template",
      description: "A clean and minimalistic HTML template",
      folder: "/templates/template-2",
      image: Caffo,
      features: [
        "Responsive Design",
        "Cross-Browser Compatibility",
        "Search Engine Optimization",
        "Customizable Colors",
      ],
      demoLink: "/templates/template-2/index.html",
    },
  ];
  const { id } = useParams(); // Extract ID from the route

  const selectedTheme = id
    ? themes.find((theme) => theme.id === parseInt(id, 10))
    : null;

  const techWidgetsData = {
    activeTickets: 8,
    pendingTasks: 5,
    resolvedIssues: 20,
    serverUptime: "99.8%",
    criticalAlerts: 2,
  };

  const HrWidgetsData = {
    employeeCount: 150,
    leaveRequests: 12,
    payrollAmount: "$200,000",
    attendanceRate: "96%",
    newHires: 3,
  };
  // Random Data for Sales Widgets
  const salesWidgetsData = {
    recurringClients: 120,
    salesProgress: 75,
    salesTarget: 50000, // Example target value in dollars
  };

  const salesWidgets = [
    {
      heading: "Overview",
      widgets: [
        <RecurringClients count={salesWidgetsData.recurringClients} />,
        <SalesProgress progress={salesWidgetsData.salesProgress} />,
        <SalesTarget target={salesWidgetsData.salesTarget} />,
      ],
    },
    {
      heading: "Graphs",
      widgets: [
        <SalesByMonthGraph />,
        <SalesDistributionGraph />,
        <SalesTrendGraph />,
      ],
    },
  ];
  const techAllocatedBudgetData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Approved Budget ($)",
        data: [
          4000, 6500, 7200, 8100, 9500, 10200, 9800, 11200, 10700, 12300, 11900,
          13000,
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const techUtilisedBudgetData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Approved Budget ($)",
        data: [
          3000, 7500, 4200, 3100, 8500, 10300, 9800, 11300, 13700, 15300, 16900,
          23000,
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const techUniqueData = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    data: [15, 12, 4, 2, 5, 14, 12, 4, 1, 4, 5, 6],
  };
  const techSiteVisitors = {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    data: [15, 12, 4, 2, 5, 14, 12, 4, 1, 4, 5, 6],
  };
  const techTotalComplaints = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Complaints",
        data: [15, 10, 2, 5, 6, 2, 5, 10, 12, 7, 2, 2],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const techPendingComplaints = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Pending Complaints",
        data: [5, 0, 2, 1, 0, 1, 3, 5, 1, 1, 1, 2],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const techIndiaVisitors = [
    { id: 0, value: 25, label: "Mumbai" },
    { id: 1, value: 20, label: "Delhi" },
    { id: 2, value: 15, label: "Bangalore" },
    { id: 3, value: 20, label: "Goa" },
    { id: 4, value: 30, label: "Chennai" },
  ];
  const techGoaVisitors = [
    { id: 0, value: 5, label: "Panaji" },
    { id: 1, value: 2, label: "Margao" },
    { id: 2, value: 3, label: "Mapusa" },
    { id: 3, value: 3, label: "Ponda" },
    { id: 4, value: 6, label: "Verna" },
  ];

  const techWidgets = [
    {
      heading: "Annual Budget Allotted",
      widgets: [
        <LineGraph
          graphXaxis={techAllocatedBudgetData.labels}
          graphYaxis={techAllocatedBudgetData.datasets}
          xAxisLabel="Allocated Budget"
          graphHeight={500}
          graphWidth={1250}
        />,
      ],
    },
    {
      heading: "Annual Budget Utilised",
      widgets: [
        <LineGraph
          graphXaxis={techUtilisedBudgetData.labels}
          graphYaxis={techUtilisedBudgetData.datasets}
          graphHeight={500}
          graphWidth={1250}
        />,
      ],
    },
    {
      heading: "Budget Data",
      widgets: [
        <CountCard
          title="Projected Per Unit Cost"
          count="3000"
          totalMonths="12"
          deptCount="5"
          annualCost="10000"
          monthsPeriod="Total"
        />,
        <CountCard
          title="Actual Per Unit Cost"
          count="3000"
          totalMonths="12"
          deptCount="5"
          annualCost="10000"
          monthsPeriod="Existing"
        />,
        <BudgetApproval
          title="Additional Budget Requested"
          count="6000"
          budgetStatus={false}
        />,
      ],
    },
    {
      heading: "Unique Data",
      widgets: [
        <BarGraphMUI
          graphHeight={400}
          graphWidth={600}
          title={"Unique Companies"}
        />,
        <BarGraphMUI
          graphHeight={400}
          graphWidth={600}
          title={"Unique Customers"}
          data={techUniqueData}
        />,
      ],
    },
    {
      heading: "Total Complaints",
      widgets: [
        <LineGraph
          graphXaxis={techAllocatedBudgetData.labels}
          graphYaxis={techTotalComplaints.datasets}
          xAxisLabel="Total Complaints"
          graphHeight={500}
          graphWidth={1180}
        />,
      ],
    },
    {
      heading: "Pending Complaints",
      widgets: [
        <LineGraph
          graphXaxis={techAllocatedBudgetData.labels}
          graphYaxis={techPendingComplaints.datasets}
          xAxisLabel="Pending Complaints"
          graphHeight={500}
          graphWidth={1180}
        />,
      ],
    },
    {
      heading: "Site Visitors",
      widgets: [
        <BarGraphMUI
          graphHeight={400}
          graphWidth={1100}
          title={"Site Visitors"}
          data={techSiteVisitors}
        />,
      ],
    },
    {
      heading: "Visitor Analytics",
      widgets: [
        <PieChartMUI data={techIndiaVisitors} />,
        <PieChartMUI data={techGoaVisitors} />,
      ],
    },
  ];

  const hrWidgets = [
    {
      heading: "Employee Overview",
      widgets: [
        <EmployeeCount count={HrWidgetsData.employeeCount} />,
        <LeaveRequests count={HrWidgetsData.leaveRequests} />,
        <NewHires count={HrWidgetsData.newHires} />,
      ],
    },
    {
      heading: "Leave Management",
      subModule: "leaves",
      widgets: [
        <LeaveWidgets />,
        <LeaveWidget2 />,
        <LeaveWidget3 />,
        <LeaveWidget4 />,
        // <AssetsCount count={customerServiceWidgetsData.totalAssets} />,
        // <MaintenanceRequests
        //   requests={customerServiceWidgetsData.pendingMaintenance}
        // />,
        // <AssetsAssigned assigned={customerServiceWidgetsData.assignedAssets} />,
        // <AssetsInRepair count={customerServiceWidgetsData.assetsInRepair} />,
        // <NewAssetsAdded added={customerServiceWidgetsData.newAssetsAdded} />,
      ],
    },
    {
      heading: "Payroll and Attendance",
      widgets: [
        <PayrollSummary amount={HrWidgetsData.payrollAmount} />,
        <AttendanceRate rate={HrWidgetsData.attendanceRate} />,
      ],
    },
  ];

  const financeWidgets = [
    <RevenueVsExpensesWidget />,
    <ProgressDoughnutWidget />,
    <BarGraphWidget />,
    // <BarGraphWidget />,
  ];

  const itWidgetsData = {
    pcFixes: 120, // Number of PCs fixed
    pcFixesProgress: 75, // Progress of PC fixes (percentage)
    pcFixesPending: 25, // Pending PC repairs (number of pending repairs)
    wifiConfig: 35, // Number of WiFi configurations
    wifiTraffic: 150, // Total WiFi traffic in GB
    networkIssues: 45, // Number of network issues resolved
  };

  const itWidgets = [
    {
      heading: "PC Maintenance",
      widgets: [
        <PCFixes count={itWidgetsData.pcFixes} />,
        <PCFixesProgress progress={itWidgetsData.pcFixesProgress} />,
        <PCFixesPending pendingCount={itWidgetsData.pcFixesPending} />,
      ],
    },
    {
      heading: "WiFi & Network",
      widgets: [
        <WiFiConfiguration count={itWidgetsData.wifiConfig} />,
        <WiFiTraffic traffic={itWidgetsData.wifiTraffic} />,
        <NetworkIssuesResolved count={itWidgetsData.networkIssues} />,
      ],
    },
    {
      heading: "Overview",
      widgets: [<PCFixesLineGraph />, <DoughnutChart />],
    },
  ];

  const customerServiceWidgetsData = {
    totalAssets: 200,
    pendingMaintenance: 15,
    assignedAssets: 120,
    assetsInRepair: 5,
    newAssetsAdded: 10,
  };

  const customerServiceWidgetsTicketData = {
    totalAssets: 200,
    pendingMaintenance: 15,
    assignedAssets: 120,
    assetsInRepair: 5,
    newAssetsAdded: 10,
  };

  const customerServiceWidgets = [
    {
      heading: "Asset Management",
      subModule: "asset",
      widgets: [
        <AssetsCount
          title={
            authUser.user.department.find(
              (dept) => dept.name === "TopManagement"
            )
              ? "Total Assets"
              : authUser.user.department.find((dept) => dept.name === "IT") ||
                authUser.user.department.find((dept) => dept.name === "Tech")
              ? "IT Assets"
              : "Maintainence Assets"
          }
          route={"/it/asset/manage"}
          count={customerServiceWidgetsData.totalAssets}
        />,
        // ...(user.department !== "TopManagement"
        //   ? [
        //       <MaintenanceRequests
        //         route={"/customer/asset/manage"}
        //         requests={customerServiceWidgetsData.pendingMaintenance}
        //       />,
        //     ]
        //   : []), // Conditionally include MaintenanceRequests
        <AssetsAssigned
          route={"/it/asset/manage"}
          assigned={customerServiceWidgetsData.assignedAssets}
        />,
        <AssetsInRepair
          route={"/it/asset/manage"}
          count={customerServiceWidgetsData.assetsInRepair}
        />,
      ],
    },
    {
      heading: "Ticket Management",
      subModule: "ticket",
      widgets: [
        <TicketWidget />,
        <TicketWidget2 />,
        <TicketWidget3 />,
        // <TicketWidget4 />,
        // <AssetsCount count={customerServiceWidgetsData.totalAssets} />,
        // <MaintenanceRequests
        //   requests={customerServiceWidgetsData.pendingMaintenance}
        // />,
        // <AssetsAssigned assigned={customerServiceWidgetsData.assignedAssets} />,
        // <AssetsInRepair count={customerServiceWidgetsData.assetsInRepair} />,
        // <NewAssetsAdded added={customerServiceWidgetsData.newAssetsAdded} />,
      ],
    },
  ];

  const [isAvailable, setIsAvailable] = useState(true);

  const toggleStatus = () => {
    setIsAvailable((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <TestSide />
      <ModuleSidebar />

      <div className="w-full overflow-y-auto bg-gray-100 h-[90vh]">
        {/* Frontend submodules */}
        {location.pathname.startsWith("/frontend") && (
          <>
            {location.pathname === "/frontend" ||
            location.pathname === "/frontend/dashboard" ? (
              <div>
                <div className="bg-gray-100 p-4 rounded-lg h-screen overflow-auto w-full">
                  <h1 className="text-3xl font-bold mb-4">
                    Frontend Dashboard
                  </h1>
                  {techWidgets.map((section, index) => (
                    <WidgetSection
                      key={index}
                      heading={section.heading}
                      widgets={section.widgets}
                    />
                  ))}
                </div>
              </div>
            ) : location.pathname === "/frontend/updates" ? (
              <div className="p-6">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs example"
                  variant="fullWidth"
                  indicatorColor="#0db4ea"
                  sx={{
                    border: "2px solid #ccc", // Add a border
                    borderRadius: "4px", // Optional: add rounded corners
                    "& .MuiTab-root": {
                      borderRight: "1px solid #ccc", // Add border between tabs
                    },
                    "& .MuiTab-root:last-of-type": {
                      borderRight: "none", // Remove border for the last tab
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#0db4ea", // Custom indicator color
                    },
                  }}
                >
                  <Tab label="Home" />
                  <Tab label="About" />
                  <Tab label="Gallery" />
                  <Tab label="Contact" />
                </Tabs>

                <Box sx={{ padding: 2 }}>
                  {value === 0 && (
                    <Typography variant="h6" gutterBottom>
                      Home
                    </Typography>
                  )}
                  {value === 1 && (
                    <Typography variant="h6" gutterBottom>
                      About
                    </Typography>
                  )}
                  {value === 2 && (
                    <Typography variant="h6" gutterBottom>
                      Gallery
                    </Typography>
                  )}
                  {value === 3 && (
                    <Typography variant="h6" gutterBottom>
                      Contact
                    </Typography>
                  )}
                </Box>

                <Box sx={{ padding: 2 }}>
                  {/* Modern Content Examples */}
                  {value === 0 && (
                    <Typography variant="body1">
                      <p>Edit home section of the website here</p>
                    </Typography>
                  )}
                  {value === 1 && (
                    <Typography variant="body1">
                      <p>Edit about section of the website here</p>
                    </Typography>
                  )}
                  {value === 2 && (
                    <Typography variant="body1">
                      <p>Edit Gallery section of the website here</p>
                    </Typography>
                  )}
                  {value === 3 && (
                    <Typography variant="body1">
                      <p>Edit Contact section of the website here</p>
                    </Typography>
                  )}
                </Box>
              </div>
            ) : location.pathname === "/frontend/themes" ? (
              <div className="p-6 w-full">
                <h2 className="text-2xl font-bold mb-6">Themes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className="bg-gray-100 rounded-lg shadow-md overflow-visible hover:shadow-lg transition-shadow"
                    >
                      <div className="w-full h-full overflow-hidden rounded-md">
                        <img
                          src={theme.image}
                          alt={theme.name}
                          onClick={() =>
                            navigate(`/frontend/themes/view-theme/${theme.id}`)
                          }
                          className="w-full h-56 object-cover transform hover:scale-110 transition duration-300 hover:cursor-pointer"
                        />
                      </div>

                      {/* <div className="p-4">
                        <h3 className="text-lg font-semibold">{theme.name}</h3>
                        <button
                          onClick={() =>
                            navigate(`/frontend/themes/view-theme/${theme.id}`)
                          }
                          className="mt-4 w-full wono-blue-dark text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                          View Details
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            ) : location.pathname.includes("/frontend/themes/view-theme/") &&
              selectedTheme ? (
              <>
                <div className="p-6 w-full">
                  <h2 className="text-2xl font-bold mb-6">
                    {selectedTheme.name}
                  </h2>
                  <div className="flex flex-col lg:flex-row justify-between gap-16">
                    <div className="h-[45vh] flex flex-col justify-between">
                      <h1 className="text-3xl font-semibold">INCLUSIONS</h1>
                      {/* <p className="text-gray-700 mb-3">
                        {selectedTheme.description}
                      </p> */}
                      <ul className="list-disc pl-5 my-3 text-xl">
                        {selectedTheme.features.map((feature, index) => (
                          <li key={index} className="text-gray-600">
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col justify-between gap-2">
                        {/* <button
                          onClick={() => {
                            setOpen(true);
                          }}
                          className="wono-blue-dark w-[50%] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                          View Demo
                        </button> */}

                        <button
                          onClick={() =>
                            window.open(selectedTheme.demoLink, "_blank")
                          }
                          className="wono-blue-dark text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                          View Demo
                        </button>
                        <button
                          onClick={() =>
                            navigate("/frontend/themes/edit-template", {
                              state: { template: selectedTheme },
                            })
                          }
                          className="wono-blue-dark w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <img
                        src={selectedTheme.image}
                        alt={selectedTheme.name}
                        className="w-full  lg:rounded-lg lg:h-full shadow-md object-cover"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/frontend/themes")}
                    className="mt-8 text-blue-500 underline"
                  >
                    Go Back
                  </button>
                </div>

                <NewModal open={open} onClose={handleClose}>
                  <div className="motion-preset-expand w-full h-full">
                    <div className="flex justify-end mb-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={handleClose}
                        className="p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
                      >
                        <IoMdClose />
                      </motion.button>
                    </div>
                    <iframe
                      src={selectedTheme.demoLink}
                      title="Theme Demo"
                      className="w-full h-full rounded-lg shadow-md"
                    ></iframe>
                  </div>
                </NewModal>
              </>
            ) : location.pathname.includes("/frontend/themes/edit-template") ? (
              <div>
                <div>
                  <EditTemplate />
                </div>
              </div>
            ) : location.pathname === "/frontend/budget" ? (
              <div>
                <div>
                  <Budget />
                </div>
              </div>
            ) : location.pathname === "/frontend/budget/overview" ? (
              <div>
                <div>
                  <Budget />
                </div>
              </div>
            ) : location.pathname === "/frontend/budget/payment-tracker" ? (
              <div>
                <div>
                  <Budget />
                </div>
              </div>
            ) : (
              <div className="p-6">Doesn't exist</div>
            )}
          </>
        )}
        {}

        {/* HR submodules */}
        {location.pathname.startsWith("/hr") && (
          <>
            {location.pathname === "/hr" ||
            location.pathname === "/hr/dashboard" ? (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4">
                {hrWidgets.map((section, index) => (
                  <WidgetSection
                    key={index}
                    heading={section.heading}
                    widgets={section.widgets}
                  />
                ))}
              </div>
            ) : location.pathname === "/hr/onboarding" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4"></div>
                  <Onboarding />
                </div>
              </>
            ) : location.pathname === "/hr/company-settings" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4"></div>
                  <CompanySettings />
                </div>
              </>
            ) : location.pathname === "/hr/attendance" ? (
              <>
                <AttendanceDash />
              </>
            ) : location.pathname === "/hr/leaves" ? (
              <>
                {/* Leave Widgets */}
                {/* <LeaveWidgets /> */}

                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <div className="mb-8 flex justify-between">
                    <h1 className="text-3xl  font-bold">Key Insights</h1>
                    {/* <div className=" flex gap-4">
                

                      {user.role === "Employee" && user.department === "IT" && (
                        <div>
                          <span className="text-2xl">Status: </span>
                          <button
                            onClick={toggleStatus}
                            className={`px-6 py-2 rounded-lg text-white transition-shadow shadow-md hover:shadow-lg active:shadow-inner ${
                              isAvailable
                                ? "bg-green-400 hover:bg-green-300"
                                : "bg-red-400 hover:bg-red-300"
                            }`}>
                            {isAvailable ? "Available" : "Unavailable"}
                          </button>
                        </div>
                      )}
                 

                      <button
                        onClick={handleOpenTicket}
                        className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                        Raise Ticket
                      </button>
                    </div> */}
                  </div>

                  {hrWidgets
                    .filter((section) => section.subModule === "leaves")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}
                  {authUser.user.role === "Admin" && (
                    <div className="flex w-full flex-1 flex-grow gap-x-4">
                      {/* <TicketsRemainingWidget
                      totalStock={120}
                      remainingStock={100}
                      assetType="Tickets"
                    />

                    <TicketsRemainingWidget
                      totalStock={3}
                      remainingStock={1}
                      assetType="Available Members"
                    /> */}
                    </div>
                  )}
                  {/* <AssetAllocationWidget /> */}
                  <div className=" ">
                    <div className="flex w-full p-4 pb-4 pl-0 text-lg border-b-0  gap-4">
                      <h2 className="text-2xl  font-bold ">Pending Leaves</h2>
                    </div>
                    {/* <p>Today's tickets Table Component</p> */}
                    {/* <TodaysTickets /> */}
                    {/* <MyTickets /> */}
                    <PendingLeaves />
                  </div>
                  {/* <p>x</p> */}
                </div>

                {/* <p>Leave Widgets Here</p> */}
                {/* Pending Leaves */}
                {/* <p>Pending Leaves Here</p> */}
              </>
            ) : location.pathname === "/hr/leaves/pending-leaves" ? (
              <>
                <PendingLeaves />
              </>
            ) : location.pathname === "/hr/leaves/my-leaves" ? (
              <>
                {/* <MyLeaves /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4">
                    <h2 className="text-2xl  font-bold ">My Leaves</h2>
                  </div>
                  <PendingLeaves />
                </div>
              </>
            ) : location.pathname === "/hr/leaves/leave-reports" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4">
                    <h2 className="text-2xl  font-bold ">Leave Reports</h2>
                  </div>
                  <PendingLeaves />
                </div>
              </>
            ) : location.pathname === "/hr/payslips" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4">
                    <h2 className="text-2xl  font-bold ">Payslip</h2>
                  </div>
                  <Payslips />
                </div>
              </>
            ) : location.pathname === "/hr/sops" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4">
                    <h2 className="text-2xl  font-bold ">SOPs</h2>
                  </div>
                  <Sops />
                </div>
              </>
            ) : location.pathname === "/hr/policies" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4">
                    <h2 className="text-2xl  font-bold ">Policies</h2>
                  </div>
                  <Policies />
                </div>
              </>
            ) : location.pathname === "/hr/holidays" ? (
              <>
                {/* <LeaveReports /> */}
                <div className="bg-gray-100 p-4 rounded-lg ">
                  <div className="flex w-full  pb-4 pl-0 text-lg border-b-0  gap-4">
                    <h2 className="text-2xl  font-bold ">Holidays</h2>
                  </div>
                  <Holidays />
                </div>
              </>
            ) : location.pathname === "/hr/payroll" ? (
              <>
                <PayRollDash />
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {/* Finance submodules */}
        {location.pathname.startsWith("/finance") && (
          <>
            {(location.pathname === "/finance" ||
              location.pathname === "/finance/dashboard") && (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4">
                <WidgetSection heading="Finance" widgets={financeWidgets} />
              </div>
            )}
          </>
        )}
        {/* Sales submodules */}
        {location.pathname.startsWith("/sales") && (
          <>
            {(location.pathname === "/sales" ||
              location.pathname === "/sales/dashboard") && (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4">
                {salesWidgets.map((section, index) => (
                  <WidgetSection
                    key={index}
                    heading={section.heading}
                    widgets={section.widgets}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {/* IT submodules */}
        {location.pathname.startsWith("/it") && (
          <>
            {location.pathname === "/it" ||
            location.pathname === "/it/dashboard" ? (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4 flex flex-col gap-4">
                <div className="bg-white rounded-md p-2">
                  {customerServiceWidgets
                    .filter((section) => section.subModule === "asset")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}

                  <div className="flex w-full flex-1 flex-grow gap-x-4">
                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={30}
                      assetType="Laptops"
                    />

                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={10}
                      assetType="Mobiles"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-md p-2">
                  {customerServiceWidgets
                    .filter((section) => section.subModule === "ticket")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}
                </div>

                <div className="bg-white rounded-md p-2">
                  <RoomBookingDash />
                </div>

                {itWidgets.map((section, index) => (
                  <WidgetSection
                    key={index}
                    heading={section.heading}
                    widgets={section.widgets}
                  />
                ))}
              </div>
            ) : location.pathname === "/it/kpi" ? (
              <>
                <div className="bg-gray-100 p-4 rounded-lg  mt-4 h-[90vh] overflow-y-auto">
                  <div className="mb-8 flex justify-between">
                    <h1 className="text-3xl font-semibold">Key Insights</h1>
                  </div>
                  {customerServiceWidgets
                    .filter((section) => section.subModule === "asset")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}
                  <div className="flex w-full flex-1 flex-grow gap-x-4">
                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={30}
                      assetType="Laptops"
                    />

                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={10}
                      assetType="Mobiles"
                    />
                  </div>

                  <AssetAllocationWidget />
                </div>
              </>
            ) : location.pathname === "/it/asset/view" ? (
              <>
                <ViewAssets />
              </>
            ) : location.pathname === "/it/asset/reports" ? (
              <>
                <AssetReports />
              </>
            ) : location.pathname === "/it/asset/manage" ? (
              <>
                <ManageAsset />
              </>
            ) : location.pathname === "/it/asset/my-assets" ? (
              <>
                <MyAssets />
              </>
            ) : location.pathname === "/it/asset/details" ? (
              <>
                <AssetsData />
              </>
            ) : location.pathname === "/it/tickets" ? (
              <>
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <div className="mb-8 flex justify-between">
                    <h1 className="text-3xl  font-bold">Key Insights</h1>
                    {/* <div className=" flex gap-4">
                

                      {user.role === "Employee" && user.department === "IT" && (
                        <div>
                          <span className="text-2xl">Status: </span>
                          <button
                            onClick={toggleStatus}
                            className={`px-6 py-2 rounded-lg text-white transition-shadow shadow-md hover:shadow-lg active:shadow-inner ${
                              isAvailable
                                ? "bg-green-400 hover:bg-green-300"
                                : "bg-red-400 hover:bg-red-300"
                            }`}>
                            {isAvailable ? "Available" : "Unavailable"}
                          </button>
                        </div>
                      )}
                 

                      <button
                        onClick={handleOpenTicket}
                        className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                        Raise Ticket
                      </button>
                    </div> */}
                  </div>
                  {customerServiceWidgets
                    .filter((section) => section.subModule === "ticket")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}

                  {["Admin", "Super Admin", "Master Admin"].includes(
                    authUser.user.role.roleTitle
                  ) && (
                    <div className="flex w-full flex-1 flex-grow gap-x-4">
                      <TicketsRemainingWidget
                        totalStock={120}
                        remainingStock={100}
                        assetType="Tickets"
                      />

                      <TicketsRemainingWidget
                        totalStock={3}
                        remainingStock={1}
                        assetType="Available Members"
                      />
                    </div>
                  )}

                  {/* <AssetAllocationWidget /> */}

                  <div className=" ">
                    <div className="flex w-full p-4 pb-4 pl-0 text-lg border-b-0 gap-4">
                      {/* <h2 className="text-2xl font-bold">My Tickets</h2> */}
                      <h2 className="text-2xl font-bold">
                        {/* Tickets Received Today */}
                        Tickets Raised Today
                      </h2>
                      <button
                        className="py-1 px-2 text-sm wono-blue-dark text-white rounded-md"
                        onClick={() => navigate("/it/tickets/my-tickets")}
                      >
                        View All
                      </button>
                    </div>
                    {/* <p>Today's tickets Table Component</p> */}
                    {/* <TodaysTickets /> */}
                    <MyTickets />
                  </div>
                  {/* <p>x</p> */}
                </div>
              </>
            ) : location.pathname === "/it/tickets/my-tickets" ? (
              <>
                <MyTicketsPage />
              </>
            ) : location.pathname === "/it/tickets/view-tickets" ? (
              <>
                <ViewTickets />
              </>
            ) : location.pathname === "/it/tickets/members" ? (
              <>
                <TicketMembers />
              </>
            ) : location.pathname === "/it/tickets/ticket-reports" ? (
              <>
                <TicketReports />
              </>
            ) : location.pathname === "/it/tickets/all-tickets" ? (
              <>
                <AllTickets />
              </>
            ) : location.pathname === "/it/meetings" ? (
              <>
                <RoomBookingDash />
              </>
            ) : location.pathname === "/it/meetings/booking" ? (
              <>
                <Listing />
              </>
            ) : location.pathname === "/it/meetings/add-room" ? (
              <>
                <AddRooms />
              </>
            ) : location.pathname === "/it/meetings/reports" ? (
              <>
                <BookingReports />
              </>
            ) : (
              <></>
            )}
          </>
        )}
        {location.pathname === "/tasks" ||
        location.pathname === "/tasks/dashboard" ? (
          <Task />
        ) : location.pathname === "/tasks/tasklistfirstmenu" ? (
          <Tasklistfirstmenu />
        ) : location.pathname === "/tasks/teams" ? (
          <>
            <Teams />
          </>
        ) : location.pathname === "/tasks/mytasks" ? (
          <>
            <Mytasks />
          </>
        ) : location.pathname === "/tasks/tasklist" ? (
          <>
            <Tasklist />
          </>
        ) : location.pathname === "/tasks/tasklisttable" ? (
          <>
            <TasklistTable />
          </>
        ) : (
          <></>
        )}
      </div>
      <div></div>
      <div>
        {/* <Button onClick={handleOpenTicket}>Open modal</Button> */}
        <Modal
          open={openTicket}
          onClose={handleCloseTicket}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* <Box sx={style}> */}
          <Box sx={style}>
            <AddTicketForm />
            <div className="col-span-2 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
                // onClick={handleCloseTicket}
                onClick={handleTwo}
                // onClick={() => navigate("/customer/tickets")}
              >
                Save
              </motion.button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DepartmentDash;
