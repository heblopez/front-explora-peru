import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <Link to='/'>
        <img src='./src/assets/react.svg' alt='Logo' />
      </Link>
      <nav>
        <ul>
          <button>ES</button>
          <button>Soles</button>
          <Link to='/agencies'>Agencias</Link>
          <Link to='/login'>Iniciar Sesión</Link>
          <Link to='/register'>Registrarse</Link>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
