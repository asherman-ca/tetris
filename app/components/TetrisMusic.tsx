import { FC, useEffect, useRef, useState } from 'react'

interface TetrisMusicProps {
	isPlaying: boolean
	volume?: number
	onVolumeChange?: (volume: number) => void
}

const TetrisMusic: FC<TetrisMusicProps> = ({
	isPlaying,
	volume = 0.5,
	onVolumeChange,
}) => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isMuted, setIsMuted] = useState(false)
	const [currentVolume, setCurrentVolume] = useState(volume)

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : currentVolume
			audioRef.current.loop = true
		}
	}, [currentVolume, isMuted])

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play().catch(() => {
					// Handle autoplay restrictions
					console.log('Audio autoplay blocked by browser')
				})
			} else {
				audioRef.current.pause()
			}
		}
	}, [isPlaying])

	const handleVolumeChange = (newVolume: number) => {
		setCurrentVolume(newVolume)
		onVolumeChange?.(newVolume)
	}

	const toggleMute = () => {
		setIsMuted(!isMuted)
	}

	return (
		<div className='fixed top-4 right-4 flex items-center gap-2 bg-gray-800 bg-opacity-80 p-2 rounded-lg'>
			<button
				onClick={toggleMute}
				className='text-white hover:text-blue-400 transition-colors'
				title={isMuted ? 'Unmute' : 'Mute'}
			>
				{isMuted ? '🔇' : '🔊'}
			</button>

			<input
				type='range'
				min='0'
				max='1'
				step='0.1'
				value={currentVolume}
				onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
				className='w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer'
				title='Volume'
			/>

			<audio
				ref={audioRef}
				src='/tetris-theme.mp3'
				preload='auto'
				onError={(e) => console.log('Audio error:', e)}
			/>
		</div>
	)
}

export default TetrisMusic
