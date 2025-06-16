<template>
	<div class="input_wrapper">
		<input type="email" name="email" v-model="email" />
	</div>
</template>

<script lang="ts" setup>
import { ref, toValue } from 'vue'

import { useCountryByName } from '@/composables/useCountryByName'

const email = ref('')
const { data, isLoading, refetch } = useCountryByName(toValue(email))

const test = (e: Event) => {
	console.log(e)
}
</script>
