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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { MapPin, Calendar } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { STRIPE_PUBLIC_KEY } from '@/config'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getTourById } from '@/services/tourService'
import { Tour } from '@/types/tour'
import { fromUnixTime } from 'date-fns'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Session } from '@/types/session'
import { getOrCreateSession } from '@/services/sessionService'
import { registerBooking } from '@/services/bookingService'
import { toast } from 'sonner'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const PaymentForm = ({
  sessionId,
  quantity,
  total
}: {
  sessionId: number
  quantity: number
  total: number
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card) {
      setIsProcessing(true)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: card
      })

      if (error) {
        setPaymentError(error.message || 'Error al procesar el pago')
        console.error(error)
      } else {
        console.log('PaymentMethod created:', paymentMethod)
        const res = await registerBooking({
          sessionId,
          numberOfAttendees: quantity,
          totalPrice: total
        })
        if (!res) return
        toast.success('Reserva registrada con éxito 🎉')
        navigate('/tours')
        card.clear()
      }

      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='text-sm mb-6'>
        Ingresa los datos de tu tarjeta de crédito o débito para pagar la
        reserva de este tour:
      </p>
      <CardElement />
      <Button
        type='submit'
        disabled={!stripe || isProcessing}
        className='w-full mt-4'
        variant='primary'
      >
        {isProcessing ? 'Procesando...' : `Pagar USD ${total.toFixed(2)}`}
      </Button>
      {paymentError && <div className='text-red-500 mt-2'>{paymentError}</div>}
    </form>
  )
}

export default function TourCheckout() {
  const { tourId } = useParams()
  const [searchParams] = useSearchParams()
  const startDate = Number(searchParams.get('sd'))
  const endDate = Number(searchParams.get('ed'))

  const [quantity, setQuantity] = useState(1)
  const [session, setSession] = useState<Session | null>(null)
  const [tour, setTour] = useState<Tour | null>(null)

  const fetchTour = async () => {
    const fetchedTour = await getTourById(tourId as string)
    if (!fetchedTour) return
    setTour(fetchedTour)
  }

  const fetchSession = async () => {
    if (!tourId || !startDate || !endDate) return
    const fetchedSession = await getOrCreateSession({
      tourId: Number(tourId),
      startDate,
      endDate
    })
    if (!fetchedSession) return
    setSession(fetchedSession)
  }

  useEffect(() => {
    fetchTour()
    fetchSession()
  }, [tourId])

  const total = tour?.price ? (tour.price as number) * quantity : 0

  const formatDate = (unixDate: number | null) => {
    if (!unixDate) return 'Fecha no disponible'

    return format(
      fromUnixTime(Number(unixDate)),
      "EEEE d 'de' MMMM, yyyy 'a las' HH:mm",
      { locale: es }
    )
  }

  return (
    <main className='flex-grow container mx-auto px-4 py-16'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Confirmación y Pago de Reserva de Tour
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>{tour?.tourName}</CardTitle>
            <CardDescription>
              <div className='flex items-center'>
                <MapPin className='h-4 w-4 mr-1 text-gray-500' />
                <span>{tour?.regions.join(', ')}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className='-mt-6'>
            <p className='-mt-2 mb-4 text-base'>{tour?.tourDescription}</p>
            <div className='w-full flex flex-col items-start mb-2 text-sm '>
              <div className='flex items-center'>
                <Calendar className='h-4 w-4 mr-2 text-primary' />
                <strong>
                  <em>Fecha de inicio:&nbsp;</em>
                </strong>

                {formatDate(startDate)}
              </div>
              <div className='flex items-center justify-start'>
                <Calendar className='h-4 w-4 mr-2 text-primary' />
                <strong>
                  <em>Fecha de término:&nbsp;</em>{' '}
                </strong>
                {formatDate(endDate)}
              </div>
            </div>
            <p className='text-xl font-bold mt-4'>${tour?.price} por persona</p>
          </CardContent>
          <CardFooter>
            <div className='w-full'>
              <div className='flex items-center gap-3'>
                <label
                  htmlFor='quantity'
                  className='text-sm font-medium w-full'
                >
                  Cantidad de entradas:
                </label>
                <Select
                  value={quantity.toString()}
                  onValueChange={value => setQuantity(parseInt(value))}
                >
                  <SelectTrigger id='quantity' className='w-1/3'>
                    <SelectValue placeholder='Seleccionar cantidad' />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              Resumen del Pedido:
            </CardTitle>
          </CardHeader>
          <CardContent className='-mt-6'>
            <Elements stripe={stripePromise}>
              <div className='flex flex-col items-start w-full mb-3'>
                <div className='w-full flex justify-between mb-2'>
                  <span>{tour?.tourName}</span>
                  <span>$ {tour?.price}</span>
                </div>
                <div className='w-full border-t pt-2 mb-4'>
                  <div className='flex justify-between font-bold'>
                    Total{' '}
                    <em className='font-medium text-sm'>
                      x{quantity} {quantity > 1 ? 'entradas' : 'entrada'}
                    </em>
                    <span>$ {total}</span>
                  </div>
                </div>
              </div>
              <PaymentForm
                sessionId={session?.sessionId ?? 0}
                quantity={quantity}
                total={total}
              />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
