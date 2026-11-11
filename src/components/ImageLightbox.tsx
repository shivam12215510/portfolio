import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type Props = { src: string; srcSet?: string; alt: string; onClose: () => void }

/** Minimal accessible image viewer: Esc / backdrop / button to close, focus moved in, scroll locked. */
export function ImageLightbox({ src, srcSet, alt, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        e.preventDefault() // single focusable control — keep focus on it
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-[var(--scrim)] p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes="(min-width: 1024px) 640px, 90vw"
        alt={alt}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-auto max-w-full rounded-3xl object-contain shadow-[var(--shadow-pop)] ring-1 ring-line"
      />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line bg-card text-fg transition-colors hover:border-line-2"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </motion.div>
  )
}
