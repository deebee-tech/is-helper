import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.boolean', () => {
  describe('true test cases', () => {
    it('should return true for a true boolean', () => {
      expect(is.boolean(true)).toBe(true);
    });

    it('should return true for a false boolean', () => {
      expect(is.boolean(false)).toBe(true);
    });
  });

  // Boolean-like values are no longer booleans. `is.boolean('no')` used to be true and narrow to
  // `boolean` — and `'no'` is truthy, so `if (is.boolean(x)) { if (x) ... }` took the true branch
  // for a value that means false. The coercion moved to `.like`, which is asserted below.
  describe('false test cases', () => {
    it("should return false for a string of 'true'", () => {
      expect(is.boolean('true')).toBe(false);
    });

    it("should return false for a string of 'false'", () => {
      expect(is.boolean('false')).toBe(false);
    });

    it("should return false for a string of 'TRUE'", () => {
      expect(is.boolean('TRUE')).toBe(false);
    });

    it("should return false for a string of 'FALSE'", () => {
      expect(is.boolean('FALSE')).toBe(false);
    });

    it("should return false for a string of '1'", () => {
      expect(is.boolean('1')).toBe(false);
    });

    it("should return false for a string of '0'", () => {
      expect(is.boolean('0')).toBe(false);
    });

    it('should return false for a number of 1', () => {
      expect(is.boolean(1)).toBe(false);
    });

    it('should return false for a number of 0', () => {
      expect(is.boolean(0)).toBe(false);
    });

    it("should return false for a string of 'y'", () => {
      expect(is.boolean('y')).toBe(false);
    });

    it("should return false for a string of 'n'", () => {
      expect(is.boolean('n')).toBe(false);
    });

    it("should return false for a string of 'yes'", () => {
      expect(is.boolean('yes')).toBe(false);
    });

    it("should return false for a string of 'no'", () => {
      expect(is.boolean('no')).toBe(false);
    });

    it("should return false for a string of 'Y'", () => {
      expect(is.boolean('Y')).toBe(false);
    });

    it("should return false for a string of 'N'", () => {
      expect(is.boolean('N')).toBe(false);
    });

    it("should return false for a string of 'YES'", () => {
      expect(is.boolean('YES')).toBe(false);
    });

    it("should return false for a string of 'NO'", () => {
      expect(is.boolean('NO')).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.boolean('')).toBe(false);
    });

    it('should return false for a non-binary number', () => {
      expect(is.boolean(2)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.boolean(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.boolean(undefined)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.boolean({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.boolean({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.boolean(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.boolean(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.boolean(new Set())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.boolean(new Date())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.boolean(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.boolean(Symbol())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.boolean(new Date())).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.boolean([])).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.boolean([1])).toBe(false);
    });

    it('should return false for an array or booleans', () => {
      expect(is.boolean([true])).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.boolean(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.boolean(Promise.resolve())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.boolean(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.boolean(new WeakSet())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.boolean(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.boolean(new Float64Array())).toBe(false);
    });

    it('should return false for an Int8Array', () => {
      expect(is.boolean(new Int8Array())).toBe(false);
    });

    it('should return false for an Int16Array', () => {
      expect(is.boolean(new Int16Array())).toBe(false);
    });

    it('should return false for an Int32Array', () => {
      expect(is.boolean(new Int32Array())).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.boolean(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.boolean(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.boolean(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.boolean(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.boolean(new BigInt64Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.boolean(new BigUint64Array())).toBe(false);
    });
  });
});

describe('is.boolean.like', () => {
  describe('true test cases', () => {
    it('should return true for a true boolean', () => {
      expect(is.boolean.like(true)).toBe(true);
    });

    it('should return true for a false boolean', () => {
      expect(is.boolean.like(false)).toBe(true);
    });

    it("should return true for a string of 'true'", () => {
      expect(is.boolean.like('true')).toBe(true);
    });

    it("should return true for a string of 'false'", () => {
      expect(is.boolean.like('false')).toBe(true);
    });

    it("should return true for a string of 'TRUE'", () => {
      expect(is.boolean.like('TRUE')).toBe(true);
    });

    it("should return true for a string of 'FALSE'", () => {
      expect(is.boolean.like('FALSE')).toBe(true);
    });

    it("should return true for a string of '1'", () => {
      expect(is.boolean.like('1')).toBe(true);
    });

    it("should return true for a string of '0'", () => {
      expect(is.boolean.like('0')).toBe(true);
    });

    it('should return true for a number of 1', () => {
      expect(is.boolean.like(1)).toBe(true);
    });

    it('should return true for a number of 0', () => {
      expect(is.boolean.like(0)).toBe(true);
    });

    it("should return true for a string of 'y'", () => {
      expect(is.boolean.like('y')).toBe(true);
    });

    it("should return true for a string of 'n'", () => {
      expect(is.boolean.like('n')).toBe(true);
    });

    it("should return true for a string of 'yes'", () => {
      expect(is.boolean.like('yes')).toBe(true);
    });

    it("should return true for a string of 'no'", () => {
      expect(is.boolean.like('no')).toBe(true);
    });

    it("should return true for a string of 'Y'", () => {
      expect(is.boolean.like('Y')).toBe(true);
    });

    it("should return true for a string of 'N'", () => {
      expect(is.boolean.like('N')).toBe(true);
    });

    it("should return true for a string of 'YES'", () => {
      expect(is.boolean.like('YES')).toBe(true);
    });

    it("should return true for a string of 'NO'", () => {
      expect(is.boolean.like('NO')).toBe(true);
    });
  });

  describe('false test cases', () => {
    it("should return false for a string of 'maybe'", () => {
      expect(is.boolean.like('maybe')).toBe(false);
    });

    it('should return false for a non-binary number', () => {
      expect(is.boolean.like(2)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(is.boolean.like('')).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.boolean.like(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.boolean.like(undefined)).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.boolean.like({})).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.boolean.like([])).toBe(false);
    });
  });
});

describe('is.boolean.value', () => {
  describe('true test cases', () => {
    it('should return true for a true boolean', () => {
      expect(is.boolean.value(true)).toBe(true);
    });

    it("should return true for a string of 'true'", () => {
      expect(is.boolean.value('true')).toBe(true);
    });

    it("should return true for a string of 'TRUE'", () => {
      expect(is.boolean.value('TRUE')).toBe(true);
    });

    it("should return true for a string of '1'", () => {
      expect(is.boolean.value('1')).toBe(true);
    });

    it('should return true for a number of 1', () => {
      expect(is.boolean.value(1)).toBe(true);
    });

    it("should return true for a string of 'y'", () => {
      expect(is.boolean.value('y')).toBe(true);
    });

    it("should return true for a string of 'yes'", () => {
      expect(is.boolean.value('yes')).toBe(true);
    });

    it("should return true for a string of 'Y'", () => {
      expect(is.boolean.value('Y')).toBe(true);
    });

    it("should return true for a string of 'YES'", () => {
      expect(is.boolean.value('YES')).toBe(true);
    });
  });
  describe('false test cases', () => {
    it('should return true for a false boolean', () => {
      expect(is.boolean.value(false)).toBe(false);
    });

    it("should return true for a string of 'false'", () => {
      expect(is.boolean.value('false')).toBe(false);
    });

    it("should return true for a string of 'FALSE'", () => {
      expect(is.boolean.value('FALSE')).toBe(false);
    });

    it("should return true for a string of '0'", () => {
      expect(is.boolean.value('0')).toBe(false);
    });

    it('should return true for a number of 0', () => {
      expect(is.boolean.value(0)).toBe(false);
    });

    it("should return true for a string of 'n'", () => {
      expect(is.boolean.value('n')).toBe(false);
    });

    it("should return true for a string of 'no'", () => {
      expect(is.boolean.value('no')).toBe(false);
    });

    it("should return true for a string of 'N'", () => {
      expect(is.boolean.value('N')).toBe(false);
    });

    it("should return true for a string of 'NO'", () => {
      expect(is.boolean.value('NO')).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.boolean.value('')).toBe(false);
    });

    it('should return false for a non-binary number', () => {
      expect(is.boolean.value(2)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.boolean.value(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.boolean.value(undefined)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.boolean.value({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.boolean.value({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.boolean.value(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.boolean.value(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.boolean.value(new Set())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.boolean.value(new Date())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.boolean.value(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.boolean.value(Symbol())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.boolean.value(new Date())).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.boolean.value([])).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.boolean.value([1])).toBe(false);
    });

    it('should return false for an array or booleans', () => {
      expect(is.boolean.value([true])).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.boolean.value(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.boolean.value(Promise.resolve())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.boolean.value(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.boolean.value(new WeakSet())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.boolean.value(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.boolean.value(new Float64Array())).toBe(false);
    });

    it('should return false for an Int8Array', () => {
      expect(is.boolean.value(new Int8Array())).toBe(false);
    });

    it('should return false for an Int16Array', () => {
      expect(is.boolean.value(new Int16Array())).toBe(false);
    });

    it('should return false for an Int32Array', () => {
      expect(is.boolean.value(new Int32Array())).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.boolean.value(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.boolean.value(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.boolean.value(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.boolean.value(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.boolean.value(new BigInt64Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.boolean.value(new BigUint64Array())).toBe(false);
    });
  });
});
