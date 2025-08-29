import { FC } from 'react'
import { BlockType } from '../types/game'

interface TetrisBlockProps {
	type: BlockType
	className?: string
}

const TetrisBlock: FC<TetrisBlockProps> = ({ type, className }) => {
	const getBlockColor = (blockType: BlockType) => {
		switch (blockType) {
			case 'I':
				return '#00f5ff'
			case 'O':
				return '#ffff00'
			case 'T':
				return '#a000f0'
			case 'S':
				return '#00f000'
			case 'Z':
				return '#f00000'
			case 'J':
				return '#0000f0'
			case 'L':
				return '#ffa500'
			default:
				return '#333333'
		}
	}

	const getBlockPattern = (blockType: BlockType) => {
		const color = getBlockColor(blockType)

		switch (blockType) {
			case 'I':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<rect
							x='4'
							y='4'
							width='16'
							height='16'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			case 'O':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<circle
							cx='12'
							cy='12'
							r='6'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			case 'T':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<polygon
							points='12,4 20,20 4,20'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			case 'S':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<path
							d='M4,8 L20,8 L20,16 L4,16 Z'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			case 'Z':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<path
							d='M4,4 L20,4 L20,12 L4,12 Z'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			case 'J':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<rect
							x='8'
							y='8'
							width='8'
							height='8'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			case 'L':
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
						<circle
							cx='12'
							cy='12'
							r='4'
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							opacity='0.5'
						/>
					</svg>
				)
			default:
				return (
					<svg viewBox='0 0 24 24' className={className}>
						<rect width='24' height='24' fill={color} />
						<rect
							x='2'
							y='2'
							width='20'
							height='20'
							fill='none'
							stroke='#000'
							strokeWidth='1'
							opacity='0.3'
						/>
					</svg>
				)
		}
	}

	if (type === 'empty') {
		return <div className={`${className} bg-gray-800`} />
	}

	return getBlockPattern(type)
}

export default TetrisBlock
