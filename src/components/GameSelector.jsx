import React, { useState } from 'react'
import './GameSelector.css'

const GameSelector = ({ gameVersion, setGameVersion }) => {
    const [clickedBtn, setClickedBtn] = useState(null)

    const handleClick = (version) => {
        setClickedBtn(version)
        setGameVersion(version)
        // Remove animation class after animation completes
        setTimeout(() => setClickedBtn(null), 600)
    }

    return (

        <div className="game-selector">
            <button
                className={`selector-btn ${gameVersion === 15 ? 'active' : ''} ${clickedBtn === 15 ? 'flip-in' : ''}`}
                onClick={() => handleClick(15)}
            >
                <span className="btn-content">4x4</span>
            </button>
            <button
                className={`selector-btn ${gameVersion === 24 ? 'active' : ''} ${clickedBtn === 24 ? 'flip-in' : ''}`}
                onClick={() => handleClick(24)}
            >
                <span className="btn-content">5x5</span>
            </button>
            <button
                className={`selector-btn ${gameVersion === 35 ? 'active' : ''} ${clickedBtn === 35 ? 'flip-in' : ''}`}
                onClick={() => handleClick(35)}
            >
                <span className="btn-content">6x6</span>
            </button>
            <button
                className={`selector-btn ${gameVersion === 48 ? 'active' : ''} ${clickedBtn === 48 ? 'flip-in' : ''}`}
                onClick={() => handleClick(48)}
            >
                <span className="btn-content">7x7</span>
            </button>
            <button
                className={`selector-btn ${gameVersion === 63 ? 'active' : ''} ${clickedBtn === 63 ? 'flip-in' : ''}`}
                onClick={() => handleClick(63)}
            >
                <span className="btn-content">8x8</span>
            </button>
        </div>
    )
}

export default GameSelector
