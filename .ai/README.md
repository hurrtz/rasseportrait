# Project Context for AI Assistants

This file provides guidance to AI coding assistants (Cursor, Windsurf, Warp, Cline, etc.) when working with code in this repository.

## Project Overview

**rasseportrait** is a React + TypeScript fan website cataloging dog breed episodes ("Rasseportrait") from the "Tierisch Menschlich" podcast by Martin Rütter and Katharina Adick. The application features breed data, podcast episode links with timecodes, FCI classifications, and AI-generated breed images.

## Essential Commands

```bash
# Development
npm run dev              # Start React Router development server
npm run build            # Build for production (GitHub Pages)
npm run typecheck        # TypeScript checking + React Router typegen
npm test                 # Run Jest tests

# Data compilation
npm run build:data       # Compile breed data to JSON
npm run build:knowledge  # Compile knowledge topics to JSON
npm run build:images     # Copy breed illustrations

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
- **Routes**: File-based routing in `/app/routes/` (rasseportrait, hundewissen, imprint, statistics)

### Data Architecture

#### Breed Data

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

#### Knowledge Topics

Knowledge topics are stored in `/db/knowledge/` with one TypeScript file per topic:

```typescript
interface KnowledgeTopic {
  id: string;
  title: {
    internal: string;
    public: string;
  };
  description: string;
  content: string;
  podcast: Podcast[];  // Reuses Podcast type from breeds
  furtherReading: FurtherReading[];  // Reuses FurtherReading type
}
```

Topics include:
- Qualzuchten (torture breeding)
- Tierversuche (animal testing)
- Jagdhunde (hunting dogs)
- Schutzhunde (protection dogs)
- Hundesprache (dog language)
- Medizin (medicine)
- Silvester (New Year's Eve)

### State Management

**Breeds Store** (`app/stores/breeds.ts`) centralizes breed data and provides:
- Search functionality with fuzzy matching
- Sorting by name, FCI number, or air date
- Filtering by breed characteristics
- Selected breed state for detail views

**Knowledge Store** (`app/stores/knowledge.ts`) manages knowledge topics:
- Topic initialization from compiled JSON
- Selected topic state management
- Loading and error states
- Custom hooks for all state values

### Images & Media

- **BreedImages component**: Implements carousel functionality for breed photos
- **AI-generated images**: Midjourney-created breed illustrations
- **Video/audio sources**: Podcast episodes with timecode metadata

### Analytics

Amplitude tracks user interactions:
- **Breed interactions**: searches, selections, carousel navigation
- **Knowledge interactions**: topic selections, podcast episode clicks, further reading clicks
- **General**: external link clicks
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
4. **Knowledge topics**: Each topic file must export a default object satisfying the `KnowledgeTopic` interface
5. **Images**: Breed images follow naming convention based on breed ID/internal name
6. **Analytics**: Avoid logging PII in Amplitude events
7. **Data compilation**: Run `npm run build:knowledge` after adding/modifying knowledge topics

## Quick Verification

Before deploying changes:
```bash
npm run typecheck        # TypeScript checking + React Router typegen
npm test                 # Runs test suite
npm run build:knowledge  # Compile knowledge topics (if modified)
npm run build            # Verifies production build
```

The build should complete without errors and generate assets compatible with the `/rasseportrait/` base path for GitHub Pages deployment.

## Hundewissen Section

The Hundewissen (Dog Knowledge) section provides educational content organized by topics:

### Layout
- **Desktop**: Two-column layout with sticky sidebar navigation (3-9 grid ratio)
- **Mobile**: Vertical stack with topic selector at top
- **Navigation**: URL-based with `?topic=` parameter for deep linking

### Components
- **`app/pages/Hundewissen/Hundewissen.tsx`**: Main page with TableOfContents and responsive layout
- **`app/components/KnowledgeContent/KnowledgeContent.tsx`**: Displays individual topic content with:
  - Title and description
  - Main content with markdown-style formatting
  - Podcast episodes with timecodes and badges
  - Further reading links

### Adding Content

To add or modify knowledge topics:
1. Edit files in `/db/knowledge/[topic-id]/index.ts`
2. Add podcast episodes and further reading links as needed
3. Run `npm run build:knowledge` to recompile
4. Test with `npm run dev` and navigate to `/hundewissen`
