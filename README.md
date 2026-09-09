# AgriLedger

**Agricultural Working-Capital Control Platform**

> AgriLedger is the financial operating system for agricultural aggregators: it tracks every purchase, advance, agent float, supplier balance, sale, receivable and payment, then reconciles the entire money trail.

## Status

**Phase 0 – Architecture Lock & Repository Preparation** (baseline committed)

This repository contains:

- Product & architecture documentation
- Domain / database model design
- RBAC, reconciliation, security designs
- Project structure for NestJS + PostgreSQL + Prisma
- Money value object (integer minor units) + unit tests
- Environment configuration template
- CI, linting and formatting scaffolding

**No production application features are implemented yet.** Phase 1 (Foundation) is next.

## Technology Stack (Locked)

| Layer | Choice |
|-------|--------|
| Language | TypeScript (strict) |
| Framework | NestJS |
| Database | PostgreSQL + Prisma |
| Auth | JWT (access + refresh) |
| Testing | Jest |
| Money | Integer minor units (`bigint`) + currency (UGX first) |

## Documentation

See the `/docs` folder:

- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `RECONCILIATION.md`
- `RBAC.md`
- `SECURITY.md`
- `ROADMAP.md`
- `DECISIONS.md`

(Additional detailed docs such as full DATABASE.md and TRANSACTION_MODEL.md can be expanded in Phase 1.)

## Next Step – Phase 1 Foundation

1. Complete NestJS application skeleton + Prisma schema migrations
2. Organizations + multi-tenant isolation
3. Users, invitation, JWT authentication
4. Roles & permissions + guards
5. Audit logging infrastructure
6. Make CI fully green

---

**Optimize for:** correctness → traceability → security → reconciliation → usability → speed
