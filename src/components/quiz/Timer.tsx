import React from 'react';
import { useTimer } from '../../hooks/useTimer';

interface TimerProps {
  isActive: boolean;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ isActive, onTimeUp }) => {
  const { minutes, seconds, isWarning } = useTimer(isActive, onTimeUp);

  return (
    <div className={`text-xl font-bold ${isWarning ? 'text-red-600' : 'text-gray-700'}`}>
      Time Remaining: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};