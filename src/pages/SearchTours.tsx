import RegionsSelect from '@/components/SearchTours/RegionsSelect'
import TourCard from '@/components/SearchTours/TourCard'
import { Button } from '@/components/ui/button'
import { DualRangeSlider } from '@/components/ui/dual-slider'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { getTours } from '@/services/tourService'
import { Tour } from '@/types/tour'
import { Search } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type SortByOptions = 'newest' | 'min-price' | 'max-price'
export interface IQueryForm {
  name: string
  region: string
  minPrice: string
  maxPrice: string
  sortBy: SortByOptions
}

export default function SearchTours() {
  const [queryForm, setQueryForm] = useState({} as IQueryForm)
  const [tours, setTours] = useState<Tour[] | null>(null)
  const [loading, setLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    const queryArr = []
    setLoading(true)
    let { name, region, minPrice, maxPrice, sortBy } = params
    if (name) {
      setQueryForm(prev => ({ ...prev, name }))
      queryArr.push(`name=${name}`)
    }
    if (region) {
      if (region === 'all') region = ''
      setQueryForm(prev => ({ ...prev, region }))
      queryArr.push(`region=${region}`)
    }
    if (minPrice) {
      setQueryForm(prev => ({ ...prev, minPrice }))
      queryArr.push(`minPrice=${minPrice}`)
    }
    if (maxPrice) {
      setQueryForm(prev => ({ ...prev, maxPrice }))
      queryArr.push(`maxPrice=${maxPrice}`)
    }
    if (sortBy) {
      setQueryForm(prev => ({ ...prev, sortBy: sortBy as SortByOptions }))
      queryArr.push(`sortBy=${sortBy}`)
    }
    getTours(queryArr.join('&')).then(data => {
      setLoading(false)
      if (data) setTours(data)
    })
  }, [searchParams])

  function handleSearch(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    console.log('Buscando...', queryForm)
    setSearchParams({ ...queryForm })
  }

  function handleSort(sortBy: 'newest' | 'min-price' | 'max-price') {
    setQueryForm(prev => ({ ...prev, sortBy }))
  }

  return (
    <main className='flex flex-col'>
      <section className='bg-gradient-to-r from-blue-500 to-purple-600 py-12 w-full dark:from-primary-darker dark:to-purple-950'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl text-white font-bold mb-6 text-center font-title'>
            Descubre Tours Increíbles
          </h1>
          <div className='max-w-4xl mx-auto space-y-6'>
            <form onSubmit={handleSearch}>
              <div className='flex items-center bg-white dark:bg-dark-secondary rounded-lg overflow-hidden shadow-lg'>
                <Input
                  type='text'
                  placeholder='Buscar tours...'
                  className='flex-grow border-none focus:ring-0 focus:border-none dark:placeholder:text-white focus-visible:ring-0'
                  value={queryForm.name}
                  onChange={e =>
                    setQueryForm({ ...queryForm, name: e.target.value })
                  }
                />
                <Button
                  type='submit'
                  className='rounded-none bg-primary hover:bg-primary-light dark:bg-dark-primary-foreground dark:text-inherit dark:hover:bg-primary-darker'
                >
                  <Search className='h-5 w-5 mr-2' />
                  Buscar
                </Button>
              </div>
            </form>
            <div className='bg-white rounded-lg shadow-lg p-6 dark:bg-dark-secondary dark:text-secondary'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <RegionsSelect
                    queryForm={queryForm}
                    handleRegionChange={value =>
                      setQueryForm({ ...queryForm, region: value })
                    }
                  />
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-700 dark:text-inherit'>
                    Por rango de precio:
                  </label>
                  <DualRangeSlider
                    label={value => value}
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                      queryForm.minPrice === undefined ?
                        0
                      : +queryForm.minPrice,
                      queryForm.maxPrice === undefined ?
                        1000
                      : +queryForm.maxPrice
                    ]}
                    onValueChange={value =>
                      setQueryForm({
                        ...queryForm,
                        minPrice: value[0].toString(),
                        maxPrice: value[1].toString()
                      })
                    }
                    className='mt-8 text-sm text-primary-darker dark:text-primary-lighter'
                  />
                  <div className='flex justify-between text-sm text-gray-700 mt-1 dark:text-inherit'>
                    <span>$0</span>
                    <span>$1000</span>
                  </div>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-700 dark:text-inherit'>
                    Ordenar por:
                  </label>
                  <Select onValueChange={handleSort}>
                    <SelectTrigger className='mt-1 dark:border-primary-lighter'>
                      <SelectValue placeholder='Seleccionar orden' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='newest'>Más recientes</SelectItem>
                      <SelectItem value='min-price'>
                        Precio: menor a mayor
                      </SelectItem>
                      <SelectItem value='max-price'>
                        Precio: mayor a menor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='flex py-12 bg-gray-100 dark:bg-dark-primary-foreground min-h-[25rem] justify-center items-center'>
        <div className='container mx-auto px-4'>
          <Spinner show={loading} size='large' className='mb-4'>
            Loading tours...
          </Spinner>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {tours &&
              tours.map((tour: Tour) => (
                <TourCard key={tour.tourId} tour={tour} />
              ))}
            {tours && tours.length === 0 && (
              <div className='flex flex-col md:col-span-2 lg:col-span-3 items-center justify-center'>
                <p className='text-2xl font-bold text-primary mb-4'>
                  No hay tours disponibles
                </p>
                <p className='dark:text-inherit'>
                  Intenta buscar con otros criterios
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
