import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const storedTheme = localStorage.getItem('theme')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (storedTheme) {
      return storedTheme === 'dark'
    }
    return prefersDarkMode
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const rootDOM = document.querySelector('#root')
    if (isDarkMode) {
      rootDOM?.classList.add('dark')
      document.body.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.body.classList.remove('dark')
      rootDOM?.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDarkMode])

  return { isDarkMode, toggleDarkMode }
}
