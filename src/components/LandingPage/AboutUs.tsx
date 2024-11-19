import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <div className='bg-gray-900 text-white p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-cyan-400 text-xl mb-2'>Somos los Mejores</h2>
        <h1 className='text-5xl font-bold mb-6'>Sobre Nosotros</h1>

        <div className='flex flex-col md:flex-row gap-8 items-start'>
          <div className='md:w-1/2 pr-14'>
            <p className='mb-6'>
              Nuestros tours ofrecen una amplia gama de destinos que se adaptan
              a una gran variedad de intereses. Desde playas soleadas con arenas
              doradas y océanos de aguas cristalinas, hasta impresionantes
              paisajes montañosos, lagos tranquilos y frondosos bosques, lo
              tenemos todo cubierto.
            </p>
            <p className='mb-6'>
              ¡No pierdas la oportunidad! Tenemos una oferta tentadora: las
              primeras 50 personas que se inscriban en el tour recibirán un 15%
              de descuento en compras con nuestros socios:
            </p>
            <Link to='/search-tours'>
              <Button
                variant='outline'
                className='text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
              >
                Agendar un Tour
              </Button>
            </Link>
          </div>
          <div className='md:w-1/2 flex justify-end space-x-4'>
            <img
              src='/assets/lima-banner-3.jpg'
              alt='Mountain landscape'
              width={200}
              height={300}
              className='rounded-lg'
            />
            <img
              src='/assets/intihuatana.jpg'
              alt='Starry night over water'
              width={200}
              height={300}
              className='rounded-lg mt-8'
            />
            <img
              src='/assets/intihuatana.jpg'
              alt='Aerial view of ancient ruins'
              width={200}
              height={300}
              className='rounded-lg'
            />
          </div>
        </div>
        <div className='flex justify-between mt-12'>
          <div className='text-center'>
            <h3 className='text-4xl text-cyan-400 font-bold'>10</h3>
            <p>Años de experiencia</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl text-cyan-400 font-bold'>1000</h3>
            <p>Clientes satisfechos</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl text-cyan-400 font-bold'>100</h3>
            <p>Regiones</p>
          </div>
        </div>
      </div>
    </div>
  )
}
