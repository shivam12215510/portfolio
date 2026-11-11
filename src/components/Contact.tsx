import { useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { SpotlightCard } from './SpotlightCard'

/**
 * Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree / Getform URL) in .env to send
 * messages from the form directly. Without it, the form opens the visitor's email app
 * with the message pre-filled — it never pretends to send anything.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

const field =
  'w-full rounded-xl border border-line-2 bg-bg/60 px-4 py-3 text-[15px] text-fg placeholder:text-fg-3 transition focus:border-accent focus:bg-bg focus:outline-none focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-rose-500/70'

const channels = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { icon: LinkedinIcon, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
]

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('company')) return // honeypot

    const data = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      subject: String(fd.get('subject') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    }

    const next: Errors = {}
    if (data.name.length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Please enter a valid email address.'
    if (data.subject.length < 3) next.subject = 'Please add a short subject.'
    if (data.message.length < 10) next.message = 'Tell me a little more (at least 10 characters).'
    setErrors(next)
    if (Object.keys(next).length) return

    if (FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(String(res.status))
        form.reset()
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }

    const body = `${data.message}\n\n— ${data.name} (${data.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`
    setStatus('mailto')
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-32 pt-32 md:pb-44 md:pt-44">
      {/* slow animated aurora behind the final reveal */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift animate-drift-a absolute left-[8%] top-[8%] h-[46vh] w-[46vh] rounded-full blur-[120px]" style={{ background: 'var(--blob-a)' }} />
        <div className="drift animate-drift-b absolute right-[6%] top-[22%] h-[40vh] w-[40vh] rounded-full blur-[120px]" style={{ background: 'var(--blob-c)' }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal blur className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-[15px] font-semibold tracking-tight text-accent-text">Contact</p>
          <h2 className="text-balance text-[clamp(2.7rem,7vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg">
            Have an Idea? <span className="text-gradient">Let’s Build Something Great.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-2 md:text-xl">
            Whether it’s a product, a role, or a collaboration — I’d love to hear what you’re working on.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink magnetic href={`mailto:${profile.email}`} className="!h-14 !px-8 !text-base" icon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}>
              Start a conversation
            </ButtonLink>
            <ButtonLink magnetic variant="secondary" href={profile.github} target="_blank" rel="noopener noreferrer" className="!h-14 !px-7 !text-base" icon={<GithubIcon className="h-4 w-4" />}>
              GitHub profile
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <ul className="space-y-3">
            <Reveal>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface gborder group flex items-center gap-4 rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-0.5"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-btn text-btn-fg"><GithubIcon className="h-7 w-7" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">GitHub</span>
                    <span className="block truncate text-lg font-semibold tracking-tight text-fg">@{profile.githubUser}</span>
                    <span className="block text-sm text-fg-2">Browse my public repositories</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-fg-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
                </a>
              </li>
            </Reveal>
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={0.08 + i * 0.07}>
                <li>
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    className="surface group flex items-center gap-4 rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-0.5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-text">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-fg-3">{c.label}</span>
                      <span className="block truncate text-[15px] text-fg">{c.value}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-fg-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
                  </a>
                </li>
              </Reveal>
            ))}
            <li className="flex items-center gap-2 pl-1 pt-2 text-sm text-fg-3">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Based in {profile.location}
            </li>
          </ul>

          <Reveal delay={0.1}>
            <SpotlightCard className="p-6 sm:p-9">
              <form onSubmit={onSubmit} noValidate className="relative z-10 space-y-5" aria-describedby="form-status">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
                    {errors.name && <p id="err-name" className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
                    {errors.email && <p id="err-email" className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-fg">Subject</label>
                  <input id="subject" name="subject" type="text" placeholder="What’s this about?" className={field} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'err-subject' : undefined} />
                  {errors.subject && <p id="err-subject" className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell me about your idea, role or project…" className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
                  {errors.message && <p id="err-message" className="mt-1.5 text-xs text-rose-600 dark:text-rose-300">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-btn text-[15px] font-medium text-btn-fg shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-12px_rgb(99_102_241/0.65)] disabled:opacity-60 sm:w-auto sm:px-8"
                >
                  {status === 'sending' ? 'Sending…' : FORM_ENDPOINT ? 'Send message' : 'Compose email'}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>

                <div id="form-status" role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
                  {status === 'sent' && (
                    <p className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Message sent — thank you, I’ll get back to you soon.
                    </p>
                  )}
                  {status === 'mailto' && (
                    <p className="text-fg-2">
                      Your email app should open with the message ready to send. If it doesn’t, write to{' '}
                      <a href={`mailto:${profile.email}`} className="u-link text-accent-text">{profile.email}</a>.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-rose-600 dark:text-rose-300">
                      Something went wrong. Please email me directly at{' '}
                      <a href={`mailto:${profile.email}`} className="u-link">{profile.email}</a>.
                    </p>
                  )}
                </div>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
