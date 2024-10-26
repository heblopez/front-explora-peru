import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

type SingleSchedule = {
  day: string
  times: Array<{ startTime: string; endTime: string }>
}

type TourScheduleData = {
  isMultiDay: boolean
  schedules: SingleSchedule[]
}

const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

export default function TourScheduler() {
  const [scheduleData, setScheduleData] = useState<TourScheduleData>({
    isMultiDay: false,
    schedules: []
  })

  const handleMultiDayToggle = (checked: boolean) => {
    setScheduleData({ ...scheduleData, isMultiDay: checked, schedules: [] })
  }

  const addSchedule = () => {
    setScheduleData({
      ...scheduleData,
      schedules: [
        ...scheduleData.schedules,
        { day: '', times: [{ startTime: '', endTime: '' }] }
      ]
    })
  }

  const updateSchedule = (
    index: number,
    field: keyof SingleSchedule,
    value: string
  ) => {
    const updatedSchedules = scheduleData.schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    )
    setScheduleData({ ...scheduleData, schedules: updatedSchedules })
  }

  const removeSchedule = (index: number) => {
    const updatedSchedules = scheduleData.schedules.filter(
      (_, i) => i !== index
    )
    setScheduleData({ ...scheduleData, schedules: updatedSchedules })
  }

  const handleDayToggle = (day: string) => {
    const updatedSchedules =
      scheduleData.schedules.some(s => s.day === day) ?
        scheduleData.schedules.filter(s => s.day !== day)
      : [
          ...scheduleData.schedules,
          { day, times: [{ startTime: '', endTime: '' }] }
        ]
    setScheduleData({ ...scheduleData, schedules: updatedSchedules })
  }

  const addTimeSlot = (day: string) => {
    const updatedSchedules = scheduleData.schedules.map(schedule =>
      schedule.day === day ?
        {
          ...schedule,
          times: [...schedule.times, { startTime: '', endTime: '' }]
        }
      : schedule
    )
    setScheduleData({ ...scheduleData, schedules: updatedSchedules })
  }

  const updateTimeSlot = (
    day: string,
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const updatedSchedules = scheduleData.schedules.map(schedule =>
      schedule.day === day ?
        {
          ...schedule,
          times: schedule.times.map((time, i) =>
            i === index ? { ...time, [field]: value } : time
          )
        }
      : schedule
    )
    setScheduleData({ ...scheduleData, schedules: updatedSchedules })
  }

  const removeTimeSlot = (day: string, index: number) => {
    const updatedSchedules = scheduleData.schedules
      .map(schedule =>
        schedule.day === day ?
          { ...schedule, times: schedule.times.filter((_, i) => i !== index) }
        : schedule
      )
      .filter(schedule => schedule.times.length > 0)
    setScheduleData({ ...scheduleData, schedules: updatedSchedules })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedData = {
      ...scheduleData,
      schedules:
        scheduleData.isMultiDay ?
          scheduleData.schedules
        : scheduleData.schedules.flatMap(schedule =>
            schedule.times.map(time => ({
              startDay: schedule.day,
              startTime: time.startTime,
              endDay: schedule.day,
              endTime: time.endTime
            }))
          )
    }
    console.log('Evento programado:', formattedData)
    // Here would be the logic to send the data to the server
  }

  return (
    <Card className='w-full min-w-[16rem] max-w-[20rem]'>
      <CardHeader>
        <CardTitle>Programar Evento</CardTitle>
        <CardDescription>
          Crea un nuevo evento con horarios personalizados
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='p-6'>
          <div className='space-y-4 max-h-[600px] overflow-y-auto pr-2'>
            <div className='flex gap-4 items-center'>
              <Label>¿Es un evento de varios días?</Label>
              <Switch
                id='multi-day'
                checked={scheduleData.isMultiDay}
                onCheckedChange={handleMultiDayToggle}
              />
            </div>
            {scheduleData.isMultiDay ?
              <div className='space-y-4'>
                <Button type='button' onClick={addSchedule}>
                  Agregar Horario
                </Button>
                {scheduleData.schedules.map((schedule, index) => (
                  <Card key={index} className='p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor={`start-day-${index}`}>
                          Día de inicio
                        </Label>
                        <Select
                          value={schedule.day}
                          onValueChange={value =>
                            updateSchedule(index, 'day', value)
                          }
                        >
                          <SelectTrigger id={`start-day-${index}`}>
                            <SelectValue placeholder='Seleccionar día' />
                          </SelectTrigger>
                          <SelectContent>
                            {daysOfWeek.map(day => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {schedule.times.map((time, timeIndex) => (
                        <>
                          <div className='space-y-2'>
                            <Label htmlFor={`start-time-${index}-${timeIndex}`}>
                              Hora de inicio
                            </Label>
                            <Input
                              id={`start-time-${index}-${timeIndex}`}
                              type='time'
                              value={time.startTime}
                              onChange={e =>
                                updateTimeSlot(
                                  schedule.day,
                                  timeIndex,
                                  'startTime',
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor={`end-time-${index}-${timeIndex}`}>
                              Hora de fin
                            </Label>
                            <Input
                              id={`end-time-${index}-${timeIndex}`}
                              type='time'
                              value={time.endTime}
                              onChange={e =>
                                updateTimeSlot(
                                  schedule.day,
                                  timeIndex,
                                  'endTime',
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </>
                      ))}
                      <Button
                        type='button'
                        onClick={() => addTimeSlot(schedule.day)}
                      >
                        Agregar Horario
                      </Button>
                      {schedule.times.length > 1 && (
                        <Button
                          type='button'
                          variant='destructive'
                          onClick={() =>
                            removeTimeSlot(
                              schedule.day,
                              schedule.times.length - 1
                            )
                          }
                        >
                          Eliminar Último Horario
                        </Button>
                      )}
                    </div>
                    <Button
                      type='button'
                      variant='destructive'
                      className='mt-2'
                      onClick={() => removeSchedule(index)}
                    >
                      Eliminar Horario
                    </Button>
                  </Card>
                ))}
              </div>
            : <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Días del evento</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    {daysOfWeek.map(day => (
                      <div key={day} className='flex items-center space-x-2'>
                        <Checkbox
                          id={`day-${day}`}
                          checked={scheduleData.schedules.some(
                            s => s.day === day
                          )}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <Label htmlFor={`day-${day}`}>{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                {scheduleData.schedules.map(schedule => (
                  <Card key={schedule.day} className='p-4'>
                    <CardTitle className='mb-4'>{schedule.day}</CardTitle>
                    {schedule.times.map((time, index) => (
                      <div
                        key={index}
                        className='grid grid-cols-[1fr_1fr_auto] gap-4 mb-2 items-end'
                      >
                        <div className='space-y-2'>
                          <Label
                            htmlFor={`start-time-${schedule.day}-${index}`}
                          >
                            Hora de inicio
                          </Label>
                          <Input
                            id={`start-time-${schedule.day}-${index}`}
                            type='time'
                            value={time.startTime}
                            onChange={e =>
                              updateTimeSlot(
                                schedule.day,
                                index,
                                'startTime',
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor={`end-time-${schedule.day}-${index}`}>
                            Hora de fin
                          </Label>
                          <Input
                            id={`end-time-${schedule.day}-${index}`}
                            type='time'
                            value={time.endTime}
                            onChange={e =>
                              updateTimeSlot(
                                schedule.day,
                                index,
                                'endTime',
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          onClick={() => removeTimeSlot(schedule.day, index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    <div className='mt-4'>
                      <Button
                        type='button'
                        onClick={() => addTimeSlot(schedule.day)}
                      >
                        Agregar Horario
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            }
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit'>Guardar Evento</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
