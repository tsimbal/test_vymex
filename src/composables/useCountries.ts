import countryService from '@/services/countryService'
import { useQuery } from '@tanstack/vue-query'
import { watchEffect } from 'vue'

export const useCountries = () => {
	const { fetchCountries } = countryService

	const response = useQuery({
		queryKey: ['allCountries'],
		queryFn: fetchCountries,
		select(data) {
			return data.countries
		}
	})

	watchEffect(() => {
		if (response.isError.value) {
			console.log('Error fetching countries: ', response.error.value?.message)
		}
	})

	return response
}
