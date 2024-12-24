import React from "react";

// ActiveTickets widget
const ActiveTickets = ({ count, uptime }) => (
  <div className="p-4 bg-gray-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Active Tickets</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

const CountCard = ({ count, uptime, title, totalMonths, annualCost, deptCount, monthsPeriod }) => (
  <div className="p-4  bg-gray-50 text-black rounded-lg text-start">
    <div className="border-b-2 border-gray-200">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
    <div className="flex mt-2 items-center gap-6 justify-start">
      <div>
        <h3 className="text-sm font-semibold">Annual Cost</h3>
        <p className="text-sm">{annualCost}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold">Total Members</h3>
        <p className="text-sm">{deptCount}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold">{monthsPeriod} Months</h3>
        <p className="text-sm">{totalMonths}</p>
      </div>
    </div>
  </div>
);
const BudgetApproval = ({ budgetStatus, count, title, theme }) => (
  <div className={`p-4 bg-${theme} text-white rounded-lg text-start flex justify-between h-full`}>
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
      <div className="text-end">
        <h3 className="text-md font-semibold">Approval Status</h3>
        <p className="text-sm">{budgetStatus === false ? "Pending" : "Approved"}</p>
      </div>
  </div>
);

// PendingTasks widget
const PendingTasks = ({ count }) => (
  <div className="p-4 bg-gray-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Pending Tasks</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

// ResolvedIssues widget
const ResolvedIssues = ({ count }) => (
  <div className="p-4 bg-gray-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Resolved Issues</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

// ServerUptime widget
const ServerUptime = ({ uptime }) => (
  <div className="p-4 bg-gray-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Server Uptime</h3>
    <p className="text-2xl font-bold">{uptime}</p>
  </div>
);

// CriticalAlerts widget
const CriticalAlerts = ({ count }) => (
  <div className="p-4 bg-red-700 rounded-lg text-center">
    <h3 className="text-sm font-semibold">Critical Alerts</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export {
  ActiveTickets,
  CountCard,
  BudgetApproval,
  PendingTasks,
  ResolvedIssues,
  ServerUptime,
  CriticalAlerts,
};
