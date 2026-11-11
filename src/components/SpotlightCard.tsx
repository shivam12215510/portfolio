import type { CSSProperties, HTMLAttributes, PointerEvent } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  /** "r g b" triple, e.g. "16 185 129" */
  accent?: string
  border?: boolean
  radius?: string
}

/** Surface card with a mouse-follow spotlight and optional animated gradient border. */
export function SpotlightCard({ accent, border = true, radius = 'rounded-3xl', className = '', style, children, ...rest }: Props) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  const merged = (accent ? { '--pa': accent, ...style } : style) as CSSProperties

  return (
    <div
      {...rest}
      onPointerMove={onMove}
      style={merged}
      className={`spotlight ${border ? 'gborder' : ''} surface ${radius} ${className}`}
    >
      {children}
    </div>
  )
}
