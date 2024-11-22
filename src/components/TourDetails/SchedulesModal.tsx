'use client'
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger
} from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

import SchedulesViewer from './SchedulesViewer'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent } from '../ui/card'

type dayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

type DatedSchedule = {
  startDay: dayOfWeek
  startTime: string
  endDay: dayOfWeek
  endTime: string
  startDate?: Date
  endDate?: Date
}

const sampleSchedules: DatedSchedule[] = [
  {
    startDay: 'Monday',
    startTime: '09:00',
    endDay: 'Monday',
    endTime: '11:00'
  },
  {
    startDay: 'Monday',
    startTime: '14:00',
    endDay: 'Monday',
    endTime: '16:00'
  },
  {
    startDay: 'Monday',
    startTime: '19:00',
    endDay: 'Monday',
    endTime: '21:00'
  },
  {
    startDay: 'Tuesday',
    startTime: '10:00',
    endDay: 'Tuesday',
    endTime: '12:00'
  },
  {
    startDay: 'Tuesday',
    startTime: '15:00',
    endDay: 'Tuesday',
    endTime: '17:00'
  },
  {
    startDay: 'Wednesday',
    startTime: '08:00',
    endDay: 'Wednesday',
    endTime: '10:00'
  },
  {
    startDay: 'Wednesday',
    startTime: '13:00',
    endDay: 'Wednesday',
    endTime: '15:00'
  },
  {
    startDay: 'Wednesday',
    startTime: '18:00',
    endDay: 'Wednesday',
    endTime: '20:00'
  },
  {
    startDay: 'Thursday',
    startTime: '09:00',
    endDay: 'Thursday',
    endTime: '11:00'
  },
  {
    startDay: 'Thursday',
    startTime: '14:00',
    endDay: 'Thursday',
    endTime: '16:00'
  },
  {
    startDay: 'Thursday',
    startTime: '19:00',
    endDay: 'Thursday',
    endTime: '21:00'
  },
  {
    startDay: 'Friday',
    startTime: '10:00',
    endDay: 'Friday',
    endTime: '12:00'
  },
  {
    startDay: 'Friday',
    startTime: '15:00',
    endDay: 'Friday',
    endTime: '17:00'
  },
  {
    startDay: 'Saturday',
    startTime: '11:00',
    endDay: 'Saturday',
    endTime: '13:00'
  },
  {
    startDay: 'Saturday',
    startTime: '16:00',
    endDay: 'Saturday',
    endTime: '18:00'
  },
  {
    startDay: 'Sunday',
    startTime: '10:00',
    endDay: 'Sunday',
    endTime: '12:00'
  },
  {
    startDay: 'Sunday',
    startTime: '15:00',
    endDay: 'Sunday',
    endTime: '17:00'
  },
  { startDay: 'Sunday', startTime: '22:00', endDay: 'Sunday', endTime: '02:00' }
]

function TourSchedulesInfo() {
  const [selectedSchedule, setSelectedSchedule] = useState<{
    date: Date
    schedule: DatedSchedule
  } | null>(null)

  const handleSelectSchedule = (date: Date, schedule: DatedSchedule) => {
    setSelectedSchedule({ date, schedule })
    console.log('Horario seleccionado:', { date, schedule })
  }

  return (
    <div className='p-4 max-w-4xl mx-auto dark:text-secondary'>
      <div className='grid gap-6'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Horarios Disponibles</h2>
          <SchedulesViewer
            schedulesData={sampleSchedules}
            onSelectSchedule={handleSelectSchedule}
          />
        </div>
        <div className='grid grid-cols-2 gap-y-4'>
          <h2 className='text-xl font-semibold align-middle'>Más detalles</h2>
          {selectedSchedule && (
            <Button className='w-max ml-auto bg-primary hover:bg-primary-light font-bold'>
              Reservar
            </Button>
          )}
          <Card className='col-span-2'>
            <CardContent className='mt-4'>
              {selectedSchedule ?
                <div className='space-y-2'>
                  <p>
                    <strong>Fecha de inicio:</strong>{' '}
                    {format(selectedSchedule.date, "EEEE d 'de' MMMM, yyyy", {
                      locale: es
                    })}
                  </p>
                  <p>
                    <strong>Hora de inicio:</strong>{' '}
                    {selectedSchedule.schedule.startTime}
                  </p>
                  {selectedSchedule.schedule.endDate && (
                    <p>
                      <strong>Fecha de fin:</strong>{' '}
                      {format(
                        selectedSchedule.schedule.endDate,
                        "EEEE d 'de' MMMM, yyyy",
                        { locale: es }
                      )}
                    </p>
                  )}
                  <p>
                    <strong>Hora de fin:</strong>{' '}
                    {selectedSchedule.schedule.endTime}
                  </p>
                  {selectedSchedule.schedule.startDay !==
                    selectedSchedule.schedule.endDay && (
                    <p>
                      <strong>Duración:</strong> Múltiples días
                    </p>
                  )}
                  {selectedSchedule.schedule.startDay >
                    selectedSchedule.schedule.endDay && (
                    <p>
                      <strong>Nota:</strong> Este evento cruza la medianoche
                    </p>
                  )}
                </div>
              : <p className='text-gray-500 dark:text-secondary'>
                  Selecciona un horario para ver los detalles
                </p>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function SchedulesModal() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant='outline'>Ver Horarios</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side='bottom'>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className='text-center text-2xl text-primary dark:text-primary-lightest'>
            Reserva de Tours
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className='mb-4 text-center dark:text-secondary'>
            Hora actual:{' '}
            {format(currentTime, "d 'de' MMMM, yyyy HH:mm:ss", { locale: es })}
          </ResponsiveModalDescription>
          <TourSchedulesInfo />
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
