import React, { useState, useEffect, useRef } from 'react'
import './PuzzleGame.css'

const GRID_SIZE = 4
const TOTAL_TILES = 15
const EMPTY_VALUE = 16 // Use 16 to represent empty space

const PuzzleGame = () => {
  const [board, setBoard] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
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

    // Check if clicked tile is adjacent to empty space
    const isAdjacent =
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)

    if (isAdjacent) {
      const newBoard = [...board]
      // Swap clicked tile with empty space
      ;[newBoard[clickedIndex], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[clickedIndex]]
      setBoard(newBoard)
      setHasInteracted(true)
      
 
      
      // Play wood knock sound
      if (knockSoundRef.current) {
        knockSoundRef.current.currentTime = 0
        knockSoundRef.current.play().catch(err => {
          // Ignore play() errors (e.g., if user hasn't interacted with page yet)
          console.log('Sound play error:', err)
        })
      }
    }
  }

  return (
    <div className="puzzle-container">
      {/* Hidden audio elements for sounds */}
      <audio
        ref={knockSoundRef}
        src={`${import.meta.env.BASE_URL}sounds/wood-knock.mp3`}
        preload="auto"
      />
      <audio
        ref={winSoundRef}
        src={`${import.meta.env.BASE_URL}sounds/win-sound.mp3`}
        preload="auto"
      />
      <audio
        ref={shuffleSoundRef}
        src={`${import.meta.env.BASE_URL}sounds/board-shuffle.mp3`}
        preload="auto"
      />

      
      <div className="puzzle-board">
        {board.map((tile, index) => (
          <div
            key={index}
            className={`puzzle-cell ${tile === EMPTY_VALUE ? 'empty' : 'tile'} ${isSolved ? 'disabled' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile !== EMPTY_VALUE && (
              <div className="tile-content">
                <span className="tile-number">{tile}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {isSolved && hasInteracted && (
        <div className="congrats-overlay">
          <img src={`${import.meta.env.BASE_URL}images/congrats.png`} alt="Congratulations!" className="congrats-image" />
        </div>
      )}
      <button 
        className={`reset-button ${(!hasInteracted || isSolved) ? '' : 'hidden'}`}
        onClick={shuffleTiles}
      >
        <span className="reset-button-text">SHUFFLE</span>
      </button>
    </div>
  )
}

export default PuzzleGame