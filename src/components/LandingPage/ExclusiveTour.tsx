export default function ExclusiveTour() {
  const images = [
    {
      src: '/assets/templo-del-sol.jpg',
      alt: 'Skydiving',
      size: 'small',
      position: 'top-left'
    },
    {
      src: '/assets/templo-del-sol.jpg',
      alt: 'Northern Lights',
      size: 'medium',
      position: 'top'
    },
    {
      src: '/assets/intihuatana.jpg',
      alt: 'River Rafting',
      size: 'large',
      position: 'center'
    },
    {
      src: '/assets/huayna1.jpg',
      alt: 'Mountain Lake',
      size: 'medium',
      position: 'bottom'
    },
    {
      src: '/assets/huayna1.jpg',
      alt: 'Desert Camel Ride',
      size: 'small',
      position: 'bottom-right'
    }
  ]

  return (
    <div className='bg-secondary text-dark-secondary dark:bg-gray-900 dark:text-white min-h-screen p-8 relative overflow-hidden'>
      {/* Decorative elements */}
      <div className='absolute top-4 left-4 w-24 h-24 opacity-10 text-primary-light dark:text-white'>
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <rect x='0' y='0' width='45' height='45' fill='currentColor' />
          <rect x='55' y='0' width='45' height='45' fill='currentColor' />
          <rect x='0' y='55' width='45' height='45' fill='currentColor' />
          <rect x='55' y='55' width='45' height='45' fill='currentColor' />
        </svg>
      </div>
      <div className='absolute bottom-4 right-4 w-24 h-24 opacity-10 text-primary-light dark:text-white'>
        <svg viewBox='0 0 100 100' className='w-full h-full'>
          <rect x='0' y='0' width='45' height='45' fill='currentColor' />
          <rect x='55' y='0' width='45' height='45' fill='currentColor' />
          <rect x='0' y='55' width='45' height='45' fill='currentColor' />
          <rect x='55' y='55' width='45' height='45' fill='currentColor' />
        </svg>
      </div>

      <div className='max-w-4xl mx-auto'>
        <h2 className='text-primary text-xl mb-2 text-center dark:text-yellow-400'>
          Every Month New Tour
        </h2>
        <h1 className='text-primary-dark text-5xl font-bold mb-12 text-center dark:text-white'>
          Exclusive Tour
        </h1>

        <div className='relative h-96'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute rounded-2xl overflow-hidden border-4 border-dark-secondary dark:border-white shadow-lg ${
                image.size === 'small' ? 'w-24 h-24'
                : image.size === 'medium' ? 'w-36 h-36'
                : 'w-48 h-48'
              } ${
                image.position === 'top-left' ? 'top-0 left-0'
                : image.position === 'top' ? 'top-8 left-1/4'
                : image.position === 'center' ?
                  'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                : image.position === 'bottom' ? 'bottom-8 right-1/4'
                : 'bottom-0 right-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <button className='bg-primary text-secondary px-8 py-3 rounded-full font-semibold text-lg hover:bg-primary-light transition-colors dark:bg-cyan-400 dark:text-gray-900 dark:hover:bg-cyan-300'>
            Entrar a la Galería
          </button>
        </div>
      </div>
    </div>
  )
}
