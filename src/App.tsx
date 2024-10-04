import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Tours from './pages/Tours'
import Navbar from './components/Navbar'
import AgenciesLanding from './pages/AgenciesLanding'
import Footer from './components/Footer'
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <>
      <BrowserRouter>
        <Navbar isDark={isDarkMode} toggleTheme={toggleDarkMode} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agencies' element={<AgenciesLanding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tours' element={<Tours />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
