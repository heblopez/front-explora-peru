import { API_TOURS_URL } from '@/config'
import { getBearerToken } from '@/utils'
import { toast } from 'sonner'

const bearerToken = getBearerToken()

export const getTours = async () => {
  try {
    const res = await fetch(`${API_TOURS_URL}/tours`)
    return res.json()
  } catch (error) {
    toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}

export const getTour = async (id: string) => {
  try {
    const res = await fetch(`${API_TOURS_URL}/tour/${id}`)
    return res.json()
  } catch (error) {
    toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}

export const registerTour = async (tour: unknown) => {
  try {
    const res = await fetch(`${API_TOURS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: bearerToken
      },
      body: JSON.stringify(tour)
    })

    if (res.status === 401 || res.status === 403) {
      toast.error(
        'Error 😢: No tienes permisos para crear un tour, por favor inicia sesión con tu cuenta de agencia'
      )
      return null
    }

    if (!res.ok) {
      throw new Error()
    }

    return res.json()
  } catch (error) {
    toast.error('Error al registrar 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}
