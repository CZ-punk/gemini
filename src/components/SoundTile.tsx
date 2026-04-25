import { useState, useRef } from 'react';
import './SoundTile.css';

interface SoundTileProps {
  icon: string;
  label: string;
  soundUrl: string;
}

const SoundTile = ({ icon, label, soundUrl }: SoundTileProps) => {
  const [volume, setVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0 && audioRef.current.paused) {
        audioRef.current.play();
      } else if (val === 0) {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 ? 'active' : ''}`}>
      <audio ref={audioRef} src={soundUrl} loop />
      <div className="tile-icon">{icon}</div>
      <div className="tile-info">
        <span className="tile-label">{label}</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default SoundTile;
