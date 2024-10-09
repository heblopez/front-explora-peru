import { CountrySelect, getCountries } from '@/services/countriesService'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../ui/command'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export default function CountriesSelect() {
  const [countryUser, setCountryUser] = useState<CountrySelect | null>(null)
  const [countriesList, setCountriesList] = useState<
    CountrySelect[] | undefined
  >()
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    getCountries().then(data => {
      if (data) {
        setCountryUser(data.userSelectValue)
        setCountriesList(data.countries)
      }
    })
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {countryUser ? countryUser.label : t('register.selectCountry')}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={t('register.searchCountry')} />
          <CommandList>
            <CommandEmpty>{t('register.noCountry')}</CommandEmpty>
            <CommandGroup>
              {countriesList?.map(country => (
                <CommandItem
                  key={country.value}
                  value={country.label}
                  onSelect={(currentValue: string) => {
                    setCountryUser(
                      currentValue === countryUser?.label ? null : country
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      countryUser?.value === country.value ?
                        'opacity-100'
                      : 'opacity-0'
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
