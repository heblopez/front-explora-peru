import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Agencies from './pages/Agencies'
import Register from './pages/Register'
import Login from './pages/Login'
import Tours from './pages/Tours'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agencies' element={<Agencies />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tours' element={<Tours />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
