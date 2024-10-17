import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Building2, LogOut } from 'lucide-react'
import { DarkModeBtn } from './DarkModeBtn'
import { UserContext } from '@/context/UserContext'
import LanguageDropdown from './LanguageDropdown'
{
  /*import CurrencyDropdown from './CurrencyDropdown'*/
}
import LoginDropdown from './LoginDropdown'
import RegisterDropdown from './RegisterDropdown'
import { useTranslation } from 'react-i18next'
import MyAccountDropdown from './MyAccountDropdown'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const { user, removeUser } = useContext(UserContext)
  const { t } = useTranslation()
  const themeLabel = isDark ? t('header.dark') : t('header.light')

  return (
    <header className='bg-white shadow-sm dark:bg-dark-primary-foreground'>
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
              className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
            >
              <Building2 className='h-4 w-4 mr-1' />
              <span>{t('header.agencies')}</span>
            </Button>
          </Link>
          <LanguageDropdown />
          {/*<CurrencyDropdown />*/}
          {!user ?
            <>
              <LoginDropdown />
              <RegisterDropdown />
            </>
          : <>
              <MyAccountDropdown />
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white'
                onClick={removeUser}
              >
                <LogOut className='h-4 w-4 mr-1' />
                <span>{t('header.logout')}</span>
              </Button>
            </>
          }
          <DarkModeBtn isDark={isDark} toggleTheme={toggleTheme} />
        </nav>
      </div>

      {isOpen && (
        <nav className='md:hidden bg-white border-t border-gray-200 dark:bg-dark-primary-foreground'>
          <ul className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <li className='px-3 py-2'>
              <Link to='/agencies' onClick={toggleMenu}>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
                >
                  <Building2 className='h-4 w-4 mr-1' />
                  <span>{t('header.agencies')}</span>
                </Button>
              </Link>
            </li>
            <li className='px-3 py-2'>
              <LanguageDropdown />
            </li>
            {/*<li className='px-3 py-2'>
              <CurrencyDropdown />
            </li>*/}
            {!user ?
              <>
                <li className='px-3 py-2'>
                  <LoginDropdown />
                </li>
                <li className='px-3 py-2'>
                  <RegisterDropdown />
                </li>
              </>
            : <>
                <li className='px-3 py-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-white dark:hover:text-primary-light dark:hover:bg-slate-200'
                    onClick={removeUser}
                  >
                    <LogOut className='h-4 w-4 mr-1' />
                    <span>{t('header.logout')}</span>
                  </Button>
                </li>
                <li className='px-3 py-2'>
                  <MyAccountDropdown />
                </li>
              </>
            }

            <li className='pl-4 py-2 flex gap-2 items-center text-xs text-slate-600 dark:text-slate-100'>
              <DarkModeBtn
                isDark={isDark}
                toggleTheme={toggleTheme}
                sizeIcon={16}
              />
              <p>{t('header.theme', { theme: themeLabel })}</p>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
