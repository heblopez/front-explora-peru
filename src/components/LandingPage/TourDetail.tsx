import { Link } from 'react-router-dom'

export default function TownTour() {
  const images = [
    {
      src: '/assets/lima-banner-3.jpg',
      alt: 'Aquarium with whale shark'
    },
    { src: '/assets/machu-picchu.jpg', alt: 'Colorful buildings' },
    {
      src: '/assets/comunidad-andina-en-el-lago-titicaca.jpg',
      alt: 'Comunidad andina en el Lago Titicaca'
    }
  ]

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      <div className='absolute inset-0 bg-cover bg-center z-0'>
        <div className='absolute inset-0 bg-gray-900 opacity-75'></div>
      </div>
      <div className='relative z-10 container mx-auto px-4 py-12'>
        <h1 className='text-6xl font-bold mb-2 text-center'>Huascaran</h1>
        <p className='text-xl text-center mb-12'>
          Descubre las maravillas de Ancash
        </p>

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/2'>
            <div className='relative pl-8 border-l-2 border-cyan-400'>
              <div className='absolute left-0 top-0 w-4 h-4 bg-cyan-400 rounded-full -ml-2'></div>
              <h3 className='text-xl font-semibold mb-2'>DÍA 1</h3>
              <h4 className='text-2xl font-bold text-yellow-400 mb-4'>
                Llegada al Huascarán
              </h4>
              <p className='text-gray-300 mb-4'>
                Al llegar a la base del Huascarán, acomódate en tu hospedaje y
                toma un tiempo para descansar. Luego, puedes explorar los
                alrededores y disfrutar de las impresionantes vistas de la
                montaña más alta del Perú. El Parque Nacional Huascarán ofrece
                senderos escénicos, paisajes glaciales impresionantes y una
                variedad de fauna, incluyendo el cóndor andino. Prepárate para
                tu ascenso mientras te maravillas con la belleza natural que te
                rodea.
              </p>
            </div>
          </div>
          <div className='md:w-1/2'>
            <div className='bg-gray-800 rounded-lg p-4'>
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center'>
                  <svg
                    className='w-5 h-5 text-yellow-400 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  <span className='font-bold'>7.8</span>
                </div>
                <span className='bg-blue-600 text-xs font-semibold px-2 py-1 rounded'>
                  Día 1
                </span>
              </div>
              <div className='relative h-64 mb-4'>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <button className='text-cyan-400 text-sm font-semibold hover:underline'>
                Ver todo
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 bg-gray-800 bg-opacity-50 p-8 rounded-lg'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Incluye</h3>
            <ul className='list-disc list-inside text-sm text-gray-300'>
              <li>4 noches de alojamiento en un hotel de lujo</li>
              <li>Tours guiados y actividades según el itinerario</li>
              <li>Transporte durante el tour</li>
              <li>Desayuno diario</li>
              <li>Guías turísticos experimentados</li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Precio</h3>
            <p className='text-2xl font-bold'>$1,200 por persona</p>
            <p className='text-sm text-gray-300'>
              (sin incluir pasajes aéreos)
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Duración</h3>
            <p className='text-2xl font-bold'>5 días</p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Tamaño del grupo</h3>
            <p className='text-2xl font-bold'>Máximo 12 viajeros</p>
          </div>
        </div>
        <div className='flex justify-center mt-12 space-x-4'>
          <Link to='/search-tours'>
            <button className='bg-cyan-400 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-cyan-300 transition-colors'>
              Agendar un Tour
            </button>
          </Link>
          <button className='text-cyan-400 font-semibold text-lg hover:underline'>
            Información de Reserva
          </button>
        </div>
      </div>
    </div>
  )
}
