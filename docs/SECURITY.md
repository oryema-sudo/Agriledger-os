# AgriLedger – Security Architecture

## Authentication

- Email + password (Argon2id preferred).
- JWT access token (short-lived) + Refresh token (rotated, hashed, revocable).
- Invitation flow and password reset via secure single-use tokens.

## Authorization & Tenant Isolation

- RBAC as defined in RBAC.md.
- Every query filtered by organizationId from the authenticated context.
- No reliance on frontend-only filtering.

## Secrets & Configuration

- All secrets via environment variables.
- .env is git-ignored; .env.example provided.
- Never hard-code passwords, JWT secrets, DB credentials or API keys.

## Input Validation & API Security

- class-validator on all DTOs.
- Rate limiting, CORS, security headers.
- HTTPS only in production.

## Audit Logging

- Immutable append-only audit_logs table.
- Records creation, modification, approval, payment, reconciliation, permission changes.
- Application code never provides update/delete paths for audit records.

## File Uploads & Sensitive Data

- Metadata in DB; binary in object storage.
- Bank details / national IDs encrypted at rest where stored.
- Passwords never logged or returned.
