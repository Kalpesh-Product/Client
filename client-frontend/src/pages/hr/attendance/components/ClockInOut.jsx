import React, { useState, useRef, useEffect } from "react";
import { useTimer } from "../../../../contexts/TimerContext";

const ClockInOut = () => {
  const { timer, handleClockIn, handleClockOut, isRunning } = useTimer();
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Clock</h2>
        <div className="space-y-4">
          <div className="text-2xl font-bold">{timer}</div>
          <div className="space-x-4">
          {!isRunning && (
              <button
              onClick={handleClockIn}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Clock In
            </button>
            ) }
            {isRunning && (
              <button
              onClick={handleClockOut}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Clock Out
            </button>
            ) }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
