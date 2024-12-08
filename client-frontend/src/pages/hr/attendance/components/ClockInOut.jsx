import React, { useState, useRef, useEffect } from "react";

const ClockInOut = () => {
  const [timer, setTimer] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const elapsedTimeRef = useRef(0); // To store total elapsed time in seconds

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClockIn = () => {
    const currentTime = Date.now(); // Timestamp in milliseconds
    localStorage.setItem("clockInTime", currentTime);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - currentTime) / 1000);
      setTimer(formatTime(elapsedTime));
    }, 1000);
  };

  useEffect(() => {
    const savedClockInTime = localStorage.getItem("clockInTime");
    if (savedClockInTime) {
      const elapsedTime = Math.floor((Date.now() - savedClockInTime) / 1000);
      setTimer(formatTime(elapsedTime));
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - savedClockInTime) / 1000);
        setTimer(formatTime(elapsed));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClockOut = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      console.log("Total Time:", timer);
      setTimer("00:00");
      elapsedTimeRef.current = 0;
      setIsRunning(false);
      localStorage.removeItem("clockInTime")
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Clock</h2>
        <div className="space-y-4">
          <div className="text-2xl font-bold">{timer}</div>
          <div className="space-x-4">
            <button
              onClick={handleClockIn}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Clock In
            </button>
            <button
              onClick={handleClockOut}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Clock Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
