import { useEffect, useState } from 'react'
import { profile, type Project } from '../data/portfolio'

export type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  fork: boolean
  pushed_at: string
}

type State = { status: 'loading' | 'ready' | 'error'; repos: Repo[] }

const CACHE_KEY = `gh-repos:${profile.githubUser}`
const TTL = 10 * 60 * 1000 // unauthenticated API is rate-limited (60/h per IP), so cache briefly
let inflight: Promise<Repo[]> | null = null

const isRepo = (r: unknown): r is Repo =>
  typeof r === 'object' && r !== null && typeof (r as Repo).name === 'string' && typeof (r as Repo).html_url === 'string'

function readCache(): Repo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, repos } = JSON.parse(raw) as { at: number; repos: Repo[] }
    return Date.now() - at < TTL ? repos : null
  } catch {
    return null
  }
}

function load(): Promise<Repo[]> {
  const cached = readCache()
  if (cached) return Promise.resolve(cached)
  inflight ??= fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed&type=owner`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      return res.json() as Promise<unknown>
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error('Unexpected GitHub response')
      const repos = data.filter(isRepo).map(({ id, name, description, html_url, language, stargazers_count, fork, pushed_at }) => ({
        id, name, description, html_url, language, stargazers_count, fork, pushed_at,
      }))
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }))
      } catch {
        /* storage unavailable */
      }
      return repos
    })
    .finally(() => {
      inflight = null
    })
  return inflight
}

/** Public repositories for the configured GitHub user. Fetched in the visitor's browser; nothing is invented. */
export function useGithubRepos(): State {
  const [state, setState] = useState<State>({ status: 'loading', repos: [] })

  useEffect(() => {
    let alive = true
    const run = () =>
      load()
        .then((repos) => alive && setState({ status: 'ready', repos }))
        .catch(() => alive && setState({ status: 'error', repos: [] }))

    // Keep the request off the critical rendering path.
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
    const handle = idle ? idle(run) : window.setTimeout(run, 600)
    return () => {
      alive = false
      if (!idle) window.clearTimeout(handle)
    }
  }, [])

  return state
}

/** The repo for a featured project, but only when a repo name clearly matches — otherwise undefined. */
export function matchRepo(project: Project, repos: Repo[]): Repo | undefined {
  return repos
    .filter((r) => !r.fork && project.repoMatch.every((k) => r.name.toLowerCase().includes(k)))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)[0]
}

/** Where a project's GitHub button goes: explicit config > matched repo > GitHub profile. */
export function projectRepoUrl(project: Project, repos: Repo[]): string {
  return project.repoUrl ?? matchRepo(project, repos)?.html_url ?? profile.github
}
