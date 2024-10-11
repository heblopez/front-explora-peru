import React, { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
type Coordinate = [number, number]
interface Tour {
  id: number
  name: string
  region: string
  price: string
  rating: string
  duration: string
  days: string[]
  startTime: string
  endTime: string
  routeSelection: Coordinate[]
}

export default function TourManagement() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTour, setCurrentTour] = useState<Tour | null>(null)
  const [formData, setFormData] = useState<Tour>({
    id: 0,
    name: '',
    region: '',
    price: '',
    rating: '',
    duration: '',
    days: [],
    startTime: '',
    endTime: '',
    routeSelection: []
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:3000/tours')
      if (!response.ok) {
        throw new Error('Failed to fetch tours')
      }
      const data = await response.json()
      setTours(data)
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
        `http://localhost:3000/tours/${currentTour.id}`
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
      alert('Tour elimando correctamente')
    } catch (error) {
      setError('Failed to delete the tour. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      region: '',
      price: '',
      rating: '',
      duration: '',
      days: [],
      startTime: '',
      endTime: '',
      routeSelection: []
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const navigate = useNavigate()
  return (
    <div className='container mx-auto p-4 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Administrador de Tours</h1>
        <div className='space-x-2'>
          <button
            className='bg-primary text-white px-4 py-2 rounded-md flex items-center'
            onClick={() => {
              navigate('/register-tours')
            }}
          >
            <PlusCircle className='mr-2 h-4 w-4' /> Add Tour
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <table className='min-w-full bg-white shadow rounded'>
        <thead>
          <tr className='bg-primary-lighter text-gray-700 text-sm leading-normal'>
            <th className='py-3 px-6 text-left'>ID</th>
            <th className='py-3 px-6 text-left'>Nombre</th>
            <th className='py-3 px-6 text-left'>Región</th>
            <th className='py-3 px-6 text-left'>Precio</th>
            <th className='py-3 px-6 text-left'>Calificación</th>
            <th className='py-3 px-6 text-left'>Duración</th>
            <th className='py-3 px-6 text-left'>Días</th>
            <th className='py-3 px-6 text-left'>Horas</th>
            <th className='py-3 px-6 text-left'>Cordenadas</th>
            <th className='py-3 px-6 text-center'>Acciones</th>
          </tr>
        </thead>
        <tbody className='text-gray-700 text-sm'>
          {tours.map(tour => (
            <tr
              key={tour.id}
              className='border-b border-gray-200 hover:bg-gray-100'
            >
              <td className='py-3 px-6 text-left'>{tour.id}</td>
              <td className='py-3 px-6 text-left'>{tour.name}</td>
              <td className='py-3 px-6 text-left'>{tour.region}</td>
              <td className='py-3 px-6 text-left'>{tour.price}</td>
              <td className='py-3 px-6 text-left'>{tour.rating}</td>
              <td className='py-3 px-6 text-left'>{tour.duration}</td>
              <td className='py-3 px-6 text-left'>{tour.days.join(', ')}</td>
              <td className='py-3 px-6 text-left'>{tour.startTime}</td>
              <td className='py-3 px-6 text-left'>
                {tour.routeSelection?.map(([lat, lng]: Coordinate, index) => (
                  <div key={index}>
                    <b>{`Punto ${index + 1}:`}</b>
                    {`Latitud: ${lat.toFixed(4)}, Longitud: ${lng.toFixed(4)}`}
                  </div>
                ))}
              </td>

              <td className='py-3 px-6 text-center'>
                <div className='flex item-center justify-center space-x-4'>
                  <button
                    className='text-blue-600 hover:text-blue-900'
                    onClick={() => handleEdit(tour)}
                    title='Editar'
                  >
                    <Edit className='w-4 h-4' />
                  </button>
                  <button
                    className='text-red-600 hover:text-red-900'
                    onClick={() => handleDelete(tour.id)}
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
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>
              {currentTour ? 'Edit Tour' : 'Add New Tour'}
            </h2>
            <form onSubmit={handleSubmit} className='w-50 space-y-4'>
              <input
                type='text'
                name='name'
                placeholder='Nombre del Tour'
                value={formData.name}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                name='region'
                placeholder='Región'
                value={formData.region}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                name='price'
                placeholder='Precio'
                value={formData.price}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                name='rating'
                placeholder='Calificación'
                value={formData.rating}
                onChange={handleChange}
                min='0'
                max='5'
                step='0.1'
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                name='duration'
                placeholder='Duración (días)'
                value={formData.duration}
                onChange={handleChange}
                min='1'
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                name='days'
                placeholder='Días (separados por comas)'
                value={formData.days.join(', ')}
                onChange={e => {
                  const daysArray = e.target.value
                    .split(',')
                    .map(day => day.trim())
                  setFormData(prev => ({ ...prev, days: daysArray }))
                }}
                className='w-full p-2 border rounded'
              />
              <input
                type='time'
                name='startTime'
                placeholder='Hora de Inicio'
                value={formData.startTime}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              />
              <input
                type='time'
                name='endTime'
                placeholder='Hora de Fin'
                value={formData.endTime}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              />
              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={() => setIsDialogOpen(false)}
                  className='bg-gray-200 text-gray-800 px-4 py-2 rounded-md'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md'
                >
                  {currentTour ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
