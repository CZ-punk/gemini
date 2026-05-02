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
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Web Audio API 초기화
  const initAudio = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new AudioContextClass();
      const gainNode = ctx.createGain();
      const source = ctx.createMediaElementSource(audioRef.current);

      source.connect(gainNode).connect(ctx.destination);
      
      audioContextRef.current = ctx;
      gainNodeRef.current = gainNode;
      sourceRef.current = source;
    }

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      // 로그 스케일 적용하여 자연스러운 볼륨 변화 구현
      const adjustedVolume = forceMute ? 0 : Math.pow(volume, 2);
      
      // GainNode를 통한 모바일 호환 볼륨 조절
      gainNodeRef.current.gain.setTargetAtTime(adjustedVolume, audioContextRef.current!.currentTime, 0.1);
      
      if (adjustedVolume > 0 && audioRef.current?.paused) {
        audioRef.current.play().catch(err => console.warn("Playback blocked:", err));
      } else if (adjustedVolume === 0 && !audioRef.current?.paused) {
        audioRef.current?.pause();
      }
    }
  }, [forceMute, volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    
    // 첫 상호작용 시 오디오 컨텍스트 초기화
    initAudio();
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''}`}>
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        preload="auto"
        crossOrigin="anonymous"
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
