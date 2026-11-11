import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/** Counts a number up once when scrolled into view. Reads prefix/number/suffix from e.g. "₹1 Lakh", "100+", "1,025", "85%". */
export function AnimatedValue({ value }: { value: string }) {
  const match = value.match(/^(\D*?)(\d[\d,]*)(.*)$/)
  const target = match ? Number(match[2].replace(/,/g, '')) : null
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce || target === null ? (target ?? 0) : 0)

  useEffect(() => {
    if (!inView || reduce || target === null) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, target])

  if (!match || target === null) return <span>{value}</span>

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {n.toLocaleString('en-US')}
        {match[3]}
      </span>
    </span>
  )
}
