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

export default function TourDetailPage() {
  const { id } = useParams()
  const [tour, setTour] = useState<Tour | null>(null)
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const toursPerPage = 4

  useEffect(() => {
    fetch(`http://localhost:3000/tours/${id}`)
      .then(res => res.json())
      .then(data => setTour(data))

    fetch(`http://localhost:3000/tours?featured=true`)
      .then(res => res.json())
      .then(data => setFeaturedTours(data))
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
        {tour.name}
      </h1>

      <p className='text-lg mb-2 flex items-center'>
        <StarFilledIcon className='text-yellow-500 mr-1' />
        <strong>{tour.rating}</strong>
      </p>
      <div className='flex flex-col md:flex-row mb-8'>
        <div className='w-full md:w-2/3 pr-0 md:pr-8 mb-4 md:mb-0'>
          <p className='text-lg mb-4 text-gray-800 dark:text-gray-200'>
            Explora la Universidad de Harvard, situada cerca de Boston, en un
            tour guiado a pie. Pasea por el campus con un estudiante actual,
            aprende sobre la universidad más antigua de EE.UU. y contempla sus
            monumentos más destacados.
          </p>
          <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
            Información sobre el tour
          </h2>
          <ul className='space-y-4'>
            {[
              {
                icon: <GlobeIcon className='text-xl mr-2' />,
                label: 'Región:',
                value: tour.region
              },
              {
                icon: <ClockIcon className='text-xl mr-2' />,
                label: 'Hora de inicio:',
                value: tour.startTime
              },
              {
                icon: <CalendarIcon className='text-xl mr-2' />,
                label: 'Días disponibles:',
                value: tour.days.join(', ')
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
              key={featuredTour.id}
              className='flex flex-col dark:bg-dark-secondary'
            >
              <CardHeader>
                <CardTitle className='text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white'>
                  {featuredTour.name}
                </CardTitle>
                <CardDescription className='flex items-center text-gray-700 dark:text-gray-400'>
                  <GlobeIcon className='h-4 w-4 mr-1' />
                  <em>{featuredTour.region}</em>
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <div className='flex justify-between items-center mb-2'>
                  <div className='flex items-center'>
                    <StarFilledIcon className='h-4 w-4 text-yellow-400 mr-1' />
                    <span>{featuredTour.rating}</span>
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
                <Link to={`/tours/${featuredTour.id}`}>
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
