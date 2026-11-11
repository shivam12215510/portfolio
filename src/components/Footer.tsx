import { Mail } from 'lucide-react'
import { navItems, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Magnetic } from './Magnetic'

export function Footer() {
  const year = new Date().getFullYear()
  const social =
    'cursor-btn grid h-10 w-10 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg'

  return (
    <footer className="relative border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-fg">Designed &amp; Built by {profile.name}</p>
          <p className="mt-1 text-xs text-fg-3">© {year} {profile.name}. All rights reserved.</p>
        </div>

        <nav aria-label="Footer" className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="u-link text-[13px] text-fg-2 hover:text-fg">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Magnetic strength={0.2}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={social}>
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={social}>
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href={`mailto:${profile.email}`} aria-label="Email" className={social}>
              <Mail className="h-[18px] w-[18px]" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
