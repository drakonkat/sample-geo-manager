# Active Context: GeoGest - Gestionale Geometri

## Current State

**Application Status**: ✅ All features implemented, typecheck passing, 22 E2E tests passing

GeoGest is a web-based management system for surveying firms (studi di geometri). It supports multi-user access with role-based permissions (admin, geometra, cliente), document sharing per practice/case, ticket system, and multi-client association.

## Recently Completed

- [x] Fixed Next.js version incompatibility (downgraded from ^16.1.3 to 15.5.18 for OpenNext)
- [x] Added `pratiche_clienti` junction table for multi-client association
- [x] Added `tickets` table for client support requests
- [x] Multi-client selection on pratica detail page (checkbox UI)
- [x] Tickets page for geometra/admin with status filters and management
- [x] Client portal tickets section with ticket creation form
- [x] Admin user creation form on utenti page (creates geometri)
- [x] "Crea Account" button on clienti page to create system users for clients
- [x] Dashboard updated with ticket stats and recent tickets
- [x] Sidebar updated with Ticket nav item
- [x] 13 new E2E tests for all new features (22 total passing)
- [x] Modern UI redesign: indigo/slate design system across all pages

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/db/schema.ts` | Database table definitions (7 tables) | ✅ |
| `src/db/index.ts` | Database client | ✅ |
| `src/db/seed.ts` | Seed script with demo data | ✅ |
| `src/lib/auth.ts` | Authentication utilities | ✅ |
| `src/lib/utils.ts` | Shared utilities (formatting, labels, ticket labels) | ✅ |
| `src/middleware.ts` | Auth routing middleware | ✅ |
| `src/components/ui/` | Button, Card, Input, Select, Badge | ✅ |
| `src/components/layout/` | Sidebar, Header | ✅ |
| `src/components/FileUpload.tsx` | Drag & drop file upload with visibility toggle | ✅ |
| `src/app/(dashboard)/tickets/page.tsx` | Tickets management (geometra/admin) | ✅ NEW |
| `src/app/(cliente)/portal/pratiche/[id]/TicketForm.tsx` | Client ticket creation form | ✅ NEW |
| `src/app/api/tickets/` | Tickets CRUD API | ✅ NEW |
| `src/app/api/clienti/[id]/user/` | Create user account for client | ✅ NEW |
| `src/app/api/utenti/route.ts` | User management (GET + POST) | ✅ UPDATED |
| `src/app/api/pratiche/` | Pratiche API (multi-client support) | ✅ UPDATED |
| `src/app/api/pratiche/[id]/route.ts` | PATCH/DELETE with clientiIds | ✅ UPDATED |
| `e2e/features.spec.ts` | E2E tests for new features | ✅ NEW |
| `e2e/login.spec.ts` | Login flow E2E tests | ✅ |

## Database Schema

- **users**: id, name, email, passwordHash, role (admin/geometra/cliente), createdAt
- **sessions**: id, userId, expiresAt
- **clienti**: id, nome, cognome, email, telefono, indirizzo, codiceFiscale, userId, createdAt
- **pratiche**: id, titolo, descrizione, stato, indirizzo, foglio, particella, sub, clienteId, geometraId, createdAt, updatedAt
- **pratiche_clienti**: id, praticaId, clienteId (UNIQUE constraint)
- **documenti**: id, nome, filename, mimeType, dimensione, praticaId, caricatoDa, visibileAlCliente, createdAt
- **tickets**: id, titolo, messaggio, stato (aperto/in_lavorazione/risolto), praticaId, clienteId, geometraId, createdAt, updatedAt

## User Roles

| Role | Access |
|------|--------|
| **admin** | Full access: dashboard, pratiche, clienti, utenti (create geometri), tickets, settings |
| **geometra** | Dashboard, pratiche (own), clienti, tickets (own), settings |
| **cliente** | Portal: view assigned practices, shared documents, create tickets |

## Deployment

- Dockerfile uses `oven/bun:1` base, multi-stage build, standalone output
- Designed for Coolify deployment
- Uploads stored in `public/uploads/` (requires persistent volume in production)

## Pending Improvements

- [ ] Add edit/delete functionality for clienti
- [ ] Add search and pagination
- [ ] Email notifications
- [ ] Document categories/tags
- [ ] Activity log
- [ ] Backup system
- [ ] Fix ESLint compatibility (pre-existing issue with @rushstack/eslint-patch)

## Session History

| Date | Changes |
|------|---------|
| 2026-05-28 | Initial GeoGest build: full gestionale with auth, pratiche, documenti, clienti, portal, Dockerfile |
| 2026-05-28 | Modern UI redesign (indigo/slate), seed data (3 users, 4 clienti, 6 pratiche), /api/seed endpoint |
| 2026-05-28 | Major feature update: multi-client pratiche, tickets system, admin user creation, client account creation, 22 E2E tests |
