import { API_BOOKINGS_URL } from '@/config'
import { Booking } from '@/types/booking'
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
