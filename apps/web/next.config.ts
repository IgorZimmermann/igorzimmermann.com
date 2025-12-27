import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [new URL("http://localhost:1337/**")],
		dangerouslyAllowLocalIP: true,
	},
}

export default nextConfig
