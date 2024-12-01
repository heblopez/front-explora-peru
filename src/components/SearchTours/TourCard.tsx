import { Tour } from '@/types/tour'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { LucideClock, MapPin, StarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Card key={tour.tourId} className='flex flex-col dark:bg-dark-secondary'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold line-clamp-2'>
          {tour.tourName}
        </CardTitle>
        <CardDescription className='flex items-center text-gray-700 dark:text-inherit'>
          <MapPin className='h-4 w-4 mr-1 text-gray-700 dark:text-inherit' />
          <em>{tour.regions.length > 0 ? tour.regions.join(' - ') : ''}</em>
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
  )
}
