import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
  const { t } = useTranslation()

  return (
    <div className='bg-secondary text-dark-secondary dark:bg-dark-primary-foreground dark:text-white p-8 pb-32'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-primary text-xl mb-2 dark:text-cyan-400'>
          {t('aboutUs.subtitle')}
        </h2>
        <h1 className='text-primary-dark text-5xl font-bold mb-6 dark:text-white'>
          {t('aboutUs.title')}
        </h1>

        <div className='flex flex-col md:flex-row gap-8 items-start'>
          <div className='md:w-1/2 pr-14'>
            <p className='mb-6 text-dark-secondary dark:text-white'>
              {t('aboutUs.paragraph1')}
            </p>
            <p className='mb-6 text-dark-secondary dark:text-white'>
              {t('aboutUs.paragraph2')}
            </p>
            <Link to='/search-tours'>
              <Button
                variant='outline'
                className='text-primary border-primary hover:bg-primary hover:text-secondary dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900'
              >
                {t('aboutUs.button')}
              </Button>
            </Link>
          </div>
          <div className='md:w-1/2 flex justify-end space-x-4'>
            <img
              src='/assets/lima-banner-3.jpg'
              alt={t('aboutUs.images.mountainLandscape')}
              width={200}
              height={300}
              className='rounded-lg'
            />
            <img
              src='/assets/intihuatana.jpg'
              alt={t('aboutUs.images.starryNight')}
              width={200}
              height={300}
              className='rounded-lg mt-8'
            />
            <img
              src='/assets/intihuatana.jpg'
              alt={t('aboutUs.images.ancientRuins')}
              width={200}
              height={300}
              className='rounded-lg'
            />
          </div>
        </div>
        <div className='flex justify-between mt-12'>
          <div className='text-center'>
            <h3 className='text-4xl text-primary font-bold dark:text-cyan-400'>
              10
            </h3>
            <p className='text-dark-secondary dark:text-white'>
              {t('aboutUs.stats.yearsExperience')}
            </p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl text-primary font-bold dark:text-cyan-400'>
              1000
            </h3>
            <p className='text-dark-secondary dark:text-white'>
              {t('aboutUs.stats.satisfiedClients')}
            </p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl text-primary font-bold dark:text-cyan-400'>
              100
            </h3>
            <p className='text-dark-secondary dark:text-white'>
              {t('aboutUs.stats.regions')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
