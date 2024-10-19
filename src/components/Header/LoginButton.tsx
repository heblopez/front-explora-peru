import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

import { LogIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LoginButton() {
  const { t } = useTranslation()

  return (
    <Link to='/login'>
      <Button
        variant='ghost'
        size='sm'
        className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
      >
        <LogIn className='h-4 w-4 mr-1' />
        <span>{t('header.login')}</span>
      </Button>
    </Link>
  )
}
