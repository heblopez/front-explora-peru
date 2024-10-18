import { useState } from 'react'
import MapWithRoute from './MapWithRoute'
import { useNavigate } from 'react-router-dom'
import TourDetails from './TourDetails'

export default function RegisterTour() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    tourName: '',
    tourDescription: '',
    regions: '',
    price: 0,
    duration: '',
    days: [],
    maxGroupSize: '',
    places: [] as {
      name: string
      description: string
      photoUrl: File | null
      coordinates: [number, number]
    }[]
  })

  const updateFormData = (key: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: data
    }))
  }
  const handleUpdate = (updatedData: any) => {
    setFormData(updatedData)
  }
  const handleSubmit = async () => {
    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      maxGroupSize: Number(formData.maxGroupSize),
      regions:
        Array.isArray(formData.regions) ? formData.regions : [formData.regions]
    }
    try {
      const response = await fetch('http://localhost:3000/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      })

      if (!response.ok) {
        throw new Error('Error al enviar los datos')
      }

      alert('Datos enviados con éxito')
      navigate('/admin-tours')
    } catch (error) {
      console.error(error)
      alert('Hubo un problema al enviar los datos')
    }
  }

  const handleMarkersUpdate = (
    markers: {
      name: string
      description: string
      photoUrl: File | null
      coordinates: [number, number]
    }[]
  ) => {
    updateFormData('places', markers)
  }

  return (
    <div className='w-full mx-11 '>
      <h2 className='text-2xl font-semibold mb-6'>Registrar Tour</h2>

      <TourDetails formData={formData} onUpdate={handleUpdate} />

      <MapWithRoute onUpdate={handleMarkersUpdate} />

      <div className='mt-6'>
        <button
          onClick={handleSubmit}
          className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Submit
        </button>
      </div>
    </div>
  )
}
