import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3, BellRing, CalendarCheck, FileSpreadsheet, Inbox, LayoutDashboard, Pill, Shuffle, User, UserCheck, Users, type LucideIcon,
} from 'lucide-react'
import { Bar, MockupFrame, Panel } from './ui'

type Role = 'admin' | 'consultant' | 'client'
const roles: { id: Role; label: string; nav: [string, LucideIcon][] }[] = [
  { id: 'admin', label: 'Admin', nav: [['Overview', LayoutDashboard], ['Leads', Inbox], ['Consultants', Users], ['Clients', UserCheck], ['Supplements', Pill], ['Reports', BarChart3]] },
  { id: 'consultant', label: 'Consultant', nav: [['Dashboard', LayoutDashboard], ['My leads', Inbox], ['Follow-ups', CalendarCheck], ['Clients', UserCheck]] },
  { id: 'client', label: 'Client', nav: [['My plan', Pill], ['Reminders', BellRing], ['Profile', User]] },
]

const ease = [0.22, 1, 0.36, 1] as const

function AdminView() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {['Leads', 'Clients', 'Renewals', 'Reminders'].map((k) => (
          <Panel key={k}>
            <p className="text-[10px] font-medium text-fg-3">{k}</p>
            <Bar className="mt-2.5 h-3 w-14 !bg-fg/20" />
            <svg viewBox="0 0 60 18" className="mt-3 h-4 w-full text-[rgb(var(--pa))]" aria-hidden="true">
              <path d="M0 14 L10 10 L20 12 L30 6 L40 8 L50 3 L60 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Panel>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        <Panel title="Lead distribution" className="md:col-span-3">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-dashed border-line-2 px-3 py-2">
            <FileSpreadsheet className="h-4 w-4 text-[rgb(var(--pa))]" aria-hidden="true" />
            <span className="text-[11px] font-medium text-fg">Google Sheets</span>
            <Shuffle className="ml-auto h-3.5 w-3.5 text-fg-3" aria-hidden="true" />
            <span className="text-[10px] text-fg-3">auto-assign</span>
          </div>
          <ul className="space-y-2">
            {[0, 1, 2].map((i) => (
              <li key={i} className="flex items-center gap-3 rounded-lg bg-fg/[0.04] px-3 py-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[rgb(var(--pa)/0.18)] text-[rgb(var(--pa))]">
                  <User className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="flex-1 space-y-1.5">
                  <Bar className="w-20" />
                  <Bar className="w-12 !h-1.5 !bg-fg/[0.06]" />
                </span>
                <span className="rounded-full bg-[rgb(var(--pa)/0.14)] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--pa))]">Assigned</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Analytics" className="md:col-span-2">
          <svg viewBox="0 0 200 110" className="h-[150px] w-full" role="img" aria-label="Decorative analytics chart">
            <defs>
              <linearGradient id="crm-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgb(var(--pa))" stopOpacity="0.35" />
                <stop offset="1" stopColor="rgb(var(--pa))" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 50, 80].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.08" className="text-fg" />)}
            <path d="M0 88 C25 80 40 60 65 64 S110 40 135 36 S178 18 200 12 L200 110 L0 110Z" fill="url(#crm-area)" />
            <motion.path d="M0 88 C25 80 40 60 65 64 S110 40 135 36 S178 18 200 12" fill="none" stroke="rgb(var(--pa))" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease }} />
          </svg>
        </Panel>
      </div>
    </div>
  )
}

function ConsultantView() {
  const cols = ['New lead', 'In follow-up', 'Active client', 'Renewal due']
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cols.map((c, ci) => (
          <div key={c} className="rounded-xl border border-line bg-fg/[0.02] p-2.5">
            <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-fg-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--pa))]" style={{ opacity: 0.4 + ci * 0.2 }} />
              {c}
            </p>
            <div className="space-y-2">
              {[0, 1].map((i) => (
                <div key={i} className="space-y-2 rounded-lg border border-line bg-card p-2.5">
                  <Bar className="w-3/4" />
                  <Bar className="w-1/2 !h-1.5 !bg-fg/[0.06]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Panel title="Automated reminders">
        <ul className="grid gap-2 sm:grid-cols-3">
          {['Follow-up call', 'Supplement renewal', 'Check-in'].map((r) => (
            <li key={r} className="flex items-center gap-2.5 rounded-lg bg-fg/[0.04] px-3 py-2">
              <BellRing className="h-3.5 w-3.5 text-[rgb(var(--pa))]" aria-hidden="true" />
              <span className="text-[11px] font-medium text-fg">{r}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function ClientView() {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      <Panel title="Supplement plan" className="md:col-span-3">
        <ul className="space-y-3">
          {['w-2/3', 'w-1/2', 'w-4/5'].map((w, i) => (
            <li key={i} className="flex items-center gap-3 rounded-lg bg-fg/[0.04] p-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[rgb(var(--pa)/0.16)] text-[rgb(var(--pa))]">
                <Pill className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 space-y-2">
                <Bar className="w-24" />
                <span className="block h-1.5 overflow-hidden rounded-full bg-fg/[0.08]">
                  <motion.span className={`block h-full rounded-full bg-[rgb(var(--pa))] ${w}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }} transition={{ duration: 1, delay: 0.1 * i, ease }} />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="space-y-3 md:col-span-2">
        <Panel title="Renewal">
          <Bar className="w-20" />
          <span className="mt-4 inline-flex rounded-full bg-[rgb(var(--pa))] px-3.5 py-1.5 text-[11px] font-semibold text-white">Renew plan</span>
        </Panel>
        <Panel title="Reminders">
          <div className="flex items-center gap-2.5">
            <BellRing className="h-3.5 w-3.5 text-[rgb(var(--pa))]" aria-hidden="true" />
            <Bar className="w-24" />
          </div>
        </Panel>
      </div>
    </div>
  )
}

/** Illustrative CRM interface. Switch roles to see how the dashboards differ. */
export function CrmMockup() {
  const [role, setRole] = useState<Role>('admin')
  const current = roles.find((r) => r.id === role)!

  return (
    <MockupFrame title="Healthy Manushya CRM">
      <div className="flex min-h-[430px] md:min-h-[470px]">
        <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-line bg-bg-2 p-3 md:flex" aria-label="Mockup sidebar">
          <p className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold text-fg">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[rgb(var(--pa))] text-[10px] text-white">HM</span>
            CRM
          </p>
          {current.nav.map(([label, Icon], i) => (
            <span key={label} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ${i === 0 ? 'bg-fg/[0.07] font-medium text-fg' : 'text-fg-3'}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold tracking-tight text-fg">{current.label} dashboard</p>
            <div role="tablist" aria-label="Preview dashboard by role" className="relative flex rounded-full border border-line bg-fg/[0.04] p-0.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  role="tab"
                  type="button"
                  aria-selected={role === r.id}
                  onClick={() => setRole(r.id)}
                  className={`relative rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${role === r.id ? 'text-fg' : 'text-fg-3 hover:text-fg'}`}
                >
                  {role === r.id && <motion.span layoutId="crm-role" className="absolute inset-0 rounded-full bg-bg shadow-sm ring-1 ring-line" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="relative">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease }}
            >
              {role === 'admin' ? <AdminView /> : role === 'consultant' ? <ConsultantView /> : <ClientView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MockupFrame>
  )
}
