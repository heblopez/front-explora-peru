import { useState, useMemo } from 'react'
import { format, addDays, isSameDay, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const daysInNumber = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7
}

type dayOfWeek = keyof typeof daysInNumber

type Schedule = {
  startDay: dayOfWeek
  startTime: string
  endDay: dayOfWeek
  endTime: string
}

type AvailableSchedulesProps = {
  schedulesData: Schedule[]
  onSelectSchedule: (fecha: Date, horario: Schedule) => void
}

interface DatedSchedule extends Schedule {
  startDate: Date
  endDate: Date
}

interface GroupedDatedSchedules {
  date: Date
  schedules: DatedSchedule[]
}

export default function SchedulesViewer({
  schedulesData,
  onSelectSchedule
}: AvailableSchedulesProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  )

  const nextSchedules = useMemo(() => {
    const now = new Date()
    // const nextTwoDays = Array.from({ length: 2 }, (_, i) => addDays(now, i))
    const nextFourDays = [...Array(4)].map((_, i) => addDays(now, i))

    const groupedSchedules = nextFourDays.reduce<GroupedDatedSchedules[]>(
      (acc, date) => {
        const diaSemana = date.getDay() === 0 ? 7 : date.getDay()
        const daySchedules = schedulesData
          .filter(
            schedule =>
              (daysInNumber[schedule.startDay] <= diaSemana &&
                daysInNumber[schedule.endDay] >= diaSemana) ||
              (daysInNumber[schedule.startDay] >
                daysInNumber[schedule.endDay] &&
                (diaSemana >= daysInNumber[schedule.startDay] ||
                  diaSemana <= daysInNumber[schedule.endDay]))
          )
          .map(schedule => {
            const startDate = new Date(date)
            startDate.setHours(
              parseInt(schedule.startTime.split(':')[0]),
              parseInt(schedule.startTime.split(':')[1])
            )
            const endDate = new Date(date)
            endDate.setHours(
              parseInt(schedule.endTime.split(':')[0]),
              parseInt(schedule.endTime.split(':')[1])
            )

            if (
              daysInNumber[schedule.startDay] > daysInNumber[schedule.endDay] &&
              diaSemana < daysInNumber[schedule.startDay]
            ) {
              endDate.setDate(endDate.getDate() + 1)
            }

            return {
              startDate,
              endDate,
              ...schedule
            }
          })
          .filter(schedule => {
            if (isSameDay(schedule.startDate, now)) {
              return isAfter(schedule.startDate, now)
            }
            return true
          })

        if (daySchedules.length > 0) {
          acc.push({
            date: date,
            schedules: daySchedules
          })
        }

        return acc
      },
      []
    )

    return groupedSchedules
  }, [schedulesData])

  const handleSelectHorario = (startDate: Date, schedule: Schedule) => {
    setSelectedDate(startDate)
    setSelectedSchedule(schedule)
    onSelectSchedule(startDate, schedule)
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardContent>
        {nextSchedules.length > 0 ?
          <div className='grid grid-cols-2 gap-x-4 pt-6'>
            {nextSchedules.map((group, index) => (
              <div key={index} className='pb-2'>
                <h3 className='font-semibold mb-2'>
                  {format(group.date, "EEEE d 'de' MMMM", { locale: es })}
                </h3>
                {group.schedules.map((schedule, index) => (
                  <Button
                    key={index}
                    variant={
                      (
                        isSameDay(schedule.startDate, selectedDate as Date) &&
                        schedule === selectedSchedule
                      ) ?
                        'primary'
                      : 'outline'
                    }
                    className='w-full justify-between mb-2 last:mb-0'
                    onClick={() =>
                      handleSelectHorario(schedule.startDate, schedule)
                    }
                  >
                    <span>
                      {format(schedule.startDate, 'HH:mm')} -{' '}
                      {format(schedule.endDate, 'HH:mm')}
                    </span>
                    {!isSameDay(schedule.startDate, schedule.endDate) && (
                      <span className='text-sm opacity-70'>
                        Hasta {format(schedule.endDate, 'EEEE', { locale: es })}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        : <div className='text-center text-gray-500'>
            No hay horarios disponibles en los próximos 3 días.
          </div>
        }
      </CardContent>
    </Card>
  )
}
