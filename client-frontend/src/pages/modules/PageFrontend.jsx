import React, { useState } from "react";
import ModuleSidebar from "../../components/ModuleSidebar";
import { useLocation, useParams } from "react-router-dom";
import TestSide from "../../components/Sidetest";
import {
  ActiveTickets,
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
import {
  RecurringClients,
  SalesByMonthGraph,
  SalesDistributionGraph,
  SalesProgress,
  SalesTarget,
  SalesTrendGraph,
} from "../../Widgets/SalesWidgets";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const DepartmentDash = () => {
  const location = useLocation();
  const departmentName = location.state?.departmentName;
  const { department } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const products = [
    {
      id: 1,
      name: "Theme 1",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Theme 2",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Theme 3",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Theme 4",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Theme 5",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Theme 6",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Theme 7",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Theme 8",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
  ];

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

  const techWidgets = [
    {
      heading: "Website Data",
      widgets: [
        <ActiveTickets count={techWidgetsData.activeTickets} />,
        <PendingTasks count={techWidgetsData.pendingTasks} />,
        <ResolvedIssues count={techWidgetsData.resolvedIssues} />,
      ],
    },
    {
      heading: "Personal Milestones",
      widgets: [
        <ResolvedIssues count={techWidgetsData.resolvedIssues} />,
        <ServerUptime uptime={techWidgetsData.serverUptime} />,
      ],
    },
    {
      heading: "Requirements",
      widgets: [
        <CriticalAlerts count={techWidgetsData.criticalAlerts} />,
        <DoughnutChart />,
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

  return (
    <div className="flex">
      <TestSide />
      <ModuleSidebar />

      <div className="w-full h-screen">
        {/* Frontend submodules */}
        {location.pathname.startsWith("/frontend") && (
          <>
            {(location.pathname === "/frontend" || location.pathname === "/frontend/dashboard") ? (
              <div>
                <div className="bg-white p-4 rounded-lg">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-500">{product.price}</p>
                        <button className="mt-4 w-full wono-blue-dark text-white py-2 rounded-lg hover:bg-blue-600 transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6">Doesn't exist</div>
            )}
          </>
        )}

        {/* HR submodules */}
        {location.pathname.startsWith("/hr") && (
          <>
            {(location.pathname === "/hr" || location.pathname === "/hr/dashboard")&& (
              <div className="bg-white p-4 rounded-lg  mt-4">
                {hrWidgets.map((section, index) => (
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
        {/* Finance submodules */}
        {location.pathname.startsWith("/finance") && (
          <>
            {(location.pathname === "/finance" || location.pathname === "/finance/dashboard") && (
              <div className="bg-white p-4 rounded-lg  mt-4">
                <WidgetSection heading="Finance" widgets={financeWidgets} />
              </div>
            )}
          </>
        )}
        {/* HR submodules */}
        {location.pathname.startsWith("/sales") && (
          <>
            {(location.pathname === "/sales" || location.pathname === "/sales/dashboard") && (
              <div className="bg-white p-4 rounded-lg  mt-4">
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
      </div>
    </div>
  );
};

export default DepartmentDash;
