import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Database, FileSpreadsheet, Monitor, Server } from 'lucide-react'
import { Stagger, StaggerItem } from './Reveal'

function Node({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="surface h-full rounded-2xl p-5">
      <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[rgb(var(--pa)/0.14)] text-[rgb(var(--pa))]">{icon}</span>
      <p className="text-[15px] font-semibold tracking-tight text-fg">{title}</p>
      <p className="mt-1 text-[13px] leading-snug text-fg-2">{sub}</p>
    </div>
  )
}

/** A dot travelling along a connector, to hint at request flow. */
function Connector({ vertical = false }: { vertical?: boolean }) {
  return (
    <div aria-hidden="true" className={`relative grid place-items-center text-fg-3 ${vertical ? 'h-8' : 'w-8'}`}>
      <span className={`absolute bg-line-2 ${vertical ? 'h-full w-px' : 'h-px w-full'}`} />
      <motion.span
        className="absolute h-1.5 w-1.5 rounded-full bg-[rgb(var(--pa))]"
        animate={vertical ? { top: ['0%', '100%'] } : { left: ['0%', '100%'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />
      <ArrowRight className={`relative h-3 w-3 ${vertical ? 'rotate-90' : ''}`} />
    </div>
  )
}

/** Healthcare CRM architecture overview — built only from the stack and features on the resume. */
export function ArchitectureFlow() {
  return (
    <div>
      <p className="mb-6 text-sm font-semibold tracking-tight text-fg">Architecture overview</p>
      <Stagger>
        <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <StaggerItem>
            <Node icon={<Monitor className="h-5 w-5" aria-hidden="true" />} title="React frontend" sub="Responsive PWA with role-based dashboards for Admin, Consultant and Client" />
          </StaggerItem>
          <div className="flex justify-center md:items-center"><div className="md:hidden"><Connector vertical /></div><div className="hidden md:block"><Connector /></div></div>
          <StaggerItem>
            <Node icon={<Server className="h-5 w-5" aria-hidden="true" />} title="FastAPI backend" sub="REST APIs secured with JWT authentication and role-based authorization" />
          </StaggerItem>
          <div className="flex justify-center md:items-center"><div className="md:hidden"><Connector vertical /></div><div className="hidden md:block"><Connector /></div></div>
          <StaggerItem>
            <Node icon={<Database className="h-5 w-5" aria-hidden="true" />} title="PostgreSQL" sub="SQLAlchemy models with optimized queries" />
          </StaggerItem>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <StaggerItem>
            <Node icon={<FileSpreadsheet className="h-5 w-5" aria-hidden="true" />} title="Google Sheets sync" sub="Lead import and updates, then automated lead distribution" />
          </StaggerItem>
          <StaggerItem>
            <Node icon={<Clock className="h-5 w-5" aria-hidden="true" />} title="APScheduler jobs" sub="Reminder scheduling and background processing" />
          </StaggerItem>
        </div>
      </Stagger>
      <p className="mt-5 text-xs text-fg-3">Deployed and maintained on Vercel and Render.</p>
    </div>
  )
}
