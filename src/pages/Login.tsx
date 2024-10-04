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
import { User, UserLogin } from '@/types/User'
import { toast } from 'sonner'
import { z } from 'zod'
import { UserContext } from '@/context/UserContext'

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const { saveUser } = useContext(UserContext)

  const LoginSchema = z.object({
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const credentials: UserLogin = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value
    }

    const isValidForm = LoginSchema.safeParse(credentials)

    if (isValidForm.success) {
      const { email, password } = credentials

      const fetchUsers = async () => {
        try {
          const res = await fetch('http://localhost:3000/users')
          return res.json()
        } catch (error) {
          toast.error('Error de servidor 😢 Por favor, inténtalo de nuevo')
          console.error(error)
          return []
        }
      }

      const allUsers: User[] = await fetchUsers()
      if (allUsers.length === 0) {
        toast.error('Error al recuperar usuarios.')
        return
      }

      const loginPromise = () =>
        new Promise<User>((resolve, reject) =>
          setTimeout(() => {
            allUsers.forEach(user => {
              if (user.email === email && user.password === password) {
                return resolve(user)
              }
            })
            return reject(
              'Error! Las credenciales ingresadas son incorrectas 😟'
            )
          }, 2000)
        )

      toast.promise(loginPromise, {
        loading: 'Iniciando sesión...',
        success: dataUser => {
          formRef.current?.reset()
          saveUser(dataUser)
          navigate('/')
          return `¡Bienvenido de vuelta, ${dataUser.name}! 🫡`
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
                <Input id='email' type='text' placeholder='mail@example.com' />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Contraseña:
                </label>
                <Input id='password' type='password' />
              </div>
              <Button
                type='submit'
                className='w-full font-bold bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
              >
                Entrar
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
