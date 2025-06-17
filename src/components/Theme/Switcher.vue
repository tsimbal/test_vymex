<template>
	<div class="theme-switcher absolute top-4 right-4 z-50">
		<button @click="toggleDark()">
			<component
				:is="isDarkMode ? Sun : Moon"
				class="theme-icon transition-[transform] duration-300 hover:scale-[1.15] ease-in-out"
			/>
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon } from 'lucide-vue-next'

const isDarkMode = useDark()
const toggleDark = useToggle(isDarkMode)
</script>
