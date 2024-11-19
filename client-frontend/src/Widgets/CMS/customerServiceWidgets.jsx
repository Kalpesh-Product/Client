// customerServiceWidgets.jsx
import React from "react";

export const AssetsCount = ({ count }) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold">Total Assets</h3>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export const MaintenanceRequests = ({ requests }) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold">Pending Maintenance</h3>
    <p className="text-2xl">{requests} Requests</p>
  </div>
);

export const AssetsAssigned = ({ assigned }) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold">Assets Assigned</h3>
    <p className="text-2xl">{assigned}</p>
  </div>
);

export const AssetsInRepair = ({ count }) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold">Assets In Repair</h3>
    <p className="text-2xl">{count}</p>
  </div>
);

export const NewAssetsAdded = ({ added }) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold">New Assets Added</h3>
    <p className="text-2xl">{added}</p>
  </div>
);
