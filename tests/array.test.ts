import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.array', () => {
  describe('true test cases', () => {
    it('should return true for a normal array', () => {
      expect(is.array([1, 2, 3])).toBe(true);
    });

    it('should return true for an empty array', () => {
      expect(is.array([])).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a Float32Array', () => {
      expect(is.array(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.array(new Float64Array())).toBe(false);
    });

    it('should return false for an Int8Array', () => {
      expect(is.array(new Int8Array())).toBe(false);
    });

    it('should return false for an Int16Array', () => {
      expect(is.array(new Int16Array())).toBe(false);
    });

    it('should return false for an Int32Array', () => {
      expect(is.array(new Int32Array())).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.array(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.array(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.array(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.array(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.array(new BigInt64Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.array(new BigUint64Array())).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.array('')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.array(true)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.array(1)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.array(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.array(undefined)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.array({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.array({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.array(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.array(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.array(new Set())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.array(new Date())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.array(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.array(Symbol())).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.array(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.array(Promise.resolve())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.array(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.array(new WeakSet())).toBe(false);
    });

    it('should return false for a DataView', () => {
      expect(is.array(new DataView(new ArrayBuffer(8)))).toBe(false);
    });

    it('should return false for an ArrayBuffer', () => {
      expect(is.array(new ArrayBuffer(8))).toBe(false);
    });

    it('should return false for an array-like object', () => {
      expect(is.array({ 0: 'a', length: 1 })).toBe(false);
    });
  });
});

describe('is.array.empty', () => {
  describe('true test cases', () => {
    it('should return true for an empty array', () => {
      expect(is.array.empty([])).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a Float32Array', () => {
      expect(is.array.empty(new Float32Array())).toBe(false);
    });

    it('should return false for a Float64Array', () => {
      expect(is.array.empty(new Float64Array())).toBe(false);
    });

    it('should return false for an Int8Array', () => {
      expect(is.array.empty(new Int8Array())).toBe(false);
    });

    it('should return false for an Int16Array', () => {
      expect(is.array.empty(new Int16Array())).toBe(false);
    });

    it('should return false for an Int32Array', () => {
      expect(is.array.empty(new Int32Array())).toBe(false);
    });

    it('should return false for a Uint8Array', () => {
      expect(is.array.empty(new Uint8Array())).toBe(false);
    });

    it('should return false for a Uint16Array', () => {
      expect(is.array.empty(new Uint16Array())).toBe(false);
    });

    it('should return false for a Uint32Array', () => {
      expect(is.array.empty(new Uint32Array())).toBe(false);
    });

    it('should return false for a Uint8ClampedArray', () => {
      expect(is.array.empty(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for a BigInt64Array', () => {
      expect(is.array.empty(new BigInt64Array())).toBe(false);
    });

    it('should return false for a BigUint64Array', () => {
      expect(is.array.empty(new BigUint64Array())).toBe(false);
    });

    it('should return false for a normal array', () => {
      expect(is.array.empty([1, 2, 3])).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.array.empty('')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.array.empty(true)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.array.empty(1)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.array.empty(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.array.empty(undefined)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.array.empty({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.array.empty({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.array.empty(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.array.empty(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.array.empty(new Set())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.array.empty(new Date())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.array.empty(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.array.empty(Symbol())).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.array.empty(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.array.empty(Promise.resolve())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.array.empty(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.array.empty(new WeakSet())).toBe(false);
    });

    it('should return false for a DataView', () => {
      expect(is.array.empty(new DataView(new ArrayBuffer(8)))).toBe(false);
    });
  });
});

describe('is.array.nonEmpty', () => {
  describe('true test cases', () => {
    it('should return true for an normal array', () => {
      expect(is.array.nonEmpty([1, 2, 3])).toBe(true);
    });

    it('should return true for an array holding a single falsy item', () => {
      expect(is.array.nonEmpty([0])).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a non-empty Float32Array', () => {
      expect(is.array.nonEmpty(new Float32Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Float64Array', () => {
      expect(is.array.nonEmpty(new Float64Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Int8Array', () => {
      expect(is.array.nonEmpty(new Int8Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Int16Array', () => {
      expect(is.array.nonEmpty(new Int16Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Int32Array', () => {
      expect(is.array.nonEmpty(new Int32Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Uint8Array', () => {
      expect(is.array.nonEmpty(new Uint8Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Uint16Array', () => {
      expect(is.array.nonEmpty(new Uint16Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Uint32Array', () => {
      expect(is.array.nonEmpty(new Uint32Array([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty Uint8ClampedArray', () => {
      expect(is.array.nonEmpty(new Uint8ClampedArray([1, 2, 3]))).toBe(false);
    });

    it('should return false for a non-empty BigInt64Array', () => {
      expect(is.array.nonEmpty(new BigInt64Array([1n, 2n, 3n]))).toBe(false);
    });

    it('should return false for a non-empty BigUint64Array', () => {
      expect(is.array.nonEmpty(new BigUint64Array([1n, 2n, 3n]))).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.array.nonEmpty([])).toBe(false);
    });

    it('should return false for an empty Float32Array', () => {
      expect(is.array.nonEmpty(new Float32Array())).toBe(false);
    });

    it('should return false for an empty Float64Array', () => {
      expect(is.array.nonEmpty(new Float64Array())).toBe(false);
    });

    it('should return false for an empty Int8Array', () => {
      expect(is.array.nonEmpty(new Int8Array())).toBe(false);
    });

    it('should return false for an empty Int16Array', () => {
      expect(is.array.nonEmpty(new Int16Array())).toBe(false);
    });

    it('should return false for an empty Int32Array', () => {
      expect(is.array.nonEmpty(new Int32Array())).toBe(false);
    });

    it('should return false for an empty Uint8Array', () => {
      expect(is.array.nonEmpty(new Uint8Array())).toBe(false);
    });

    it('should return false for an empty Uint16Array', () => {
      expect(is.array.nonEmpty(new Uint16Array())).toBe(false);
    });

    it('should return false for an empty Uint32Array', () => {
      expect(is.array.nonEmpty(new Uint32Array())).toBe(false);
    });

    it('should return false for an empty Uint8ClampedArray', () => {
      expect(is.array.nonEmpty(new Uint8ClampedArray())).toBe(false);
    });

    it('should return false for an empty BigInt64Array', () => {
      expect(is.array.nonEmpty(new BigInt64Array())).toBe(false);
    });

    it('should return false for an empty BigUint64Array', () => {
      expect(is.array.nonEmpty(new BigUint64Array())).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.array.nonEmpty('')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(is.array.nonEmpty(true)).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.array.nonEmpty(1)).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.array.nonEmpty(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.array.nonEmpty(undefined)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.array.nonEmpty({})).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.array.nonEmpty({ a: 1 })).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.array.nonEmpty(() => {})).toBe(false);
    });

    it('should return false for a Map', () => {
      expect(is.array.nonEmpty(new Map())).toBe(false);
    });

    it('should return false for a Set', () => {
      expect(is.array.nonEmpty(new Set())).toBe(false);
    });

    it('should return false for a Date', () => {
      expect(is.array.nonEmpty(new Date())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.array.nonEmpty(/.*/)).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(is.array.nonEmpty(Symbol())).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.array.nonEmpty(new Error())).toBe(false);
    });

    it('should return false for a Promise', () => {
      expect(is.array.nonEmpty(Promise.resolve())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.array.nonEmpty(new WeakMap())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.array.nonEmpty(new WeakSet())).toBe(false);
    });

    it('should return false for a DataView', () => {
      expect(is.array.nonEmpty(new DataView(new ArrayBuffer(8)))).toBe(false);
    });
  });
});

describe('is.typedArray', () => {
  describe('true test cases', () => {
    it('should return true for a Float32Array', () => {
      expect(is.typedArray(new Float32Array())).toBe(true);
    });

    it('should return true for a Float64Array', () => {
      expect(is.typedArray(new Float64Array())).toBe(true);
    });

    it('should return true for an Int8Array', () => {
      expect(is.typedArray(new Int8Array())).toBe(true);
    });

    it('should return true for an Int16Array', () => {
      expect(is.typedArray(new Int16Array())).toBe(true);
    });

    it('should return true for an Int32Array', () => {
      expect(is.typedArray(new Int32Array())).toBe(true);
    });

    it('should return true for a Uint8Array', () => {
      expect(is.typedArray(new Uint8Array())).toBe(true);
    });

    it('should return true for a Uint16Array', () => {
      expect(is.typedArray(new Uint16Array())).toBe(true);
    });

    it('should return true for a Uint32Array', () => {
      expect(is.typedArray(new Uint32Array())).toBe(true);
    });

    it('should return true for a Uint8ClampedArray', () => {
      expect(is.typedArray(new Uint8ClampedArray())).toBe(true);
    });

    it('should return true for a BigInt64Array', () => {
      expect(is.typedArray(new BigInt64Array())).toBe(true);
    });

    it('should return true for a BigUint64Array', () => {
      expect(is.typedArray(new BigUint64Array())).toBe(true);
    });

    it('should return true for a non-empty typed array', () => {
      expect(is.typedArray(new Uint8Array([1, 2, 3]))).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a plain array', () => {
      expect(is.typedArray([1, 2, 3])).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(is.typedArray([])).toBe(false);
    });

    it('should return false for a DataView', () => {
      expect(is.typedArray(new DataView(new ArrayBuffer(8)))).toBe(false);
    });

    it('should return false for an ArrayBuffer', () => {
      expect(is.typedArray(new ArrayBuffer(8))).toBe(false);
    });

    it('should return false for a string', () => {
      expect(is.typedArray('')).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.typedArray(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.typedArray(undefined)).toBe(false);
    });

    it('should return false for an empty object', () => {
      expect(is.typedArray({})).toBe(false);
    });

    it('should return false for a number', () => {
      expect(is.typedArray(1)).toBe(false);
    });

    it('should return false for the typed array prototype', () => {
      expect(is.typedArray(Object.getPrototypeOf(Uint8Array.prototype))).toBe(false);
    });

    it('should return false for an object spoofing the typed array tag', () => {
      expect(is.typedArray({ [Symbol.toStringTag]: 'Uint8Array' })).toBe(false);
    });
  });
});
