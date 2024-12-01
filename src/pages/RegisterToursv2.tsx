import React, { useEffect, useRef, useState } from 'react'
import { DollarSign, Clock, Users, Upload, X, CheckIcon } from 'lucide-react'
import { MapContainer, TileLayer } from 'react-leaflet'
import MarkersRandom from '@/components/RegisterTour/MarkersRandom'
import { useNavigate } from 'react-router-dom'
import { registerTour } from '@/services/tourService'
import { toast } from 'sonner'
import { DayOfWeek } from '@/types/tour'
const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

interface Tour {
  tour_name: string
  tour_description: string
  price: number
  duration: string
  max_group_size: number
  photos_url: string[]
  created_at: string
  updated_at: string
  days: string[]
}
interface Place {
  name: string
  description: string
  photo_url: string
  created_at: string
  updated_at: string
  coordinates: string[]
  region: string
}
interface Schedule {
  start_day: string
  start_time: string
  end_day: string
  end_time: string
}
interface FormData {
  tour: Tour
  place: Place[]
  schedules: Schedule[]
}

interface StepProps<T> {
  data: T
  setData: React.Dispatch<React.SetStateAction<FormData>>
}

const steps = [
  {
    name: 'Paso 1',
    content: (props: StepProps<Tour>) => <TourStep {...props} />
  },
  {
    name: 'Paso 2',
    content: (props: StepProps<Place>) => <PlaceStep {...props} />
  },
  {
    name: 'Paso 3',

    content: (props: StepProps<Schedule[]>) => <ScheduleStep {...props} />
  }
]

export default function RegisterTourV2() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    tour: {
      tour_name: '',
      tour_description: '',
      price: 0,
      duration: '',
      max_group_size: 0,
      photos_url: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      days: []
    },
    place: [
      {
        name: '',
        description: '',
        photo_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        coordinates: [''],
        region: ''
      }
    ],
    schedules: [
      {
        start_day: 'Monday',
        start_time: '',
        end_day: 'Tuesday',
        end_time: ''
      }
    ]
  })

  const handleNext = () => {
    console.log(formData)
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    console.log(formData)
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }
  const navigate = useNavigate()
  const handleCreateTour = async () => {
    try {
      const dataToSubmit = {
        tourName: formData.tour.tour_name || 'Nombre no disponible',
        tourDescription:
          formData.tour.tour_description || 'Descripción no disponible',
        price: formData.tour.price || 0,
        duration: formData.tour.duration || 'Duración no especificada',
        maxGroupSize: formData.tour.max_group_size || 1,
        photosUrl: formData.tour.photos_url || 'https://default.photo.url',

        places: formData.place.map(place => ({
          name: place.name || 'Nombre no disponible',
          description: place.description || 'Descripción no disponible',
          region: place.region || 'Puno',
          photoUrl: place.photo_url || 'https://default.photo.url',
          coordinates: place.coordinates.map(coordinate =>
            coordinate.toString()
          )
        })),
        schedules: formData.schedules.map(schedule => ({
          startDay: (schedule.start_day || 'Monday') as DayOfWeek,
          startTime: schedule.start_time || '00:00',
          endDay: (schedule.end_day || 'Tuesday') as DayOfWeek,
          endTime: schedule.end_time || '00:00'
        }))
      }

      const result = await registerTour(dataToSubmit)

      if (result) {
        toast.success('Tour registrado con éxito 🎉')
        console.log('Tour registrado:', result)
        navigate('/admin-tours')
      } else {
        toast.error('Error al registrar el tour 😢')
      }
    } catch (error) {
      toast.error(
        'Error al procesar la solicitud. Por favor, inténtalo de nuevo.'
      )
      console.error('Error en handleCreateTour:', error)
    }
  }

  const getDataForStep = () => {
    switch (currentStep) {
      case 0:
        return { data: formData.tour, setData: setFormData }
      case 1:
        return { data: formData.place, setData: setFormData }
      case 2:
        return { data: formData.schedules, setData: setFormData }
      default:
        return { data: formData.tour, setData: setFormData }
    }
  }
  return (
    <div className='w-5/6 md:w-3/6 bg-secondary dark:bg-gray-700 max-w-3xl mx-auto p-8 rounded-lg shadow-lg text-dark-secondary dark:text-primary'>
      <div className='flex justify-between items-center mb-8'>
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <button
              onClick={() => setCurrentStep(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep ?
                  'bg-primary text-white '
                : 'bg-primary-lightest text-primary '
              } ${index === currentStep ? 'ring-2 ring-accent' : ''}`}
            >
              {index < currentStep ?
                <CheckIcon className='w-6 h-6' />
              : <span>{index + 1}</span>}
            </button>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${index < currentStep ? 'bg-accent dark:bg-primary-light' : 'bg-primary-lighter dark:bg-dark-secondary'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='mt-4 w-full'>
        <div>{steps[currentStep].content(getDataForStep() as any)}</div>
        <div className='flex justify-between'>
          <button
            onClick={handleBack}
            disabled={currentStep == 0}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-500'
          >
            Atras
          </button>
          <button
            onClick={
              currentStep == steps.length - 1 ? handleCreateTour : handleNext
            }
            className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 dark:bg-primary-light dark:text-dark-primary-foreground'
          >
            {currentStep == steps.length - 1 ? 'Crear tour' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  )
}
function PlaceStep({ setData }: StepProps<Place>) {
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null)

  const handleMarkersChange = (markers: any[]) => {
    if (markers.length > 0) {
      setData(prev => ({
        ...prev,
        place: markers
      }))
    }
  }

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            console.log('Ubicación actual:', latitude, longitude)
            setCurrentPosition([latitude, longitude])
          },
          error => {
            console.error('Error obteniendo la ubicación:', error.message)
            setCurrentPosition([-12.04318, -77.02824])
          }
        )
      } else {
        console.error('La geolocalización no es compatible con este navegador.')
        setCurrentPosition([-12.04318, -77.02824])
      }
    }

    getCurrentPosition()
  }, [])

  if (!currentPosition) {
    return <p className='text-center text-gray-500'>Obteniendo ubicación...</p>
  }

  return (
    <div className='mb-4 w-full'>
      <MapContainer
        center={currentPosition}
        style={{ height: '80vh', width: '100%' }}
        zoom={16}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkersRandom onMarkersChange={handleMarkersChange} />
      </MapContainer>
    </div>
  )
}
const initialSchedule: Schedule = {
  start_day: 'Monday',
  end_day: 'Tuesday',
  start_time: '',
  end_time: ''
}

function ScheduleStep({ data, setData }: StepProps<Schedule[]>) {
  const [currentSchedule, setCurrentSchedule] =
    useState<Schedule>(initialSchedule)

  const handleDayChange = (key: 'start_day' | 'end_day', value: string) => {
    setCurrentSchedule(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleTimeChange = (key: 'start_time' | 'end_time', value: string) => {
    setCurrentSchedule(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const addSchedule = () => {
    setData(prev => ({
      ...prev,
      schedules: [...prev.schedules, currentSchedule]
    }))
    setCurrentSchedule(initialSchedule)
  }

  const removeSchedule = (index: number) => {
    setData(prev => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index)
    }))
  }

  return (
    <div>
      <h2 className='text-xl font-semibold text-dark-secondary dark:text-primary mb-4'>
        Configuración del Horario
      </h2>
      {data.map((schedule, index) => (
        <div key={index} className='mb-4 p-4 border border-gray-300 rounded-md'>
          <h3 className='text-lg font-medium mb-2'>Horario {index + 1}</h3>
          <p>Día de Inicio: {schedule.start_day}</p>
          <p>Hora de Inicio: {schedule.start_time}</p>
          <p>Día de Fin: {schedule.end_day}</p>
          <p>Hora de Fin: {schedule.end_time}</p>
          <button
            onClick={() => removeSchedule(index)}
            className='mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            Eliminar
          </button>
        </div>
      ))}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'>
          Día de Inicio
        </label>
        <select
          title='dias'
          value={currentSchedule.start_day}
          onChange={e => handleDayChange('start_day', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-dark-secondary text-dark-secondary dark:text-primary-lightest focus:outline-none focus:ring-primary-light focus:border-primary-light'
        >
          {dayNames.map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'>
          Hora de Inicio
        </label>
        <input
          type='time'
          value={currentSchedule.start_time}
          onChange={e => handleTimeChange('start_time', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-dark-secondary text-dark-secondary dark:text-primary-lightest focus:outline-none focus:ring-primary-light focus:border-primary-light'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'>
          Día de Fin
        </label>
        <select
          title='dias'
          value={currentSchedule.end_day}
          onChange={e => handleDayChange('end_day', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-dark-secondary text-dark-secondary dark:text-primary-lightest focus:outline-none focus:ring-primary-light focus:border-primary-light'
        >
          {dayNames.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'>
          Hora de Fin
        </label>
        <input
          type='time'
          value={currentSchedule.end_time}
          onChange={e => handleTimeChange('end_time', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-dark-secondary text-dark-secondary dark:text-primary-lightest focus:outline-none focus:ring-primary-light focus:border-primary-light'
        />
      </div>

      <button
        onClick={addSchedule}
        className='w-1/3 px-2 py-2 mb-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
      >
        Agregar Horario
      </button>
    </div>
  )
}

function TourStep({ data, setData }: StepProps<Tour>) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cloud_name = 'dgbn9dcr0'
  const preset_name = 'tours-photo'
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', preset_name)
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: 'POST',
            body: data
          }
        )
        const file = await response.json()
        const url = file.secure_url
        setData(prev => ({
          ...prev,
          tour: { ...prev.tour, photos_url: [...prev.tour.photos_url, url] }
        }))
      } catch (error) {}

      e.target.value = ''
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = data.photos_url.filter((_, i) => i !== index)
    setData(prev => ({
      ...prev,
      tour: { ...prev.tour, photos_url: newPhotos }
    }))
  }

  return (
    <div>
      <div className='mb-4'>
        <label
          htmlFor='nametour'
          className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'
        >
          Nombre
        </label>
        <input
          id='nametour'
          type='text'
          placeholder='Nombre del Tour'
          className='w-full pl-3 pr-3 py-2 border border-primary-lighter rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary dark:text-primary-lightest'
          value={data.tour_name}
          onChange={e =>
            setData(prev => ({
              ...prev,
              tour: { ...prev.tour, tour_name: e.target.value }
            }))
          }
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'
        >
          Descripción
        </label>
        <input
          id='description'
          type='text'
          placeholder='Descripción'
          className='w-full pl-3 pr-3 py-2 border border-primary-lighter rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary dark:text-primary-lightest'
          value={data.tour_description}
          onChange={e =>
            setData(prev => ({
              ...prev,
              tour: { ...prev.tour, tour_description: e.target.value }
            }))
          }
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='price'
          className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'
        >
          Precio
        </label>
        <div className='relative'>
          <DollarSign
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary dark:text-primary-light'
            size={18}
          />
          <input
            type='number'
            id='price'
            className='w-full pl-10 pr-3 py-2 border border-primary-lighter rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary dark:text-primary-lightest'
            value={data.price}
            onChange={e =>
              setData(prev => ({
                ...prev,
                tour: { ...prev.tour, price: parseFloat(e.target.value) || 0 }
              }))
            }
          />
        </div>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='duration'
          className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'
        >
          Duración
        </label>
        <div className='relative'>
          <Clock
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary dark:text-primary-light'
            size={18}
          />
          <input
            type='text'
            id='duration'
            className='w-full pl-10 pr-3 py-2 border border-primary-lighter rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary dark:text-primary-lightest'
            value={data.duration}
            onChange={e =>
              setData(prev => ({
                ...prev,
                tour: { ...prev.tour, duration: e.target.value }
              }))
            }
          />
        </div>
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'>
          Fotos
        </label>
        <div className='flex flex-wrap gap-2 mb-2'>
          {data.photos_url.map((photo, index) => (
            <div key={index} className='relative'>
              <img
                src={photo}
                alt={`Tour photo ${index + 1}`}
                className='w-20 h-20 object-cover rounded-md border border-primary-lightest dark:border-dark-secondary'
              />
              <button
                type='button'
                title='Eliminar'
                onClick={() => removePhoto(index)}
                className='absolute -top-2 -right-2 bg-danger text-white rounded-full p-1 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-danger'
              >
                <X className='w-4 h-4' />
              </button>
            </div>
          ))}
        </div>
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary flex items-center dark:bg-dark-secondary dark:text-primary-lightest'
        >
          <Upload className='mr-2' size={18} /> Subir Fotos
        </button>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          multiple
          onChange={handlePhotoUpload}
          className='hidden'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='max_group_size'
          className='block text-sm font-medium text-dark-secondary dark:text-primary-lightest mb-1'
        >
          Tamaño máximo del grupo
        </label>
        <div className='relative'>
          <Users
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary dark:text-primary-light'
            size={18}
          />
          <input
            type='number'
            id='max_group_size'
            className='w-full pl-10 pr-3 py-2 border border-primary-lighter rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-secondary dark:text-primary-lightest'
            value={data.max_group_size}
            onChange={e =>
              setData(prev => ({
                ...prev,
                tour: {
                  ...prev.tour,
                  max_group_size: parseInt(e.target.value, 10) || 0
                }
              }))
            }
          />
        </div>
      </div>
    </div>
  )
}
