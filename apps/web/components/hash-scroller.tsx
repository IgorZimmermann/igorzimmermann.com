"use client"

import { track } from "@vercel/analytics"
import { useEffect } from "react"

export function HashScroller() {
	useEffect(() => {
		const hash = window.location.hash
		if (!hash)
			return

		const id = hash.replace("#", "")
		const el = document.getElementById(id)

		let success = false

		if (el) {
			el.scrollIntoView()
			success = true
		}

		track("Hash Scroll", { target: id, success })
	}, [])

	return null
}
