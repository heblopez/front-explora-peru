import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

type FormFields = 'username' | 'lastname' | 'email' | 'phone' | 'password'

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormFields, string>>({
    username: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  })

  const [userData, setUserData] = useState<any>(null)
  const [errors, setErrors] = useState<Record<FormFields, string>>({
    username: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      const user = JSON.parse(storedUserData)
      setUserData(user)
      setFormData({
        username: user.name || '',
        lastname: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        password: ''
      })
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name as FormFields]: value })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: Record<FormFields, string> = {
      username: '',
      lastname: '',
      email: '',
      phone: '',
      password: ''
    }

    if (!/^[A-Za-z]+$/.test(formData.username.trim())) {
      newErrors.username = 'El nombre de usuario solo puede contener letras.'
      isValid = false
    }

    if (!/^[A-Za-z]+$/.test(formData.lastname.trim())) {
      newErrors.lastname = 'El apellido solo puede contener letras.'
      isValid = false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido.'
      isValid = false
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const updatedData = {
        ...userData,
        name: formData.username,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password ? formData.password : userData.password
      }

      const saveData = async () => {
        const response = await fetch(
          `http://localhost:3000/users/${userData.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          }
        )

        if (!response.ok) {
          throw new Error('Error al guardar los cambios')
        }

        return updatedData
      }

      toast.promise(saveData, {
        loading: 'Guardando cambios...',
        success: () => {
          localStorage.setItem('user', JSON.stringify(updatedData))
          setFormData({
            username: '',
            lastname: '',
            email: '',
            phone: '',
            password: ''
          })
          return 'Tus datos han sido cambiados ✅'
        },
        error: err => err.message,
        position: 'top-center'
      })
    }
  }

  return (
    <main className='flex justify-center my-auto p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center text-primary dark:text-primary-lighter'>
            Actualizar Información Personal
          </CardTitle>
          <CardDescription className='text-center'>
            Completa los campos a continuación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              {(
                [
                  'username',
                  'lastname',
                  'email',
                  'phone',
                  'password'
                ] as FormFields[]
              ).map(field => (
                <div key={field} className='space-y-2'>
                  <label
                    htmlFor={field}
                    className='text-sm font-medium leading-none'
                  >
                    {field === 'username' && 'Nombre del Usuario:'}
                    {field === 'lastname' && 'Apellido del Usuario:'}
                    {field === 'email' && 'Correo Electrónico:'}
                    {field === 'phone' && 'Número de Teléfono:'}
                    {field === 'password' && 'Nueva Contraseña:'}
                  </label>
                  <Input
                    id={field}
                    type={
                      field === 'password' ?
                        showPassword ?
                          'text'
                        : 'password'
                      : field === 'email' ?
                        'email'
                      : field === 'phone' ?
                        'tel'
                      : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={`Tu ${
                      field === 'username' ? 'nombre de usuario'
                      : field === 'lastname' ? 'apellido de usuario'
                      : field === 'password' ? 'nueva contraseña'
                      : field
                    }`}
                    required={
                      field !== 'password' || formData.password.length > 0
                    }
                  />
                  {field === 'password' && (
                    <div className='flex items-center mt-2'>
                      <input
                        type='checkbox'
                        id='showPassword'
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className='mr-2'
                      />
                      <label htmlFor='showPassword' className='text-sm'>
                        Mostrar Contraseña
                      </label>
                    </div>
                  )}
                  {errors[field] && (
                    <p className='text-red-500'>{errors[field]}</p>
                  )}
                </div>
              ))}
              <Button
                type='submit'
                className='w-full font-bold bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default EditProfile
