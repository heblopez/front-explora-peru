import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormEvent, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserLogin } from '@/types/user'
import { toast } from 'sonner'
import { UserContext } from '@/context/UserContext'
import { useTranslation } from 'react-i18next'
import { userLoginSchema } from '@/validations/authSchemas'
import { login } from '@/services/authService'
import { LoginResponse } from '@/types/auth'

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { saveUser } = useContext(UserContext)

  const { t } = useTranslation()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const credentials: UserLogin = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value
    }

    const isValidForm = userLoginSchema.safeParse(credentials)

    if (isValidForm.success) {
      const loginPromise = () =>
        new Promise<LoginResponse>((resolve, reject) =>
          setTimeout(() => {
            login(credentials)
              .then(data => resolve(data))
              .catch(err => {
                if (err.message.includes('Incorrect password')) {
                  reject(
                    'Error: Las credenciales ingresadas son incorrectas 😟'
                  )
                }
                reject(`${err.message} 😢`)
              })
          }, 1200)
        )

      toast.promise(loginPromise, {
        loading: 'Iniciando sesión...',
        success: loginRes => {
          formRef.current?.reset()
          const welcomeName = saveUser(loginRes)
          navigate('/')
          return `¡Bienvenido de vuelta, ${welcomeName}! 🫡`
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

  return (
    <main className='flex justify-center my-auto px-4 py-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center text-primary dark:text-primary-lighter'>
            {t('login.title')}
          </CardTitle>
          <CardDescription className='text-center'>
            {t('login.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleLogin}>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {t('login.email')}
                </label>
                <Input id='email' type='text' placeholder='mail@example.com' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {t('login.password')}
                </label>
                <Input id='password' type='password' />
              </div>
              <Button
                type='submit'
                className='w-full font-bold bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
              >
                {t('login.textBtn')}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-sm text-center'>
            <p>{t('login.forgetPassword')}</p>
            <Link
              to='#'
              className='text-primary-dark font-bold hover:underline dark:text-primary-light'
            >
              {t('login.recoverPassword')}
            </Link>
          </div>
          <div className='text-sm text-center'>
            <p>{t('login.dontHaveAccount')}</p>
            <Link
              to='/register'
              className='text-primary-dark font-bold hover:underline dark:text-primary-light'
            >
              {t('login.register')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
