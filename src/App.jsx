import React, { useState } from 'react'

import Game15 from './components/Game15'
import Game24 from './components/Game24'
import Game35 from './components/Game35'
import Game48 from './components/Game48'
import Game63 from './components/Game63'
import Footer from './components/Footer'
import './App.css'

import themeSwitchSound from './assets/sounds/theme_switch.mp3'

function App() {
  const [gameVersion, setGameVersion] = useState(15)
  const [currentTheme, setCurrentTheme] = useState('winter')

  const toggleTheme = () => {
    const audio = new Audio(themeSwitchSound)
    audio.play()

    const themes = ['winter', 'autumn'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    // Ensure we pick a different theme if possible, though with 2 it's just a toggle mostly
    // But request said "randomly selecting different themes", so let's just pick random from list
    setCurrentTheme(randomTheme);
  }

  const renderGame = () => {
    const commonProps = { gameVersion, setGameVersion, theme: currentTheme }
    switch (gameVersion) {
      case 15:
        return <Game15 {...commonProps} />
      case 24:
        return <Game24 {...commonProps} />
      case 35:
        return <Game35 {...commonProps} />
      case 48:
        return <Game48 {...commonProps} />
      case 63:
        return <Game63 {...commonProps} />
      default:
        return <Game15 {...commonProps} />
    }
  }

  return (
    <div className="app">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        Theme
      </button>

      {renderGame()}
    </div>
  )
}

export default App