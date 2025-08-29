'use client'

import { FC, useEffect, useState } from 'react'
import GameBoard from './GameBoard'
import StartScreen from './StartScreen'
import GameOverScreen from './GameOverScreen'
import TetrisMusic from './TetrisMusic'
import TetrisSoundEffects from './TetrisSoundEffects'
import TetrisBlock from './TetrisBlock'
import { useGameEngine } from '../hooks/useGameEngine'

interface TetrisGameProps {
	className?: string
}

const TetrisGame: FC<TetrisGameProps> = ({ className }) => {
	const {
		gameState,
		currentPiece,
		nextPiece,
		board,
		score,
		level,
		lines,
		superpowerCharges,
		startGame,
		pauseGame,
		resumeGame,
		handleKeyDown,
	} = useGameEngine()

	const [musicVolume, setMusicVolume] = useState(0.5)
	const [isMusicMuted, setIsMusicMuted] = useState(false)

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (gameState === 'playing') {
				handleKeyDown(event)
			} else if (gameState === 'start' && event.code === 'Space') {
				startGame()
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [gameState, handleKeyDown, startGame])

	// Play sound effects for game events
	useEffect(() => {
		if (gameState === 'gameOver' && typeof window !== 'undefined') {
			;(window as any).playTetrisSound?.('gameOver')
		}
	}, [gameState])

	if (gameState === 'start') {
		return (
			<>
				<TetrisMusic
					isPlaying={false}
					volume={musicVolume}
					onVolumeChange={setMusicVolume}
				/>
				<TetrisSoundEffects volume={musicVolume} isMuted={isMusicMuted} />
				<StartScreen onStart={startGame} />
			</>
		)
	}

	if (gameState === 'gameOver') {
		return (
			<>
				<TetrisMusic
					isPlaying={false}
					volume={musicVolume}
					onVolumeChange={setMusicVolume}
				/>
				<TetrisSoundEffects volume={musicVolume} isMuted={isMusicMuted} />
				<GameOverScreen score={score} lines={lines} onRestart={startGame} />
			</>
		)
	}

	return (
		<>
			<TetrisMusic
				isPlaying={gameState === 'playing'}
				volume={musicVolume}
				onVolumeChange={setMusicVolume}
			/>
			<TetrisSoundEffects volume={musicVolume} isMuted={isMusicMuted} />
			<div
				className={`flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white  ${className}`}
			>
				<div className='flex gap-8 max-w-2xl mx-auto'>
					<div className='flex flex-col items-center'>
						<div className='mb-4 text-2xl font-bold'>Score: {score}</div>
						<div className='mb-4 text-xl'>Level: {level}</div>
						<div className='mb-4 text-xl'>Lines: {lines}</div>

						{/* Superpower charges display */}
						<div className='mb-4 text-center'>
							<div className='text-lg font-bold text-yellow-400 mb-2'>
								⚡ Superpower Charges: {superpowerCharges}
							</div>
							<div className='text-sm text-gray-300'>
								Press SPACEBAR to transform piece to I-block
							</div>
						</div>

						{/* Level restrictions indicator */}
						<div className='mb-4 text-sm text-gray-300'>
							{level === 1 ? (
								<div className='text-center'>
									<div className='mb-2'>Level 1: Purple & Red pieces only</div>
									<div className='flex gap-2 justify-center'>
										<div className='w-6 h-6'>
											<TetrisBlock type='T' className='w-full h-full' />
										</div>
										<div className='w-6 h-6'>
											<TetrisBlock type='Z' className='w-full h-full' />
										</div>
									</div>
								</div>
							) : (
								<div className='text-center'>
									<div className='mb-2'>
										Level {level}: All pieces available
									</div>
									<div className='flex gap-1 justify-center flex-wrap max-w-32'>
										{['I', 'O', 'T', 'S', 'Z', 'J', 'L'].map((type) => (
											<div key={type} className='w-4 h-4'>
												<TetrisBlock
													type={type as any}
													className='w-full h-full'
												/>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						<GameBoard board={board} currentPiece={currentPiece} />
					</div>

					<div className='flex flex-col items-center'>
						<div className='mb-4 text-xl font-bold'>Next Piece</div>
						<div className='w-24 h-24 border-2 border-gray-600 bg-gray-800'>
							{nextPiece && (
								<div className='w-full h-full flex items-center justify-center'>
									<NextPieceDisplay piece={nextPiece} />
								</div>
							)}
						</div>

						<div className='mt-8 space-y-2'>
							<button
								onClick={gameState === 'paused' ? resumeGame : pauseGame}
								className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded'
							>
								{gameState === 'paused' ? 'Resume' : 'Pause'}
							</button>

							<button
								onClick={() => setIsMusicMuted(!isMusicMuted)}
								className='px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded'
								title='Toggle all sounds'
							>
								{gameState === 'paused' ? '🔇 Unmute' : '🔊 Mute All'}
							</button>

							<button
								onClick={() => {
									// Trigger hard drop by simulating down arrow key
									if (gameState === 'playing') {
										const event = new KeyboardEvent('keydown', {
											code: 'ArrowDown',
										})
										handleKeyDown(event)
									}
								}}
								className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded'
								title='Hard drop piece (Down arrow)'
							>
								⬇ Hard Drop
							</button>
						</div>

						<img
							src='/louie.jpg'
							alt='Louie the dog'
							className='object-cover max-w-full mt-8'
						/>
					</div>
				</div>
			</div>
		</>
	)
}

const NextPieceDisplay: FC<{ piece: any }> = ({ piece }) => {
	return (
		<div className='w-16 h-16 flex items-center justify-center'>
			<TetrisBlock type={piece.type} className='w-12 h-12' />
		</div>
	)
}

export default TetrisGame
