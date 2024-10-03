const reasons = [
  {
    title: 'Rico Patrimonio Cultural',
    description:
      'Explora la historia, el arte y la arquitectura de algunas de las civilizaciones más antiguas y fascinantes del mundo en Asia, desde antiguos templos en Camboya hasta el majestuoso Taj Mahal en India.',
    image: '/assets/CordilleraBlanca.jpg'
  },
  {
    title: 'Belleza Natural',
    description:
      'Descubre algunos de los paisajes naturales más impresionantes del mundo, incluyendo los imponentes Himalayas y las exuberantes selvas tropicales del sudeste asiático.',
    image: '/assets/huascaran.jpg'
  },
  {
    title: 'Increíble Gastronomía',
    description:
      'Disfruta de la gran variedad de deliciosas cocinas y sabores que Asia tiene para ofrecer, desde los picantes curris de Tailandia hasta el delicado sushi de Japón.',
    image: '/assets/huayna1.jpg'
  },
  {
    title: 'Cálida Hospitalidad',
    description:
      'Encuentra la amabilidad y generosidad de la gente de Asia, conocida por su cálida y acogedora hospitalidad, y crea recuerdos inolvidables en el camino.',
    image: '/assets/machu-picchu.jpg'
  },
  {
    title: 'Ciudades Vibrantes',
    description:
      'Experimenta la emoción de algunas de las ciudades más dinámicas y vibrantes del mundo, como Tokio y Bangkok, con una mezcla de arquitectura moderna y tradicional, una vida nocturna vibrante y una infinidad de atracciones culturales.',
    image: '/assets/lima-banner-3.jpg'
  }
]

export default function VisitReasons() {
  return (
    <div className='bg-gray-900 text-white p-8 min-h-screen relative'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          5 razones para visitar Perú
        </h1>

        {/* Dragon silhouette */}
        <div className='absolute top-0 left-0 w-1/4 h-1/4 opacity-10'>
          <img
            src='/assets/comunidad-andina-en-el-lago-titicaca.jpg'
            alt='Dragon silhouette'
          />
        </div>

        {/* Asia map silhouette */}
        <div className='absolute top-0 right-0 w-1/4 h-1/4 opacity-10'>
          <img src='/assets/CordilleraBlanca.jpg' alt='Asia map silhouette' />
        </div>

        <div className='relative'>
          {/* Timeline */}
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400'></div>

          {/* Reasons */}
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            >
              <div className='w-1/2 px-4'>
                <div className='bg-gray-800 p-4 rounded-2xl shadow-lg'>
                  <img
                    src={reason.image}
                    alt={reason.title}
                    width={200}
                    height={200}
                    className='rounded-xl mb-4'
                  />
                </div>
              </div>
              <div className='w-8 h-8 bg-cyan-400 rounded-full z-10 flex items-center justify-center'>
                <div className='w-3 h-3 bg-white rounded-full'></div>
              </div>
              <div className='w-1/2 px-4'>
                <h2
                  className={`text-xl font-semibold mb-2 ${index % 2 === 0 ? 'text-right' : ''} ${['text-yellow-400', 'text-green-400', 'text-red-400', 'text-purple-400', 'text-blue-400'][index]}`}
                >
                  {reason.title}
                </h2>
                <p
                  className={`text-sm text-gray-300 ${index % 2 === 0 ? 'text-right' : ''}`}
                >
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-8'>
          <button className='bg-cyan-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-cyan-300 transition-colors'>
            Agendar un Tour
          </button>
        </div>
      </div>
    </div>
  )
}
