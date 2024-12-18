import React from "react";

const MonthlyAttendanceOverviewWidget = ({ totalDays, daysPresent, attendanceRate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">Monthly Overview</h3>
      <div className="space-y-2 mt-4">
        <p>
          <span className="font-medium">Total Days:</span> {totalDays}
        </p>
        <p>
          <span className="font-medium">Days Present:</span> {daysPresent}
        </p>
      </div>
    </div>
  );
};

export default MonthlyAttendanceOverviewWidget;
