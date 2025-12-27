"use client"

import { useEffect, useRef } from "react"

import { cn } from "../../../lib/cn"

export default function GridItemMagnet() {
	const rows = 12
	const columns = 12

	const containerRef = useRef<HTMLDivElement | null>(null)

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
		}

		window.addEventListener("pointermove", handlePointerMove)

		if (items.length) {
			const middleIndex = Math.floor(items.length / 2)
			const rect = items[middleIndex].getBoundingClientRect()
			onPointerMove({ x: rect.x, y: rect.y })
		}

		return () => {
			window.removeEventListener("pointermove", handlePointerMove)
		}
	})

	const total = rows * columns
	const lines = Array.from({ length: total }, (_, i) => (
		<span
			key={i}
			className={
				cn(
					"block origin-center bg-white",
					`w-[.5vmin] h-[6vmin]`,
				)
			}
			style={{
				// @ts-expect-error setting css variable
				"--rotate": "10deg",
				"transform": "rotate(var(--rotate))",
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
