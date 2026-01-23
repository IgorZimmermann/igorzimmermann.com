import type { Metadata } from "next"

import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { HashScroller } from "../components/hash-scroller"
import { cn } from "../lib/cn"

export const metadata: Metadata = {
	title: "Igor Zimmermann",
	description: "The personal website and portfolio of Igor Zimmermann",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={cn("bg-black", "text-white")}>
				<HashScroller />
				{children}

				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	)
}
