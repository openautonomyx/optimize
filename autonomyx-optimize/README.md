# Autonomyx Optimize

Autonomyx Optimize is an AI-powered cost optimization agent for modern technology spend.

It operates in three optimization modes:

1. SaaS Cost Optimization
2. LLM Cost Optimization
3. Cloud FinOps

The platform ingests spend, usage, contract, billing, and telemetry data, then identifies savings opportunities, prioritizes recommendations, and helps teams execute cost-saving actions with governance and auditability.

> **One optimizing agent for SaaS waste, LLM spend, and cloud FinOps.**

## Optimization Modes

| Mode | Buyer | Main metric | Focus |
| --- | --- | --- | --- |
| SaaS Cost Optimization | CFO, IT, Procurement | SaaS savings | Reduce wasted SaaS spend from unused seats, duplicate tools, over-provisioned plans, and renewal exposure. |
| LLM Cost Optimization | AI Engineering, CTO, Product | Cost per AI task | Reduce AI and token spend without hurting quality through model routing, caching, batching, prompt trimming, and context controls. |
| Cloud FinOps | Platform, DevOps, Finance | Cloud cost reduction | Optimize cloud infrastructure spend by finding idle resources, rightsizing workloads, and improving commitment coverage. |

## Agent Workflow

1. **Ingest** billing, usage, contracts, logs, and telemetry
2. **Analyze** waste, anomalies, duplicates, and overuse
3. **Recommend** savings actions with confidence and impact
4. **Simulate** risk, savings, and quality tradeoffs
5. **Execute or route** approvals, tickets, vendor actions, or infrastructure changes
6. **Measure** realized savings over time

## Example Recommendations

- **SaaS Cost Optimization**: “Downgrade 42 inactive seats from Enterprise to Pro.”
- **LLM Cost Optimization**: “Route classification tasks from GPT-4-class model to a smaller model.”
- **Cloud FinOps**: “Downsize staging database from 4 vCPU to 2 vCPU.”

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
