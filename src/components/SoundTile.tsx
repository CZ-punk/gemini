import { useState, useRef, useEffect } from 'react';
import './SoundTile.css';

interface SoundTileProps {
  icon: string;
  label: string;
  soundUrl: string;
  forceMute?: boolean;
}

const SoundTile = ({ icon, label, soundUrl, forceMute }: SoundTileProps) => {
  const [volume, setVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // 인간의 청각은 로그 스케일에 가깝게 반응하므로 볼륨 곡선을 조정합니다.
      const adjustedVolume = forceMute ? 0 : Math.pow(volume, 2);
      audioRef.current.volume = adjustedVolume;
      
      if (adjustedVolume > 0 && audioRef.current.paused) {
        audioRef.current.play().catch(err => console.warn("Auto-play blocked:", err));
      } else if (adjustedVolume === 0 && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  }, [forceMute, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''}`}>
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        preload="auto"
      />
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
