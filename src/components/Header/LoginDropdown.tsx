import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Building2, LogIn, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <LogIn className='h-4 w-4 mr-1' />
          <span>{t('header.login')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to='/login'
            className='flex items-center space-x-2'
            onClick={prev => setIsOpen(!prev)}
          >
            <User className='h-4 w-4' />
            <span>{t('header.traveler')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to='/login/'
            className='flex items-center space-x-2'
            onClick={prev => setIsOpen(!prev)}
          >
            <Building2 className='h-4 w-4' />
            <span>{t('header.agency')}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
