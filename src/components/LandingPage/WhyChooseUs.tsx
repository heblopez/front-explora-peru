export default function WhyChooseUs() {
  return (
    <div className='bg-gray-900 text-white p-8'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-8'>
        <div className='md:w-1/2 relative'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2 relative'>
              <img
                src='/assets/comunidad-andina-en-el-lago-titicaca.jpg'
                alt='Snowy mountain landscape at night'
                width={600}
                height={300}
                className='rounded-lg object-cover w-full h-64'
              />
              <div className='absolute top-0 left-0 bg-cyan-400 p-4 rounded-tl-lg rounded-br-lg'>
                <div className='text-4xl font-bold'>12</div>
                <div className='text-sm'>
                  Años
                  <br />
                  Experiencia
                  <br />
                </div>
              </div>
            </div>
            <img
              src='/assets/huascaran.jpg'
              alt='Tropical bay with limestone cliffs'
              width={300}
              height={200}
              className='rounded-lg object-cover w-full h-40'
            />
            <img
              src='/assets/CordilleraBlanca.jpg'
              alt='Coastal sunset'
              width={300}
              height={200}
              className='rounded-lg object-cover w-full h-40'
            />
          </div>
        </div>
        <div className='md:w-1/2'>
          <h2 className='text-cyan-400 text-xl mb-2'>La Mejor Opción</h2>
          <h1 className='text-5xl font-bold mb-6'>¿Por Qué Elegirnos?</h1>

          <ul className='space-y-6'>
            {[
              {
                title: 'Destinos Seleccionados',
                description:
                  'Curamos las mejores experiencias de viaje, ofreciendo solo los destinos más hermosos y únicos en todo el mundo.'
              },
              {
                title: 'Itinerarios Personalizados',
                description:
                  'No hay dos viajeros iguales, y sus aventuras tampoco deberían serlo.'
              },
              {
                title: 'Soporte al Cliente Excepcional',
                description:
                  'Desde el momento en que reservas hasta que vuelves a casa, nuestro dedicado equipo de soporte al cliente está disponible las 24 horas, los 7 días de la semana.'
              }
            ].map((item, index) => (
              <li key={index} className='flex items-start'>
                <svg
                  className='w-6 h-6 text-cyan-400 mr-2 mt-1 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <div>
                  <h3 className='font-semibold text-lg'>{item.title}</h3>
                  <p className='text-gray-300'>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
