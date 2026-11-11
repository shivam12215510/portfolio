import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Rocket } from 'lucide-react'
import { about } from '../data/portfolio'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { ScrollText } from './ScrollText'
import { SectionHeading } from './SectionHeading'
import { SpotlightCard } from './SpotlightCard'

const icons = [GraduationCap, Briefcase, Rocket, MapPin]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Subtle depth: the highlight column drifts slightly against the page scroll.
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const parallax = desktop && !reduce
  const [statement, ...rest] = about.paragraphs

  return (
    <section ref={ref} id="about" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Engineer with a founder’s" highlight="sense of ownership." />

        <ScrollText
          text={statement}
          className="max-w-5xl text-[clamp(1.6rem,3.3vw,2.75rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-fg"
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Stagger className="space-y-6 text-lg leading-[1.75] text-fg-2">
              {rest.map((text) => (
                <StaggerItem key={text}>
                  <p>{text}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-12">
              <h3 className="mb-4 text-sm font-semibold tracking-tight text-fg">Education</h3>
              <ul className="space-y-3">
                {about.education.map((e) => (
                  <li key={e.school} className="surface flex items-start gap-4 rounded-2xl p-4">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-text">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 text-sm">
                      <p className="font-medium text-fg">{e.school}</p>
                      <p className="mt-0.5 text-fg-2">{e.degree}</p>
                      <p className="mt-1.5 text-xs text-fg-3">
                        {e.period} · {e.place}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <motion.div style={parallax ? { y: cardsY } : undefined}>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {about.highlights.map((h, i) => {
                const Icon = icons[i]
                return (
                  <StaggerItem key={h.label}>
                    <SpotlightCard className="h-full p-6">
                      <Icon className="relative z-10 mb-6 h-5 w-5 text-accent-text" aria-hidden="true" />
                      <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">{h.label}</p>
                      <p className="relative z-10 mt-2 text-base font-semibold leading-snug text-fg">{h.value}</p>
                      <p className="relative z-10 mt-1.5 text-sm text-fg-2">{h.sub}</p>
                    </SpotlightCard>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
