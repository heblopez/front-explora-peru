import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

import { es } from 'date-fns/locale'

type ScheduleItem = {
  date: Date
  startTime: string
  endTime: string
}
interface TourSchedulerProps {
  onUpdate: (data: ScheduleItem[]) => void
}
export default function TourScheduler({ onUpdate }: TourSchedulerProps) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [selectedDate, _setSelectedDate] = useState<Date | undefined>(
    new Date()
  )
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
  useEffect(() => {
    if (typeof onUpdate !== 'function') {
      console.log(onUpdate)
      console.error('onUpdate no es una función:', onUpdate)
      return
    }
    onUpdate(schedules)
  }, [schedules, onUpdate])

  const [date, setDate] = useState<Date | undefined>()

  return (
    <>
      <h3 className=' font-bold text-center mb-6'>
        Programar Fechas y Horarios del Tour
      </h3>
      <div className='w-full'>
        <div className='flex flex-col md:flex-row md:items-center gap-6'>
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
          <div className='flex md:flex-col md:gap-8 justify-around content-center md:w-1/3 md:px-24'>
            <div>
              <label htmlFor='start-time'>Hora de inicio</label>
              <Input
                id='start-time'
                type='time'
                value={startTime}
                className='text-primary-border-primary-light flex h-9 w-full rounded-md border border-primary-light bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 justify-center'
                onChange={e => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='end-time'>Hora de fin</label>
              <Input
                id='end-time'
                type='time'
                value={endTime}
                className='text-primary-border-primary-light flex h-9 w-full rounded-md border border-primary-light bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-light dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 justify-center'
                onChange={e => setEndTime(e.target.value)}
              />
            </div>
          </div>{' '}
          <Button onClick={addSchedule} className='md:w-1/3 w-full'>
            Agregar Fecha y Horario
          </Button>
        </div>
        <div>
          <p className='m-2'>Fechas y Horarios Programados:</p>
          <ScrollArea className='h-[100px] rounded-md border p-4 border-primary-light dark:border-primary-light'>
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
