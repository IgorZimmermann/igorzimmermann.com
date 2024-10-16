'use client'
import React from 'react'

interface TileGridProps {
	children: React.ReactNode
}

export const TileGrid: React.FC<TileGridProps> = ({ children }) => {
	return <div className="grid grid-cols-10 auto-rows-[50dvh]">{children}</div>
}
