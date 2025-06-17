<template>
	<section class="inner_wrapper">
		<h1 class="text-center text-5xl">Список країн</h1>
		<h2 class="caption mb-3 text-base">Пошук в Combobox</h2>
		<div class="search_box_wrapper flex justify-start mb-6">
			<SearchBox />
		</div>
		<div class="table_wrapper">
			<h2 class="caption mb-2 text-base">Пошук в таблиці</h2>
			<CountryTable />
		</div>
	</section>
</template>

<script setup lang="ts">
import CountryTable from '@/components/Country/CountryTable.vue'
import SearchBox from '@/components/Country/SearchBox.vue'
</script>
