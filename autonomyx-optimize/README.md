# Autonomyx Optimize

Autonomyx Optimize is an AI-powered cost optimization agent for modern technology spend. It helps teams identify, prioritize, simulate, and execute savings opportunities across SaaS, LLM, and cloud infrastructure costs.

> One optimizing agent for SaaS waste, LLM spend, and cloud FinOps.

## What it does

Autonomyx Optimize ingests spend, usage, contract, billing, and telemetry data, then turns that data into governed cost-saving actions.

The platform is designed around three optimization modes:

| Mode | Primary users | Main metric | Focus |
| --- | --- | --- | --- |
| SaaS Cost Optimization | CFO, IT, Procurement | SaaS savings | Reduce wasted SaaS spend from unused seats, duplicate tools, over-provisioned plans, and renewal exposure. |
| LLM Cost Optimization | AI Engineering, CTO, Product | Cost per AI task | Reduce token and model spend without hurting quality through model routing, caching, batching, prompt trimming, and context controls. |
| Cloud FinOps | Platform, DevOps, Finance | Cloud cost reduction | Optimize infrastructure spend by finding idle resources, rightsizing workloads, and improving commitment coverage. |

## Agent workflow

1. **Ingest** billing, usage, contracts, logs, and telemetry.
2. **Analyze** waste, anomalies, duplicates, overuse, and renewal risk.
3. **Recommend** savings actions with estimated impact and confidence.
4. **Simulate** savings, risk, and quality tradeoffs before execution.
5. **Execute or route** approvals, tickets, vendor actions, or infrastructure changes.
6. **Measure** realized savings and audit outcomes over time.

## Example recommendations

- **SaaS:** Downgrade inactive seats from Enterprise to Pro.
- **LLM:** Route low-risk classification tasks from premium models to smaller models.
- **Cloud:** Downsize an over-provisioned staging database.

## Repository layout

```txt
autonomyx-optimize/
├── apps/
│   ├── api/        # Fastify REST API
│   ├── web/        # Next.js web app
│   └── worker/     # BullMQ background worker
├── packages/
│   ├── config/     # Shared environment/config validation
│   ├── db/         # Prisma schema, migrations, and seed scripts
│   └── types/      # Shared TypeScript types
├── infra/          # Local infrastructure, including Docker Compose
├── package.json    # Workspace scripts
└── turbo.json      # Turborepo pipeline config
```

## Tech stack

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **API:** Fastify, Zod, Pino, JWT
- **Worker:** BullMQ and Redis
- **Database:** PostgreSQL with Prisma
- **Tooling:** pnpm 10, Turborepo, TypeScript

## Prerequisites

Install the following before running the project locally:

- Node.js 20+
- pnpm 10+
- Docker and Docker Compose

## Quick start

From the repository root:

```bash
cd autonomyx-optimize
pnpm install
cp .env.example .env
docker compose -f infra/docker-compose.yml up -d
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

After startup, the services are available at:

- Web app: <http://localhost:3000>
- API: <http://localhost:4000>
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## Environment variables

Copy `.env.example` to `.env` and adjust values as needed.

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `development` | Runtime environment. |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/autonomyx` | PostgreSQL connection string. |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection string for queues and workers. |
| `API_PORT` | `4000` | API server port. |
| `WEB_PORT` | `3000` | Web app port. |
| `JWT_SECRET` | `changeme-in-local-dev` | Local JWT signing secret. Replace outside local development. |
| `DEFAULT_TENANT_SLUG` | `demo` | Default tenant used for local/demo workflows. |

## Available scripts

Run scripts from `autonomyx-optimize/`.

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all apps in development mode with Turborepo. |
| `pnpm build` | Build all workspace packages and apps. |
| `pnpm lint` | Run lint tasks across the workspace. |
| `pnpm typecheck` | Run TypeScript checks across the workspace. |
| `pnpm db:generate` | Generate the Prisma client. |
| `pnpm db:migrate` | Run Prisma migrations. |
| `pnpm db:seed` | Seed demo/local data. |

## Local infrastructure

The local Docker Compose stack starts:

- PostgreSQL 16
- Redis 7

Start it with:

```bash
docker compose -f infra/docker-compose.yml up -d
```

Stop it with:

```bash
docker compose -f infra/docker-compose.yml down
```

To remove local volumes and reset persisted data:

```bash
docker compose -f infra/docker-compose.yml down -v
```

## Architecture notes

- Modular monolith boundaries live under `apps/api/src/modules`.
- Tenant-aware data models and middleware are scaffolded for multi-tenant workflows.
- RBAC hooks, audit logging, and structured logging are included as foundations.
- Recommendation and import pipelines are scaffolded with typed interfaces.
- CSV imports currently use local temporary storage for the MVP.

## Security and compliance foundations

This repository includes early foundations for governed optimization workflows:

- Tenant-scoped data models
- Audit log service and schema
- Structured application logging
- Environment validation through `@autonomyx/config`
- Approval-oriented execution flow scaffolding

For production use, replace local secrets, harden authentication, configure durable object storage, and review all tenant isolation and authorization boundaries.

## Roadmap

- SSO provider integration using SAML/OIDC
- Durable object storage for import files
- Full parser validation for each connector type
- Forecasting and anomaly detection models
- Deeper SaaS, LLM, and cloud provider integrations
- Approval workflows for automated execution
- Savings realization dashboards

## Contributing

This project is currently an MVP scaffold. Contributions should preserve the workspace structure, shared package boundaries, and tenant-aware design.

Before opening a pull request, run:

```bash
pnpm typecheck
pnpm build
```

## License

No license has been specified yet.
