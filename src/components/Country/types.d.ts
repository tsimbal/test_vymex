import type { Country, GetAllCountriesQuery } from '@/graphql/generated/graphql'

type CountryRow = GetAllCountriesQuery['countries'][number]

export interface ICols {
	title: string
	field: keyof CountryRow
	isSearch?: boolean
	width?: string | 'auto'
}

export interface ICountryPaginationProps<T> {
	defaultPage?: number
	limit: number
	list: T[] | undefined
}

export interface ISearchInputProps {
	label: string
	placeholder?: string
	colFiled: keyof CountryRow
}
