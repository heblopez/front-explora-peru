import { useTranslation } from 'react-i18next'

function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <main className='p-8 bg-gray-100 dark:bg-gray-900'>
      <section className='space-y-8 p-6 bg-white shadow-lg rounded-md dark:bg-gray-800'>
        <h1 className='text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100'>
          {t('privacyPolicy.title')}
        </h1>

        <p className='text-gray-600 leading-relaxed mb-8 dark:text-gray-300'>
          {t('privacyPolicy.introduction')}
        </p>

        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('privacyPolicy.dataCollection')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('privacyPolicy.dataCollectionDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('privacyPolicy.useOfData')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('privacyPolicy.useOfDataDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('privacyPolicy.yourRights')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('privacyPolicy.yourRightsDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('privacyPolicy.security')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('privacyPolicy.securityDescription')}
          </p>

          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            {t('privacyPolicy.contactUs')}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            {t('privacyPolicy.contactUsDescription')}
          </p>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPolicy
