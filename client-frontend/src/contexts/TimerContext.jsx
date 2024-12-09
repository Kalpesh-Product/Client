import React, { createContext, useState, useRef, useContext, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClockIn = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        elapsedTimeRef.current += 1;
        setTimer(formatTime(elapsedTimeRef.current));
      }, 1000);
    }
  };

  const handleClockOut = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setTimer("00:00");
      elapsedTimeRef.current = 0;
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <TimerContext.Provider value={{ timer,isRunning, handleClockIn, handleClockOut }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
