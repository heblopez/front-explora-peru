import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function VisitReasons() {
  const { t } = useTranslation()

  return (
    <div className='bg-secondary text-dark-secondary dark:bg-dark-primary-foreground dark:text-white p-8 min-h-screen relative'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center text-primary-dark dark:text-white'>
          {t('visitReasons.title')}
        </h1>

        <div className='relative'>
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-light dark:bg-cyan-400'></div>

          {(
            t('visitReasons.reasons', { returnObjects: true }) as {
              image: string
              title: string
              description: string
            }[]
          ).map((reason, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              <div className='w-1/2 px-4'>
                <div className='bg-primary-lightest dark:bg-gray-800 p-4 rounded-2xl shadow-lg'>
                  <img
                    src={`/assets/${reason.image}`}
                    alt={reason.title}
                    width={200}
                    height={200}
                    className='rounded-xl mb-4'
                  />
                </div>
              </div>
              <div className='w-8 h-8 bg-primary-light dark:bg-cyan-400 rounded-full z-10 flex items-center justify-center'>
                <div className='w-3 h-3 bg-secondary dark:bg-white rounded-full'></div>
              </div>
              <div className='w-1/2 px-4'>
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    index % 2 === 0 ? 'text-right' : ''
                  }`}
                >
                  {reason.title}
                </h2>
                <p
                  className={`text-sm text-dark-secondary dark:text-gray-300 ${
                    index % 2 === 0 ? 'text-right' : ''
                  }`}
                >
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-8'>
          <Link to='/search-tours'>
            <Button
              variant='outline'
              className='text-primary border-primary hover:bg-primary hover:text-secondary dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900'
            >
              {t('visitReasons.button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
