// RouteCard.tsx
import React from 'react'
import { Clock, Star } from 'lucide-react'

interface Route {
  name: string
  region: string
  rating: number
  image: string
  duration: string
  price: string
  ratingCount: number
  category: string
  summary: string
  agency: string
}

interface RouteCardProps {
  route: Route
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => (
  <div
    className={`flex-shrink-0 w-64 sm:w-72 bg-white  rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 h-96`}
  >
    <img
      src={`/assets/${route.image}`}
      alt={route.name}
      className='w-full h-48 object-cover'
    />
    <div className='p-4'>
      <h3 className='font-semibold text-lg mb-1 text-[#2975BA]'>
        {route.name}
      </h3>
      <p className='text-sm text-gray-800 text-opacity-80 mb-2'>
        {route.summary}
      </p>
      <div className='flex flex-col items-stretch justify-between'>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-2 mb-2 sm:mb-0'>
            <Clock className='w-4 h-4 text-gray-900 ' />
            <span className='text-sm text-gray-700 text-opacity-80'>
              {route.duration}
            </span>
          </div>
          <span className='text-sm text-green-800'>{route.price}</span>
        </div>

        <div className='flex items-center'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(route.rating) ?
                  'text-yellow-400 fill-current'
                : 'text-gray-700 text-opacity-30'
              }`}
            />
          ))}
          <span className='text-sm ml-1'>{route.rating}</span>
          <span className='text-xs text-gray-700 text-opacity-60 ml-2'>
            ({route.ratingCount})
          </span>
        </div>
      </div>
      <div className='flex items-center justify-between mt-2'>
        <span className='text-sm text-gray-700 text-opacity-60'>
          {route.category}
        </span>
        <span className='text-sm text-gray-700 text-opacity-60'>
          {route.agency}
        </span>
      </div>
    </div>
  </div>
)

export default RouteCard
