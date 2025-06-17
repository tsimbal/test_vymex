import { graphqlClient } from '@/services/graphqlClient'
import {
	GetAllCountriesDocument,
	SearchCountriesDocument,
	type CountryFilterInput,
	type GetAllCountriesQuery,
	type SearchCountriesQuery
} from '@/graphql/generated/graphql'

class CountryService {
	async fetchCountries() {
		return graphqlClient.request<GetAllCountriesQuery>(GetAllCountriesDocument)
	}

	async searchCountriesByName(filter: CountryFilterInput) {
		return graphqlClient.request<SearchCountriesQuery>(
			SearchCountriesDocument,
			{ filter }
		)
	}
}

export default new CountryService()
