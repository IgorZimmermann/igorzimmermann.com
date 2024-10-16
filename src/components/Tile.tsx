import React from 'react'

interface TileProps {
	label: string
	cols?: number
	rows?: number
	children: React.ReactNode
}

export const Tile: React.FC<TileProps> = ({
	label,
	cols = 5,
	rows = 1,
	children,
}) => {
	return (
		<div
			className={`col-span-${cols} row-span-${rows} h-full relative px-4 [&:nth-child(2n)]:bg-black [&:nth-child(2n)]:text-white bg-white text-black flex items-center justify-center`}
			style={{
				gridColumn: `span ${cols} / span ${cols}`,
				gridRow: `span ${rows} / span ${rows}`,
			}}
		>
			<span className="absolute top-1 left-4 uppercase text-xs font-black">
				{label}
			</span>
			{children}
		</div>
	)
}
