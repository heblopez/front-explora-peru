export interface User {
  id: number
  name: string
  lastName: string
  documentType: string
  documentNumber: number
  birthdate: string
  country?: string
  gender?: string
  phone: string
  email: string
  password: string
}

export type UserRegister = Omit<User, 'id'>
export type UserLogin = Pick<User, 'email' | 'password'>
