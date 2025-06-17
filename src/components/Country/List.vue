<template>
	<div class="country_list">
		<div class="table_wrapper">
			<Table class="text-base">
				<TableHeader>
					<TableRow>
						<TableHead
							v-for="col of tableCols"
							:key="`col_${col.field}`"
							:class="cn('capitalize', `w-${col.width}`)"
						>
							{{ col.title }}
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
								:class="cn(`w-${col.width}`)"
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
							:list="countries"
						/>
					</TableCaption>
				</TableFooter>
			</Table>
		</div>
	</div>
</template>

<script lang="ts" setup>
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

import { useCountries } from '@/composables/useCountries'
import type { ICols } from './types.d'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

const { data: countries, isLoading } = useCountries()

const currentPage = ref(1)
const limit = ref(15)

const tableCols: ICols[] = [
	{ title: 'Код', field: 'code', isSearch: false, width: '1/6' },
	{ title: 'Назва країни', field: 'name', isSearch: true, width: '4/6' },
	{ title: 'Валюта', field: 'currency', isSearch: false, width: '1/6' }
]

const dataNotFound = computed(() => {
	return !countries.value?.length && !isLoading.value
})

const paginatedCountries = computed(() => {
	if (!countries.value) return []

	const start = (currentPage.value - 1) * limit.value
	const end = start + limit.value

	return countries.value?.slice(start, end) || []
})
</script>
