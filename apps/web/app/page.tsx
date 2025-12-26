import type { HomepageQuery } from "../types/generated/graphql"

import { HomepageDocument } from "../types/generated/graphql"
import { query } from "./apollo-client"

export default async function Home() {
	const content = await query<HomepageQuery>({ query: HomepageDocument })

	return (
		<div>
			{content.data && content.data.homepage && content.data.homepage.homepage_grid_items.map((gridItem) => {
				if (gridItem !== null) {
					return (
						<p key={gridItem.documentId}>{gridItem.title}</p>
					)
				}
				else {
					return null
				}
			})}
		</div>
	)
}
