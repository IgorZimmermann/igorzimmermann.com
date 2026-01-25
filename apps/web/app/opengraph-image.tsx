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
			<div tw="w-full h-full flex flex-col items-center justify-center text-center bg-black text-white font-sans">
				<h1 tw="font-bold text-4xl uppercase m-0">igor zimmermann</h1>
				<h3 tw="m-0">bsc, software engineering @ sdu</h3>
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
