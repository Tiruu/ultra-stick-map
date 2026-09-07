# Stickmap

A community map for discovering and sharing places related to stickers.

The project is a full web application built to experiment with **React, TypeScript, Supabase and MapLibre** while solving a concrete community-oriented problem.

> **Status:** Active development

## Features

- Interactive map
- Place / point-of-interest discovery
- User accounts
- User profiles
- Community contributions
- Database-backed data
- MapLibre rendering
- Geolocation / map interactions
- Bot protection with Cloudflare Turnstile
- Analytics and performance monitoring

## Tech stack

### Frontend

- React
- TypeScript
- Vite
- MapLibre GL

### Backend / services

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase client

### Other

- Turf
- Cloudflare Turnstile
- Vercel Analytics
- Vercel Speed Insights
- ESLint
- Prettier
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

The application is intentionally client-heavy: React handles the UI and interactions while Supabase provides authentication, persistence and database-backed features.

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

## Live demo

[Open the application](https://ultra-stick-map.vercel.app)

## Why I built it

Stickmap is a project where I wanted to go beyond isolated frontend exercises.

The goal was to build a real application with:

- authentication
- persistent data
- user-generated content
- an interactive map
- multiple external services
- deployment
- production-oriented tooling

It is also a way for me to deepen my React and TypeScript skills through a project that is large enough to expose real architectural problems.

## Current status

The project is still evolving.

The codebase is intentionally public so that the project can serve as both a working application and a record of my progress as a developer.
