import React from 'react'

const Tile15 = ({ value, onClick, isSolved, isEmpty, id, onKeyDown }) => {
  return (
    <button
      id={id}
      type="button"
      className={`puzzle-cell ${isEmpty ? 'empty' : 'tile'} ${isSolved ? 'disabled' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {!isEmpty && (
        <div className="tile-content">
          <span className="tile-number">{value}</span>
        </div>
      )}
    </button>
  )
}

export default Tile15
