import { API_USERS_URL } from '@/config'
import { getBearerToken } from '@/utils'

export const updateUser = async (userData: unknown) => {
  try {
    const res = await fetch(`${API_USERS_URL}`, {
      method: 'PATCH',
      headers: {
        Authorization: getBearerToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!res.ok) throw new Error('Failed to update user')
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error(error)
    return null
  }
}
