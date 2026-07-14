import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.map', () => {
  describe('true test cases', () => {
    it('should return true for an empty Map', () => {
      expect(is.map(new Map())).toBe(true);
    });

    it('should return true for a populated Map', () => {
      expect(is.map(new Map([['a', 1]]))).toBe(true);
    });

    it('should return true for a Map subclass', () => {
      class MyMap extends Map {}

      expect(is.map(new MyMap())).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a Set', () => {
      expect(is.map(new Set())).toBe(false);
    });

    it('should return false for a WeakMap', () => {
      expect(is.map(new WeakMap())).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.map({})).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.map([])).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.map(null)).toBe(false);
    });

    it('should return false for an undefined', () => {
      expect(is.map(undefined)).toBe(false);
    });
  });
});

describe('is.map.empty', () => {
  it('should return true for an empty Map', () => {
    expect(is.map.empty(new Map())).toBe(true);
  });

  it('should return false for a populated Map', () => {
    expect(is.map.empty(new Map([['a', 1]]))).toBe(false);
  });

  it('should return false for a non-Map', () => {
    expect(is.map.empty({})).toBe(false);
  });
});

describe('is.map.nonEmpty', () => {
  it('should return true for a populated Map', () => {
    expect(is.map.nonEmpty(new Map([['a', 1]]))).toBe(true);
  });

  it('should return false for an empty Map', () => {
    expect(is.map.nonEmpty(new Map())).toBe(false);
  });

  it('should return false for a non-Map', () => {
    expect(is.map.nonEmpty({})).toBe(false);
  });
});

describe('is.set', () => {
  describe('true test cases', () => {
    it('should return true for an empty Set', () => {
      expect(is.set(new Set())).toBe(true);
    });

    it('should return true for a populated Set', () => {
      expect(is.set(new Set([1]))).toBe(true);
    });

    it('should return true for a Set subclass', () => {
      class MySet extends Set {}

      expect(is.set(new MySet())).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for a Map', () => {
      expect(is.set(new Map())).toBe(false);
    });

    it('should return false for a WeakSet', () => {
      expect(is.set(new WeakSet())).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.set([1, 2])).toBe(false);
    });

    it('should return false for an object', () => {
      expect(is.set({})).toBe(false);
    });

    it('should return false for a null', () => {
      expect(is.set(null)).toBe(false);
    });
  });
});

describe('is.set.empty', () => {
  it('should return true for an empty Set', () => {
    expect(is.set.empty(new Set())).toBe(true);
  });

  it('should return false for a populated Set', () => {
    expect(is.set.empty(new Set([1]))).toBe(false);
  });

  it('should return false for a non-Set', () => {
    expect(is.set.empty([])).toBe(false);
  });
});

describe('is.set.nonEmpty', () => {
  it('should return true for a populated Set', () => {
    expect(is.set.nonEmpty(new Set([1]))).toBe(true);
  });

  it('should return false for an empty Set', () => {
    expect(is.set.nonEmpty(new Set())).toBe(false);
  });

  it('should return false for a non-Set', () => {
    expect(is.set.nonEmpty([1])).toBe(false);
  });
});

describe('is.empty', () => {
  describe('true test cases', () => {
    it('should return true for a null', () => {
      expect(is.empty(null)).toBe(true);
    });

    it('should return true for an undefined', () => {
      expect(is.empty(undefined)).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(is.empty('')).toBe(true);
    });

    it('should return true for a whitespace-only string', () => {
      expect(is.empty('   ')).toBe(true);
    });

    it('should return true for an empty array', () => {
      expect(is.empty([])).toBe(true);
    });

    it('should return true for an empty object', () => {
      expect(is.empty({})).toBe(true);
    });

    it('should return true for an empty Map', () => {
      expect(is.empty(new Map())).toBe(true);
    });

    it('should return true for an empty Set', () => {
      expect(is.empty(new Set())).toBe(true);
    });

    it('should return true for an empty typed array', () => {
      expect(is.empty(new Uint8Array(0))).toBe(true);
    });

    it('should return true for an object with no own enumerable keys', () => {
      expect(is.empty(Object.create(null))).toBe(true);
    });
  });

  describe('false test cases', () => {
    // 0 and false are values, not absences. This is the boundary readers get wrong.
    it('should return false for zero', () => {
      expect(is.empty(0)).toBe(false);
    });

    it('should return false for false', () => {
      expect(is.empty(false)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(is.empty(NaN)).toBe(false);
    });

    it('should return false for a non-empty string', () => {
      expect(is.empty('a')).toBe(false);
    });

    it('should return false for a non-empty array', () => {
      expect(is.empty([1])).toBe(false);
    });

    it('should return false for a non-empty object', () => {
      expect(is.empty({ a: 1 })).toBe(false);
    });

    it('should return false for a non-empty Map', () => {
      expect(is.empty(new Map([['a', 1]]))).toBe(false);
    });

    it('should return false for a non-empty Set', () => {
      expect(is.empty(new Set([1]))).toBe(false);
    });

    it('should return false for a non-empty typed array', () => {
      expect(is.empty(new Uint8Array(2))).toBe(false);
    });

    // A Date has no own enumerable keys, but it is not an empty object.
    it('should return false for a Date', () => {
      expect(is.empty(new Date())).toBe(false);
    });

    it('should return false for a RegExp', () => {
      expect(is.empty(/x/)).toBe(false);
    });

    it('should return false for an Error', () => {
      expect(is.empty(new Error('boom'))).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.empty(() => {})).toBe(false);
    });

    it('should return false for a symbol', () => {
      expect(is.empty(Symbol('x'))).toBe(false);
    });
  });

  // is.nothing is string-shaped; is.empty is container-shaped. They disagree on [] and {}.
  describe('versus is.nothing', () => {
    it('should differ from is.nothing on an empty array', () => {
      expect([is.nothing([]), is.empty([])]).toEqual([false, true]);
    });

    it('should differ from is.nothing on an empty object', () => {
      expect([is.nothing({}), is.empty({})]).toEqual([false, true]);
    });

    it('should agree with is.nothing on a blank string', () => {
      expect([is.nothing('  '), is.empty('  ')]).toEqual([true, true]);
    });

    it('should agree with is.nothing on a null', () => {
      expect([is.nothing(null), is.empty(null)]).toEqual([true, true]);
    });
  });
});
