import { ref, toValue } from 'vue'

export const useApi = async (url: string) => {
	const data = ref(null)
	const error = ref<string | null>(null)

	const response = await fetch(
		`${import.meta.env.VUE_APP_BASE_API_URL}${toValue(url)}`,
		{
			method: '',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)

	if (response.ok) data.value = await response.json()
	error.value = response.statusText

	return { data, error }
}
