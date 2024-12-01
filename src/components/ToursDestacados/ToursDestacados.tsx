import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ToursPopulares: React.FC = () => {
  const [currentTourIndex, setCurrentTourIndex] = useState(0)
  const { t } = useTranslation()
  const toursRecomendadas: any[] = t('toursRecomendados', {
    returnObjects: true
  }) as any[]

  if (!toursRecomendadas || !toursRecomendadas.length) {
    return <div>Loading tours...</div>
  }

  const nextTour = () => {
    setCurrentTourIndex(prevIndex =>
      prevIndex === toursRecomendadas.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTour = () => {
    setCurrentTourIndex(prevIndex =>
      prevIndex === 0 ? toursRecomendadas.length - 1 : prevIndex - 1
    )
  }

  const currentTour = toursRecomendadas[currentTourIndex]

  return (
    <div className='relative min-h-screen w-full bg-secondary text-dark-secondary dark:bg-dark-secondary dark:text-primary-lightest overflow-hidden'>
      <div className='absolute inset-0'>
        <img
          src={`/assets/${currentTour.bgImage}`}
          alt={currentTour.title}
          className='w-full h-full object-cover dark:opacity-20'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-dark-primary-foreground/70 to-transparent dark:from-dark-primary-foreground/90' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-12 h-full flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div className='max-w-2xl space-y-6'>
            <h1
              className='text-8xl font-extrabold uppercase tracking-wider mb-6'
              style={{
                backgroundImage: `url(/assets/${currentTour.bgImage})`,
                backgroundSize: 'cover',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {currentTour.title}
            </h1>
            <p className='text-lg leading-relaxed text-primary-darkest dark:text-primary-lightest/80 bg-white/30 p-3 rounded'>
              {currentTour.longDescription}
            </p>
            <Link to='/search-tours'>
              <Button
                variant='outline'
                className='text-primary border-primary hover:bg-primary hover:text-secondary dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900 my-5'
              >
                {t('discover_tour')}
              </Button>
            </Link>
          </div>
          <div className='hidden lg:flex space-x-4'>
            <Button
              variant='outline'
              size='icon'
              onClick={prevTour}
              className='rounded-full border-dark-secondary text-dark-secondary hover:bg-dark-secondary/20 dark:border-primary-lightest dark:text-primary-lightest dark:hover:bg-primary-dark/20'
            >
              <ChevronLeft className='h-6 w-6' />
              <span className='sr-only'>{t('tours.previous_destination')}</span>
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={nextTour}
              className='rounded-full border-dark-secondary text-dark-secondary hover:bg-dark-secondary/20 dark:border-primary-lightest dark:text-primary-lightest dark:hover:bg-primary-dark/20'
            >
              <ChevronRight className='h-6 w-6' />
              <span className='sr-only'>{t('tours.next_destination')}</span>
            </Button>
          </div>
        </div>

        <div className='mt-12'>
          <Carousel className='w-full'>
            <CarouselContent>
              {currentTour.routes.map((route: any, index: number) => (
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                  <Card className='bg-secondary dark:bg-dark-card text-dark-secondary dark:text-primary-lightest rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105'>
                    <CardContent className='p-0'>
                      <img
                        src={`/assets/${route.image}`}
                        alt={route.name}
                        className='w-full h-48 object-cover'
                      />
                      <div className='p-4 space-y-3'>
                        <h4 className='font-bold text-xl'>{route.name}</h4>
                        <p className='text-sm text-dark-primary/80 dark:text-primary-lightest/80 line-clamp-2'>
                          {route.region}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default ToursPopulares
