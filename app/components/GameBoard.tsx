import { FC } from 'react'
import { Board, Piece } from '../types/game'
import TetrisBlock from './TetrisBlock'

interface GameBoardProps {
	board: Board
	currentPiece: Piece | null
}

const GameBoard: FC<GameBoardProps> = ({ board, currentPiece }) => {
	const renderBoard = () => {
		return board.map((row, rowIndex) => (
			<div key={rowIndex} className='flex'>
				{row.map((cell, colIndex) => (
					<TetrisBlock
						key={`${rowIndex}-${colIndex}`}
						type={cell}
						className='w-6 h-6 border border-gray-700'
					/>
				))}
			</div>
		))
	}

	const renderCurrentPiece = () => {
		if (!currentPiece) return null

		return currentPiece.shape.map((row, rowIndex) =>
			row.map((cell, colIndex) => {
				if (!cell) return null

				const x = currentPiece.x + colIndex
				const y = currentPiece.y + rowIndex

				if (x < 0 || x >= 10 || y < 0 || y >= 20) return null

				return (
					<div
						key={`piece-${rowIndex}-${colIndex}`}
						className='absolute'
						style={{
							left: `${x * 24}px`,
							top: `${y * 24}px`,
						}}
					>
						<TetrisBlock
							type={currentPiece.type}
							className='w-6 h-6 border border-gray-700'
						/>
					</div>
				)
			})
		)
	}

	return (
		<div className='relative'>
			<div className='border-4 border-gray-600 bg-gray-800 relative'>
				{renderBoard()}
			</div>
			<div className='absolute top-0 left-0'>{renderCurrentPiece()}</div>
		</div>
	)
}

export default GameBoard
