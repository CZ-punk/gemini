import { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          clearInterval(interval);
          alert('수고하셨습니다! 잠시 휴식하세요.');
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="timer-card glass-card">
      <h3>Focus Timer</h3>
      <div className="time-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer} className={`timer-btn ${isActive ? 'pause' : 'start'}`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="timer-btn reset">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
