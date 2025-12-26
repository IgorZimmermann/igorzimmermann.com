import type { CodegenConfig } from "@graphql-codegen/cli"

import env from "./lib/env"

const config: CodegenConfig = {

	schema: env.STRAPI_URL,
	documents: "../../packages/graphql-documents/**/*.graphql",
	generates: {
		"./types/generated/graphql.ts": { plugins: ["typescript", "typescript-operations", "typed-document-node"] },
	},
}

export default config
