import React, { useState, useEffect, useRef } from 'react'
import './Game15.css'
import Tile15 from './Tile15'
import congratsImg from '../assets/images/congrats.png'
import peckerImg from '../assets/images/pecker.png'
import woodKnockSound from '../assets/sounds/wood-knock.mp3'
import winSound from '../assets/sounds/win-sound.mp3'
import shuffleSound from '../assets/sounds/board-shuffle.mp3'
import BarrelCounter from './BarrelCounter'
import GameSelector from './GameSelector'
import Theme from './Theme'
import Footer from './Footer'

const GRID_SIZE = 4
const TOTAL_TILES = 15
const EMPTY_VALUE = 16 // Use 16 to represent empty space

const Game15 = ({ gameVersion, setGameVersion, theme }) => {
  const [board, setBoard] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [moves, setMoves] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  const knockSoundRef = useRef(null)
  const winSoundRef = useRef(null)
  const shuffleSoundRef = useRef(null)

  // Initialize the puzzle in solved state
  useEffect(() => {
    initializePuzzle()
  }, [])

  const initializePuzzle = () => {
    const solved = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) =>
      i < TOTAL_TILES ? i + 1 : EMPTY_VALUE
    )
    setBoard(solved)
    setIsSolved(false)
    setMoves(0)
  }

  // Calculate inversion count (number of pairs out of order)
  // Count inversions in reading order (left to right, top to bottom), ignoring empty space
  const countInversions = (arr) => {
    let inversions = 0

    // Count inversions in the order they appear, skipping empty space
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === EMPTY_VALUE) continue

      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] === EMPTY_VALUE) continue

        // If a larger number comes before a smaller number, it's an inversion
        if (arr[i] > arr[j]) {
          inversions++
        }
      }
    }

    return inversions
  }

  // Check if puzzle configuration is solvable
  // For a 15-puzzle: solvable if (inversions + rowFromBottom) is odd
  // where rowFromBottom is 1-indexed (1 = bottom row, 4 = top row)
  const isSolvable = (arr) => {
    const inversions = countInversions(arr)
    const emptyIndex = arr.indexOf(EMPTY_VALUE)
    const emptyRowFromTop = Math.floor(emptyIndex / GRID_SIZE) // 0-indexed from top
    const emptyRowFromBottom = GRID_SIZE - emptyRowFromTop // 1-indexed from bottom

    // Puzzle is solvable if (inversions + emptyRowFromBottom) % 2 === 1
    return (inversions + emptyRowFromBottom) % 2 === 1
  }

  // Shuffle tiles ensuring solvability
  // Method: Start from solved state and make random valid moves
  // This guarantees the puzzle remains solvable
  const shuffleTiles = () => {
    // Trigger shake animation
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 600) // Duration matches CSS animation

    // Start with solved state
    let newBoard = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) =>
      i < TOTAL_TILES ? i + 1 : EMPTY_VALUE
    )

    let emptyIndex = GRID_SIZE * GRID_SIZE - 1 // Start with empty at bottom-right
    const numMoves = 200 + Math.floor(Math.random() * 300) // 200-500 random moves

    // Make random valid moves to shuffle
    for (let move = 0; move < numMoves; move++) {
      const emptyRow = Math.floor(emptyIndex / GRID_SIZE)
      const emptyCol = emptyIndex % GRID_SIZE

      // Get all possible valid moves
      const validMoves = []

      if (emptyRow > 0) validMoves.push(emptyIndex - GRID_SIZE) // Up
      if (emptyRow < GRID_SIZE - 1) validMoves.push(emptyIndex + GRID_SIZE) // Down
      if (emptyCol > 0) validMoves.push(emptyIndex - 1) // Left
      if (emptyCol < GRID_SIZE - 1) validMoves.push(emptyIndex + 1) // Right

      // Choose a random valid move
      if (validMoves.length > 0) {
        const randomMoveIndex = Math.floor(Math.random() * validMoves.length)
        const tileToMove = validMoves[randomMoveIndex]

          // Swap empty space with the tile
          ;[newBoard[emptyIndex], newBoard[tileToMove]] = [newBoard[tileToMove], newBoard[emptyIndex]]
        emptyIndex = tileToMove
      }
    }

    setBoard(newBoard)
    setIsSolved(false)
    setHasInteracted(true)
    setMoves(0)

    // Play shuffle sound
    if (shuffleSoundRef.current) {
      shuffleSoundRef.current.currentTime = 0
      shuffleSoundRef.current.play().catch(err => {
        // Ignore play() errors (e.g., if user hasn't interacted with page yet)
        console.log('Shuffle sound play error:', err)
      })
    }
  }

  // Check if puzzle is solved
  useEffect(() => {
    const isCorrect = board.every((value, index) => {
      if (index === GRID_SIZE * GRID_SIZE - 1) {
        return value === EMPTY_VALUE
      }
      return value === index + 1
    })
    setIsSolved(isCorrect && board.length === GRID_SIZE * GRID_SIZE)
  }, [board])

  // Play win sound when puzzle is solved
  useEffect(() => {
    if (isSolved && winSoundRef.current) {
      winSoundRef.current.currentTime = 0
      winSoundRef.current.play().catch(err => {
        // Ignore play() errors (e.g., if user hasn't interacted with page yet)
        console.log('Win sound play error:', err)
      })
    }
  }, [isSolved])


  // Handle tile click
  const handleTileClick = (clickedIndex) => {
    if (isSolved) return
    if (board[clickedIndex] === EMPTY_VALUE) return

    const emptyIndex = board.indexOf(EMPTY_VALUE)
    const clickedRow = Math.floor(clickedIndex / GRID_SIZE)
    const clickedCol = clickedIndex % GRID_SIZE
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE)
    const emptyCol = emptyIndex % GRID_SIZE

    // Check if clicked tile is in same row or column as empty space
    const isSameRow = clickedRow === emptyRow
    const isSameCol = clickedCol === emptyCol

    if (isSameRow || isSameCol) {
      const newBoard = [...board]

      if (isSameRow) {
        // Move tiles in the row
        if (clickedCol < emptyCol) {
          // Move right: clicked -> empty
          for (let i = emptyCol; i > clickedCol; i--) {
            newBoard[clickedRow * GRID_SIZE + i] = newBoard[clickedRow * GRID_SIZE + i - 1]
          }
        } else {
          // Move left: clicked <- empty
          for (let i = emptyCol; i < clickedCol; i++) {
            newBoard[clickedRow * GRID_SIZE + i] = newBoard[clickedRow * GRID_SIZE + i + 1]
          }
        }
      } else {
        // Move tiles in the column
        if (clickedRow < emptyRow) {
          // Move down: clicked -> empty
          for (let i = emptyRow; i > clickedRow; i--) {
            newBoard[i * GRID_SIZE + clickedCol] = newBoard[(i - 1) * GRID_SIZE + clickedCol]
          }
        } else {
          // Move up: clicked <- empty
          for (let i = emptyRow; i < clickedRow; i++) {
            newBoard[i * GRID_SIZE + clickedCol] = newBoard[(i + 1) * GRID_SIZE + clickedCol]
          }
        }
      }

      // Place empty value at clicked index
      newBoard[clickedIndex] = EMPTY_VALUE

      setBoard(newBoard)
      setHasInteracted(true)
      setMoves(prev => prev + 1)

      // Play wood knock sound
      if (knockSoundRef.current) {
        knockSoundRef.current.currentTime = 0
        knockSoundRef.current.play().catch(err => {
          console.log('Sound play error:', err)
        })
      }
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (isSolved) return

    let nextIndex = -1
    const row = Math.floor(index / GRID_SIZE)
    const col = index % GRID_SIZE

    switch (e.key) {
      case 'ArrowRight':
        if (col < GRID_SIZE - 1) nextIndex = index + 1
        break
      case 'ArrowLeft':
        if (col > 0) nextIndex = index - 1
        break
      case 'ArrowDown':
        if (row < GRID_SIZE - 1) nextIndex = index + GRID_SIZE
        break
      case 'ArrowUp':
        if (row > 0) nextIndex = index - GRID_SIZE
        break
      default:
        return
    }

    if (nextIndex !== -1) {
      e.preventDefault() // Prevent scrolling for Up/Down
      const nextTile = document.getElementById(`tile-${nextIndex}`)
      if (nextTile) {
        nextTile.focus()
      }
    }
  }

  return (
    <div className="game-wrapper">
      <Theme theme={theme} />

      <div className="puzzle-container game-15">

        {/* Hidden audio elements for sounds */}
        <audio
          ref={knockSoundRef}
          src={woodKnockSound}
          preload="auto"
        />
        <audio
          ref={winSoundRef}
          src={winSound}
          preload="auto"
        />
        <audio
          ref={shuffleSoundRef}
          src={shuffleSound}
          preload="auto"
        />



        <div className="board-wrapper">
          <GameSelector gameVersion={gameVersion} setGameVersion={setGameVersion} />
          <div className={`puzzle-board ${isShaking ? 'shaking' : ''}`}>
            <BarrelCounter value={moves} />
            {board.map((tile, index) => (
              <Tile15
                key={index}
                id={`tile-${index}`}
                value={tile}
                onClick={() => handleTileClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                isSolved={isSolved}
                isEmpty={tile === EMPTY_VALUE}
              />
            ))}
          </div>
          <img src={peckerImg} alt="Woodpecker" className={`pecker-image ${isShaking ? 'shaking' : ''}`} />
        </div>
        {isSolved && hasInteracted && (
          <div className="congrats-overlay">
            <img src={congratsImg} alt="Congratulations!" className="congrats-image" />
          </div>
        )}
        <button
          className="reset-button"
          onClick={shuffleTiles}
        >
          <span className="reset-button-text">SHUFFLE</span>
        </button>
        <Footer />
      </div>

    </div>
  )
}

export default Game15