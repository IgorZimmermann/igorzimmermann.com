import moment from "moment"

import type { HomepageQuery } from "../types/generated/graphql"

import Footer from "../components/footer"
import GridItemBookClub from "../components/grid/book-club"
import GridContainer from "../components/grid/container"
import GridItemMagnet from "../components/grid/decorative/magnet"
import GridItemEventList from "../components/grid/event-list"
import GridItemHeader from "../components/grid/header"
import GridItem from "../components/grid/item"
import GridItemMedia from "../components/grid/media"
import { Enum_Componenthomepagedecorative_Type, HomepageDocument } from "../types/generated/graphql"
import { query } from "./apollo-client"

export const revalidate = 60

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
									case "ComponentHomepageDecorative":
										switch (gridItem.content[0].decorationType) {
											case Enum_Componenthomepagedecorative_Type.MagnetLines:
												return <GridItemMagnet />
											default:
												return null
										}
									case "ComponentHomepageMedia":
										return <GridItemMedia image={gridItem.content[0].cover} type={gridItem.content[0].mediaType} title={gridItem.content[0].title} link={gridItem.content[0].link} release={gridItem.content[0].release ? moment(gridItem.content[0].release).format("YYYY") : null} />
									case "ComponentHomepageBookClub":
										return <GridItemBookClub />
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
			<Footer />
		</GridContainer>
	)
}
