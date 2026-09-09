# AgriLedger – System Architecture

## High-Level View

Clients (Web / Future Mobile) → NestJS API Gateway (Auth, Tenant, RBAC Guards) → Feature Modules (Org, Users, Procurement, Sales, Reconciliation) → Prisma ORM → PostgreSQL (multi-tenant)

## Major Components

1. **API Layer (NestJS)** – Controllers, DTOs, validation, exception filters, interceptors.
2. **Domain Layer** – Value objects (Money, Quantity), domain services, state machines.
3. **Application / Modules** – Organizations, Users, Suppliers, Agents, Procurement, Payments, Sales, Receivables, Documents, Audit, Dashboard.
4. **Reconciliation Engine** – Matching algorithms, suggestion scoring, state transitions, audit.
5. **Persistence** – Prisma schema + migrations. All financial tables carry organizationId.
6. **Cross-Cutting** – TenantContext, AuditLogger, MoneyService, DocumentStorage.

## Multi-Tenancy Strategy

- Row-level isolation via organizationId on every tenant-owned table.
- TenantGuard extracts organization from JWT and injects into request context.
- Prisma queries always filtered by organizationId.

## Authentication & Session

- Access token (short-lived JWT) + Refresh token (rotated, hashed in DB).
- Password hashing: Argon2id preferred.

## Key Decisions

See docs/DECISIONS.md.

- NestJS for modularity and guards.
- Prisma for type-safe migrations.
- Integer minor units for money.
- Controlled state transitions + compensating events.
- Offline designed for Phase 5, not faked.

## Deployment View (Target)

Stateless API containers, managed PostgreSQL with PITR, object storage for documents, CI/CD via GitHub Actions, secrets via environment/secret manager.
