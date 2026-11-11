import type { CSSProperties } from 'react'

export function TechBadge({ children, accent }: { children: string; accent?: string }) {
  return (
    <span
      style={accent ? ({ '--pa': accent } as CSSProperties) : undefined}
      className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium leading-none text-fg-2 transition-all duration-300 hover:-translate-y-px hover:border-[rgb(var(--pa,99_102_241)/0.55)] hover:bg-[rgb(var(--pa,99_102_241)/0.1)] hover:text-fg"
    >
      {children}
    </span>
  )
}
