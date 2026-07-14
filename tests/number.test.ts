import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.number', () => {
  describe('true test cases', () => {
    it('should return true for a number', () => {
      expect(is.number(1)).toBe(true);
    });

    it('should return true for a negative number', () => {
      expect(is.number(-1)).toBe(true);
    });

    it('should return true for a decimal number', () => {
      expect(is.number(1.1)).toBe(true);
    });

    it('should return true for a negative decimal number', () => {
      expect(is.number(-1.1)).toBe(true);
    });
  });

  // Numeric strings are no longer numbers. `is.number('42')` used to be true and narrow to `number`,
  // so `raw + 1` compiled to '421' and `raw.toFixed()` was undefined. The coercion moved to
  // is.numeric — see numeric.test.ts.
  describe('false test cases', () => {
    it('should return false for a number string', () => {
      expect(is.number('1')).toBe(false);
    });

    it('should return false for a negative number string', () => {
      expect(is.number('-1')).toBe(false);
    });

    it('should return false for a decimal number string', () => {
      expect(is.number('1.1')).toBe(false);
    });

    it('should return false for a negative decimal number string', () => {
      expect(is.number('-1.1')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(is.number('')).toBe(false);
    });
    it('should return false for an whitespace string', () => {
      expect(is.number(' ')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(is.number(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(is.number(null)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.number('a')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.number(true)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.number({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.number({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.number(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.number(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.number(new Set())).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.number([])).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.number([1])).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.number(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.number(Symbol())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.number(new Date())).toBe(false);
    });

    it('should return false for a Date object created with a string', () => {
      expect(is.number(new Date('2021-01-01T00:00:00.000Z'))).toBe(false);
    });

    it('should return false for a Date object created with an epoch timestamp', () => {
      expect(is.number(new Date(1735689600))).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.number(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.number(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.number(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.number(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.number(new BigInt64Array())).toBe(false);
    });

    it('should return false for a Int8Array', () => {
      expect(is.number(new Int8Array())).toBe(false);
    });

    it('should return false for a Int16Array', () => {
      expect(is.number(new Int16Array())).toBe(false);
    });

    it('should return false for a Int32Array', () => {
      expect(is.number(new Int32Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.number(new BigUint64Array())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.number(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.number(new Float64Array())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.number(new WeakSet())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.number(new WeakMap())).toBe(false);
    });

    it('should return false for a BigInt', () => {
      expect(is.number(BigInt(1))).toBe(false);
    });

    it('should return false for a BigInt string', () => {
      expect(is.number('1n')).toBe(false);
    });
  });
});

describe('is.number.positive', () => {
  describe('true test cases', () => {
    it('should return true for a number', () => {
      expect(is.number.positive(1)).toBe(true);
    });

    it('should return true for a decimal number', () => {
      expect(is.number.positive(1.1)).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a number string', () => {
      expect(is.number.positive('1')).toBe(false);
    });

    it('should return false for a decimal number string', () => {
      expect(is.number.positive('1.1')).toBe(false);
    });

    it('should return false for a negative number', () => {
      expect(is.number.positive(-1)).toBe(false);
    });

    it('should return false for a negative number string', () => {
      expect(is.number.positive('-1')).toBe(false);
    });

    it('should return false for a negative decimal number', () => {
      expect(is.number.positive(-1.1)).toBe(false);
    });

    it('should return false for a negative decimal number string', () => {
      expect(is.number.positive('-1.1')).toBe(false);
    });
    it('should return false for an empty string', () => {
      expect(is.number.positive('')).toBe(false);
    });
    it('should return false for an whitespace string', () => {
      expect(is.number.positive(' ')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(is.number.positive(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(is.number.positive(null)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.number.positive('a')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.number.positive(true)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.number.positive({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.number.positive({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.number.positive(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.number.positive(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.number.positive(new Set())).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.number.positive([])).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.number.positive([1])).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.number.positive(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.number.positive(Symbol())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.number.positive(new Date())).toBe(false);
    });

    it('should return false for a Date object created with a string', () => {
      expect(is.number.positive(new Date('2021-01-01T00:00:00.000Z'))).toBe(false);
    });

    it('should return false for a Date object created with an epoch timestamp', () => {
      expect(is.number.positive(new Date(1735689600))).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.number.positive(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.number.positive(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.number.positive(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.number.positive(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.number.positive(new BigInt64Array())).toBe(false);
    });

    it('should return false for a Int8Array', () => {
      expect(is.number.positive(new Int8Array())).toBe(false);
    });

    it('should return false for a Int16Array', () => {
      expect(is.number.positive(new Int16Array())).toBe(false);
    });

    it('should return false for a Int32Array', () => {
      expect(is.number.positive(new Int32Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.number.positive(new BigUint64Array())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.number.positive(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.number.positive(new Float64Array())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.number.positive(new WeakSet())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.number.positive(new WeakMap())).toBe(false);
    });

    it('should return false for a BigInt', () => {
      expect(is.number.positive(BigInt(1))).toBe(false);
    });

    it('should return false for a BigInt string', () => {
      expect(is.number.positive('1n')).toBe(false);
    });
  });
});

describe('is.number.integer', () => {
  describe('true test cases', () => {
    it('should return true for a number', () => {
      expect(is.number.integer(1)).toBe(true);
    });

    it('should return true for a negative number', () => {
      expect(is.number.integer(-1)).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a number string', () => {
      expect(is.number.integer('1')).toBe(false);
    });

    it('should return false for a negative number string', () => {
      expect(is.number.integer('-1')).toBe(false);
    });

    it('should return false for a decimal number', () => {
      expect(is.number.integer(1.1)).toBe(false);
    });

    it('should return false for a negative decimal number', () => {
      expect(is.number.integer(-1.1)).toBe(false);
    });

    it('should return false for a decimal number string', () => {
      expect(is.number.integer('1.1')).toBe(false);
    });

    it('should return false for a negative decimal number string', () => {
      expect(is.number.integer('-1.1')).toBe(false);
    });
    it('should return false for an empty string', () => {
      expect(is.number.integer('')).toBe(false);
    });
    it('should return false for an whitespace string', () => {
      expect(is.number.integer(' ')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(is.number.integer(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(is.number.integer(null)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.number.integer('a')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.number.integer(true)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.number.integer({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.number.integer({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.number.integer(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.number.integer(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.number.integer(new Set())).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.number.integer([])).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.number.integer([1])).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.number.integer(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.number.integer(Symbol())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.number.integer(new Date())).toBe(false);
    });

    it('should return false for a Date object created with a string', () => {
      expect(is.number.integer(new Date('2021-01-01T00:00:00.000Z'))).toBe(false);
    });

    it('should return false for a Date object created with an epoch timestamp', () => {
      expect(is.number.integer(new Date(1735689600))).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.number.integer(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.number.integer(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.number.integer(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.number.integer(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.number.integer(new BigInt64Array())).toBe(false);
    });

    it('should return false for a Int8Array', () => {
      expect(is.number.integer(new Int8Array())).toBe(false);
    });

    it('should return false for a Int16Array', () => {
      expect(is.number.integer(new Int16Array())).toBe(false);
    });

    it('should return false for a Int32Array', () => {
      expect(is.number.integer(new Int32Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.number.integer(new BigUint64Array())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.number.integer(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.number.integer(new Float64Array())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.number.integer(new WeakSet())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.number.integer(new WeakMap())).toBe(false);
    });

    it('should return false for a BigInt', () => {
      expect(is.number.integer(BigInt(1))).toBe(false);
    });

    it('should return false for a BigInt string', () => {
      expect(is.number.integer('1n')).toBe(false);
    });
  });
});

describe('is.number.positiveInteger', () => {
  describe('true test cases', () => {
    it('should return true for a number', () => {
      expect(is.number.positiveInteger(1)).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a number string', () => {
      expect(is.number.positiveInteger('1')).toBe(false);
    });

    it('should return false for a negative number', () => {
      expect(is.number.positiveInteger(-1)).toBe(false);
    });

    it('should return false for a negative number string', () => {
      expect(is.number.positiveInteger('-1')).toBe(false);
    });

    it('should return false for a decimal number', () => {
      expect(is.number.positiveInteger(1.1)).toBe(false);
    });

    it('should return false for a negative decimal number', () => {
      expect(is.number.positiveInteger(-1.1)).toBe(false);
    });

    it('should return false for a decimal number string', () => {
      expect(is.number.positiveInteger('1.1')).toBe(false);
    });

    it('should return false for a negative decimal number string', () => {
      expect(is.number.positiveInteger('-1.1')).toBe(false);
    });
    it('should return false for an empty string', () => {
      expect(is.number.positiveInteger('')).toBe(false);
    });
    it('should return false for an whitespace string', () => {
      expect(is.number.positiveInteger(' ')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(is.number.positiveInteger(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(is.number.positiveInteger(null)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.number.positiveInteger('a')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.number.positiveInteger(true)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.number.positiveInteger({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.number.positiveInteger({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.number.positiveInteger(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.number.positiveInteger(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.number.positiveInteger(new Set())).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.number.positiveInteger([])).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.number.positiveInteger([1])).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.number.positiveInteger(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.number.positiveInteger(Symbol())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.number.positiveInteger(new Date())).toBe(false);
    });

    it('should return false for a Date object created with a string', () => {
      expect(is.number.positiveInteger(new Date('2021-01-01T00:00:00.000Z'))).toBe(false);
    });

    it('should return false for a Date object created with an epoch timestamp', () => {
      expect(is.number.positiveInteger(new Date(1735689600))).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.number.positiveInteger(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.number.positiveInteger(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.number.positiveInteger(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.number.positiveInteger(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.number.positiveInteger(new BigInt64Array())).toBe(false);
    });

    it('should return false for a Int8Array', () => {
      expect(is.number.positiveInteger(new Int8Array())).toBe(false);
    });

    it('should return false for a Int16Array', () => {
      expect(is.number.positiveInteger(new Int16Array())).toBe(false);
    });

    it('should return false for a Int32Array', () => {
      expect(is.number.positiveInteger(new Int32Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.number.positiveInteger(new BigUint64Array())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.number.positiveInteger(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.number.positiveInteger(new Float64Array())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.number.positiveInteger(new WeakSet())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.number.positiveInteger(new WeakMap())).toBe(false);
    });

    it('should return false for a BigInt', () => {
      expect(is.number.positiveInteger(BigInt(1))).toBe(false);
    });

    it('should return false for a BigInt string', () => {
      expect(is.number.positiveInteger('1n')).toBe(false);
    });
  });
});

describe('is.number.finite', () => {
  it('should return true for a number', () => {
    expect(is.number.finite(42)).toBe(true);
  });

  it('should return true for zero', () => {
    expect(is.number.finite(0)).toBe(true);
  });

  it('should return false for NaN', () => {
    expect(is.number.finite(NaN)).toBe(false);
  });

  it('should return false for Infinity', () => {
    expect(is.number.finite(Infinity)).toBe(false);
  });

  it('should return false for -Infinity', () => {
    expect(is.number.finite(-Infinity)).toBe(false);
  });

  it('should return false for a numeric string', () => {
    expect(is.number.finite('42')).toBe(false);
  });
});

describe('is.number.nan', () => {
  it('should return true for NaN', () => {
    expect(is.number.nan(NaN)).toBe(true);
  });

  it('should return true for a computed NaN', () => {
    expect(is.number.nan(0 / 0)).toBe(true);
  });

  // The global isNaN() coerces, so isNaN('abc') is true. Number.isNaN does not.
  it('should return false for a non-numeric string', () => {
    expect(is.number.nan('abc')).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(is.number.nan(undefined)).toBe(false);
  });

  it('should return false for a number', () => {
    expect(is.number.nan(42)).toBe(false);
  });
});

describe('is.number.negative', () => {
  it('should return true for a negative number', () => {
    expect(is.number.negative(-1)).toBe(true);
  });

  it('should return false for zero', () => {
    expect(is.number.negative(0)).toBe(false);
  });

  it('should return false for negative zero', () => {
    expect(is.number.negative(-0)).toBe(false);
  });

  it('should return false for a positive number', () => {
    expect(is.number.negative(1)).toBe(false);
  });

  it('should return false for -Infinity', () => {
    expect(is.number.negative(-Infinity)).toBe(false);
  });
});

describe('is.number.nonNegative', () => {
  it('should return true for zero', () => {
    expect(is.number.nonNegative(0)).toBe(true);
  });

  it('should return true for a positive number', () => {
    expect(is.number.nonNegative(1)).toBe(true);
  });

  it('should return false for a negative number', () => {
    expect(is.number.nonNegative(-1)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(is.number.nonNegative(NaN)).toBe(false);
  });
});

describe('is.number.safeInteger', () => {
  it('should return true for a small integer', () => {
    expect(is.number.safeInteger(42)).toBe(true);
  });

  it('should return true for MAX_SAFE_INTEGER', () => {
    expect(is.number.safeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  // Beyond this, JS numbers stop being exactly representable — which is where they meet 64-bit
  // database integer columns and start silently losing precision.
  it('should return false beyond MAX_SAFE_INTEGER', () => {
    expect(is.number.safeInteger(2 ** 53)).toBe(false);
  });

  it('should return false for a float', () => {
    expect(is.number.safeInteger(1.5)).toBe(false);
  });

  it('should return false for a numeric string', () => {
    expect(is.number.safeInteger('42')).toBe(false);
  });
});

describe('is.number sign checks gate on finiteness', () => {
  // In v3 these returned true, because the sign checks did not exclude Infinity. That was a bug.
  it('should return false for is.number.positive(Infinity)', () => {
    expect(is.number.positive(Infinity)).toBe(false);
  });

  it('should return false for is.number.negative(-Infinity)', () => {
    expect(is.number.negative(-Infinity)).toBe(false);
  });

  it('should return false for is.number.positive(NaN)', () => {
    expect(is.number.positive(NaN)).toBe(false);
  });
});

describe('is.number accepts NaN and Infinity as numbers', () => {
  // They really are of type number. is.number.finite is the check that excludes them.
  it('should return true for NaN', () => {
    expect(is.number(NaN)).toBe(true);
  });

  it('should return true for Infinity', () => {
    expect(is.number(Infinity)).toBe(true);
  });
});
