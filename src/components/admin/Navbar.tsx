import Link from 'next/link'
import React from 'react'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const urls: {
		url: string
		label: string
	}[] = [
		{
			url: '/admin',
			label: 'images',
		},
		{
			url: '/admin/docs',
			label: 'docs',
		},
	]

	return (
		<nav className="fixed top-0 left-0 w-full h-[10dvh] bg-black text-white z-50">
			<div className="mx-auto h-full w-[calc(100%_-_2em)] flex flex-row justify-center items-center">
				{urls.map(({ url, label }) => (
					<Link
						key={label}
						className="text-inherit no-underline mr-20 last:mr-0 text-sm hover:opacity-85"
						href={url}
					>
						{label}
					</Link>
				))}
			</div>
		</nav>
	)
}
