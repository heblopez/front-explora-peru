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
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Register() {
  const [date, setDate] = useState<Date | undefined>()
  const formatDate = (date: Date) => {
    return format(date, 'dd MMMMMM yyyy', { locale: es })
  }

  return (
    <main className='flex justify-center my-auto p-4'>
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
          <form>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='name'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Nombres:
                </label>
                <Input id='name' type='text' placeholder='John' required />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='lastname'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Apellidos:
                </label>
                <Input id='lastname' type='text' placeholder='Doe' required />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='document-type'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    * Tipo de Documento:
                  </label>
                  <Select required>
                    <SelectTrigger id='document-type'>
                      <SelectValue placeholder='Seleccione:' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='dni'>DNI</SelectItem>
                      <SelectItem value='ce'>C.E.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='document-number'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    * Nº de documento:
                  </label>
                  <Input id='document-number' type='text' required />
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
                    <PopoverTrigger asChild>
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
                  <label
                    htmlFor='country'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    País:
                  </label>
                  <Select>
                    <SelectTrigger id='country'>
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
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 min-[425px]:grid-cols-2'>
                <div className='space-y-2'>
                  <label
                    htmlFor='gender'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Género:
                  </label>
                  <Select>
                    <SelectTrigger id='gender'>
                      <SelectValue placeholder='Seleccione:' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>&#9794; Masculino</SelectItem>
                      <SelectItem value='female'>&#9792; Femenino</SelectItem>
                    </SelectContent>
                  </Select>
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
                    required
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
                  type='email'
                  placeholder='mail@example.com'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Contraseña
                </label>
                <Input id='password' type='password' required />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='confirm-password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * Confirmar Contraseña
                </label>
                <Input id='confirm-password' type='password' required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button className='w-full font-bold bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'>
            Crear cuenta
          </Button>
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
