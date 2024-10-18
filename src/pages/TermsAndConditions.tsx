import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function TermsAndConditions() {
  const { t } = useTranslation()

  return (
    <main className='p-8 bg-gray-100 dark:bg-gray-900'>
      <section className='space-y-8 p-6 bg-white shadow-lg rounded-md dark:bg-gray-800'>
        <h1 className='text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100'>
          {t('termsAndConditions.title')}
        </h1>

        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.aboutUs')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.aboutUsDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.scope')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.scopeDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.services')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.servicesDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.payments')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.paymentsDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.cancellations')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.cancellationsDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.privacy')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.privacyDescription')}{' '}
            <Link
              to='/privacy-policy'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              <span>{t('termsAndConditions.privacy')}.</span>
            </Link>
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('termsAndConditions.contact')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('termsAndConditions.contactDescription')}
          </p>
        </div>
      </section>
    </main>
  )
}

export default TermsAndConditions
