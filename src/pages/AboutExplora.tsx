import TeamMember from '@/components/AboutExplora/TeamMember'
import { Button } from '@/components/ui/button'
import { Map, MessageCircle, CreditCard, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function AboutExplora() {
  const { t } = useTranslation()

  return (
    <main className='container mx-auto p-8'>
      <section className='text-center space-y-6 flex flex-col justify-center items-center mt-5'>
        <h1 className='text-4xl font-bond font-title'>
          {t('aboutExplora.title')}
          <span className='text-primary'>{t('aboutExplora.peru')}</span>
        </h1>
        <p className='text-lg max-w-xl'>
          {t('aboutExplora.subtitle')}
          <a href='#' className='font-semibold'>
            {t('aboutExplora.mincetur')}
          </a>
        </p>
      </section>
      <section className='my-12'>
        <h2 className='text-2xl font-bold text-center text-primary mb-6'>
          {t('aboutExplora.offer')}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <Search className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>
              {t('aboutExplora.searchTour')}
            </h3>
            <p>{t('aboutExplora.searchTourDescription')}</p>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <CreditCard className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>
              {t('aboutExplora.securePayment')}
            </h3>
            <p>{t('aboutExplora.securePaymentDescription')}</p>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <Map className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>
              {t('aboutExplora.routeMap')}
            </h3>
            <p>{t('aboutExplora.routeMapDescription')}</p>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <MessageCircle className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>
              {t('aboutExplora.chat')}
            </h3>
            <p>{t('aboutExplora.chatDescription')}</p>
          </div>
        </div>
      </section>

      <section className='my-12'>
        <h2 className='text-2xl font-bold text-center text-primary mb-6'>
          {t('aboutExplora.team')}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <TeamMember
            imagePath='/public/assets/team/juan.jpeg'
            name='Juan Alva'
            role={t('aboutExplora.teamRole')}
            url='https://github.com/jlac8'
            urlDescription='@jlac8'
          />
          <TeamMember
            imagePath='/public/assets/team/jaqueline.png'
            name='Jaqueline Ramos'
            role={t('aboutExplora.teamRole')}
            url='https://github.com/JaquelineRocio'
            urlDescription='@JaquelineRocio'
          />
          <TeamMember
            imagePath='/public/assets/team/hebert.jpeg'
            name='Hebert López'
            role={t('aboutExplora.teamRole')}
            url='https://github.com/heblopez'
            urlDescription='@heblopez'
          />
          <TeamMember
            imagePath='/public/assets/team/victor.jpeg'
            name='Victor Ramirez'
            role={t('aboutExplora.teamRole')}
            url='https://github.com/Victormrl17'
            urlDescription='@Victormrl17'
          />
        </div>

        <h2 className='text-2xl font-bold text-center mt-12 mb-8 text-primary'>
          {t('aboutExplora.investors')}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <TeamMember
            imagePath='/public/assets/investors/mir.jpeg'
            name='Make It Real'
            role={t('aboutExplora.mir')}
            url='https://makeitreal.camp/programa-becas-de-bootcamp-proinnovate-2024'
            urlDescription='Make it real camp'
          />
          <TeamMember
            imagePath='/public/assets/investors/proinnovate.png'
            name='Proinnovate'
            role={t('aboutExplora.proinnovate')}
            url='https://www.gob.pe/institucion/proinnovate/campa%C3%B1as/49409-concurso-de-becas-para-programas-de-bootcamps-de-codigo-etapa-2'
            urlDescription={t('aboutExplora.proinnovateUrl')}
          />
        </div>
      </section>

      <section className='my-12 text-center'>
        <h2 className='text-2xl font-bold mb-6'>
          {t('aboutExplora.start')}{' '}
          <span className='text-primary'>{t('aboutExplora.joinUs')}</span>
        </h2>
        <div className='space-y-4 sm:space-y-0 sm:space-x-4'>
          <Button
            className='w-full sm:w-auto bg-primary text-white dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter transition-colors duration-300 ease-in-out'
            size='lg'
          >
            <Link to='/register' className='block px-6 py-3'>
              {t('aboutExplora.travelButton')}
            </Link>
          </Button>
          <Button
            className='w-full sm:w-auto bg-primary text-white dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter transition-colors duration-300 ease-in-out'
            size='lg'
          >
            <Link to='/register' className='block px-6 py-3'>
              {t('aboutExplora.agencyButton')}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default AboutExplora
