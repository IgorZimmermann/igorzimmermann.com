import type { ReactNode } from "react"

import { cn } from "../../lib/cn"

type ProjectContainerProps = {
	children: ReactNode
}

export default function ProjectContainer({ children }: ProjectContainerProps) {
	return (
		<div className={cn(
			"grid grid-cols-1 w-full",
			/* "[&>:nth-child(2n)]:bg-white [&>:nth-child(2n)]:text-black", */
		)}
		>
			{children}
		</div>
	)
}
