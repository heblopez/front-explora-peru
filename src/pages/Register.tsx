import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { z } from 'zod'
import { toast } from 'sonner'

export default function Register() {
  const [date, setDate] = useState<Date | undefined>()
  const formatDate = (date: Date) => {
    return format(date, 'dd MMMMMM yyyy', { locale: es })
  }

  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const RegistrationSchema = z.object({
    name: z
      .string()
      .min(2, 'El nombre es obligatorio y debe tener al menos 2 caracteres'),
    lastName: z
      .string()
      .min(2, 'El apellido es obligatorio y debe tener al menos 2 caracteres'),
    documentType: z.string().min(1, 'El tipo de documento es obligatorio'),
    documentNumber: z
      .number()
      .min(8, 'El número de documento debe tener al menos 8 caracteres'),
    birthdate: z.string().date('La fecha de nacimiento es incorrecta'),
    country: z.string(),
    gender: z.string(),
    phone: z
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
      .refine(
        value => value === formRef.current?.password.value,
        'Las contraseñas no coinciden'
      )
  })

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const registerForm = {
      name: (formRef.current?.elements.namedItem('name') as HTMLInputElement)
        .value,
      lastName: formRef.current?.lastname.value,
      documentType: (
        formRef.current?.elements.namedItem(
          'document-type'
        ) as HTMLSelectElement
      ).value,
      documentNumber: parseInt(formRef.current?.['document-number'].value),
      birthdate: date ? format(date as Date, 'yyyy-MM-dd') : '',
      country: formRef.current?.country.value,
      gender: formRef.current?.gender.value,
      phone: formRef.current?.['phone-number'].value,
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
      confirmPassword: formRef.current?.['confirm-password'].value
    }

    const isValidForm = RegistrationSchema.safeParse(registerForm)

    if (isValidForm.success) {
      delete registerForm.confirmPassword
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerForm)
      })
        .then(res => res.json())
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user))
          formRef.current?.reset()
          toast.success(`¡Registro exitoso! Bienvenido ${user.name} 🎉`)
          setTimeout(() => {
            navigate('/')
          }, 1200)
        })
        .catch(err => {
          console.error(err)
          toast.error(
            'Error al registrar usuario 😢 Por favor, inténtalo de nuevo.'
          )
        })
    } else {
      isValidForm.error.errors.forEach(err => toast.error(err.message))
    }
  }

  return (
    <main className='flex justify-center my-auto px-4 py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center text-primary dark:text-primary-lighter'>
            Registrarse
          </CardTitle>
          <CardDescription className='text-center'>
            Crea una cuenta para acceder a todas las funciones de la web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleRegister}>
            <div className='flex flex-col gap-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='name'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Nombres:
                </label>
                <Input
                  id='name'
                  type='text'
                  placeholder='John'
                  autoComplete='name'
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='lastname'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Apellidos:
                </label>
                <Input id='lastname' type='text' placeholder='Doe' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    * Tipo de Documento:
                    <Select name='document-type'>
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder='Seleccione:' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='DNI'>DNI</SelectItem>
                        <SelectItem value='CE'>C.E.</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='document-number'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    * Nº de documento:
                  </label>
                  <Input id='document-number' type='text' />
                </div>
              </div>
              <div className='grid grid-cols-1 sm gap-4 min-[425px]:grid-cols-2'>
                <div className='space-y-2'>
                  <label
                    htmlFor='birthdate'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    * Fecha de Nacimiento
                  </label>
                  <Popover>
                    <PopoverTrigger id='birthdate' asChild>
                      <Button
                        variant={'outline'}
                        className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        <span className='truncate'>
                          {date ? formatDate(date) : 'Seleccione una fecha'}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        captionLayout='dropdown-buttons'
                        fromYear={1970}
                        toMonth={new Date()}
                        disabled={[{ after: new Date() }]}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    País:
                    <Select name='country' autoComplete='country'>
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder='Seleccione:' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Peru'>🇵🇪 Perú</SelectItem>
                        <SelectItem value='Argentina'>🇦🇷 Argentina</SelectItem>
                        <SelectItem value='Brasil'>🇧🇷 Brasil</SelectItem>
                        <SelectItem value='Bolivia'>🇧🇴 Bolivia</SelectItem>
                        <SelectItem value='Chile'>🇨🇱 Chile</SelectItem>
                        <SelectItem value='Colombia'> 🇨🇴 Colombia</SelectItem>
                        <SelectItem value='Ecuador'>🇪🇨 Ecuador</SelectItem>
                        <SelectItem value='Mexico'>🇲🇽 México</SelectItem>
                        <SelectItem value='Paraguay'>🇵🇾 Paraguay</SelectItem>
                        <SelectItem value='USA'>🇺🇸 United States</SelectItem>
                        <SelectItem value='Uruguay'>🇺🇾 Uruguay</SelectItem>
                        <SelectItem value='Venezuela'>🇻🇪 Venezuela</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 min-[425px]:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Género:
                    <Select name='gender'>
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder='Seleccione:' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='male'>&#9794; Masculino</SelectItem>
                        <SelectItem value='female'>&#9792; Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='phone-number'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    * Número de celular:
                  </label>
                  <Input
                    id='phone-number'
                    type='text'
                    placeholder='(+51) 999-999-999'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Correo Electrónico:
                </label>
                <Input
                  id='email'
                  type='text'
                  placeholder='mail@example.com'
                  autoComplete='email'
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Contraseña:
                </label>
                <Input id='password' type='password' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='confirm-password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Confirmar Contraseña:
                </label>
                <Input id='confirm-password' type='password' />
              </div>
              <Button
                type='submit'
                className='w-full font-bold bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter mt-6'
              >
                Crear cuenta
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-sm text-center'>
            Al registrarte, aceptas nuestros{' '}
            <Link to='/terms' className='text-primary hover:underline'>
              Términos y Condiciones
            </Link>{' '}
            y{' '}
            <Link to='/privacy' className='text-primary hover:underline'>
              Política de Privacidad
            </Link>
          </div>
          <div className='text-sm text-center'>
            ¿Ya tienes una cuenta?{' '}
            <Link to='/login' className='text-primary hover:underline'>
              Inicia sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
