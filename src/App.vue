<template>
	<div class="page_wrapper p-4">
		<main class="container mx-auto relative">
			<ThemeSwitcher />
			<RouterView />
		</main>
		<VueQueryDevtools />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import ThemeSwitcher from '@/components/Theme/Switcher.vue'
</script>

<style scoped></style>
