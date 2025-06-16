import { useQuery } from '@tanstack/vue-query'

const GET_COUNTRIES = `
  query {
    countries {
      code, name, currency
    }
  }
`

export const useCountries = () => {
	const getCountry = async () => {
		try {
			const response = await fetch(import.meta.env.VITE_API_BASE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: GET_COUNTRIES
				})
			})

			if (!response.ok) throw Error(response.statusText)

			return await response.json()
		} catch (e) {
			console.log(e)
		}
	}

	return useQuery({
		queryKey: ['allCountries'],
		queryFn: getCountry,
		select(data) {
			return data.data.countries
		}
	})
}
