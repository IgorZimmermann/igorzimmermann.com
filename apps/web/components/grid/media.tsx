"use client"

import { track } from "@vercel/analytics"
import Image from "next/image"
import Link from "next/link"

import type { Enum_Componenthomepagemedia_Type, UploadFile } from "../../types/generated/graphql"

import { cn } from "../../lib/cn"

type GridItemMediaProps = {
	image: Pick<UploadFile, "url" | "alternativeText">
	type: Enum_Componenthomepagemedia_Type
	title: string
	link: string
	release: string | null
}

export default function GridItemMedia({ image, title, link, release }: GridItemMediaProps) {
	return (
		<div className={cn("flex justify-center items-center w-full h-full")}>
			<div className={cn("relative w-full h-full overflow-clip")}>
				<Image src={image.url} alt={image.alternativeText || ""} width={3000} height={3000} className={cn("h-full w-full object-cover opacity-60 blur-xs")} />
				<div className={cn("absolute z-10 top-0 left-0 h-full w-full flex flex-col items-center justify-center gap-5")}>
					<div className={cn("flex flex-col items-center")}>
						<h3 className={cn("font-bold text-2xl")}>{title}</h3>
						{release && (
							<span>
								(
								{release}
								)
							</span>
						)}
					</div>
					<Link
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className={cn("px-5 py-1 bg-(--button-bg) text-(--button-c) transition-colors ease-in duration-100 hover:bg-transparent hover:text-(--button-bg)")}

						onClick={() => {
							track("Media View", { title })
						}}
					>
						View
					</Link>
				</div>
			</div>
		</div>
	)
}
