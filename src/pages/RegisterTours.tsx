import { useState } from 'react'
import { ProgressCircle } from '../components/ProgressCircleProps'
import TourScheduler from '@/components/TourScheduler'
import MapWithRoute from '@/components/MapWithRoute'
import VideoUpload from '@/components/VideoUpload'
export const RegisterTours = () => {
  // Estado para manejar el paso actual (por ejemplo, 2 de 4)
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    '',
    'Tour Details',
    'Seleccionar rutas',
    'Subir video',
    'Detalles extras'
  ]

  // Número total de pasos
  const totalSteps = steps.length

  // Funciones para avanzar y retroceder entre los pasos
  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  const route: Array<[number, number]> = [
    [37.7749, -122.4194], // Punto A: San Francisco
    [37.7849, -122.4094], // Punto intermedio
    [37.7949, -122.3994] // Punto B: Otro punto en San Francisco
  ]
  // Función para renderizar el contenido basado en el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <TourScheduler />
          </>
        )
      case 2:
        return (
          <>
            <MapWithRoute route={route} />
          </>
        )
      case 3:
        return (
          <>
            <VideoUpload />
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
    <div className='flex flex-col content-center p-[20px]'>
      <section className='flex items-center w-full'>
        <div className='basis-1/4'>
          <ProgressCircle
            value={(currentStep / totalSteps) * 100}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>

        {/* Título y subtítulo */}
        <div className='basis-3/4'>
          <h2>
            {currentStep < totalSteps ?
              steps[currentStep]
            : 'Final Step: Review & Submit'}
          </h2>
          <p className='text-gray-400'>
            {' '}
            {currentStep < totalSteps ? `Next: ${steps[currentStep + 1]}` : ''}
          </p>
        </div>
      </section>

      {/* Contenido del formulario basado en el paso */}
      <div className='w-full my-8'>{renderStepContent()}</div>

      {/* Botones de navegación */}
      <div className='flex justify-between w-full'>
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className='px-4 py-2 text-base border-none rounded bg-[#2975ba] text-white cursor-pointer disabled:bg-[#999999] disabled:cursor-not-allowed'
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === totalSteps}
          className='px-4 py-2 text-base border-none rounded bg-[#2975ba] text-white cursor-pointer disabled:bg-[#999999] disabled:cursor-not-allowed'
        >
          Next
        </button>
      </div>
    </div>
  )
}
