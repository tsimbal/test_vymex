import type { SearchCountriesWithCurrencyQuery } from '@/graphql/generated/graphql'
import countryService from '@/services/countryService'
import { useQuery } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref, watch, watchEffect } from 'vue'

export type CountryWithCurrencyRow =
	SearchCountriesWithCurrencyQuery['countries'][number]

export const useCountryWithCurrencyByName = () => {
	const { searchCountriesWithCurrencyByName } = countryService

	const keyBySearch = ref<keyof CountryWithCurrencyRow>('name')
	const searchTerm = ref<{ [key in keyof CountryWithCurrencyRow]: string }>(
		{} as Record<keyof CountryWithCurrencyRow, string>
	)
	const updatedSearchValue = ref('')

	const debounceSearch = useDebounceFn((searchValue: string) => {
		updatedSearchValue.value = searchValue
	}, 400)

	watch(
		() => searchTerm.value[keyBySearch.value],
		newTerm => {
			debounceSearch(newTerm || '')
		}
	)

	const isEnableRequest = computed(
		() =>
			updatedSearchValue.value.length > 1 || !!updatedSearchValue.value.length
	)

	const response = useQuery({
		queryKey: ['countryWithCurrencyByName', updatedSearchValue],
		queryFn: () =>
			searchCountriesWithCurrencyByName({
				[keyBySearch.value]: { regex: updatedSearchValue.value }
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
		searchTerm,
		keyBySearch
	}
}
