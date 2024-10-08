import { UserRegister } from '@/types/User'
import { toast } from 'sonner'

export const getAllUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users')
    return res.json()
  } catch (error) {
    toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return []
  }
}

export const registerUser = async (newUser: UserRegister) => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    return res.json()
  } catch (error) {
    toast.error('Error al registrar usuario 😢 Por favor, inténtalo de nuevo.')
    console.error(error)
  }
}
