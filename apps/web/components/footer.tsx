import moment from "moment"

import { cn } from "../lib/cn"

export default function Footer() {
	return (
		<div
			className={cn(
				"md:col-span-2 h-[calc((100dvh-50dvw)/2)]",
				"[:nth-child(4n)]:bg-black [:nth-child(4n)]:text-white [:nth-child(4n-1)]:bg-black [:nth-child(4n-1)]:text-white",
			)}
			id="footer"
		>
			<div className={cn("flex justify-center items-center w-full h-full")}>
				<span>
					{moment().format("YYYY")}
					{" "}
					&copy; Igor Zimmermann
				</span>
			</div>
		</div>
	)
}
