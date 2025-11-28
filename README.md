# Wooden 15-Puzzle Game

A beautiful React-based 15-puzzle game with a wooden aesthetic, inspired by classic wooden sliding puzzles.

## Features

- 🎮 Classic 15-puzzle gameplay
- 🌳 Beautiful wooden design with realistic textures
- ✅ Always generates solvable puzzles
- 🔄 Reset button to shuffle tiles
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

- Click on any tile adjacent to the empty space to move it
- Arrange the tiles so that numbers 1-15 are in order from left to right, top to bottom
- The empty space should be in the bottom-right corner when solved
- Click the "Reset" button to shuffle the tiles into a new solvable configuration

## Game Logic

The puzzle ensures solvability by checking the parity of inversions combined with the position of the empty space. If a random shuffle produces an unsolvable configuration, the algorithm automatically adjusts it to be solvable.


