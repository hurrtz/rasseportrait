# CLAUDE.md — Rasseportrait

Fan project for the "Tierisch Menschlich" podcast by Martin Rütter & Katharina Adick. Curated list of dog breed episodes (Rasseportrait) with images, details, and a knowledge base.

Deployed at: https://hurrtz.github.io/rasseportrait/

## Commands

```bash
npm run dev              # Start dev server (Vite + React Router)
npm run build            # Full build: data compilation + Vite bundle
npm test                 # Jest tests (also runs as pre-commit hook)
npm run test:watch       # Jest in watch mode
npm run test:coverage    # Jest with coverage report
npm run typecheck        # react-router typegen + tsc
npm run build:data       # Compile breed TS files → public/data/breeds.json
npm run build:knowledge  # Compile knowledge TS files → public/data/knowledge.json
npm run build:images     # Copy illustration assets to public/data
```

Release: `npm run release:patch|minor|major` (standard-version + GitHub Pages deploy)

## Stack

- **React 19** + **React Router 7** (SPA mode, no SSR)
- **Vite 6** (build + dev server)
- **TypeScript** (strict mode)
- **Mantine 8** (UI components) + **CSS Modules** + plain CSS
- **Zustand 5** (state management with devtools + persistence)
- **Fuse.js** (fuzzy search)
- **Amplitude** (analytics, production only, 10% session replay)
- **Jest** + **React Testing Library** (testing)

## Architecture

```
app/
  root.tsx                    # HTML shell, Mantine provider + theme, fonts, route error page
  theme.ts                    # Mantine theme (orange primary, radii, fonts)
  styles/tokens.css           # --rp-* design tokens (colours, type, radii, gutters)
  App.tsx                     # Header (hidden on /rasse/*), GitHub Pages redirect, analytics init
  routes.ts                   # /, /rasse/:slug, /hundewissen, /statistiken, /impressum
  routes/                     # Route modules (meta titles; rasse.tsx has a clientLoader)
  pages/                      # rasseportrait (overview), Rasse (detail), Statistics, Hundewissen, imprint
  components/                 # Header, HeroPortrait, PortraitCard, PlayButton, SortControl, BreedSearch, …
  stores/                     # Zustand stores (breeds, knowledge) with a load `status`
  hooks/                      # useAmplitude (typed events), useEnsureBreeds, useTrackPlay, useDebounce, …
  utils/                      # format.ts (German formats), breed.ts (slugs, listen URLs, illustrations), analytics, logger
  test-utils/                 # makeBreed/makePodcast/seedBreeds/renderWithProviders for tests
  config/                     # Environment config (Amplitude API key)
db/
  breeds/*/index.ts           # ~208 breed data files (TypeScript)
  knowledge/*/index.ts        # Knowledge topics (summary, status draft|published)
scripts/
  compileBreedData.cjs        # Compiles db/breeds → public/data/breeds.json
  compileKnowledgeData.cjs    # Compiles db/knowledge → public/data/knowledge.json
  copyIllustrations.cjs       # Copies images to public/data
public/data/                  # Generated JSON + images (do NOT edit manually)
types/                        # Shared TypeScript type definitions
```

## Data Pipeline

Breed and knowledge data lives as **TypeScript files** in `db/`. At build time (`prebuild`), scripts compile them to JSON in `public/data/`. The app fetches these JSON files at runtime.

**To add/edit a breed:** Edit or create `db/breeds/<breed-name>/index.ts`, then run `npm run build:data`.

**To add/edit knowledge:** Edit or create `db/knowledge/<topic>/index.ts`, then run `npm run build:knowledge`. Paragraphs are separated by blank lines; single line breaks are joined.

## Key Patterns & Gotchas

### Display breeds, IDs and slugs

`toDisplayBreeds()` (`app/utils/breed.ts`) turns raw breeds into what the app shows: grouped breeds (`groupAs`, e.g. Corgi) merged into one breed with variants, IDs hashed to 4 characters (`originalId` keeps the raw ID for asset paths) and a unique `slug` for `/rasse/<slug>`. Raw breeds ≠ display breeds: statistics count raw breeds. Old `/?breed=<hash>` links redirect to the slug URL.

### Illustrations and play links

Use `getIllustrations(breed)` for image paths (absolute, per variant; grouped members live in their FCI folder) and `getListenUrl(podcast)` for play buttons (Spotify with `?t=<timecode>` first, then RTL+). Every play button is a link out; there is no audio player.

### GitHub Pages SPA Routing

GitHub Pages doesn't support SPA routing natively. `public/404.html` stores the path in `sessionStorage` and redirects to the app root, where `App.tsx` restores it.

### Path Alias

`~/*` maps to `app/*` (configured in tsconfig + vite). Use `import { x } from '~/stores/breeds'`.

### Base Path

All routes and assets use base path `/rasseportrait/` (configured in `vite.config.ts` and `react-router.config.ts`).

### No console.log

ESLint enforces `no-console: error`. Use the custom logger at `app/utils/logger.ts` with scoped levels (e.g., `logger.child('store')`).

### Amplitude Analytics

Only initializes in production (`app/utils/analytics.ts`). Session replay is sampled (10%) before its plugin is imported. Events and their properties are typed in the `AnalyticsEvents` map in `useAmplitude`.

### Lazy Loading

`LazyBreedCard` uses IntersectionObserver with skeleton placeholders. Cards maintain global visibility state — they stay rendered after becoming visible, even when search filters change.

### Store Persistence

Only the sort setting (sortBy, sortOrder; one fixed direction per field) persists to localStorage. The search query lives in the store, so it survives a visit to a breed page, but resets on refresh.

## Testing

- **Framework:** Jest 29 + jsdom + React Testing Library
- **Location:** `__tests__/` directories alongside source
- **CSS mock:** `__mocks__/styleMock.js`
- **Helpers:** `app/test-utils` (fixtures, store seeding, router + Mantine wrapper)
- **`import.meta`:** rewritten to `globalThis.importMeta` by `jest/importMetaTransformer.cjs` (stubbed in `jest.setup.js`); `ResizeObserver` is stubbed there too
- **Pre-commit hook:** Husky runs `npm test` before every commit

## Code Style

- ESLint: `eslint:recommended` + `plugin:react/recommended` + `@typescript-eslint/recommended` + Prettier
- Prettier: defaults (no custom config)
- Commit messages: conventional commits (commitlint enforced)
- lint-staged: Prettier auto-format on commit

## Environment

- `import.meta.env.DEV` / `import.meta.env.PROD` for environment detection
- `VITE_AMPLITUDE_API_KEY` — Amplitude API key (optional, has fallback)
- `VITE_LOG_LEVEL` — Override log level (debug/info/warn/error)
- No `.env` files committed

## Images

All breed illustrations are AI-generated (Midjourney). Source images in `db/breeds/*/` are gitignored (high-res). Processed versions are copied to `public/data/` by `build:images` script using Sharp.

## Build Compression

Vite produces Gzip (level 9) + Brotli (level 11) compressed assets alongside originals.

## Design

The UI follows the "Sendung · Tageslicht" redesign: see `docs/redesign/README.md` for tokens, component specs, copy (German, no emoji, no exclamation marks) and contrast rules, and `docs/redesign/mockups/` for every screen. Style with CSS Modules and the `--rp-*` tokens; use Mantine only where it brings behaviour (Drawer, Menu, SegmentedControl, Loader, SimpleGrid). Next: Hundewissen as a podcast topic index (areas → topics → entries with timecodes, built from `db/podcast/topic-index.json`), see `docs/redesign/hundewissen-themen.md`; area images per `docs/redesign/hundewissen-bilder.md`.
