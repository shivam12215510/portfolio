import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

type Props = {
  children: ReactNode
  /** Fraction of the pointer offset the element follows (0–1). Keep it small. */
  strength?: number
  /** Distance in px around the element where the pull starts. */
  range?: number
  /** Hard cap on movement in px so it always feels restrained. */
  max?: number
  className?: string
}

type Entry = {
  el: HTMLElement
  strength: number
  range: number
  max: number
  x: MotionValue<number>
  y: MotionValue<number>
  visible: boolean
}

/**
 * One shared pointer listener drives every magnetic element (instead of one per element).
 * Work happens in a single rAF per frame and only for elements currently on screen.
 */
const entries = new Set<Entry>()
let px = -9999
let py = -9999
let raf = 0

const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))

function update() {
  raf = 0
  entries.forEach((e) => {
    if (!e.visible) return
    const r = e.el.getBoundingClientRect()
    // measure the un-pulled centre so the element's own movement never feeds back into the maths
    const cx = r.left + r.width / 2 - e.x.get()
    const cy = r.top + r.height / 2 - e.y.get()
    const dx = px - cx
    const dy = py - cy
    const outside = Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2))
    if (outside > e.range) {
      e.x.set(0)
      e.y.set(0)
      return
    }
    const falloff = 1 - outside / e.range
    e.x.set(clamp(dx * e.strength * falloff, e.max))
    e.y.set(clamp(dy * e.strength * falloff, e.max))
  })
}
const schedule = () => {
  if (!raf) raf = requestAnimationFrame(update)
}
const onMove = (ev: PointerEvent) => {
  if (ev.pointerType !== 'mouse') return
  px = ev.clientX
  py = ev.clientY
  schedule()
}
const onLeave = (ev: MouseEvent) => {
  if (ev.relatedTarget) return
  px = py = -9999
  schedule()
}

function register(entry: Entry) {
  if (entries.size === 0) {
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseout', onLeave)
    window.addEventListener('scroll', schedule, { passive: true })
  }
  entries.add(entry)
  return () => {
    entries.delete(entry)
    entry.x.set(0)
    entry.y.set(0)
    if (entries.size === 0) {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseout', onLeave)
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(raf)
      raf = 0
    }
  }
}

/** Pulls its child gently toward the pointer as it approaches. Mouse only, off for reduced motion. */
export function Magnetic({ children, strength = 0.3, range = 56, max = 14, className = 'inline-block' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const enabled = fine && !reduce

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const entry: Entry = { el, strength, range, max, x: sx, y: sy, visible: true }
    const io = new IntersectionObserver(([o]) => {
      entry.visible = o.isIntersecting
      if (!o.isIntersecting) {
        x.set(0)
        y.set(0)
      }
    })
    io.observe(el)
    const unregister = register(entry)
    return () => {
      io.disconnect()
      unregister()
    }
  }, [enabled, strength, range, max, x, y, sx, sy])

  return (
    <motion.div ref={ref} className={className} style={enabled ? { x: sx, y: sy } : undefined}>
      {children}
    </motion.div>
  )
}
