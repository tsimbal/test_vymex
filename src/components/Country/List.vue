<template>
	<div class="country_list">
		<div class="table_wrapper">
			<Table class="text-base">
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
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody class="max-h-[300px] overflow-y-auto">
					<template v-if="countries?.length">
						<TableRow v-for="country of countries" :key="country.code">
							<TableCell
								v-for="col of tableCols"
								:key="`cell_${country[col.key]}`"
							>
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
		</div>
	</div>
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

import { useCountries } from '@/composables/useCountries'
import type { ICols } from './types'

const { data: countries, isLoading } = useCountries()

const tableCols: ICols[] = [
	{ title: 'Код', key: 'code', isSearch: false },
	{ title: 'Назва країни', key: 'name', isSearch: true },
	{ title: 'Валюта', key: 'currency', isSearch: false }
]
</script>
