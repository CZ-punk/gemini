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
    if (!audioRef.current) return;

    // 인간의 청각은 로그 스케일에 가깝게 반응하므로 볼륨 곡선을 조정합니다.
    const adjustedVolume = forceMute ? 0 : Math.pow(volume, 2);
    
    // 직접 볼륨 설정
    audioRef.current.volume = adjustedVolume;

    if (adjustedVolume > 0) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Playback blocked by browser. User interaction required:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [forceMute, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    
    // 슬라이더를 조작하는 행위 자체가 사용자 상호작용이므로 
    // 여기서 play()를 시도하면 브라우저 락이 해제됩니다.
    if (audioRef.current && val > 0 && !forceMute) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''} ${forceMute && volume > 0 ? 'waiting' : ''}`}>
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        preload="auto"
      />
      <div className="tile-icon">{icon}</div>
      <div className="tile-info">
        <span className="tile-label">
          {label}
          {forceMute && volume > 0 && <span className="status-badge"> (Start Timer)</span>}
        </span>
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
