import { FC } from 'react'

interface GameOverScreenProps {
	score: number
	lines: number
	onRestart: () => void
}

const GameOverScreen: FC<GameOverScreenProps> = ({
	score,
	lines,
	onRestart,
}) => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 flex items-center justify-center'>
			<div className='text-center text-white'>
				<h1 className='text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500'>
					GAME OVER
				</h1>

				<div className='mb-8 space-y-4'>
					<div className='text-3xl'>
						Final Score:{' '}
						<span className='text-yellow-400 font-bold'>{score}</span>
					</div>
					<div className='text-2xl'>
						Lines Cleared:{' '}
						<span className='text-green-400 font-bold'>{lines}</span>
					</div>
				</div>

				<button
					onClick={onRestart}
					className='px-8 py-4 text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200'
				>
					PLAY AGAIN
				</button>
			</div>
		</div>
	)
}

export default GameOverScreen
