import React, { useState } from 'react'

import Game15 from './components/Game15'
import Game24 from './components/Game24'
import Game35 from './components/Game35'
import Game48 from './components/Game48'
import Game63 from './components/Game63'
import './App.css'

function App() {
  const [gameVersion, setGameVersion] = useState(15)
  const [currentTheme, setCurrentTheme] = useState('winter')

  const toggleTheme = () => {
    const themes = ['winter', 'autumn'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    // Ensure we pick a different theme if possible, though with 2 it's just a toggle mostly
    // But request said "randomly selecting different themes", so let's just pick random from list
    setCurrentTheme(randomTheme);
  }

  return (
    <div className="app">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Theme
      </button>

      {gameVersion === 15 && <Game15 gameVersion={gameVersion} setGameVersion={setGameVersion} theme={currentTheme} />}
      {gameVersion === 24 && <Game24 gameVersion={gameVersion} setGameVersion={setGameVersion} theme={currentTheme} />}
      {gameVersion === 35 && <Game35 gameVersion={gameVersion} setGameVersion={setGameVersion} theme={currentTheme} />}
      {gameVersion === 48 && <Game48 gameVersion={gameVersion} setGameVersion={setGameVersion} theme={currentTheme} />}
      {gameVersion === 63 && <Game63 gameVersion={gameVersion} setGameVersion={setGameVersion} theme={currentTheme} />}
    </div>
  )
}

export default App