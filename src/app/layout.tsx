import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Igor Zimmermann',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="m-0 p-0 box-border font-sans">{children}</body>
		</html>
	)
}
