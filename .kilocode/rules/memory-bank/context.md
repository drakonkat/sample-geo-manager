# Active Context: GeoGest - Gestionale Geometri

## Current State

**Application Status**: ✅ Core features implemented and passing typecheck/lint

GeoGest is a web-based management system for surveying firms (studi di geometri). It supports multi-user access with role-based permissions (admin, geometra, cliente) and document sharing per practice/case.

## Recently Completed

- [x] Database schema with Drizzle ORM + SQLite (users, sessions, clienti, pratiche, documenti)
- [x] Cookie-based authentication system (login, register, logout, session management)
- [x] Role-based access control (admin, geometra, cliente)
- [x] Dashboard with stats and recent practices
- [x] Pratiche module (CRUD, filter by status, detail with documents)
- [x] Documenti module (upload with drag & drop, download, visibility toggle for clients)
- [x] Clienti module (anagrafica CRUD)
- [x] Utenti management (admin-only)
- [x] Account settings page (name + password update)
- [x] Cliente portal (read-only view of assigned practices and shared documents)
- [x] Dockerfile for Coolify deployment (standalone output)
- [x] Middleware for auth-based routing
- [x] All TypeScript and ESLint checks passing

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/db/schema.ts` | Database table definitions | ✅ |
| `src/db/index.ts` | Database client | ✅ |
| `src/db/migrate.ts` | Migration script | ✅ |
| `src/lib/auth.ts` | Authentication utilities | ✅ |
| `src/lib/utils.ts` | Shared utilities (formatting, labels) | ✅ |
| `src/middleware.ts` | Auth routing middleware | ✅ |
| `src/components/ui/` | Button, Card, Input, Select, Badge | ✅ |
| `src/components/layout/` | Sidebar, Header | ✅ |
| `src/components/FileUpload.tsx` | Drag & drop file upload | ✅ |
| `src/app/login/page.tsx` | Login page | ✅ |
| `src/app/register/page.tsx` | Registration page | ✅ |
| `src/app/(dashboard)/` | Admin/Geometra area | ✅ |
| `src/app/(cliente)/portal/` | Client portal | ✅ |
| `src/app/api/auth/` | Login, register, logout, update-profile | ✅ |
| `src/app/api/pratiche/` | Pratiche CRUD | ✅ |
| `src/app/api/clienti/` | Clienti CRUD | ✅ |
| `src/app/api/utenti/` | Users list (admin) | ✅ |
| `src/app/api/upload/` | File upload endpoint | ✅ |
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
