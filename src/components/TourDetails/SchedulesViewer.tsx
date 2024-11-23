import { useState, useMemo } from 'react'
import { format, isSameDay, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DatedSchedule, Schedule } from '@/types/tour'

const daysInNumber = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7
}

type AvailableSchedulesProps = {
  schedulesData: Schedule[]
  onSelectSchedule: (fecha: Date, horario: DatedSchedule) => void
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

  const calculateNextOccurrence = (
    dayOfWeek: number,
    startingDate: Date
  ): Date => {
    const result = new Date(startingDate)
    const currentDay = startingDate.getDay() || 7
    const daysUntilNextOccurrence =
      dayOfWeek >= currentDay ?
        dayOfWeek - currentDay
      : 7 - (currentDay - dayOfWeek)
    result.setDate(result.getDate() + daysUntilNextOccurrence)
    return result
  }

  const nextSchedules = useMemo(() => {
    const now = new Date()

    const groupedSchedules = schedulesData
      .map(schedule => {
        const startDayNumber = daysInNumber[schedule.startDay]
        const endDayNumber = daysInNumber[schedule.endDay]

        const nextStartDate = calculateNextOccurrence(startDayNumber, now)
        nextStartDate.setHours(
          parseInt(schedule.startTime.split(':')[0], 10),
          parseInt(schedule.startTime.split(':')[1], 10)
        )

        const nextEndDate = new Date(nextStartDate)
        nextEndDate.setDate(
          nextEndDate.getDate() + ((endDayNumber + 7 - startDayNumber) % 7)
        )
        nextEndDate.setHours(
          parseInt(schedule.endTime.split(':')[0], 10),
          parseInt(schedule.endTime.split(':')[1], 10)
        )

        return {
          startDate: nextStartDate,
          endDate: nextEndDate,
          ...schedule
        }
      })
      .filter(schedule => {
        if (isSameDay(schedule.startDate, now)) {
          return isAfter(schedule.startDate, now)
        }
        return true
      })
      .reduce<GroupedDatedSchedules[]>((acc, schedule) => {
        const existingGroup = acc.find(group =>
          isSameDay(group.date, schedule.startDate)
        )

        if (existingGroup) {
          existingGroup.schedules.push(schedule)
        } else {
          const groupDate = new Date(schedule.startDate)
          groupDate.setHours(0, 0, 0, 0)

          acc.push({
            date: groupDate,
            schedules: [schedule]
          })
        }

        return acc
      }, [])

    groupedSchedules.sort((a, b) => a.date.getTime() - b.date.getTime())
    groupedSchedules.forEach(group => {
      group.schedules.sort((a, b) => {
        const startTimeA = a.startDate.getTime()
        const startTimeB = b.startDate.getTime()
        return startTimeA - startTimeB
      })
    })
    console.log('groupedSchedules: ', groupedSchedules)

    return groupedSchedules
  }, [schedulesData])

  const handleSelectHorario = (startDate: Date, schedule: DatedSchedule) => {
    setSelectedDate(startDate)
    setSelectedSchedule(schedule)
    onSelectSchedule(startDate, schedule)
  }

  return (
    <Card className='w-full mx-auto'>
      <CardContent>
        {nextSchedules.length > 0 ?
          <div className='grid grid-cols-[repeat(auto-fit,minmax(224px,1fr))] gap-x-4'>
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
                      <span className='text-sm opacity-70 px-1 truncate'>
                        Hasta el{' '}
                        {format(schedule.endDate, 'EEEE', { locale: es })}
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
