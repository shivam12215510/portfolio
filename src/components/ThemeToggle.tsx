import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'
import { Magnetic } from './Magnetic'

/** Sun / Moon switch with a morphing icon. Reveals the new theme as a circle from the button. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const ref = useRef<HTMLButtonElement>(null)
  const isDark = theme === 'dark'

  return (
    <Magnetic strength={0.25}>
      <button
        ref={ref}
        type="button"
        onClick={() => toggle(ref.current)}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        className={`relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg ${className}`}
      >
        <motion.span
          aria-hidden="true"
          className="absolute"
          initial={false}
          animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Moon className="h-[17px] w-[17px]" />
        </motion.span>
        <motion.span
          aria-hidden="true"
          className="absolute"
          initial={false}
          animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sun className="h-[17px] w-[17px]" />
        </motion.span>
      </button>
    </Magnetic>
  )
}
