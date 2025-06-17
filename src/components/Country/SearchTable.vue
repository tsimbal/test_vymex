<template>
	<div class="with_search flex items-center gap-x-3">
		<div>
			<span>{{ label }}</span>
		</div>
		<div class="relative w-full max-w-sm items-center">
			<Input
				:id="`search-${colFiled}`"
				v-model="modelValue"
				type="text"
				:name="`country-${colFiled}`"
				:placeholder="placeholder"
				class="pl-10"
			/>
			<span
				class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
			>
				<Search class="size-6 text-muted-foreground" />
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

import type { ISearchInputProps } from './types.d'

const {
	label = 'Label',
	placeholder = 'Пошук...',
	colFiled = 'name'
} = defineProps<ISearchInputProps>()
const modelValue = defineModel('modelValue', {
	type: String,
	default: '',
	set(value: string) {
		fieldBySearch.value = colFiled

		return value
	}
})
const fieldBySearch = defineModel('field', {
	type: String,
	default: ''
})
</script>
