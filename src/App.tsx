import { useState, useEffect } from 'react';
import './App.css';
import SoundTile from './components/SoundTile';
import Timer from './components/Timer';

function App() {
  const [bgStyle, setBgStyle] = useState('day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) setBgStyle('day');
    else setBgStyle('night');
  }, []);

  return (
    <div className={`zen-app ${bgStyle}`}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <main className="zen-container">
        <header className="zen-header">
          <h1>Zen Space</h1>
          <p>당신만의 완벽한 몰입의 순간</p>
        </header>

        <div className="zen-content">
          <section className="mixer-section">
            <div className="sound-grid">
              <SoundTile icon="🌧" label="Rain" soundUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
              <SoundTile icon="🌲" label="Forest" soundUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />
              <SoundTile icon="🌊" label="Waves" soundUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" />
              <SoundTile icon="🔥" label="Fire" soundUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" />
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
