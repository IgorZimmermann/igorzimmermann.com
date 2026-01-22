import { load } from "cheerio"
import Image from "next/image"

import { cn } from "../../lib/cn"
import env from "../../lib/env"
import { loadBookClubSites } from "../../lib/load-bookclub-sites"

export default async function GridItemBookClub() {
	const resp = await fetch("https://www.goodreads.com/user/show/107252153", { next: {
		revalidate: 60 * 60, // 1 hour in seconds,
	} })
	const $ = load(await resp.text())

	const bookTitle = $("#currentlyReadingReviews>div.Updates>div.firstcol>a[title]").attr("title")
	const bookUrl = `https://www.goodreads.com${$("#currentlyReadingReviews>div.Updates>div.firstcol>a[title]").attr("href")}`
	const bookAuthor = $("#currentlyReadingReviews>div.Updates>div.secondcol a.authorName").text()
	const bookImage = $("#currentlyReadingReviews>div.Updates>div.firstcol>a[title]>img[src]").attr("src")?.replace("._SX98_", "._SX800_")

	const bookclub = await loadBookClubSites()
	let thisIndex: number | null = null

	let previousIndex: number = 0
	let nextIndex: number = 0

	if (bookclub !== null) {
		thisIndex = bookclub.sites.findIndex(x => x.startsWith(env.DOMAIN))
		if (thisIndex === -1) {
			thisIndex = null
		}

		if (thisIndex !== null) {
			previousIndex = (thisIndex - 1 < 0) ? bookclub.sites.length - 1 : thisIndex - 1
			nextIndex = (thisIndex + 1 >= bookclub.sites.length) ? 0 : thisIndex + 1
		}
	}

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
							<a
								href={bookUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={cn("px-5 py-1 bg-white text-black transition-colors ease-in duration-100 hover:bg-black hover:text-white")}
							>
								View
							</a>
						</div>
					)
				: (
						<p className={cn("max-w-[40dvw] text-center")}>not reading anything currently</p>
					)}
			{bookclub !== null && thisIndex !== null && (
				<>
					<a
						href={bookclub.sites[previousIndex]}
						target="_blank"
						className={cn("absolute left-2 md:left-10 top-[50%] transform-[translateY(-50%)] hover:underline")}
					>
						← previous
					</a>
					<a
						href={bookclub.sites[nextIndex]}
						target="_blank"
						className={cn("absolute right-2 md:right-10 top-[50%] transform-[translateY(-50%)] hover:underline")}
					>
						next →
					</a>
					<p
						className={cn("absolute left-[50%] bottom-2 transform-[translateX(-50%)] w-full text-center")}
					>
						This site is part of the
						{" "}
						<a href={bookclub.indexPage} target="_blank" className={cn("hover:underline")}>
							{bookclub.ringName}
						</a>
						{" "}
						webring.
					</p>
				</>
			)}
		</div>
	)
}
