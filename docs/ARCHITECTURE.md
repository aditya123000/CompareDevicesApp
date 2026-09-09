# SpecMine Architecture

SpecMine is a React/Vite client and an Express/PostgreSQL API deployed independently. The browser calls the API through `/api` locally or `VITE_API_BASE_URL` in production; the API owns all database access and authentication.

```text
Browser → React UI → Express API → PostgreSQL / Supabase
                    ├─ request ID + JSON logs
                    ├─ security headers + CORS + rate limits
                    └─ repositories → parameterized SQL
```

## API contract

`GET /api/devices` is paginated and filterable:

```text
GET /api/devices?page=1&limit=24&q=pixel&brand=Google&category=smartphones
```

It returns `{ data, meta }`, where `meta` contains page, limit, total, and totalPages. Limits are capped at 100. Device detail remains `GET /api/devices/:id`.

`GET /api/health` checks database connectivity and returns `503` if the API cannot serve traffic. Every response has an `x-request-id`, which is also present in structured request/error logs for debugging.

## Engineering decisions

- **PostgreSQL JSONB payload:** device categories have divergent specifications; shared sortable fields are promoted to columns while the full source payload remains queryable.
- **Repository boundary:** controllers only translate HTTP concerns; repositories own SQL and normalization.
- **No magic security dependency:** current protections are small, auditable middleware. For a horizontally scaled deployment, move rate-limit state to Redis.
- **Health distinction:** this project exposes a readiness-style health endpoint because the API is not useful without Postgres.

## Scale path

1. Add Redis for distributed rate limits and popular catalog response caching.
2. Use PostgreSQL full-text/trigram indexes for fuzzy search at large catalog sizes.
3. Add a queue-backed ingestion pipeline with idempotency keys and data-quality checks.
4. Move JWTs to short-lived access tokens with refresh-token rotation and add OpenTelemetry tracing.
