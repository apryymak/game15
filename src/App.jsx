import React, { useState } from 'react'

import Game15 from './components/Game15'
import Game24 from './components/Game24'
import Game35 from './components/Game35'
import Game48 from './components/Game48'
import Game63 from './components/Game63'
import './App.css'

import Season from './components/Season'

function App() {
  const [gameVersion, setGameVersion] = useState(15)

  const getSeason = (version) => {
    switch (version) {
      case 15: return 'autumn'
      case 24: return 'winter'
      case 35: return 'spring'
      case 48: return 'summer'
      case 63: return 'autumn'
      default: return 'autumn'
    }
  }

  return (
    <div className="app">
      <Season season={getSeason(gameVersion)} />

      {gameVersion === 15 && <Game15 gameVersion={gameVersion} setGameVersion={setGameVersion} />}
      {gameVersion === 24 && <Game24 gameVersion={gameVersion} setGameVersion={setGameVersion} />}
      {gameVersion === 35 && <Game35 gameVersion={gameVersion} setGameVersion={setGameVersion} />}
      {gameVersion === 48 && <Game48 gameVersion={gameVersion} setGameVersion={setGameVersion} />}
      {gameVersion === 63 && <Game63 gameVersion={gameVersion} setGameVersion={setGameVersion} />}
    </div>
  )
}

export default App