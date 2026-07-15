import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.object.empty', () => {
  describe('true test cases', () => {
    it('should return true for an empty object', () => {
      expect(is.object.empty({})).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for an object with a property', () => {
      expect(is.object.empty({ a: 1 })).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.object.empty([])).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.object.empty('')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.object.empty(true)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.object.empty(1)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.object.empty(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.object.empty(undefined)).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.object.empty(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.object.empty(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.object.empty(new Set())).toBe(false);
    });

    it('should return false for a Date object', () => {
      expect(is.object.empty(new Date())).toBe(false);
    });

    it('should return false for a Date object created with a string', () => {
      expect(is.object.empty(new Date('2021-01-01T00:00:00.000Z'))).toBe(false);
    });

    it('should return false for Date object created with epoch timestamp', () => {
      expect(is.object.empty(new Date(1735689600))).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.object.empty(new Uint8Array())).toBe(false);
    });

    it('should return false for a Int8Array', () => {
      expect(is.object.empty(new Int8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.object.empty(new Uint16Array())).toBe(false);
    });

    it('should return false for a Int16Array', () => {
      expect(is.object.empty(new Int16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.object.empty(new Uint32Array())).toBe(false);
    });

    it('should return false for a Int32Array', () => {
      expect(is.object.empty(new Int32Array())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.object.empty(new BigInt64Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.object.empty(new BigUint64Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.object.empty(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.object.empty(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.object.empty(new Float64Array())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.object.empty(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.object.empty(new WeakSet())).toBe(false);
    });

    it('should return false for a BigInt', () => {
      expect(is.object.empty(BigInt(1))).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.object.empty(Symbol())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.object.empty(/.*/)).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.object.empty(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.object.empty(Promise.resolve())).toBe(false);
    });

    it('should return false for a DataView', () => {
      expect(is.object.empty(new DataView(new ArrayBuffer(8)))).toBe(false);
    });
  });
});

describe('is.object.plain', () => {
  describe('true test cases', () => {
    it('should return true for an empty object', () => {
      expect(is.object.plain({})).toBe(true);
    });

    it('should return true for an object with a property', () => {
      expect(is.object.plain({ a: 1 })).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for an empty array', () => {
      expect(is.object.plain([])).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.object.plain('')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.object.plain(true)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.object.plain(1)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.object.plain(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.object.plain(undefined)).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.object.plain(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.object.plain(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.object.plain(new Set())).toBe(false);
    });

    it('should return false for a Date object', () => {
      expect(is.object.plain(new Date())).toBe(false);
    });

    it('should return false for a Date object created with a string', () => {
      expect(is.object.plain(new Date('2021-01-01T00:00:00.000Z'))).toBe(false);
    });

    it('should return false for Date object created with epoch timestamp', () => {
      expect(is.object.plain(new Date(1735689600))).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.object.plain(new Uint8Array())).toBe(false);
    });

    it('should return false for a Int8Array', () => {
      expect(is.object.plain(new Int8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.object.plain(new Uint16Array())).toBe(false);
    });

    it('should return false for a Int16Array', () => {
      expect(is.object.plain(new Int16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.object.plain(new Uint32Array())).toBe(false);
    });

    it('should return false for a Int32Array', () => {
      expect(is.object.plain(new Int32Array())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.object.plain(new BigInt64Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.object.plain(new BigUint64Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.object.plain(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a Float32Array', () => {
      expect(is.object.plain(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.object.plain(new Float64Array())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.object.plain(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.object.plain(new WeakSet())).toBe(false);
    });

    it('should return false for a BigInt', () => {
      expect(is.object.plain(BigInt(1))).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.object.plain(Symbol())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.object.plain(/.*/)).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.object.plain(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.object.plain(Promise.resolve())).toBe(false);
    });

    it('should return false for a DataView', () => {
      expect(is.object.plain(new DataView(new ArrayBuffer(8)))).toBe(false);
    });
  });
});

describe('is.objectLike', () => {
  // The contract: byte-for-byte the classic `value !== null && typeof value === 'object'` guard.
  describe('true test cases', () => {
    it('should return true for a plain object', () => {
      expect(is.objectLike({ a: 1 })).toBe(true);
    });

    it('should return true for an empty object', () => {
      expect(is.objectLike({})).toBe(true);
    });

    it('should return true for a null-prototype object', () => {
      expect(is.objectLike(Object.create(null))).toBe(true);
    });

    it('should return true for a class instance', () => {
      expect(is.objectLike(new (class Foo {})())).toBe(true);
    });

    // The whole reason objectLike exists: is.object rejects these, the old hand-rolled guard did not.
    it('should return true for an array', () => {
      expect(is.objectLike([1, 2, 3])).toBe(true);
    });

    it('should return true for an empty array', () => {
      expect(is.objectLike([])).toBe(true);
    });

    it('should return true for a Date', () => {
      expect(is.objectLike(new Date())).toBe(true);
    });

    it('should return true for a Map', () => {
      expect(is.objectLike(new Map())).toBe(true);
    });

    it('should return true for a Set', () => {
      expect(is.objectLike(new Set())).toBe(true);
    });

    it('should return true for a RegExp', () => {
      expect(is.objectLike(/x/)).toBe(true);
    });

    it('should return true for an Error', () => {
      expect(is.objectLike(new Error('boom'))).toBe(true);
    });

    it('should return true for a typed array', () => {
      expect(is.objectLike(new Uint8Array(2))).toBe(true);
    });

    it('should return true for a boxed primitive', () => {
      expect(is.objectLike(new String('x'))).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for null', () => {
      expect(is.objectLike(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(is.objectLike(undefined)).toBe(false);
    });

    // typeof a function is 'function', not 'object'.
    it('should return false for a function', () => {
      expect(is.objectLike(() => {})).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.objectLike('str')).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.objectLike(42)).toBe(false);
    });

    it('should return false for zero', () => {
      expect(is.objectLike(0)).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.objectLike(true)).toBe(false);
    });

    it('should return false for a symbol', () => {
      expect(is.objectLike(Symbol('x'))).toBe(false);
    });

    it('should return false for a bigint', () => {
      expect(is.objectLike(10n)).toBe(false);
    });
  });

  // objectLike matches the classic guard exactly; is.object is the strict [object Object] subset.
  describe('relationship to is.object', () => {
    it('should be a strict superset of is.object', () => {
      const values: unknown[] = [
        {},
        { a: 1 },
        [1],
        new Date(),
        new Map(),
        /x/,
        null,
        42,
        'a',
        () => {},
      ];
      const impliesObjectLike = values.every((v) => !is.object(v) || is.objectLike(v));

      expect(impliesObjectLike).toBe(true);
    });

    it('should differ from is.object exactly on non-plain objects', () => {
      expect([is.object([1]), is.objectLike([1])]).toEqual([false, true]);
      expect([is.object(new Date()), is.objectLike(new Date())]).toEqual([false, true]);
    });
  });
});
