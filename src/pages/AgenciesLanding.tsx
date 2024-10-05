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
    <main className='space-y-8 bg-white dark:bg-gray-800'>
      <section className='relative h-[70vh] flex flex-col justify-center items-center text-white text-center'>
        <div className="absolute inset-0 bg-[url('https://pangea.com.pe/wp-content/uploads/2022/02/tours-cusco-peru-waman-adventures-machupicchu-peru.jpg')] bg-cover bg-center"></div>
        <div className='absolute inset-0 bg-black opacity-60'></div>
        <div className='px-8 relative z-10 flex flex-col items-center justify-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-secondary'>
            Únete a ExploraPerú y publica tus tours
          </h1>
          <p className='text-base md:text-lg lg:text-xl text-gray-300 max-w-xl mb-6'>
            Regístrate como agencia y empieza a mostrar tus tours a miles de
            viajeros en todo el mundo.
          </p>
          <Button
            className='w-full sm:w-auto bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
            size='lg'
          >
            <Link to='/register'>Regístrate ahora</Link>
          </Button>
        </div>
      </section>

      <section className='p-8'>
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <div className='md:w-1/2 flex flex-col text-center md:text-left mb-6 md:mb-0'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
              Podrías ganar <span className='text-blue-600'>$5,614 al mes</span>{' '}
              en Perú
            </h2>
            <p className='text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4'>
              Publicar tu actividad es gratis y sencillo.
            </p>
            <ul className='text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6'>
              <li>
                <span className='font-bold'>Revisión inmediata:</span>{' '}
                aprobación en segundos.
              </li>
              <li>
                <span className='font-bold'>Sin tasas ocultas:</span> solo
                comisiones por reservas.
              </li>
              <li>
                <span className='font-bold'>Asistencia continua:</span> siempre
                a tu disposición.
              </li>
              <li>
                <span className='font-bold'>Alcance internacional:</span>{' '}
                millones de viajeros en todo el mundo.
              </li>
            </ul>
          </div>
          <div className='text-center md:text-left md:ml-12'>
            {['Regístrate', 'Crea tu actividad', 'Empieza a ganar'].map(
              (step, index) => (
                <div className='flex items-center mb-6' key={index}>
                  <div className='bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold'>
                    {index + 1}
                  </div>
                  <div className='ml-4 text-left'>
                    <h2 className='text-lg md:text-2xl font-bold text-gray-900 dark:text-white'>
                      {step}
                    </h2>
                    {step !== 'Empieza a ganar' && (
                      <p className='text-lg text-gray-700 dark:text-gray-300'>
                        {index === 0 ? '2 minutos' : '30 minutos'}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className='px-8'>
        <h2 className='text-2xl md:text-3xl font-title text-center mb-12 text-primary dark:text-primary-light'>
          ¿Por qué trabajar con nosotros?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              title: '+10,000 actividades',
              description: 'Sube detalles de todos tus tours y actividades.'
            },
            {
              title: 'Gestión de reservas',
              description:
                'Administra fácilmente tus reservas en nuestro sistema.'
            },
            {
              title: 'Capacitación continua',
              description: 'Recibe formación para mejorar tus habilidades.'
            },
            {
              title: 'Comunidad activa',
              description: 'Únete a una red de profesionales del turismo.'
            },
            {
              title: 'Soporte 24/7',
              description:
                'Nuestro equipo de soporte está disponible para ayudarte.'
            },
            {
              title: 'Pagos seguros',
              description: 'Transacciones protegidas y confiables.'
            }
          ].map((card, index) => (
            <Card key={index} className='bg-white dark:bg-gray-700 shadow-md'>
              <CardHeader>
                <CardTitle className='text-xl dark:text-white'>
                  {card.title}
                </CardTitle>
                <CardDescription className='dark:text-gray-300'>
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className='pt-16'>
        <h2 className='text-2xl md:text-3xl font-title text-center mb-12 text-primary dark:text-primary-light'>
          Nuestro panel de agencias mejorado
        </h2>
        <div className='flex flex-col md:flex-row justify-around'>
          {[
            {
              title: 'Eficaz y fácil de usar',
              description: 'Controla todas tus operaciones desde un solo lugar.'
            },
            {
              title: 'Reservas instantáneas',
              description: 'Confirma tours con un solo clic.'
            },
            {
              title: 'Interfaz amigable',
              description: 'Navegación intuitiva para una mejor usabilidad.'
            },
            {
              title: 'Soporte personalizado',
              description: 'Asistencia dedicada para resolver tus dudas.'
            }
          ].map((feature, index) => (
            <div className='text-center mb-4 md:mb-0' key={index}>
              <p className='text-xl text-gray-800 dark:text-gray-200 font-bold'>
                {feature.title}
              </p>
              <p className='text-md text-gray-800 dark:text-gray-300'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white dark:bg-gray-800 py-8'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-title text-primary dark:text-primary-light'>
            Lo que dicen nuestros socios
          </h2>
        </div>

        <div className='px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              imgSrc:
                'https://www.rutasdelperu.com/images/logo_rutasdelperu.svg?crc=24125356',
              name: 'Rutas del Perú',
              quote:
                'ExploraPerú me ayudó a aumentar mis ventas en un 50%. ¡Increíble!'
            },
            {
              imgSrc:
                'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ_LVf8UnsWrIHzCxPY20GxpTXb1dSCy-wkMoyW7k0muvlzH97M',
              name: 'Perú Destinos Travel',
              quote:
                'Con ExploraPerú, mis tours están siempre llenos. ¡Una herramienta indispensable!'
            },
            {
              imgSrc:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlEiUMshdMKvdg6Tm5MKkm77Usumd8qIh9cFtED3YjPzNvNzR-',
              name: 'Travel Perú',
              quote:
                'Gracias a ExploraPerú, mi negocio ha crecido exponencialmente.'
            }
          ].map((partner, index) => (
            <div
              className='border rounded-lg p-6 shadow-lg text-center bg-white dark:bg-gray-700'
              key={index}
            >
              <img
                src={partner.imgSrc}
                alt={`Socio ${index + 1}`}
                className='w-16 h-16 rounded-full mx-auto mb-4'
              />
              <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                {partner.name}
              </h3>
              <p className='text-gray-700 dark:text-gray-300'>
                {partner.quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='p-16 flex flex-col items-center bg-gray dark:bg-gray-800'>
        <h2 className='text-3xl md:text-4xl font-title text-center mb-4 text-gray-900 dark:text-white'>
          ¡Empieza hoy mismo!
        </h2>
        <Button
          className='w-full sm:w-auto bg-primary dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter'
          size='lg'
        >
          <Link to='/register'>Regístrate ahora</Link>
        </Button>
      </section>
    </main>
  )
}
