import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_PB_API_URL,
	documents: ['src/app/**/*.tsx'],
	ignoreNoDocuments: true,
	generates: {
		'./src/gql/': {
			preset: 'client',
		},
	},
}

export default config
