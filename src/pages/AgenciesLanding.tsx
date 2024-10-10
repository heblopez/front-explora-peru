import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function AgenciesLanding() {
  const { t } = useTranslation()

  return (
    <main className='space-y-8 bg-white dark:bg-gray-800'>
      <section className='relative h-[70vh] flex flex-col justify-center items-center text-white text-center'>
        <div className="absolute inset-0 bg-[url('/assets/landing/ruta-al-fondo.png')] bg-cover bg-center"></div>
        <div className='absolute inset-0 bg-black opacity-30'></div>
        <div className='px-8 relative z-10 flex flex-col items-center justify-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-secondary'>
            {t('agenciesLanding.joinTitle')}
          </h1>
          <p className='text-base md:text-lg lg:text-xl text-gray-300 max-w-xl mb-6'>
            {t('agenciesLanding.joinDescription')}
          </p>
          <Button
            className='w-full sm:w-auto bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
            size='lg'
          >
            <Link to='/register'>{t('agenciesLanding.registerNow')}</Link>
          </Button>
        </div>
      </section>

      <section className='p-8'>
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <div className='md:w-1/2 flex flex-col text-center md:text-left mb-6 md:mb-0'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('agenciesLanding.potentialEarningsTitle')}{' '}
              <span className='text-blue-600'>
                {t('agenciesLanding.potentialEarningsAmount')}
              </span>
            </h2>
            <p className='text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4'>
              {t('agenciesLanding.activityPublication')}
            </p>
            <ul className='text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6'>
              <li>
                <span className='font-bold'>
                  {t('agenciesLanding.immediateReview')}
                </span>
                : {t('agenciesLanding.approval')}
              </li>
              <li>
                <span className='font-bold'>
                  {t('agenciesLanding.noHiddenFees')}
                </span>
                : {t('agenciesLanding.onlyCommissions')}
              </li>
              <li>
                <span className='font-bold'>
                  {t('agenciesLanding.continuousAssistance')}
                </span>
                : {t('agenciesLanding.alwaysAvailable')}
              </li>
              <li>
                <span className='font-bold'>
                  {t('agenciesLanding.internationalReach')}
                </span>
                : {t('agenciesLanding.millionsOfTravelers')}
              </li>
            </ul>
          </div>
          <div className='text-center md:text-left md:ml-12'>
            {[
              'agenciesLanding.register',
              'agenciesLanding.createActivity',
              'agenciesLanding.startEarning'
            ].map((step, index) => (
              <div className='flex items-center mb-6' key={index}>
                <div className='bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold'>
                  {index + 1}
                </div>
                <div className='ml-4 text-left'>
                  <h2 className='text-lg md:text-2xl font-bold text-gray-900 dark:text-white'>
                    {t(step)}
                  </h2>
                  {step !== 'agenciesLanding.startEarning' && (
                    <p className='text-lg text-gray-700 dark:text-gray-300'>
                      {index === 0 ?
                        t('agenciesLanding.stepDuration1')
                      : t('agenciesLanding.stepDuration2')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-8'>
        <h2 className='text-2xl md:text-3xl font-title text-center mb-12 text-primary dark:text-primary-light'>
          {t('agenciesLanding.whyWorkWithUs')}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              title: t('agenciesLanding.activitiesCount'),
              description: t('agenciesLanding.activitiesDescription')
            },
            {
              title: t('agenciesLanding.reservationManagement'),
              description: t('agenciesLanding.reservationDescription')
            },
            {
              title: t('agenciesLanding.continuousTraining'),
              description: t('agenciesLanding.trainingDescription')
            },
            {
              title: t('agenciesLanding.activeCommunity'),
              description: t('agenciesLanding.communityDescription')
            },
            {
              title: t('agenciesLanding.support24_7'),
              description: t('agenciesLanding.supportDescription')
            },
            {
              title: t('agenciesLanding.securePayments'),
              description: t('agenciesLanding.paymentsDescription')
            }
          ].map((card, index) => (
            <Card key={index} className='bg-white dark:bg-gray-700 shadow-md'>
              <CardHeader>
                <CardTitle className='text-xl dark:text-white'>
                  {card.title}
                </CardTitle>
                <CardDescription className='dark:text-gray-300'>
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className='pt-16'>
        <h2 className='text-2xl md:text-3xl font-title text-center mb-12 text-primary dark:text-primary-light'>
          {t('agenciesLanding.improvedPanelTitle')}
        </h2>
        <div className='flex flex-col md:flex-row justify-around'>
          {[
            {
              title: t('agenciesLanding.efficientTitle'),
              description: t('agenciesLanding.efficientDescription')
            },
            {
              title: t('agenciesLanding.instantReservationsTitle'),
              description: t('agenciesLanding.instantReservationsDescription')
            },
            {
              title: t('agenciesLanding.friendlyInterfaceTitle'),
              description: t('agenciesLanding.friendlyInterfaceDescription')
            },
            {
              title: t('agenciesLanding.personalizedSupportTitle'),
              description: t('agenciesLanding.personalizedSupportDescription')
            }
          ].map((feature, index) => (
            <div className='text-center mb-4 md:mb-0' key={index}>
              <p className='text-xl text-gray-800 dark:text-gray-200 font-bold'>
                {feature.title}
              </p>
              <p className='text-md text-gray-800 dark:text-gray-300'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white dark:bg-gray-800 py-8'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-title text-primary dark:text-primary-light'>
            {t('agenciesLanding.partnerTestimonialsTitle')}
          </h2>
        </div>

        <div className='px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              imgSrc: '/assets/landing/empresa1.png',
              name: 'Rutas del Perú',
              quote: t('agenciesLanding.testimonial1')
            },
            {
              imgSrc: '/assets/landing/empresa2.png',
              name: 'Perú Destinos Travel',
              quote: t('agenciesLanding.testimonial2')
            },
            {
              imgSrc: '/assets/landing/empresa3.png',
              name: 'Travel Perú',
              quote: t('agenciesLanding.testimonial3')
            }
          ].map((partner, index) => (
            <div
              className='border rounded-lg p-6 shadow-lg text-center bg-white dark:bg-gray-700'
              key={index}
            >
              <img
                src={partner.imgSrc}
                alt={`Socio ${index + 1}`}
                className='w-16 h-16 rounded-full mx-auto mb-4'
              />
              <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                {partner.name}
              </h3>
              <p className='text-gray-700 dark:text-gray-300'>
                {partner.quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='p-16 flex flex-col items-center bg-gray dark:bg-gray-800'>
        <h2 className='text-3xl md:text-4xl font-title text-center mb-4 text-gray-900 dark:text-white'>
          {t('agenciesLanding.startNowTitle')}
        </h2>
        <p className='text-lg text-center text-gray-700 dark:text-gray-300 mb-8'>
          {t('agenciesLanding.startNowDescription')}
        </p>
        <Button className='bg-primary text-white hover:bg-primary-dark'>
          <Link to='/register'>{t('agenciesLanding.registerNow')}</Link>
        </Button>
      </section>
    </main>
  )
}
