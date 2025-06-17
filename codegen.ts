import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
	schema: process.env.VITE_GRAPHQL_API || 'https://countries.trevorblades.com/',
	documents: 'src/graphql/queries/**/*.gql',
	generates: {
		'src/graphql/generated/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request'
			],
			config: {
				useTypeImports: true
			}
		}
	}
}

export default config
