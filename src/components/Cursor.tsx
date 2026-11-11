import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

/**
 * Premium custom cursor: glowing dot + trailing ring + faint halo.
 *
 * - Zero React re-renders: all state lives in refs / data attributes and is applied in one rAF loop.
 * - Desktop mouse only (hover + fine pointer); touch, pen and prefers-reduced-motion keep the native cursor.
 * - pointer-events: none everywhere; text fields keep the native I-beam so typing and selection stay normal.
 * - Elements opt in with `data-cursor="button|link|view|project|github|hide"` (+ optional `data-cursor-label`).
 */

type State = 'default' | 'link' | 'button' | 'view' | 'project' | 'github' | 'native'

const LABELS: Partial<Record<State, string>> = { view: 'VIEW', project: 'VIEW PROJECT', github: 'GITHUB' }

const INTERACTIVE =
  '[data-cursor], a[href], button, [role="button"], [role="tab"], summary, label, input, textarea, select, .cursor-btn'

/** Frame-rate independent smoothing factor. */
const ease = (base: number, dt: number) => 1 - Math.pow(1 - base, dt / 16.667)

function resolve(target: Element | null): { state: State; el: Element | null; label: string } {
  const el = target?.closest(INTERACTIVE) ?? null
  if (!el) return { state: 'default', el: null, label: '' }

  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    const type = (el as HTMLInputElement).type
    if (tag === 'INPUT' && (type === 'checkbox' || type === 'radio' || type === 'submit' || type === 'button')) {
      return { state: 'button', el, label: '' }
    }
    return { state: 'native', el, label: '' }
  }

  const declared = el.getAttribute('data-cursor') as State | 'hide' | null
  const custom = el.getAttribute('data-cursor-label')
  if (declared === 'hide') return { state: 'native', el, label: '' }
  if (declared) return { state: declared, el, label: custom ?? LABELS[declared] ?? '' }

  if (tag === 'A' && /(^|\/\/)(www\.)?github\.com/i.test((el as HTMLAnchorElement).href)) {
    return { state: 'github', el, label: custom ?? 'GITHUB' }
  }
  if (tag === 'BUTTON' || el.getAttribute('role') === 'button' || el.getAttribute('role') === 'tab' || el.classList.contains('cursor-btn')) {
    return { state: 'button', el, label: custom ?? '' }
  }
  return { state: 'link', el, label: custom ?? '' }
}

export function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce

  const rootRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const pulsePosRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    const halo = haloRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const labelEl = labelRef.current
    const pulsePos = pulsePosRef.current
    const pulse = pulseRef.current
    if (!root || !halo || !ring || !dot || !labelEl || !pulsePos || !pulse) return

    const html = document.documentElement
    // mouse target, dot, ring, halo positions
    const p = { mx: -100, my: -100, dx: -100, dy: -100, rx: -100, ry: -100, hx: -100, hy: -100 }
    let seen = false
    let visible = false
    let state: State = 'default'
    let hovered: Element | null = null
    let raf = 0
    let last = 0
    let scrollTimer = 0

    const setVisible = (v: boolean) => {
      if (v === visible) return
      visible = v
      root.dataset.visible = v ? '1' : '0'
    }

    const apply = (next: { state: State; el: Element | null; label: string }) => {
      hovered = next.el
      if (next.state !== state) {
        state = next.state
        root.dataset.state = state
      }
      if (labelEl.textContent !== next.label) labelEl.textContent = next.label
      // project sections expose their accent colour; use it to tint the label pill
      if (state === 'project' && next.el) {
        const pa = getComputedStyle(next.el).getPropertyValue('--pa').trim()
        if (pa) root.style.setProperty('--cur-accent', `rgb(${pa})`)
        else root.style.removeProperty('--cur-accent')
      }
    }

    const frame = (now: number) => {
      const dt = Math.min(now - last || 16.667, 64)
      last = now

      // the ring is gently pulled toward the centre of a hovered button (magnetic cursor)
      let tx = p.mx
      let ty = p.my
      if (state === 'button' && hovered) {
        const r = hovered.getBoundingClientRect()
        tx += (r.left + r.width / 2 - p.mx) * 0.3
        ty += (r.top + r.height / 2 - p.my) * 0.3
      }

      const kd = ease(0.55, dt)
      const kr = ease(0.17, dt)
      const kh = ease(0.075, dt)
      p.dx += (p.mx - p.dx) * kd
      p.dy += (p.my - p.dy) * kd
      p.rx += (tx - p.rx) * kr
      p.ry += (ty - p.ry) * kr
      p.hx += (p.mx - p.hx) * kh
      p.hy += (p.my - p.hy) * kh

      dot.style.transform = `translate3d(${p.dx}px,${p.dy}px,0)`
      ring.style.transform = `translate3d(${p.rx}px,${p.ry}px,0)`
      halo.style.transform = `translate3d(${p.hx}px,${p.hy}px,0)`

      // halo is only visible while the pointer is travelling, so it reads as a soft trail
      const speed = Math.hypot(p.mx - p.hx, p.my - p.hy)
      halo.style.opacity = String(Math.min(speed / 90, 1) * 0.55)

      const settled =
        Math.abs(p.mx - p.dx) < 0.05 && Math.abs(p.my - p.dy) < 0.05 &&
        Math.abs(tx - p.rx) < 0.05 && Math.abs(ty - p.ry) < 0.05 &&
        speed < 0.5 && !(state === 'button' && hovered)
      if (settled) {
        raf = 0
        halo.style.opacity = '0'
        return
      }
      raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    const snapTo = (x: number, y: number) => {
      p.mx = p.dx = p.rx = p.hx = x
      p.my = p.dy = p.ry = p.hy = y
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        // touch / pen → hand the screen back to the native cursor
        html.classList.remove('cursor-on')
        setVisible(false)
        seen = false
        return
      }
      if (!seen) {
        seen = true
        snapTo(e.clientX, e.clientY)
        html.classList.add('cursor-on')
        apply(resolve(e.target as Element))
      }
      p.mx = e.clientX
      p.my = e.clientY
      setVisible(true)
      kick()
    }

    // Hover state is resolved only when the element under the pointer changes, not on every move.
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      apply(resolve(e.target as Element))
      kick()
    }

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      root.dataset.down = '1'
      pulsePos.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
      pulse.animate(
        [
          { transform: 'translate(-50%,-50%) scale(0.35)', opacity: 0.45 },
          { transform: 'translate(-50%,-50%) scale(1.9)', opacity: 0 },
        ],
        { duration: 560, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
      )
    }
    const onUp = () => {
      root.dataset.down = '0'
    }

    // Leaving the window hides the cursor; coming back shows it again.
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false)
    }
    const onBlur = () => {
      setVisible(false)
      root.dataset.down = '0'
    }

    // While scrolling the pointer stays put, so re-resolve the hovered element once scrolling stops.
    const onScroll = () => {
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        if (!seen || !visible) return
        apply(resolve(document.elementFromPoint(p.mx, p.my)))
        kick()
      }, 120)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseout', onOut)
    window.addEventListener('blur', onBlur)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(scrollTimer)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      html.classList.remove('cursor-on')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={rootRef} aria-hidden="true" data-state="default" data-visible="0" data-down="0" className="cursor-root">
      <div ref={haloRef} className="cursor-halo" />
      <div ref={pulsePosRef} className="cursor-pulse-pos">
        <div ref={pulseRef} className="cursor-pulse" />
      </div>
      <div ref={ringRef} className="cursor-ring">
        <div className="cursor-ring-shape">
          <span ref={labelRef} className="cursor-label" />
        </div>
      </div>
      <div ref={dotRef} className="cursor-dot">
        <div className="cursor-dot-core" />
      </div>
    </div>
  )
}
