import { load } from "cheerio"

import env from "../../../lib/env"
import GridItemBookClubClient from "./client"
import { loadBookClubSites } from "./load-bookclub-sites"

export default async function GridItemBookClub() {
	const resp = await fetch("https://www.goodreads.com/user/show/107252153", { next: {
		revalidate: 60 * 60, // 1 hour in seconds,
	} }).catch((err) => {
		console.error("error", err)
		return { ok: false, text: async () => "no" }
	})
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
		<GridItemBookClubClient
			bookAuthor={bookAuthor}
			bookImage={bookImage}
			bookTitle={bookTitle}
			bookUrl={bookUrl}

			bookclub={bookclub}
			thisIndex={thisIndex}
			previousIndex={previousIndex}
			nextIndex={nextIndex}
		/>
	)
}
