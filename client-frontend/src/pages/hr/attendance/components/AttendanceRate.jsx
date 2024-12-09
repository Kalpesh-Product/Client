import React from "react";

const AttendanceRateWidget = ({ attendanceRate, increasePercentage }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">Attendance Rate</h3>
      <p className="text-2xl font-bold mt-2">{attendanceRate}%</p>
      <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
        ▲ {increasePercentage}% Increase
      </div>
    </div>
  );
};

export default AttendanceRateWidget;
