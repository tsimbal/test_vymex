<template>
	<Pagination
		class="my-3"
		v-slot="{ page, pageCount }"
		v-model:page="currentPage"
		:items-per-page="limit"
		:total="list.length"
		:default-page="defaultPage"
	>
		<PaginationContent v-slot="{ items }">
			<PaginationPrevious />
			<PaginationEllipsis v-if="currentPage > 3" />
			<template v-for="(item, index) in items" :key="index">
				<PaginationItem
					v-if="item.type === 'page'"
					:value="item.value"
					:is-active="item.value === page"
				>
					{{ item.value }}
				</PaginationItem>
			</template>
			<PaginationEllipsis v-if="currentPage < pageCount - 2" />
			<PaginationNext />
		</PaginationContent>
	</Pagination>
</template>

<script lang="ts" setup generic="T">
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import type { ICountryPaginationProps } from './types.d'

const currentPage = defineModel('currentPage', { type: Number, default: 1 })

const {
	defaultPage = 1,
	limit = 15,
	list = []
} = defineProps<ICountryPaginationProps<T>>()
</script>
