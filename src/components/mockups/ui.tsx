import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AnimatedValue } from '../AnimatedValue'

const ease = [0.22, 1, 0.36, 1] as const

/** Browser-window chrome used for every illustrative mockup. */
export function MockupFrame({ title, children, caption = true }: { title: string; children: ReactNode; caption?: boolean }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-line-2 bg-bg shadow-[var(--shadow-pop)]">
        <div className="flex items-center gap-3 border-b border-line bg-bg-2 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          </div>
          <div className="mx-auto max-w-[16rem] flex-1 truncate rounded-md bg-fg/[0.06] px-3 py-1 text-center text-[11px] text-fg-3">{title}</div>
          <span className="w-[42px]" aria-hidden="true" />
        </div>
        {children}
      </div>
      {caption && <figcaption className="mt-4 text-center text-xs text-fg-3">Illustrative interface mockup — not an actual screenshot.</figcaption>}
    </figure>
  )
}

/** Skeleton line used to suggest content without inventing any. */
export function Bar({ className = 'w-16' }: { className?: string }) {
  return <span aria-hidden="true" className={`block h-2 rounded-full bg-fg/[0.09] ${className}`} />
}

export function Panel({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-line bg-card p-3.5 ${className}`}>
      {title && <p className="mb-3 text-[11px] font-semibold tracking-tight text-fg-2">{title}</p>}
      {children}
    </div>
  )
}

/** Glow tinted with the project accent, sits behind a mockup. */
export function AccentGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-4 -inset-y-12 md:-inset-x-10 -z-10 opacity-70 blur-3xl"
      style={{ background: 'radial-gradient(55% 50% at 50% 50%, rgb(var(--pa) / 0.28), transparent 70%)' }}
    />
  )
}

export function Ring({ pct, label, delay = 0 }: { pct: number; label: string; delay?: number }) {
  const r = 30
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[92px] w-[92px]">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" role="img" aria-label={`${pct}% ${label}`}>
          <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="6" className="text-fg" />
          <motion.circle
            cx="40" cy="40" r={r} fill="none" stroke="rgb(var(--pa))" strokeWidth="6" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: pct / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay, ease }}
          />
        </svg>
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center text-xl font-semibold tracking-tight text-fg">
          {pct}%
        </span>
      </div>
      <p className="text-xs text-fg-2">{label}</p>
    </div>
  )
}

/** Big animated numbers — only ever fed values taken from the resume. */
export function MetricRow({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((m) => (
        <div key={m.label}>
          <dd className="order-1 text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] text-fg">
            <AnimatedValue value={m.value} />
          </dd>
          <dt className="mt-2 text-[13px] leading-snug text-fg-2">{m.label}</dt>
        </div>
      ))}
    </dl>
  )
}
