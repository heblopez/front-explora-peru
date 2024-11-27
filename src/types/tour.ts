export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export interface Schedule {
  scheduleId: number
  tourId: number
  startDay: DayOfWeek
  startTime: string
  endDay: DayOfWeek
  endTime: string
}

export interface DatedSchedule extends Schedule {
  startDate: Date
  endDate: Date
}
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
    photoUrl: string
    coordinates: string[]
  }[]
  rating?: number
  schedules: Schedule[]
}

export interface TourDTO {
  tourName: string
  tourDescription: string
  price: number
  duration: string
  maxGroupSize: number
  photosUrl: string[]
  places: {
    name: string
    description: string
    region: string
    photoUrl: string
    coordinates: string[]
  }[]
  schedules: Omit<Schedule, 'tourId' | 'scheduleId'>[]
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
