import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); 
  const intervalRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClockIn = () => {
    if (!isRunning && !isPaused) {
      // Start the timer for the first time
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        elapsedTimeRef.current += 1;
        setTimer(formatTime(elapsedTimeRef.current));
      }, 1000);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      // Pause the timer
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (isPaused) {
      // Resume the timer
      setIsRunning(true);
      setIsPaused(false);
      intervalRef.current = setInterval(() => {
        elapsedTimeRef.current += 1;
        setTimer(formatTime(elapsedTimeRef.current));
      }, 1000);
    }
  };

  const handleClockOut = () => {
    if (isRunning || isPaused) {
      // Stop the timer completely
      clearInterval(intervalRef.current);
      setTimer("00:00");
      elapsedTimeRef.current = 0;
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <TimerContext.Provider
      value={{
        timer,
        isRunning,
        isPaused,
        handleClockIn,
        handlePause,
        handleResume,
        handleClockOut,
        handlePause,
        handleResume,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
