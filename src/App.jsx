import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#020817' }}>
      <ParticleField />
      <div className="grid-bg fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
