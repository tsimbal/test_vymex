<template>
	<div class="country_list">
		<div class="table_wrapper">
			<Table class="text-base">
				<TableHeader>
					<TableRow>
						<TableHead
							v-for="col of tableCols"
							:key="`col_${col.field}`"
							:class="cn(['capitalize', col.width])"
						>
							<template v-if="col.isSearch">
								<SearchTable
									v-model="searchTerm[col.field]"
									v-model:field="keyBySearch"
									:col-filed="col.field"
									:label="col.title"
								/>
							</template>
							<template v-else> {{ col.title }}</template>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="isLoading">
						<TableEmpty class="text-base" :colspan="tableCols.length">
							Завантаження...
						</TableEmpty>
					</template>
					<template v-else-if="!dataNotFound">
						<TableRow v-for="country of paginatedCountries" :key="country.code">
							<TableCell
								v-for="col of tableCols"
								:key="`cell_${country[col.field]}`"
								:class="cn([col.width])"
							>
								{{ country[col.field] }}
							</TableCell>
						</TableRow>
					</template>
					<template v-else-if="dataNotFound">
						<TableEmpty class="text-base" :colspan="tableCols.length"
							>Даних не знайдено</TableEmpty
						>
					</template>
				</TableBody>
				<TableFooter v-show="!dataNotFound">
					<TableCaption class="text-base">
						<Pagination
							v-model:current-page="currentPage"
							:limit="limit"
							:list="list"
						/>
					</TableCaption>
				</TableFooter>
			</Table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { useCountries } from '@/composables/useCountries'

import type { ICols } from './types'
import {
	Table,
	TableBody,
	TableEmpty,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
	TableCaption
} from '@/components/ui/table'
import Pagination from '@/components/Country/Pagination.vue'
import SearchTable from '@/components/Country/SearchTable.vue'
import { useCountryWithCurrencyByName } from '@/composables/useCountryWithCurrencyByName'

const {
	data: countries,
	isLoading: isLoadingAllCountries,
	isFetching: isFetchingAllCountries
} = useCountries()
const {
	response: {
		data: countryByName,
		isLoading: isLoadingByName,
		isFetching: isFetchingCountryByName
	},
	keyBySearch,
	searchTerm
} = useCountryWithCurrencyByName()

const currentPage = ref(1)
const limit = ref(15)

const tableCols: ICols[] = [
	{ title: 'Код', field: 'code', isSearch: false, width: 'w-1/6' },
	{ title: 'Назва країни', field: 'name', isSearch: true, width: 'w-4/6' },
	{ title: 'Валюта', field: 'currency', isSearch: false, width: 'w-1/6' }
]

const list = computed(() => {
	return countryByName.value || countries.value
})

const isLoading = computed(
	() =>
		isLoadingAllCountries.value ||
		isLoadingByName.value ||
		isFetchingAllCountries.value ||
		isFetchingCountryByName.value
)

const dataNotFound = computed(() => {
	return !list.value?.length && !isLoading.value
})

const paginatedCountries = computed(() => {
	if (!list.value) return []

	const start = (currentPage.value - 1) * limit.value
	const end = start + limit.value

	return list.value?.slice(start, end)
})
</script>
