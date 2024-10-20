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
import { es, enUS } from 'date-fns/locale'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { userRegisterSchema } from '@/validations/authSchemas'
import CountriesSelect from '@/components/Register/CountriesList'
import { registerTourist } from '@/services/authService'
import { RegisterResponse } from '@/types/auth'

export default function Register() {
  const [date, setDate] = useState<Date | undefined>()
  const [openCalendar, setOpenCalendar] = useState(false)
  const [country, setCountry] = useState<string>('')

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMMMM yyyy', { locale: es })
  }

  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const registerForm = {
      firstName: (
        formRef.current?.elements.namedItem('name') as HTMLInputElement
      ).value,
      lastName: formRef.current?.lastname.value,
      documentType: (
        formRef.current?.elements.namedItem(
          'document-type'
        ) as HTMLSelectElement
      ).value,
      documentNumber: formRef.current?.['document-number'].value,
      birthdate: date ? format(date as Date, 'yyyy-MM-dd') : '',
      country: country ? country.split(' ')[1] : '',
      gender: formRef.current?.gender.value,
      phoneNumber: formRef.current?.['phone-number'].value,
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
      confirmPassword: formRef.current?.['confirm-password'].value
    }

    const isValidForm = userRegisterSchema.safeParse(registerForm)

    if (isValidForm.success) {
      delete registerForm.confirmPassword
      const registerPromise = () =>
        new Promise<RegisterResponse>((resolve, reject) => {
          setTimeout(() => {
            registerTourist(registerForm)
              .then(_ => resolve(_))
              .catch(err => reject(err.message))
          })
        })

      toast.promise(registerPromise, {
        loading: 'Registrando...',
        success: () => {
          formRef.current?.reset()
          navigate('/login')
          return '¡Registro exitoso! 🎉 Por favor, inicia sesión'
        },
        error: err => err,
        style: {
          justifyContent: 'center'
        },
        position: 'top-center'
      })
    } else {
      isValidForm.error.errors.forEach(err => toast.error(err.message))
    }
  }

  const { t, i18n } = useTranslation()

  return (
    <main className='flex justify-center my-auto px-4 py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center text-primary dark:text-primary-lighter'>
            {t('register.title')}
          </CardTitle>
          <CardDescription className='text-center'>
            {t('register.subtitle')}
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
                  * {t('register.name')}
                </label>
                <Input id='name' type='text' placeholder='John' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='lastname'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * {t('register.lastname')}
                </label>
                <Input id='lastname' type='text' placeholder='Doe' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    * {t('register.documentType')}
                    <Select name='document-type'>
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder={t('register.select')} />
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
                    * {t('register.documentNumber')}
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
                    * {t('register.birthdate')}
                  </label>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger id='birthdate' asChild>
                      <Button
                        variant={'outline'}
                        className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        <span className='truncate'>
                          {date ? formatDate(date) : t('register.selectDate')}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={date => {
                          setDate(date)
                          setOpenCalendar(false)
                        }}
                        initialFocus
                        captionLayout='dropdown-buttons'
                        fromYear={1970}
                        toMonth={new Date()}
                        disabled={[{ after: new Date() }]}
                        locale={i18n.language == 'en' ? enUS : es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    {t('register.country')}
                    <CountriesSelect
                      onCountry={country => setCountry(country)}
                    />
                  </label>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 min-[425px]:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    {t('register.gender')}
                    <Select name='gender'>
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder={t('register.select')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='male'>
                          &#9794; {t('register.male')}
                        </SelectItem>
                        <SelectItem value='female'>
                          &#9792; {t('register.female')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
                <div className='space-y-2'>
                  <label
                    htmlFor='phone-number'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    * {t('register.phone')}
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
                  * {t('register.email')}
                </label>
                <Input id='email' type='text' placeholder='mail@example.com' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * {t('register.password')}
                </label>
                <Input id='password' type='password' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='confirm-password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  * {t('register.confirmPassword')}
                </label>
                <Input id='confirm-password' type='password' />
              </div>
              <Button
                type='submit'
                className='w-full font-bold bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter mt-6'
              >
                {t('register.textBtn')}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-sm text-center'>
            {t('register.byRegistering')}
            <Link to='/terms' className='text-primary hover:underline'>
              {t('register.termsLink')}
            </Link>
            {t('register.and')}
            <Link to='/privacy' className='text-primary hover:underline'>
              {t('register.policyLink')}
            </Link>
          </div>
          <div className='text-sm text-center'>
            {t('register.alreadyHaveAccount')}
            <Link to='/login' className='text-primary hover:underline'>
              {t('register.loginLink')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
