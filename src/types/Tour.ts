export interface Tour {
  id: string
  name: string
  region: string
  price: number
  rating: number
  duration: number
  days: string[]
  startTime: string
  routeSelection: [number, number][]
}

export interface TourAdmin {
  tourId: number
  tourName: string
  tourDescription: string
  regions: string[]
  price: number
  duration: string
  days: string[]
  places: {
    name: string
    description: string
    photoUrl: File | null
    coordinates: [number, number]
  }[]
}

// Pending: Unify the types of the two interfaces above
// with the fields that come from the API
