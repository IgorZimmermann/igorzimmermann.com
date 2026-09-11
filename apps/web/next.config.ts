import type { NextConfig } from "next"

import env from "./lib/env"

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [new URL(`${env.STRAPI_MEDIA.replace(/\/$/, "")}/**`), new URL("https://i.gr-assets.com/**")],
		dangerouslyAllowLocalIP: env.NODE_ENV === "development",
	},
}

export default nextConfig
