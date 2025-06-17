import { graphqlClient } from '@/services/graphqlClient'
import {
	GetAllCountriesDocument,
	SearchCountriesDocument,
	SearchCountriesWithCurrencyDocument,
	type CountryFilterInput,
	type GetAllCountriesQuery,
	type SearchCountriesQuery,
	type SearchCountriesWithCurrencyQuery
} from '@/graphql/generated/graphql'

class CountryService {
	async fetchCountries() {
		return graphqlClient.request<GetAllCountriesQuery>(GetAllCountriesDocument)
	}

	async searchCountriesWithCurrencyByName(filter: CountryFilterInput) {
		return graphqlClient.request<SearchCountriesWithCurrencyQuery>(
			SearchCountriesWithCurrencyDocument,
			{ filter }
		)
	}

	async searchCountriesByName(filter: CountryFilterInput) {
		return graphqlClient.request<SearchCountriesQuery>(
			SearchCountriesDocument,
			{ filter }
		)
	}
}

export default new CountryService()
