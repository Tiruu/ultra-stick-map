# Ultra Stick Map

A community mapping web app for discovering and sharing physical sticks and points of interest.

[**Live demo →**](https://ultra-stick-map.vercel.app)

> **Status:** V1 — functional and ready for public testing

## What is Stick Map?

Stick Map is a community map built around physical stickers and other user-contributed points.

Users can discover points on the map, add new ones, and help keep information up to date by confirming that a stick is still present or reporting that it has disappeared.

Because the data is community-contributed, information may be incomplete, outdated or incorrect.

## Core features

- Interactive map with MapLibre GL
- Community-contributed sticks and points
- User accounts and authentication
- User profiles and community interactions
- Confirmation and disappearance reports
- Moderation workflow
- Geolocation and map interactions
- Persistent database-backed data
- Bot protection with Cloudflare Turnstile
- Analytics and performance monitoring

## Tech stack

**Frontend**
- React
- TypeScript
- Vite
- MapLibre GL

**Backend / data**
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase client

**Other**
- Turf
- Cloudflare Turnstile
- Vercel Analytics
- Vercel Speed Insights
- ESLint / Prettier
- Git / GitHub

## Architecture

```text
React + TypeScript
        │
        ├── MapLibre
        │
        ├── Supabase Auth
        │
        └── Supabase / PostgreSQL
                │
                ▼
          Community data
```

React handles the interface and client-side interactions, while Supabase provides authentication, persistence and database-backed features.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

Format the source:

```bash
npm run format
```

## Environment variables

Create a local environment file with the values required by the Supabase and Turnstile integrations.

Do not commit private credentials or service-role keys.

## Current status

Stick Map V1 focuses on delivering a functional community mapping experience with authentication, user contributions, moderation and basic anti-abuse protections.

Further features and improvements can be considered for future versions.
