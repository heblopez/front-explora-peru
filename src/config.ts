export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const API_AUTH_URL = `${API_BASE_URL}/api/auth`
export const API_TOURS_URL = `${API_BASE_URL}/api/tours`
export const API_SESSIONS_URL = `${API_BASE_URL}/api/sessions`
export const API_BOOKINGS_URL = `${API_BASE_URL}/api/bookings`
export const API_USERS_URL = `${API_BASE_URL}/api/users`

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
