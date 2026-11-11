import { motion } from 'framer-motion'
import { Check, ChevronDown, Film, Play, Sparkles } from 'lucide-react'
import { Bar, MockupFrame, Panel, Ring } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** Illustrative learning-platform interface. */
export function ScholarlyMockup() {
  return (
    <MockupFrame title="Scholarly">
      <div className="grid min-h-[340px] gap-4 p-4 md:grid-cols-[0.8fr_1.6fr] md:p-5">
        <div className="hidden space-y-2 md:block" aria-hidden="true">
          <p className="px-1 pb-1 text-[11px] font-semibold text-fg-2">Course outline</p>
          {[true, true, false, false, false].map((done, i) => (
            <div key={i} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${i === 2 ? 'bg-[rgb(var(--pa)/0.12)]' : 'bg-fg/[0.03]'}`}>
              <span className={`grid h-4 w-4 place-items-center rounded-full ${done ? 'bg-[rgb(var(--pa))] text-white' : 'border border-line-2'}`}>
                {done && <Check className="h-2.5 w-2.5" />}
              </span>
              <Bar className={i === 2 ? 'w-20 !bg-fg/25' : 'w-16'} />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="relative grid aspect-[16/7] place-items-center overflow-hidden rounded-xl border border-line" style={{ background: 'linear-gradient(135deg, rgb(var(--pa)/0.28), rgb(var(--pa)/0.05))' }}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-bg/80 text-fg shadow-lg backdrop-blur"><Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" /></span>
          </div>
          <Panel title="Interactive activity">
            <Bar className="mb-3 w-2/3 !h-2.5 !bg-fg/20" />
            <div className="space-y-2">
              {[false, true, false].map((sel, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${sel ? 'border-[rgb(var(--pa)/0.6)] bg-[rgb(var(--pa)/0.1)]' : 'border-line'}`}>
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${sel ? 'border-[rgb(var(--pa))] bg-[rgb(var(--pa))] text-white' : 'border-line-2'}`}>{sel && <Check className="h-2.5 w-2.5" />}</span>
                  <Bar className="w-1/2" />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </MockupFrame>
  )
}

const posters = ['0.9', '0.7', '0.55', '0.42', '0.3']

/** Illustrative Streamlit-style recommender interface. */
export function MovieMockup() {
  return (
    <MockupFrame title="Movie Recommender System">
      <div className="space-y-5 p-5 md:p-6">
        <div>
          <p className="text-base font-semibold tracking-tight text-fg">Movie Recommender System</p>
          <p className="mt-1 text-xs text-fg-3">Select a movie to get similar titles.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[10rem] flex-1 items-center justify-between rounded-lg border border-line-2 bg-card px-3 py-2.5">
            <Bar className="w-28 !bg-fg/20" />
            <ChevronDown className="h-4 w-4 text-fg-3" aria-hidden="true" />
          </div>
          <span className="rounded-lg bg-[rgb(var(--pa))] px-4 py-2.5 text-xs font-semibold text-white">Recommend</span>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {posters.map((o, i) => (
            <motion.div
              key={o}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease }}
              className="space-y-2"
            >
              <div className="relative grid aspect-[2/3] place-items-center overflow-hidden rounded-lg border border-line" style={{ background: `linear-gradient(160deg, rgb(var(--pa)/${o}), rgb(var(--pa)/0.08))` }}>
                <Film className="h-5 w-5 text-white/80" aria-hidden="true" />
                <span className="absolute left-1.5 top-1.5 rounded-md bg-black/45 px-1.5 py-0.5 text-[10px] font-semibold text-white">#{i + 1}</span>
              </div>
              <Bar className="w-4/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </MockupFrame>
  )
}

/** Illustrative prediction-tool interface (no predicted value is shown). */
export function HeartMockup() {
  const fields = [['Age', 'w-[38%]'], ['Cholesterol', 'w-[58%]'], ['Blood pressure', 'w-[46%]']]
  return (
    <MockupFrame title="Heart Disease Prediction">
      <div className="grid gap-5 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6">
        <div className="space-y-5">
          <p className="text-base font-semibold tracking-tight text-fg">Patient inputs</p>
          {fields.map(([label, w]) => (
            <div key={label}>
              <p className="mb-2 text-[11px] font-medium text-fg-2">{label}</p>
              <div className="relative h-1.5 rounded-full bg-fg/[0.09]">
                <span className={`absolute inset-y-0 left-0 rounded-full bg-[rgb(var(--pa))] ${w}`} />
                <span className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[rgb(var(--pa))] bg-bg shadow ${w === 'w-[38%]' ? 'left-[38%]' : w === 'w-[58%]' ? 'left-[58%]' : 'left-[46%]'}`} />
              </div>
            </div>
          ))}
          <span className="inline-flex rounded-lg bg-[rgb(var(--pa))] px-4 py-2.5 text-xs font-semibold text-white">Predict</span>
        </div>
        <Panel title="Risk assessment" className="grid place-items-center">
          <svg viewBox="0 0 120 70" className="w-44" role="img" aria-label="Decorative risk gauge">
            <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="9" strokeLinecap="round" className="text-fg" />
            <motion.path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="rgb(var(--pa))" strokeWidth="9" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.55 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
          </svg>
          <p className="-mt-2 flex items-center gap-1.5 text-[11px] text-fg-3"><Sparkles className="h-3 w-3" aria-hidden="true" /> Logistic Regression model</p>
        </Panel>
      </div>
    </MockupFrame>
  )
}

export function HeartRings() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
      <Ring pct={85} label="Training accuracy" />
      <Ring pct={80} label="Test accuracy" delay={0.2} />
      <div>
        <p className="text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.03em] text-fg">1,025</p>
        <p className="mt-2 text-[13px] text-fg-2">Patient records</p>
      </div>
    </div>
  )
}
