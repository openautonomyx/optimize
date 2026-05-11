# Autonomyx Optimize

Autonomyx Optimize is an AI-powered cost optimization agent for modern technology spend across SaaS, LLM, and cloud infrastructure costs.

The main application lives in [`autonomyx-optimize/`](./autonomyx-optimize).

## Overview

Autonomyx Optimize helps teams ingest spend, usage, contract, billing, and telemetry data, then identify savings opportunities with governance and auditability.

It focuses on three optimization modes:

| Mode | Focus |
| --- | --- |
| SaaS Cost Optimization | Reduce unused seats, duplicate tools, over-provisioned plans, and renewal exposure. |
| LLM Cost Optimization | Reduce AI and token spend through routing, caching, batching, prompt trimming, and context controls. |
| Cloud FinOps | Find idle resources, rightsize workloads, and improve commitment coverage. |

## Quick start

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

Services:

- Web app: <http://localhost:3000>
- API: <http://localhost:4000>

## Documentation

See the full project README here:

- [`autonomyx-optimize/README.md`](./autonomyx-optimize/README.md)

## Repository structure

```txt
.
├── autonomyx-optimize/      # Main monorepo application
├── .github/workflows/       # GitHub Actions CI
├── .gitignore
├── LICENSE
└── README.md
```

## License

This project is licensed under the MIT License. See [`LICENSE`](./LICENSE).
