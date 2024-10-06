import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  X,
  Globe,
  DollarSign,
  Building2,
  LogIn,
  UserPlus,
  User,
  LogOut
} from 'lucide-react'
import { DarkModeBtn } from './DarkModeBtn'
import { UserContext } from '@/context/UserContext'
import { useTranslation } from 'react-i18next'

function Navbar({
  isDark,
  toggleTheme
}: {
  isDark: boolean
  toggleTheme: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const { user, removeUser } = useContext(UserContext)

  return (
    <header className='bg-white shadow-sm dark:bg-gray-800'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <h1 className='text-3xl font-title font-bold web-name'>
            ExploraPerú
          </h1>
        </Link>

        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white'
          onClick={toggleMenu}
        >
          {isOpen ?
            <X className='h-6 w-6' />
          : <Menu className='h-6 w-6 ' />}
        </Button>

        <nav className='hidden md:flex items-center space-x-4'>
          <Link to='/agencies'>
            <Button
              variant='ghost'
              size='sm'
              className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white'
            >
              <Building2 className='h-4 w-4 mr-1' />
              <span>Agencias</span>
            </Button>
          </Link>
          <LanguageDropdown />
          <CurrencyDropdown />
          {!user && (
            <>
              <LoginDropdown />
              <RegisterDropdown />
            </>
          )}
          {user && (
            <Button
              variant='ghost'
              size='sm'
              className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white'
              onClick={removeUser}
            >
              <LogOut className='h-4 w-4 mr-1' />
              <span>Cerrar Sesión</span>
            </Button>
          )}
          <DarkModeBtn isDark={isDark} toggleTheme={toggleTheme} />
        </nav>
      </div>

      {isOpen && (
        <nav className='md:hidden bg-white border-t border-gray-200 dark:bg-gray-800'>
          <ul className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <li className='px-3 py-2'>
              <Link to='/agencies' onClick={toggleMenu}>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
                >
                  <Building2 className='h-4 w-4 mr-1' />
                  <span>Agencias</span>
                </Button>
              </Link>
            </li>
            <li className='px-3 py-2'>
              <LanguageDropdown />
            </li>
            <li className='px-3 py-2'>
              <CurrencyDropdown />
            </li>
            <li className='px-3 py-2'>
              <LoginDropdown />
            </li>
            <li className='px-3 py-2'>
              <RegisterDropdown />
            </li>
            <li className='pl-4 py-2 flex gap-2 items-center text-xs text-slate-600 dark:text-slate-100'>
              <DarkModeBtn
                isDark={isDark}
                toggleTheme={toggleTheme}
                sizeIcon={16}
              />
              <p>Modo actual: {isDark ? 'Oscuro' : 'Claro'}</p>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar

function LanguageDropdown() {
  const { i18n } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <Globe className='h-4 w-4 mr-1' />
          <span>ES</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => i18n.changeLanguage('es')}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => i18n.changeLanguage('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CurrencyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <DollarSign className='h-4 w-4 mr-1' />
          <span>PEN</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>PEN</DropdownMenuItem>
        <DropdownMenuItem>USD</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <LogIn className='h-4 w-4 mr-1' />
          <span>Iniciar Sesión</span>
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
            <span>Viajero</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to='/login/'
            className='flex items-center space-x-2'
            onClick={prev => setIsOpen(!prev)}
          >
            <Building2 className='h-4 w-4' />
            <span>Agencia</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function RegisterDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
        >
          <UserPlus className='h-4 w-4 mr-1' />
          <span>Registrarse</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to='/register/' className='flex items-center space-x-2'>
            <User className='h-4 w-4' />
            <span>Viajero</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/register/' className='flex items-center space-x-2'>
            <Building2 className='h-4 w-4' />
            <span>Agencia</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
