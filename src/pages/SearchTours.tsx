import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
import { StarFilledIcon } from '@radix-ui/react-icons'
import { LucideClock, MapPin, Search, StarIcon } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type SortByOptions = 'newest' | 'min-price' | 'max-price'
interface QueryForm {
  name: string
  region: string
  minPrice: string
  maxPrice: string
  sortBy: SortByOptions
}

export default function SearchTours() {
  const [queryForm, setQueryForm] = useState({} as QueryForm)
  const [tours, setTours] = useState<Tour[] | null>(null)
  const [loading, setLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    const queryArr = []
    setLoading(true)
    const { name, region, minPrice, maxPrice, sortBy } = params
    if (name) {
      setQueryForm(prev => ({ ...prev, name }))
      queryArr.push(`name=${name}`)
    }
    if (region) {
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
                  <label className='text-sm font-medium text-gray-700 dark:text-inherit'>
                    Por región:
                  </label>
                  <Select
                    value={queryForm.region}
                    onValueChange={value =>
                      setQueryForm({ ...queryForm, region: value })
                    }
                  >
                    <SelectTrigger className='mt-1 dark:border-primary-lighter'>
                      <SelectValue placeholder='Seleccionar región' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Todas las regiones</SelectItem>
                      <SelectItem value='Cuzco'>Cuzco</SelectItem>
                      <SelectItem value='Lima'>Lima</SelectItem>
                      <SelectItem value='Arequipa'>Arequipa</SelectItem>
                      <SelectItem value='Cajamarca'>Cajamarca</SelectItem>
                      <SelectItem value='Ica'>Ica</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Card
                  key={tour.tourId}
                  className='flex flex-col dark:bg-dark-secondary'
                >
                  <CardHeader>
                    <CardTitle className='text-lg font-semibold line-clamp-2'>
                      {tour.tourName}
                    </CardTitle>
                    <CardDescription className='flex items-center text-gray-700 dark:text-inherit'>
                      <MapPin className='h-4 w-4 mr-1 text-gray-700 dark:text-inherit' />
                      <em>
                        {tour.regions.length > 0 ?
                          tour.regions.join(' - ')
                        : ''}
                      </em>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <div className='flex justify-between items-center mb-2'>
                      <div className='flex items-center'>
                        {tour.rating ?
                          <>
                            <StarFilledIcon className='h-4 w-4 text-yellow-400 mr-1' />
                            <span>{tour.rating}</span>
                          </>
                        : <>
                            <StarIcon className='h-4 w-4 text-yellow-400 mr-1' />
                            <p className='text-sm text-gray-500 dark:text-inherit'>
                              Aún no hay calificaciones
                            </p>
                          </>
                        }
                      </div>
                      <div className='text-sm text-gray-700 dark:text-inherit'>
                        <LucideClock className='h-4 w-4 inline mr-1' />
                        {tour.duration}
                      </div>
                    </div>
                    <p className='text-2xl font-bold'>${tour.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/tours/${tour.tourId}`}>
                      <Button className='w-full bg-primary hover:bg-primary-light dark:bg-primary-darker dark:hover:bg-primary-dark dark:text-inherit'>
                        Ver detalles
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
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
