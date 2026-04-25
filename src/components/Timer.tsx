import { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
          new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
          alert('설정한 시간이 완료되었습니다!');
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
    setMinutes(inputMinutes);
    setSeconds(0);
  };

  const handleSetTime = () => {
    setMinutes(inputMinutes);
    setSeconds(0);
    setIsEditing(false);
    setIsActive(false);
  };

  return (
    <div className="timer-card glass-card">
      <div className="timer-header">
        <h3>Focus Timer</h3>
        <button className="edit-toggle" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Set Time'}
        </button>
      </div>

      {isEditing ? (
        <div className="timer-setup">
          <input 
            type="number" 
            value={inputMinutes} 
            onChange={(e) => setInputMinutes(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="120"
          />
          <span>min</span>
          <button onClick={handleSetTime} className="timer-btn start">Apply</button>
        </div>
      ) : (
        <div className="time-display">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      )}

      {!isEditing && (
        <div className="timer-controls">
          <button onClick={toggleTimer} className={`timer-btn ${isActive ? 'pause' : 'start'}`}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} className="timer-btn reset">Reset</button>
        </div>
      )}
    </div>
  );
};

export default Timer;
