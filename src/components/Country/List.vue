<template>
	<Table>
		<TableCaption v-if="isLoading" class="text-base"
			>Завантаження...</TableCaption
		>
		<TableHeader>
			<TableRow>
				<TableHead
					v-for="col of tableCols"
					:key="`col_${col.key}`"
					class="capitalize"
				>
					{{ col.title }}
					<SearchBox v-if="col.isSearch"></SearchBox>
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<template v-if="countries?.length">
				<TableRow v-for="country of countries" :key="country.code">
					<TableCell v-for="col of tableCols" :key="`cell_${country[col.key]}`">
						{{ country[col.key] }}
					</TableCell>
				</TableRow>
			</template>
			<template v-else-if="!countries?.length && !isLoading">
				<TableEmpty class="text-base" :colspan="tableCols.length"
					>Даних не знайдено</TableEmpty
				>
			</template>
		</TableBody>
	</Table>
</template>

<script lang="ts" setup>
import {
	Table,
	TableCaption,
	TableBody,
	TableEmpty,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import SearchBox from '@/components/Country/SearchBox.vue'

import { useCountries } from '@/composables/useCountries'

const { data: countries, isLoading } = useCountries()

const tableCols = [
	{ title: 'Код', key: 'code', isSearch: false },
	{ title: 'Назва країни', key: 'name', isSearch: true },
	{ title: 'Валюта', key: 'currency', isSearch: false }
]
</script>
