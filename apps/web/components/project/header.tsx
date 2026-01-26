import type { Moment } from "moment"

import moment from "moment"
import Link from "next/link"

import { cn } from "../../lib/cn"

type ProjectHeaderProps = {
	title: string
	date?: Moment
	description: string
}

export default function ProjectHeader({ title, date, description }: ProjectHeaderProps) {
	return (
		<div className={cn("relative w-full h-[30dvh] bg-white text-black")}>
			<Link href="/" className={cn("absolute top-2 left-2 text-xs uppercase font-bold hover:underline")}>
				← home
			</Link>
			<div className={cn("h-full w-[75ch] flex flex-row items-center justify-between mx-auto")}>
				<div>
					<h1 className={cn("text-4xl font-bold")}>{title}</h1>
					<p>{description}</p>
				</div>
				{date && <span className={cn("text-4xl font-bold")}>{moment(date).format("YYYY")}</span>}
			</div>
		</div>
	)
}
