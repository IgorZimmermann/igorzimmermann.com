import { gql } from "@apollo/client"

import { query } from "./apollo-client"

export default async function Home() {
	const content = await query({ query: gql`
    query Homepage {
      homepage {
        documentId
        homepage_grid_items {
          documentId
          title
        }
      }
    }
  ` })

	return (
		<div>
			{(content.data as { homepage: { documentId: string, homepage_grid_items: [{ title: string, documentId: string }] } }).homepage.homepage_grid_items.map(x => (
				<p key={x.documentId}>{x.title}</p>
			))}
		</div>
	)
}
