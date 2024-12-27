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

  // Dummy data for elapsed hours and breaks
  const elapsedHours = "4h 25m";
  const breakDuration = "30m";

  return (
    <div className="flex w-full items-center justify-center bg-gray-100 py-6">
      <div className="w-full  bg-white shadow-xl rounded-lg p-6">
   

        <div className="flex flex-wrap gap-6">
          {/* Clock Section */}
          <div className="flex-1 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Clock
            </h2>
            <div className="space-y-6">
              <div className="text-4xl font-extrabold text-gray-900 flex justify-center">
                {timer}
              </div>
              <div className="flex items-center justify-center space-x-4">
                {!isRunning && !isPaused && (
                  <button
                    onClick={handleClockIn}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition duration-200"
                  >
                    Clock In
                  </button>
                )}
                {isPaused && (
                  <button
                    onClick={handleResume}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition duration-200"
                  >
                    Resume
                  </button>
                )}
                {isRunning && (
                  <>
                    <button
                      onClick={handleClockOut}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition duration-200"
                    >
                      Clock Out
                    </button>
                    <button
                      onClick={handlePause}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition duration-200"
                    >
                      Break
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Synopsis Section */}
          <div className="flex-1 border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Synopsis
            </h2>
            <div className="space-y-4">
              <div className="text-lg font-medium text-gray-800">
                Elapsed Time: <span className="text-gray-600">{elapsedHours}</span>
              </div>
              <div className="text-lg font-medium text-gray-800">
                Break Duration: <span className="text-gray-600">{breakDuration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
