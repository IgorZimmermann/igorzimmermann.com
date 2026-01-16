import type { NextConfig } from "next"

import env from "./lib/env"

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [new URL(`${env.NODE_ENV === "production" ? env.STRAPI_MEDIA : env.STRAPI_URL}/**`), new URL("https://i.gr-assets.com/**")],
		dangerouslyAllowLocalIP: env.NODE_ENV === "development",
	},
}

export default nextConfig
