import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, highlight, description, align = 'left' }: Props) {
  const center = align === 'center'
  return (
    <Reveal blur className={`mb-16 md:mb-24 ${center ? 'mx-auto text-center' : ''} max-w-4xl`}>
      <p className="mb-5 text-[15px] font-semibold tracking-tight text-accent-text">{eyebrow}</p>
      <h2 className="text-balance text-[clamp(2.5rem,6.2vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className={`mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-2 md:text-xl ${center ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </Reveal>
  )
}
