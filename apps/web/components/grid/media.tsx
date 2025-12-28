import Image from "next/image"
import { join } from "node:path"

import type { Enum_Componenthomepagemedia_Type, UploadFile } from "../../types/generated/graphql"

import { cn } from "../../lib/cn"
import env from "../../lib/env"

type GridItemMediaProps = {
	image: Pick<UploadFile, "url" | "alternativeText">
	type: Enum_Componenthomepagemedia_Type
	title: string
	link: string
}

export default function GridItemMedia({ image, title, link }: GridItemMediaProps) {
	return (
		<div className={cn("flex justify-center items-center w-full h-full")}>
			<div className={cn("w-full px-32 flex flex-col items-center gap-10")}>
				<Image src={env.NODE_ENV === "production" ? image.url : join(env.STRAPI_URL, image.url)} alt={image.alternativeText || ""} width={1000} height={1000} className={cn("object-cover")} />
				<h3 className={cn("font-bold text-2xl")}>{title}</h3>
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className={cn("px-5 py-1 bg-white text-black transition-colors ease-in duration-100 hover:bg-black hover:text-white")}
				>
					View
				</a>
			</div>
		</div>
	)
}
