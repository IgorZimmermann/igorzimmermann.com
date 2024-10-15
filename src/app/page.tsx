import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Tile } from '../components/Tile'
import { TileGrid } from '../components/TileGrid'
import { TileTimeline } from '../components/TileTimeline'
import { TimelineItem } from '../types/TimelineItem'

export default function Home() {
	const studiesTimeline: TimelineItem[] = [
		{
			startDate: new Date('2024-09-01T00:00:00Z'),
			label: 'Software Engineering, BSc',
			sublabel: 'Syddansk Universitet',
		},
		{
			startDate: new Date('2020-09-01T00:00:00Z'),
			endDate: new Date('2024-06-31T00:00:00Z'),
			label: 'ELTE Apáczai Csere János Grammar School',
		},
		{
			startDate: new Date('2012-09-01T00:00:00Z'),
			endDate: new Date('2020-06-31T00:00:00Z'),
			label: 'Városligeti Hungarian-English Bilingual Primary School',
		},
	]

	const experienceTimeline: TimelineItem[] = [
		{
			startDate: new Date('2024-06-01T00:00:00Z'),
			endDate: new Date('2024-07-31T00:00:00Z'),
			label: 'PA assistent',
			sublabel: 'Isetta Catering',
		},
		{
			startDate: new Date('2022-06-01T00:00:00Z'),
			endDate: new Date('2022-08-31T00:00:00Z'),
			label: 'busboy',
			sublabel: 'Fellini Római Kultúrbisztró',
		},
	]

	return (
		<>
			<Navbar />
			<Header />
			<TileGrid>
				<Tile label="studies">
					<TileTimeline timeline={studiesTimeline} dateFormat="yyyy" />
				</Tile>
				<Tile label="experience">
					<TileTimeline timeline={experienceTimeline} />
				</Tile>
			</TileGrid>
		</>
	)
}
