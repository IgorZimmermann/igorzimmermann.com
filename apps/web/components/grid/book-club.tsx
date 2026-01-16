import { load } from "cheerio"
import Image from "next/image"

import { cn } from "../../lib/cn"

export default async function GridItemBookClub() {
	const resp = await fetch("https://www.goodreads.com/user/show/107252153", { next: {
		revalidate: 60 * 60 * 12, // 12 hours in seconds,
	} })
	const $ = load(await resp.text())

	const bookTitle = $("#currentlyReadingReviews>div.Updates>div.firstcol>a[title]").attr("title")
	const bookUrl = `https://www.goodreads.com${$("#currentlyReadingReviews>div.Updates>div.firstcol>a[title]").attr("href")}`
	const bookAuthor = $("#currentlyReadingReviews>div.Updates>div.secondcol a.authorName").text()
	const bookImage = $("#currentlyReadingReviews>div.Updates>div.firstcol>a[title]>img[src]").attr("src")?.replace("._SX98_", "._SX800_")

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
						<span>failed loading book</span>
					)}

		</div>
	)
}
