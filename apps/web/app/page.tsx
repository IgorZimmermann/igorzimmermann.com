import { strapiClient } from "../lib/strapi"

export default async function Home() {
	const content = await strapiClient.single("homepage").find({ populate: "homepage_grid_items" })

	return (
		<div>
			{content.data.homepage_grid_items.map((x: { documentId: string, title: string, width: "half" | "full" }) => (
				<p key={x.documentId}>{x.title}</p>
			))}
		</div>
	)
}
