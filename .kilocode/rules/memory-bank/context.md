# Active Context: GeoGest - Gestionale Geometri

## Current State

**Application Status**: ✅ Core features implemented and passing typecheck/lint

GeoGest is a web-based management system for surveying firms (studi di geometri). It supports multi-user access with role-based permissions (admin, geometra, cliente) and document sharing per practice/case.

## Recently Completed

- [x] Modern UI redesign: indigo/slate design system across all pages
- [x] Gradient sidebar (slate-950), modern cards with shadows (rounded-2xl)
- [x] Split-layout login/register with branded panel + glass card
- [x] Dashboard with gradient stat cards, modern table styling
- [x] Pratiche page with rounded-full filter pills, skeleton loading
- [x] FileUpload with indigo accents, scale animation on drag
- [x] Status badges: emerald (aperta), amber (in corso), slate (sospesa), indigo (chiusa)
- [x] Seed script (`src/db/seed.ts`) with 3 users, 4 clienti, 6 pratiche
- [x] API seed endpoint (`/api/seed`) for browser-based seeding (idempotent)
- [x] All pages restyled: clienti, utenti (card grid), mio-account, portal
- [x] All TypeScript and ESLint checks passing

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/db/schema.ts` | Database table definitions | ✅ |
| `src/db/index.ts` | Database client | ✅ |
| `src/db/seed.ts` | Seed script with demo data | ✅ NEW |
| `src/db/migrate.ts` | Migration script | ✅ |
| `src/lib/auth.ts` | Authentication utilities | ✅ |
| `src/lib/utils.ts` | Shared utilities (formatting, labels) | ✅ |
| `src/middleware.ts` | Auth routing middleware | ✅ |
| `src/components/ui/` | Button, Card, Input, Select, Badge | ✅ Modern |
| `src/components/layout/` | Sidebar, Header | ✅ Modern |
| `src/components/FileUpload.tsx` | Drag & drop file upload | ✅ Modern |
| `src/app/login/page.tsx` | Login page | ✅ Modern split-layout |
| `src/app/register/page.tsx` | Registration page | ✅ Modern split-layout |
| `src/app/(dashboard)/` | Admin/Geometra area | ✅ Modern |
| `src/app/(cliente)/portal/` | Client portal | ✅ Modern |
| `src/app/api/auth/` | Login, register, logout, update-profile | ✅ |
| `src/app/api/seed/route.ts` | Database seeding endpoint | ✅ NEW |
| `Dockerfile` | Coolify deployment | ✅ |

## Database Schema

- **users**: id, name, email, passwordHash, role (admin/geometra/cliente), createdAt
- **sessions**: id, userId, expiresAt
- **clienti**: id, nome, cognome, email, telefono, indirizzo, codiceFiscale, userId, createdAt
- **pratiche**: id, titolo, descrizione, stato, indirizzo, foglio, particella, sub, clienteId, geometraId, createdAt, updatedAt
- **documenti**: id, nome, filename, mimeType, dimensione, praticaId, caricatoDa, visibileAlCliente, createdAt

## User Roles

| Role | Access |
|------|--------|
| **admin** | Full access: dashboard, pratiche, clienti, utenti, settings |
| **geometra** | Dashboard, pratiche (own), clienti, settings |
| **cliente** | Portal: view assigned practices and shared documents only |

## Deployment

- Dockerfile uses `oven/bun:1` base, multi-stage build, standalone output
- Designed for Coolify deployment
- Uploads stored in `public/uploads/` (requires persistent volume in production)

## Pending Improvements

- [ ] Add edit/delete functionality for clienti
- [ ] Add search and pagination
- [ ] Email notifications
- [ ] Assign geometra to pratica from UI
- [ ] Document categories/tags
- [ ] Activity log
- [ ] Backup system

## Session History

| Date | Changes |
|------|---------|
| 2026-05-28 | Initial GeoGest build: full gestionale with auth, pratiche, documenti, clienti, portal, Dockerfile |
| 2026-05-28 | Modern UI redesign (indigo/slate), seed data (3 users, 4 clienti, 6 pratiche), /api/seed endpoint |
