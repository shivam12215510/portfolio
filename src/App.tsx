import { MotionConfig } from 'framer-motion'
import { About } from './components/About'
import { Background } from './components/Background'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { GithubSection } from './components/GithubSection'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { ThemeProvider } from './theme/ThemeProvider'

function Divider() {
  return <div aria-hidden="true" className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-line-2 to-transparent" />
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-btn px-4 py-2 text-sm font-medium text-btn-fg transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <Background />
        <Cursor />
        <Navbar />
        <main id="main">
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <GithubSection />
          <Divider />
          <Experience />
          <Divider />
          <Skills />
          <Divider />
          <Stats />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  )
}
