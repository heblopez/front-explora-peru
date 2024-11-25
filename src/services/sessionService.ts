import { API_SESSIONS_URL } from '@/config'
import { Session, SessionDTO } from '@/types/session'
import { getBearerToken } from '@/utils'
import { toast } from 'sonner'

const bearerToken = getBearerToken()

export const getOrCreateSession = async (
  sessionData: SessionDTO
): Promise<Session | null> => {
  try {
    const res = await fetch(API_SESSIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: bearerToken
      },
      body: JSON.stringify(sessionData)
    })
    if (!res.ok) throw new Error('Failed to load info about the session')
    const data = await res.json()
    return data.data
  } catch (error) {
    toast.error(
      'Error al cargar la información de la sesión 😢 Por favor, inténtalo de nuevo'
    )
    console.error(error)
    return null
  }
}
