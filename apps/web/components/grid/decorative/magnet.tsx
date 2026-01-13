"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "../../../lib/cn"

export default function GridItemMagnet() {
	const rows = 12
	const columns = 12

	const containerRef = useRef<HTMLDivElement | null>(null)

	const [isClicked, setIsClicked] = useState<boolean>(false)

	const [cursor, setCursor] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
	const [lastScroll, setLastScroll] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

	useEffect(() => {
		const container = containerRef.current
		if (!container)
			return

		const items = container.querySelectorAll<HTMLSpanElement>("span")

		const onPointerMove = (pointer: { x: number, y: number }) => {
			items.forEach((item) => {
				const rect = item.getBoundingClientRect()
				const centerX = rect.x + rect.width / 2
				const centerY = rect.y + rect.height / 2

				const b = pointer.x - centerX
				const a = pointer.y - centerY
				const c = Math.sqrt(a * a + b * b) || 1
				const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1)

				item.style.setProperty("--rotate", `${r}deg`)
			})
		}

		const handlePointerMove = (e: PointerEvent) => {
			onPointerMove({ x: e.x, y: e.y })
			setCursor({ x: e.x, y: e.y })
		}

		const handleScroll = () => {
			onPointerMove({ x: cursor.x + lastScroll.x - window.scrollX, y: cursor.y + lastScroll.y - window.scrollY })
			setLastScroll({ x: window.scrollX, y: window.scrollY })
		}

		const handleClick = () => {
			setIsClicked(!isClicked)
		}

		window.addEventListener("pointermove", handlePointerMove)
		window.addEventListener("scroll", handleScroll)
		container.addEventListener("click", handleClick)

		return () => {
			window.removeEventListener("pointermove", handlePointerMove)
			window.removeEventListener("scroll", handleScroll)
			container.removeEventListener("click", handleClick)
		}
	}, [cursor, lastScroll, isClicked])

	const total = rows * columns
	const lines = Array.from({ length: total }, (_, i) => (
		<span
			key={i}
			className={
				cn(
					"block origin-center bg-[currentColor]",
					`w-[.5vmin] h-[6vmin]`,
				)
			}
			style={{
				// @ts-expect-error setting css variable
				"--rotate": "0deg",
				"transform": `rotate(calc(var(--rotate) + ${isClicked ? "90deg" : "0deg"}))`,
				"willChange": "transform",
			}}
		/>
	))

	return (
		<div
			className={
				cn(
					"grid place-items-center w-full h-full p-2 hover:cursor-crosshair",
				)
			}
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
			ref={containerRef}
		>
			{lines}
		</div>
	)
}
