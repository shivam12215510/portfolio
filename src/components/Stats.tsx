import { stats } from '../data/portfolio'
import { AnimatedValue } from './AnimatedValue'
import { Stagger, StaggerItem } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SpotlightCard } from './SpotlightCard'

export function Stats() {
  return (
    <section id="highlights" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Highlights" title="Impact," highlight="by the numbers." align="center" />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <SpotlightCard className="flex h-full flex-col p-7">
                <p className="relative z-10 min-h-[3.5rem] text-[2.7rem] font-semibold leading-tight tracking-[-0.035em]">
                  {s.value !== null ? (
                    <span className="text-gradient"><AnimatedValue value={`${s.prefix}${s.value}${s.suffix}`} /></span>
                  ) : (
                    <span className="text-gradient whitespace-nowrap text-[1.7rem]">{'text' in s ? s.text : ''}</span>
                  )}
                </p>
                <p className="relative z-10 mt-5 text-[15px] font-medium text-fg">{s.label}</p>
                <p className="relative z-10 mt-1 text-sm text-fg-3">{s.note}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
