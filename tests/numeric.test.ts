import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.numeric', () => {
  describe('true test cases', () => {
    it('should return true for a number', () => {
      expect(is.numeric(42)).toBe(true);
    });

    it('should return true for a negative number', () => {
      expect(is.numeric(-42)).toBe(true);
    });

    it('should return true for zero', () => {
      expect(is.numeric(0)).toBe(true);
    });

    it('should return true for a number string', () => {
      expect(is.numeric('42')).toBe(true);
    });

    it('should return true for a negative number string', () => {
      expect(is.numeric('-42')).toBe(true);
    });

    it('should return true for an explicitly positive number string', () => {
      expect(is.numeric('+5')).toBe(true);
    });

    it('should return true for a decimal number string', () => {
      expect(is.numeric('3.14')).toBe(true);
    });

    // The v3 is.number regex capped at two decimal places, so this was false. That was a bug.
    it('should return true for a decimal string beyond two places', () => {
      expect(is.numeric('3.14159')).toBe(true);
    });

    it('should return true for a leading-dot decimal string', () => {
      expect(is.numeric('.5')).toBe(true);
    });

    it('should return true for a trailing-dot decimal string', () => {
      expect(is.numeric('5.')).toBe(true);
    });

    it('should return true for a scientific notation string', () => {
      expect(is.numeric('1e5')).toBe(true);
    });

    it('should return true for a negative-exponent scientific notation string', () => {
      expect(is.numeric('1e-7')).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for NaN', () => {
      expect(is.numeric(NaN)).toBe(false);
    });

    it('should return false for Infinity', () => {
      expect(is.numeric(Infinity)).toBe(false);
    });

    it('should return false for -Infinity', () => {
      expect(is.numeric(-Infinity)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(is.numeric('')).toBe(false);
    });

    it('should return false for a whitespace string', () => {
      expect(is.numeric('   ')).toBe(false);
    });

    // v3's is.number returned TRUE for each of these three, all of which coerce to NaN.
    it('should return false for a lone dot', () => {
      expect(is.numeric('.')).toBe(false);
    });

    it('should return false for a lone minus sign', () => {
      expect(is.numeric('-')).toBe(false);
    });

    it('should return false for a minus sign and a dot', () => {
      expect(is.numeric('-.')).toBe(false);
    });

    it('should return false for a hex literal string', () => {
      expect(is.numeric('0x10')).toBe(false);
    });

    it('should return false for a binary literal string', () => {
      expect(is.numeric('0b101')).toBe(false);
    });

    it('should return false for a whitespace-padded number string', () => {
      expect(is.numeric(' 42 ')).toBe(false);
    });

    it("should return false for the string 'Infinity'", () => {
      expect(is.numeric('Infinity')).toBe(false);
    });

    it("should return false for the string 'NaN'", () => {
      expect(is.numeric('NaN')).toBe(false);
    });

    // Matches the shape regex, but overflows to Infinity — the magnitude check catches it.
    it('should return false for a string that overflows to Infinity', () => {
      expect(is.numeric('1e999')).toBe(false);
    });

    it('should return false for a non-numeric string', () => {
      expect(is.numeric('abc')).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.numeric(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.numeric(undefined)).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.numeric(true)).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.numeric([1])).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.numeric({})).toBe(false);
    });

    it('should return false for a bigint', () => {
      expect(is.numeric(10n)).toBe(false);
    });
  });
});

describe('is.numeric.parse', () => {
  it('should parse a number string', () => {
    expect(is.numeric.parse('42')).toBe(42);
  });

  it('should parse a decimal string', () => {
    expect(is.numeric.parse('3.14')).toBe(3.14);
  });

  it('should parse a negative string', () => {
    expect(is.numeric.parse('-7')).toBe(-7);
  });

  it('should parse scientific notation', () => {
    expect(is.numeric.parse('1e3')).toBe(1000);
  });

  it('should pass a number through', () => {
    expect(is.numeric.parse(42)).toBe(42);
  });

  it('should return undefined for a non-numeric string', () => {
    expect(is.numeric.parse('abc')).toBeUndefined();
  });

  it('should return undefined for an empty string', () => {
    expect(is.numeric.parse('')).toBeUndefined();
  });

  it('should return undefined for a null', () => {
    expect(is.numeric.parse(null)).toBeUndefined();
  });

  it('should return undefined for NaN', () => {
    expect(is.numeric.parse(NaN)).toBeUndefined();
  });

  // The contract that makes parse safe to use without a follow-up guard.
  it('should never return NaN', () => {
    const inputs = ['abc', '', '   ', '.', '-', NaN, Infinity, null, undefined, {}, []];
    const parsed = inputs.map((input) => is.numeric.parse(input));

    expect(parsed.every((value) => value === undefined)).toBe(true);
  });
});
