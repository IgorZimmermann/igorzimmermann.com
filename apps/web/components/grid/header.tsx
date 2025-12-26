import { cn } from "../../lib/cn"

type GridItemHeaderProps = {
	title: string
	subtitle: string
}

export default function GridItemHeader({ title, subtitle }: GridItemHeaderProps) {
	return (
		<div className={cn("flex justify-center items-center w-full h-full")}>
			<div className={cn("flex flex-col items-center")}>
				<h1 className={cn("font-bold text-4xl uppercase")}>{title}</h1>
				<h3>{subtitle}</h3>
			</div>
		</div>
	)
}
