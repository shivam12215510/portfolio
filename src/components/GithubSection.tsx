import { ArrowUpRight, BookMarked, Star } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useGithubRepos, type Repo } from '../hooks/useGithubRepos'
import { GithubIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { Reveal, Stagger, StaggerItem } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SpotlightCard } from './SpotlightCard'

// GitHub's own language colours.
const langColor: Record<string, string> = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', 'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', SQL: '#e38c00', Shell: '#89e051',
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`${repo.name} on GitHub (opens in a new tab)`} className="group block h-full rounded-3xl">
      <SpotlightCard className="flex h-full flex-col p-6 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2.5">
            <BookMarked className="h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
            <span className="truncate text-[15px] font-semibold tracking-tight text-fg">{repo.name}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
        </div>
        <p className="relative z-10 mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-fg-2">{repo.description ?? 'No description provided.'}</p>
        <div className="relative z-10 mt-6 flex items-center gap-5 text-xs text-fg-2">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[repo.language] ?? 'var(--fg-3)' }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            <span aria-label={`${repo.stargazers_count} stars`}>{repo.stargazers_count}</span>
          </span>
        </div>
      </SpotlightCard>
    </a>
  )
}

function Skeleton() {
  return (
    <div aria-hidden="true" className="surface h-[168px] animate-pulse rounded-3xl p-6">
      <div className="h-3 w-1/3 rounded-full bg-fg/10" />
      <div className="mt-5 h-2.5 w-4/5 rounded-full bg-fg/[0.07]" />
      <div className="mt-2.5 h-2.5 w-3/5 rounded-full bg-fg/[0.07]" />
    </div>
  )
}

/** Public repositories, fetched live from the GitHub API in the visitor's browser. Falls back to a plain profile link. */
export function GithubSection() {
  const { status, repos } = useGithubRepos()
  const own = repos.filter((r) => !r.fork)
  const featured = [...own]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, 6)

  return (
    <section id="github" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Open source"
          title="Code, in the"
          highlight="open."
          description="Public repositories pulled live from my GitHub profile."
        />

        {status === 'loading' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading repositories">
            {Array.from({ length: 3 }, (_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {status === 'ready' && featured.length > 0 && (
          <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((repo) => (
              <StaggerItem key={repo.id}><RepoCard repo={repo} /></StaggerItem>
            ))}
          </Stagger>
        )}

        {(status === 'error' || (status === 'ready' && featured.length === 0)) && (
          <Reveal>
            <SpotlightCard className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative z-10 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent-text"><GithubIcon className="h-6 w-6" /></span>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-fg">Explore my repositories</p>
                  <p className="text-sm text-fg-2">{profile.githubLabel}</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        )}

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={profile.github} target="_blank" rel="noopener noreferrer" variant="secondary" magnetic icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
            <GithubIcon className="h-4 w-4" /> View GitHub profile
          </ButtonLink>
          {status === 'ready' && own.length > 0 && (
            <p className="text-sm text-fg-3">{own.length} public {own.length === 1 ? 'repository' : 'repositories'} · sorted by stars, then recent activity</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
