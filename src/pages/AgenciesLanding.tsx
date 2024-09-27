import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function AgenciesLanding() {
  return (
    <main className='space-y-16 bg-white'>
      <section className='relative h-[70vh] flex flex-col justify-center items-center text-white text-center'>
        <div className="absolute inset-0 bg-[url('https://pangea.com.pe/wp-content/uploads/2022/02/tours-cusco-peru-waman-adventures-machupicchu-peru.jpg')] bg-cover bg-center"></div>

        <div className='absolute inset-0 bg-black opacity-60'></div>

        <div className='relative z-10 flex flex-col items-center justify-center text-center'>
          <h1 className='text-h1 font-bold font-title mb-4 text-secundary'>
            Únete a ExploraPerú y publica tus tours
          </h1>
          <p className='text-xl text-gray-300 max-w-xl mb-6 text-center'>
            Regístrate como agencia y empieza a mostrar tus tours a miles de
            viajeros en todo el mundo. Aprovecha nuestras herramientas para
            gestionar fácilmente tus reservas y mejorar tu negocio.
          </p>
          <section className='py-2 space-y-4'>
            <Button
              className='w-full bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
              size='lg'
            >
              <Link to='/register'>Regístrate ahora</Link>
            </Button>
          </section>
        </div>
      </section>

      <section className='py-8 bg-secundary '>
        <h2 className='text-h2 font-title text-center mb-12 text-primary'>
          ¿Por qué trabajar con nosotros?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <Card className='bg-white shadow-md'>
            <CardHeader>
              <CardTitle className='text-h4'>+10,000 actividades</CardTitle>
              <CardDescription>
                Sube detalles de todos tus tours y actividades.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-white shadow-md'>
            <CardHeader>
              <CardTitle className='text-h4'>Gestión de reservas</CardTitle>
              <CardDescription>
                Administra fácilmente tus reservas en nuestro sistema.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-white shadow-md'>
            <CardHeader>
              <CardTitle className='text-h4 '>Capacitación continua</CardTitle>
              <CardDescription>
                Recibe formación para mejorar tus habilidades.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-white shadow-md'>
            <CardHeader>
              <CardTitle className='text-h4'>Comunidad activa</CardTitle>
              <CardDescription>
                Únete a una red de profesionales del turismo.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-white shadow-md'>
            <CardHeader>
              <CardTitle className='text-h4'>Soporte 24/7</CardTitle>
              <CardDescription>
                Nuestro equipo de soporte está disponible para ayudarte
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='bg-white shadow-md'>
            <CardHeader>
              <CardTitle className='text-h4'>Pagos seguros</CardTitle>
              <CardDescription>
                Transacciones protegidas y confiables.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className='py-8 bg-white text-white'>
        <h2 className='text-h2 font-title text-center mb-12 text-primary '>
          Nuestro panel de agencias mejorado
        </h2>
        <div className='flex  md:flex-row justify-around'>
          <div className='text-center'>
            <p className='text-h5 text-gray-800'>Eficaz y fácil de usar</p>
            <p className='text-h6 text-gray-800'>
              Controla todas tus operaciones desde un solo lugar.
            </p>
          </div>
          <div className='text-center'>
            <p className='text-h5 text-gray-800'>Reservas instantáneas</p>
            <p className='text-h6 text-gray-800'>
              Confirma tours con un solo clic.
            </p>
          </div>
          <div className='text-center'>
            <p className='text-h5 text-gray-800'>Interfaz amigable</p>
            <p className='text-h6 text-gray-800'>
              Navegación intuitiva para una mejor usabilidad.
            </p>
          </div>
          <div className='text-center'>
            <p className='text-h5 text-gray-800'>Soporte personalizado</p>
            <p className='text-h6 text-gray-800'>
              Asistencia dedicada para resolver tus dudas.
            </p>
          </div>
        </div>
      </section>

      <section className='bg-white py-8'>
        <div className='text-center mb-8'>
          <h2 className='text-h2 font-title text-primary'>
            Lo que dicen nuestros socios
          </h2>
          <p className='text-lg italic text-gray-800'></p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='border rounded-lg p-6 shadow-lg text-center'>
            <img
              src='https://www.rutasdelperu.com/images/logo_rutasdelperu.svg?crc=24125356'
              alt='Socio 1'
              className='w-16 h-16 rounded-full mx-auto mb-4'
            />
            <h3 className='font-bold text-lg text-gray-900'>Rutas del Perú</h3>
            <p className='text-sm text-gray-600 mb-4'>Agencia</p>
            <p className='text-gray-700'>
              "ExploraPerú me ayudó a aumentar mis ventas en un 50%.
              ¡Increíble!"
            </p>
          </div>

          <div className='border rounded-lg p-6 shadow-lg text-center'>
            <img
              src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ_LVf8UnsWrIHzCxPY20GxpTXb1dSCy-wkMoyW7k0muvlzH97M'
              alt='Socio 2'
              className='w-16 h-16 rounded-full mx-auto mb-4'
            />
            <h3 className='font-bold text-lg text-gray-900'>
              Perú Destinos Travel
            </h3>
            <p className='text-sm text-gray-600 mb-4'>Agencia</p>
            <p className='text-gray-700'>
              "Con ExploraPerú, mis tours están siempre llenos. ¡Una herramienta
              indispensable!"
            </p>
          </div>

          <div className='border rounded-lg p-6 shadow-lg text-center'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlEiUMshdMKvdg6Tm5MKkm77Usumd8qIh9cFtED3YjPzNvNzR-'
              alt='Socio 3'
              className='w-16 h-16 rounded-full mx-auto mb-4'
            />
            <h3 className='font-bold text-lg text-gray-900'>Travel Perú</h3>
            <p className='text-sm text-gray-600 mb-4'>Agencia</p>
            <p className='text-gray-700'>
              "Gracias a ExploraPerú, mi negocio ha crecido exponencialmente."
            </p>
          </div>
        </div>
      </section>
      <section className='py-16 flex flex-col items-center bg-gray-800'>
        <h2 className='text-h2 font-title text-center mb-4 text-white'>
          ¡Empieza hoy mismo!
        </h2>
        <section className='py-2 space-y-4'>
          <Button
            className='w-full bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
            size='lg'
          >
            <Link to='/register'>Regístrate ahora</Link>
          </Button>
        </section>
      </section>
    </main>
  )
}
