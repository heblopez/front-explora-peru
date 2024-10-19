import { createContext, useState, ReactNode } from 'react'
import { toast } from 'sonner'
import {
  AgencyDataResponse,
  LoginResponse,
  TouristDataResponse
} from '@/types/auth'

interface IUserContext {
  user: AgencyDataResponse | TouristDataResponse | null
  saveUser: (user: LoginResponse) => void
  removeUser: () => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export default function UserProvider({ children }: { children: ReactNode }) {
  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user')
    if (user && user !== 'undefined') {
      return JSON.parse(user)
    }
    return null
  }

  const [user, setUser] = useState<
    AgencyDataResponse | TouristDataResponse | null
  >(getUserFromLocalStorage())

  const saveUser = (data: LoginResponse) => {
    const { token, data: dataToSave } = data
    if (!token || !dataToSave) {
      return
    }
    localStorage.setItem('user', JSON.stringify(dataToSave))
    setUser(dataToSave)
    document.cookie = `token=${token}`
  }

  const removeUser = () => {
    const logoutPromise = () =>
      new Promise<void>(resolve =>
        setTimeout(() => {
          resolve()
        }, 1200)
      )

    toast.promise(logoutPromise, {
      loading: 'Cerrando sesión...',
      success: () => {
        localStorage.removeItem('user')
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        setUser(null)
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
