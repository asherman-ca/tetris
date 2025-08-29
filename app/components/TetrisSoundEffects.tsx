import { FC, useRef, useEffect } from 'react'

interface TetrisSoundEffectsProps {
	volume?: number
	isMuted?: boolean
}

interface SoundEffect {
	lineClear: HTMLAudioElement | null
	pieceDrop: HTMLAudioElement | null
	pieceRotate: HTMLAudioElement | null
	gameOver: HTMLAudioElement | null
	levelUp: HTMLAudioElement | null
}

const TetrisSoundEffects: FC<TetrisSoundEffectsProps> = ({
	volume = 0.5,
	isMuted = false,
}) => {
	const soundsRef = useRef<SoundEffect | null>(null)

	useEffect(() => {
		// Preload all sound effects with error handling
		const createAudio = (src: string): HTMLAudioElement | null => {
			try {
				const audio = new Audio(src)
				audio.volume = volume
				return audio
			} catch (error) {
				console.log(`Could not load sound: ${src}`)
				return null
			}
		}

		soundsRef.current = {
			lineClear: createAudio('/sounds/line-clear.mp3'),
			pieceDrop: createAudio('/sounds/piece-drop.mp3'),
			pieceRotate: createAudio('/sounds/piece-rotate.mp3'),
			gameOver: createAudio('/sounds/game-over.mp3'),
			levelUp: createAudio('/sounds/level-up.mp3'),
		}
	}, [volume])

	useEffect(() => {
		if (soundsRef.current) {
			Object.values(soundsRef.current).forEach((audio) => {
				if (audio) {
					audio.volume = isMuted ? 0 : volume
				}
			})
		}
	}, [isMuted, volume])

	// Expose sound methods via window for global access
	useEffect(() => {
		if (typeof window !== 'undefined') {
			;(window as any).playTetrisSound = (soundName: keyof SoundEffect) => {
				if (soundsRef.current && !isMuted) {
					const audio = soundsRef.current[soundName]
					if (audio) {
						audio.currentTime = 0
						audio.play().catch(() => {})
					}
				}
			}
		}

		return () => {
			if (typeof window !== 'undefined') {
				delete (window as any).playTetrisSound
			}
		}
	}, [isMuted])

	return null // This component doesn't render anything
}

export default TetrisSoundEffects
