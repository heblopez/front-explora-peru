import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'
import { FormEvent } from 'react'
import { AgencyRegForm } from '@/validations/authSchemas'
import { Textarea } from '../ui/textarea'

interface formProps {
  handleRegister: (form: AgencyRegForm) => void
  formRef: React.RefObject<HTMLFormElement>
  registerForm: AgencyRegForm
}

export default function FormRegistrationAgency({
  handleRegister,
  formRef,
  registerForm
}: formProps) {
  const { t } = useTranslation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerForm = {
      agencyName: formRef.current?.['agency-name'].value,
      agencyDescription: formRef.current?.['agency-description'].value,
      ruc: formRef.current?.['ruc'].value,
      address: formRef.current?.['address'].value,
      website: formRef.current?.['website'].value,
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
            htmlFor='agency-name'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            * {t('register.agencyName')}
          </label>
          <Input id='agency-name' type='text' />
        </div>
        <div className='space-y-2'>
          <label
            htmlFor='agency-description'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {t('register.agencyDescription')} <br />
            <span className='text-xs text-muted-foreground'>
              ({t('register.max500Characters')})
            </span>
          </label>
          <Textarea id='agency-description' />
        </div>
        <div className='grid grid-cols-1 gap-4 min-[425px]:grid-cols-2'>
          <div className='space-y-2'>
            <label
              htmlFor='ruc'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              * {t('register.ruc')}
            </label>
            <Input id='ruc' type='text' placeholder='20789789879' />
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
            htmlFor='address'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            * {t('register.address')}
          </label>
          <Input id='address' type='text' />
        </div>
        <div className='space-y-2'>
          <label
            htmlFor='website'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {t('register.website')}
          </label>
          <Input id='website' type='text' placeholder='https://example.com' />
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
