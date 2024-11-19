import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tour } from '@/types/tour'
import { Button } from '@/components/ui/button'
import {
  StarFilledIcon,
  GlobeIcon,
  ClockIcon,
  CalendarIcon,
  CheckCircledIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getTourById, getTours } from '@/services/tourService'

export default function TourDetailPage() {
  const { id } = useParams<{ id?: string }>()
  const [tour, setTour] = useState<Tour | null>(null)
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const toursPerPage = 4

  useEffect(() => {
    if (!id) {
      console.error('Tour ID no disponible')
      return
    }

    const fetchTour = async () => {
      try {
        const fetchedTour = await getTourById(id)
        setTour(fetchedTour)
      } catch (error) {
        console.error('Error fetching tour:', error)
      }
    }

    const fetchFeaturedTours = async () => {
      try {
        const fetchedTours = await getTours('featured=true')
        setFeaturedTours(fetchedTours || [])
      } catch (error) {
        console.error('Error fetching featured tours:', error)
      }
    }

    fetchTour()
    fetchFeaturedTours()
  }, [id])

  const handleNext = () => {
    if (currentIndex + toursPerPage < featuredTours.length) {
      setCurrentIndex(currentIndex + toursPerPage)
    }
  }

  const handlePrev = () => {
    if (currentIndex - toursPerPage >= 0) {
      setCurrentIndex(currentIndex - toursPerPage)
    }
  }

  if (!tour) {
    return <p>Cargando...</p>
  }

  return (
    <div className='p-4 md:p-8 bg-white dark:bg-gray-800'>
      <h1 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
        {tour.tourName}
      </h1>

      <p className='text-lg mb-2 flex items-center'>
        <StarFilledIcon className='text-yellow-500 mr-1' />
        <strong>{tour.rating || 'Sin valoraciones'}</strong>
      </p>
      {/* Mostrar la imagen del tour justo debajo de la calificación */}
      {tour.photosUrl.length > 0 && (
        <div className='mb-4 p-2 border rounded-lg shadow-md bg-white dark:bg-gray-700'>
          <img
            src={tour.photosUrl[0]}
            alt={`${tour.tourName} - imagen`}
            className='w-3/4 h-auto mx-auto rounded-md'
          />
        </div>
      )}
      <div className='flex flex-col md:flex-row mb-8'>
        <div className='w-full md:w-2/3 pr-0 md:pr-8 mb-4 md:mb-0'>
          <p className='text-lg mb-4 text-gray-800 dark:text-gray-200'>
            {tour.tourDescription}
          </p>
          <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
            Información sobre el tour
          </h2>
          <ul className='space-y-4'>
            {[
              {
                icon: <GlobeIcon className='text-xl mr-2' />,
                label: 'Región:',
                value: tour.regions.join(', ') || 'No especificada'
              },
              {
                icon: <ClockIcon className='text-xl mr-2' />,
                label: 'Duración:',
                value: `${tour.duration} h` || 'No especificada'
              },
              {
                icon: <CalendarIcon className='text-xl mr-2' />,
                label: 'Días disponibles:',
                value: tour.days?.join(', ') || 'No especificados'
              },
              {
                icon: <CheckCircledIcon className='text-xl mr-2' />,
                label: 'Cancelación gratuita:',
                value:
                  'Cancela con hasta 24 horas de antelación y recibe un reembolso completo'
              },
              {
                icon: <PersonIcon className='text-xl mr-2' />,
                label: 'Guía:',
                value: 'Inglés - Español'
              }
            ].map((item, index) => (
              <li key={index} className='flex items-start'>
                {item.icon}
                <div>
                  <p className='font-bold'>{item.label}</p>
                  <p>{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-full md:w-1/3'>
          <div className='p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-700'>
            <p className='text-sm'>Precio</p>
            <p className='text-3xl font-bold text-gray-900 dark:text-white'>
              ${tour.price}
            </p>
            <p className='text-sm mb-4'>por persona</p>
            <Button className='bg-primary hover:bg-primary-light dark:bg-primary-darker dark:text-inherit mb-4'>
              Ver disponibilidad
            </Button>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              <a href='#' className='text-blue-500'>
                Reservar ahora y pagar después
              </a>{' '}
              te permite asegurarte una plaza, sin que se realice ningún cargo
              hoy.
            </p>
          </div>
        </div>
      </div>

      <h2 className='text-2xl font-semibold mt-8 text-gray-900 dark:text-white'>
        Otras sugerencias
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {featuredTours
          .slice(currentIndex, currentIndex + toursPerPage)
          .map(featuredTour => (
            <Card
              key={featuredTour.tourId}
              className='flex flex-col dark:bg-dark-secondary'
            >
              <CardHeader>
                <CardTitle className='text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white'>
                  {featuredTour.tourName}
                </CardTitle>
                <CardDescription className='flex items-center text-gray-700 dark:text-gray-400'>
                  <GlobeIcon className='h-4 w-4 mr-1' />
                  <em>{featuredTour.regions.join(', ')}</em>
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='flex justify-between items-center mb-2'>
                  <div className='flex items-center'>
                    <StarFilledIcon className='h-4 w-4 text-yellow-400 mr-1' />
                    <span>{featuredTour.rating || 'Sin valoraciones'}</span>
                  </div>
                  <div className='text-sm text-gray-700 dark:text-gray-400'>
                    <ClockIcon className='h-4 w-4 inline mr-1' />
                    {`${featuredTour.duration} h`}
                  </div>
                </div>
                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                  ${featuredTour.price} USD
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/tours/${featuredTour.tourId}`}>
                  <Button className='w-full bg-primary hover:bg-primary-light dark:bg-primary-darker dark:text-inherit'>
                    Ver detalles
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
      <div className='flex justify-between mt-4'>
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className='bg-primary hover:bg-primary-light dark:bg-primary-darker dark:text-inherit'
        >
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex + toursPerPage >= featuredTours.length}
          className='bg-primary hover:bg-primary-light dark:bg-primary-darker dark:text-inherit'
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
