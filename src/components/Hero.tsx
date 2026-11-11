import { useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Download, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useFinePointer, useIsDesktop } from '../hooks/useMediaQuery'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { ImageLightbox } from './ImageLightbox'
import { Magnetic } from './Magnetic'

const ease = [0.22, 1, 0.36, 1] as const
const headingWords = ['Building', 'Digital', 'Products', 'That', 'Solve']
const accentWords = ['Real', 'Problems.']

function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease }}
      className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-xs font-medium text-fg"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-500/70" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Available for Opportunities
    </motion.div>
  )
}

/** Real photograph, framed with soft lighting. Pure crop + overlay — the face is never altered. */
function Portrait() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 20 })
  const sry = useSpring(ry, { stiffness: 120, damping: 20 })
  const tilt = fine && !reduce
  const { photo } = profile
  const [zoomed, setZoomed] = useState(false)
  const opener = useRef<HTMLButtonElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!tilt) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 36 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.5, ease }}
      className="portrait-hover relative mx-auto w-full max-w-[340px] lg:ml-auto lg:mr-0 lg:max-w-[420px]"
      style={{ perspective: 1200 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* soft key light behind the frame */}
      <div aria-hidden="true" className="absolute -inset-10 rounded-[3.5rem] opacity-80 blur-3xl" style={{ background: 'radial-gradient(60% 55% at 50% 40%, var(--blob-a), transparent 70%)' }} />

      <motion.div style={tilt ? { rotateX: srx, rotateY: sry } : undefined} className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e7e2d7] shadow-[var(--shadow-pop)] ring-1 ring-line">
          <div className="portrait-zoom h-full w-full">
            <motion.img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes={photo.sizes}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              decoding="async"
              fetchPriority="high"
              initial={{ scale: 1.16 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, delay: 0.45, ease }}
              className="h-full w-full object-cover object-[50%_22%]"
            />
          </div>
          {/* lighting: gentle highlight top-left, grounding shade at the bottom */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_15%_0%,rgb(255_255_255/0.22),transparent_60%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-lg font-semibold tracking-tight text-white">{profile.name}</p>
            <p className="mt-0.5 text-sm text-white/75">Full Stack Software Engineer</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </p>
          </div>
          <button
            ref={opener}
            type="button"
            data-cursor="view"
            onClick={() => setZoomed(true)}
            aria-label="View larger photo"
            aria-haspopup="dialog"
            className="absolute inset-0 z-10 rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.5, ease }}
        className="absolute -right-3 top-10 hidden sm:block lg:-right-10"
      >
        <div className="glass animate-float rounded-2xl px-4 py-3 shadow-xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">In production</p>
          <p className="mt-1 text-sm font-medium text-fg">Healthcare CRM</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.7, ease }}
        className="absolute -left-3 bottom-40 hidden sm:block lg:-left-12"
      >
        <div className="glass animate-float rounded-2xl px-4 py-3 shadow-xl [animation-delay:-3s]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-300">Founder</p>
          <p className="mt-1 text-sm font-medium text-fg">Scholarly · ₹1L funded</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {zoomed && (
          <ImageLightbox
            src={photo.src}
            srcSet={photo.srcSet}
            alt={photo.alt}
            onClose={() => {
              setZoomed(false)
              opener.current?.focus()
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const parallax = desktop && !reduce

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 lg:pt-28">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <motion.div style={parallax ? { y: textY, opacity: textOpacity } : undefined}>
          <AvailabilityBadge />

          <h1 className="text-balance text-[clamp(2.7rem,5.6vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg">
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.35 + i * 0.08, ease }}
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            {accentWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.35 + (headingWords.length + i) * 0.08, ease }}
                className="text-gradient mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg-2 md:text-xl"
          >
            I’m <span className="font-medium text-fg">{profile.name}</span>, a Full Stack Software Engineer and Startup Founder passionate about
            building scalable SaaS products, intelligent applications, and impactful digital experiences.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm font-medium text-fg"
            aria-label="Roles"
          >
            {profile.roles.map((role, i) => (
              <li key={role} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-fg-3" />}
                {role}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink magnetic href="#projects" icon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}>
              View My Work
            </ButtonLink>
            <ButtonLink magnetic href={profile.resume} download="Shivam_Thakur_Resume.pdf" variant="secondary" icon={<Download className="h-4 w-4" aria-hidden="true" />}>
              Download Resume
            </ButtonLink>
            <ButtonLink
              magnetic
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<GithubIcon className="h-4 w-4" />}
              aria-label="GitHub profile (opens in a new tab)"
            >
              GitHub
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.4 }}
            className="mt-8 flex flex-wrap items-center gap-3 text-fg-2"
          >
            <Magnetic strength={0.2}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className="cursor-btn grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-line-2 hover:text-fg">
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </Magnetic>
            <a href={`mailto:${profile.email}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-line-2 hover:text-fg">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <a href="#contact" className="u-link group inline-flex items-center gap-1.5 px-2 text-sm font-medium text-fg">
              Let’s Connect <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={parallax ? { y: photoY, scale: photoScale } : undefined}>
          <Portrait />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-[0.25em] text-fg-3 transition-colors hover:text-fg md:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-float" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
