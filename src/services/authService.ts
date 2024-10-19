import { API_AUTH_URL } from '@/config'
import { LoginForm, TouristRegForm } from '@/validations/authSchemas'
import { toast } from 'sonner'

export const login = async (form: LoginForm) => {
  try {
    const res = await fetch(`${API_AUTH_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    return res.json()
  } catch (error) {
    toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}

export const registerTourist = async (form: TouristRegForm) => {
  try {
    const res = await fetch(`${API_AUTH_URL}/register-tourist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    return res.json()
  } catch (error) {
    toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}
