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
import { DatedSchedule } from '@/types/tour'

function TourSchedulesInfo({
  dataSchedules
}: {
  dataSchedules: DatedSchedule[]
}) {
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
            schedulesData={dataSchedules}
            onSelectSchedule={handleSelectSchedule}
          />
        </div>
        <div className='grid grid-cols-2 gap-y-4 items-center'>
          <h2 className='text-xl font-semibold align-middle'>Más detalles</h2>
          {selectedSchedule && (
            <Button className='w-max ml-auto bg-primary hover:bg-primary-light font-bold'>
              Reservar
            </Button>
          )}
          <Card className='col-span-2'>
            <CardContent>
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

export default function SchedulesModal({
  dataSchedules,
  btnClassName
}: {
  dataSchedules: DatedSchedule[]
  btnClassName?: string
}) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant='primary' className={btnClassName}>
          Ver Horarios Disponibles
        </Button>
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
        </ResponsiveModalHeader>
        <TourSchedulesInfo dataSchedules={dataSchedules} />
      </ResponsiveModalContent>
    </ResponsiveModal>
  )
}
