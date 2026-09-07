# Ultra Stick Map

A community mapping web app for discovering and sharing places related to stickers.

[**Live demo →**](https://ultra-stick-map.vercel.app)

> **Status:** Active development

## What I built

Stickmap started as a way to go beyond isolated frontend exercises and build a complete web application around a concrete community use case.

The application combines an interactive map, user accounts, profiles and community contributions with persistent database-backed data.

### Core features

- Interactive map with MapLibre GL
- Place / point-of-interest discovery
- User accounts and authentication
- User profiles
- Community contributions
- Persistent database-backed data
- Geolocation and map interactions
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

## Why this project matters

This project is currently my main web development project. It gives me practical experience with the parts of a modern web application that are easy to avoid in small exercises: authentication, persistent data, user-generated content, map interactions, external services and deployment.

It is also where I am deepening my React and TypeScript skills by solving real implementation and architecture problems as the application grows.

## Current status

Stickmap is still evolving and the codebase remains public as both a working application and a record of the project's development.
