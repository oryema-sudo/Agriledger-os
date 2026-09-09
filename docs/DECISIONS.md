# AgriLedger – Architecture Decision Records (ADRs)

## ADR-001: Technology Stack

**Status:** Accepted  
**Date:** 2026-09-09

**Context:** Need a maintainable, type-safe, multi-tenant financial backend that a small team can own.

**Decision:**  
- TypeScript + NestJS  
- PostgreSQL + Prisma  
- Jest for tests  
- JWT auth  

**Consequences:** Strong modularity and guard support; excellent typing for money and domain logic; Prisma migrations are explicit and reviewable.

## ADR-002: Monetary Representation

**Status:** Accepted

**Decision:** Store all monetary values as integer minor units (`BIGINT amountMinor`) + ISO currency code. Perform arithmetic in integer space or with a decimal library that preserves exactness. Never use JavaScript `number` for money.

**Consequences:** No floating-point rounding errors. Display layer is responsible for formatting. UGX is the initial currency (minor unit = 1 UGX).

## ADR-003: Multi-tenancy Model

**Status:** Accepted

**Decision:** Shared database, shared schema, row-level isolation via mandatory `organizationId` on every tenant-owned table. Enforced by guards + repository/query layer. No schema-per-tenant for V1.

**Consequences:** Simpler operations and migrations; requires rigorous testing of isolation.

## ADR-004: Financial History Immutability

**Status:** Accepted

**Decision:** Prefer status transitions, compensating events, adjustments and corrections over in-place destructive edits of financial records. Original events remain. Audit log is append-only.

**Consequences:** Higher storage and more complex queries, but full traceability and auditability.

## ADR-005: Reconciliation is Explicit

**Status:** Accepted

**Decision:** No silent auto-reconciliation. Every match produces a reconciliation_record with clear status, signals, actor and timestamp. Partial and duplicate states are first-class.

## ADR-006: Offline is Phase 5

**Status:** Accepted

**Decision:** Design the online model so that an outbox + clientOperationId + conflict surface can be added later. Do not implement or fake offline behaviour in Phases 0–4.

## ADR-007: Scope Discipline

**Status:** Accepted

**Decision:** Strict adherence to the product definition. Marketplaces, AI crop features, full ERP, blockchain, lending, etc. are out of scope. Any expansion requires an explicit new ADR and product approval.

## ADR-008: Public Transaction References

**Status:** Accepted

**Decision:** Human-readable public references (e.g. `AGR-2026-000001`) are generated at confirmation time, unique per organization, and treated as immutable business identifiers separate from internal UUIDs.
