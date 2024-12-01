import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useTranslation()

  const reviews = t('reviewsCarousel.reviews', { returnObjects: true }) as {
    image: string
    name: string
    text: string
  }[]

  return (
    <div className='bg-secondary text-dark-secondary dark:bg-dark-primary-foreground dark:text-white min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden'>
      <div className='max-w-4xl w-full space-y-8'>
        <header className='text-center'>
          <h2 className='text-primary text-lg font-medium uppercase tracking-wide dark:text-yellow-400'>
            {t('reviewsCarousel.header.subtitle')}
          </h2>
          <h1 className='text-primary-dark text-5xl font-extrabold dark:text-white'>
            {t('reviewsCarousel.header.title')}
          </h1>
        </header>
        <div className='relative'>
          <div className='relative h-80'>
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
                  index === currentIndex ?
                    'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-90 z-0'
                }`}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className='w-40 h-40 object-cover rounded-full shadow-lg mb-4'
                />
                <h3 className='text-2xl font-bold'>{review.name}</h3>
                <p className='mt-4 text-lg text-dark-secondary dark:text-gray-300 max-w-lg'>
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          <div className='flex justify-center mt-8 space-x-3'>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex ?
                    'bg-primary scale-110 dark:bg-cyan-400'
                  : 'bg-primary-lightest hover:bg-primary dark:bg-gray-600 dark:hover:bg-primary-lightest'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
