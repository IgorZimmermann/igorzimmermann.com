import { format } from 'date-fns'
import React from 'react'
import { TimelineItem } from '../types/TimelineItem'

interface TileTimelineProps {
	timeline: TimelineItem[]
	dateFormat?: string
}

export const TileTimeline: React.FC<TileTimelineProps> = ({
	timeline,
	dateFormat = 'yyyy MMMM',
}) => {
	return (
		<ul className="list-none m-0 p-0 w-full">
			{timeline.map(({ startDate, endDate, label, sublabel }) => (
				<li
					key={label}
					className="flex flex-row justify-between w-full mb-10 last:mb-0"
				>
					<span className="w-[35%] lowercase font-bold">
						{format(startDate, dateFormat)}
						{' - '}
						{endDate ? format(endDate, dateFormat) : 'present'}
					</span>
					<div className="text-right flex flex-col w-[55%] text-wrap">
						<span>{label}</span>
						{sublabel && <span>{sublabel}</span>}
					</div>
				</li>
			))}
		</ul>
	)
}
