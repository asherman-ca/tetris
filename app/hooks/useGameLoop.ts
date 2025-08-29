import { useEffect, useRef, useCallback } from 'react'
import { GameState } from '../types/game'

interface UseGameLoopProps {
	gameState: GameState
	level: number
	onTick: () => void
	onGameOver: () => void
}

export const useGameLoop = ({
	gameState,
	level,
	onTick,
	onGameOver,
}: UseGameLoopProps) => {
	const frameRef = useRef<number>()
	const lastTimeRef = useRef<number>(0)
	const dropTimeRef = useRef<number>(0)

	const getDropTime = useCallback(() => {
		return Math.max(100, 1000 - (level - 1) * 100)
	}, [level])

	const gameLoop = useCallback(
		(currentTime: number) => {
			if (gameState !== 'playing') {
				frameRef.current = requestAnimationFrame(gameLoop)
				return
			}

			if (!lastTimeRef.current) {
				lastTimeRef.current = currentTime
			}

			const deltaTime = currentTime - lastTimeRef.current
			dropTimeRef.current += deltaTime

			if (dropTimeRef.current >= getDropTime()) {
				onTick()
				dropTimeRef.current = 0
			}

			lastTimeRef.current = currentTime
			frameRef.current = requestAnimationFrame(gameLoop)
		},
		[gameState, level, onTick, getDropTime]
	)

	useEffect(() => {
		frameRef.current = requestAnimationFrame(gameLoop)

		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current)
			}
		}
	}, [gameLoop])

	useEffect(() => {
		if (gameState === 'playing') {
			dropTimeRef.current = 0
		}
	}, [gameState])
}
