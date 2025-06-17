import countryService from '@/services/countryService'
import { useQuery } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

export const useCountryByName = () => {
	const searchTerm = ref('')
	const debounceValue = ref('')

	const debounceSearch = useDebounceFn((searchValue: string) => {
		debounceValue.value = searchValue
	}, 400)

	watch(searchTerm, newTerm => {
		debounceSearch(newTerm)
	})

	const response = useQuery({
		queryKey: ['countryByName', debounceValue],
		queryFn: () =>
			countryService.searchCountriesByName({
				name: { regex: debounceValue.value }
			}),
		enabled: computed(
			() => debounceValue.value.length > 1 || !!debounceValue.value.length
		),
		select(data) {
			return data.countries
		}
	})

	return {
		response,
		searchTerm
	}
}
