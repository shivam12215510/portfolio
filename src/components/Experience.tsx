import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import { experience } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SpotlightCard } from './SpotlightCard'
import { TechBadge } from './TechBadge'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 70%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve been"
          highlight="building."
          description="Production engineering, founding a startup, and machine learning community work — all running in parallel."
        />

        <div ref={ref} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-line-2 md:left-[11px]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-sky-400 via-indigo-500 to-violet-500 md:left-[11px]"
          />

          <ol className="space-y-12 md:space-y-16">
            {experience.map((job, i) => (
              <li key={job.company} className="relative pl-9 md:pl-16">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-accent bg-bg md:left-1 md:h-[23px] md:w-[23px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent md:h-2 md:w-2" />
                  {job.current && <span className="absolute inset-0 animate-ping-slow rounded-full bg-accent/30" />}
                </span>

                <Reveal delay={0.05} y={40}>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold tracking-tight text-accent-text">{job.period}</span>
                    {i === 0 && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        Current
                      </span>
                    )}
                  </div>
                  <SpotlightCard className="p-6 sm:p-9">
                    <div className="relative z-10 flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-3xl">{job.role}</h3>
                        <p className="mt-1 text-base text-accent-text">{job.company}</p>
                      </div>
                      <p className="text-xs text-fg-3">{job.location}</p>
                    </div>
                    <ul className="relative z-10 mt-6 space-y-3">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <ul className="relative z-10 mt-7 flex flex-wrap gap-2" aria-label="Technologies">
                      {job.tags.map((t) => (
                        <li key={t}><TechBadge>{t}</TechBadge></li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
