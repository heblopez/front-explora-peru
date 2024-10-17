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
