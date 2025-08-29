export type BlockType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L' | 'empty'

export type GameState = 'start' | 'playing' | 'paused' | 'gameOver'

export interface Piece {
	type: BlockType
	shape: number[][]
	x: number
	y: number
}

export type Board = BlockType[][]

export interface GameStats {
	score: number
	level: number
	lines: number
}

export const PIECE_SHAPES: Record<BlockType, number[][]> = {
	I: [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	O: [
		[1, 1],
		[1, 1],
	],
	T: [
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0],
	],
	S: [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0],
	],
	Z: [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0],
	],
	J: [
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0],
	],
	L: [
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0],
	],
	empty: [],
}

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const createEmptyBoard = (): Board => {
	return Array(BOARD_HEIGHT)
		.fill(null)
		.map(() => Array(BOARD_WIDTH).fill('empty'))
}

export const createRandomPiece = (level: number = 1): Piece => {
	let types: BlockType[]

	if (level === 1) {
		// Level 1: Only purple triangle (T) and red (Z) pieces
		types = ['T', 'Z']
	} else {
		// Level 2+: All pieces
		types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
	}

	const randomType = types[Math.floor(Math.random() * types.length)]

	return {
		type: randomType,
		shape: PIECE_SHAPES[randomType],
		x:
			Math.floor(BOARD_WIDTH / 2) -
			Math.floor(PIECE_SHAPES[randomType][0].length / 2),
		y: 0,
	}
}
