import { BookHeartIcon, LuggageIcon, UserCheck, UserPen } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { t } from 'i18next'
import { useState } from 'react'

export default function MyAccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <UserCheck className='h-4 w-4 mr-1' />
          <span>{t('header.myAccount')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to='/profile'
            className='flex items-center space-x-2'
            onClick={prev => setIsOpen(!prev)}
          >
            <UserPen className='h-4 w-4' />
            <span>{t('header.myProfile')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to='/tours'
            className='flex items-center space-x-2'
            onClick={prev => setIsOpen(!prev)}
          >
            <BookHeartIcon className='h-4 w-4' />
            <span>{t('header.myTours')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to='/bookings'
            className='flex items-center space-x-2'
            onClick={prev => setIsOpen(!prev)}
          >
            <LuggageIcon className='h-4 w-4' />
            <span>{t('header.myBookings')}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
