import { useState, useEffect } from 'react';
import './App.css';
import SoundTile from './components/SoundTile';
import Timer from './components/Timer';

function App() {
  const [bgStyle, setBgStyle] = useState('day');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) setBgStyle('day');
    else setBgStyle('night');
  }, []);

  // jsDelivr CDN을 사용하여 MIME 타입 및 로딩 속도 최적화
  const sounds = [
    { icon: "🌧", label: "Rain", url: "https://www.gstatic.com/voice_delight/sounds/long/rain.mp3" },
    { icon: "🌲", label: "Forest", url: "https://www.gstatic.com/voice_delight/sounds/long/forest.mp3" },
    { icon: "🌊", label: "River", url: "https://www.gstatic.com/voice_delight/sounds/long/brook.mp3" },
    { icon: "🔥", label: "Fire", url: "https://www.gstatic.com/voice_delight/sounds/long/fireplace.mp3" }
  ];

  return (
    <div className={`zen-app ${bgStyle}`}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <main className="zen-container">
        <header className="zen-header">
          <div className="header-top">
            <h1>Zen Space</h1>
            <button 
              className={`master-control ${isMuted ? 'muted' : ''}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? '🔇 Resume All' : '🔊 Mute All'}
            </button>
          </div>
          <p>당신만의 완벽한 몰입의 순간</p>
        </header>

        <div className="zen-content">
          <section className="mixer-section">
            <div className="sound-grid">
              {sounds.map((sound, i) => (
                <SoundTile 
                  key={i} 
                  icon={sound.icon} 
                  label={sound.label} 
                  soundUrl={sound.url} 
                  forceMute={isMuted}
                />
              ))}
            </div>
          </section>

          <section className="timer-section">
            <Timer />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
