# Shivam Thakur — Portfolio

React + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build -> dist/
npm run preview  # serve the production build
```

## Customise (everything lives in `src/data/portfolio.ts`)

- **Photo:** optimized WebP sizes live in `public/images/shivam-{480,720,1000}.webp`; the `photo` object in the data file points to them. To swap, replace those files (same names) or edit `photo`.
- **Theme:** light/dark toggle in the navbar. First visit follows the OS setting; choice is saved in `localStorage` (`theme`). Colors are CSS variables in `src/index.css`.
- **GitHub:** repos are fetched client-side from the public GitHub API for `githubUser` (cached 10 min). If it fails, a fallback card links to your profile. Each project's GitHub button uses a repo whose name contains all its `repoMatch` keywords; otherwise your profile. Set `repoUrl` on a project to pin an exact repo.
- **Cursor:** `src/components/Cursor.tsx` + the "Custom cursor" block in `src/index.css`. Desktop mouse only; touch and `prefers-reduced-motion` keep the native cursor. Opt elements in with `data-cursor="button|link|view|project|github|hide"` (optional `data-cursor-label="TEXT"`). Magnetic pull: `src/components/Magnetic.tsx` (`strength`, `range`, `max`).
- **Mockups:** project visuals are illustrative CSS mockups (labeled as such). Replace with real screenshots when you have them.
- **Project GitHub / live links:** add `repoUrl` and/or `liveUrl` to a project. Until then, the GitHub button
  points to your GitHub profile and "View Project" opens a case-study dialog (no live URLs are invented).
- **Resume:** replace `public/Shivam_Thakur_Resume.pdf`.
- **Contact form:** copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` (e.g. Formspree) to send directly.
  Without it, the form opens the visitor's email app with the message pre-filled.
- **SEO:** once you have a domain, add `<link rel="canonical">`, an `og:url`/`og:image`, and a sitemap in `index.html` / `public/`.
