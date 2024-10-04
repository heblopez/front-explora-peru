import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    id: 1,
    image: '/assets/reviewer1.jpg',
    name: 'Sarah Morgan',
    text: 'Choose from an extensive selection of blends and single origins, each crafted to deliver a unique. Choose from an extensive selection of blends and single origins, each crafted to deliver a unique.'
  },
  {
    id: 2,
    image: '/assets/reviewer2.jpg',
    name: 'John Doe',
    text: 'The tour was absolutely amazing. The guides were knowledgeable and the scenery was breathtaking.'
  },
  {
    id: 3,
    image: '/assets/reviewer3.jpg',
    name: 'Emma Wilson',
    text: 'I had the time of my life on this adventure. The experiences were unforgettable and I made great friends.'
  },
  {
    id: 4,
    image: '/assets/reviewer4.jpg',
    name: 'Michael Brown',
    text: 'The attention to detail in planning the trip was impressive. Every day was a new and exciting experience.'
  },
  {
    id: 5,
    image: '/assets/reviewer5.jpg',
    name: 'Lisa Chen',
    text: 'From the moment I booked until the end of the trip, the service was impeccable. Highly recommended!'
  }
]

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + reviews.length) % reviews.length
    )
  }

  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden'>
      <div className='absolute top-4 left-4 w-24 h-24 opacity-10'>
        <svg viewBox='0 0 100 100' className='w-full h-full text-white'>
          <rect x='0' y='0' width='45' height='45' fill='currentColor' />
          <rect x='55' y='0' width='45' height='45' fill='currentColor' />
          <rect x='0' y='55' width='45' height='45' fill='currentColor' />
          <rect x='55' y='55' width='45' height='45' fill='currentColor' />
        </svg>
      </div>
      <div className='absolute bottom-4 right-4 w-24 h-24 opacity-10'>
        <svg viewBox='0 0 100 100' className='w-full h-full text-white'>
          <rect x='0' y='0' width='45' height='45' fill='currentColor' />
          <rect x='55' y='0' width='45' height='45' fill='currentColor' />
          <rect x='0' y='55' width='45' height='45' fill='currentColor' />
          <rect x='55' y='55' width='45' height='45' fill='currentColor' />
        </svg>
      </div>

      <div className='max-w-4xl w-full'>
        <h2 className='text-yellow-400 text-xl mb-2 text-center'>
          Testimonios reales
        </h2>
        <h1 className='text-5xl font-bold mb-12 text-center text-white'>
          Reviews
        </h1>

        <div className='relative'>
          <div className='flex justify-center items-center mb-8'>
            {[-1, 0, 1].map(offset => {
              const index =
                (currentIndex + offset + reviews.length) % reviews.length
              return (
                <div
                  key={reviews[index].id}
                  className={`transform transition-all duration-300 ${
                    offset === 0 ? 'scale-125 z-20'
                    : offset === -1 ?
                      '-translate-x-1/2 scale-75 z-10 opacity-60'
                    : 'translate-x-1/2 scale-75 z-10 opacity-60'
                  }`}
                >
                  <img
                    src={reviews[index].image}
                    alt={reviews[index].name}
                    className='w-64 h-64 object-cover rounded-3xl'
                  />
                </div>
              )
            })}
          </div>

          <div className='text-center text-white'>
            <h3 className='text-xl font-semibold mb-4'>
              {reviews[currentIndex].name}
            </h3>
            <p className='text-gray-300 max-w-2xl mx-auto'>
              {reviews[currentIndex].text}
            </p>
          </div>

          <div className='flex justify-center mt-8 space-x-2'>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-all'
            aria-label='pre-slide'
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition-all'
            aria-label='next-slide'
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
