import Hero from '../../Components/Hero/Hero'
import Features from '../../Components/Features/Features'
import Pricing from '../../Components/Pricing/Pricing'
import About from '../../Components/About/About'
import Contact from '../../Components/Contact/Contact'

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <Features />
      <Pricing />
      <About />
      <Contact />
    </div>
  )
}

export default Home
