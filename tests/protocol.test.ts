import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.symbol', () => {
  it('should return true for a symbol', () => {
    expect(is.symbol(Symbol('x'))).toBe(true);
  });

  it('should return true for a well-known symbol', () => {
    expect(is.symbol(Symbol.iterator)).toBe(true);
  });

  it('should return false for a string', () => {
    expect(is.symbol('x')).toBe(false);
  });

  it('should return false for a symbol wrapper object', () => {
    expect(is.symbol(Object(Symbol('x')))).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.symbol(null)).toBe(false);
  });
});

describe('is.bigint', () => {
  it('should return true for a bigint', () => {
    expect(is.bigint(10n)).toBe(true);
  });

  it('should return true for a zero bigint', () => {
    expect(is.bigint(0n)).toBe(true);
  });

  it('should return false for a number', () => {
    expect(is.bigint(10)).toBe(false);
  });

  // No coercion here — that would make the `value is bigint` guard lie.
  it('should return false for a numeric string', () => {
    expect(is.bigint('10')).toBe(false);
  });

  it('should return false for a bigint wrapper object', () => {
    expect(is.bigint(Object(10n))).toBe(false);
  });
});

describe('is.regexp', () => {
  it('should return true for a regexp literal', () => {
    expect(is.regexp(/x/)).toBe(true);
  });

  it('should return true for a RegExp instance', () => {
    expect(is.regexp(new RegExp('x'))).toBe(true);
  });

  it('should return false for a string', () => {
    expect(is.regexp('/x/')).toBe(false);
  });

  it('should return false for an object', () => {
    expect(is.regexp({})).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.regexp(null)).toBe(false);
  });
});

describe('is.primitive', () => {
  describe('true test cases', () => {
    it('should return true for a string', () => {
      expect(is.primitive('a')).toBe(true);
    });

    it('should return true for a number', () => {
      expect(is.primitive(1)).toBe(true);
    });

    it('should return true for a bigint', () => {
      expect(is.primitive(10n)).toBe(true);
    });

    it('should return true for a boolean', () => {
      expect(is.primitive(true)).toBe(true);
    });

    it('should return true for a symbol', () => {
      expect(is.primitive(Symbol('x'))).toBe(true);
    });

    it('should return true for a null', () => {
      expect(is.primitive(null)).toBe(true);
    });

    it('should return true for an undefined', () => {
      expect(is.primitive(undefined)).toBe(true);
    });
  });

  describe('false test cases', () => {
    it('should return false for an object', () => {
      expect(is.primitive({})).toBe(false);
    });

    it('should return false for an array', () => {
      expect(is.primitive([])).toBe(false);
    });

    it('should return false for a function', () => {
      expect(is.primitive(() => {})).toBe(false);
    });

    // Not the same as !is.object — is.object(new Date()) is false too.
    it('should return false for a Date', () => {
      expect(is.primitive(new Date())).toBe(false);
    });

    it('should return false for a boxed primitive', () => {
      expect(is.primitive(new String('x'))).toBe(false);
    });
  });
});

describe('is.promise', () => {
  it('should return true for a resolved Promise', () => {
    expect(is.promise(Promise.resolve())).toBe(true);
  });

  it('should return true for a pending Promise', () => {
    expect(is.promise(new Promise(() => {}))).toBe(true);
  });

  it('should return false for a plain thenable', () => {
    expect(is.promise({ then() {} })).toBe(false);
  });

  it('should return false for an object', () => {
    expect(is.promise({})).toBe(false);
  });

  it('should return false for a function', () => {
    expect(is.promise(() => {})).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.promise(null)).toBe(false);
  });
});

describe('is.promise.like', () => {
  it('should return true for a native Promise', () => {
    expect(is.promise.like(Promise.resolve())).toBe(true);
  });

  // This is what `await` actually cares about.
  it('should return true for a plain thenable', () => {
    expect(is.promise.like({ then() {} })).toBe(true);
  });

  it('should return true for a function with a then method', () => {
    const thenable = () => {};
    thenable.then = () => {};

    expect(is.promise.like(thenable)).toBe(true);
  });

  it('should return false for an object with a non-callable then', () => {
    expect(is.promise.like({ then: 1 })).toBe(false);
  });

  it('should return false for an object', () => {
    expect(is.promise.like({})).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.promise.like(null)).toBe(false);
  });
});

describe('is.iterable', () => {
  it('should return true for an array', () => {
    expect(is.iterable([1, 2])).toBe(true);
  });

  it('should return true for a Map', () => {
    expect(is.iterable(new Map())).toBe(true);
  });

  it('should return true for a Set', () => {
    expect(is.iterable(new Set())).toBe(true);
  });

  // Strings are iterable per spec. For "a collection but not a string", compose with is.not.
  it('should return true for a string', () => {
    expect(is.iterable('abc')).toBe(true);
  });

  it('should return true for a generator object', () => {
    function* gen() {
      yield 1;
    }

    expect(is.iterable(gen())).toBe(true);
  });

  // The generator FUNCTION is not iterable; the object it returns is.
  it('should return false for a generator function', () => {
    function* gen() {
      yield 1;
    }

    expect(is.iterable(gen)).toBe(false);
  });

  it('should return false for a plain object', () => {
    expect(is.iterable({})).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.iterable(null)).toBe(false);
  });
});

describe('is.asyncIterable', () => {
  it('should return true for an async generator object', () => {
    async function* gen() {
      yield 1;
    }

    expect(is.asyncIterable(gen())).toBe(true);
  });

  // Async generators are not sync-iterable.
  it('should return false for an async generator object under is.iterable', () => {
    async function* gen() {
      yield 1;
    }

    expect(is.iterable(gen())).toBe(false);
  });

  it('should return false for a sync generator object', () => {
    function* gen() {
      yield 1;
    }

    expect(is.asyncIterable(gen())).toBe(false);
  });

  it('should return false for an array', () => {
    expect(is.asyncIterable([1])).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.asyncIterable(null)).toBe(false);
  });
});
