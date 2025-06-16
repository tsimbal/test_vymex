<template>
	<main>
		<div class="container mx-auto">
			<h1 class="text-center">County list</h1>
			<div class="table_wrapper">
				<CountryList></CountryList>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import CountryList from '@/components/Country/List.vue'
</script>
