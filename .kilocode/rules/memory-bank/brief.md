# Project Brief: GeoGest - Gestionale Geometri

## Purpose

A web-based management system for surveying firms (studi di geometri) that enables practice/case management, document sharing with clients, and team coordination through role-based access control.

## Target Users

- **Admin**: Firm owners/managers who need full control over users and practices
- **Geometri**: Surveyors who manage their assigned practices and upload documents
- **Clienti**: End clients who need to view their practices and download shared documents

## Core Use Case

A surveying firm uses GeoGest to:
1. Track all active practices with cadastral data (foglio, particella, sub)
2. Upload and organize documents per practice
3. Share specific documents with clients through a dedicated portal
4. Manage client registry and link clients to practices
5. Monitor practice status and workload via dashboard

## Key Requirements

### Must Have

- Multi-user authentication with roles (admin, geometra, cliente)
- Practice management (CRUD, status tracking, cadastral fields)
- Document upload/download with per-document client visibility control
- Client registry management
- Dedicated client portal with limited, read-only access
- Dashboard with practice statistics
- Docker deployment support (Coolify)

### Nice to Have

- Email notifications for new documents
- Document categories/tags
- Activity logging
- Search and pagination
- Backup system

## Success Metrics

- Clean typecheck and lint (✅ achieved)
- All three user roles can perform their intended workflows
- Docker build succeeds for Coolify deployment
- Responsive UI that works on desktop and mobile (client portal)

## Constraints

- Framework: Next.js 16 + React 19 + Tailwind CSS 4
- Database: SQLite via Drizzle ORM
- Package manager: Bun
- Language: Italian UI
- Deployment: Docker (Coolify)
