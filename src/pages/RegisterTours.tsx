import { useState } from 'react'
import { ProgressCircle } from '../components/RegisterTour/ProgressCircleProps'

import MapWithRoute from '@/components/RegisterTour/MapWithRoute'
import Stepper from '@/components/RegisterTour/Stepper'
import FileUploadTemplate from '@/components/RegisterTour/FileUploadTemplate'
import TourDetails from '@/components/RegisterTour/TourDetails'
export const RegisterTours = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    tourDetails: {
      name: '',
      region: '',
      price: '',
      rating: '',
      duration: '',
      days: [],
      startTime: '',
      endTime: ''
    },
    routeSelection: {},
    videoUpload: {},
    extraDetails: {}
  })
  const steps = [
    '',
    'Detalles del Tour',
    'Seleccionar rutas',
    'Subir video',
    'Detalles extras'
  ]

  const totalSteps = steps.length

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Error al enviar los datos')
      }

      alert('Datos enviados con éxito')
    } catch (error) {
      console.error(error)
      alert('Hubo un problema al enviar los datos')
    }
  }
  const updateStepData = (step: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: data
    }))
  }
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <TourDetails
              formData={formData.tourDetails}
              onUpdate={data => updateStepData('tourDetails', data)}
            />
          </>
        )
      case 2:
        return (
          <>
            <MapWithRoute
              onUpdate={data => updateStepData('routeSelection', data)}
            />
          </>
        )
      case 3:
        return (
          <>
            <FileUploadTemplate
              onUpdate={data => updateStepData('videoUpload', data)}
            />
          </>
        )
      case 4:
        return (
          <>
            <p>Review your information before submitting.</p>
            <button type='submit'>Submit</button>
          </>
        )
      default:
        return null
    }
  }
  return (
    <>
      {' '}
      <div className='flex flex-col content-center p-[20px] md:hidden'>
        <section className='flex items-center w-full'>
          <div className='basis-1/4'>
            <ProgressCircle
              value={(currentStep / totalSteps) * 100}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>

          <div className='basis-3/4'>
            <h2 className='text-primary'>
              {currentStep < totalSteps ?
                steps[currentStep]
              : 'Final Step: Review & Submit'}
            </h2>
            <p className='text-slate-800'>
              {' '}
              {currentStep < totalSteps ?
                `Next: ${steps[currentStep + 1]}`
              : ''}
            </p>
          </div>
        </section>

        <div className='w-full my-8'>{renderStepContent()}</div>

        <div className='flex justify-between w-full'>
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className='px-4 py-2 text-base border-none rounded bg-[#2975ba] text-white cursor-pointer disabled:bg-[#999999] disabled:cursor-not-allowed'
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={currentStep === totalSteps}
            className='px-4 py-2 text-base border-none rounded bg-[#2975ba] text-white cursor-pointer disabled:bg-[#999999] disabled:cursor-not-allowed'
          >
            Next
          </button>
        </div>
      </div>
      <div className='hidden md:flex'>
        <Stepper />
      </div>
    </>
  )
}
