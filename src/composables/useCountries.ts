import countryService from '@/services/countryService'
import { useQuery } from '@tanstack/vue-query'

export const useCountries = () => {
	return useQuery({
		queryKey: ['allCountries'],
		queryFn: countryService.fetchCountries,
		select(data) {
			return data.countries
		}
	})
}
