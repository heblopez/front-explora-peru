'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import TourScheduler from './TourScheduler'
import MapWithRoute from './MapWithRoute'
import VideoUpload from './VideoUpload'
import FileUploadTemplate from './FileUploadTemplate'
const route: Array<[number, number]> = [
  [37.7749, -122.4194], // Punto A: San Francisco
  [37.7849, -122.4094], // Punto intermedio
  [37.7949, -122.3994] // Punto B: Otro punto en San Francisco
]
export default function Stepper() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      name: 'Detalles del Tour',
      content: <TourScheduler />
    },
    {
      name: 'Seleccionar rutas',
      content: <MapWithRoute route={route} />
    },
    { name: 'Subir video', content: <FileUploadTemplate /> },

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
            onClick={handleNextClick}
            disabled={activeStep === steps.length - 1}
            className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
