import AboutUs from '@/components/LandingPage/AboutUs'
import ToursPopulares from '../components/ToursDestacados/ToursDestacados'
import WhyChooseUs from '@/components/LandingPage/WhyChooseUs'
import VisitReasons from '@/components/LandingPage/VisitReasons'
import ReviewsCarousel from '@/components/LandingPage/ReviewsCarousel'

function Home() {
  return (
    <>
      <ToursPopulares />
      <AboutUs />
      <WhyChooseUs />
      <VisitReasons />
      <ReviewsCarousel />
    </>
  )
}

export default Home
