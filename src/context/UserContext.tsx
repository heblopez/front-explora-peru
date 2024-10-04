import { createContext, useState, ReactNode } from 'react'
import { User } from '@/types/User'
import { toast } from 'sonner'

interface IUserContext {
  user: Omit<User, 'password'> | null
  saveUser: (user: User) => void
  removeUser: () => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export default function UserProvider({ children }: { children: ReactNode }) {
  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    return null
  }

  const [user, setUser] = useState<Omit<User, 'password'> | null>(
    getUserFromLocalStorage()
  )

  const saveUser = (user: User) => {
    const { password, ...dataToSave } = user
    localStorage.setItem('user', JSON.stringify(dataToSave))
    setUser(dataToSave)
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
