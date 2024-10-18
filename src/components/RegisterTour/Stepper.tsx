import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import MapWithRoute from './MapWithRoute'
import FileUploadTemplate from './FileUploadTemplate'
import { useNavigate } from 'react-router-dom'
import TourDetails from './TourDetails'

export default function Stepper() {
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    tourDetails: {
      name: '',
      description: '',
      region: '',
      price: '',
      rating: '',
      duration: '',
      image: '',
      days: [''],
      startTime: '',
      endTime: '',
      places: {
        name: '',
        image: '',
        coordinates: ['']
      }
    },
    routeSelection: {},
    videoUpload: {},
    extraDetails: {}
  })
  const updateStepData = (step: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: data
    }))
  }

  const steps = [
    {
      name: 'Detalles del Tour',
      content: (
        <TourDetails
          formData={formData.tourDetails}
          onUpdate={data => updateStepData('tourDetails', data)}
        />
      )
    },
    {
      name: 'Seleccionar rutas',
      content: (
        <MapWithRoute
          onUpdate={data => updateStepData('routeSelection', data)}
        />
      )
    },
    {
      name: 'Subir video',
      content: (
        <FileUploadTemplate
          onUpdate={data => updateStepData('videoUpload', data)}
        />
      )
    },

    {
      name: 'Detalles extras',
      content: (
        <>
          <div>Revise su información antes de subirla</div>
          <button type='submit'>Enviar</button>
        </>
      )
    }
  ]

  const handleStepClick = (index: number) => {
    setActiveStep(index)
  }

  const handleNextClick = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }
  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1)
  }

  const handleSubmit = async () => {
    const dataToSubmit = {
      ...formData.tourDetails,
      routeSelection: formData.routeSelection,
      videoUpload: formData.videoUpload,
      extraDetails: formData.extraDetails
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

  return (
    <div className='w-full mx-11 '>
      <h2 className='text-2xl font-semibold mb-6'>Registrar Tour</h2>
      <div className='flex mb-6 '>
        <ol className='relative border-l border-primary mr-8 '>
          {steps.map((step, index) => (
            <li key={step.name} className='mb-6 ml-4'>
              <button
                onClick={() => handleStepClick(index)}
                className='flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full'
                aria-current={activeStep === index ? 'step' : undefined}
              >
                <div
                  className={`absolute w-8 h-8 rounded-full -left-4 flex items-center justify-center ${
                    index <= activeStep ?
                      'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < activeStep ?
                    <CheckCircle2 className='w-5 h-5' />
                  : <span>{index + 1}</span>}
                </div>
                <h3
                  className={`font-medium ml-4 ${
                    index <= activeStep ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </h3>
              </button>
            </li>
          ))}
        </ol>
        <div
          className={`flex-1 w-full md:mx-32  ${activeStep === steps.length - 1 ? 'hidden' : ''}`}
        >
          <div className='mb-4 '>{steps[activeStep].content}</div>
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className='px-4 py-2 mr-[50vw] text-base border-none rounded bg-secondary text-gray-800 cursor-pointer disabled:bg-[#999999] disabled:cursor-not-allowed'
          >
            Back
          </button>
          <button
            onClick={handleNextClick}
            disabled={activeStep === steps.length - 1}
            className='px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
        <div
          className={`flex-1 w-full md:mx-32  ${activeStep === steps.length - 1 ? '' : 'hidden'}`}
        >
          {' '}
          <button
            onClick={handleSubmit}
            disabled={activeStep === steps.length}
            className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
