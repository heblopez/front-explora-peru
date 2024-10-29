import { CalendarIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import CountriesSelect from './CountriesList'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { FormEvent, useState } from 'react'
import { TouristRegForm } from '@/validations/authSchemas'

interface formProps {
  handleRegister: (form: TouristRegForm) => void
  formRef: React.RefObject<HTMLFormElement>
  registerForm: TouristRegForm
}

export default function FormRegistrationTourist({
  handleRegister,
  formRef,
  registerForm
}: formProps) {
  const [date, setDate] = useState<Date | undefined>()
  const [openCalendar, setOpenCalendar] = useState(false)
  const [country, setCountry] = useState<string>('')

  const formatDate = (date: Date) => {
    return format(date, 'dd MMMMMM yyyy', { locale: es })
  }

  const { t, i18n } = useTranslation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerForm = {
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
    handleRegister(registerForm)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
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
                  <SelectItem value='PASSPORT'>Passport</SelectItem>
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
              <CountriesSelect onCountry={country => setCountry(country)} />
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
  )
}
