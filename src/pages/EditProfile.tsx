import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type FormFields = 'username' | 'email' | 'phone' | 'address'

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<Record<FormFields, string>>({
    username: '',
    email: '',
    phone: '',
    address: ''
  })

  const [errors, setErrors] = useState<Record<FormFields, string>>({
    username: '',
    email: '',
    phone: '',
    address: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name as FormFields]: value })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: Record<FormFields, string> = {
      username: '',
      email: '',
      phone: '',
      address: ''
    }

    if (!/^[A-Za-z]+$/.test(formData.username.trim())) {
      newErrors.username = 'El nombre de usuario solo puede contener letras.'
      isValid = false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido.'
      isValid = false
    }

    if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'El número de teléfono debe contener 9 dígitos.'
      isValid = false
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección no puede estar vacía.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Información actualizada:', formData)
      setFormData({ username: '', email: '', phone: '', address: '' })
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
              {(['username', 'email', 'phone', 'address'] as FormFields[]).map(
                field => (
                  <div key={field} className='space-y-2'>
                    <label
                      htmlFor={field}
                      className='text-sm font-medium leading-none'
                    >
                      {field === 'username' && 'Nombre de Usuario:'}
                      {field === 'email' && 'Correo Electrónico:'}
                      {field === 'phone' && 'Número de Teléfono:'}
                      {field === 'address' && 'Dirección:'}
                    </label>
                    <Input
                      id={field}
                      type={
                        field === 'email' ? 'email'
                        : field === 'phone' ?
                          'tel'
                        : 'text'
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={`Tu ${field === 'username' ? 'nombre de usuario' : field}`}
                      required
                    />
                    {errors[field] && (
                      <p className='text-red-500'>{errors[field]}</p>
                    )}
                  </div>
                )
              )}
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
