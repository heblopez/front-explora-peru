import { API_AUTH_URL } from '@/config'
import { LoginResponse, RegisterResponse } from '@/types/auth'
import {
  AgencyRegForm,
  LoginForm,
  TouristRegForm
} from '@/validations/authSchemas'

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

export const registerTourist = async (
  form: TouristRegForm
): Promise<RegisterResponse> => {
  try {
    const { confirmPassword: _, ...formToSend } = form
    const res = await fetch(`${API_AUTH_URL}/register-tourist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formToSend)
    })
    if (!res.ok)
      throw new Error(
        'Error al registrar turista 😢 Por favor, inténtalo de nuevo'
      )
    return res.json() as Promise<RegisterResponse>
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const registerAgency = async (
  form: AgencyRegForm
): Promise<RegisterResponse> => {
  try {
    const { confirmPassword: _, ...formToSend } = form
    const res = await fetch(`${API_AUTH_URL}/register-agency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formToSend)
    })
    if (!res.ok)
      throw new Error(
        'Error al registrar agencia 😢 Por favor, inténtalo de nuevo'
      )
    return res.json() as Promise<RegisterResponse>
  } catch (error) {
    console.error(error)
    throw error
  }
}
