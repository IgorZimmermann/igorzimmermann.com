import moment from "moment"

import type { EventItem } from "../../types/generated/graphql"

import { cn } from "../../lib/cn"
import { Enum_Componenthomepageeventlist_Sort } from "../../types/generated/graphql"

type GridItemEventListProps = {
	sort: Enum_Componenthomepageeventlist_Sort
	eventList: (EventItem | null)[]
}

export default function GridItemEventList({ sort, eventList }: GridItemEventListProps) {
	const sortedEventList = eventList.slice().sort((a, b) => {
		if (a === null || b === null)
			return 0
		return (new Date(a.Start).valueOf() - new Date(b.Start).valueOf()) * (sort === Enum_Componenthomepageeventlist_Sort.Ascending ? -1 : 1)
	})

	return (
		<div className={cn("flex justify-center items-center w-full h-full px-2")}>
			<div className={cn("w-full py-5")}>
				<ul>
					{sortedEventList.map((event) => {
						if (event !== null) {
							return (
								<li key={event.documentId} className={cn("flex justify-between items-center w-full not-last:mb-10")}>
									<p className={cn("font-bold lowercase")}>
										{moment(event.Start).format("YYYY MMM")}
										{" "}
										-
										{" "}
										{event.End ? moment(event.End).format("YYYY MMM") : "present"}
									</p>
									<div className={cn("text-right")}>
										<p>{event.Value}</p>
										{event.Subvalue && <p>{event.Subvalue}</p>}
									</div>
								</li>
							)
						}
						else {
							return null
						}
					},
					)}
				</ul>
			</div>
		</div>
	)
}
