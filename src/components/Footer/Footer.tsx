import { Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className='bg-white text-gray-600 py-8 dark:bg-dark-primary-foreground dark:text-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap justify-between items-start'>
          <div className='w-2/3 pr-4'>
            <h3 className='font-semibold text-lg mb-4'>
              {t('footer.usefulLinks')}
            </h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/about-us/'
                  className='hover:text-gray-950 transition-colors'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span>{t('footer.aboutExploraPeru')}</span>
                </Link>
              </li>
              <li>
                <a href='#' className='hover:text-gray-950 transition-colors'>
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-950 transition-colors'>
                  {t('footer.termsConditions')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-950 transition-colors'>
                  {t('footer.privacyPolicy')}
                </a>
              </li>
            </ul>
          </div>
          <div className='w-1/3 text-right'>
            <h3 className='font-semibold text-lg mb-4'>
              {t('footer.followUs')}
            </h3>
            <div className='flex justify-end space-x-4'>
              <a
                href='https://www.instagram.com/'
                target='_blank'
                className='hover:text-gray-950 transition-colors'
              >
                <Instagram size={24} />
                <span className='sr-only'>Instagram</span>
              </a>
              <a
                href='https://www.youtube.com'
                target='_blank'
                className='hover:text-gray-950 transition-colors'
              >
                <Youtube size={24} />
                <span className='sr-only'>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-200 text-center'>
          <p>&copy; 2024 {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
