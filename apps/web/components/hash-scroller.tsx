"use client"

import { useEffect } from "react"

export function HashScroller() {
	useEffect(() => {
		const hash = window.location.hash
		if (!hash)
			return

		const id = hash.replace("#", "")
		const el = document.getElementById(id)

		if (el) {
			el.scrollIntoView()
		}
	}, [])

	return null
}
