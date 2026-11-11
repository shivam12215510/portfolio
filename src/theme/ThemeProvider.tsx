import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'
type ThemeContextValue = { theme: Theme; toggle: (origin?: HTMLElement | null) => void }

const STORAGE_KEY = 'theme'
const ThemeContext = createContext<ThemeContextValue | null>(null)

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function paint(next: Theme) {
  const root = document.documentElement
  root.dataset.theme = next
  root.style.colorScheme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#fbfbfd' : '#050506')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The boot script in index.html has already set data-theme before first paint.
  const [theme, setTheme] = useState<Theme>(readTheme)

  // Follow the OS theme live — but only until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* storage unavailable: keep following the system */
      }
      const next: Theme = e.matches ? 'light' : 'dark'
      paint(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback((origin?: HTMLElement | null) => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    const apply = () => {
      paint(next)
      setTheme(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* private mode: theme still applies for this visit */
      }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const start = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition

    if (!start || reduce) {
      root.classList.add('theme-fade')
      apply()
      window.setTimeout(() => root.classList.remove('theme-fade'), 500)
      return
    }

    const rect = origin?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 60
    const y = rect ? rect.top + rect.height / 2 : 40
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = start.call(document, () => flushSync(apply))
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => undefined)
  }, [])

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
