import React from "react";
import { useTimer } from "../../../../contexts/TimerContext";

const ClockInOut = () => {
  const {
    timer,
    handleClockIn,
    handleClockOut,
    isRunning,
    isPaused,
    handlePause,
    handleResume,
  } = useTimer();

  return (
    <div className="flex w-full items-center justify-center bg-gray-100 p-2">
      <div className="w-full bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Attendance Dashboard
        </h1>
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Clock</h2>
          <div className="space-y-6">
            <div className="text-3xl font-bold text-gray-900 flex justify-center">
              {timer}
            </div>
            <div className="flex items-center justify-center space-x-4">
              {!isRunning && !isPaused && (
                <button
                  onClick={handleClockIn}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
                >
                  Clock In
                </button>
              )}
              {isPaused && (
                <button
                  onClick={handleResume}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
                >
                  Resume
                </button>
              )}
              {isRunning && (
                <>
                  <button
                    onClick={handleClockOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
                  >
                    Clock Out
                  </button>
                  <button
                    onClick={handlePause}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
                  >
                    Break
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
