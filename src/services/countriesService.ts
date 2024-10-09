export interface Countries {
  userCountryCode: string
  countries: CountrySelect[]
  userSelectValue: CountrySelect
}

export interface CountrySelect {
  value: string
  label: string
}

export const getCountries = async () => {
  try {
    const res = await fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
    )
    if (!res.ok) {
      throw new Error('Error at fetching countries list.')
    }
    return (await res.json()) as Promise<Countries>
  } catch (error) {
    console.error(error)
  }
}
