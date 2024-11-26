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
import { useTranslation } from 'react-i18next'

type FormFields = 'name' | 'lastname' | 'email' | 'phone' | 'password'

const EditProfile: React.FC = () => {
  const { t } = useTranslation() // Hook de traducción
  const [formData, setFormData] = useState<Record<FormFields, string>>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
  })

  const [userData, setUserData] = useState<any>(null)
  const [errors, setErrors] = useState<Record<FormFields, string>>({
    name: '',
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
        name: user.name || '',
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
      name: '',
      lastname: '',
      email: '',
      phone: '',
      password: ''
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('profile.email_error')
      isValid = false
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = t('profile.password_error')
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
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password ? formData.password : userData.password
      }

      const saveData = async () => {
        const response = await fetch(
          `http://localhost:3000/users/${userData.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          }
        )

        if (!response.ok) {
          throw new Error(t('profile.save_error'))
        }

        return updatedData
      }

      toast.promise(saveData, {
        loading: t('profile.saving_changes'),
        success: () => {
          localStorage.setItem('user', JSON.stringify(updatedData))
          setFormData({
            name: '',
            lastname: '',
            email: '',
            phone: '',
            password: ''
          })
          return t('profile.save_success')
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
            {t('profile.update_info')}
          </CardTitle>
          <CardDescription className='text-center'>
            {t('profile.complete_fields')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              {(
                [
                  'name',
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
                    {field === 'name' && t('profile.name')}
                    {field === 'lastname' && t('profile.lastname')}
                    {field === 'email' && t('profile.email')}
                    {field === 'phone' && t('profile.phone')}
                    {field === 'password' && t('profile.password')}
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
                    placeholder={t(`profile.placeholder_${field}`)}
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
                        {t('profile.show_password')}
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
                {t('profile.save_changes')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default EditProfile
