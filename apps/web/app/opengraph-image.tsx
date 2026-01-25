import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

// eslint-disable-next-line react-refresh/only-export-components
export const size = {
	width: 1280,
	height: 600,
}

// eslint-disable-next-line react-refresh/only-export-components
export const contentType = "image/jpg"

export default async function Image() {
	const fontRegular = await readFile(
		join(process.cwd(), "assets/fonts/SFPRODISPLAYREGULAR.OTF"),
	)
	const fontBold = await readFile(
		join(process.cwd(), "assets/fonts/SFPRODISPLAYBOLD.OTF"),
	)

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					backgroundColor: "black",
					color: "white",
					fontFamily: "ui-sans-serif, system-ui, sans-serif",
				}}
			>
				<h1 style={{
					fontWeight: 700,
					fontSize: "36px",
					textTransform: "uppercase",
					margin: 0,
				}}
				>
					igor zimmermann
				</h1>
				<h3
					style={{ fontWeight: 400, margin: 0 }}
				>
					bsc, software engineering @ sdu
				</h3>
			</div>
		),
		{
			fonts: [
				{
					name: "sf",
					data: fontRegular,
					weight: 400,
				},
				{
					name: "sf",
					data: fontBold,
					weight: 700,
				},
			],
		},
	)
}
