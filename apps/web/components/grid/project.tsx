import Image from "next/image"
import Link from "next/link"

import type { UploadFile } from "../../types/generated/graphql"

import { cn } from "../../lib/cn"

type GridItemProjectProps = {
	title: string
	slug: string
	cover: Pick<UploadFile, "url" | "alternativeText">
}

export default function GridItemProject({ title, slug, cover }: GridItemProjectProps) {
	return (
		<div className={cn("flex justify-center items-center w-full h-full")}>
			<div className={cn("flex flex-col items-center gap-5")}>
				<Image src={cover.url} alt={cover.alternativeText || ""} width={1500} height={1000} className={cn("h-[40dvh] max-h-[40dvw] w-auto")} />
				<h3 className={cn("font-bold text-2xl mt-5")}>{title}</h3>
				<Link
					href={`/project/${slug}`}
					className={cn("px-5 py-1 bg-(--button-bg) text-(--button-c) transition-colors ease-in duration-100 hover:bg-(--button-c) hover:text-(--button-bg)")}
				>
					View
				</Link>
			</div>
		</div>
	)
}
