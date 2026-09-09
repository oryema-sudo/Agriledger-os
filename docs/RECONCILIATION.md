# AgriLedger – Reconciliation Engine

## Purpose

Compare internal obligations against external payment records. Never silently mark money as reconciled.

## Matching Signals (ordered by reliability)

1. Exact external reference + amount + counterparty
2. Transaction / trade publicRef
3. Invoice number
4. Mobile-money / bank reference + amount + date window
5. Amount + date + phone / account number
6. Fuzzy name + amount + date (low confidence → NEEDS_REVIEW)

## Reconciliation Record States

| Status              | Meaning |
|---------------------|---------|
| MATCHED             | Fully matched and confirmed |
| PARTIALLY_MATCHED   | Amount covers only part of the obligation |
| POSSIBLE_DUPLICATE  | Same external reference or near-identical payment already linked |
| UNMATCHED           | No reasonable candidate found |
| NEEDS_REVIEW        | Candidates exist but confidence below threshold or conflicts |
| REJECTED            | Explicitly rejected by an authorized user |

## Process Flow

1. Payment record is created (manual or import).
2. Engine runs suggestion scoring against open obligations of the same organization and currency.
3. High-confidence exact matches may be auto-proposed (still require confirmation in strict mode).
4. User reviews the suggestion queue and accepts/rejects.
5. Every decision is written to reconciliation_records and the immutable audit log.

## Partial Matching & Duplicate Detection

Supported as first-class states. Same externalReference within the organization is flagged as POSSIBLE_DUPLICATE.

## Visibility Requirements

Users must always see: what matched, why, what remains unmatched, who confirmed, timestamp, full history.
