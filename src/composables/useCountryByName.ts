import countryService from '@/services/countryService'
import { useQuery } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref, watch, watchEffect } from 'vue'

export const useCountryByName = () => {
	const { searchCountriesByName } = countryService

	const searchTerm = ref('')
	const updatedSearchValue = ref('')

	const debounceSearch = useDebounceFn((searchValue: string) => {
		updatedSearchValue.value = searchValue
	}, 400)

	watch(searchTerm, newTerm => {
		debounceSearch(newTerm)
	})

	const isEnableRequest = computed(
		() =>
			updatedSearchValue.value.length > 1 || !!updatedSearchValue.value.length
	)

	const response = useQuery({
		queryKey: ['countryByName', updatedSearchValue],
		queryFn: () =>
			searchCountriesByName({
				name: { regex: updatedSearchValue.value }
			}),
		enabled: isEnableRequest,
		select(data) {
			return data.countries
		}
	})

	watchEffect(() => {
		if (response.isError.value) {
			console.log(
				'Error fetching country by name: ',
				response.error.value?.message
			)
		}
	})

	return {
		response,
		searchTerm
	}
}
