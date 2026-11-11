import { useEffect, useRef, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { GithubIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { TechBadge } from './TechBadge'

type Props = { project: Project; repoUrl: string; onClose: () => void }

/** Accessible case-study dialog: Esc to close, focus trap, scroll lock. */
export function ProjectModal({ project, repoUrl, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const vars = { '--pa': project.accent, '--pa-soft': project.accentSoft, '--pa-deep': project.accentDeep } as CSSProperties

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 backdrop-blur-md sm:items-center sm:p-6"
      style={{ background: 'var(--scrim)' }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={vars}
        className="gborder relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line-2 bg-bg p-6 shadow-[var(--shadow-pop)] sm:rounded-3xl sm:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="pa-text text-sm font-semibold tracking-tight">{project.category}</p>
        <h3 id="project-modal-title" className="mt-3 pr-12 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-fg-2">{project.description}</p>

        <h4 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">The goal</h4>
        <p className="text-[15px] leading-relaxed text-fg">{project.caseStudy.goal}</p>

        <h4 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">What I built</h4>
        <ul className="space-y-3">
          {project.caseStudy.built.map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-fg">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[rgb(var(--pa))]" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <h4 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <TechBadge key={s} accent={project.accent}>{s}</TechBadge>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          {project.liveUrl && (
            <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
              Live project
            </ButtonLink>
          )}
          <ButtonLink href={repoUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<GithubIcon className="h-4 w-4" />}>
            GitHub
          </ButtonLink>
        </div>
      </motion.div>
    </motion.div>
  )
}
