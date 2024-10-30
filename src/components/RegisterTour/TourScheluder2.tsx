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
import { TrashIcon } from 'lucide-react'

type TimeSlot = {
  startTime: string
  endTime: string
}

type DaySchedule = {
  day: string
  timeSlots: TimeSlot[]
}

type SingleSchedule = {
  startDay: string
  startTime: string
  endDay: string
  endTime: string
}

type TourSchedulerData = {
  isMultiDay: boolean
  multidaySchedules: SingleSchedule[]
  oneDaySchedules: DaySchedule[]
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

export default function TourScheduler({ tourId = 1 }: { tourId?: number }) {
  const [schedulerData, setSchedulerData] = useState<TourSchedulerData>({
    isMultiDay: false,
    multidaySchedules: [],
    oneDaySchedules: []
  })

  const handleMultiDayToggle = (checked: boolean) => {
    setSchedulerData({ ...schedulerData, isMultiDay: checked })
  }

  const addSchedule = () => {
    setSchedulerData({
      ...schedulerData,
      multidaySchedules: [
        ...schedulerData.multidaySchedules,
        { startDay: '', startTime: '', endDay: '', endTime: '' }
      ]
    })
  }

  const updateSchedule = (
    index: number,
    field: keyof SingleSchedule,
    value: string
  ) => {
    const updatedSchedules = schedulerData.multidaySchedules.map(
      (schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
    )
    setSchedulerData({ ...schedulerData, multidaySchedules: updatedSchedules })
  }

  const removeSchedule = (index: number) => {
    const updatedSchedules = schedulerData.multidaySchedules.filter(
      (_, i) => i !== index
    )
    setSchedulerData({ ...schedulerData, multidaySchedules: updatedSchedules })
  }

  const handleDayToggle = (day: string) => {
    const updatedDaySchedules =
      schedulerData.oneDaySchedules.some(s => s.day === day) ?
        schedulerData.oneDaySchedules.filter(s => s.day !== day)
      : [
          ...schedulerData.oneDaySchedules,
          {
            day,
            timeSlots: [{ startTime: '', endTime: '' }]
          }
        ]
    setSchedulerData({ ...schedulerData, oneDaySchedules: updatedDaySchedules })
  }

  const addTimeSlot = (day: string) => {
    const updatedDaySchedules = schedulerData.oneDaySchedules.map(schedule =>
      schedule.day === day ?
        {
          ...schedule,
          timeSlots: [...schedule.timeSlots, { startTime: '', endTime: '' }]
        }
      : schedule
    )
    setSchedulerData({ ...schedulerData, oneDaySchedules: updatedDaySchedules })
  }

  const updateTimeSlot = (
    day: string,
    index: number,
    field: keyof TimeSlot,
    value: string
  ) => {
    const updatedDaySchedules = schedulerData.oneDaySchedules.map(schedule =>
      schedule.day === day ?
        {
          ...schedule,
          timeSlots: schedule.timeSlots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
          )
        }
      : schedule
    )
    setSchedulerData({ ...schedulerData, oneDaySchedules: updatedDaySchedules })
  }

  const removeTimeSlot = (day: string, index: number) => {
    const updatedDaySchedules = schedulerData.oneDaySchedules
      .map(schedule =>
        schedule.day === day ?
          {
            ...schedule,
            timeSlots: schedule.timeSlots.filter((_, i) => i !== index)
          }
        : schedule
      )
      .filter(schedule => schedule.timeSlots.length > 0)

    setSchedulerData({ ...schedulerData, oneDaySchedules: updatedDaySchedules })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedData = {
      ...schedulerData,
      schedules: schedulerData.multidaySchedules
    }
    console.log('Evento programado:', formattedData)
    // Here would be the logic to send the data to the server
  }

  return (
    <Card
      key={`scheduler-tour-${tourId}`}
      className='flex flex-col w-max min-w-[18rem] max-w-[22rem]'
    >
      <CardHeader className='p-4'>
        <CardTitle>Programar Horarios del Tour</CardTitle>
        <CardDescription>
          Agrega horarios personalizados al tour
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='p-4'>
          <div className='space-y-4 max-h-[600px] overflow-y-auto scrollbar-hidden'>
            <div className='flex gap-4 items-center'>
              <Label>¿Es un tour que toma más de un día?</Label>
              <Switch
                id='multi-day'
                checked={schedulerData.isMultiDay}
                onCheckedChange={handleMultiDayToggle}
              />
            </div>
            {schedulerData.isMultiDay ?
              <div className='space-y-4'>
                {schedulerData.multidaySchedules.map((schedule, index) => (
                  <Card key={index} className='p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor={`start-day-${index}`}>
                          Día de inicio
                        </Label>
                        <Select
                          value={schedule.startDay}
                          onValueChange={value =>
                            updateSchedule(index, 'startDay', value)
                          }
                        >
                          <SelectTrigger id={`start-day-${index}`}>
                            <SelectValue placeholder='Seleccionar' />
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
                      <div className='space-y-2'>
                        <Label htmlFor={`end-day-${index}`}>Día de fin</Label>
                        <Select
                          value={schedule.endDay}
                          onValueChange={value =>
                            updateSchedule(index, 'endDay', value)
                          }
                        >
                          <SelectTrigger id={`end-day-${index}`}>
                            <SelectValue placeholder='Seleccionar' />
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
                      <div className='space-y-2'>
                        <Label htmlFor={`start-time-${index}`}>
                          Hora de inicio
                        </Label>
                        <Input
                          id={`start-time-${index}`}
                          type='time'
                          value={schedule.startTime}
                          onChange={e =>
                            updateSchedule(index, 'startTime', e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor={`end-time-${index}`}>Hora de fin</Label>
                        <Input
                          id={`end-time-${index}`}
                          type='time'
                          value={schedule.endTime}
                          onChange={e =>
                            updateSchedule(index, 'endTime', e.target.value)
                          }
                          required
                        />
                      </div>
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
                <Button type='button' onClick={addSchedule}>
                  Agregar Horario
                </Button>
              </div>
            : <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Días del tour</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    {daysOfWeek.map(day => (
                      <div key={day} className='flex items-center space-x-2'>
                        <Checkbox
                          id={`day-${day}`}
                          checked={schedulerData.oneDaySchedules.some(
                            s => s.day === day
                          )}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <Label htmlFor={`day-${day}`}>{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                {schedulerData.oneDaySchedules.map((schedule, index) => (
                  <Card key={`${schedule.day}-${index}`} className='p-4'>
                    <CardTitle className='mb-4'>{schedule.day}</CardTitle>
                    {schedule.timeSlots.map((slot, index) => (
                      <div
                        key={`${schedule.day}-slot-${index}`}
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
                            value={slot.startTime}
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
                            value={slot.endTime}
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
                          size='sm'
                          onClick={() => removeTimeSlot(schedule.day, index)}
                        >
                          <TrashIcon className='w-4 h-4' />
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
        <CardFooter className='p-4 justify-end'>
          <Button type='submit'>Guardar Horarios</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
