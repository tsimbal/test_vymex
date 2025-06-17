<template>
	<div class="wrapper w-full">
		<Combobox
			by="label"
			v-model="selectedCountry"
			:ignore-filter="true"
			class="bg-secondary"
		>
			<ComboboxAnchor as-child>
				<ComboboxTrigger as-child>
					<div class="relative w-full max-w-sm items-center">
						<ComboboxInput
							class="pl-9"
							name="country"
							v-model="searchTerm"
							:display-value="() => selectedCountry"
							placeholder="Введіть назву країни..."
							@focus="isOpen = true"
						/>
						<span
							class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
						>
							<Search class="size-4 text-muted-foreground" />
						</span>
					</div>
				</ComboboxTrigger>
			</ComboboxAnchor>
			<ComboboxList>
				<ComboboxEmpty v-if="!isLoading && !isFetching && !data?.length"
					>Країн за запитом не знайдено</ComboboxEmpty
				>
				<ComboboxEmpty v-if="isLoading || isFetching">Пошук...</ComboboxEmpty>
				<ComboboxGroup v-else>
					<ComboboxItem
						v-for="country in data"
						:key="`search_${country.code}`"
						:value="country.name"
						@select="selectedCountry = country.name"
					>
						{{ country.name }}

						<ComboboxItemIndicator>
							<Check :class="cn('ml-auto h-4 w-4')" />
						</ComboboxItemIndicator>
					</ComboboxItem>
				</ComboboxGroup>
			</ComboboxList>
		</Combobox>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Check, Search } from 'lucide-vue-next'

import {
	Combobox,
	ComboboxAnchor,
	ComboboxEmpty,
	ComboboxTrigger,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxItemIndicator,
	ComboboxList
} from '@/components/ui/combobox'

import { useCountryByName } from '@/composables/useCountryByName'
import { cn } from '@/lib/utils'

const isOpen = ref(false)
const selectedCountry = ref('')

const {
	response: { data, isLoading, isFetching },
	searchTerm
} = useCountryByName()

const displayLoading = computed(() => {
	return isLoading.value || isFetching.value
})

const showResults = computed(() => {
	return (
		searchTerm.value.length > 2 &&
		(isLoading.value || searchTerm.value.length > 0)
	)
})
</script>
