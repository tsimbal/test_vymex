import { useQuery } from '@tanstack/vue-query'

const GET_COUNTRIES_BY_NAME = `
  query($name: String) {
    countries(filter: {name: {regex: $name}}) {
        code
        name
        currency
    }
  }
`

const getCountryByName = async (name: string) => {
	try {
		const response = await fetch(import.meta.env.VITE_API_BASE_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: GET_COUNTRIES_BY_NAME,
				variables: { name }
			})
		})

		if (!response.ok) throw Error(response.statusText)

		return await response.json()
	} catch (e) {
		console.log(e)
	}
}

export const useCountryByName = (name: string) => {
	console.log(name, 'composables')

	return useQuery({
		queryKey: ['countryByName', name],
		queryFn: () => getCountryByName(name),
		enabled: !!name
	})
}
