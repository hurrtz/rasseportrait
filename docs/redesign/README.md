# Redesign "Sendung · Tageslicht" — implementation handover

This document takes Rasseportrait from the live version (3.16.0, `d799ebf8b`) to the approved redesign **"Sendung · Tageslicht"**. It is written for Claude Code (or any developer) to implement without further design input. Where the mockups leave a case open, this document decides it (see [§ 9 Decisions](#9-decisions-for-cases-the-mockups-do-not-show)).

Read in this order: § 1–3 (what and where), § 4–5 (foundations, do these first), § 6 (the plan), then the page sections as you reach them.

---

## 1. What changes, in one screen

| Area | Before (3.16.0) | After (Tageslicht) |
|---|---|---|
| Look | White Mantine defaults, system font, small-caps names, frosted name plates, orange/lime/blue accents | Warm white `#faf6f0`, near-black text, **one** orange accent. Bricolage Grotesque (display) + Atkinson Hyperlegible (text). Flat surfaces with 1px borders, large radii, no shadows |
| Navigation | Burger (top-right, fixed) opens a drawer with sort options and page links | Header with pill navigation on desktop; burger + drawer with page links only on mobile. Sorting moves onto the overview page |
| Overview `/` | Search + card grid (1 column on phones) | "Neues Portrait" hero with a play bar, then "Alle N Portraits" with search, sort control and a 2–5 column grid. Each card has a play button that opens the episode at the portrait's timecode |
| Breed detail | 440px modal over the grid (`/?breed=<id>`) | Full page `/rasse/<slug>`: large illustration, player card with timecode, fact tiles, links, related breeds. Sticky player bar on mobile. Old `?breed=` links redirect |
| Statistiken | Four stacked cards, blue badges, white-on-orange labels | Bento grid: progress, guessing rate, portraits per year, portraits per FCI group, breeds outside FCI |
| Hundewissen | Blue tabs + one card with empty sections | Topic list (tabs on mobile) + article; honest "in progress" state instead of placeholder text and empty headings |
| Impressum | Default links, bordered cards | Same content, restyled with the new tokens (not mocked, see § 8.5) |
| Bugs fixed on the way | Direct links to sub-pages 404, `lang="en"`, English aria-labels, empty `alt`, low-contrast labels | All fixed (§ 6, phase 0) |

## 2. Screenshots

### Before (live site, 2026-09-28)

| | Desktop 1440×900 | Mobile 375×812 |
|---|---|---|
| Overview | ![](screenshots/before/desktop-home.jpeg) | ![](screenshots/before/mobile-home.jpeg) |
| Breed detail | ![](screenshots/before/desktop-breed-modal.jpeg) | ![](screenshots/before/mobile-breed-modal.jpeg) |
| Menu | ![](screenshots/before/desktop-menu.jpeg) | ![](screenshots/before/mobile-menu.jpeg) |
| Hundewissen | ![](screenshots/before/desktop-hundewissen.jpeg) | ![](screenshots/before/mobile-hundewissen.jpeg) |
| Statistiken | ![](screenshots/before/desktop-statistiken.jpeg) | ![](screenshots/before/mobile-statistiken.jpeg) |
| Impressum | ![](screenshots/before/desktop-impressum.jpeg) | ![](screenshots/before/mobile-impressum.jpeg) |
| Direct link `/statistiken` | ![](screenshots/before/deeplink-404.jpeg) | |

### After (approved design)

| | Desktop 1440 | Mobile 390 |
|---|---|---|
| Overview | ![](screenshots/after/uebersicht.png) | ![](screenshots/after/uebersicht-mobil.png) |
| Breed detail | ![](screenshots/after/rasse.png) | ![](screenshots/after/rasse-mobil.png) |
| Statistik | ![](screenshots/after/statistik.png) | ![](screenshots/after/statistik-mobil.png) |
| Hundewissen | ![](screenshots/after/hundewissen.png) | ![](screenshots/after/hundewissen-mobil.png) |

## 3. Design sources

- **`docs/redesign/mockups/*.html`**: the approved screens as standalone HTML with every measurement as an inline style. Open them in a browser (they load the real illustrations from `public/illustrations`). **When this document and a mockup disagree on a pixel value, the mockup wins; when they disagree on behaviour, this document wins.**
  - `uebersicht.html`, `uebersicht-mobil.html`, `rasse.html`, `rasse-mobil.html`, `statistik.html`, `statistik-mobil.html`, `hundewissen.html`, `hundewissen-mobil.html`
- Design canvas (private, owner's claude.ai account): https://claude.ai/artifact/8jSPvs7DRP6Jp4Tgz9kjwE
- Design system "Rasseportrait" (private, same account), updated to Tageslicht: https://claude.ai/artifact/JJngi6RQR9gqe4tQikS3Kh

Mockup content is real data (breed names, episodes, timecodes, statistics as of 2026-06). Build everything from `breeds.json` / `knowledge.json`; never hard-code mockup values.

---

## 4. Foundations

### 4.1 Colour tokens

Create `app/styles/tokens.css` and import it in `app/root.tsx` after `@mantine/core/styles.css`.

```css
:root {
  /* colour */
  --rp-bg: #faf6f0;            /* page background */
  --rp-surface: #ffffff;       /* cards, hero, article, fact tiles on bg */
  --rp-surface-muted: #f1e9de; /* player bar, chips, active nav pill, progress track, tabs */
  --rp-text: #1b1712;          /* all primary text */
  --rp-text-muted: #5e554a;    /* meta lines, labels, secondary copy */
  --rp-line: #e0d5c6;          /* 1px borders, dividers, outline pills */
  --rp-accent: #f58220;        /* play buttons, progress fill, "Neues Portrait" pill, active topic tab */
  --rp-accent-text: #b4530a;   /* orange used AS TEXT or icon on light grounds (eyebrows, links, check icon) */
  --rp-on-accent: #1b1712;     /* text/icons on --rp-accent */
  --rp-glass: rgba(250, 246, 240, 0.9); /* back button over the illustration */

  /* logo only — do not use in UI */
  --rp-brand-orange: #eea13c;
  --rp-brand-ink: #372613;

  /* type */
  --rp-font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --rp-font-body: "Atkinson Hyperlegible", system-ui, sans-serif;

  /* radius */
  --rp-radius-thumb: 10px;   /* 64px related thumbnails */
  --rp-radius-image: 14px;   /* card images */
  --rp-radius-tile: 16px;    /* fact tiles, related rows, topic list items (18px) */
  --rp-radius-image-l: 20px; /* hero image */
  --rp-radius-card: 24px;    /* stat cards, player card, mobile hero, mobile article */
  --rp-radius-panel: 28px;   /* desktop hero, desktop article */
  --rp-radius-pill: 999px;   /* buttons, chips, search, nav, segmented control */

  /* spacing */
  --rp-gutter: 16px;         /* page side padding < 62em */
  --rp-gutter-desktop: 56px; /* page side padding >= 62em */
}

body {
  background: var(--rp-bg);
  color: var(--rp-text);
  font-family: var(--rp-font-body);
}

:focus-visible {
  outline: 2px solid var(--rp-accent-text);
  outline-offset: 2px;
}
```

**Contrast (all checked, WCAG 2.x):**

| Pair | Ratio | Use |
|---|---|---|
| `--rp-text` on `--rp-bg` / `--rp-surface` / `--rp-surface-muted` | 16.6 / 17.8 / 14.8 | all text |
| `--rp-text-muted` on `--rp-surface-muted` (worst ground) | 6.1 | meta, labels |
| `--rp-accent-text` on `--rp-bg` / `--rp-surface` | 4.7 / 5.0 | orange text, links, icons |
| `--rp-accent-text` on `--rp-surface-muted` | 4.2 | icons and focus rings only (≥ 3:1), **not** body text |
| `--rp-on-accent` on `--rp-accent` | 6.9 | play icons, "Neues Portrait", active tab |
| focus ring `--rp-accent-text` on any ground | ≥ 4.2 | `:focus-visible` (needs 3:1) |

Rules: **never** put `--rp-accent` text on a light ground (2.4:1), never white text on `--rp-accent`, and do not set `--rp-accent-text` text on `--rp-surface-muted`. The live site's white percentage on orange (2.1:1), grey `dimmed` text (3.3:1) and Mantine blue badges (3.2:1) all go away.

### 4.2 Typography

Replace the Inter `<link>` in `app/root.tsx` `links()` with:

```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap
```

Keep the two `preconnect` links. Update `HydrateFallback` to `fontFamily: "var(--rp-font-body)"`, `color: "var(--rp-text-muted)"`.

| Style | Family | Size / line-height | Weight | Letter-spacing | Where |
|---|---|---|---|---|---|
| display-xl | display | 112 / 0.88 | 800 | -0.045em | breed name, detail desktop (use `clamp(56px, 7.8vw, 112px)`) |
| display-l | display | 104 / 0.9 | 800 | -0.04em | hero breed name, desktop |
| display-page | display | 96 / 0.9 | 800 | -0.045em | page titles "Statistik", "Hundewissen" |
| display-m | display | 72 / 0.92 | 800 | -0.04em | article title (Hundewissen) |
| display-mobile | display | 56 / 0.9 (detail), 52 (Statistik), 48 (Hundewissen), 44 (hero) | 800 | -0.04em | mobile headlines |
| section | display | 44 / 1.05 (mobile 28) | 800 | -0.03em | "Alle 171 Portraits" |
| card-title | display | 30 | 800 | -0.02em | stat card headings |
| player-title | display | 26 | 700 | -0.01em | episode title in player card |
| fact-value | display | 22 | 700 | 0 | fact tile values |
| name | display | 19 / 1.15 | 700 | -0.01em | card name |
| wordmark | display | 26 (mobile 20) | 800 | -0.02em | "Rasseportrait" next to the dog |
| eyebrow | body | 13–14 | 700 | 0.08em, uppercase | "RASSEPORTRAIT · FOLGE 7", colour `--rp-accent-text` |
| body-l | body | 19–20 / 1.5 | 400 | 0 | intros, article text (1.6) |
| body | body | 15–17 / 1.45 | 400/700 | 0 | UI text, buttons (700) |
| meta | body | 13–14 | 400 | 0 | "Folge 7 · ab 44:50", `--rp-text-muted` |

Atkinson Hyperlegible draws a slashed zero. It is fine in meta lines; for numbers that are the focus of a component (fact tile values, statistics, timecodes in the player) use the display family, as the mockups do.

German number and date formats everywhere: `Intl.NumberFormat("de-DE")` → `47,24 %` (with a space before `%`), `Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" })` → `8. April 2026`; short form `08.04.2026`.

### 4.3 Mantine theme

The app renders Mantine with no theme today, which is where the blue focus ring, blue tabs and blue badges come from. Create `app/theme.ts` and pass it to `<MantineProvider theme={theme}>` in `app/root.tsx`:

```ts
import { createTheme, type MantineColorsTuple } from "@mantine/core";

const orange: MantineColorsTuple = [
  "#fff4e8", "#ffe6cc", "#ffcc99", "#ffb066", "#ff9d45",
  "#fb8d30", "#f58220", "#d96d12", "#b4530a", "#8a3f07",
];

export const theme = createTheme({
  primaryColor: "orange",
  primaryShade: 6,
  colors: { orange },
  autoContrast: true,
  black: "#1b1712",
  white: "#ffffff",
  fontFamily: "var(--rp-font-body)",
  headings: { fontFamily: "var(--rp-font-display)", fontWeight: "800" },
  defaultRadius: "xl",
  radius: { xs: "10px", sm: "14px", md: "16px", lg: "24px", xl: "999px" },
  focusRing: "never", // our :focus-visible rule in tokens.css draws the ring
  cursorType: "pointer",
});
```

Also set `--mantine-color-body: var(--rp-bg)` and `--mantine-color-text: var(--rp-text)` via `cssVariablesResolver` (or in `tokens.css` under `:root[data-mantine-color-scheme="light"]`). Keep the light scheme only; there is no dark theme.

### 4.4 Icons

Keep `@tabler/icons-react`. Used icons: `IconPlayerPlayFilled` (all play buttons), `IconSearch`, `IconArrowLeft`, `IconArrowRight`, `IconExternalLink`, `IconCheck`, `IconClock`, `IconHeadphones`, `IconArrowsSort`, `IconMenu2`, `IconX`, `IconHeart` (recognitions). Stroke 2. No emoji anywhere in the UI.

### 4.5 Motion

Minimal: hover on cards lifts nothing; image gets `transform: scale(1.03)` inside an `overflow: hidden` wrapper over 200ms ease; buttons change background in 150ms. Respect `prefers-reduced-motion: reduce` (no transforms). Remove the current card scale + black glow hover.

---

## 5. Layout grid and breakpoints

Mantine default breakpoints stay: `sm` 48em (768px), `md` 62em (992px), `xl` 88em (1408px).

- Page container: `max-width: 1440px; margin: 0 auto; padding-inline: var(--rp-gutter)` below `md`, `var(--rp-gutter-desktop)` from `md`.
- Portrait grid (`SimpleGrid`): `cols={{ base: 2, sm: 3, md: 4, xl: 5 }}`, column gap 14px / row gap 24px below `md`, 24px / 36px from `md`.
- Statistik: 12-column grid, gap 24px, from `md`; single column below.
- Hundewissen: `400px minmax(0, 1fr)` with 40px gap from `md`; stacked below.
- Touch targets ≥ 44px everywhere.

---

## 6. Implementation plan

Work in this order; each phase leaves the app shippable. Commit per phase with conventional commits (`feat:`, `fix:`, `refactor:`). The pre-commit hook runs `npm test`; keep it green.

### Phase 0 — bugs and groundwork (ship first)

1. **Direct links 404.** GitHub Pages serves its own 404 for `/rasseportrait/hundewissen` etc. `App.tsx` already restores `sessionStorage.redirectPath`, but no `404.html` is deployed. Add `public/404.html`:
   ```html
   <!doctype html>
   <html lang="de"><head><meta charset="utf-8"><title>Rasseportrait</title>
   <script>
     sessionStorage.setItem("redirectPath", location.pathname.replace(/^\/rasseportrait/, "") + location.search + location.hash);
     location.replace("/rasseportrait/");
   </script></head><body></body></html>
   ```
   Verify that `build/client/404.html` exists after `npm run build` (Vite copies `public/`). This is required for `/rasse/<slug>` in phase 3.
2. `app/root.tsx`: `<html lang="de">`.
3. German accessible names: `SEARCH_ARIA_LABEL = "Rassen durchsuchen"`, card label `"Details zu {name}"`, clear button `"Suche leeren"`, menu `"Menü öffnen"` / `"Menü schließen"`.
4. Every breed image gets `alt={name}` (variant: `"{name}, {variant}"`), `loading="lazy"` and `decoding="async"` (hero image: `loading="eager"`, `fetchpriority="high"`).
5. Fix the typo in `app/components/BreedImages/components/styles.css`: "ofiziell" → "offiziell" (the rule is replaced in phase 2 anyway).

### Phase 1 — foundations

- `app/styles/tokens.css`, `app/theme.ts`, fonts, `MantineProvider theme` (§ 4).
- New shared helpers in `app/utils/format.ts` with unit tests:
  - `formatTimecode(seconds)` → `"44:50"`, `"1:02:08"` (h:mm:ss only when ≥ 1h). Replaces `getTime()` in `BreedDetails.tsx` (which produced "44 Minuten").
  - `formatDateLong("2026-04-08")` → `"8. April 2026"`, `formatDateShort` → `"08.04.2026"`.
  - `formatPercent(47.2375)` → `"47,24 %"`.
  - `getPrimaryPortrait(breed)` → the `podcast` entry with `meta.internal === "portrait"`, else the first entry.
  - `getListenUrl(podcast)` → `{ url, provider }` of the preferred source: Spotify first (append `?t=<timecode>` as today), else RTL+, else the first source.
  - `fciGroupLabel(group)` → `{ roman: "I", short: "Hütehunde", long: "Hüte- und Treibhunde" }` for groups 1–10 (table in § 10.3).
  - `breedSlug(breed)` → kebab-case of `details.internal` (`border_collie` → `border-collie`); for merged/grouped breeds use `details.groupAs ?? details.internal`. Add a test that all display breeds produce **unique** slugs; on collision append `-<hash id>`.

### Phase 2 — shell (header, navigation, drawer)

Replace `app/components/Menu` and the header in `app/App.tsx`.

- `Header` (`app/components/Header/`): flex row, `space-between`, padding `20px 56px` (≥ md) / `12px 16px`. Not fixed; scrolls with the page. No bottom border.
  - Brand link to `/`: `logo_reduced.png` (the dog head only, 38×32 desktop, 30×25 mobile) + wordmark text "Rasseportrait" (wordmark style). `logo.png` (image wordmark) is no longer used in the header.
  - Nav (≥ md): links "Portraits" `/`, "Hundewissen" `/hundewissen`, "Statistik" `/statistiken`, "Impressum" `/impressum`. Pills: padding `10px 16px`, 15/700; inactive `--rp-text-muted` on transparent; active (`aria-current="page"`) `--rp-text` on `--rp-surface-muted`. Portraits is active on `/` and on `/rasse/*`.
  - Below md: 44px round button `--rp-surface-muted` with `IconMenu2` opens a Mantine `Drawer` (position right, full height, bg `--rp-bg`) listing the same four links as large pills (20px/700, 52px tall), plus a close button. No sort options in the drawer anymore.
- `App.tsx`: drop `AppShell` header (keep `AppShell` only if you need it; a plain layout is enough). Keep analytics init, GitHub Pages redirect and ErrorBoundary unchanged. Keep the `Logo Clicked` and page-click events (§ 11).
- The breed detail route renders **without** the global header (the mockup is full-bleed; its back button replaces it).

### Phase 3 — overview page (`/`)

Files: `app/pages/rasseportrait/Rasseportrait.tsx` (rewrite the render), new components `HeroPortrait`, `PortraitCard`, `PortraitGrid`, `SortControl`, restyled `BreedSearch`, `LazyBreedCard`, `BreedCardSkeleton`, `BreedNotFound`. Reference: `mockups/uebersicht.html`, `mockups/uebersicht-mobil.html`.

1. **Hero "Neues Portrait"** (hidden while a search needle is active):
   - Breed = the display breed whose portrait `airDate` is the latest.
   - Desktop: panel `--rp-surface`, radius 28, padding 32, grid `520px minmax(0,1fr)`, gap 56, vertically centred. Image 520×520, radius 20, links to the detail page.
   - Right column, gap 22: row with pill "Neues Portrait" (13/700 uppercase 0.08em, `--rp-accent` bg, `--rp-on-accent`, padding 6×12) + meta "Folge 15 · 4. Juni 2026" (14, muted); name in display-l (break naturally; the mockup forces "English / Setter" only because of its width); subline 20/1.45 muted: `aus »{episode}« · FCI Nº {standardNumber}, {group short}` (omit the FCI part when there is none); **play bar**: pill `--rp-surface-muted`, padding `10px 24px 10px 10px`, gap 16: 64px `--rp-accent` circle with `IconPlayerPlayFilled` 28 `--rp-on-accent` (this is the link, `aria-label="Portrait ab 48:28 anhören"`), text block "Portrait ab 48:28 anhören" (17/700) + "Öffnet Spotify an der richtigen Stelle" (14 muted; "Öffnet RTL+" when that is the source); right: `IconCheck` 18 in `--rp-accent-text` + "Martin lag richtig" / "Katharina lag richtig" / "Martin lag daneben" (only when `isGuessable`).
   - Mobile: card radius 24 padding 14 margin `4px 16px 0`; image full width, **aspect-ratio 4/3**, radius 16, `object-position: center 35%` (the only place an illustration may be cropped); meta line "**Neues Portrait** · Folge 15" (the first part 700 in `--rp-accent-text`); name 44/0.92; full-width play pill (`--rp-accent` bg, 8px padding, 44px inner circle in `--rp-on-accent` with an `--rp-accent` icon, label "Ab 48:28 anhören" 16/700).
2. **Section header**: "Alle {count} Portraits" (section style; `count` = number of display breeds; with a search: "{n} Treffer für »{needle}«"). Right side (≥ md): search pill 320px + sort control. Below md: title "Alle Portraits" 28px + compact sort button in one row, the search field full width below.
3. **Search** (`BreedSearch`): pill, `--rp-surface`, 1px `--rp-line`, padding `12px 18px`, `IconSearch` 18 muted, input 15px (16px below md to prevent iOS zoom), placeholder "Rasse oder FCI-Nummer", visible `<label>` hidden visually ("Rassen durchsuchen"). Clear button (`IconX`) when non-empty. Debounce and Fuse options unchanged.
4. **Sort control**: Mantine `SegmentedControl` restyled: track `--rp-surface` radius 999 padding 4; items 14/700 padding `9px 16px` muted; active item `--rp-text` background with `--rp-bg` text. Options: "Neueste" (`airDate` desc), "A–Z" (`name` asc), "FCI-Nummer" (`fci` asc). Below md: a 44px pill button "`IconArrowsSort` Neueste" opening a Mantine `Menu` with the three options. The store keeps `sortBy`/`sortOrder` and persistence; the UI no longer exposes a separate direction toggle (`SortControls.tsx` and the drawer sort block are removed).
5. **Portrait card** (`PortraitCard`, used inside `LazyBreedCard`):
   - Whole card is an `<a href="/rasse/{slug}">` (React Router `Link`), gap 12, no card background.
   - Image: square (`aspect-ratio: 1/1`, `object-fit: cover`), radius 14, thumbnail file. Play button: absolutely positioned 10px from right/bottom, 40px circle `--rp-accent`, `IconPlayerPlayFilled` 18 `--rp-on-accent`. It is a **separate** `<a>` to the listen URL (`target="_blank" rel="noopener"`), `aria-label="{name}: Portrait ab {tc} anhören"`, `onClick` stops propagation. Do not nest the play link inside the card link: render the card as a positioned wrapper `div` containing the card `Link` and the play `a` as siblings.
   - Name (name style, may wrap to two lines; no truncation), meta "Folge {number} · ab {timecode}" (13 muted).
   - Not officially presented (`details.isOfficiallyPresented === false`): image `filter: grayscale(1)` and a top-left pill "Noch nicht vorgestellt" (12/700, `--rp-surface` 90% bg). No play button when the breed has no source.
   - Grouped breeds (`mergeGroupedBreeds`): **no carousel on cards**. Show the first variant's thumbnail and meta "{n} Varianten · Folge {number}". Variants are switched on the detail page.
6. **Skeleton** (`BreedCardSkeleton`): same geometry as the card: square `--rp-surface-muted` block radius 14, two text bars (60% and 40% width) in `--rp-surface-muted`. Keep `LazyBreedCard`'s IntersectionObserver behaviour.
7. **No results** (`BreedNotFound`): centred block, max-width 480: the not-found illustration (square, radius 20, 240px), "Keine Rasse gefunden" (display 30/800), "Für »{needle}« gibt es noch kein Portrait. Suche nach einem anderen Namen oder einer FCI-Nummer." (16 muted), pill button "Suche zurücksetzen".
8. **Loading / error**: `LoadingSpinner` becomes a centred Mantine `Loader` in `--rp-accent` with "Rassen werden geladen …" (14 muted). The error `Alert` becomes a `--rp-surface` card with radius 24, title "Die Rassen konnten nicht geladen werden." and a "Neu laden" pill.
9. **URL compatibility**: when `/` loads with `?breed=<hash>`, resolve the breed and `navigate("/rasse/{slug}", { replace: true })`. Remove the modal, `useDisclosure`, `onSelectBreed`/`onCloseModal` and the `?breed` write-back.

### Phase 4 — breed detail page (`/rasse/:slug`)

Add `route("/rasse/:slug", "routes/rasse.tsx")` to `app/routes.ts`; page component in `app/pages/Rasse/Rasse.tsx`. It initialises the breeds store the same way the overview does (extract a `useEnsureBreeds()` hook from `Rasseportrait.tsx`). Unknown slug → a small "Rasse nicht gefunden" state with a link back to `/`. Set `document.title = "{name} · Rasseportrait"` (use the route `meta` export). Scroll to top on enter. Reference: `mockups/rasse.html`, `mockups/rasse-mobil.html`.

Delete after migration: `app/components/Modal`, `app/components/BreedDetails` (logic moves into the new page; keep `getTime` only if still used, otherwise replaced by `formatTimecode`), carousel usage in `BreedImages` (keep `useImagePaths`).

**Desktop (≥ md):** grid `640px minmax(0,1fr)`, full viewport height.

- Left: the full-size illustration (`illustration.jpeg`), `object-fit: cover`, 640px wide × `100vh` (sticky, `top: 0`). Back link overlay top/left 24px: pill `--rp-glass` bg, `IconArrowLeft` 18 + "Alle Portraits" 15/700, min-height 44. It goes `navigate(-1)` when the previous entry is the overview (keeps search, sort and scroll), else `/`.
- Right column: padding `72px 72px 48px 64px`, gap 32:
  1. Eyebrow "Rasseportrait · Folge {number}" (14, `--rp-accent-text`). For a non-portrait primary entry use its `meta.public` ("Hörerfrage · Folge 12").
  2. Name (display-xl).
  3. **Variants** (only grouped breeds / breeds with `details.variants`): a row of pills under the name, one per variant (`variant.public`), active = `--rp-text` bg with `--rp-bg` text, inactive `--rp-surface-muted`. Switching changes the image, eyebrow, player, facts and links to that variant's data (the same fallback rules as today's `BreedDetails`: variant `podcast` ?? breed `podcast`, variant `fci` ?? breed `fci`, links = union).
  4. **Player card**: `--rp-surface-muted`, radius 24, padding 24, gap 18. Row: 72px `--rp-accent` circle play link (`IconPlayerPlayFilled` 32 `--rp-on-accent`, `aria-label="Ab 44:50 auf Spotify anhören"`), title = episode title (player-title), subtitle "Tierisch Menschlich · {date long}" (15 muted). Chip row: pill `--rp-bg` with `IconClock` 16 `--rp-accent-text` + "Portrait startet bei 44:50"; then `IconHeadphones` 16 + provider name(s), muted. When the entry has both Spotify and RTL+, the play button uses Spotify and the provider text becomes a link "Auch auf RTL+". Video sources: label "Video auf RTL+".
  5. **More appearances**: when `podcast.length > 1`, a list "Weitere Folgen mit dieser Rasse" below the player card: rows (`--rp-surface` radius 16 padding 12) with a 40px play circle, "{meta.public} · Folge {number}" (15/700) and "{episode} · ab {tc}" (14 muted).
  6. **Fact tiles**: grid 4 columns, gap 12; tile `--rp-surface`, radius 16, padding `16px 18px`; label 13 muted, value fact-value.
     - "FCI-Nummer": `standardNumber`, or "—" with label "Nicht im FCI-Standard".
     - "Gruppe": "{roman} · {short}" (e.g. "I · Hütehunde"), or "Ohne FCI".
     - "Vorgestellt": short date of the primary portrait.
     - "Geraten": "Martin" / "Katharina" + a second line "richtig" / "daneben" (13 muted); when not guessable: "Nicht geraten".
  7. **Links**: outline pills (1px `--rp-line`, radius 999, padding `10px 18px`, 15/700 `--rp-text`) with `IconExternalLink` 16, from `furtherReading` (name as given). `target="_blank" rel="noopener"`.
  8. **Related**: "Auch aus Gruppe {roman}" (display 20/700), up to 3 rows of other display breeds with the same FCI group, newest first: row `--rp-surface` radius 16 padding 10 gap 14; 64px thumbnail radius 10; name 17/700 display; meta "Folge {n} · ab {tc}" 13 muted. Hidden for breeds without FCI group.
  9. **Recognitions** (`breed.recognitions`): last line, 14 muted, `IconHeart` 16 in `--rp-accent-text` + the text(s) as written (they are thank-you notes to contributors).
  10. Not officially presented: image grayscale, plus a pill "Noch nicht offiziell vorgestellt" above the name.

**Mobile (< md):**

- Image full width, height `min(420px, 108vw)`, `object-fit: cover`. Back button: 44px circle `--rp-glass` with `IconArrowLeft`, top/left 16, `aria-label="Zurück zu allen Portraits"`.
- Content padding `24px 16px 140px` (room for the sticky bar), gap 20: eyebrow "Folge 7 · 8. April 2026" (13, `--rp-accent-text`); name 56/0.9; "aus »{episode}«" 16 muted; variant pills; fact tiles as a 2×2 grid (gap 10, tile padding 14) with **"Portrait ab {tc}"** instead of "Vorgestellt"; link pills (wrap); more appearances; related; recognitions.
- **Sticky player bar**: `position: fixed`, left/right 12px, bottom `calc(20px + env(safe-area-inset-bottom))`, `--rp-surface-muted`, radius 999, padding `8px 20px 8px 8px`, gap 12, subtle `box-shadow: 0 8px 24px rgba(27, 23, 18, 0.12)` (the only shadow in the system). 56px play circle, "Ab 44:50 anhören" 16/700, "Spotify · Folge 7" 13 muted.

### Phase 5 — Statistik (`/statistiken`)

Keep the URL; the nav label becomes "Statistik". Rewrite `app/pages/Statistics/Statistics.tsx`; extend `getStatistics` in `app/pages/rasseportrait/utils.ts` (and its tests in `__tests__/utils.getStatistics.test.ts`). Reference: `mockups/statistik.html`, `mockups/statistik-mobil.html`.

- Page head (padding `32px 56px 28px`): "Statistik" (display-page) left, "Stand: Folge {number}, {date long}" (16 muted) right, from the newest portrait.
- Grid (12 columns, gap 24, from md): hero `span 7`, guesses `span 5`, years `span 5`, groups `span 7`, outside-FCI `span 12`. Every card: `--rp-surface`, 1px `--rp-line`, radius 24, padding 36 (20 on mobile), gap 18, starting with an eyebrow.
  1. **FCI-Rasseliste**: "171" (display 120/0.85, -0.05em) + " von 362" (48, muted); "47,24 %" (display 44) right-aligned on the same baseline; bar 22px (`--rp-surface-muted` track, `--rp-accent` fill, both radius 999); caption "Vorgestellte Rassen aus der FCI-Liste: 346 anerkannte und 16 vorläufig anerkannte Rassen." (16 muted). Numbers from `getStatistics`; 362/346/16 stay constants (`AMOUNT_OF_BREEDS_TOTAL` etc.).
  2. **Wer errät die Rasse?**: per host a row "Martin" (display 26/800) ↔ "79,74 %" (display 44), a 14px bar, and "122 von 153 erratbaren Rassen richtig. Der Spanische Wasserhund wird nicht gewertet." (15 muted). Katharina: "1 von 1 erratbaren Rasse richtig." (singular when 1). 1px `--rp-line` divider between hosts. Keep the existing Spanish Water Dog caveat logic.
  3. **Portraits pro Jahr** (new): heading "Seit {Monat Jahr of first portrait} im Podcast" (card-title); vertical bars per year from the first to the current year: bar width 64, gap 28, max height 160, radius `12px 12px 4px 4px`, value above (display 18/700), year below (14 muted). The **current, incomplete year** is drawn as `--rp-surface-muted` with a 2px dashed `--rp-accent` border and the note "{year} bis {Monat}, gestrichelt." New util `getPortraitsPerYear(breeds)` counting presented breeds by the year of their first portrait `airDate`.
  4. **Portraits je FCI-Gruppe** (new): heading = the two leading groups ("Molosser und Hütehunde vorn" — generate from the data: "{short A} und {short B} vorn"); rows for groups I–X: grid `36px 320px minmax(0,1fr) 36px`, gap 12: roman (display 15/700 muted), long name (15), 12px bar relative to the maximum, count (display 16/700). Caption "Dazu {n} Rassen ohne FCI-Anerkennung." New util `getPortraitsPerFciGroup(breeds)`.
  5. **Außerhalb der FCI-Liste vorgestellt**: chips (`--rp-surface-muted`, radius 999, padding `9px 16px`, 15/700) linking to `/rasse/{slug}`; divider; eyebrow "Erwähnt, noch nicht vorgestellt" + chips of `breedsNotPresented`. Mobile shows the first 8 chips and a "+ {n} weitere" chip that expands the list.
- Mobile: single column; "Portraits pro Jahr" becomes horizontal bars (grid `44px 1fr 30px`); the FCI-group card may be hidden below `sm` or rendered as the same horizontal rows with the short name.
- Remove the stats page's own `Modal` usage; chips navigate to the detail page.

### Phase 6 — Hundewissen (`/hundewissen?topic=…`)

Files: `app/pages/Hundewissen/Hundewissen.tsx`, `app/components/KnowledgeContent`, `types/knowledge.ts`, `db/knowledge/*.ts`, `scripts/compileKnowledgeData.cjs` (only if it whitelists fields). Reference: `mockups/hundewissen.html`, `mockups/hundewissen-mobil.html`.

- Data: add `summary: string` (one line for the topic list, table in § 10.4) and `status: "draft" | "published"` to `KnowledgeTopic`. Set all seven topics to `"draft"` and **remove** the sentence "Hier werden in Zukunft detaillierte Informationen zu diesem wichtigen Thema zusammengetragen." from every `content`. Run `npm run build:knowledge`.
- Head: "Hundewissen" (display-page) + intro "Hintergründe zu Themen, die im Podcast immer wieder vorkommen." (19/1.5 muted, max-width 640).
- Desktop: grid `400px minmax(0,1fr)`, gap 40, `align-items: start`.
  - Topic list (`<nav aria-label="Themen">`): each topic a link (`?topic=<id>`, `aria-current` on the active one), padding `16px 18px`, radius 18, gap 4: title (display 20/700) with `IconArrowRight` 18 at the right (active `--rp-accent-text`, others muted) and the summary (14/1.4 muted). Active item: `--rp-surface` with 1px `--rp-line`; others transparent.
  - Article: `--rp-surface`, 1px `--rp-line`, radius 28, padding `48px 56px`, gap 26. Row: eyebrow "Thema {i} von {n}" + status pill "Wird gerade recherchiert" (only for `draft`; `--rp-surface-muted`, 8px `--rp-accent` dot, 14/700). Title (display-m). Content paragraphs split on blank lines, 19/1.6, max-width 680. Keep `white-space` handling so single line breaks inside a paragraph do **not** render as breaks (the source files wrap at ~100 characters).
  - Episodes: when `podcast.length > 0`, list them like "Weitere Folgen" rows (phase 4.5). When empty: a box `--rp-surface-muted`, radius 20, padding `20px 24px`: 48px `--rp-surface` circle with `IconHeadphones` 22 `--rp-accent-text`, "Noch keine Folgen verknüpft" (display 19/700) and "Kennst du eine Stelle im Podcast zu diesem Thema? Schreib an rasseportrait@tobiaswinkler.berlin." with the address as a `mailto:` link.
  - Further reading: outline pills as on the detail page; omit the section entirely when empty (no empty headings).
- Mobile: the topic list becomes a horizontally scrollable row of pills (15/700, padding `10px 16px`; active `--rp-accent` bg with `--rp-on-accent`; others `--rp-surface-muted`), scroll the active one into view. Article card radius 24, padding `24px 20px`, title 42.

### Phase 7 — Impressum and cleanup

- Impressum (not mocked): container 960px, page title "Impressum" (display-page, 52 on mobile), the two sections as `--rp-surface` cards (1px `--rp-line`, radius 24, padding 36 / 20) with `h2` in display 30/800. Links: `--rp-accent-text`, underline, `text-underline-offset: 3px`. Keep the text unchanged.
- Remove now-unused code: `Menu` (sort block), `SortControls`, `Modal`, old `BreedDetails`, `BreedCard/styles.css` glass plate, `@mantine/carousel` + `embla-carousel*` **if** no longer imported (the variant pills replace carousels), the Inter link, `public/logo.png` usage in the header (keep the file; it may be used elsewhere, e.g. social previews).
- Performance (recommended, not visual): load `@amplitude/plugin-session-replay-browser` only when the session is sampled (`Math.random() < 0.1` before the dynamic import) so 90% of visitors skip the 57 KB `rrweb` chunk.

---

## 7. Component inventory (new → where used)

| Component | Replaces | Used on |
|---|---|---|
| `Header`, `NavDrawer` | `Menu`, `AppShell.Header` | all pages except detail |
| `HeroPortrait` | — | overview |
| `SortControl` | drawer sort block, `SortControls` | overview |
| `BreedSearch` (restyled) | `BreedSearch` | overview |
| `PortraitCard`, `BreedCardSkeleton` | `BreedCard`, skeleton | overview, (related rows use a compact variant) |
| `PlayButton` (sizes 40 / 56 / 64 / 72) | — | card, hero, player card, sticky bar |
| `PlayerCard`, `StickyPlayer` | episode card in `BreedDetails` | detail |
| `FactTile` | FCI text block | detail |
| `LinkPill` | `ActionIcon` further-reading chips | detail, Hundewissen |
| `RelatedBreeds` | — | detail |
| `StatCard`, `ProgressBar`, `YearChart`, `GroupBars`, `Chip` | Statistics cards, blue badges | Statistik |
| `TopicList`, `TopicTabs`, `StatusPill`, `EmptyEpisodes` | Mantine `Tabs`, empty sections | Hundewissen |

Style with CSS Modules (`*.module.css`) using the `--rp-*` variables; use Mantine components where they bring behaviour (Drawer, Menu, SegmentedControl, Loader, SimpleGrid) and restyle them via `classNames`.

## 8. Copy deck (German, exact)

| Key | Text |
|---|---|
| Nav | Portraits · Hundewissen · Statistik · Impressum |
| Hero pill | Neues Portrait |
| Hero play | Portrait ab {tc} anhören / Öffnet Spotify an der richtigen Stelle |
| Guess | {Martin|Katharina} lag richtig · {…} lag daneben |
| Section | Alle {n} Portraits · {n} Treffer für »{needle}« |
| Search | Label: Rassen durchsuchen · Placeholder: Rasse oder FCI-Nummer |
| Sort | Neueste · A–Z · FCI-Nummer |
| Card meta | Folge {n} · ab {tc} · {n} Varianten · Noch nicht vorgestellt |
| Detail back | Alle Portraits |
| Detail eyebrow | Rasseportrait · Folge {n} |
| Player | Portrait startet bei {tc} · Tierisch Menschlich · {date} · Auch auf RTL+ |
| Mobile sticky | Ab {tc} anhören · {Provider} · Folge {n} |
| Facts | FCI-Nummer · Gruppe · Vorgestellt · Portrait ab · Geraten · Nicht im FCI-Standard · Ohne FCI · Nicht geraten · richtig · daneben |
| More | Weitere Folgen mit dieser Rasse · Auch aus Gruppe {roman} |
| Not found | Keine Rasse gefunden · Für »{needle}« gibt es noch kein Portrait. Suche nach einem anderen Namen oder einer FCI-Nummer. · Suche zurücksetzen |
| Statistik | Statistik · Stand: Folge {n}, {date} · FCI-Rasseliste · Wer errät die Rasse? · Portraits pro Jahr · Seit {Monat Jahr} im Podcast · Portraits je FCI-Gruppe · Außerhalb der FCI-Liste vorgestellt · Erwähnt, noch nicht vorgestellt |
| Hundewissen | Hintergründe zu Themen, die im Podcast immer wieder vorkommen. · Thema {i} von {n} · Wird gerade recherchiert · Noch keine Folgen verknüpft |

Keep "Rasseportrait" (one word) as the product name, "Tierisch Menschlich" for the podcast, no exclamation marks, no emoji.

## 9. Decisions for cases the mockups do not show

1. **Detail is a page, not a modal.** Shareable URLs (`/rasse/border-collie`), the browser back button works, and the illustration gets real size. Old `?breed=<hash>` links redirect (phase 3.9).
2. **The card play button plays; the card opens the detail.** Two separate links, never nested.
3. **Spotify first.** It supports the `?t=` timecode; RTL+ is secondary. Keep this in `getListenUrl`.
4. **No carousels.** Variants are pills on the detail page; cards show the first variant.
5. **Multiple appearances** are listed under the player card; the primary one is the `portrait` entry.
6. **Recognitions** stay visible, as a quiet thank-you line at the end of the detail page (the rotated heart badge goes).
7. **Hero shows the newest portrait** by `airDate` and hides during search.
8. **No dark mode** in this version.
9. **The dog head stays** as the only image logo; the wordmark is live text.
10. **Illustrations are never cropped** except the mobile hero (4:3) and the detail page's full-height left column (`cover`).

## 10. Reference data

### 10.1 Breakpoint behaviour summary

| Width | Grid cols | Header | Detail | Statistik |
|---|---|---|---|---|
| < 48em | 2 | burger | stacked + sticky bar | single column |
| 48–62em | 3 | burger | stacked + sticky bar | single column |
| 62–88em | 4 | pill nav | 2 columns (image 45% instead of 640px below 1280px) | 12-col grid |
| ≥ 88em | 5 | pill nav | 640px + content | 12-col grid |

### 10.2 Sizes

Play buttons: 40 (card), 56 (mobile sticky, "weitere Folgen" 40), 64 (hero), 72 (player card). Hero image 520. Detail image column 640. Related thumbnail 64. Progress bars: 22 (hero stat), 14 (guesses), 12 (groups). Header logo 38×32 / 30×25.

### 10.3 FCI group labels

| # | Roman | Short | Long |
|---|---|---|---|
| 1 | I | Hütehunde | Hüte- und Treibhunde |
| 2 | II | Molosser | Pinscher, Schnauzer, Molosser, Sennenhunde |
| 3 | III | Terrier | Terrier |
| 4 | IV | Dachshunde | Dachshunde |
| 5 | V | Spitze | Spitze und Hunde vom Urtyp |
| 6 | VI | Laufhunde | Laufhunde und Schweißhunde |
| 7 | VII | Vorstehhunde | Vorstehhunde |
| 8 | VIII | Apportierhunde | Apportier-, Stöber- und Wasserhunde |
| 9 | IX | Begleithunde | Gesellschafts- und Begleithunde |
| 10 | X | Windhunde | Windhunde |

### 10.4 Hundewissen summaries

| id | summary |
|---|---|
| hundesprache | Wie Hunde mit Körper, Mimik, Lauten und Gerüchen kommunizieren. |
| jagdhunde | Geruchssinn, Apportierfreude, Spurarbeit und was die Haltung verlangt. |
| medizin | Impfungen, Parasiten, häufige Erkrankungen und Erste Hilfe. |
| qualzuchten | Wenn äußere Merkmale wichtiger sind als die Gesundheit des Hundes. |
| schutzhunde | Ausbildung, Verantwortung und die Anforderungen im Hundesport. |
| silvester | Wie man Hunden durch Lärm, Feuerwerk und Angst hilft. |
| tierversuche | Experimente an Hunden in Forschung und Medikamentenentwicklung. |

## 11. Analytics (Amplitude)

Keep all existing events that still have a UI (`Breed Search Performed`, `Sort Changed`, `Logo Clicked`, page nav clicks, `Knowledge …`). Remove `Breed Modal Closed`, `Breed Card Image Slide Changed`, `Breed Details Image Slide Changed`. Add, typed in `useAmplitude`:

| Event | Properties |
|---|---|
| `Play Clicked` | `breedId`, `breedName`, `placement` (`hero` / `card` / `detail` / `sticky` / `more`), `provider`, `episodeNumber`, `timecode` |
| `Breed Page Viewed` | `breedId`, `breedName`, `slug`, `referrer` (`grid` / `hero` / `related` / `statistics` / `direct`) |
| `Variant Selected` | `breedId`, `variantName`, `index` |
| `Related Breed Clicked` | `fromBreedId`, `toBreedId` |
| `Further Reading Link Clicked` | unchanged properties |

## 12. Tests

Update: `BreedCard.test.tsx` (→ `PortraitCard`), `BreedSearch.test.tsx` (labels), `Rasseportrait.url-params.test.tsx` (`?breed=` now redirects to `/rasse/:slug`), `Rasseportrait.integration.test.tsx`, `Rasseportrait.test.tsx`, `utils.getStatistics.test.ts`.

Add: `format.test.ts` (timecode, dates, percent), `breedSlug` uniqueness over the real `public/data/breeds.json`, `getListenUrl` (Spotify `?t=`, RTL fallback), `getPortraitsPerYear`, `getPortraitsPerFciGroup`, Rasse page (renders name, player link with the right URL, facts, variant switching, unknown slug), Header (active state, drawer on small screens), Hundewissen (draft pill, empty-episodes box, no empty headings).

## 13. Definition of done

1. `npm run typecheck`, `npm test`, `npm run build` pass; `build/client/404.html` exists.
2. `npm run dev`, then compare each screen with its mockup at **1440×900** and **390×844** (Playwright or the browser): overview, `/rasse/border-collie`, `/statistiken`, `/hundewissen?topic=qualzuchten`. Layout, sizes, colours and copy match; data differs where the dataset has changed.
3. No Mantine blue anywhere (search the built CSS for `#228be6` usage in rendered elements; the focus ring is orange-brown).
4. Keyboard: Tab reaches header links, search, sort, every card link and every play button in a sensible order; focus ring visible on all grounds; Enter opens a card; the drawer traps focus and closes on Escape.
5. Contrast: no text below 4.5:1 (3:1 for ≥ 24px), icons and focus rings ≥ 3:1, checked with the pairs in § 4.1.
6. Direct loads of `/rasseportrait/hundewissen`, `/rasseportrait/statistiken`, `/rasseportrait/impressum`, `/rasseportrait/rasse/border-collie` work on the deployed site (after release).
7. Old link `/rasseportrait/?breed=<hash>` lands on the matching `/rasse/<slug>`.
8. Lighthouse (mobile) on the overview: no regressions against 3.16.0 for LCP and CLS (hero image is `eager` + `fetchpriority="high"`; skeletons keep the grid from shifting).

## 14. Out of scope

Dark theme, new content for Hundewissen topics, responsive image sizes (`srcset`/WebP/AVIF, recommended as a follow-up: the 500px thumbnails are served to 180px mobile cards), a real audio player (all play buttons link out to Spotify/RTL+), changes to the data model beyond `summary`/`status` on knowledge topics.
