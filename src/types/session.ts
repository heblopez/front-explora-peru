export interface SessionDTO {
  tourId: number
  startDate: number
  endDate: number
}

export interface Session {
  sessionId: number
  tourId: number
  startDate: Date | string
  endDate: Date | string
  reservedAttendees: number
}
