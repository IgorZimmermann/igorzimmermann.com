import type { ReactNode } from "react"

import { cn } from "../../lib/cn"
import { normalize } from "../../lib/normalize"
import { Enum_Homepagegriditem_Width } from "../../types/generated/graphql"

type GridItemProps = {
	label: string | null | undefined
	width: Enum_Homepagegriditem_Width
	children: ReactNode
}

export default function GridItem({ label, width, children }: GridItemProps) {
	return (
		<div
			className={
				cn(
					"relative",
					"[:nth-child(4n)]:bg-white [:nth-child(4n)]:text-black [:nth-child(4n-1)]:bg-white [:nth-child(4n-1)]:text-black",
					"[--button-bg:white] [--button-c:black]",
					"[:nth-child(4n)]:[--button-bg:black] [:nth-child(4n)]:[--button-c:white] [:nth-child(4n-1)]:[--button-bg:black] [:nth-child(4n-1)]:[--button-c:white]",
					"scroll-mt-[calc((100dvh-50dvw)/2)]",
					width === Enum_Homepagegriditem_Width.Half ? "aspect-square" : "md:col-span-2",
					width === Enum_Homepagegriditem_Width.Full && "h-dvw md:h-[50dvw]",
				)
			}
			id={label ? normalize(label) : undefined}
		>
			{label
				&& (
					<label className={cn(
						"uppercase font-bold absolute z-10 top-2 left-2 text-xs",
					)}
					>
						{label}
					</label>
				)}
			{children}
		</div>
	)
}
