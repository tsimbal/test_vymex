<template>
	<main>
		<div class="container mx-auto">
			<h1 class="text-center text-3xl">County list</h1>
			<div class="search_box_wrapper flex justify-end">
				<SearchBox />
			</div>
			<div class="table_wrapper">
				<CountryList></CountryList>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import CountryList from '@/components/Country/List.vue'
import SearchBox from '@/components/Country/SearchBox.vue'
</script>
