# Autonomyx Optimize — Technical Architecture & Implementation Specification

**Version**: 1.0  
**Created**: 2026-05-05  
**Scope**: API, Frontend, Database, Agent Architecture, Deployment

## Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind
- **API**: Fastify + TypeScript
- **Workers**: BullMQ + Node.js
- **Database**: PostgreSQL + Prisma
- **Shared Packages**: `@autonomyx/config`, `@autonomyx/types`, `@autonomyx/ui`
- **Deployment**: Docker + Kubernetes (optional Coolify)

## Core Architecture

- Frontend renders control tower, recommendations, approvals, executions, and reporting flows.
- API handles tenancy, RBAC, route authorization, workflow orchestration, and audit logging.
- Worker layer executes specialist analysts and governance jobs asynchronously.
- PostgreSQL persists tenant-scoped entities and decision/execution trails.
- External integrations ingest cloud, SaaS, and LLM usage data.

## Database Design (High-Level)

Key tables:
- `tenants`, `users`, `vendors`, `tools`, `contracts`, `costs`
- `recommendations`, `approvals`, `executions`, `audit_logs`, `governance_policies`

Design goals:
- Tenant isolation on every table
- SoD-compatible workflow persistence
- Immutable/traceable audit event stream
- Query performance for dashboard, approvals, and renewals

## API Modules

- `costs`, `vendors`, `tools`, `contracts`
- `recommendations`, `approvals`, `executions`, `audit`
- `integrations`, `reporting`, `auth`

Representative endpoints:
- `/api/v1/recommendations`
- `/api/v1/approvals/queue`
- `/api/v1/executions/:id`
- `/api/v1/reports/dashboard`
- `/api/v1/agents/trigger-analysis`

## Frontend Structure

- `pages/dashboard.tsx`
- `pages/recommendations.tsx`, `pages/recommendations/[id].tsx`
- `pages/approvals/queue.tsx`, `pages/approvals/[id].tsx`
- `pages/executions.tsx`, `pages/renewals.tsx`, `pages/reports.tsx`
- `components/*` for charts, forms, workflow views, and layout

State management is centered on server state via React Query and API wrappers.

## Agent Framework

BullMQ-backed stateless jobs:
- Scheduled: SaaS, Cloud, LLM cost analysts
- On-demand: Vendor negotiation, OSS replacement, simulation
- Event-driven: Approval router, compliance checks, execution engine
- Challenge: Skeptic agent to validate assumptions and hidden costs

Each recommendation is tenant-scoped, policy-checked, and approval-routed before execution.

## Multi-Tenant Isolation

1. DB: `tenant_id` + RLS
2. API: tenant middleware and RBAC checks
3. UI: tenant-scoped data access only
4. Worker: jobs always include tenant context

## Deployment

- Local development via Docker Compose (Postgres, Redis, API, Web, Worker)
- Production via Kubernetes deployments/stateful sets
- Optional Coolify compose-based deployment

## Testing Strategy

- Unit tests for domain logic (agents, state machine, validators)
- Integration tests for API + DB + workflow routing
- E2E tests for approval and execution UX paths

Target validation includes multi-tenant isolation, SoD enforcement, and audit completeness.

## Observability

- Structured logs (Pino)
- Metrics (Prometheus)
- Error tracking (Sentry)
- Job-level status/attempt visibility from BullMQ

## Delivery Workflow

1. Branch and implement
2. Run lint/tests/build
3. Add DB migrations where needed
4. Commit with conventional message
5. Open PR with deployment and rollout notes
