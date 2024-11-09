import React from 'react';

// ActiveTickets widget
const ActiveTickets = ({ count, uptime }) => (
  <div className="p-4 bg-gray-700 text-white rounded-lg text-center">
    <h3 className="text-sm font-semibold">Active Tickets</h3>
    <p className="text-2xl font-bold">{count}</p>
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



export  {ActiveTickets, PendingTasks, ResolvedIssues, ServerUptime, CriticalAlerts};
