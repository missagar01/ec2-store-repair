# Unified Backend API overview

Base path: `/api`. Swagger/OpenAPI spec lives in `src/docs/openapi.json` and is exposed at `/docs` (JSON) and `/docs` UI when the server is running.

## Authentication
- `POST /api/auth/login`
  - Payload: `{ "user_name"?, "employee_id"?, "password" }`
  - Authenticates against the AWS RDS PostgreSQL `users` table, then returns `{ success, token, user }`.

## Store Management routes (store module handles user/store data)
- `GET /api/user/*` → user info and profile helpers.
- `GET /api/store-indent/*`, `/api/indent/*`, `/api/po/*`, `/api/items/*`, `/api/stock/*`, `/api/uom/*`, `/api/cost-location/*`, `/api/vendor-rate-update/*`, `/api/three-party-approval/*`
  - These endpoints still use the Oracle-backed store system; check their dedicated route files for specific parameters.

## Repair Management routes
- `GET`/`POST` under `/api/repair*`, `/api/repair-options*`, `/api/repair-system*`, `/api/repair-check*`, `/api/store-in*`, `/api/payment*`, `/api/dashboard*`.
  - These are wired through the repair services and still rely on the PostgreSQL repair database.

## Additional notes
- All protected routes expect a Bearer JWT generated via `/api/auth/login`.
- S3 uploads, Oracle initialization, and Redis configuration are handled alongside the route logic and can be found in `src/config`.
- Health and diagnostics endpoints live under `/api/health/*` plus the root `/` health check defined in `server.js`.
