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

export const userRegisterSchema = z
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

export type LoginForm = z.infer<typeof userLoginSchema>
export type TouristRegForm = z.infer<typeof userRegisterSchema>
