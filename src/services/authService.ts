import { API_AUTH_URL } from '@/config'
import { LoginResponse } from '@/types/auth'
import { LoginForm, TouristRegForm } from '@/validations/authSchemas'

export const login = async (form: LoginForm): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_AUTH_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    if (!res.ok) {
      const errorRes = await res.json()

      if (res.status === 500)
        throw new Error('Error de servidor. Por favor, inténtalo de nuevo 😢')
      else throw new Error(errorRes.errors[0].message)
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
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
    if (!res.ok)
      throw new Error('Error al registrar 😢 Por favor, inténtalo de nuevo')
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
