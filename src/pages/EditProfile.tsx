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
import { updateUser } from '@/services/userService'

type FormFields = 'username' | 'email' | 'phoneNumber' | 'password'

const EditProfile: React.FC = () => {
  const { t } = useTranslation() // Hook de traducción
  const [formData, setFormData] = useState<Record<FormFields, string>>({
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  })

  const [userData, setUserData] = useState<any>(null)
  const [errors, setErrors] = useState<Record<FormFields, string>>({
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      const user = JSON.parse(storedUserData)
      setUserData(user)
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
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
      email: '',
      phoneNumber: '',
      password: ''
    }

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9][a-zA-Z0-9._]{2,29}$/

    if (!formData.username || !usernameRegex.test(formData.username)) {
      newErrors.username = t('profile.username_error')
      isValid = false
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
      const datoToUpdate = {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password ? formData.password : userData.password
      }

      const saveData = async () => {
        const response = await updateUser(datoToUpdate)
        if (!response) {
          throw new Error(t('profile.save_error'))
        }
        return { ...userData, ...response }
      }

      toast.promise(saveData, {
        loading: t('profile.saving_changes'),
        success: data => {
          localStorage.setItem('user', JSON.stringify(data))
          setFormData({ ...formData, password: '' })
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
                ['username', 'email', 'phoneNumber', 'password'] as FormFields[]
              ).map(field => (
                <div key={field} className='space-y-2'>
                  <label
                    htmlFor={field}
                    className='text-sm font-medium leading-none'
                  >
                    {field === 'username' && t('profile.username')}
                    {field === 'email' && t('profile.email')}
                    {field === 'phoneNumber' && t('profile.phone')}
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
                      : field === 'phoneNumber' ?
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
