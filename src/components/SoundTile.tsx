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
      if (forceMute) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = volume;
      }
    }
  }, [forceMute, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0) {
        // 브라우저 자동재생 정책으로 인해 사용자 상호작용 후 play 호출 필요
        audioRef.current.play().catch(err => {
          console.error("Audio play failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''}`}>
      {/* 
        crossOrigin="anonymous" 추가하여 CORS 이슈 방지
        preload="auto" 추가하여 미리 로드
      */}
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        crossOrigin="anonymous" 
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
