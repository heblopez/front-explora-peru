import { API_TOURS_URL } from '@/config'
import { TourAdmin } from '@/types/tour'
import { getBearerToken } from '@/utils'
import { toast } from 'sonner'

const bearerToken = getBearerToken()

export const getTours = async (): Promise<TourAdmin[] | null> => {
  // Pending: Modify the type 'TourAdmin' with the fields that come from the API
  try {
    const res = await fetch(`${API_TOURS_URL}`)
    if (!res.ok) throw new Error('Failed to load tours')
    const data = await res.json()
    return data.data
  } catch (error) {
    toast.error('Error al cargar los tours 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}

export const getTourById = async (id: string) => {
  try {
    const res = await fetch(`${API_TOURS_URL}/${id}`)
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
