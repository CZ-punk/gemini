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
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio API 초기화
  const setupWebAudio = () => {
    if (!audioRef.current || gainNodeRef.current) return;

    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new AudioContextClass();
      const gainNode = ctx.createGain();
      
      // MediaElementSource 생성 (단 한 번만 실행되어야 함)
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(gainNode).connect(ctx.destination);

      audioCtxRef.current = ctx;
      gainNodeRef.current = gainNode;
    } catch (err) {
      console.error("Web Audio API setup failed:", err);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const adjustedVolume = forceMute ? 0 : Math.pow(volume, 2);

    // 1. GainNode가 설정되어 있다면 이를 통해 볼륨 조절 (모바일 핵심)
    if (gainNodeRef.current && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      gainNodeRef.current.gain.setTargetAtTime(
        adjustedVolume, 
        audioCtxRef.current.currentTime, 
        0.05
      );
    }

    // 2. 표준 볼륨 설정 (데스크탑 호환성)
    audioRef.current.volume = adjustedVolume;

    // 재생 제어
    if (adjustedVolume > 0) {
      audioRef.current.play().catch(() => {
        // 자동 재생 차단 시 무시
      });
    } else {
      audioRef.current.pause();
    }
  }, [forceMute, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    
    // 사용자가 슬라이더를 건드리는 순간 Web Audio API 활성화
    setupWebAudio();
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''} ${forceMute && volume > 0 ? 'waiting' : ''}`}>
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        preload="auto"
        crossOrigin="anonymous" // Web Audio API 처리를 위해 필수
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
