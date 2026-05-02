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
  const [isAudioContextError, setIsAudioContextError] = useState(false);

  // Web Audio API 초기화 (실패 시 일반 모드로 자동 전환)
  const setupWebAudio = () => {
    if (!audioRef.current || gainNodeRef.current || isAudioContextError) return;

    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new AudioContextClass();
      
      // CORS 문제 발생 시를 대비한 에러 핸들러
      const gainNode = ctx.createGain();
      const source = ctx.createMediaElementSource(audioRef.current);
      
      source.connect(gainNode).connect(ctx.destination);

      audioCtxRef.current = ctx;
      gainNodeRef.current = gainNode;
      console.log(`AudioContext connected for ${label}`);
    } catch (err) {
      console.warn(`Web Audio API failed for ${label}, falling back to standard audio:`, err);
      setIsAudioContextError(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const adjustedVolume = forceMute ? 0 : Math.pow(volume, 2);

    // 1. Web Audio API를 통한 볼륨 제어 (성공한 경우에만)
    if (gainNodeRef.current && audioCtxRef.current && !isAudioContextError) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      gainNodeRef.current.gain.setTargetAtTime(
        adjustedVolume, 
        audioCtxRef.current.currentTime, 
        0.05
      );
    } 
    
    // 2. 표준 볼륨 설정 (항상 설정하여 데스크탑 및 일반 재생 보장)
    // Web Audio API가 연결되어 있어도 표준 볼륨을 1로 두거나 조절하여 소리가 나오게 함
    try {
      audioRef.current.volume = adjustedVolume;
    } catch (e) {
      // iOS 등에서 volume 설정 불가 시 무시
    }

    // 재생 제어
    if (adjustedVolume > 0) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Playback blocked or failed:", error);
          // CORS 에러로 인해 Web Audio API가 차단되었을 가능성 감지
          if (error.name === 'NotSupportedError' || error.message.includes('CORS')) {
            setIsAudioContextError(true);
          }
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [forceMute, volume, isAudioContextError, label]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setupWebAudio();
  };

  return (
    <div className={`sound-tile glass-card ${volume > 0 && !forceMute ? 'active' : ''} ${forceMute && volume > 0 ? 'waiting' : ''}`}>
      <audio 
        ref={audioRef} 
        src={soundUrl} 
        loop 
        preload="auto"
        crossOrigin="anonymous" // 일단 유지하되 에러 시 fallback
        onError={() => {
          // CORS 에러 등으로 로드 실패 시 anonymous 제거 후 재시도 로직
          if (audioRef.current?.crossOrigin === 'anonymous') {
            console.warn(`CORS issue detected for ${label}, retrying without crossOrigin`);
            audioRef.current.removeAttribute('crossOrigin');
            audioRef.current.load();
            setIsAudioContextError(true);
          }
        }}
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
