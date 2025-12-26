import type { ReactNode } from "react"

import { cn } from "../../lib/cn"

type GridContainerProps = {
	children: ReactNode
}

export default function GridContainer({ children }: GridContainerProps) {
	return (
		<div className={
			cn("grid grid-cols-1 md:grid-cols-2 w-full")
		}
		>
			{children}
		</div>
	)
}
