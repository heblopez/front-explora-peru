import { API_BOOKINGS_URL } from '@/config'
import { Booking, ResMyBookings } from '@/types/booking'
import { getBearerToken } from '@/utils'
import { toast } from 'sonner'

export const registerBooking = async (
  bookingData: Omit<Booking, 'bookingId' | 'touristId'>
) => {
  try {
    const res = await fetch(API_BOOKINGS_URL, {
      method: 'POST',
      headers: {
        Authorization: getBearerToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
    if (!res.ok) throw new Error('Failed to register the booking')
    const data = await res.json()
    return data.data
  } catch (error) {
    toast.error(
      'Error al registrar la reserva 😢 Por favor, inténtalo de nuevo'
    )
    console.error(error)
    return null
  }
}

export const getMyBookings = async () => {
  try {
    const res = await fetch(API_BOOKINGS_URL, {
      headers: {
        Authorization: getBearerToken()
      }
    })
    if (!res.ok) throw new Error('Failed to load the user bookings')
    const data = (await res.json()) as ResMyBookings
    return data.data
  } catch (error) {
    toast.error('Error al cargar los libros 😢 Por favor, inténtalo de nuevo')
    console.error(error)
    return null
  }
}
