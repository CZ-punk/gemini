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

  // 더 안정적인 공개 음원 소스 (GitHub 기반 CDN)
  const sounds = [
    { icon: "🌧", label: "Rain", url: "https://raw.githubusercontent.com/Anand-S-K/Ambient-Sounds/main/sounds/rain.mp3" },
    { icon: "🌲", label: "Forest", url: "https://raw.githubusercontent.com/Anand-S-K/Ambient-Sounds/main/sounds/forest.mp3" },
    { icon: "🌊", label: "Waves", url: "https://raw.githubusercontent.com/Anand-S-K/Ambient-Sounds/main/sounds/ocean.mp3" },
    { icon: "🔥", label: "Fire", url: "https://raw.githubusercontent.com/Anand-S-K/Ambient-Sounds/main/sounds/fireplace.mp3" }
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
