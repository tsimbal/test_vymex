import { graphqlClient } from '@/services/graphqlClient'
import {
	GetAllCountriesDocument,
	SearchCountriesDocument,
	type CountryFilterInput,
	type GetAllCountriesQuery,
	type SearchCountriesQuery
} from '@/graphql/generated/graphql'

class CountryService {
	fetchCountries() {
		return graphqlClient.request<GetAllCountriesQuery>(GetAllCountriesDocument)
	}

	searchCountriesByName(filter: CountryFilterInput) {
		return graphqlClient.request<SearchCountriesQuery>(
			SearchCountriesDocument,
			{ filter }
		)
	}
}

export default new CountryService()
