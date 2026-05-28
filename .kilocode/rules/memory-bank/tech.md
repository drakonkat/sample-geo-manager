# Technical Context: GeoGest - Gestionale Geometri

## Technology Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.x    | React framework with App Router |
| React        | 19.x    | UI library                      |
| TypeScript   | 5.9.x   | Type-safe JavaScript            |
| Tailwind CSS | 4.x     | Utility-first CSS               |
| Bun          | Latest  | Package manager & runtime       |
| Drizzle ORM  | 0.45.x  | Database ORM for SQLite         |
| bcryptjs     | 3.x     | Password hashing                |
| uuid         | 14.x    | Session ID generation           |
| clsx         | 2.x     | Conditional class names         |

## Development Commands

| Command | Purpose |
|---------|---------|
| `bun install` | Install dependencies |
| `bun build` | Production build |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript type checking |
| `bun db:generate` | Generate Drizzle migrations |
| `bun db:migrate` | Run migrations (local only) |

## Project Configuration

### Next.js Config
- `output: "standalone"` for Docker deployment

### Database
- SQLite via Drizzle ORM
- Uses `@kilocode/app-builder-db` for sandbox database
- Schema: users, sessions, clienti, pratiche, documenti
- Migrations auto-run in sandbox after push

### Authentication
- Cookie-based sessions (httpOnly, secure in production)
- Session duration: 7 days
- bcryptjs for password hashing (12 rounds)

## File Structure

```
/
├── .dockerignore
├── .gitignore
├── Dockerfile              # Multi-stage Bun build for Coolify
├── drizzle.config.ts
├── package.json
├── next.config.ts          # standalone output
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── public/
│   └── uploads/            # User-uploaded files (persistent volume needed)
├── src/
│   ├── app/                # Next.js App Router pages + API
│   ├── components/         # React components
│   ├── lib/                # Utilities
│   ├── db/                 # Database schema + migrations
│   └── middleware.ts       # Auth routing
└── .kilocode/              # AI context & recipes
```

## Deployment

### Dockerfile (Coolify)
- Base: `oven/bun:1`
- Multi-stage build (deps → build → run)
- Standalone Next.js output
- Runs as non-root user (nextjs:nodejs)
- Requires persistent volume for `public/uploads/`
- Environment: `NODE_ENV=production`, `PORT=3000`

### Environment Variables
- `DB_URL`, `DB_TOKEN` — auto-provided by sandbox
- `NODE_ENV` — set to `production` in Dockerfile
- No additional env vars required for base functionality
