export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const API_AUTH_URL = `${API_BASE_URL}/api/auth`
export const API_TOURS_URL = `${API_BASE_URL}/api/tours`

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
