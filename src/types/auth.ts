export interface LoginResponse {
  message: string
  token?: string
  data?: TouristDataResponse | AgencyDataResponse
  errors?: object[]
}

export interface TouristDataResponse {
  username: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  documentType: string
  documentNumber: string
  birthdate: Date
  country: string
  gender: string
  profilePicture: null
  userType: string
  createdAt: Date
  updatedAt: Date
  lastLogin: null
}

export interface AgencyDataResponse {
  username: string
  email: string
  phoneNumber: string
  agencyName: string
  agencyDescription: null
  ruc: string
  address: string
  logoUrl: null
  website: null
  verified: boolean
  profilePicture: null
  userType: string
  createdAt: Date
  updatedAt: Date
  lastLogin: null
}
