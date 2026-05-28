# System Patterns: GeoGest - Gestionale Geometri

## Architecture Overview

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (Inter font, Italian lang)
│   ├── page.tsx                    # Redirect to login/dashboard/portal
│   ├── globals.css                 # Tailwind imports
│   ├── login/page.tsx              # Login page (client component)
│   ├── register/page.tsx           # Registration page (client component)
│   ├── middleware.ts               # Auth-based routing middleware
│   ├── (dashboard)/                # Admin/Geometra area (protected layout)
│   │   ├── layout.tsx              # Sidebar + Header layout
│   │   ├── dashboard/page.tsx      # Stats overview (server component)
│   │   ├── pratiche/
│   │   │   ├── page.tsx            # List with filters (client component)
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # Detail (server component)
│   │   │       └── PraticaDetailClient.tsx  # Interactive detail (client)
│   │   ├── clienti/page.tsx        # Clienti list (client component)
│   │   ├── utenti/page.tsx         # Users list - admin only (client)
│   │   └── mio-account/
│   │       ├── page.tsx            # Account info (server component)
│   │       └── AccountForm.tsx     # Edit form (client component)
│   ├── (cliente)/                  # Client portal area (protected layout)
│   │   ├── layout.tsx              # Minimal layout
│   │   └── portal/
│   │       ├── page.tsx            # Portal home (server component)
│   │       ├── ClientePortalHeader.tsx  # Header (client component)
│   │       └── pratiche/[id]/page.tsx   # Practice detail (server)
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts      # POST login
│       │   ├── register/route.ts   # POST register
│       │   ├── logout/route.ts     # POST logout
│       │   └── update-profile/route.ts  # POST update profile
│       ├── pratiche/
│       │   ├── route.ts            # GET list, POST create
│       │   └── [id]/route.ts       # PATCH update, DELETE
│       ├── clienti/route.ts        # GET list, POST create
│       ├── utenti/route.ts         # GET list (admin only)
│       ├── documenti/route.ts      # DELETE
│       └── upload/route.ts         # POST file upload
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Variants: primary, secondary, danger, ghost
│   │   ├── Card.tsx                # Card, CardHeader, CardContent
│   │   ├── Input.tsx               # With label and error support
│   │   ├── Select.tsx              # With label and options
│   │   └── Badge.tsx               # Status badges
│   ├── layout/
│   │   ├── Sidebar.tsx             # Role-based navigation (client)
│   │   └── Header.tsx              # User info + logout (client)
│   └── FileUpload.tsx              # Drag & drop upload (client)
├── lib/
│   ├── auth.ts                     # Session management, password hashing
│   └── utils.ts                    # Formatting, labels, colors
└── db/
    ├── schema.ts                   # Drizzle ORM table definitions
    ├── index.ts                    # Database client
    ├── migrate.ts                  # Migration runner
    └── migrations/                 # Auto-generated SQL migrations
```

## Key Design Patterns

### 1. Server/Client Component Split
- **Server Components** for data fetching (dashboard, detail pages)
- **Client Components** for interactive UI (forms, file upload, navigation)
- Forms post to API routes, not server actions

### 2. Authentication Pattern
- Cookie-based sessions stored in `sessions` table
- `getCurrentUser()` reads session cookie → looks up session → returns user
- Middleware redirects unauthenticated users to `/login`
- Layout-level auth checks redirect unauthorized roles

### 3. Role-Based Access
- Three roles: `admin`, `geometra`, `cliente`
- Dashboard area: admin + geometra only
- Portal area: cliente only
- Sidebar nav items filtered by role
- API routes check role before processing

### 4. File Upload Pattern
- Files uploaded via FormData to `/api/upload`
- Stored in `public/uploads/` with randomized filenames
- Document metadata stored in DB with `visibileAlCliente` toggle
- Clients only see documents marked as visible

### 5. Styling
- Tailwind CSS 4 utility classes
- Consistent color scheme: blue-600 primary, gray-900 sidebar
- Status badges with semantic colors (blue=open, yellow=active, green=closed)
