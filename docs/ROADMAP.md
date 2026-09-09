# AgriLedger – Implementation Roadmap

## Phase 0 – Architecture Lock & Repository Preparation (Current)

- Repository initialization
- Technology stack selection & documentation
- Full documentation set
- Domain / database model
- Transaction lifecycle
- RBAC matrix
- Reconciliation state machine
- MVP acceptance tests
- Linting, formatting, testing scaffolding
- .env.example
- Basic CI pipeline
- Architecture baseline commit

**Exit criteria:** Repository is ready for Phase 1; all docs exist; no application features claimed as implemented.

## Phase 1 – Foundation

- NestJS application skeleton
- Prisma schema + initial migrations
- Organizations & multi-tenant isolation
- Users, invitation, authentication (JWT + refresh)
- Roles & permissions + guards
- Basic audit logging infrastructure
- Health / readiness endpoints
- CI green (lint + unit tests)

## Phase 2 – Money Control

- Suppliers (CRUD, ledger, statement)
- Agents (CRUD, float issuance, expenses)
- Procurement transactions
- Payment records
- Reconciliation engine (manual + suggestions, partial, duplicate detection)
- Agent variance calculation
- Document metadata & upload (local storage)

## Phase 3 – Trade

- Buyers
- Sales & invoices
- Buyer payments
- Receivables & aging
- Settlements
- Buyer statements

## Phase 4 – Management Intelligence

- CEO / Owner dashboard
- Exception centre (RED / YELLOW / INFO)
- Key reports (procurement, payments, reconciliation, aging)
- Transaction history search by publicRef
- CSV exports

## Phase 5 – Field Operations (Offline-first)

- Local storage + outbox
- Synchronization protocol
- Conflict handling
- Offline-capable field agent workflows
- Device / offline token management

## Phase 6 – Pilot Hardening

- Security audit & permission review
- Performance testing
- Backup / restore procedures
- Real-data pilot testing
- Deployment hardening (secrets, rate limits, monitoring)
- Production readiness checklist

## Guiding Constraint

Do not expand scope. Optimize for correctness, traceability, security and reconciliation quality.
