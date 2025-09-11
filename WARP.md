# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**rasseportrait** is a React + TypeScript fan website cataloging dog breed episodes ("Rasseportrait") from the "Tierisch Menschlich" podcast by Martin Rütter and Katharina Adick. The application features breed data, podcast episode links with timecodes, FCI classifications, and AI-generated breed images.

## Essential Commands

```bash
# Development
npm run dev              # Start React Router development server
npm run build            # Build for production (GitHub Pages)
npm run typecheck        # TypeScript checking + React Router typegen
npm test                 # Run Jest tests

# Release workflow
npm run release:patch    # Patch version bump, changelog, tag
npm run release:minor    # Minor version bump, changelog, tag
npm run release:major    # Major version bump, changelog, tag
```

## Architecture

### Tech Stack
- **Framework**: React 19 with TypeScript (strict mode)
- **Router**: React Router v7 (SPA mode, no SSR)
- **UI Library**: Mantine UI components
- **State**: Zustand store for breed data management
- **Build**: Vite with compression plugins
- **Testing**: Jest with ts-jest transform
- **Analytics**: Amplitude integration

### Key Configuration
- **Base path**: `/rasseportrait/` (GitHub Pages deployment)
- **Path alias**: `~/*` maps to `./app/*`
- **Routes**: File-based routing in `/app/routes/` (rasseportrait, imprint, statistics)

### Data Architecture

Breed data is stored in `/db/breeds/` with one TypeScript file per breed. Each breed follows this schema:

```typescript
interface Breed {
  id: number | string;
  details: {
    internal: string;
    public: string[];
    variants?: Variant[];
    groupAs?: string;
  };
  classification: {
    fci: {
      group: number;
      section: number;
      standardNumber: number;
    } | undefined;
  };
  podcast: {
    number: number | string;
    episode: string;
    sources: { url: string; type: "video" | "audio" }[];
    meta: {
      internal: string;
      public: string;
      timecode: number;
      airDate: string;
      isGuessable?: boolean;
      isGuessedCorrectly?: boolean;
      guessedBy?: "mr" | "ka";
    };
  }[];
  furtherReading: {
    name: string;
    url: string;
  }[];
}
```

### State Management

The Zustand store (`app/stores/breeds.ts`) centralizes breed data and provides:
- Search functionality with fuzzy matching
- Sorting by name, FCI number, or air date
- Filtering by breed characteristics
- Selected breed state for detail views

### Images & Media

- **BreedImages component**: Implements carousel functionality for breed photos
- **AI-generated images**: Midjourney-created breed illustrations
- **Video/audio sources**: Podcast episodes with timecode metadata

### Analytics

Amplitude tracks user interactions:
- Breed searches and selections
- Image carousel navigation
- Podcast episode clicks
- External link clicks
- API key sourced from `VITE_AMPLITUDE_API_KEY` environment variable or fallback

## Development Workflow

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Path aliases configured (`~/*` → `./app/*`)
- React Router v7 typegen integrated with `typecheck` script

### Code Quality
- **Husky**: Pre-commit hooks run Prettier formatting
- **Commitlint**: Enforces Conventional Commits (feat, fix, docs, etc.)
- **ESLint**: TypeScript + React rules with Prettier integration

### Testing
- Jest with ts-jest transform
- Tests located alongside components
- Coverage collection configured

### Build & Deploy
- Vite build with gzip + Brotli compression
- GitHub Pages deployment with `/rasseportrait/` base path
- SPA mode with client-side routing

## Critical Notes

1. **Router typegen**: Run `npm run typecheck` after route changes to update types
2. **Base path alignment**: Ensure Vite config base (`/rasseportrait/`) matches React Router basename
3. **Breed data**: Each breed file must export a default object satisfying the `Breed` interface
4. **Images**: Breed images follow naming convention based on breed ID/internal name
5. **Analytics**: Avoid logging PII in Amplitude events

## Quick Verification

Before deploying changes:
```bash
npm run typecheck  # TypeScript checking + React Router typegen
npm test           # Runs test suite
npm run build      # Verifies production build
```

The build should complete without errors and generate assets compatible with the `/rasseportrait/` base path for GitHub Pages deployment.
