# Autonomyx Optimize — Product Requirements Document

**Version**: 1.0  
**Created**: 2026-05-05  
**Status**: Product Definition  
**Product**: Optimizing Agent for SaaS, LLM, and Cloud FinOps Spend (Multi-Tenant SaaS)

## Executive Summary

Autonomyx Optimize is a multi-tenant optimizing agent for modern technology spend across SaaS applications, LLM/AI usage, and cloud FinOps. It continuously analyzes waste, recommends savings actions, simulates tradeoffs, routes approvals, and measures realized impact.

It answers one continuous question: **Where are we overspending, why, what should we do, and what savings can we unlock safely?**

**Positioning**: One optimizing agent for SaaS waste, LLM spend, and cloud FinOps.

The system is governance-first and human-in-the-loop, with strict Separation of Duties (SoD): **Detect → Decide → Do**.

## Problem Statement

Organizations face fragmented tooling and ownership for spend optimization across finance, engineering, and procurement. Current tools are mostly passive dashboards and often lack governance-safe execution workflows.

### Core Pain Points
- No unified spend visibility across SaaS, cloud, LLM, and vendor contracts
- Inactive licenses, idle infrastructure, and inefficient model routing go undetected
- Decisions are siloed across departments
- Risk/compliance checks are not embedded before action
- Manual handoffs prevent recommendation execution
- Open-source/build-vs-buy tradeoffs are inconsistently evaluated

## Product Vision

Build the operating system for technology spend governance that combines:
- CFO-level financial discipline
- Engineering-level technical feasibility
- Governance-level risk control

### Core Principles
1. Humans approve all material changes
2. Specialist agents gather intelligence but cannot execute
3. Compliance/risk checks happen before approval
4. Open-source alternatives are systematically evaluated
5. Financial impact is simulated and validated


## Optimization Modes

| Mode | Buyer | Main metric | Primary optimization target |
| --- | --- | --- | --- |
| SaaS Cost Optimization | CFO, IT, Procurement | SaaS savings | Unused seats, duplicate tools, over-provisioned plans, pricing variance, and renewal exposure |
| LLM Cost Optimization | AI Engineering, CTO, Product | Cost per AI task | Model routing, prompt cost, retries, tool calls, context bloat, caching, batching, summarization, and fallback models |
| Cloud FinOps | Platform, DevOps, Finance | Cloud cost reduction | Idle compute, unattached disks, oversized instances, unused IPs, reserved capacity, savings plans, autoscaling, and rightsizing |

### Mode-Specific Recommendation Examples

- **SaaS Cost Optimization**: downgrade inactive seats, consolidate overlapping tools, or cancel unused licenses before renewal.
- **LLM Cost Optimization**: route simple classification tasks to smaller models, cache repeated policy-check prompts, or trim retrieval context.
- **Cloud FinOps**: downsize staging databases, delete unattached volumes, or move steady workloads to reserved capacity.

## Optimizing Agent Workflow

1. **Ingest** billing, usage, contracts, logs, and telemetry.
2. **Analyze** waste, anomalies, duplicates, and overuse.
3. **Recommend** savings actions with confidence and impact.
4. **Simulate** risk, savings, and quality tradeoffs.
5. **Execute or route** approvals, tickets, vendor actions, or infrastructure changes.
6. **Measure** realized savings over time.

## Separation of Duties Architecture

### Layer 1 — Detect (Read-Only Analysts)
- SaaS Cost Analyst
- Cloud Cost Analyst
- LLM Cost Analyst
- Vendor Negotiation Agent
- Open-Source Replacement Agent
- Skeptic/Challenge Agent

**Rule**: Detect layer is read-only.

### Layer 2 — Decide (Governance & Control)
- Policy Engine
- Approval Router
- Ownership Resolver
- Compliance & Risk Agent
- Audit & Logging Agent

**Rule**: Governance layer cannot execute changes.

### Layer 3 — Human Decision Authority
Approvals by role (Finance, Procurement, Engineering, IT, Security/Compliance, BU Owners) through a state machine:

Drafted → Awaiting Approval → Under Review → Approved/Rejected/Escalated/Expired → Executed or Rolled Back.

### Layer 4 — Execute (Controlled & Reversible)
- Workflow Execution Agent
- Rollback/Recovery Agent

**Rule**: Write access only to approved items; all actions reversible and logged.

### Layer 5 — Intelligence & Simulation
- Savings Simulation Agent
- Reporting & Narrative Agent

## Core Product Features

1. **Control Tower Dashboard**: total spend, identified/realized savings, pending approvals, active risks, renewal exposure.
2. **Recommendations Engine**: categorized opportunities with savings, risk, and execution plans.
3. **Approvals Workflow**: auditable routing, escalation, delegation, batch and conditional approvals.
4. **Execution Tracking**: live execution state, blockers, rollback support, realized-vs-estimated savings.
5. **Renewals & Contracts**: proactive renewal timelines and negotiation preparation.
6. **Open-Source / Build-vs-Buy**: TCO, risk, complexity, and strategic recommendation.

## Data Model Summary

Tenant-scoped model includes:
- Users, Teams, Vendors, Tools, Contracts
- Costs, Recommendations, Approvals, Executions
- Audit Logs (immutable)

Key relationship chain:
**Vendor → Tools → Costs → Recommendations → Approvals → Executions → Audit**.

## Security & Governance

- Tenant isolation via tenant-scoped models and RLS
- RBAC by domain role
- Immutable audit history for decisions and actions
- Policy engine with threshold, escalation, and SoD enforcement

## Implementation Phases

### Phase 1 (MVP)
- Multi-tenant + RBAC
- CSV ingestion
- SaaS + Cloud analyst basics
- Approval workflow + SoD
- Dashboard, recommendations, approvals queue, audit logging

### Phase 2 (Intelligence)
- LLM, vendor negotiation, OSS agents
- Savings simulation
- advanced approvals (delegation/escalation)
- compliance/risk checks
- cloud + SaaS API integrations

### Phase 3 (Governance & Automation)
- Skeptic agent
- advanced policy engine
- batch approvals
- execution + rollback automation
- compliance reporting, SSO/OIDC, forecasting

## Success Metrics

- Savings realized and realization rate (>50%)
- Time-to-approval (<5 days), time-to-execution (<30 days)
- Spend coverage (>85% in Year 1)
- Reliability (>99.5% API uptime)
- Customer NPS (>50)

## Definition of Done (Feature Level)

- Merged with >80% test coverage
- Deployed to staging
- API/UI documented
- Tenant isolation, RBAC, audit logging verified
- SoD preserved end-to-end
- Performance and security checks passed
- Acceptance tests pass on real data
