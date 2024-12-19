import React, { useState, useEffect } from "react";
import RecurringClientsWidget from "../Widgets/RecurringClientsWidget";
import SalesProgressWidget from "../Widgets/SalesProgressWidget";
import SalesTargetWidget from "../Widgets/SalesTargetWidget";
import RevenueVsExpensesWidget from "../Widgets/RevenueVsExpensesWidget";
import ProgressDoughnutWidget from "../Widgets/ProgressDoughnutWidget";
import BarGraphWidget from "../Widgets/BarGraphWidget";
import useAuth from "../hooks/useAuth";
import {
  ActiveTickets,
  PendingTasks,
  ResolvedIssues,
  ServerUptime,
  CriticalAlerts,
} from "../Widgets/TechWidgets";
import DoughnutChart from "../Widgets/DoughnutGraph";

import {
  RecurringClients,
  SalesProgress,
  SalesTarget,
  SalesByMonthGraph,
  SalesTrendGraph,
  SalesDistributionGraph,
} from "../Widgets/SalesWidgets";
import {
  PCFixes,
  WiFiConfiguration,
  WiFiTraffic,
  NetworkIssuesResolved,
  PCFixesPending,
  PCFixesProgress,
  PCFixesLineGraph,
} from "../Widgets/ITWidgets";
import Sidetest from "../components/Sidetest";
import TestSide from "../components/Sidetest";

export const WidgetSection = ({ heading, widgets }) => (
  <div className="mt-0">
    <h2 className="text-2xl font-semibold">{heading}</h2>
    <div
      className={`grid gap-4 mt-3
    grid-cols-1
    sm:grid-cols-${Math.min(widgets.length, 2)}
    md:grid-cols-${Math.min(widgets.length, 3)}
    lg:grid-cols-${Math.min(widgets.length, 4)}
    
  `}
    >
      {widgets.map((Widget, index) => (
        <div
          key={index}
          className="bg-white p-0 shadow-md rounded-lg w-full h-full overflow-auto motion-preset-expand"
        >
          {Widget}
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const { auth } = useAuth();

  const techWidgetsData = {
    activeTickets: 8,
    pendingTasks: 5,
    resolvedIssues: 20,
    serverUptime: "99.8%",
    criticalAlerts: 2,
  };

  // Random Data for Sales Widgets
  const salesWidgetsData = {
    recurringClients: 120,
    salesProgress: 75,
    salesTarget: 50000, // Example target value in dollars
  };

  const itWidgetsData = {
    pcFixes: 120, // Number of PCs fixed
    pcFixesProgress: 75, // Progress of PC fixes (percentage)
    pcFixesPending: 25, // Pending PC repairs (number of pending repairs)
    wifiConfig: 35, // Number of WiFi configurations
    wifiTraffic: 150, // Total WiFi traffic in GB
    networkIssues: 45, // Number of network issues resolved
  };

  const allWidgets = {
    Sales: [
      <RecurringClientsWidget />,
      <SalesProgressWidget />,
      <SalesTargetWidget />,
    ],
    Finance: [
      <RevenueVsExpensesWidget />,
      <ProgressDoughnutWidget />,
      <BarGraphWidget />,
    ],
    Tech: [
      <ActiveTickets count={techWidgetsData.activeTickets} />,
      <PendingTasks count={techWidgetsData.pendingTasks} />,
      <ResolvedIssues count={techWidgetsData.resolvedIssues} />,
    ],
    IT: [<PCFixesLineGraph />],
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

  const financeWidgets = [
    <RevenueVsExpensesWidget />,
    <ProgressDoughnutWidget />,
    <BarGraphWidget />,
    // <BarGraphWidget />,
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

  console.log(auth)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <ClientSidebar className="sticky top-0" /> */}
      {/* <div className="sticky top-10">

      <Sidetest />
      </div> */}

      <TestSide />

      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {/* Heading 1 */}
        <h1 className="text-3xl motion-preset-slide-right-md font-bold">
          {auth?.user?.name}'s Dashboard
        </h1>
        <h2 className="my-5 motion-preset-slide-right-md">
          BIZ Nest-{auth?.user?.role?.roleTitle}-
          {auth.user.department.length > 1
            ? auth.user.department.map((dept) => dept.name).join(", ")
            : auth.user.department[0].name}
        </h2>

        {/* Conditionally render widgets based on user role */}
        {(auth.user.role.roleTitle === "Master-Admin" ||
          auth.user.role.roleTitle === "Super-Admin") && (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Sales Widget */}
            <div className="bg-white p-4  rounded-lg  ">
              <WidgetSection heading="Sales" widgets={allWidgets.Sales} />
            </div>

            {/* Finance Widget */}
            <div className="bg-white p-4  rounded-lg  ">
              <WidgetSection heading="Finance" widgets={allWidgets.Finance} />
            </div>

            {/* Other Widgets */}
            <div className="bg-white p-4  rounded-lg  ">
              <WidgetSection heading="Tech" widgets={allWidgets.Tech} />
            </div>
            <div className="bg-white p-4  rounded-lg  ">
              <WidgetSection heading="IT" widgets={allWidgets.IT} />
            </div>
          </div>
        )}

        {/* For Admin or Employee, display only Sales section */}
        {auth.user.department === "Sales" && (
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

        {auth.user.department === "Finance" && (
          <div className="bg-white p-4 rounded-lg  ">
            <WidgetSection heading="Finance" widgets={financeWidgets} />
          </div>
        )}

        {auth.user.department === "HR" && (
          <div className="bg-white p-4 rounded-lg  ">
            <WidgetSection heading="HR" widgets={salesWidgets} />
          </div>
        )}

        {auth.user.department === "Tech" && (
          <div className="bg-white p-4 rounded-lg  mt-4">
            {techWidgets.map((section, index) => (
              <WidgetSection
                key={index}
                heading={section.heading}
                widgets={section.widgets}
              />
            ))}
          </div>
        )}
        {auth.user.department === "IT" && (
          <div className="bg-white p-4 rounded-lg  mt-4">
            {itWidgets.map((section, index) => (
              <WidgetSection
                key={index}
                heading={section.heading}
                widgets={section.widgets}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
