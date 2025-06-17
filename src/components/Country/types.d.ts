import type { Country } from '@/generated/graphql.ts'

interface ICols {
	title: string
	key: 'name' | 'code' | 'currency'
	isSearch?: boolean
}
