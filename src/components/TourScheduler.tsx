'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

import { es } from 'date-fns/locale'
import { format } from 'date-fns'
type ScheduleItem = {
  date: Date
  startTime: string
  endTime: string
}

export default function TourScheduler() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const addSchedule = () => {
    if (selectedDate && startTime && endTime) {
      setSchedules([...schedules, { date: selectedDate, startTime, endTime }])
      setStartTime('')
      setEndTime('')
    }
  }

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index))
  }
  const [date, setDate] = useState<Date | undefined>()
  const formatDate = (date: Date) => {
    return format(date, 'dd MMMMMM yyyy', { locale: es })
  }
  return (
    <>
      <h3 className='font-bold text-center mb-6'>
        Programar Fechas y Horarios del Tour
      </h3>
      <div className='w-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex justify-center'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              initialFocus
              captionLayout='dropdown-buttons'
              disabled={[{ before: new Date() }]}
              locale={es}
            />
          </div>
          <div className='flex justify-around content-center'>
            <div>
              <label htmlFor='start-time'>Hora de inicio</label>
              <Input
                id='start-time'
                type='time'
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='end-time'>Hora de fin</label>
              <Input
                id='end-time'
                type='time'
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
              />
            </div>
          </div>{' '}
          <Button onClick={addSchedule} className='w-full'>
            Agregar Fecha y Horario
          </Button>
        </div>
        <div>
          <p className='m-2'>Fechas y Horarios Programados:</p>
          <ScrollArea className='h-[100px] rounded-md border p-4'>
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className='flex justify-between items-center mb-2'
              >
                <span>
                  {schedule.date.toLocaleDateString()} - {schedule.startTime} a{' '}
                  {schedule.endTime}
                </span>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => removeSchedule(index)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
