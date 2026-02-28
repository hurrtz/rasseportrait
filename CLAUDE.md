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
  root.tsx                    # HTML shell, Mantine provider, fonts
  App.tsx                     # Header, menu, analytics init, error boundary
  routes.ts                   # Route definitions (/, /hundewissen, /impressum, /statistiken)
  routes/                     # Route entry components
  pages/                      # Page logic (rasseportrait, Hundewissen, imprint, Statistics)
  components/                 # Reusable components (BreedCard, BreedSearch, Modal, etc.)
  stores/                     # Zustand stores (breeds, knowledge)
  hooks/                      # Custom hooks (useAmplitude, useBreedVisibility, useDebounce)
  utils/                      # Logger, hash generation
  config/                     # Environment config (Amplitude API key)
db/
  breeds/*/index.ts           # ~208 breed data files (TypeScript)
  knowledge/*.ts              # Knowledge topic files
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

**To add/edit knowledge:** Edit or create `db/knowledge/<topic>.ts`, then run `npm run build:knowledge`.

## Key Patterns & Gotchas

### ID Hashing
Breed IDs are hashed to 4-character strings for URLs (`?breed=a1b2`). The original ID is preserved in `originalId` for image path resolution. Use hashed IDs in store selectors, original IDs for asset paths.

### Breed Grouping
Some breeds are grouped via `groupAs` property (e.g., Corgi variants). `mergeGroupedBreeds()` in `app/pages/rasseportrait/utils.ts` combines variants into a single display card. Raw breeds ≠ display breeds.

### GitHub Pages SPA Routing
GitHub Pages doesn't support SPA routing natively. A `404.html` redirect + `sessionStorage` workaround is implemented in `App.tsx` to preserve deep links.

### Path Alias
`~/*` maps to `app/*` (configured in tsconfig + vite). Use `import { x } from '~/stores/breeds'`.

### Base Path
All routes and assets use base path `/rasseportrait/` (configured in `vite.config.ts` and `react-router.config.ts`).

### No console.log
ESLint enforces `no-console: error`. Use the custom logger at `app/utils/logger.ts` with scoped levels (e.g., `logger.child('store')`).

### Amplitude Analytics
Only initializes in production. Dynamic import prevents SSR issues. Events are type-safe via TypeScript interfaces in `useAmplitude` hook.

### Lazy Loading
`LazyBreedCard` uses IntersectionObserver with skeleton placeholders. Cards maintain global visibility state — they stay rendered after becoming visible, even when search filters change.

### Store Persistence
Only sort settings (sortBy, sortOrder) persist to localStorage. Search state resets on refresh.

## Testing

- **Framework:** Jest 29 + jsdom + React Testing Library
- **Location:** `__tests__/` directories alongside source
- **CSS mock:** `__mocks__/styleMock.js`
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
