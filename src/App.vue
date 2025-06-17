<template>
	<div class="page_wrapper p-4">
		<RouterView />
		<VueQueryDevtools />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<style scoped></style>
