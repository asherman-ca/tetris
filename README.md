# Tetris Game

A classic Tetris game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Classic Tetris gameplay with all 7 standard pieces (I, O, T, S, Z, J, L)
- Beautiful SVG block designs with unique patterns for each piece type
- Start screen with game instructions
- Game over screen with final score and lines cleared
- Score tracking, level progression, and line counting
- Pause/resume functionality
- Responsive design with modern UI
- Tetris theme music support

## Controls

- **Arrow Keys**: Move pieces left/right and rotate
- **Down Arrow**: Soft drop
- **Space**: Hard drop
- **P**: Pause/Resume game
- **Space**: Start game (on start screen)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add Tetris theme music:

   - Download a Tetris theme MP3 file
   - Place it in the `public/` directory
   - Name it exactly `tetris-theme.mp3`

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Game Rules

- Clear horizontal lines to score points
- Score more points by clearing multiple lines at once
- Game speed increases with level
- Game ends when pieces reach the top of the board

## Technical Details

- Built with Next.js 15 and React 19
- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for game logic
- SVG-based block rendering
- Responsive game board

## Project Structure

```
app/
├── components/          # React components
│   ├── TetrisGame.tsx  # Main game component
│   ├── GameBoard.tsx   # Game board display
│   ├── TetrisBlock.tsx # Individual block component
│   ├── StartScreen.tsx # Game start screen
│   └── GameOverScreen.tsx # Game over screen
├── hooks/              # Custom React hooks
│   ├── useGameEngine.ts # Main game logic
│   ├── useGameState.ts # Game state management
│   ├── useGameLoop.ts  # Game timing loop
│   └── useControls.ts  # Keyboard input handling
├── types/              # TypeScript type definitions
│   └── game.ts        # Game-related types
├── utils/              # Utility functions
│   └── gameLogic.ts   # Game mechanics
└── page.tsx           # Main page component
```

## Building for Production

```bash
npm run build
npm start
```

Enjoy playing Tetris! 🎮
