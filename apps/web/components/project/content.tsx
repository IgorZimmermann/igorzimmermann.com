"use client"
import type { BlocksContent } from "@strapi/blocks-react-renderer"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Image from "next/image"

import { cn } from "../../lib/cn"

export default function ProjectContent({
	content,
}: {
	readonly content: BlocksContent
}) {
	if (!content)
		return null
	return (
		<div className={cn("px-2 max-w-[75ch] mx-auto mb-20", "*:mb-5 [&>*:first-child]:mt-10")}>
			<BlocksRenderer
				content={content}
				blocks={{
					paragraph: ({ children }) => {
						return (
							<p>{children}</p>
						)
					},
					heading: ({ level, children }) => {
						if (level === 1 || level === 2) {
							return (
								<h2 className={cn("font-bold text-3xl mt-10 first:mt-5")}>{children}</h2>
							)
						}
						else {
							return (
								<h3 className={cn("font-bold text-2xl mt-2")}>{children}</h3>
							)
						}
					},
					image: ({ image }) => {
						return (
							<Image
								src={image.url}
								alt={image.alternativeText || ""}
								width={2000}
								height={2000}
							/>
						)
					},
				}}
			/>
		</div>
	)
}
