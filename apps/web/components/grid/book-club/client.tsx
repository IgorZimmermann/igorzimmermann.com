"use client"

import { track } from "@vercel/analytics"
import Image from "next/image"
import Link from "next/link"

import type { siteVariables } from "./load-bookclub-sites"

import { cn } from "../../../lib/cn"

type GridItemBookClubProps = {
	bookTitle: string | undefined
	bookUrl: string
	bookAuthor: string
	bookImage: string | undefined

	bookclub: siteVariables | null
	thisIndex: number | null
	previousIndex: number
	nextIndex: number
}

export default function GridItemBookClubClient({ bookTitle, bookUrl, bookAuthor, bookImage, bookclub, thisIndex, previousIndex, nextIndex }: GridItemBookClubProps) {
	return (
		<div className={cn("flex justify-center items-center w-full h-full")}>
			{(bookImage && bookTitle && bookAuthor && bookUrl)
				? (
						<div className={cn("flex flex-col items-center gap-5")}>
							<Image src={bookImage} alt={bookTitle} width={1000} height={800} className={cn("h-[40dvh] max-h-[40dvw] w-auto")} />
							<div className={cn("flex flex-col items-center")}>
								<h3 className={cn("font-bold text-2xl mt-5")}>{bookTitle}</h3>
								<span>{bookAuthor}</span>
							</div>
							<Link
								href={bookUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={cn("px-5 py-1 bg-(--button-bg) text-(--button-c) transition-colors ease-in duration-100 hover:bg-(--button-c) hover:text-(--button-bg)")}

								onClick={() => {
									track("Book View", { title: bookTitle })
								}}
							>
								View
							</Link>
						</div>
					)
				: (
						<p className={cn("max-w-[40dvw] text-center")}>not reading anything currently</p>
					)}
			{bookclub !== null && thisIndex !== null && (
				<>
					<Link
						href={bookclub.sites[previousIndex]}
						target="_blank"
						rel="noopener"
						className={cn("absolute left-2 md:left-10 top-[50%] transform-[translateY(-50%)] hover:underline")}

						onClick={() => {
							track("Book Club Interact", { type: "previous" })
						}}
					>
						← previous
					</Link>
					<Link
						href={bookclub.sites[nextIndex]}
						target="_blank"
						rel="noopener"
						className={cn("absolute right-2 md:right-10 top-[50%] transform-[translateY(-50%)] hover:underline")}

						onClick={() => {
							track("Book Club Interact", { type: "next" })
						}}
					>
						next →
					</Link>
					<p
						className={cn("absolute left-[50%] bottom-2 transform-[translateX(-50%)] w-full text-center")}
					>
						This site is part of the
						{" "}
						<Link
							href={bookclub.indexPage}
							target="_blank"
							rel="noopener"
							className={cn("hover:underline")}

							onClick={() => {
								track("Book Club Interact", { type: "index" })
							}}
						>
							{bookclub.ringName}
						</Link>
						{" "}
						webring.
					</p>
				</>
			)}
		</div>
	)
}
