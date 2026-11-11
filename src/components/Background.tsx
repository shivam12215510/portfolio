import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

/** Fixed page background: faint grid, slowly drifting colour pools, and a soft cursor light. */
export function Background() {
  const fine = useFinePointer()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 80, damping: 26, mass: 0.7 })
  const sy = useSpring(y, { stiffness: 80, damping: 26, mass: 0.7 })

  useEffect(() => {
    if (!fine) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 340)
      y.set(e.clientY - 340)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, x, y])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="drift animate-drift-a absolute -left-[12vw] -top-[18vh] h-[62vh] w-[62vh] rounded-full blur-[110px] will-change-transform md:blur-[140px]" style={{ background: 'var(--blob-a)' }} />
      <div className="drift animate-drift-b absolute -right-[10vw] top-[22vh] h-[56vh] w-[56vh] rounded-full blur-[110px] will-change-transform md:blur-[140px]" style={{ background: 'var(--blob-b)' }} />
      <div className="drift animate-drift-c absolute bottom-[-12vh] left-[28vw] h-[50vh] w-[50vh] rounded-full blur-[110px] will-change-transform md:blur-[140px]" style={{ background: 'var(--blob-c)' }} />
      {fine && (
        <motion.div
          style={{ x: sx, y: sy, background: 'radial-gradient(circle, var(--glow), transparent 62%)' }}
          className="absolute left-0 top-0 h-[680px] w-[680px] rounded-full"
        />
      )}
      <div className="noise absolute inset-0" />
    </div>
  )
}
