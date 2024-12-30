import React, { useState } from "react";

const ShiftScheduleWidget = ({ schedule }) => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <div className="bg-white shadow-md rounded-lg py-4 w-full">
      <h2 className="text-xl font-semibold">Shift Schedule</h2>

      <div className="flex flex-col justify-between gap-8">
        {/* Section 1: Day Buttons */}
        <div className="flex space-x-2 overflow-x-auto pt-4 justify-between">
          {Object.keys(schedule).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-md font-medium border ${
                selectedDay === day
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Section 2: Shift Schedule Line */}
        <div className="bg-gray-50 h-full rounded-md shadow-inner flex flex-col justify-center p-4">
          <h3 className="text-lg font-semibold mb-2">
            Schedule for {selectedDay}
          </h3>
          <div className="text-gray-700">
            <p>
              <span className="font-medium">Shift Timing:</span>{" "}
              {schedule[selectedDay].shift}
            </p>
            <p>
              <span className="font-medium">Employees:</span>{" "}
              {schedule[selectedDay].employees.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftScheduleWidget;
