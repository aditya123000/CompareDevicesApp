# SpecMine: Complete Project Explanation Guide

Use this document as your interview and demo script. It explains the project from first principles, gives you short answers first, and then provides enough detail for technical follow-up questions.

## 1. The 30-second explanation

**SpecMine is a full-stack device-discovery and comparison platform.** Users can search a catalog of consumer electronics, filter by practical constraints, inspect detailed specifications, compare up to three similar devices side by side, and save favorites or comparisons to a personal library. It uses a React/Vite client, Express API, and PostgreSQL database.

The project is designed around the real decision flow: discover a device, narrow choices, compare the shortlist, then save a decision to revisit later.

## 2. The user problem and solution

### Problem

Device specifications are fragmented, difficult to compare, and often optimized for marketing rather than a buyer's actual needs. A user evaluating three phones should not have to switch among several websites and manually interpret RAM, price, display, battery, and camera data.

### Solution

SpecMine creates one decision workspace:

1. Browse or search a structured catalog.
2. Filter devices by category, brand, availability, price, and RAM.
3. Open a detailed device page for deeper research.
4. Add up to three devices from the same category to a comparison.
5. Save strong candidates or the comparison for later.

## 3. Feature map

| Area | What the user can do | Why it matters |
|---|---|---|
| Home | Search and discover the product value proposition | Fast first interaction |
| Catalog | Browse device families and apply filters | Reduces a large catalog into a shortlist |
| Device details | Inspect normalized technical specifications | Supports a confident decision |
| Compare | Compare up to three same-category devices | Makes differences obvious |
| Authentication | Register, sign in, sign out, update profile, change password | Enables personal, secure workflows |
| Dashboard | Return to the main decision workspace | Gives signed-in users a clear next action |
| Library | Save favorites, save comparisons, restore comparisons | Persists the user's research over time |
| Theme | Switch between light and dark mode | Improves usability and visual polish |

## 4. Architecture at a glance

```text
React + Vite browser client
        |
        | HTTPS / JSON API
        v
Express application
  |-- security headers, CORS, rate limits, request IDs, structured logs
  |-- auth middleware and server-side sessions
  |-- controllers: HTTP validation and responses
  |-- repositories: parameterized SQL and data mapping
        |
        v
PostgreSQL / Supabase
  |-- devices (searchable fields + JSONB specifications)
  |-- users
  |-- user_sessions
  |-- user_favorites
  `-- saved_comparisons
```

### Why this separation exists

- **React** owns interaction and presentation.
- **Express** owns API security, authorization, and business rules.
- **Repositories** isolate SQL from controllers, which keeps HTTP concerns and database concerns separate.
- **PostgreSQL** is the source of truth for users, sessions, catalog data, and saved work.

## 5. Frontend walkthrough

The client lives in `frontend/src` and uses React Router for pages.

### Important frontend areas

| Location | Responsibility |
|---|---|
| `App.jsx` | Declares application routes |
| `Layouts/MainLayout.jsx` | Shared navigation, footer, toast area, and page container |
| `context/AuthContext.jsx` | Keeps the signed-in user/session state synchronized with the API |
| `pages/devices` | Catalog, sections, filter controls, and device cards |
| `pages/deviceDetails` | Deep device specification view |
| `pages/compare` | Device selection and comparison logic |
| `pages/Dashboard.jsx` | Authenticated user workspace |
| `pages/LibraryPage.jsx` | Favorites and saved comparison workflows |
| `Api` | Small API clients that centralize `fetch` calls |

### UI design answer

"I kept a consistent sky-blue and slate design system across the application. The experience uses rounded cards, subtle borders, readable density, dark mode, loading states, empty states, and clear call-to-action buttons. I added new pages by extending those same visual tokens instead of introducing a second design language."

## 6. Backend walkthrough

The backend lives in `backend` and is an ES module Express application.

### Request lifecycle

1. The request enters `app.js`.
2. Request context adds an `x-request-id` for traceability.
3. Security headers, CORS policy, JSON size limit, structured logging, and rate limits run.
4. The matching route invokes a controller.
5. The controller validates HTTP input and calls a repository.
6. The repository executes parameterized SQL through the shared PostgreSQL pool.
7. Errors are normalized by the central error middleware and include the request ID.

### Key API endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/health` | Readiness-style API and database health check |
| `GET /api/devices` | Paginated device catalog; supports page, limit, q, brand, category |
| `GET /api/devices/:id` | One normalized device |
| `POST /api/auth/register` | Create user and server-side session |
| `POST /api/auth/login` | Authenticate and create a session |
| `POST /api/auth/logout` | Revoke current session |
| `GET /api/auth/me` | Resolve the active authenticated user |
| `PUT /api/auth/profile` | Update profile details |
| `PUT /api/auth/password` | Change password and revoke active sessions |
| `GET/POST/DELETE /api/library/favorites` | Personal saved-device library |
| `GET/POST/DELETE /api/library/comparisons` | Saved comparison library |

## 7. Data model explanation

### Devices

The `devices` table stores common query fields (`id`, `brand`, `model`, `category`, and `price`) as standard columns. The category-specific specification payload is stored as JSONB.

**Why JSONB?** Phones, televisions, headphones, and laptops have different fields. JSONB avoids a giant sparse table while preserving flexibility. The common fields that are filtered/sorted are promoted to indexed columns for performance.

### Users and sessions

`users` stores the profile and a scrypt password hash. The plain password is never stored.

`user_sessions` stores only a SHA-256 hash of a randomly generated opaque session token, its expiry, and optional revocation time. If a database were exposed, an attacker still could not use the stored token hash as a session credential.

### Personal library

- `user_favorites` is a join table with a unique `(user_id, device_id)` pair.
- `saved_comparisons` stores a user-owned comparison name and its array of device IDs as JSONB.

## 8. Authentication and security explanation

### Authentication flow

1. User registers or logs in with email and password.
2. Password verification uses Node's `scrypt` and timing-safe comparison.
3. The server creates a random opaque token, stores only its hash in `user_sessions`, and returns the token to the client.
4. The client sends `Authorization: Bearer <token>` for protected calls.
5. Middleware hashes the submitted token, checks expiry/revocation, and attaches the user to the request.
6. Logout marks that session revoked. A password change revokes all sessions for the user.

### Security controls already present

- Parameterized SQL queries prevent SQL injection.
- Passwords use salted scrypt hashes.
- Session tokens are high-entropy and only hashed server-side.
- Rate limits protect auth and API routes from basic abuse.
- CORS is allow-listed.
- Body payloads are capped at 100 KB.
- `X-Content-Type-Options`, frame protection, referrer policy, permission policy, and resource policy headers are set.
- Error responses avoid exposing internal server details for 5xx failures.
- Request IDs link browser-reported errors to backend logs.

### Honest improvement answer

"For a cross-site production deployment, I would move the opaque session token from browser storage to Secure, HttpOnly, SameSite cookies and add CSRF protection. For multiple API instances, I would move the in-memory rate limiter to Redis."

## 9. Catalog and comparison logic

### Catalog API contract

Example:

```text
GET /api/devices?page=1&limit=24&q=pixel&brand=Google&category=smartphones
```

Response shape:

```json
{
  "data": ["device records"],
  "meta": { "page": 1, "limit": 24, "total": 42, "totalPages": 2 }
}
```

The API caps page size at 100, bounds query-string lengths, and uses SQL parameters instead of interpolating user input.

### Comparison rules

- A comparison accepts up to three devices.
- All selected devices must be in the same category because their specifications are comparable.
- The comparison logic normalizes values and applies category-aware rules to identify useful differences.
- A saved comparison persists device IDs; restoring it fetches current catalog records so it remains accurate if device data changes.

## 10. How to run the project

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
copy backend/.env.example backend/.env
npm run dev
```

Set `DATABASE_URL` for a hosted PostgreSQL/Supabase database, or provide the individual PostgreSQL variables. Use a long random `JWT_SECRET` if legacy JWT utilities are retained, and set a secure database password.

Useful commands:

```bash
npm test
npm run lint
npm run build
```

Apply `supabase/migrations/001_initial_schema.sql` to a new Supabase project. The backend also creates required tables on startup for local development.

## 11. Deployment explanation

- **Frontend:** Vercel or Netlify builds the Vite app.
- **API:** Render or Vercel serverless runs the Express application.
- **Database:** Supabase PostgreSQL.
- **Environment variables:** Keep secrets only in provider environment settings, never in Git.

Before a demo, verify `CORS_ORIGIN`, `DATABASE_URL`, `PG_SSL`, and the frontend API base URL. Open `/api/health` after deployment to validate API-to-database readiness.

## 12. Testing, quality, and delivery

The project includes backend query tests, frontend linting, production builds, and a GitHub Actions quality gate. The CI workflow runs dependency installs, tests, linting, and a Vite production build for push and pull-request events.

Say this in an interview:

"I added a quality gate so the project is not dependent on manual confidence. Every pull request can verify the catalog query behavior, lint the client, and confirm that the production bundle builds."

## 13. Common interview questions and confident answers

### Why PostgreSQL instead of MongoDB?

"I needed reliable relationships between users, sessions, favorites, and saved comparisons, plus transactional guarantees and familiar indexing. PostgreSQL also supports JSONB, which gives flexibility for heterogeneous device specs without giving up relational integrity."

### Why have a repository layer?

"It makes controllers smaller and keeps database access testable and consistent. The controller handles HTTP concerns; the repository owns SQL and mapping database rows into application data."

### How do you prevent SQL injection?

"Every user-supplied value is passed as a PostgreSQL parameter. Query construction only contains fixed SQL fragments; values never get concatenated into SQL text."

### How are sessions revoked?

"The server stores a hash for each opaque token with expiry and revocation state. Logout marks the current session revoked, and password change revokes all unrevoked sessions belonging to that user."

### What happens when the application scales horizontally?

"The database-backed sessions already work across instances. I would replace in-memory rate-limit counters with Redis, add response caching for popular catalog queries, and use a CDN for static frontend assets and images."

### Why limit comparisons to the same category?

"The comparison is intended to be meaningful. A phone and a TV have different spec vocabularies, so restricting comparisons prevents misleading scoring and simplifies the UI."

### What would you build next?

"I would add HttpOnly cookie sessions with CSRF protection, PostgreSQL trigram/full-text search, integration tests with a disposable database, image optimization, accessibility audits, analytics events, and an ingestion pipeline for trusted device sources."

## 14. Demo script (about 3 minutes)

1. Start at Home and explain the decision problem.
2. Search a model and open Devices.
3. Apply a brand or RAM/price filter.
4. Open details and point out normalized specifications.
5. Add two or three devices from the same category.
6. Open Compare and explain the side-by-side decision model.
7. Sign in, save the comparison, and save a favorite.
8. Open Dashboard, then Library.
9. Restore the saved comparison from Library.
10. Mention the health endpoint, rate limits, database sessions, CI, and deployment setup.

## 15. What not to overclaim

Be accurate. Do not say the application is globally distributed, handles millions of users, or has completed end-to-end coverage unless you have actually deployed and measured those things. A strong answer is:

"This is a production-minded portfolio application. It has the architecture and safeguards for a serious deployment, and I can clearly describe the next scaling steps."

## 16. Git hygiene

The `.gitignore` intentionally excludes secrets, dependencies, build artifacts, local IDE settings, test reports, deployment caches, and generated caches. It does **not** ignore source code, migrations, environment examples, CI configuration, or documentation.

Never commit:

- `.env` files or database passwords
- `node_modules`, `dist`, coverage output, or test recordings
- local editor configuration such as `.claude/settings.local.json`
- deployment caches such as `.vercel` or `.netlify`

Always commit:

- source code and tests
- `package.json` and lockfiles
- database migrations
- `.env.example` files without real secrets
- CI workflows and documentation
