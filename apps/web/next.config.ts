import type { NextConfig } from "next"

import env from "./lib/env"

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [new URL(`${env.STRAPI_URL}/**`)],
		dangerouslyAllowLocalIP: env.NODE_ENV === "development",
	},
}

export default nextConfig
