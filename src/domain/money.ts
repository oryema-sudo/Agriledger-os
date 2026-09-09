/**
 * Money value object – Phase 0 design.
 *
 * All monetary amounts in AgriLedger are represented as integer minor units
 * plus an ISO 4217 currency code. Never use floating-point numbers.
 *
 * Example (UGX): 5_000_000 means five million Uganda shillings.
 */

export type CurrencyCode = 'UGX' | string; // UGX first; others later

export class Money {
  constructor(
    public readonly amountMinor: bigint,
    public readonly currency: CurrencyCode = 'UGX',
  ) {
    if (amountMinor < 0n) {
      // Business rules may later allow negative adjustments; for now keep non-negative at construction.
      // Adjustments will be explicit domain events.
    }
  }

  static fromMinor(amountMinor: bigint | number, currency: CurrencyCode = 'UGX'): Money {
    return new Money(BigInt(amountMinor), currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor + other.amountMinor, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor - other.amountMinor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amountMinor === other.amountMinor && this.currency === other.currency;
  }

  isZero(): boolean {
    return this.amountMinor === 0n;
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }

  toString(): string {
    return `${this.amountMinor} ${this.currency}`;
  }
}
