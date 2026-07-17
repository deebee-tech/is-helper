import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import is from '../src';

/**
 * The three properties the rewrite is built on. Each is a class of bug that the obvious
 * implementation of a type-check library gets wrong, and each is invisible in ordinary use — which
 * is exactly why they are pinned here.
 */

describe('brand checks reject spoofing', () => {
  /**
   * `Object.prototype.toString` is not a brand check. A `Symbol.toStringTag` property forges its
   * output, so a tag-sniffing implementation hands back `true` for a plain object and the caller
   * then calls `.getTime()` on it.
   */
  it('should return false for a Date tag spoof', () => {
    expect(is.date({ [Symbol.toStringTag]: 'Date' })).toBe(false);
  });

  it('should return false for a RegExp tag spoof', () => {
    expect(is.regexp({ [Symbol.toStringTag]: 'RegExp' })).toBe(false);
  });

  it('should return false for a Map tag spoof', () => {
    expect(is.map({ [Symbol.toStringTag]: 'Map' })).toBe(false);
  });

  it('should return false for a Set tag spoof', () => {
    expect(is.set({ [Symbol.toStringTag]: 'Set' })).toBe(false);
  });

  it('should return false for a Promise tag spoof', () => {
    expect(is.promise({ [Symbol.toStringTag]: 'Promise' })).toBe(false);
  });

  it('should return false for an Error tag spoof', () => {
    expect(is.error({ [Symbol.toStringTag]: 'Error' })).toBe(false);
  });

  // The prototype is right, but the internal slot was never installed.
  it('should return false for an object created from Map.prototype', () => {
    expect(is.map(Object.create(Map.prototype))).toBe(false);
  });

  it('should return false for an object created from Set.prototype', () => {
    expect(is.set(Object.create(Set.prototype))).toBe(false);
  });

  it('should return false for an object created from Date.prototype', () => {
    expect(is.date(Object.create(Date.prototype))).toBe(false);
  });

  /**
   * A spec legacy special-case: `RegExp.prototype.source` returns `'(?:)'` instead of throwing, so
   * the brand check alone would pass it. The tag check is what rejects it, which is why is.regexp
   * needs both halves.
   */
  it('should return false for RegExp.prototype itself', () => {
    expect(is.regexp(RegExp.prototype)).toBe(false);
  });
});

describe('cross-realm values are recognized', () => {
  /**
   * Values built in another realm (a worker, an iframe, a `vm` context) have different intrinsics,
   * so `instanceof` and constructor comparisons fail on them. Brand-checking the internal slot is
   * realm-independent, so these pass — and this is the whole reason the library does it that way.
   */
  const realm = vm.runInNewContext(`({
    date: new Date(),
    regexp: /x/,
    map: new Map([['a', 1]]),
    set: new Set([1]),
    array: [1, 2],
    typedArray: new Uint8Array(2),
    error: new Error('boom'),
    promise: Promise.resolve(),
  })`) as Record<string, unknown>;

  it('should recognize a cross-realm Date', () => {
    expect(is.date(realm.date)).toBe(true);
  });

  it('should recognize a cross-realm RegExp', () => {
    expect(is.regexp(realm.regexp)).toBe(true);
  });

  it('should recognize a cross-realm Map', () => {
    expect(is.map(realm.map)).toBe(true);
  });

  it('should recognize a cross-realm Set', () => {
    expect(is.set(realm.set)).toBe(true);
  });

  it('should recognize a cross-realm Array', () => {
    expect(is.array(realm.array)).toBe(true);
  });

  it('should recognize a cross-realm plain object via is.object.plain', () => {
    const remote = vm.runInNewContext('({ a: 1 })') as object;

    expect(is.object.plain(remote)).toBe(true);
  });

  it('should recognize a cross-realm typed array', () => {
    expect(is.typedArray(realm.typedArray)).toBe(true);
  });

  it('should recognize a cross-realm Error', () => {
    expect(is.error(realm.error)).toBe(true);
  });

  it('should recognize a cross-realm Promise', () => {
    expect(is.promise(realm.promise)).toBe(true);
  });

  // instanceof is realm-bound. This asserts the gap the brand checks exist to close.
  it('should show that instanceof fails where the brand check succeeds', () => {
    expect([realm.date instanceof Date, is.date(realm.date)]).toEqual([false, true]);
  });

  // is.instanceOf is realm-blind BY DESIGN — this documents the trade, so nobody "fixes" it.
  it('should show that is.instanceOf is realm-blind, unlike the named checks', () => {
    expect(is.instanceOf(Date)(realm.date)).toBe(false);
  });
});

describe('no check ever throws', () => {
  /**
   * The module doc promises every check accepts an `unknown` value. A value arriving at a type check
   * is by definition untrusted: `Array.isArray`, `Object.prototype.toString.call`, `Object.keys`,
   * `instanceof`, and plain property reads ALL throw on a revoked Proxy, and the trapping ones throw
   * again on a Proxy with a hostile handler. A check that throws has moved the crash, not prevented
   * it.
   */
  const revocable = Proxy.revocable({}, {});
  revocable.revoke();

  const hostileTrap = () => {
    throw new Error('hostile trap');
  };

  // Labels are static strings on purpose: String() on a revoked proxy throws, and building a
  // failure message out of the value would mask the very result being tested.
  const hostileValues: [string, unknown][] = [
    ['null', null],
    ['undefined', undefined],
    ['a revoked proxy', revocable.proxy],
    [
      'a proxy whose traps throw',
      new Proxy(
        {},
        {
          get: hostileTrap,
          has: hostileTrap,
          ownKeys: hostileTrap,
          getOwnPropertyDescriptor: hostileTrap,
          getPrototypeOf: hostileTrap,
        },
      ),
    ],
    ['a null-prototype object', Object.create(null)],
    [
      'an object with a throwing getter',
      Object.defineProperty({}, 'boom', {
        get() {
          throw new Error('hostile getter');
        },
        enumerable: true,
      }),
    ],
    [
      'an object with a throwing toString',
      {
        toString() {
          throw new Error('hostile toString');
        },
      },
    ],
    ['NaN', NaN],
    ['zero', 0],
    ['an empty string', ''],
    ['a symbol', Symbol('s')],
  ];

  const checks: [string, (value: unknown) => unknown][] = [
    ['is.null', is.null],
    ['is.undefined', is.undefined],
    ['is.nil', is.nil],
    ['is.defined', is.defined],
    ['is.nothing', is.nothing],
    ['is.empty', is.empty],
    ['is.array', is.array],
    ['is.array.empty', is.array.empty],
    ['is.array.nonEmpty', is.array.nonEmpty],
    ['is.array.of', is.array.of(is.number)],
    ['is.typedArray', is.typedArray],
    ['is.string', is.string],
    ['is.string.blank', is.string.blank],
    ['is.number', is.number],
    ['is.number.finite', is.number.finite],
    ['is.numeric', is.numeric],
    ['is.numeric.parse', is.numeric.parse],
    ['is.boolean', is.boolean],
    ['is.boolean.like', is.boolean.like],
    ['is.boolean.value', is.boolean.value],
    ['is.object', is.object],
    ['is.object.empty', is.object.empty],
    ['is.object.plain', is.object.plain],
    ['is.object.of', is.object.of(is.number)],
    ['is.objectLike', is.objectLike],
    ['is.date', is.date],
    ['is.date.valid', is.date.valid],
    ['is.date.invalid', is.date.invalid],
    ['is.error', is.error],
    ['is.error.message', is.error.message],
    ['is.map', is.map],
    ['is.set', is.set],
    ['is.promise', is.promise],
    ['is.promise.like', is.promise.like],
    ['is.regexp', is.regexp],
    ['is.fn', is.fn],
    ['is.symbol', is.symbol],
    ['is.bigint', is.bigint],
    ['is.primitive', is.primitive],
    ['is.iterable', is.iterable],
    ['is.asyncIterable', is.asyncIterable],
    ['is.ipv4', is.ipv4],
    ['is.ipv6', is.ipv6],
    ['is.ip', is.ip],
    ['is.uuid', is.uuid],
    ['is.email', is.email],
    ['is.arrayBuffer', is.arrayBuffer],
    ['is.dataView', is.dataView],
    ['is.weakMap', is.weakMap],
    ['is.weakSet', is.weakSet],
    ['is.object.nonEmpty', is.object.nonEmpty],
    ['is.string.nonEmpty', is.string.nonEmpty],
    ['is.boolean.parse', is.boolean.parse],
  ];

  for (const [checkName, check] of checks) {
    for (const [valueName, value] of hostileValues) {
      it(`should not throw: ${checkName} given ${valueName}`, () => {
        expect(() => check(value)).not.toThrow();
      });
    }
  }
});

describe('reflection primitives that throw are absorbed', () => {
  /**
   * The blanket sweep above catches the common case, where the object refuses everything. These
   * four are the narrow ones: the value answers *some* reflection calls and throws on exactly the
   * one the check depends on, so it gets past the outer gate before failing. Each pins one catch.
   */
  const boom = () => {
    throw new Error('hostile trap');
  };

  it('should absorb a throwing ownKeys trap in is.object.empty', () => {
    const hostile = new Proxy({}, { ownKeys: boom });

    expect(is.object.empty(hostile)).toBe(false);
  });

  it('should absorb a throwing ownKeys trap in is.empty', () => {
    const hostile = new Proxy({}, { ownKeys: boom });

    expect(is.empty(hostile)).toBe(false);
  });

  it('should absorb a throwing getPrototypeOf trap in is.object.plain', () => {
    const hostile = new Proxy({}, { getPrototypeOf: boom });

    expect(is.object.plain(hostile)).toBe(false);
  });

  // Forges the Error tag through the get trap, then throws from `has` — so is.error gets past the
  // tag check and fails inside the very lookup that closes the spoofing hole.
  it('should absorb a throwing has trap in is.error', () => {
    const hostile = new Proxy(
      {},
      {
        get: (target, key) => (key === Symbol.toStringTag ? 'Error' : Reflect.get(target, key)),
        has: boom,
      },
    );

    expect(is.error(hostile)).toBe(false);
  });

  it('should absorb a throwing Symbol.hasInstance in is.instanceOf', () => {
    class Hostile {
      static [Symbol.hasInstance]() {
        throw new Error('hostile hasInstance');
      }
    }

    expect(is.instanceOf(Hostile)({})).toBe(false);
  });
});

describe('checks work unbound', () => {
  /**
   * In v3, `is.nothing` was written as `this.nil(value) || ...`. ESM is strict-mode, so an unbound
   * reference had no `this` and threw `TypeError: Cannot read properties of undefined`. That made
   * it unusable in exactly the places a predicate belongs — passed to a combinator, or to `filter`.
   * (The v3 combinator tests hand-inlined `is.any(is.nil, is.string.blank)` to work around it.)
   */
  it('should not throw when is.nothing is passed to is.any', () => {
    expect(() => is.any(is.nothing)(null)).not.toThrow();
  });

  it('should not throw when is.nothing is passed to filter', () => {
    expect(() => ['', 'a'].filter(is.nothing)).not.toThrow();
  });

  it('should not throw when is.nothing is destructured', () => {
    const { nothing } = is;

    expect(() => nothing(null)).not.toThrow();
  });

  it('should return the right answer when is.nothing is destructured', () => {
    const { nothing } = is;

    expect([nothing(null), nothing('  '), nothing('a')]).toEqual([true, true, false]);
  });

  it('should filter correctly with is.nothing', () => {
    expect(['', 'a', '  ', 'b'].filter(is.nothing)).toEqual(['', '  ']);
  });

  it('should not throw when is.empty is destructured', () => {
    const { empty } = is;

    expect(() => empty(null)).not.toThrow();
  });
});
