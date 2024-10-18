import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Tours from './pages/Tours'
import Navbar from './components/Header/Navbar'
import AgenciesLanding from './pages/AgenciesLanding'
import Footer from './components/Footer/Footer'
import { RegisterTours } from './pages/RegisterTours'
import { useDarkMode } from './hooks/useDarkMode'
import EditProfile from './pages/EditProfile'
import { Toaster } from 'sonner'
import UserProvider from './context/UserContext'
import SearchTours from './pages/SearchTours'
import AboutExplora from './pages/AboutExplora'
import AdminTours from './pages/AdminTours'
import TourDetailPage from './pages/TourDetailsPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar isDark={isDarkMode} toggleTheme={toggleDarkMode} />
        <Toaster
          position='top-right'
          closeButton
          richColors
          theme={isDarkMode ? 'dark' : 'light'}
          visibleToasts={4}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agencies' element={<AgenciesLanding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tours' element={<Tours />} />
          <Route path='/register-tours' element={<RegisterTours />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/search-tours' element={<SearchTours />} />
          <Route path='/about-us' element={<AboutExplora />} />
          <Route
            path='/terms-and-conditions'
            element={<TermsAndConditions />}
          />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/admin-tours' element={<AdminTours />} />
          <Route path='/tours/:id' element={<TourDetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
