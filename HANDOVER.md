# Handover — Rasseportrait

A briefing for an agent (or human) with **no access to this repository**. It describes what the project is, why it exists, what it does, how it is built, and how to work on it.

- **Repository:** https://github.com/hurrtz/rasseportrait (owner: `hurrtz`, author: Tobias Winkler, MIT)
- **Live site:** https://hurrtz.github.io/rasseportrait/
- **Current version:** 3.16.0 (standard-version / conventional commits)
- **Language of the product:** German. Language of the code/comments: English.

---

## 1. What it is

"Tierisch Menschlich" is a popular German podcast by dog trainer **Martin Rütter** and journalist **Katharina Adick** (published via RTL+). A recurring segment is the **"Rasseportrait"** — a deep dive into one dog breed per episode, usually framed as a guessing game where the hosts try to identify a breed from clues.

This project is an **unofficial fan site** that catalogues every Rasseportrait segment ever aired. For each breed it collects:

- the podcast episode(s) it appeared in, with direct links (Spotify, RTL+) and the **timecode** where the segment starts,
- FCI classification (the international kennel federation's group/section/standard number),
- an AI-generated illustration of the breed,
- links for further reading (Wikipedia, FCI, VDH, martinruetter.com).

It is explicitly **not affiliated with RTL, the podcast, or the hosts**. The README states the author is not authorized by them and will take it down or hand it over on request. There is a German **Impressum** page (legally required for German-hosted sites) and a contact address: `rasseportrait@tobiaswinkler.berlin`.

## 2. The goal and intent

**Goal:** make the podcast's breed content *findable and re-listenable*. The podcast has hundreds of episodes; if you want to hear the segment on the Border Terrier, you would otherwise have no way to find it. This site is the index that the podcast itself does not provide.

**Intent behind the details:**

- **Deep-linking into audio.** Every entry stores an exact `timecode` in seconds so a listener can jump to the segment, plus both Spotify and RTL+ source URLs.
- **Completionism / progress tracking.** The site tracks how much of the FCI breed list (362 breeds: 346 approved + 16 provisional) the podcast has covered so far, as a percentage. This turns the archive into a running scoreboard of the podcast's project.
- **The guessing game as data.** Each podcast entry records whether the breed was guessable, whether it was guessed correctly, and by whom (`mr` = Martin, `ka` = Katharina). The Statistics page turns this into a hit-rate leaderboard between the two hosts.
- **Low-maintenance, zero-backend.** Everything is a static site on GitHub Pages. Data lives in the git repo as TypeScript files, so contributions are pull requests, not database edits. The README explicitly invites PRs for corrections and better images.
- **Beyond breeds.** A "Hundewissen" (dog knowledge) section extends the same treatment to non-breed topics the podcast covers.

## 3. Features

Four routes, all German-labelled, all under base path `/rasseportrait/`:

### `/` — Rasseportrait (main page)
- Responsive grid of breed cards, each with illustration + name.
- **Fuzzy search** (Fuse.js) over breed names, variant names and FCI standard numbers. Placeholder: "Suche nach Rassenamen oder FCI-Nummern". 300 ms debounce, threshold 0.1.
- **Sorting** by name, FCI number, or air date (default: air date, descending — newest episode first). Sort preference persists to localStorage.
- Clicking a card opens a **detail modal**: image carousel (for grouped variants), podcast episode list with provider logos, human-readable timecode ("1 Stunde, 12 Minuten"), episode type icons (audio/video), and further-reading links.
- **Deep links:** the selected breed is written to the URL as `?breed=<4-char-hash>`, so a specific breed can be shared.
- **Lazy loading:** cards render via IntersectionObserver with skeleton placeholders; once visible they stay mounted even when filters change.

### `/hundewissen` — Dog knowledge
Long-form German articles on podcast-adjacent topics, each with its own podcast references and further reading. Currently 7 topics: Hundesprache, Jagdhunde, Medizin, Qualzuchten (torture breeding), Schutzhunde, Silvester (fireworks/noise anxiety), Tierversuche (animal testing). Several are stubs awaiting content.

### `/statistiken` — Statistics
- Progress bar: % of the 362-breed FCI list presented on the podcast.
- List of presented breeds that are **outside** the FCI list (e.g. Elo, Australian Shepherd variants) — clickable, opens the breed modal.
- List of breeds **mentioned but not officially presented**.
- Guessing hit-rate per host (Martin / Katharina) as progress bars, with the count of guessable breeds vs. correct guesses. Martin's figure carries a hard-coded caveat subtracting the Spanish Water Dog.

### `/impressum` — Legal notice
German Impressum + the disclaimer of non-affiliation.

### Cross-cutting
- **Amplitude analytics**, production only, with 10 % session replay. Events are typed (`Breed Selected` carries breed id/name, variant count, whether search was active, search term, visible breed count).
- **Error boundary** around the app.
- **GitHub Pages SPA routing workaround**: a `404.html` redirect plus `sessionStorage` in `App.tsx` preserves deep links, since Pages has no server-side rewrite.

## 4. The data model

Everything hinges on two TypeScript interfaces (in `types/`):

```ts
Breed {
  id: number | string          // FCI standard number, or "special_N" for non-FCI breeds
  originalId?                  // pre-hash id, kept for image path resolution
  details: {
    internal: string           // snake_case key, e.g. "border_terrier" — the stable identifier
    public: string[]           // display names, [0] is primary
    variants?: Variant[]       // e.g. Corgi Cardigan vs. Pembroke
    groupAs?: string           // merges several breed files into one display card
    isGrouped?, isOfficiallyPresented?: boolean
  }
  classification: { fci: { group, section, standardNumber } | undefined }
  podcast: Podcast[]
  furtherReading: { name, url }[]
  recognitions?: string[]
}

Podcast {
  number: number | string      // episode number
  episode: string              // episode title
  sources: { url, type: "video"|"audio", provider?: "spotify"|"rtl" }[]
  meta: {
    internal: "portrait" | "listener_question" | "personal_anecdote" | "other"
    public:   "Rasseportrait" | "Hörerfrage" | "Persönliche Anekdote"
    timecode: number           // seconds into the episode
    airDate: string            // ISO date
    isGuessable, isGuessedCorrectly: boolean | undefined
    guessedBy: "mr" | "ka" | undefined
  }
}

KnowledgeTopic { id, title: {internal, public}, content: string, podcast[], furtherReading[] }
```

**Current scale:** 173 breed folders (161 numbered by FCI standard number + 12 `special_*` for non-FCI breeds) compiling to **172 breed records**, of which **18 are grouped variants**, spanning **164 distinct podcast episodes**. Plus 7 knowledge topics.

## 5. Architecture

```
app/
  root.tsx           HTML shell, Mantine provider, fonts
  App.tsx            header, menu, analytics init, error boundary, SPA-routing fix
  routes.ts          route table (/, /hundewissen, /impressum, /statistiken)
  routes/            thin route entry components
  pages/             page logic: rasseportrait/, Hundewissen/, Statistics/, imprint/
  components/        BreedCard, LazyBreedCard, BreedCardSkeleton, BreedDetails,
                     BreedImages, BreedSearch, BreedNotFound, KnowledgeContent,
                     Menu, Modal, SortControls, LoadingSpinner, ErrorBoundary
  stores/            Zustand: breeds.ts, knowledge.ts
  hooks/             useAmplitude, useBreedVisibility, useDebounce, useIntersectionObserver
  utils/             logger.ts, generateBreedHash.ts
  constants/         search/sort/error/a11y constants
db/
  breeds/<id>/index.ts + illustration.png   (~173 folders)
  breeds/index.ts                            barrel importing every breed
  knowledge/<topic>/index.ts                 (7 topics)
scripts/
  compileBreedData.cjs      db/breeds     → public/data/breeds.json
  compileKnowledgeData.cjs  db/knowledge  → public/data/knowledge.json
  copyIllustrations.cjs     Sharp: resize to 1000px, JPEG q75 → public/data
  prepareRelease.sh / pushRelease.sh / publishRelease.sh
public/data/         GENERATED — never edit by hand
types/               breed.ts, knowledge.ts, settings.ts, dddhnb.ts, tipps.ts
```

**Stack:** React 19 · React Router 7 (SPA mode, no SSR) · Vite 6 · TypeScript strict · Mantine 8 + CSS Modules · Zustand 5 (devtools + persist) · Fuse.js · Amplitude · Jest 29 + React Testing Library (11 test files) · ESLint + Prettier + Husky + commitlint.

### Data pipeline
Breed and knowledge data are **TypeScript source files**, not a database. A `prebuild` step compiles them into `public/data/*.json` (with a `{ breeds: [...], meta: { compiled, count, version } }` envelope); the SPA fetches that JSON at runtime. Consequence: **adding a breed is a code change and a rebuild, not a content edit.**

## 6. Commands

```bash
npm run dev              # Vite dev server
npm run build            # prebuild (data+knowledge+images) then react-router build
npm test                 # Jest — also runs as a pre-commit hook
npm run typecheck        # react-router typegen && tsc
npm run build:data       # recompile breeds.json
npm run build:knowledge  # recompile knowledge.json
npm run build:images     # Sharp-process illustrations into public/data
npm run release:patch|minor|major   # build → autocommit → standard-version → push → deploy
```

**Deployment:** `publishRelease.sh` pushes `build/client` to the `gh-pages` branch via `git subtree push`, with escalating fallbacks (force push, then an orphan-branch split) if the subtree push conflicts. GitHub Pages serves it.

## 7. Gotchas an incoming agent must know

1. **ID hashing.** Breed IDs are hashed to 4-character strings for URLs (`?breed=a1b2`). The original ID survives as `originalId` and is what image paths use. Rule: **hashed IDs in store selectors, original IDs for asset paths.** Statistics cross-references the two lists by `details.internal`, because that is the only identifier stable across both.
2. **Raw breeds ≠ display breeds.** `mergeGroupedBreeds()` in `app/pages/rasseportrait/utils.ts` collapses variants sharing a `groupAs` into one card. The store keeps both `rawBreeds` and `breeds`. Statistics deliberately uses `rawBreeds`.
3. **`public/data/` is generated.** Editing it directly is always wrong; edit `db/` and re-run the compile script.
4. **New breeds must be registered in `db/breeds/index.ts`** — the barrel file the compiler reads. Creating the folder alone is not enough.
5. **`no-console` is an ESLint error.** Use `app/utils/logger.ts` (`logger.child('store')`).
6. **Path alias `~/*` → `app/*`** (tsconfig + vite).
7. **Base path `/rasseportrait/`** is baked into `vite.config.ts` and `react-router.config.ts`; asset URLs in components are hard-coded with it (e.g. `/rasseportrait/spotify_logo.png`).
8. **Source illustrations in `db/breeds/*/` are high-res and gitignored**; only the Sharp-processed copies in `public/data/` are committed.
9. **Persistence is narrow:** only `sortBy`/`sortOrder` hit localStorage. Search state resets on refresh.
10. **Amplitude only initializes in production**, via dynamic import to avoid SSR issues.
11. **Conventional commits are enforced** by commitlint; Husky runs the full Jest suite before every commit.
12. **All images are Midjourney-generated** — there are no photographs of real dogs, deliberately, to avoid rights issues.
13. **The FCI totals (346 + 16 = 362) are hard-coded** in `app/pages/rasseportrait/constants.ts` and must be updated manually when the FCI changes its list, or the progress percentage silently drifts.

## 8. Typical maintenance task

The most common change by far is **adding a newly aired breed**:

1. Create `db/breeds/<fci-standard-number>/index.ts` (or `special_N` if the breed is not FCI-recognized) following the `Breed` shape — episode number, title, Spotify + RTL+ URLs, timecode in seconds, air date, guessing metadata, FCI group/section/standard number, further-reading links.
2. Add the import + export to `db/breeds/index.ts`.
3. Drop `illustration.png` (Midjourney) into the same folder.
4. `npm run build:data && npm run build:images`.
5. `npm test`, then `npm run release:minor` (a new breed is a feature).

Recent history confirms this rhythm: `feat: add English Setter` → `chore: autocommit release bundle` → `chore(release): 3.16.0`.
