import { z } from 'zod'

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('El correo electrónico debe ser válido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(7, 'La contraseña debe tener al menos 7 caracteres')
    .max(24, 'La contraseña debe tener como máximo 24 caracteres')
})

export const touristRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'El nombre es obligatorio y debe tener al menos 2 caracteres'),
    lastName: z
      .string()
      .min(2, 'El apellido es obligatorio y debe tener al menos 2 caracteres'),
    documentType: z.string().min(1, 'El tipo de documento es obligatorio'),
    documentNumber: z
      .string()
      .min(8, 'El número de documento debe tener al menos 8 digitos'),
    birthdate: z.string().date('La fecha de nacimiento es incorrecta'),
    country: z.string(),
    gender: z.string(),
    phoneNumber: z
      .string()
      .min(1, 'El número de celular es obligatorio')
      .min(11, 'El número de celular debe tener al menos 11 caracteres'),
    email: z
      .string()
      .min(1, 'El correo electrónico es obligatorio')
      .email('El correo electrónico debe ser válido'),
    password: z
      .string()
      .min(1, 'La contraseña es obligatoria')
      .min(7, 'La contraseña debe tener al menos 7 caracteres')
      .max(24, 'La contraseña debe tener como máximo 24 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'La confirmación de la contraseña es obligatoria')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

export const agencyRegisterSchema = z.object({
  agencyName: z
    .string()
    .min(2, 'El nombre es obligatorio y debe tener al menos 2 caracteres'),
  agencyDescription: z
    .string()
    .max(500, 'The description must have maximum 500 characters')
    .optional(),
  ruc: z
    .string({ invalid_type_error: 'The RUC must be a string' })
    .length(11, 'The RUC must be 11 characters long'),
  address: z
    .string()
    .min(1, 'The address is required')
    .refine(value => {
      const regex = /^[a-zA-Z0-9\s.,'-/#]+$/
      return regex.test(value)
    }, 'The address does not have a valid format'),
  website: z
    .string()
    .refine(value => {
      const regex =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/

      return regex.test(value)
    }, 'The website does not have a valid format')
    .optional(),
  phoneNumber: z
    .string()
    .min(1, 'El número de celular es obligatorio')
    .min(11, 'El número de celular debe tener al menos 11 caracteres'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('El correo electrónico debe ser válido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(7, 'La contraseña debe tener al menos 7 caracteres')
    .max(24, 'La contraseña debe tener como máximo 24 caracteres'),
  confirmPassword: z
    .string()
    .min(1, 'La confirmación de la contraseña es obligatoria')
})

export type LoginForm = z.infer<typeof userLoginSchema>
export type TouristRegForm = z.infer<typeof touristRegisterSchema>
export type AgencyRegForm = z.infer<typeof agencyRegisterSchema>
