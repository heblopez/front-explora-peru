import { useTranslation } from 'react-i18next'

export default function WhyChooseUs() {
  const { t } = useTranslation()

  return (
    <div className='bg-secondary text-dark-secondary dark:bg-dark-primary-foreground dark:text-white p-8 pb-32'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-8'>
        <div className='md:w-1/2 relative'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2 relative'>
              <img
                src='/assets/comunidad-andina-en-el-lago-titicaca.jpg'
                alt={t('whyChooseUs.images.snowyMountainLandscape')}
                width={600}
                height={300}
                className='rounded-lg object-cover w-full h-64'
              />
              <div className='absolute top-0 left-0 bg-primary-light p-4 rounded-tl-lg rounded-br-lg dark:bg-cyan-400'>
                <div className='text-4xl font-bold text-secondary dark:text-gray-900'>
                  12
                </div>
                <div className='text-sm text-secondary dark:text-gray-900'>
                  {t('whyChooseUs.yearsExperience')}
                </div>
              </div>
            </div>
            <img
              src='/assets/huascaran.jpg'
              alt={t('whyChooseUs.images.tropicalBay')}
              width={300}
              height={200}
              className='rounded-lg object-cover w-full h-40'
            />
            <img
              src='/assets/CordilleraBlanca.jpg'
              alt={t('whyChooseUs.images.coastalSunset')}
              width={300}
              height={200}
              className='rounded-lg object-cover w-full h-40'
            />
          </div>
        </div>
        <div className='md:w-1/2'>
          <h2 className='text-primary text-xl mb-2 dark:text-cyan-400'>
            {t('whyChooseUs.subtitle')}
          </h2>
          <h1 className='text-primary-dark text-5xl font-bold mb-6 dark:text-white'>
            {t('whyChooseUs.title')}
          </h1>

          <ul className='space-y-6'>
            {(
              t('whyChooseUs.list', { returnObjects: true }) as {
                title: string
                description: string
              }[]
            ).map((item, index) => (
              <li key={index} className='flex items-start'>
                <svg
                  className='w-6 h-6 text-primary dark:text-cyan-400 mr-2 mt-1 flex-shrink-0'
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
                  <p className='text-dark-secondary dark:text-gray-300'>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
