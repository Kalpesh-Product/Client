import React, { useState } from "react";

const ClockInOut = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);

  const handleClockIn = () => {
    const currentTime = new Date();
    setClockInTime(currentTime.toLocaleTimeString());
  };

  const handleClockOut = () => {
    const currentTime = new Date();
    setClockOutTime(currentTime.toLocaleTimeString());
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Clock-In/Clock-Out</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Clock-In Time:</span>{" "}
            {clockInTime || "Not Clocked In"}
          </p>
          <p>
            <span className="font-medium">Clock-Out Time:</span>{" "}
            {clockOutTime || "Not Clocked Out"}
          </p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleClockIn}
            disabled={clockInTime !== null}
            className={`px-4 py-2 rounded ${
              clockInTime
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            disabled={clockInTime === null || clockOutTime !== null}
            className={`px-4 py-2 rounded ${
              !clockInTime || clockOutTime
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
