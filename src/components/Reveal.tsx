import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number; blur?: boolean }

/** Scroll-triggered fade + rise (with optional soft blur). Runs once per element. */
export function Reveal({ delay = 0, y = 32, blur = false, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(12px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

/** Container that staggers its <StaggerItem> children as it scrolls into view. */
export function Stagger({ children, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} {...rest}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  )
}
