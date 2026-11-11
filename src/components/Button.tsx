import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Magnetic } from './Magnetic'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  icon?: ReactNode
  size?: 'md' | 'sm'
  magnetic?: boolean
  /** Classes for the magnetic wrapper (e.g. responsive visibility). */
  wrapperClassName?: string
}

const base =
  'cursor-btn group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 active:scale-[0.97]'

const variants: Record<Variant, string> = {
  primary:
    'bg-btn text-btn-fg shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] hover:shadow-[0_16px_44px_-12px_rgb(99_102_241/0.65)]',
  secondary: 'border border-line-2 bg-card text-fg hover:border-fg-3 hover:bg-card-hover',
  ghost: 'text-fg-2 hover:text-fg',
}

const sizes = { md: 'h-12 px-6 text-[15px]', sm: 'h-9 px-4 text-[13px]' }

export const buttonClasses = (variant: Variant = 'primary', size: 'md' | 'sm' = 'md', extra = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`

/** Link styled as a button (every CTA on the site is a real anchor). */
export function ButtonLink({ variant = 'primary', size = 'md', icon, magnetic = false, wrapperClassName, className = '', children, ...rest }: Props) {
  const link = (
    <a {...rest} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative flex items-center gap-2">
        {children}
        {icon}
      </span>
    </a>
  )
  return magnetic ? <Magnetic className={wrapperClassName}>{link}</Magnetic> : link
}
