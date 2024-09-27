import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Agencies from './pages/Agencies'
import Register from './pages/Register'
import Login from './pages/Login'
import Tours from './pages/Tours'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import AgenciesLanding from './pages/AgenciesLanding'

function App() {
  useEffect(() => {
    const rootDiv = document.getElementById('root')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      rootDiv?.classList.add('dark')
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/AgenciesLanding' element={<AgenciesLanding />} />
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
