# Autonomyx Optimize

Production-grade MVP scaffold for a multi-tenant technology spend operating system.

## Stack
- Next.js + TypeScript + Tailwind (`apps/web`)
- Fastify REST API (`apps/api`)
- BullMQ worker (`apps/worker`)
- Prisma + PostgreSQL (`packages/db`)
- Shared config/types (`packages/config`, `packages/types`)

## Quick Start
1. Install deps: `pnpm install`
2. Start infra: `docker compose -f infra/docker-compose.yml up -d`
3. Copy env: `cp .env.example .env`
4. Generate client: `pnpm db:generate`
5. Run migrations: `pnpm db:migrate`
6. Seed data: `pnpm db:seed`
7. Start apps: `pnpm dev`

## Services
- API: http://localhost:4000
- Web: http://localhost:3000

## Architecture Notes
- Modular monolith boundaries under `apps/api/src/modules`
- Tenant-aware middleware and RBAC hooks included
- Recommendation engine and import pipelines are scaffolded with strong interfaces
- CSV import path uses local temporary storage for MVP

## Security and Compliance Foundations
- Tenant-scoped data models
- Audit log service and schema
- Structured logging
- Env validation in `@autonomyx/config`

## Future Work
- SSO provider integration (SAML/OIDC)
- Object storage for import files
- Full parser validation per connector type
- Forecasting/anomaly models
