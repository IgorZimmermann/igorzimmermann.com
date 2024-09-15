'use client'
import React from 'react'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
	return (
		<div className="h-[70dvh] bg-black mt-[10dvh] text-white flex justify-center items-center">
			<div className="flex flex-col items-center text-center">
				<h1 className="m-0 mb-5 text-6xl uppercase">igor zimmermann</h1>
				<h3 className="m-0">bsc, software engineering @ sdu</h3>
			</div>
		</div>
	)
}
