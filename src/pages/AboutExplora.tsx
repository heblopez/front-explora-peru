import { Button } from '@/components/ui/button'
import { Map, MessageCircle, CreditCard, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

function AboutExplora() {
  return (
    <main className='container mx-auto p-8'>
      <section className='text-center space-y-6 flex flex-col justify-center items-center mt-5'>
        <h1 className='text-4xl font-bond font-title'>
          La nueva forma de explorar el{' '}
          <span className='text-primary'>Perú</span>
        </h1>
        <p className='text-lg max-w-xl'>
          Explora los tours disponibles en todas las regiones y agenda tus
          favoritos con la confianza de que todas las agencias de viajes están{' '}
          <a href='#' className='font-semibold'>
            certificadas por MINCETUR
          </a>
        </p>
      </section>
      <section className='my-12'>
        <h2 className='text-2xl font-bold text-center text-primary mb-6'>
          Lo que ofrecemos
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <Search className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Búsqueda de tours</h3>
            <p>Encuentra el tour que más se adapte a lo que estás buscando</p>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <CreditCard className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Pagos seguros</h3>
            <p>
              Reserva tours con la tranquilidad de que el pago es seguro y
              confiable
            </p>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <Map className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Mapa de ruta</h3>
            <p>
              Conoce la ruta de tus tours y sus horarios con nuestro mapa
              interactivo
            </p>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-white rounded-full shadow-2xl mx-auto mb-6'>
              <MessageCircle className='text-primary h-10 w-10' />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Chat con agencia</h3>
            <p>
              Comunícate directamente con la agencia de viajes para cualquier
              consulta
            </p>
          </div>
        </div>
      </section>

      <section className='my-12'>
        <h2 className='text-2xl font-bold text-center text-primary mb-6'>
          Conoce nuestro equipo
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 rounded-full shadow-2xl mx-auto mb-6'>
              <img
                src='/public/assets/team/juan.jpeg'
                alt='Juan Alva'
                className='rounded-full h-24 w-24 object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Juan Alva</h3>
            <p>Desarrollador Full Stack</p>
            <a
              target='_blank'
              href='https://github.com/jlac8'
              className='text-primary'
            >
              @jlac8
            </a>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 rounded-full shadow-2xl mx-auto mb-6'>
              <img
                src='/public/assets/team/jaqueline.png'
                alt='Jaqueline Ramos'
                className='rounded-full h-24 w-24 object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Jaqueline Ramos</h3>
            <p>Desarrollador Full Stack</p>
            <a
              target='_blank'
              href='https://github.com/JaquelineRocio'
              className='text-primary'
            >
              @JaquelineRocio
            </a>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 rounded-full shadow-2xl mx-auto mb-6'>
              <img
                src='/public/assets/team/hebert.jpeg'
                alt='Hebert López'
                className='rounded-full h-24 w-24 object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Hebert López</h3>
            <p>Desarrollador Full Stack</p>
            <a
              target='_blank'
              href='https://github.com/heblopez'
              className='text-primary'
            >
              @heblopez
            </a>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 rounded-full shadow-2xl mx-auto mb-6'>
              <img
                src='/public/assets/team/victor.jpeg'
                alt='Victor Ramirez'
                className='rounded-full h-24 w-24 object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Victor Ramirez</h3>
            <p>Desarrollador Full Stack</p>
            <a
              target='_blank'
              href='https://github.com/Victormrl17'
              className='text-primary'
            >
              @Victormrl17
            </a>
          </div>
        </div>

        <h2 className='text-2xl font-bold text-center mt-12 mb-8 text-primary'>
          Y nuestros inversores
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4'>
              <img
                src='/public/assets/investors/mir.jpeg'
                alt='Make It Real'
                className='rounded-full h-24 w-24 object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Make It Real</h3>
            <p>Bootcamp de desarrollo web</p>
            <a
              target='_blank'
              href='https://makeitreal.camp/programa-becas-de-bootcamp-proinnovate-2024'
              className='text-primary'
            >
              Make it real camp
            </a>
          </div>
          <div className='text-center p-6'>
            <div className='flex justify-center items-center h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4'>
              <img
                src='/public/assets/investors/proinnovate.png'
                alt='Proinnovate'
                className='rounded-full h-24 w-24 object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Proinnovate</h3>
            <p>Otorgamiento de Beca </p>
            <a
              target='_blank'
              href='https://inngenius.proinnovate.gob.pe/login'
              className='text-primary'
            >
              Plataforma
            </a>
          </div>
        </div>
      </section>

      <section className='my-12 text-center'>
        <h2 className='text-2xl font-bold mb-6'>
          Esto recién comienza <span className='text-primary'>¿Te Unes?</span>
        </h2>
        <div className='space-y-4 sm:space-y-0 sm:space-x-4'>
          <Button
            className='w-full sm:w-auto bg-primary text-white dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter transition-colors duration-300 ease-in-out'
            size='lg'
          >
            <Link to='/register' className='block px-6 py-3'>
              Registro de Viajero
            </Link>
          </Button>
          <Button
            className='w-full sm:w-auto bg-primary text-white dark:bg-primary-light hover:bg-primary-dark hover:dark:bg-primary-lighter transition-colors duration-300 ease-in-out'
            size='lg'
          >
            <Link to='/register' className='block px-6 py-3'>
              Registra tu Agencia
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default AboutExplora
