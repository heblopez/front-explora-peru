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
import { FormEvent, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const credentials = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value
    }

    console.log(credentials)
    formRef.current?.reset()
  }

  return (
    <main className='flex justify-center my-auto p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center text-primary dark:text-slate-50'>
            Iniciar Sesión
          </CardTitle>
          <CardDescription className='text-center'>
            Accede a tu cuenta con tus credenciales
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
                  Correo Electrónico:
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
                  Contraseña:
                </label>
                <Input id='password' type='password' required />
              </div>
              <Button
                type='submit'
                className='w-full bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
              >
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='text-sm text-center'>
            <p>¿Olvidaste tu contraseña?</p>
            <Link
              to='#'
              className='text-primary-dark font-bold hover:underline dark:text-primary-light'
            >
              Recupérala aquí
            </Link>
          </div>
          <div className='text-sm text-center'>
            <p>¿No tienes una cuenta?</p>
            <Link
              to='/register'
              className='text-primary-dark font-bold hover:underline dark:text-primary-light'
            >
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
