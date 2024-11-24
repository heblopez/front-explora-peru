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
import { format, getUnixTime } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent } from '../ui/card'
import { DatedSchedule } from '@/types/tour'
import { Link } from 'react-router-dom'

function TourSchedulesInfo({
  dataSchedules
}: {
  dataSchedules: DatedSchedule[]
}) {
  const [selectedSchedule, setSelectedSchedule] =
    useState<DatedSchedule | null>(null)

  const handleSelectSchedule = (schedule: DatedSchedule) => {
    setSelectedSchedule(schedule)
    console.log('Horario seleccionado:', { schedule })
  }

  const generateLinkToCheckout = () => {
    if (!selectedSchedule) return ''

    const startDate = getUnixTime(selectedSchedule.startDate)
    const endDate = getUnixTime(selectedSchedule.endDate)

    return `/tours/${selectedSchedule?.tourId}/checkout/?sd=${startDate}&ed=${endDate}`
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
            <Link className='ml-auto' to={generateLinkToCheckout()}>
              <Button className='w-max px-4 bg-primary hover:bg-primary-light font-bold'>
                Reservar Ahora
              </Button>
            </Link>
          )}
          <Card className='col-span-2'>
            <CardContent>
              {selectedSchedule ?
                <div className='space-y-2'>
                  <p>
                    <strong>Fecha de inicio:</strong>{' '}
                    {format(
                      selectedSchedule.startDate,
                      "EEEE d 'de' MMMM, yyyy",
                      { locale: es }
                    )}
                  </p>
                  <p>
                    <strong>Hora de inicio:</strong>{' '}
                    {selectedSchedule.startTime}
                  </p>
                  <p>
                    <strong>Fecha de fin:</strong>{' '}
                    {format(
                      selectedSchedule.endDate,
                      "EEEE d 'de' MMMM, yyyy",
                      { locale: es }
                    )}
                  </p>
                  <p>
                    <strong>Hora de fin:</strong> {selectedSchedule.endTime}
                  </p>
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
