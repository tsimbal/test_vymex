import { GraphQLClient } from 'graphql-request'

const endpoint =
	import.meta.env.VITE_API_BASE_API_URL || 'https://countries.trevorblades.com/'

export const graphqlClient = new GraphQLClient(endpoint)
