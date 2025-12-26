import type { HomepageQuery } from "../types/generated/graphql"

import GridContainer from "../components/grid/container"
import GridItemEventList from "../components/grid/event-list"
import GridItemHeader from "../components/grid/header"
import GridItem from "../components/grid/item"
import { HomepageDocument } from "../types/generated/graphql"
import { query } from "./apollo-client"

export default async function Home() {
	const content = await query<HomepageQuery>({ query: HomepageDocument })

	return (
		<GridContainer>
			{content.data && content.data.homepage && content.data.homepage.homepage_grid_items.map((gridItem) => {
				if (gridItem !== null && gridItem.content[0]) {
					return (
						<GridItem label={gridItem.title} width={gridItem.width} key={gridItem.documentId}>
							{(() => {
								switch (gridItem.content[0].__typename) {
									case "ComponentHomepageHeader":
										return <GridItemHeader title={gridItem.content[0].title} subtitle={gridItem.content[0].subtitle} />
									case "ComponentHomepageEventList":
										return gridItem.content[0].event_items && <GridItemEventList sort={gridItem.content[0].sort} eventList={gridItem.content[0].event_items} />
									default:
										return null
								}
							})()}
						</GridItem>
					)
				}
				else {
					return null
				}
			})}
		</GridContainer>
	)
}
