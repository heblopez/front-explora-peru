import { API_TOURS_URL } from '@/config'
import { Tour, TourDTO } from '@/types/tour'
import { getBearerToken } from '@/utils'
import { toast } from 'sonner'

const bearerToken = getBearerToken()

export const getTours = async (query?: string): Promise<Tour[] | null> => {
  try {
    let urlToFetch = API_TOURS_URL
    if (query) urlToFetch += `?${query}`
    const res = await fetch(`${urlToFetch} `)
    if (!res.ok) throw new Error('Failed to load tours')
    const data = await res.json()
    return data.data
  } catch (error) {
    toast.error('Error al cargar los tours 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}

export const getMyTours = async (): Promise<Tour[] | null> => {
  try {
    const res = await fetch(`${API_TOURS_URL}/admin `, {
      headers: {
        Authorization: bearerToken
      }
    })

    if (!res.ok) throw new Error(`${res.status} - Failed to load tours`)
    const data = await res.json()
    return data.data
  } catch (error) {
    if (error instanceof Error && error.message.includes('401')) {
      toast.error('Unauthorized error. Por favor, inicia sesión nuevamente')
      localStorage.removeItem('user')
    } else if (error instanceof Error && error.message.includes('403')) {
      toast.error(
        'Forbidden error. No tienes permisos para acceder a este recurso'
      )
    } else {
      toast.error('Error al cargar los tours 😢 Por favor, inténtalo de nuevo')
      console.error(error)
    }
    return null
  }
}
export const deleteTour = async (
  id: number
): Promise<{ message: string; data: Tour } | null> => {
  try {
    const res = await fetch(`${API_TOURS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: bearerToken
      }
    })

    if (!res.ok) {
      throw new Error(`${res.status} - Failed to delete tour`)
    }

    const data = await res.json()

    return data
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        toast.error('Unauthorized error. Por favor, inicia sesión nuevamente')
        localStorage.removeItem('user')
      } else if (error.message.includes('403')) {
        toast.error(
          'Forbidden error. No tienes permisos para acceder a este recurso'
        )
      } else {
        toast.error('Error al eliminar, inténtalo de nuevo')
      }
      console.error(error)
    }
    return null
  }
}

export const updateTour = async (
  tour: Partial<Tour>
): Promise<{ message: string; data: Tour } | null> => {
  try {
    const res = await fetch(`${API_TOURS_URL}/${tour.tourId} `, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken
      },
      body: JSON.stringify(tour)
    })

    if (!res.ok) throw new Error(`${res.status} - Failed to update tour`)
    const data = await res.json()
    return data
  } catch (error) {
    if (error instanceof Error && error.message.includes('401')) {
      toast.error('Unauthorized error. Por favor, inicia sesión nuevamente')
      localStorage.removeItem('user')
    } else if (error instanceof Error && error.message.includes('403')) {
      toast.error(
        'Forbidden error. No tienes permisos para acceder a este recurso'
      )
    } else {
      toast.error('Error al actualizar, inténtalo de nuevo')
      console.error(error)
    }
    return null
  }
}

export const getTourById = async (id: string): Promise<Tour | null> => {
  try {
    const res = await fetch(`${API_TOURS_URL}/${id}`)

    if (!res.ok) throw new Error('Failed to load tour by ID')
    const data = await res.json()
    return data.data || null
  } catch (error) {
    toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}

export const registerTour = async (tour: TourDTO) => {
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
