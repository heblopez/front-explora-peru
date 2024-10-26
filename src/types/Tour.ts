export interface Tour {
  tourId: number
  agencyId: number
  tourName: string
  tourDescription: string
  regions: string[]
  price: string | number
  duration: string
  days: string[]
  maxGroupSize: number
  photosUrl: string[]
  places: {
    name: string
    description: string
    photoUrl: File | null
    coordinates: [number, number]
  }[]
  rating?: number
  startTime?: string
  routeSelection?: [number, number][]
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
