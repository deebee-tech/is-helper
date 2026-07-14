import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.array.of', () => {
  it('should return true for an array whose items all pass', () => {
    expect(is.array.of(is.string)(['a', 'b'])).toBe(true);
  });

  it('should return false for an array with one failing item', () => {
    expect(is.array.of(is.string)(['a', 1])).toBe(false);
  });

  it('should return true for an empty array, vacuously', () => {
    expect(is.array.of(is.string)([])).toBe(true);
  });

  /**
   * The reason the implementation uses an index loop rather than `.every()`: every() SKIPS holes,
   * so a sparse array would pass and narrow to `number[]` while actually containing `undefined`.
   * The hole is built by assignment rather than written as `[1, , 3]`, which no-sparse-arrays
   * (rightly) rejects everywhere except here, where the hole IS the subject under test.
   */
  it('should return false for a sparse array with a hole', () => {
    const sparse = Array(3) as number[];
    sparse[0] = 1;
    sparse[2] = 3;

    expect(is.array.of(is.number)(sparse)).toBe(false);
  });

  it('should show that .every() would wrongly pass the same sparse array', () => {
    const sparse = Array(3) as number[];
    sparse[0] = 1;
    sparse[2] = 3;

    expect(sparse.every(is.number)).toBe(true);
  });

  it('should return false for a non-array', () => {
    expect(is.array.of(is.string)('abc')).toBe(false);
  });

  it('should return false for a typed array', () => {
    expect(is.array.of(is.number)(new Uint8Array([1, 2]))).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.array.of(is.string)(null)).toBe(false);
  });

  it('should compose with a plain check function', () => {
    expect(is.array.of((value) => value === 1)([1, 1])).toBe(true);
  });
});

describe('is.object.of', () => {
  it('should return true for an object whose values all pass', () => {
    expect(is.object.of(is.number)({ a: 1, b: 2 })).toBe(true);
  });

  it('should return false for an object with one failing value', () => {
    expect(is.object.of(is.number)({ a: 1, b: 'x' })).toBe(false);
  });

  it('should return true for an empty object, vacuously', () => {
    expect(is.object.of(is.number)({})).toBe(true);
  });

  it('should return false for an array', () => {
    expect(is.object.of(is.number)([1, 2])).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.object.of(is.number)(null)).toBe(false);
  });

  it('should return false, not throw, for an object with a throwing getter', () => {
    const hostile = Object.defineProperty({}, 'boom', {
      get() {
        throw new Error('hostile');
      },
      enumerable: true,
    });

    expect(is.object.of(is.number)(hostile)).toBe(false);
  });
});

describe('is.instanceOf', () => {
  class Animal {}
  class Dog extends Animal {}

  it('should return true for an instance', () => {
    expect(is.instanceOf(Animal)(new Animal())).toBe(true);
  });

  it('should return true for a subclass instance', () => {
    expect(is.instanceOf(Animal)(new Dog())).toBe(true);
  });

  it('should return false for an unrelated instance', () => {
    expect(is.instanceOf(Dog)(new Animal())).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.instanceOf(Animal)(null)).toBe(false);
  });

  it('should return false for a primitive', () => {
    expect(is.instanceOf(Animal)(42)).toBe(false);
  });

  it('should work with built-in constructors', () => {
    expect(is.instanceOf(Date)(new Date())).toBe(true);
  });

  // Fails fast, rather than deferring the TypeError to guard-call time far from the mistake.
  it('should throw a TypeError when handed a non-constructor', () => {
    expect(() => is.instanceOf('not a constructor' as never)).toThrow(TypeError);
  });
});

describe('is.oneOf', () => {
  it('should return true for a listed value', () => {
    expect(is.oneOf('draft', 'live')('draft')).toBe(true);
  });

  it('should return false for an unlisted value', () => {
    expect(is.oneOf('draft', 'live')('archived')).toBe(false);
  });

  it('should work with numbers', () => {
    expect(is.oneOf(1, 2, 3)(2)).toBe(true);
  });

  it('should work with a mixed list', () => {
    expect(is.oneOf('a', 1, true, null)(null)).toBe(true);
  });

  // SameValueZero, so NaN matches NaN — unlike ===.
  it('should match NaN against NaN', () => {
    expect(is.oneOf(NaN)(NaN)).toBe(true);
  });

  it('should return false for an empty list', () => {
    expect(is.oneOf()('anything')).toBe(false);
  });
});

describe('is.not', () => {
  it('should invert a passing check', () => {
    expect(is.not(is.string)('a')).toBe(false);
  });

  it('should invert a failing check', () => {
    expect(is.not(is.string)(42)).toBe(true);
  });

  // is.not WIDENS: everything that is not a blank string passes, including unrelated types.
  it('should return true for an unrelated type', () => {
    expect(is.not(is.string.blank)(42)).toBe(true);
  });

  it('should compose with is.all to keep the type constrained', () => {
    const nonBlankString = is.all(is.string, is.not(is.string.blank));

    expect([nonBlankString('hi'), nonBlankString('   '), nonBlankString(42)]).toEqual([
      true,
      false,
      false,
    ]);
  });

  it('should compose with filter', () => {
    expect([1, 'a', null, 'b'].filter(is.not(is.nil))).toEqual([1, 'a', 'b']);
  });
});

describe('is.uuid', () => {
  it('should return true for a v4 UUID', () => {
    expect(is.uuid('9f1b8c2e-4d3a-4f1e-8b2c-1a2b3c4d5e6f')).toBe(true);
  });

  it('should return true for a v7 UUID', () => {
    expect(is.uuid('01912d68-783e-7c3e-9c8e-5a1b2c3d4e5f')).toBe(true);
  });

  it('should return true for an uppercase UUID', () => {
    expect(is.uuid('9F1B8C2E-4D3A-4F1E-8B2C-1A2B3C4D5E6F')).toBe(true);
  });

  it('should return false for the nil UUID', () => {
    expect(is.uuid('00000000-0000-0000-0000-000000000000')).toBe(false);
  });

  it('should return false for the max UUID', () => {
    expect(is.uuid('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBe(false);
  });

  it('should return false for a braced UUID', () => {
    expect(is.uuid('{9f1b8c2e-4d3a-4f1e-8b2c-1a2b3c4d5e6f}')).toBe(false);
  });

  it('should return false for a urn-prefixed UUID', () => {
    expect(is.uuid('urn:uuid:9f1b8c2e-4d3a-4f1e-8b2c-1a2b3c4d5e6f')).toBe(false);
  });

  it('should return false for unhyphenated hex', () => {
    expect(is.uuid('9f1b8c2e4d3a4f1e8b2c1a2b3c4d5e6f')).toBe(false);
  });

  it('should return false for a non-string', () => {
    expect(is.uuid(42)).toBe(false);
  });

  it('should return false for a null', () => {
    expect(is.uuid(null)).toBe(false);
  });
});

describe('is.email', () => {
  it('should return true for a simple address', () => {
    expect(is.email('sandy@example.com')).toBe(true);
  });

  it('should return true for a subdomain address', () => {
    expect(is.email('sandy@mail.example.co.uk')).toBe(true);
  });

  it('should return true for a plus-tagged address', () => {
    expect(is.email('sandy+tag@example.com')).toBe(true);
  });

  it('should return false for an address with no domain dot', () => {
    expect(is.email('sandy@example')).toBe(false);
  });

  it('should return false for an address with no at sign', () => {
    expect(is.email('sandy.example.com')).toBe(false);
  });

  it('should return false for consecutive dots in the domain', () => {
    expect(is.email('sandy@example..com')).toBe(false);
  });

  it('should return false for a trailing dot', () => {
    expect(is.email('sandy@example.com.')).toBe(false);
  });

  it('should return false for a leading domain dot', () => {
    expect(is.email('sandy@.example.com')).toBe(false);
  });

  it('should return false for an address with whitespace', () => {
    expect(is.email('sandy @example.com')).toBe(false);
  });

  it('should return false for a non-string', () => {
    expect(is.email(42)).toBe(false);
  });
});
