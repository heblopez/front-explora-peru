import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import {
  AgencyRegForm,
  agencyRegisterSchema,
  TouristRegForm,
  touristRegisterSchema
} from '@/validations/authSchemas'
import { registerAgency, registerTourist } from '@/services/authService'
import { RegisterResponse } from '@/types/auth'
import FormRegistrationTourist from '@/components/Register/FormTourist'
import FormRegistrationAgency from '@/components/Register/FormAgency'

export default function Register({
  role = 'tourist'
}: {
  role?: 'tourist' | 'agency'
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  let registerForm = {} as TouristRegForm | AgencyRegForm

  const handleRegister = (registerForm: TouristRegForm | AgencyRegForm) => {
    const isValidForm =
      role === 'tourist' ?
        touristRegisterSchema.safeParse(registerForm)
      : agencyRegisterSchema.safeParse(registerForm)

    type RegisterService = (
      form: TouristRegForm | AgencyRegForm
    ) => Promise<RegisterResponse>
    let registerService = (
      role === 'tourist' ? registerTourist : registerAgency) as RegisterService

    if (isValidForm.success) {
      const registerPromise = () =>
        new Promise<RegisterResponse>((resolve, reject) => {
          setTimeout(() => {
            registerService(registerForm)
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
      console.log(isValidForm.error.errors)
    }
  }

  const { t } = useTranslation()

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
          {role === 'tourist' ?
            <FormRegistrationTourist
              handleRegister={handleRegister}
              formRef={formRef}
              registerForm={registerForm as TouristRegForm}
            />
          : <FormRegistrationAgency
              handleRegister={handleRegister}
              formRef={formRef}
              registerForm={registerForm as AgencyRegForm}
            />
          }
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
