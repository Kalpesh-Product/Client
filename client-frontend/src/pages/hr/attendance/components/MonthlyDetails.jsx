import React from "react";

// Single Widget Component
const WidgetCard = ({ title, value, unit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[18rem]">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">
        {value} <span className="text-base font-medium">{unit}</span>
      </p>
    </div>
  );
};

const MonthlyDetailsWidget = ({ totalHours, lateCheckIns, avgBreakTime }) => {
  return (
    <div className="flex flex-1 gapy-4 w-full justify-between">
      {/* Total Hours Worked Widget */}
      <WidgetCard title="Total Hours Worked" value={totalHours} unit="hrs" />

      {/* Late Check-Ins Widget */}
      <WidgetCard title="Late Check-Ins" value={lateCheckIns} unit="" />

      {/* Average Break Time Widget */}
      <WidgetCard title="Average Break Time" value={avgBreakTime} unit="mins" />
      {/* Average Break Time Widget */}
      <WidgetCard title="Average Break Time" value={avgBreakTime} unit="mins" />
    </div>
  );
};

export default MonthlyDetailsWidget;
