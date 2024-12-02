import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users } from 'lucide-react'
import { getMyBookings } from '@/services/bookingService'
import { MyBooking } from '@/types/booking'
import { format } from 'date-fns'

type StatusBooking = 'Próximo' | 'Anterior'

export default function Bookings() {
  const [bookings, setBookings] = useState<
    (MyBooking & { status: StatusBooking })[] | null
  >(null)

  useEffect(() => {
    getMyBookings().then(data => {
      if (!data) return
      const bookingsWithStatus = data.map((booking: MyBooking) => {
        const status: StatusBooking =
          new Date(booking.session.startDate) > new Date() ?
            'Próximo'
          : 'Anterior'
        return { ...booking, status }
      })
      setBookings(bookingsWithStatus)
    })
  }, [])

  const getStatusColor = (status: StatusBooking) => {
    return status === 'Próximo' ?
        'bg-green-100 text-green-800 hover:bg-green-100'
      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
  }

  return (
    <main className='flex-grow container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Mis Reservas</h1>

      {bookings && bookings.length === 0 ?
        <p className='text-center text-gray-500'>No tienes reservas activas.</p>
      : bookings && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {bookings.map(booking => (
              <Card
                key={booking.bookingId}
                className='overflow-hidden transition-shadow duration-300 hover:shadow-lg'
              >
                <div className='relative h-40'>
                  <img
                    src={booking.tour.photosUrl[0]}
                    alt={booking.tour.tourName}
                    className='w-full h-full object-cover'
                  />
                </div>
                <CardHeader>
                  <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className='text-lg font-semibold'>
                        {booking.tour.tourName}
                      </CardTitle>
                      <CardDescription>
                        <div className='flex items-center mt-1'>
                          <Calendar className='h-4 w-4 mr-1 text-gray-500' />
                          <span>
                            {format(
                              new Date(booking.session.startDate),
                              "dd/MM/yyyy - HH:mm 'hs'"
                            )}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex items-center'>
                      <Users className='h-4 w-4 mr-2 text-gray-500' />
                      <span>{booking.numberOfAttendees} persona(s)</span>
                    </div>
                    <div className='flex items-center'>
                      <MapPin className='h-4 w-4 mr-2 text-gray-500' />
                      <span>{booking.tour.regions.join(', ')}</span>
                    </div>
                    <p className='text-lg font-semibold text-primary'>
                      Total: ${booking.totalPrice}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='outline'>Ver Detalles</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{booking.tour.tourName}</DialogTitle>
                        <DialogDescription>
                          Detalles de la reserva
                        </DialogDescription>
                      </DialogHeader>
                      <div className='space-y-2'>
                        <img
                          src={booking.tour.photosUrl[0]}
                          alt={booking.tour.tourName}
                          className='w-full h-40 object-cover rounded-md'
                        />
                        <p>
                          <strong>Fecha de reserva:</strong>{' '}
                          {format(
                            new Date(booking.createdAt),
                            "dd/MM/yyyy 'a las' HH:mm:ss"
                          )}
                        </p>
                        <p>
                          <strong>Fecha de inicio del tour:</strong>{' '}
                          {format(
                            new Date(booking.session.startDate),
                            "dd/MM/yyyy 'a las' HH:mm:ss"
                          )}
                        </p>{' '}
                        <p>
                          <strong>Fecha de fin del tour:</strong>{' '}
                          {format(
                            new Date(booking.session.endDate),
                            "dd/MM/yyyy 'a las' HH:mm:ss"
                          )}
                        </p>
                        <p>
                          <strong>Acceso para:</strong>{' '}
                          {booking.numberOfAttendees} persona(s)
                        </p>
                        <p>
                          <strong>Agencia encargada:</strong>{' '}
                          {`${booking.agency.agencyName} - ${booking.agency.address} - RUC: ${booking.agency.ruc}`}
                        </p>
                        <p>
                          <strong>Precio Total:</strong> ${booking.totalPrice}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )
      }
    </main>
  )
}
