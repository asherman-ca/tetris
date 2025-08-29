import {
	Board,
	Piece,
	BlockType,
	BOARD_WIDTH,
	BOARD_HEIGHT,
} from '../types/game'

export const isValidMove = (
	piece: Piece,
	board: Board,
	dx: number = 0,
	dy: number = 0
): boolean => {
	const newX = piece.x + dx
	const newY = piece.y + dy

	for (let row = 0; row < piece.shape.length; row++) {
		for (let col = 0; col < piece.shape[row].length; col++) {
			if (piece.shape[row][col]) {
				const boardX = newX + col
				const boardY = newY + row

				if (
					boardX < 0 ||
					boardX >= BOARD_WIDTH ||
					boardY >= BOARD_HEIGHT ||
					(boardY >= 0 && board[boardY][boardX] !== 'empty')
				) {
					return false
				}
			}
		}
	}

	return true
}

export const rotatePiece = (piece: Piece): Piece => {
	const rotatedShape = piece.shape[0].map((_, colIndex) =>
		piece.shape.map((row) => row[colIndex]).reverse()
	)

	return {
		...piece,
		shape: rotatedShape,
	}
}

export const placePiece = (piece: Piece, board: Board): Board => {
	const newBoard = board.map((row) => [...row])

	for (let row = 0; row < piece.shape.length; row++) {
		for (let col = 0; col < piece.shape[row].length; col++) {
			if (piece.shape[row][col]) {
				const boardY = piece.y + row
				const boardX = piece.x + col

				if (
					boardY >= 0 &&
					boardY < BOARD_HEIGHT &&
					boardX >= 0 &&
					boardX < BOARD_WIDTH
				) {
					newBoard[boardY][boardX] = piece.type
				}
			}
		}
	}

	return newBoard
}

export const clearLines = (
	board: Board
): { newBoard: Board; linesCleared: number } => {
	const newBoard = board.filter((row) => !row.every((cell) => cell !== 'empty'))
	const linesCleared = board.length - newBoard.length

	while (newBoard.length < BOARD_HEIGHT) {
		newBoard.unshift(Array(BOARD_WIDTH).fill('empty'))
	}

	return { newBoard, linesCleared }
}

export const calculateScore = (linesCleared: number, level: number): number => {
	const lineScores = [0, 100, 300, 500, 800]
	return lineScores[linesCleared] * level
}

export const checkGameOver = (board: Board): boolean => {
	return board[0].some((cell) => cell !== 'empty')
}

export const getDropPosition = (piece: Piece, board: Board): number => {
	let dropY = piece.y

	while (isValidMove(piece, board, 0, dropY - piece.y + 1)) {
		dropY++
	}

	return dropY
}
