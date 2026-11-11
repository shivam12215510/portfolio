import { BarChart3, Brain, Code2, Database, Layers, Server, Wrench } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { Stagger, StaggerItem } from './Reveal'
import { SpotlightCard } from './SpotlightCard'

const icons = { code: Code2, layers: Layers, server: Server, database: Database, wrench: Wrench, brain: Brain, chart: BarChart3 }

// 6-column bento: 3+3 / 2+2+2 / 3+3
const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Technical skills"
          title="The toolkit behind"
          highlight="production software."
          description="Backend, frontend, data and deployment — the stack I use to take products from idea to live."
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon]
            return (
              <StaggerItem key={group.title} className={`sm:col-span-1 ${spans[i]}`}>
                <SpotlightCard className="group/card h-full p-6 sm:p-7">
                  <div className="relative z-10 mb-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-text transition-transform duration-500 group-hover/card:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-fg">{group.title}</h3>
                    <span className="ml-auto text-xs font-medium text-fg-3">{String(group.items.length).padStart(2, '0')}</span>
                  </div>
                  <ul className="relative z-10 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="cursor-default rounded-xl border border-line bg-bg/60 px-3.5 py-2 text-[13px] font-medium text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-fg hover:shadow-[0_10px_26px_-12px_rgb(99_102_241/0.55)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
