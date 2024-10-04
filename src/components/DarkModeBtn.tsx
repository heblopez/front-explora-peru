import { MoonIcon, SunIcon } from 'lucide-react'

interface DarkModeBtnProps {
  isDark: boolean
  toggleTheme: () => void
  sizeIcon?: number
}

export function DarkModeBtn({
  isDark,
  toggleTheme,
  sizeIcon
}: DarkModeBtnProps) {
  return (
    <button
      onClick={() => toggleTheme()}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-500 active:scale-90 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500'
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <div
        className={`transform transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
      >
        {isDark ?
          <MoonIcon size={sizeIcon} />
        : <SunIcon size={sizeIcon} />}
      </div>
    </button>
  )
}
