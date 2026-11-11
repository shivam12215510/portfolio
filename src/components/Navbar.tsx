import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { Magnetic } from './Magnetic'
import { ThemeToggle } from './ThemeToggle'

const SECTION_IDS = ['home', ...navItems.map((n) => n.id), 'github', 'highlights']

export function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, close on Esc, focus first link.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    firstLink.current?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-violet-400 to-sky-400"
      />
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`glass mx-auto flex w-full max-w-5xl items-center justify-between gap-1 rounded-full py-1.5 pl-2 pr-1.5 transition-shadow duration-500 md:w-fit md:justify-center md:gap-2 ${
            scrolled || open ? 'shadow-[0_12px_40px_-14px_rgb(0_0_0/0.45)]' : ''
          }`}
        >
          <a href="#home" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label="Shivam Thakur — back to top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-btn font-mono text-[12px] font-semibold text-btn-fg">ST</span>
          </a>

          <ul className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-fg-2 hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-fg/[0.08]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-line-2 md:block" />

          <div className="flex items-center gap-1.5">
            <Magnetic strength={0.25}>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="cursor-btn grid h-9 w-9 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
              >
                <GithubIcon className="h-[17px] w-[17px]" />
              </a>
            </Magnetic>
            <ThemeToggle />
            <ButtonLink magnetic wrapperClassName="ml-0.5 hidden md:inline-block" href="#contact" size="sm" icon={<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}>
              Contact
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg md:hidden"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-1 flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 border-b border-line py-4 text-[2rem] font-semibold tracking-tight ${
                      active === item.id ? 'text-fg' : 'text-fg-2'
                    }`}
                  >
                    <span className="font-mono text-xs text-accent-text">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-3">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-2">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-2">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
              <ButtonLink href={profile.resume} download="Shivam_Thakur_Resume.pdf" icon={<Download className="h-4 w-4" aria-hidden="true" />}>
                Resume
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
