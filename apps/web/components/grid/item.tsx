import type { ReactNode } from "react"

import { cn } from "../../lib/cn"
import { Enum_Homepagegriditem_Width } from "../../types/generated/graphql"

type GridItemProps = {
	label: string | null | undefined
	width: Enum_Homepagegriditem_Width
	children: ReactNode
}

export default function GridItem({ label, width, children }: GridItemProps) {
	return (
		<div className={
			cn(
				"relative",
				width === Enum_Homepagegriditem_Width.Half ? "aspect-square" : "col-span-2",
				width === Enum_Homepagegriditem_Width.Full && "h-[50dvw]",
			)
		}
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
