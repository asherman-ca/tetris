import { useCallback } from 'react'
import { Piece } from '../types/game'

interface UseControlsProps {
	currentPiece: Piece | null
	onMove: (direction: 'left' | 'right') => void
	onRotate: () => void
	onDrop: () => void
	onHardDrop: () => void
	onSuperpower: () => void
}

export const useControls = ({
	currentPiece,
	onMove,
	onRotate,
	onDrop,
	onHardDrop,
	onSuperpower,
}: UseControlsProps) => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!currentPiece) return

			switch (event.code) {
				case 'ArrowLeft':
					event.preventDefault()
					onMove('left')
					break
				case 'ArrowRight':
					event.preventDefault()
					onMove('right')
					break
				case 'ArrowDown':
					event.preventDefault()
					onDrop()
					break
				case 'ArrowUp':
					event.preventDefault()
					onRotate()
					break
				case 'Space':
					event.preventDefault()
					onSuperpower()
					break
				case 'KeyP':
					event.preventDefault()
					break
			}
		},
		[currentPiece, onMove, onRotate, onDrop, onHardDrop, onSuperpower]
	)

	const handleKeyUp = useCallback((event: KeyboardEvent) => {
		switch (event.code) {
			case 'ArrowLeft':
			case 'ArrowRight':
			case 'ArrowDown':
			case 'ArrowUp':
			case 'Space':
				event.preventDefault()
				break
		}
	}, [])

	return {
		handleKeyDown,
		handleKeyUp,
	}
}
