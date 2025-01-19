import { useState, useEffect, useCallback } from 'react';

const QUIZ_TIME = 30 * 60; // 30 minutes in seconds

export const useTimer = (isActive: boolean, onTimeUp: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return {
      minutes,
      seconds,
      formatted: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      isWarning: timeRemaining < 300, // Less than 5 minutes
      isLow: timeRemaining < 60 // Less than 1 minute
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining, onTimeUp]);

  return {
    ...formatTime(),
    timeRemaining
  };
};