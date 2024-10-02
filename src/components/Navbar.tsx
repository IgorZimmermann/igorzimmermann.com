'use client'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const [showAdvanced, setShowAdvanced] = useState<boolean>(false)
	const altKeyDown = useCallback((ev: KeyboardEvent) => {
		if (ev.key === 'Alt') {
			setShowAdvanced(true)
		}
	}, [])
	const altKeyUp = useCallback((ev: KeyboardEvent) => {
		if (ev.key === 'Alt') {
			setShowAdvanced(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', altKeyDown, false)
		document.addEventListener('keyup', altKeyUp, false)

		return () => {
			document.removeEventListener('keydown', altKeyDown, false)
			document.removeEventListener('keyup', altKeyUp, false)
		}
	}, [altKeyDown, altKeyUp])

	const urls: { url: string; label: string; advanced: boolean }[] = [
		{
			url: '/admin',
			label: 'admin',
			advanced: true,
		},
		{
			url: '/projects',
			label: 'projects',
			advanced: false,
		},
		{
			url: '/experience',
			label: 'experience',
			advanced: false,
		},
	]

	return (
		<nav className="fixed top-0 left-0 w-full h-[10dvh] bg-black text-white">
			<div className="mx-auto h-full w-[calc(100%_-_2em)] flex flex-row justify-between items-center">
				<h3 className="uppercase text-sm m-0">igor zimmermann</h3>
				<div>
					{urls.map(
						({ url, label, advanced }) =>
							((showAdvanced && advanced) || advanced === false) && (
								<Link
									href={url}
									key={label}
									className="text-inherit no-underline mr-2 last:mr-0 text-sm hover:opacity-85"
								>
									{label}
								</Link>
							)
					)}
				</div>
			</div>
		</nav>
	)
}
