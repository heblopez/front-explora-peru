import { useState } from 'react'
const routesData = [
  {
    name: 'Eiger',
    region: 'Suiza',
    rating: 4.8,
    image:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/0/AtractivoCarouselSection/intihuatana.jpg',
    duration: '3 horas',
    price: '$150',
    ratingCount: 1250,
    category: 'Aventura',
    summary:
      'Escala la famosa cara norte del Eiger en una emocionante aventura alpina.',
    agency: 'Swiss Alpine Tours'
  },
  {
    name: 'Mönch',
    region: 'Suiza',
    rating: 4.7,
    image:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/0/AtractivoCarouselSection/templo-condor.jpg',
    duration: '4 horas',
    price: '$180',
    ratingCount: 980,
    category: 'Aventura',
    summary:
      'Disfruta de vistas panorámicas en esta ruta clásica de los Alpes suizos.',
    agency: 'Mountain Explorers'
  },
  {
    name: 'Piz Bernina',
    region: 'Suiza/Italia',
    rating: 4.9,
    image:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/0/AtractivoCarouselSection/templo-del-sol.jpg',
    duration: '6 horas',
    price: '$220',
    ratingCount: 1500,
    category: 'Aventura',
    summary:
      'Conquista la cima más alta de los Alpes orientales en esta desafiante ruta.',
    agency: 'Alpine Adventures'
  },
  {
    name: 'Mont Blanc',
    region: 'Francia/Italia',
    rating: 4.9,
    image:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/0/AtractivoCarouselSection/intihuatana.jpg',
    duration: '8 horas',
    price: '$250',
    ratingCount: 2000,
    category: 'Aventura',
    summary:
      'Asciende a la cumbre más alta de los Alpes en esta épica jornada.',
    agency: 'Mont Blanc Expeditions'
  },
  {
    name: 'Cervino',
    region: 'Suiza/Italia',
    rating: 4.8,
    image:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/0/AtractivoCarouselSection/huayna1.jpg',
    duration: '5 horas',
    price: '$200',
    ratingCount: 1750,
    category: 'Aventura',
    summary:
      'Explora la icónica montaña en forma de pirámide en la frontera suizo-italiana.',
    agency: 'Matterhorn Climbers'
  }
]
const tours = [
  {
    title: 'MACHU PICCHU',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/1.1/Principal/machu-picchu.jpg',
    routes: routesData
  },
  {
    title: 'LAGO TITICACA',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/32/1.1/Principal/comunidad-andina-en-el-lago-titicaca.jpg',
    routes: routesData
  },
  {
    title: 'LIMA',
    bgImage:
      'https://www.peru.travel/Contenido/Destino/Imagen/es/8/1.4/Principal/lima-banner-3.jpg',
    routes: routesData
  }
]

const ToursPopulares: React.FC = () => {
  const [activeTour, setActiveTour] = useState(0)
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='relative min-h-screen'>
        <div className='absolute inset-0 z-0'>
          <img
            src={tours[activeTour].bgImage}
            alt={tours[activeTour].title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70'></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='absolute left-0 top-0 flex sm:flex-col items-center space-x-2 sm:space-x-0 sm:space-y-2'>
            {tours.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  activeTour === index ? 'bg-[#2975BA]' : (
                    'bg-gray-600 hover:bg-gray-400'
                  )
                }`}
                onClick={() => setActiveTour(index)}
                aria-label={`Route ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToursPopulares
