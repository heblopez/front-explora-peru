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
import { Tour } from '@/types/Tour'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { LucideClock, MapPin, Search } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SearchTours() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([70, 120])
  const [tours, setTours] = useState<Tour[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/tours')
      .then(res => res.json())
      .then(data => setTours(data))
  }, [])

  function handleSearch(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    console.log('buscando...', searchTerm)
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
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
                  <Select>
                    <SelectTrigger className='mt-1 dark:border-primary-lighter'>
                      <SelectValue placeholder='Todas las regiones' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Todas las regiones</SelectItem>
                      <SelectItem value='cusco'>Cusco</SelectItem>
                      <SelectItem value='lima'>Lima</SelectItem>
                      <SelectItem value='arequipa'>Arequipa</SelectItem>
                      <SelectItem value='puno'>Puno</SelectItem>
                      <SelectItem value='ica'>Ica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-700 dark:text-inherit'>
                    Por rango de precio:
                  </label>
                  <DualRangeSlider
                    min={0}
                    max={400}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className='mt-2'
                  />
                  <div className='flex justify-between text-sm text-gray-700 mt-1 dark:text-inherit'>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-700 dark:text-inherit'>
                    Ordenar por:
                  </label>
                  <Select>
                    <SelectTrigger className='mt-1 dark:border-primary-lighter'>
                      <SelectValue placeholder='Seleccionar orden' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='date'>Más recientes</SelectItem>
                      <SelectItem value='rating'>Mejor valorados</SelectItem>
                      <SelectItem value='price'>
                        Precio: menor a mayor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-100 dark:bg-dark-primary-foreground'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {tours.map((tour: Tour) => (
              <Card
                key={tour.id}
                className='flex flex-col dark:bg-dark-secondary'
              >
                <CardHeader>
                  <CardTitle className='text-lg font-semibold line-clamp-2'>
                    {tour.name}
                  </CardTitle>
                  <CardDescription className='flex items-center text-gray-700 dark:text-inherit'>
                    <MapPin className='h-4 w-4 mr-1 text-gray-700 dark:text-inherit' />
                    <em>{tour.region}</em>
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <div className='flex justify-between items-center mb-2'>
                    <div className='flex items-center'>
                      <StarFilledIcon className='h-4 w-4 text-yellow-400 mr-1' />
                      <span>{tour.rating}</span>
                    </div>
                    <div className='text-sm text-gray-700 dark:text-inherit'>
                      <LucideClock className='h-4 w-4 inline mr-1' />
                      {`${tour.duration} ${tour.duration === 1 ? 'h' : 'hs'}`}
                    </div>
                  </div>
                  <p className='text-2xl font-bold'>${tour.price}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/tours/${tour.id}`}>
                    <Button className='w-full bg-primary hover:bg-primary-light dark:bg-primary-darker dark:hover:bg-primary-dark dark:text-inherit'>
                      Ver detalles
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
