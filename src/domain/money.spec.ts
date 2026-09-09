import { Money } from './money';

describe('Money value object', () => {
  it('creates from minor units', () => {
    const m = Money.fromMinor(5_000_000, 'UGX');
    expect(m.amountMinor).toBe(5_000_000n);
    expect(m.currency).toBe('UGX');
  });

  it('adds correctly', () => {
    const a = Money.fromMinor(3_000_000);
    const b = Money.fromMinor(2_000_000);
    const sum = a.add(b);
    expect(sum.amountMinor).toBe(5_000_000n);
  });

  it('subtracts correctly', () => {
    const a = Money.fromMinor(5_000_000);
    const b = Money.fromMinor(2_000_000);
    const diff = a.subtract(b);
    expect(diff.amountMinor).toBe(3_000_000n);
  });

  it('rejects different currencies on arithmetic', () => {
    const a = Money.fromMinor(100, 'UGX');
    const b = Money.fromMinor(100, 'USD');
    expect(() => a.add(b)).toThrow(/Currency mismatch/);
  });

  it('detects zero', () => {
    expect(Money.fromMinor(0).isZero()).toBe(true);
    expect(Money.fromMinor(1).isZero()).toBe(false);
  });
});
