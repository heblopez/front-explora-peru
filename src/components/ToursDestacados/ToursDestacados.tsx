import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import ScrollableSection from './ScrollableSection'
import RouteCard from './RouteCard'
import Tabs from './Tabs'
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
    shortDescription: 'machu picchu en cuzco',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LAGO TITICACA',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/32/1.1/Principal/comunidad-andina-en-el-lago-titicaca.jpg',
    shortDescription: 'lago mas alto del mundo en puno',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LIMA',
    bgImage:
      'https://www.peru.travel/Contenido/Destino/Imagen/es/8/1.4/Principal/lima-banner-3.jpg',

    shortDescription: 'Lima capital del Peru',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  }
]
const toursMejorValoradas = [
  {
    title: 'MACHU PICCHU',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/1.1/Principal/machu-picchu.jpg',
    shortDescription: 'machu picchu en cuzco',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LAGO TITICACA',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/32/1.1/Principal/comunidad-andina-en-el-lago-titicaca.jpg',
    shortDescription: 'lago mas alto del mundo en puno',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LIMA',
    bgImage:
      'https://www.peru.travel/Contenido/Destino/Imagen/es/8/1.4/Principal/lima-banner-3.jpg',

    shortDescription: 'Lima capital del Peru',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  }
]
const toursMasPopulares = [
  {
    title: 'MACHU PICCHU',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/38/1.1/Principal/machu-picchu.jpg',
    shortDescription: 'machu picchu en cuzco',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LAGO TITICACA',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/32/1.1/Principal/comunidad-andina-en-el-lago-titicaca.jpg',
    shortDescription: 'lago mas alto del mundo en puno',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LIMA',
    bgImage:
      'https://www.peru.travel/Contenido/Destino/Imagen/es/8/1.4/Principal/lima-banner-3.jpg',

    shortDescription: 'Lima capital del Peru',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  }
]

const toursRecomendadas = [
  {
    title: 'PARQUE NACIONAL DE HUASCARAN',
    bgImage:
      'https://www.instagram.com/p/Br_l31RBUSF/?utm_source=ig_embed&ig_rid=758780b7-b455-471e-89a5-000d0a9bde41',
    shortDescription: 'Parque nacional de Huascaran - Ancash',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LAGO TITICACA',
    bgImage:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/32/1.1/Principal/comunidad-andina-en-el-lago-titicaca.jpg',
    shortDescription: 'lago mas alto del mundo en puno',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  },
  {
    title: 'LIMA',
    bgImage:
      'https://www.peru.travel/Contenido/Destino/Imagen/es/8/1.4/Principal/lima-banner-3.jpg',

    shortDescription: 'Lima capital del Peru',
    longDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper, urna ut auctor tempus, lectus ex auctor orci, ut tincidunt enim lectus nec felis. Duis congue odio ut lacinia faucibus. Integer tempor nulla id mi scelerisque, vitae accumsan augue dictum. Donec consectetur dolor eros, eu faucibus est imperdiet at. Donec ornare lorem dui, in ultrices lectus scelerisque sit amet. Pellentesque porttitor nisl venenatis dolor dictum, vestibulum aliquet velit imperdiet. Nunc sit amet luctus diam. Proin finibus odio a dolor cursus, a finibus ligula iaculis. Integer congue leo ante, nec tristique turpis malesuada et. Praesent laoreet nulla nulla, sit amet placerat mauris pretium sed. Fusce tincidunt magna orci, quis consectetur sapien laoreet posuere. Pellentesque ex libero, consequat at erat in, placerat rutrum metus. Ut consectetur laoreet mauris et condimentum.',
    routes: routesData
  }
]
const tabs = [
  {
    icon: '★',
    label: 'Mejor Valoradas',
    description:
      'Las rutas con las mejores calificaciones de nuestros usuarios',
    tours: toursMejorValoradas
  },
  {
    icon: '👥',
    label: 'Más Populares',
    description: 'Las rutas más visitadas recientemente',
    tours: toursMasPopulares
  },
  {
    icon: '🎯',
    label: 'Recomendadas',
    description: 'Selección especial de rutas destacadas',
    tours: toursRecomendadas
  }
]

const ToursPopulares: React.FC = () => {
  const [activeTour, setActiveTour] = useState(0)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo)
  }

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
        <div className='relative'>
          <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className='absolute left-2 flex flex-col items-center space-y-2'>
              {tabs[activeTab].tours.map((_, index) => (
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
            <div className='ml-12 sm:ml-8'>
              <h1 className='text-5xl sm:text-7xl font-bold mb-4 text-shadow-lg'>
                {tours[activeTour].title}
              </h1>
              <p className='text-lg sm:text-xl mb-8 text-gray-300 text-shadow'>
                Descubre las majestuosas montañas y rutas de los{' '}
                {tours[activeTour].shortDescription}.
              </p>
              <button
                className='bg-[#2975BA] text-white px-6 py-2 rounded-full font-semibold flex items-center hover:bg-orange-600 transition-colors duration-300'
                onClick={toggleMoreInfo}
              >
                {showMoreInfo ? 'LEER MENOS' : 'LEER MÁS'}{' '}
                <ChevronRight className='ml-2' />
              </button>

              {showMoreInfo && (
                <div className='mt-4 p-4 bg-gray-800 rounded-lg'>
                  <p>{tours[activeTour].longDescription}</p>
                </div>
              )}

              <div className='mt-12'>
                <ScrollableSection>
                  {tours[activeTour].routes.map((route, index) => (
                    <RouteCard key={index} route={route} />
                  ))}
                </ScrollableSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToursPopulares
