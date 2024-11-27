import { Session } from './session'
import { Tour } from './tour'

export interface Booking {
  bookingId: number
  sessionId: number
  touristId: number
  totalPrice: number
  numberOfAttendees: number
}

export interface ResMyBookings {
  message: string
  data: MyBooking[]
}

export interface MyBooking {
  bookingId: number
  sessionId: number
  touristId: number
  numberOfAttendees: number
  totalPrice: string
  createdAt: string
  updatedAt: string
  session: Session
  tour: Omit<Tour, 'places' | 'rating' | 'schedules'>
  agency: {
    travelAgencyId: number
    userId: number
    agencyName: string
    agencyDescription?: string
    ruc: string
    address: string
    logoUrl?: null
    website?: string
    verified: boolean
  }
}
