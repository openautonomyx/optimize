# Production Deployment

Autonomyx Optimize is a pnpm monorepo with three runtime services:

- `apps/web` — Next.js web app
- `apps/api` — Fastify REST API
- `apps/worker` — BullMQ background worker

It also requires PostgreSQL and Redis.

## Required infrastructure

- Node.js 22 or Docker
- PostgreSQL 16+
- Redis 7+
- HTTPS-enabled domain for the web app
- Secure secret storage in your hosting platform
- Database backups and log retention

## Required environment variables

| Name | Service | Purpose |
| --- | --- | --- |
| `NODE_ENV` | all | Use `production` in production. |
| `DATABASE_URL` | api, worker, db tooling | PostgreSQL connection string. |
| `REDIS_URL` | api, worker | Redis connection string. |
| `API_PORT` | api | API listen port. Defaults to `4000`. |
| `WEB_PORT` | web | Web listen port. Defaults to `3000`. |
| `JWT_SECRET` | api, worker | Strong random signing secret. |
| `DEFAULT_TENANT_SLUG` | api, worker | Default tenant slug for demo/dev flows. |
| `NEXT_PUBLIC_API_URL` | web | Browser-visible API URL. |

Generate a strong JWT secret with:

```bash
openssl rand -base64 32
```

Never use sample Compose secrets in production.

## Local production-like run

From the `autonomyx-optimize` directory:

```bash
docker compose -f infra/docker-compose.prod.yml up --build
```

Services:

```text
Web: http://localhost:3000
API: http://localhost:4000
API health: http://localhost:4000/health
```

## Manual production build

```bash
pnpm install --frozen-lockfile
pnpm db:generate
pnpm build
```

Run each service:

```bash
pnpm --filter @autonomyx/api start
pnpm --filter @autonomyx/web start
pnpm --filter @autonomyx/worker start
```

## Database workflow

For local development:

```bash
pnpm db:migrate
pnpm db:seed
```

For production, use a reviewed migration process before release. Avoid running destructive schema changes automatically during app startup.

## Health checks

The API exposes:

```text
GET /health
GET /ready
```

Use `/health` for container health checks and `/ready` for readiness checks after adding deeper database/Redis readiness validation.

## Security checklist

- [ ] Replace all sample secrets before production.
- [ ] Use bcrypt-hashed passwords only.
- [ ] Disable or protect demo seed data in real deployments.
- [ ] Use HTTPS for web and API traffic.
- [ ] Restrict database and Redis network access.
- [ ] Configure rate limits on auth endpoints.
- [ ] Add request-size limits for uploads.
- [ ] Move uploaded import files to object storage.
- [ ] Add centralized logging and alerting.
- [ ] Enable PostgreSQL backups and restore testing.
- [ ] Add SSO/OIDC before enterprise production use.

## CI

The root GitHub Actions workflow validates the monorepo from `autonomyx-optimize`:

- install dependencies
- generate Prisma client
- typecheck
- build

## Known production gaps

The current repo is a production-oriented MVP scaffold, not a fully hardened enterprise SaaS yet. Before handling real customer data, prioritize:

1. Auth provider integration and password reset flows
2. Rate limiting and abuse protection
3. Tenant-isolation tests
4. File upload validation and object storage
5. Database migration review process
6. Observability dashboards and alerting
