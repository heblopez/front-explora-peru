export interface LoginResponse {
  message: string
  token: string
  data: TouristDataResponse | AgencyDataResponse
}

interface UserData {
  username: string
  email: string
  phoneNumber: string
  profilePicture?: string
  userType: 'ADMIN' | 'CUSTOMER'
  role?: 'tourist' | 'agency'
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}
export interface TouristDataResponse extends UserData {
  firstName: string
  lastName: string
  documentType: string
  documentNumber: string
  birthdate: Date
  country: string
  gender: string
}

export interface AgencyDataResponse extends UserData {
  agencyName: string
  agencyDescription?: string
  ruc: string
  address: string
  logoUrl?: string
  website?: string
  verified: boolean
}

export type RegisterResponse = Omit<LoginResponse, 'token'>
