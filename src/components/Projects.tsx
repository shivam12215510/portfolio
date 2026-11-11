import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, BarChart3, BellRing, Check, FileSpreadsheet, LayoutDashboard, RefreshCw, Shuffle, Smartphone, Star, UserCheck } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { projectRepoUrl, useGithubRepos, type Repo } from '../hooks/useGithubRepos'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { ArchitectureFlow } from './ArchitectureFlow'
import { GithubIcon } from './BrandIcons'
import { buttonClasses } from './Button'
import { Magnetic } from './Magnetic'
import { CrmMockup } from './mockups/CrmMockup'
import { HeartMockup, HeartRings, MovieMockup, ScholarlyMockup } from './mockups/OtherMockups'
import { AccentGlow, MetricRow } from './mockups/ui'
import { ProjectModal } from './ProjectModal'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SpotlightCard } from './SpotlightCard'
import { TechBadge } from './TechBadge'

const shortTitle: Record<string, string> = {
  'healthy-manushya-crm': 'Healthy Manushya CRM',
  scholarly: 'Scholarly',
  'movie-recommender': 'Movie Recommender',
  'heart-disease-prediction': 'Heart Disease',
}
const anchorOf = (p: Project) => `project-${p.id}`
const PROJECT_IDS = projects.map(anchorOf)

const accentVars = (p: Project) =>
  ({ '--pa': p.accent, '--pa-soft': p.accentSoft, '--pa-deep': p.accentDeep }) as CSSProperties

/** Scroll-linked entrance for a mockup: it rises, scales up and (on desktop) tilts flat as it arrives. */
function useScrollZoom(from: number, tilt: number) {
  const ref = useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.25, 1])
  const y = useTransform(scrollYProgress, [0, 1], [70, 0])
  const rotateX = useTransform(scrollYProgress, [0, 1], [desktop ? tilt : 0, 0])
  return { ref, style: reduce ? undefined : { scale, opacity, y, rotateX, transformOrigin: '50% 100%' } }
}

/** Large mockup that doubles as a "View project" target for mouse users (keyboard users have the button). */
function ProjectVisual({ onOpen, children }: { onOpen: () => void; children: ReactNode }) {
  return (
    <div
      data-cursor="project"
      className="project-visual"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button, a, [role="tab"]')) return
        onOpen()
      }}
    >
      {children}
    </div>
  )
}

function ProjectActions({ project, repoUrl, onOpen, center = false }: { project: Project; repoUrl: string; onOpen: () => void; center?: boolean }) {
  const arrow = <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <Magnetic>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('primary')}>
            <span className="relative flex items-center gap-2">View Project {arrow}</span>
          </a>
        ) : (
          <button type="button" onClick={onOpen} aria-haspopup="dialog" className={buttonClasses('primary')}>
            <span className="relative flex items-center gap-2">View Project {arrow}</span>
          </button>
        )}
      </Magnetic>
      <Magnetic>
      <a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub (opens in a new tab)`} className={buttonClasses('secondary')}>
        <span className="relative flex items-center gap-2"><GithubIcon className="h-4 w-4" /> GitHub</span>
      </a>
      </Magnetic>
    </div>
  )
}

function StackBadges({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <ul aria-label="Technology stack" className={`flex flex-wrap gap-2 ${className}`}>
      {project.stack.map((s) => (
        <li key={s}><TechBadge accent={project.accent}>{s}</TechBadge></li>
      ))}
    </ul>
  )
}

function ProjectNav({ onJump }: { onJump?: () => void }) {
  const active = useActiveSection(PROJECT_IDS)
  return (
    <nav aria-label="Project navigation" className="sticky top-[4.75rem] z-30 mb-4 flex justify-center">
      <ul className="glass flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full p-1 [scrollbar-width:none]">
        {projects.map((p) => {
          const isActive = active === anchorOf(p)
          return (
            <li key={p.id} className="shrink-0">
              <a
                href={`#${anchorOf(p)}`}
                onClick={onJump}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${isActive ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
              >
                {isActive && <motion.span layoutId="proj-pill" className="absolute inset-0 rounded-full bg-fg/[0.09]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span className="relative text-[11px] text-fg-3">{p.index}</span>
                <span className="relative">{shortTitle[p.id]}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const featureIcons = [LayoutDashboard, Shuffle, FileSpreadsheet, UserCheck, RefreshCw, BellRing, BarChart3, Smartphone]

function FlagshipShowcase({ project, repoUrl, onOpen }: { project: Project; repoUrl: string; onOpen: () => void }) {
  const zoom = useScrollZoom(0.8, 18)
  return (
    <article id={anchorOf(project)} style={accentVars(project)} className="relative pb-24 pt-16 md:pb-36 md:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="mb-7 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--pa)/0.4)] bg-[rgb(var(--pa)/0.1)] px-3 py-1 text-xs font-semibold pa-text">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Flagship project
          </span>
          <span className="text-xs font-medium text-fg-3">{project.index} / 0{projects.length}</span>
        </Reveal>
        <Reveal blur>
          <h3>
            <span className="pa-text mb-4 block text-lg font-semibold tracking-tight md:text-xl">{project.title}</span>
            <span className="block text-balance text-[clamp(2.8rem,7.4vw,6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg">{project.tagline}</span>
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="pa-text mt-6 text-sm font-semibold tracking-tight">{project.category}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-fg-2 md:text-xl">{project.description}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9">
          <ProjectActions project={project} repoUrl={repoUrl} onOpen={onOpen} center />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl md:mt-24" style={{ perspective: 1600 }}>
        <AccentGlow />
        <div ref={zoom.ref}>
          <motion.div style={zoom.style}>
            <ProjectVisual onOpen={onOpen}><CrmMockup /></ProjectVisual>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-28 max-w-5xl">
        <Reveal><p className="mb-6 text-sm font-semibold tracking-tight text-fg">What it does</p></Reveal>
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {project.features.map((f, i) => {
            const Icon = featureIcons[i] ?? Check
            return (
              <StaggerItem key={f}>
                <SpotlightCard radius="rounded-2xl" className="h-full p-5">
                  <span className="relative z-10 mb-5 grid h-10 w-10 place-items-center rounded-xl bg-[rgb(var(--pa)/0.14)] text-[rgb(var(--pa))]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="relative z-10 text-[15px] font-medium leading-snug text-fg">{f}</p>
                </SpotlightCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>

      <Reveal className="mx-auto mt-24 max-w-5xl"><ArchitectureFlow /></Reveal>

      <Reveal className="mx-auto mt-16 max-w-5xl">
        <p className="mb-4 text-sm font-semibold tracking-tight text-fg">Tech stack</p>
        <StackBadges project={project} />
      </Reveal>
    </article>
  )
}

function mockupFor(id: string): ReactNode {
  switch (id) {
    case 'scholarly': return <ScholarlyMockup />
    case 'movie-recommender': return <MovieMockup />
    default: return <HeartMockup />
  }
}

function Showcase({ project, repoUrl, onOpen, flip }: { project: Project; repoUrl: string; onOpen: () => void; flip: boolean }) {
  const zoom = useScrollZoom(0.88, 0)
  return (
    <article id={anchorOf(project)} style={accentVars(project)} className="relative border-t border-line py-24 md:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className={flip ? 'lg:order-2' : ''}>
          <Reveal className="mb-6 text-xs font-medium text-fg-3">{project.index} / 0{projects.length}</Reveal>
          <Reveal blur>
            <h3>
              <span className="pa-text mb-3 block text-base font-semibold tracking-tight">{project.title}</span>
              <span className="block text-balance text-[clamp(2.2rem,4.6vw,3.7rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-fg">{project.tagline}</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="pa-text mt-5 text-sm font-semibold tracking-tight">{project.category}</p>
            <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-fg-2">{project.description}</p>
          </Reveal>
          <Stagger className="mt-7 space-y-3">
            {project.features.map((f) => (
              <StaggerItem key={f} className="flex items-start gap-3 text-[15px] leading-snug text-fg">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--pa))]" aria-hidden="true" />
                {f}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-8"><StackBadges project={project} /></Reveal>
          <Reveal delay={0.15} className="mt-9"><ProjectActions project={project} repoUrl={repoUrl} onOpen={onOpen} /></Reveal>
        </div>

        <div className={`relative ${flip ? 'lg:order-1' : ''}`} style={{ perspective: 1600 }}>
          <AccentGlow />
          <div ref={zoom.ref}>
            <motion.div style={zoom.style}><ProjectVisual onOpen={onOpen}>{mockupFor(project.id)}</ProjectVisual></motion.div>
          </div>
        </div>
      </div>

      {project.id === 'scholarly' && project.metrics && <Reveal><MetricRow metrics={project.metrics} /></Reveal>}
      {project.id === 'heart-disease-prediction' && <Reveal><HeartRings /></Reveal>}
      {project.id === 'movie-recommender' && (
        <Reveal>
          <ol aria-label="How it works" className="mt-10 flex flex-wrap items-center gap-2 text-sm text-fg-2">
            {['Movie metadata', 'TF-IDF / CountVectorizer', 'Cosine similarity', 'Top-N suggestions'].map((step, i, arr) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-card px-3.5 py-1.5 font-medium text-fg">{step}</span>
                {i < arr.length - 1 && <span aria-hidden="true" className="text-fg-3">→</span>}
              </li>
            ))}
          </ol>
        </Reveal>
      )}
    </article>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const { repos } = useGithubRepos()

  const open = (p: Project) => {
    trigger.current = document.activeElement as HTMLElement | null
    setSelected(p)
  }
  const close = useCallback(() => {
    setSelected(null)
    trigger.current?.focus()
  }, [])

  const repoUrl = (p: Project, list: Repo[] = repos) => projectRepoUrl(p, list)
  const [flagship, ...rest] = projects

  return (
    <section id="projects" className="relative overflow-x-clip px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured work"
          title="Products shipped,"
          highlight="problems solved."
          description="From a production healthcare CRM to a funded EdTech startup and applied machine learning — each one built end to end."
        />

        <ProjectNav />
        <FlagshipShowcase project={flagship} repoUrl={repoUrl(flagship)} onOpen={() => open(flagship)} />
        {rest.map((p, i) => (
          <Showcase key={p.id} project={p} repoUrl={repoUrl(p)} onOpen={() => open(p)} flip={i % 2 === 1} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} repoUrl={repoUrl(selected)} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
