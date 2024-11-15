import React, { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getMyTours } from '@/services/tourService'
import { Tour } from '@/types/Tour'

export default function TourManagement() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTour, setCurrentTour] = useState<Tour | null>(null)
  const [formData, setFormData] = useState<Tour>({} as Tour)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    const method = currentTour ? 'PUT' : 'POST'
    const url =
      currentTour ?
        `http://localhost:3000/tours/${currentTour.tourId}`
      : 'http://localhost:3000/tours'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit the form')
      }

      fetchTours()
      alert(
        currentTour ?
          'Tour actualizado correctamente'
        : 'Tour agregado correctamente'
      )
      setIsDialogOpen(false)
      setCurrentTour(null)
      resetForm()
    } catch (error) {
      setError('Failed to submit the form. Please try again.')
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
    if (!confirm('Are you sure you want to delete this tour?')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:3000/tours/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete the tour')
      }
      fetchTours()
      alert('Tour eliminado correctamente')
    } catch (error) {
      setError('Failed to delete the tour. Please try again.')
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

  const navigate = useNavigate()
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
      {error && <p className='text-danger dark:text-danger'>{error}</p>}

      {/* Mostrar los tours como tarjetas */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {tours.map(tour => (
          <div
            key={tour.tourId}
            className='border rounded-lg shadow-md bg-secondary dark:bg-dark-card text-dark-primary-foreground dark:text-secondary p-4'
          >
            {/* Imagen del tour */}
            <img
              src={tour.photosUrl[0] || 'https://via.placeholder.com/150'}
              alt={tour.tourName}
              className='w-full h-48 object-cover rounded-md mb-4'
            />

            {/* Información del tour */}
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
            <p className='text-sm'>
              <strong>Tamaño máximo del grupo:</strong> {tour.maxGroupSize}
            </p>
            {tour.rating && (
              <p className='text-sm'>
                <strong>Rating:</strong> {tour.rating}/5
              </p>
            )}

            {/* Acciones */}
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
            <form onSubmit={handleSubmit} className='w-50 space-y-4'>
              <InputField
                type='text'
                name='tourName'
                placeholder='Nombre del Tour'
                value={formData.tourName}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='tourDescription'
                placeholder='Descripción del Tour'
                value={formData.tourDescription}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='regions'
                placeholder='Regiones (separadas por comas)'
                value={formData.regions.join(', ')}
                onChange={handleRegionsChange}
              />
              <InputField
                type='number'
                name='price'
                placeholder='Precio'
                value={formData.price}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='duration'
                placeholder='Duración (días)'
                value={formData.duration}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='days'
                placeholder='Días '
                value={formData.days.join(', ')}
                onChange={handleDaysChange}
              />
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
  ) /*(
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
      {error && <p className='text-danger dark:text-danger'>{error}</p>}

      <table className='min-w-full bg-secondary dark:bg-dark-card shadow rounded'>
        <thead>
          <tr className='bg-primary-lighter dark:bg-primary-dark text-dark-secondary dark:text-white text-sm leading-normal'>
            <th className='py-3 px-6 text-left'>ID</th>
            <th className='py-3 px-6 text-left'>Nombre</th>
            <th className='py-3 px-6 text-left'>Descripción</th>
            <th className='py-3 px-6 text-left'>Regiones</th>
            <th className='py-3 px-6 text-left'>Precio</th>
            <th className='py-3 px-6 text-left'>Duración</th>
            <th className='py-3 px-6 text-left'>Tamaño máximo del grupo</th>
            <th className='py-3 px-6 text-left'>Foto</th>
            <th className='py-3 px-6 text-left'>Días</th>
            <th className='py-3 px-6 text-left'>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-dark-secondary dark:text-white text-sm'>
          {tours.map(tour => (
            <tr
              key={tour.tourId}
              className='border-b border-gray-200 dark:border-dark-secondary hover:bg-primary-lightest dark:hover:bg-dark-card'
            >
              <td className='py-3 px-6 text-left'>{tour.tourId}</td>
              <td className='py-3 px-6 text-left'>{tour.tourName}</td>
              <td className='py-3 px-6 text-left'>{tour.tourDescription}</td>
              <td className='py-3 px-6 text-left'>{tour.regions.join(', ')}</td>
              <td className='py-3 px-6 text-left'>{tour.price}</td>
              <td className='py-3 px-6 text-left'>{tour.duration}</td>
              <td className='py-3 px-6 text-left'>{tour.maxGroupSize}</td>
              <td className='py-3 px-6 text-left'>{tour.photosUrl}</td>
              <td className='py-3 px-6 text-left'>{tour.days.join(', ')}</td>

              <td className='py-3 px-6 text-center'>
                <div className='flex item-center justify-center space-x-4'>
                  <button
                    className='text-accent dark:text-primary-light hover:text-primary-dark dark:hover:text-primary-lighter'
                    onClick={() => handleEdit(tour)}
                    title='Editar'
                  >
                    <Edit className='w-4 h-4' />
                  </button>
                  <button
                    className='text-danger dark:text-danger hover:text-danger-dark dark:hover:text-danger-light'
                    onClick={() => handleDelete(tour.tourId)}
                    title='Borrar'
                  >
                    <Trash className='w-4 h-4' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white dark:bg-dark-card p-6 rounded-lg w-96'>
            <h2 className='text-xl font-bold mb-4 text-primary-darker dark:text-primary-light'>
              {currentTour ? 'Editar Tour' : 'Agregar Nuevo Tour'}
            </h2>
            <form onSubmit={handleSubmit} className='w-50 space-y-4'>
              <InputField
                type='text'
                name='tourName'
                placeholder='Nombre del Tour'
                value={formData.tourName}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='tourDescription'
                placeholder='Descripción del Tour'
                value={formData.tourDescription}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='regions'
                placeholder='Regiones (separadas por comas)'
                value={formData.regions.join(', ')}
                onChange={handleRegionsChange}
              />
              <InputField
                type='number'
                name='price'
                placeholder='Precio'
                value={formData.price}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='duration'
                placeholder='Duración (días)'
                value={formData.duration}
                onChange={handleChange}
              />
              <InputField
                type='text'
                name='days'
                placeholder='Días '
                value={formData.days.join(', ')}
                onChange={handleDaysChange}
              />
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
  )*/
}
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  styleType: 'primary' | 'secondary'
}

type InputFieldProps = {
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
