import { useCallback } from 'react'
import { useGameState } from './useGameState'
import { useGameLoop } from './useGameLoop'
import { useControls } from './useControls'
import {
	isValidMove,
	rotatePiece,
	placePiece,
	clearLines,
	calculateScore,
	checkGameOver,
	getDropPosition,
} from '../utils/gameLogic'

export const useGameEngine = () => {
	const {
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
	} = useGameState()

	const handleMove = useCallback(
		(direction: 'left' | 'right') => {
			if (!currentPiece || gameState !== 'playing') return

			const dx = direction === 'left' ? -1 : 1
			if (isValidMove(currentPiece, board, dx, 0)) {
				updateCurrentPiece({
					...currentPiece,
					x: currentPiece.x + dx,
				})
			}
		},
		[currentPiece, board, gameState, updateCurrentPiece]
	)

	const handleRotate = useCallback(() => {
		if (!currentPiece || gameState !== 'playing') return

		const rotatedPiece = rotatePiece(currentPiece)
		if (isValidMove(rotatedPiece, board)) {
			updateCurrentPiece(rotatedPiece)
		}
	}, [currentPiece, board, gameState, updateCurrentPiece])

	const handleDrop = useCallback(() => {
		if (!currentPiece || gameState !== 'playing') return

		if (isValidMove(currentPiece, board, 0, 1)) {
			updateCurrentPiece({
				...currentPiece,
				y: currentPiece.y + 1,
			})
		} else {
			const newBoard = placePiece(currentPiece, board)
			const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard)

			if (linesCleared > 0) {
				const newScore = score + calculateScore(linesCleared, level)
				const newLines = lines + linesCleared
				const newLevel = Math.floor(newLines / 10) + 1

				updateScore(newScore)
				updateLines(newLines)
				updateLevel(newLevel)
			}

			updateBoard(clearedBoard)

			if (checkGameOver(clearedBoard)) {
				gameOver()
			} else {
				spawnNewPiece()
			}
		}
	}, [
		currentPiece,
		board,
		gameState,
		score,
		level,
		lines,
		updateCurrentPiece,
		updateBoard,
		updateScore,
		updateLines,
		updateLevel,
		spawnNewPiece,
		gameOver,
	])

	const handleHardDrop = useCallback(() => {
		if (!currentPiece || gameState !== 'playing') return

		const dropY = getDropPosition(currentPiece, board)
		const droppedPiece = { ...currentPiece, y: dropY }

		updateCurrentPiece(droppedPiece)
		handleDrop()
	}, [currentPiece, board, gameState, updateCurrentPiece, handleDrop])

	const handleTick = useCallback(() => {
		if (gameState === 'playing') {
			handleDrop()
		}
	}, [gameState, handleDrop])

	const { handleKeyDown, handleKeyUp } = useControls({
		currentPiece,
		onMove: handleMove,
		onRotate: handleRotate,
		onDrop: handleDrop,
		onHardDrop: handleHardDrop,
		onSuperpower: useSuperpower,
	})

	useGameLoop({
		gameState,
		level,
		onTick: handleTick,
		onGameOver: gameOver,
	})

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
		handleKeyDown,
		handleKeyUp,
	}
}
