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
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio API 초기화 (사용자 제스처 시 호출)
  const initAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      try {
        const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
        const ctx = new AudioContextClass();
        const gainNode = ctx.createGain();
        const source = ctx.createMediaElementSource(audioRef.current);

        source.connect(gainNode).connect(ctx.destination);
        
        audioContextRef.current = ctx;
        gainNodeRef.current = gainNode;
      } catch (e) {
        console.error("Web Audio API init failed:", e);
      }
    }
    
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const adjustedVolume = forceMute ? 0 : Math.pow(volume, 2);

    // 1. Web Audio API 방식 (지원되는 경우)
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        adjustedVolume, 
        audioContextRef.current.currentTime, 
        0.05
      );
    } 
    
    // 2. 표준 방식 폴백 (둘 다 적용하여 모바일 호환성 극대화)
    audioRef.current.volume = adjustedVolume;

    if (adjustedVolume > 0) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // 자동 재생 방지 정책 대응
          console.warn("Playback prevented:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [forceMute, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    initAudioContext(); // 슬라이더 조작 시 컨텍스트 활성화
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''} ${forceMute && volume > 0 ? 'waiting' : ''}`}>
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        preload="auto"
        crossOrigin="anonymous"
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
