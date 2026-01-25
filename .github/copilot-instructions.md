# Copilot / AI coding agent instructions

## Architecture Overview

**Iron & Steel Barbershop** is a brutalist-style barbershop web application. The system spans **frontend (Vite + React 19 + TS)** in repo root and **backend (Express 5 + Sequelize + PostgreSQL)** in `backend/`.

### Data flow
1. **Frontend** (App.tsx) renders UI components using:
   - `constants.tsx` for hardcoded demo data (services, barbers, products, testimonials)
   - `services/api.ts` wrapper for backend calls (bookings, auth, dynamic data)
2. **Backend** (Express) manages:
   - PostgreSQL database (Neon for production) with Sequelize ORM
   - RESTful API endpoints (`/api/auth`, `/api/bookings`, `/api/services`, `/api/products`)
   - JWT authentication and role-based access
3. **External**: Google Gemini API for AI style recommendations and video analysis (`services/gemini.ts`)

### Key files & responsibilities
- `App.tsx` — Main state management (cart, admin toggle, modals, ratings)
- `components/` — UI: Navbar, BookingModal (4-step form), AdminDashboard, StyleAssistant, CartDrawer, LoginModal
- `types.ts` — TypeScript interfaces (Service, Barber, Product, Booking, User)
- `backend/models/` — Sequelize models (Barber, Booking, Product, Service, User)
- `backend/routes/` — API endpoints; controllers in `backend/controllers/`
- `backend/config/database.js` — Sequelize config with SSL support for Neon

## Development workflows

### Windows local development
- **Frontend only**: `npm install` > `npm run dev` (port 3000, see `vite.config.ts`)
- **Full stack** (recommended): `npm run dev:full` (Docker Postgres on 5433, backend on 3001, frontend on 3000)
- **Backend only**: `npm --prefix backend install` > `npm --prefix backend run dev` (needs `DATABASE_URL`)
- **Seed demo data**: `npm --prefix backend run seed` (creates `admin`/`password123` user + demo services/products/barbers)

### Production builds
- **Frontend**: `npm run build` > `dist/` directory
- **Docker**: `docker compose up -d --build` > frontend on 3010 (nginx), backend on 3001, postgres on 5433

## Environment variables

### Frontend (`.env.local` at repo root)
- `GEMINI_API_KEY` or `API_KEY` — injected by `vite.config.ts` into `process.env.API_KEY`/`process.env.GEMINI_API_KEY`
- `VITE_API_URL` or `VITE_BACKEND_URL` — `services/api.ts` reads this for backend endpoint (default `http://localhost:3001`)

### Backend (in production/compose or `.env`)
- `DATABASE_URL` — PostgreSQL connection string (format: `postgres://user:password@host:port/database`)
- `JWT_SECRET` — signing key for authentication tokens
- `PORT` — server port (default 3001)
- `NODE_ENV` — triggers SSL mode in Sequelize when `production`

## API conventions

### Frontend > Backend (services/api.ts)
- **Auth**: `POST /api/auth/login` > returns JWT token for admin access
- **Bookings**: `POST /api/bookings` (create), `GET /api/bookings` (list), `PATCH /api/bookings/:id` (update status)
- **Services**: `GET /api/services` (list), `GET /api/services/:id` (single)
- **Products**: `GET /api/products` (list)
- **Fallback behavior**: If backend endpoint fails (e.g., `/api/barbers` not yet implemented), frontend gracefully defaults to `[]` rather than crashing

### Sequelize patterns
- Database config (`backend/config/database.js`) enforces:
  - `underscored: true` — converts camelCase to snake_case (e.g., `customerName` > `customer_name`)
  - `timestamps: true` — auto-adds `created_at`/`updated_at` to all models
  - SSL required for Neon in production
- Controllers map frontend payloads (camelCase) to DB columns (snake_case)

## Component patterns

### State management (App.tsx)
- Uses React hooks: `useState` for UI state (cart, admin mode, modals), `useEffect` for scroll listeners
- Cart system: `CartItem[]` with product + quantity; modify via `setCart()` helper functions
- Admin toggle: `isAdmin` boolean controls dashboard visibility (no real auth yet for UI switching)

### Modals & drawers
- **BookingModal** — 4-step form (service > barber > date/time > contact); calls `createBooking()` from `services/api.ts`
- **LoginModal** — accepts username/password; calls `loginAdmin()` for JWT token
- **CartDrawer** — slides in from right; displays cart items and checkout flow
- **StyleAssistant** — image upload + text input for Gemini API calls

### Styling
- Tailwind CSS (v4.1.18) configured in `tailwind.config.js`
- Gold accent color: `#c5a059` (used for stars, highlights, premium feel)
- Responsive breakpoints and dark/light mode support via Tailwind utilities
- Icons from `lucide-react` (Phone, MapPin, ShoppingCart, Star, etc.)

## Known gaps (don't "fix" silently—ask first)

1. **Hardcoded UI data** — `constants.tsx` contains all services, barbers, products; UI still reads these directly. Backend endpoints exist but frontend may not call them everywhere.
2. **Missing `/api/barbers` route** — Frontend's `fetchBarbers()` in `services/api.ts` returns `[]` on failure (no barbers list endpoint yet).
3. **No automated tests** — Manual testing guidance in `TESTING.md`; consider this when adding features.
4. **Telegram bot** — UI/dashboard exist but bot integration not implemented; placeholder in `AdminDashboard.tsx`.
5. **Video AI** — Gemini integration exists for analysis; video generation UI present but backend support unclear.

## Docker & deployment

- **Docker Compose** — See `docker-compose.yml`: Postgres (host 5433), backend (3001), frontend (3010 via nginx)
- **Vercel + Neon** — See `VERCEL_NEON_DEPLOYMENT.md` for step-by-step. Neon replaces local Postgres in production.
- **Build optimization** — `vite.config.ts` chunks React, Lucide, and Gemini for faster CDN delivery

## Before modifying code

- Check `constants.tsx` to see if data is hardcoded first
- If adding API calls, verify endpoint exists in `backend/routes/` + controllers
- Sequelize model changes require migration or seed re-run
- Frontend ENV reads are case-sensitive and require `VITE_` prefix for Vite injection (except Gemini key)
