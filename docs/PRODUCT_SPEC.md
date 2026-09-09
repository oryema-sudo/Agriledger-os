# AgriLedger – Product Specification

## 1. Product Definition

**Product name:** AgriLedger

**One-line description:**  
AgriLedger is the financial operating system for agricultural aggregators: it tracks every purchase, advance, agent float, supplier balance, sale, receivable and payment, then reconciles the entire money trail.

## 2. Core Problem

Agricultural aggregators purchase produce from many dispersed suppliers through agents, collection centres and field operations.

Their financial information is often fragmented across notebooks, spreadsheets, WhatsApp, mobile-money messages, bank statements, receipts, invoices and manual accounting records.

This makes it difficult to answer:

- How much have we actually purchased?
- How much money have we deployed?
- How much does each supplier owe?
- How much money does each field agent still hold?
- Which payments have been matched to obligations?
- Which payments are missing or duplicated?
- Which buyers owe us money?
- Which receivables are overdue?
- Where are the financial exceptions?

AgriLedger exists to create a single operational money trail across agricultural procurement and sales.

## 3. Core Product Model

The system is built around the agricultural transaction/trade, not around isolated screens.

**Fundamental relationship:**

Supplier → Agent → Delivery → Quantity/Quality → Procurement → Advance → Payment → Warehouse Receipt → Sale → Buyer Invoice → Buyer Payment

Every relevant event is traceable back to a transaction or trade.

The system must always be able to answer:

1. What happened?
2. Who performed it?
3. Who was involved?
4. What commodity was involved?
5. How much quantity was involved?
6. What was the financial value?
7. When did it happen?
8. What payment was made?
9. What evidence exists?
10. Has the obligation been settled?
11. If not, what remains outstanding?
12. What exception requires attention?

## 4. Four Core Ledgers

### A. Procurement Ledger
Tracks: supplier, agent, commodity, grade, quantity, unit price, gross value, deductions, advances, amount payable, collection point, delivery date, supporting documents, warehouse receipt.

### B. Field / Agent Ledger
Tracks money issued to field agents: opening float, float issued, purchases made, supplier payments, approved expenses, transport expenses, returned cash, mobile-money transfers, unreconciled amount, closing balance.  
Must surface agent variances clearly.

### C. Supplier Ledger
Every supplier has a financial statement: opening balance, deliveries, procurement value, advances, deductions, payments, adjustments, closing balance.  
Must show exactly how much the organization owes each supplier.

### D. Sales / Receivables Ledger
Tracks: buyer, sale, commodity, quantity, unit price, invoice, payment terms, payment received, outstanding balance, due date, overdue amount, settlement status.  
Supports receivables aging (Current, 1–30, 31–60, 61–90, 90+ days).

## 5. Reconciliation Engine

Central differentiator. Compares internal obligations against external payment records.

Matching signals: transaction/trade ID, supplier/buyer name, phone number, bank account, mobile-money reference, amount, transaction date, payment reference, invoice number, payment description.

**Statuses:** MATCHED | PARTIALLY_MATCHED | POSSIBLE_DUPLICATE | UNMATCHED | NEEDS_REVIEW | REJECTED

Never silently mark money as reconciled. Full visibility into what matched, why, who confirmed, and when.

## 6. Exception-First Design

Management interface prioritizes exceptions:

- **RED:** unexplained agent variance, duplicate payment, major unmatched payment, overdue buyer, supplier dispute, unauthorized financial action
- **YELLOW:** partially matched payment, missing warehouse receipt, missing supporting document, pending settlement, unusual transaction
- **INFORMATION:** recently reconciled, completed settlement, normal transaction

CEO/Owner should open the app and immediately understand: “What needs my attention?”

## 7. MVP Scope

- Organization creation, profile, multi-tenant isolation
- User registration/invitation, login, role assignment, permissions
- Suppliers (CRUD, profile, ledger, statement)
- Agents (create, profile, float issuance, transactions, reconciliation, balance)
- Procurement transactions (full fields + documents)
- Payments (cash, mobile money, bank transfer, cheque, manual, other) – no live mobile-money API required for MVP
- Reconciliation (record, import where practical, manual + suggested matching, partial, duplicate detection, history)
- Sales (buyers, sales, invoices, payment terms, payments, outstanding, settlement)
- Receivables (current, overdue, aging, statements, history)
- Dashboard (cash deployed, procurement value, supplier liabilities, agent floats, unreconciled, receivables, overdue, settlements, exceptions)
- Audit logging of important events (immutable)

## 8. Explicitly Out of Scope (V1)

Farmer marketplace, consumer marketplace, crop disease AI, weather forecasting, general farm management, generic accounting software, full ERP, lending, insurance marketplace, logistics marketplace, blockchain, cryptocurrency, unnecessary AI features.

**Category:** Agricultural Working-Capital Control.

## 9. Accounting Boundary

AgriLedger maintains operational financial sub-ledgers. It does not replace full accounting software. Future CSV / API exports and accounting integrations are supported in architecture; full double-entry is outside V1 unless required by a specific acceptance criterion.

## 10. Guiding Principles (repeated)

Correctness → Traceability → Security → Reconciliation → Usability → Speed.
