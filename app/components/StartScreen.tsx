import { FC } from 'react'

interface StartScreenProps {
	onStart: () => void
}

const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center'>
			<div className='text-center text-white'>
				<h1 className='text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>
					TETRIS
				</h1>

				<div className='mb-8'>
					<div className='text-2xl mb-4'>Controls:</div>
					<div className='text-lg space-y-2 text-gray-300'>
						<div>← → Move left/right</div>
						<div>↓ Soft drop</div>
						<div>↑ Rotate</div>
						<div>Space Hard drop</div>
						<div>P Pause</div>
					</div>
				</div>

				<button
					onClick={onStart}
					className='px-8 py-4 text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200'
				>
					START GAME
				</button>

				<div className='mt-8 text-sm text-gray-400'>Press any key to start</div>
			</div>
		</div>
	)
}

export default StartScreen
