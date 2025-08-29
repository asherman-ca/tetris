import { useState, useCallback } from 'react'
import {
	GameState,
	Board,
	Piece,
	GameStats,
	createEmptyBoard,
	createRandomPiece,
} from '../types/game'

export const useGameState = () => {
	const [gameState, setGameState] = useState<GameState>('start')
	const [board, setBoard] = useState<Board>(createEmptyBoard())
	const [currentPiece, setCurrentPiece] = useState<Piece | null>(null)
	const [nextPiece, setNextPiece] = useState<Piece | null>(null)
	const [score, setScore] = useState(0)
	const [level, setLevel] = useState(1)
	const [lines, setLines] = useState(0)
	const [superpowerCharges, setSuperpowerCharges] = useState(1)

	const startGame = useCallback(() => {
		setBoard(createEmptyBoard())
		setCurrentPiece(createRandomPiece(1))
		setNextPiece(createRandomPiece(1))
		setScore(0)
		setLevel(1)
		setLines(0)
		setSuperpowerCharges(1)
		setGameState('playing')
	}, [])

	const pauseGame = useCallback(() => {
		if (gameState === 'playing') {
			setGameState('paused')
		}
	}, [gameState])

	const resumeGame = useCallback(() => {
		if (gameState === 'paused') {
			setGameState('playing')
		}
	}, [gameState])

	const gameOver = useCallback(() => {
		setGameState('gameOver')
	}, [])

	const updateScore = useCallback((newScore: number) => {
		setScore(newScore)
	}, [])

	const updateLevel = useCallback((newLevel: number) => {
		setLevel(newLevel)
		// Gain an additional superpower charge on level up
		setSuperpowerCharges(prev => prev + 1)
	}, [])

	const updateLines = useCallback((newLines: number) => {
		setLines(newLines)
	}, [])

	const updateBoard = useCallback((newBoard: Board) => {
		setBoard(newBoard)
	}, [])

	const updateCurrentPiece = useCallback((newPiece: Piece | null) => {
		setCurrentPiece(newPiece)
	}, [])

	const spawnNewPiece = useCallback(() => {
		if (nextPiece) {
			setCurrentPiece(nextPiece)
			setNextPiece(createRandomPiece(level))
		}
	}, [nextPiece, level])

	const useSuperpower = useCallback(() => {
		if (superpowerCharges > 0 && currentPiece) {
			// Change current piece to I-piece (straight line)
			const newPiece: Piece = {
				type: 'I',
				shape: [
					[0, 0, 0, 0],
					[1, 1, 1, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
				],
				x: Math.floor(10 / 2) - 2, // Center the I-piece
				y: currentPiece.y,
			}
			setCurrentPiece(newPiece)
			setSuperpowerCharges(prev => prev - 1)
		}
	}, [superpowerCharges, currentPiece])

	return {
		gameState,
		board,
		currentPiece,
		nextPiece,
		score,
		level,
		lines,
		superpowerCharges,
		startGame,
		pauseGame,
		resumeGame,
		gameOver,
		updateScore,
		updateLevel,
		updateLines,
		updateBoard,
		updateCurrentPiece,
		spawnNewPiece,
		useSuperpower,
	}
}
