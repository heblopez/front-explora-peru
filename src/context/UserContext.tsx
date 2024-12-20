import { createContext, useState, ReactNode, useEffect } from 'react'
import { toast } from 'sonner'
import {
  AgencyDataResponse,
  LoginResponse,
  TouristDataResponse
} from '@/types/auth'
import { getDataFromLocalStorage } from '@/utils'
import { useNavigate } from 'react-router-dom'

interface IUserContext {
  user: AgencyDataResponse | TouristDataResponse | null
  saveUser: (user: LoginResponse) => void
  removeUser: () => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<
    AgencyDataResponse | TouristDataResponse | null
  >(getDataFromLocalStorage('user'))

  const navigate = useNavigate()

  useEffect(() => {
    const storageEventListener = (event: StorageEvent) => {
      if (event.key === 'user' && event.newValue) {
        setUser(JSON.parse(event.newValue))
      }
      if (event.key === 'user' && !event.newValue) {
        setUser(null)
      }
    }
    window.addEventListener('storage', storageEventListener)

    return () => {
      window.removeEventListener('storage', storageEventListener)
    }
  }, [user])

  const saveUser = (data: LoginResponse): string => {
    const { token, data: dataToSave } = data

    localStorage.setItem('user', JSON.stringify(dataToSave))
    setUser(dataToSave)
    document.cookie = `token=${token}`

    return (
      dataToSave.role === 'tourist' ?
        (dataToSave as TouristDataResponse).firstName
      : dataToSave.role === 'agency' ?
        (dataToSave as AgencyDataResponse).agencyName
      : ''
    )
  }

  const removeUser = () => {
    const logoutPromise = () =>
      new Promise<void>(resolve =>
        setTimeout(() => {
          resolve()
        }, 700)
      )

    toast.promise(logoutPromise, {
      loading: 'Cerrando sesión...',
      success: () => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        setUser(null)
        localStorage.removeItem('user')
        navigate('/')
        return 'Nos vemos pronto! 👋'
      },
      error: err => err,
      style: {
        justifyContent: 'center'
      },
      position: 'top-center'
    })
  }

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  )
}
