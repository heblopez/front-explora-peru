import { useState, useEffect } from 'react'
import { MapPin, DollarSign, Star, Clock, Calendar } from 'lucide-react'

const daysOfWeek = [
  { id: 'Lunes', label: 'Lunes' },
  { id: 'Martes', label: 'Martes' },
  { id: 'Miércoles', label: 'Miércoles' },
  { id: 'Jueves', label: 'Jueves' },
  { id: 'Viernes', label: 'Viernes' },
  { id: 'Sábado', label: 'Sábado' },
  { id: 'Domingo', label: 'Domingo' }
]

interface TourDetailsProps {
  formData: {
    name: string
    region: string
    price: string
    rating: string
    duration: string
    days: string[]
    startTime: string
    endTime: string
  }
  onUpdate: (data: any) => void
}

export default function TourDetails({ formData, onUpdate }: TourDetailsProps) {
  const [localFormData, setLocalFormData] = useState(formData)

  useEffect(() => {
    setLocalFormData(formData)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedData = { ...localFormData, [name]: value }
    setLocalFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleDayChange = (day: string) => {
    const updatedDays =
      localFormData.days.includes(day) ?
        localFormData.days.filter(d => d !== day)
      : [...localFormData.days, day]
    const updatedData = { ...localFormData, days: updatedDays }
    setLocalFormData(updatedData)
    onUpdate(updatedData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', localFormData)
    alert('Formulario enviado con éxito!')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=' rounded-lg shadow-xl p-8 w-full'
      >
        <section className='flex w-full justify-around'>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-primary dark:text-primary-lighter mb-1'
              >
                Nombre de la Expedición
              </label>
              <input
                id='name'
                name='name'
                type='text'
                value={localFormData.name}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
              />
            </div>
            <div>
              <label
                htmlFor='region'
                className='block text-sm font-medium text-primary dark:text-primary-lighter mb-1 flex items-center'
              >
                <MapPin className='w-4 h-4 mr-2 text-primary dark:text-primary-lighter' />
                Región
              </label>
              <input
                id='region'
                name='region'
                type='text'
                value={formData.region}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
              />
            </div>

            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-primary dark:text-primary-lighter mb-1 flex items-center'
              >
                <DollarSign className='w-4 h-4 mr-2 text-primary dark:text-primary-lighter' />
                Precio
              </label>
              <input
                id='price'
                name='price'
                type='number'
                value={formData.price}
                onChange={handleChange}
                min='0'
                step='0.01'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
              />
            </div>

            <div>
              <label
                htmlFor='duration'
                className='block text-sm font-medium text-primary dark:text-primary-lighter mb-1 flex items-center'
              >
                <Clock className='w-4 h-4 mr-2 text-primary dark:text-primary-lighter' />
                Duración (días)
              </label>
              <input
                id='duration'
                name='duration'
                type='number'
                value={formData.duration}
                onChange={handleChange}
                min='1'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
              />
            </div>
          </div>
          <div className='space-y-6'>
            <div>
              <label className='text-sm font-medium text-primary dark:text-primary-lighter mb-2 flex items-center'>
                <Calendar className='w-4 h-4 mr-2 text-primary dark:text-primary-lighter' />
                Días de la semana
              </label>
              <div className='grid grid-cols-2 gap-2'>
                {daysOfWeek.map(day => (
                  <label key={day.id} className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      id={day.id}
                      checked={formData.days.includes(day.id)}
                      onChange={() => handleDayChange(day.id)}
                      className='rounded border-gray-300 text-primary dark:text-primary-lighter focus:ring-green-500 h-4 w-4'
                    />
                    <span className='text-sm text-primary dark:text-primary-lighter'>
                      {day.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className='flex flex-col space-y-8 items-center'>
              <div className='w-full'>
                <label
                  htmlFor='startTime'
                  className='text-sm font-medium text-primary dark:text-primary-lighter mb-1 flex items-center'
                >
                  <Clock className='w-4 h-4 mr-2 text-primary dark:text-primary-lighter' />
                  Hora de inicio
                </label>
                <input
                  id='startTime'
                  name='startTime'
                  type='time'
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='endTime'
                  className='text-sm font-medium text-primary dark:text-primary-lighter mb-1 flex items-center'
                >
                  <Clock className='w-4 h-4 mr-2 text-primary dark:text-primary-lighter' />
                  Hora de fin
                </label>
                <input
                  id='endTime'
                  name='endTime'
                  type='time'
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}
