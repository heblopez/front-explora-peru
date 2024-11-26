import React, { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getMyTours, deleteTour, updateTour } from '@/services/tourService'
import { Tour } from '@/types/tour'

export default function TourManagement() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTour, setCurrentTour] = useState<Tour | null>(null)
  const [formData, setFormData] = useState<Tour>({} as Tour)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMyTours()
      if (data) setTours(data)
    } catch (error) {
      setError('Failed to load tours. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!formData.tourName || !formData.price || !formData.days?.length) {
        throw new Error('Por favor, completa todos los campos requeridos.')
      }

      const { places, schedules, ...dataToSubmit } = formData

      const response = await updateTour(dataToSubmit)

      if (!response || response.message !== 'Tour updated successfully!') {
        throw new Error(
          response?.message || 'Error desconocido al actualizar el tour.'
        )
      }

      await fetchTours()

      alert(`Tour "${response.data.tourName}" actualizado correctamente.`)

      resetForm()
      setCurrentTour(null)
      setIsDialogOpen(false)
    } catch (error: any) {
      console.error('Error al enviar el formulario:', error.message || error)
      setError(
        error.message ||
          'Ocurrió un error al enviar el formulario. Inténtalo nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (tour: Tour) => {
    setCurrentTour(tour)
    setFormData(tour)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    const userConfirmed = confirm('Are you sure you want to delete this tour?')
    if (!userConfirmed) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await deleteTour(id)

      if (response?.message === 'Tour deleted successfully!') {
        console.log('Tour eliminado:', response.data)
        await fetchTours()
        alert(`Tour "${response.data.tourName}" eliminado correctamente.`)
      } else {
        throw new Error(
          response?.message || 'Error desconocido al eliminar el tour.'
        )
      }
    } catch (error: any) {
      console.error('Error eliminando el tour:', error)
      setError(error.message || 'Failed to delete the tour. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({} as Tour)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
  }

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const daysArray = e.target.value.split(',').map(day => day.trim())
    setFormData(prev => ({
      ...prev,
      days: daysArray
    }))
  }

  const handleRegionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regionsArray = e.target.value.split(',').map(region => region.trim())
    setFormData(prev => ({
      ...prev,
      regions: regionsArray
    }))
  }

  return (
    <div className='container mx-auto p-4 min-h-screen bg-secondary dark:bg-dark-secondary text-dark-secondary dark:text-primary'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-primary-darker dark:text-primary-light'>
          Administrador de Tours
        </h1>
        <div className='space-x-2'>
          <button
            className='bg-primary-darker dark:bg-primary text-white dark:text-dark-primary-foreground px-4 py-2 rounded-md flex items-center'
            onClick={() => {
              navigate('/register-tours')
            }}
          >
            <PlusCircle className='mr-2 h-4 w-4' /> Add Tour
          </button>
        </div>
      </div>

      {loading && <p className='text-warning dark:text-warning'>Loading...</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {tours.map(tour => (
          <div
            key={tour.tourId}
            className='border rounded-lg shadow-md bg-secondary dark:bg-dark-card text-dark-primary-foreground dark:text-secondary p-4'
          >
            <img
              src={tour.photosUrl[0] || 'https://via.placeholder.com/150'}
              alt={tour.tourName}
              className='w-full h-48 object-cover rounded-md mb-4'
            />
            <h2 className='text-lg font-bold mb-2'>{tour.tourName}</h2>
            <p className='text-sm mb-2'>{tour.tourDescription}</p>
            <p className='text-sm'>
              <strong>Precio:</strong> ${tour.price}
            </p>
            <p className='text-sm'>
              <strong>Duración:</strong> {tour.duration}
            </p>
            <p className='text-sm'>
              <strong>Regiones:</strong> {tour.regions.join(', ')}
            </p>
            <p className='text-sm'>
              <strong>Días:</strong> {tour.days.join(', ')}
            </p>

            <div className='flex justify-between items-center mt-4'>
              <button
                title='Editar'
                onClick={() => handleEdit(tour)}
                className='text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-lighter'
              >
                <Edit className='w-4 h-4' />
              </button>
              <button
                title='Borrar'
                onClick={() => handleDelete(tour.tourId)}
                className='text-danger dark:text-danger hover:text-danger-dark dark:hover:text-danger-light'
              >
                <Trash className='w-4 h-4' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white dark:bg-dark-card p-6 rounded-lg w-96'>
            <h2 className='text-xl font-bold mb-4 text-primary-darker dark:text-primary-light'>
              {currentTour ? 'Editar Tour' : 'Agregar Nuevo Tour'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='tourName'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Nombre del Tour
                </label>
                <InputField
                  id='tourName'
                  type='text'
                  name='tourName'
                  placeholder='Nombre del Tour'
                  value={formData.tourName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='tourDescription'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Descripción del Tour
                </label>
                <InputField
                  id='tourDescription'
                  type='text'
                  name='tourDescription'
                  placeholder='Descripción del Tour'
                  value={formData.tourDescription}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='regions'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Regiones (separadas por comas)
                </label>
                <InputField
                  id='regions'
                  type='text'
                  name='regions'
                  placeholder='Regiones (separadas por comas)'
                  value={formData.regions.join(', ')}
                  onChange={handleRegionsChange}
                />
              </div>
              <div>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Precio
                </label>
                <InputField
                  id='price'
                  type='number'
                  name='price'
                  placeholder='Precio'
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='duration'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Duración (días)
                </label>
                <InputField
                  id='duration'
                  type='text'
                  name='duration'
                  placeholder='Duración (días)'
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='days'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Días (separados por comas)
                </label>
                <InputField
                  id='days'
                  type='text'
                  name='days'
                  placeholder='Días (separados por comas)'
                  value={formData.days.join(', ')}
                  onChange={handleDaysChange}
                />
              </div>
              <div className='flex justify-end space-x-2'>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  styleType='secondary'
                >
                  Cancelar
                </Button>
                <Button type='submit' styleType='primary'>
                  {currentTour ? 'Actualizar' : 'Agregar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  styleType: 'primary' | 'secondary'
}

type InputFieldProps = {
  id: string
  type: string
  name: string
  placeholder: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className='w-full p-2 border rounded bg-white dark:bg-dark-secondary text-gray-900 dark:text-primary'
  />
)

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  styleType
}) => {
  const styles =
    styleType === 'primary' ?
      'bg-primary-darker dark:bg-primary text-white px-4 py-2 rounded-md'
    : 'bg-gray-200 dark:bg-dark-secondary text-gray-800 dark:text-primary px-4 py-2 rounded-md'

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}
