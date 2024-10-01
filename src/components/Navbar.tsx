import { useState } from 'react'
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
  User
} from 'lucide-react'
import { DarkModeBtn } from './DarkModeBtn'

function Navbar({
  isDark,
  toggleTheme
}: {
  isDark: boolean
  toggleTheme: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className='bg-white shadow-sm'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <span className='text-h5 font-title font-bold text-primary'>
            ExploraPerú
          </span>
        </Link>

        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-gray-600 hover:text-primary hover:bg-gray-100'
          onClick={toggleMenu}
        >
          {isOpen ?
            <X className='h-6 w-6' />
          : <Menu className='h-6 w-6' />}
        </Button>

        <nav className='hidden md:flex items-center space-x-4'>
          <Link to='/agencies'>
            <Button
              variant='ghost'
              size='sm'
              className='font-content text-gray-600 hover:text-primary hover:bg-gray-100'
            >
              <Building2 className='h-4 w-4 mr-1' />
              <span>Agencias</span>
            </Button>
          </Link>
          <LanguageDropdown />
          <CurrencyDropdown />
          <LoginDropdown />
          <RegisterDropdown />
          <DarkModeBtn isDark={isDark} toggleTheme={toggleTheme} />
        </nav>
      </div>

      {isOpen && (
        <nav className='md:hidden bg-white border-t border-gray-200'>
          <ul className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <li className='px-3 py-2'>
              <Link
                to='/agencies'
                className='flex items-center space-x-2 px-3 py-2 rounded-md text-base font-content text-gray-600 hover:text-primary hover:bg-gray-100'
                onClick={toggleMenu}
              >
                <Building2 className='h-4 w-4' />
                <span>Agencias</span>
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='font-content text-gray-600 hover:text-primary hover:bg-gray-100'
        >
          <Globe className='h-4 w-4 mr-1' />
          <span>ES</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='font-content'>Español</DropdownMenuItem>
        <DropdownMenuItem className='font-content'>English</DropdownMenuItem>
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
          className='font-content text-gray-600 hover:text-primary hover:bg-gray-100'
        >
          <DollarSign className='h-4 w-4 mr-1' />
          <span>PEN</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='font-content'>PEN</DropdownMenuItem>
        <DropdownMenuItem className='font-content'>USD</DropdownMenuItem>
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
          className='font-content text-gray-600 hover:text-primary hover:bg-gray-100'
        >
          <LogIn className='h-4 w-4 mr-1' />
          <span>Iniciar Sesión</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to='/login'
            className='flex items-center space-x-2 font-content'
            onClick={prev => setIsOpen(!prev)}
          >
            <User className='h-4 w-4' />
            <span>Viajero</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to='/login/'
            className='flex items-center space-x-2 font-content'
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
          className='font-content text-gray-600 hover:text-primary hover:bg-gray-100'
        >
          <UserPlus className='h-4 w-4 mr-1' />
          <span>Registrarse</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to='/register/'
            className='flex items-center space-x-2 font-content'
          >
            <User className='h-4 w-4' />
            <span>Viajero</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to='/register/'
            className='flex items-center space-x-2 font-content'
          >
            <Building2 className='h-4 w-4' />
            <span>Agencia</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
