# AgriLedger – Role-Based Access Control

## Initial Roles

1. **Owner / CEO** – Full access within the organization, including user management and financial overrides.
2. **Finance Manager** – Payments, reconciliation, receivables, supplier & agent balances, reports.
3. **Procurement Manager** – Create/edit procurements, suppliers, agents, warehouse receipts.
4. **Field Agent** – Record deliveries, quantities, basic expenses, view own float. Never receives management-level financial access.
5. **Warehouse Manager** – Warehouse receipts, inventory movements related to procurements.
6. **Accountant** – Read-heavy + export, reconciliation assistance, statements.
7. **Auditor / Read-only** – Full read access to financial and audit data, no mutations.

## Permission Model

Permissions are fine-grained and coded as `resource:action` (e.g. procurement:create, reconciliation:confirm, report:export).

## Enforcement

- JWT carries organizationId + permissions/role.
- NestJS Guards: JwtAuthGuard → TenantGuard → PermissionsGuard.
- Field-agent scoped queries automatically filter to the agent’s own data.

## Principle of Least Privilege

A Field Agent must never automatically receive management-level financial access. Role assignment is explicit and audited.
