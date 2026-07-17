import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import is from '../src';

describe('is.empty brand-safe size/length', () => {
  it('should not throw for a Map subclass with a throwing size getter', () => {
    class HostileMap extends Map {
      override get size(): number {
        throw new Error('hostile size');
      }
    }

    const map = new HostileMap();

    expect(() => is.empty(map)).not.toThrow();
    expect(is.empty(map)).toBe(true);
    expect(() => is.map.empty(map)).not.toThrow();
    expect(is.map.empty(map)).toBe(true);
  });

  it('should not throw for a Set subclass with a throwing size getter', () => {
    class HostileSet extends Set {
      override get size(): number {
        throw new Error('hostile size');
      }
    }

    const set = new HostileSet();

    expect(() => is.empty(set)).not.toThrow();
    expect(is.empty(set)).toBe(true);
  });

  it('should not throw for a typed-array subclass with a throwing length getter', () => {
    class HostileUint8 extends Uint8Array {
      override get length(): number {
        throw new Error('hostile length');
      }
    }

    const value = new HostileUint8(0);

    expect(() => is.empty(value)).not.toThrow();
    expect(is.empty(value)).toBe(true);
  });
});

describe('is.array never-throws on array-shaped hostiles', () => {
  const boom = () => {
    throw new Error('hostile trap');
  };

  it('should not throw for a Proxy array with a throwing length getter', () => {
    const hostile = new Proxy([1, 2], {
      get(target, prop, receiver) {
        if (prop === 'length') boom();

        return Reflect.get(target, prop, receiver);
      },
    });

    expect(() => is.array.empty(hostile)).not.toThrow();
    expect(is.array.empty(hostile)).toBe(false);
    expect(() => is.array.nonEmpty(hostile)).not.toThrow();
    expect(is.array.nonEmpty(hostile)).toBe(false);
    expect(() => is.array.of(is.number)(hostile)).not.toThrow();
    expect(is.array.of(is.number)(hostile)).toBe(false);
  });

  it('should not throw for a plain array with a throwing index getter', () => {
    const hostile = [1];

    Object.defineProperty(hostile, '0', {
      get: boom,
      enumerable: true,
      configurable: true,
    });

    expect(() => is.array.of(is.number)(hostile)).not.toThrow();
    expect(is.array.of(is.number)(hostile)).toBe(false);
  });
});

describe('is.object vs is.object.plain', () => {
  class Foo {
    x = 1;
  }

  it('should accept a class instance as an object but not as plain', () => {
    const instance = new Foo();

    expect(is.object(instance)).toBe(true);
    expect(is.object.plain(instance)).toBe(false);
  });

  it('should accept a null-prototype object as plain', () => {
    expect(is.object.plain(Object.create(null))).toBe(true);
  });

  it('should accept a cross-realm plain object', () => {
    const remote = vm.runInNewContext('({ a: 1 })') as object;

    expect(is.object.plain(remote)).toBe(true);
  });
});

describe('is.object.nonEmpty', () => {
  it('should return true for an object with keys', () => {
    expect(is.object.nonEmpty({ a: 1 })).toBe(true);
  });

  it('should return false for an empty object', () => {
    expect(is.object.nonEmpty({})).toBe(false);
  });
});

describe('is.error instanceof fast path', () => {
  it('should return true for a DOMException via instanceof', () => {
    expect(is.error(new DOMException('denied', 'NotAllowedError'))).toBe(true);
  });

  it('should not throw when Error.message getter throws', () => {
    const err = new Error('hidden');

    Object.defineProperty(err, 'message', {
      get() {
        throw new Error('hostile message');
      },
      configurable: true,
    });

    expect(() => is.error(err)).not.toThrow();
    expect(is.error(err)).toBe(true);
    expect(() => is.error.message(err, 'fallback')).not.toThrow();
    expect(is.error.message(err, 'fallback')).toBe('fallback');
  });
});

describe('is.promise spoofability', () => {
  it('should document that Object.create(Promise.prototype) spoofs the check', () => {
    // No internal-slot brand is available for Promise; tag + then is forgeable this way.
    expect(is.promise(Object.create(Promise.prototype))).toBe(true);
  });

  it('should document that a tag+then object literal spoofs the check', () => {
    expect(is.promise({ [Symbol.toStringTag]: 'Promise', then() {} })).toBe(true);
  });
});

describe('is.instanceOf constructor guard', () => {
  it('should throw for an arrow function rather than returning a forever-false guard', () => {
    expect(() => is.instanceOf((() => {}) as never)).toThrow(TypeError);
  });

  it('should throw for a bound function', () => {
    function Ctor() {}

    expect(() => is.instanceOf(Ctor.bind(null) as never)).toThrow(TypeError);
  });
});

describe('is.assert', () => {
  it('should return the narrowed value when the check passes', () => {
    const value: unknown = 'hello';

    expect(is.assert(value, is.string)).toBe('hello');
  });

  it('should throw TypeError when the check fails', () => {
    expect(() => is.assert(42, is.string)).toThrow(TypeError);
  });

  it('should use a custom message', () => {
    expect(() => is.assert(42, is.string, 'need a string')).toThrow('need a string');
  });
});

describe('is.ipv4 leading zeros', () => {
  it('should reject leading-zero octets', () => {
    expect(is.ipv4('01.1.1.1')).toBe(false);
    expect(is.ipv4('010.010.010.010')).toBe(false);
    expect(is.ipv4('192.168.01.1')).toBe(false);
  });

  it('should still accept canonical dotted-decimal forms', () => {
    expect(is.ipv4('0.0.0.0')).toBe(true);
    expect(is.ipv4('192.168.1.1')).toBe(true);
    expect(is.ipv4('255.255.255.255')).toBe(true);
  });
});

describe('is.ipv6 and is.ip', () => {
  it('should accept common IPv6 forms', () => {
    expect(is.ipv6('::')).toBe(true);
    expect(is.ipv6('::1')).toBe(true);
    expect(is.ipv6('1::')).toBe(true);
    expect(is.ipv6('2001:db8::1')).toBe(true);
    expect(is.ipv6('2001:db8:85a3::8a2e:370:7334')).toBe(true);
    expect(is.ipv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    expect(is.ipv6('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBe(true);
    expect(is.ipv6('::ffff:192.0.2.1')).toBe(true);
    expect(is.ipv6('2001:db8::192.0.2.1')).toBe(true);
    expect(is.ipv6('::ffff:0:0')).toBe(true);
  });

  it('should reject invalid IPv6 forms', () => {
    expect(is.ipv6('')).toBe(false);
    expect(is.ipv6('192.168.1.1')).toBe(false);
    expect(is.ipv6(':::')).toBe(false);
    expect(is.ipv6('1:::2')).toBe(false);
    expect(is.ipv6('2001:db8:::1')).toBe(false);
    expect(is.ipv6('2001:db8::1::2')).toBe(false);
    expect(is.ipv6('1:2:3:4:5:6:7')).toBe(false);
    expect(is.ipv6('1:2:3:4:5:6:7:8:9')).toBe(false);
    expect(is.ipv6('1::2:3:4:5:6:7:8:9')).toBe(false);
    expect(is.ipv6('gggg::1')).toBe(false);
    expect(is.ipv6('fe80::1%eth0')).toBe(false);
    expect(is.ipv6('::ffff:01.1.1.1')).toBe(false);
    expect(is.ipv6(':1:2:3:4:5:6:7:8')).toBe(false);
    expect(is.ipv6('1:2:3:4:5:6:7:8:')).toBe(false);
    expect(is.ipv6('1:2.3.4.5:6')).toBe(false);
    expect(is.ipv6('::ffff:256.0.0.1')).toBe(false);
    expect(is.ipv6('::ffff:192.0.2')).toBe(false);
  });

  it('should accept either family via is.ip', () => {
    expect(is.ip('127.0.0.1')).toBe(true);
    expect(is.ip('::1')).toBe(true);
    expect(is.ip('not-an-ip')).toBe(false);
  });
});

describe('is.number sign/integer matrix', () => {
  it('should cover nonPositive', () => {
    expect(is.number.nonPositive(0)).toBe(true);
    expect(is.number.nonPositive(-1.5)).toBe(true);
    expect(is.number.nonPositive(1)).toBe(false);
  });

  it('should cover negativeInteger / nonNegativeInteger / nonPositiveInteger', () => {
    expect(is.number.negativeInteger(-3)).toBe(true);
    expect(is.number.negativeInteger(-1.5)).toBe(false);
    expect(is.number.nonNegativeInteger(0)).toBe(true);
    expect(is.number.nonNegativeInteger(-1)).toBe(false);
    expect(is.number.nonPositiveInteger(0)).toBe(true);
    expect(is.number.nonPositiveInteger(1)).toBe(false);
  });
});

describe('is.string.nonEmpty', () => {
  it('should return true for a non-empty string', () => {
    expect(is.string.nonEmpty('a')).toBe(true);
    expect(is.string.nonEmpty(' ')).toBe(true);
  });

  it('should return false for an empty string', () => {
    expect(is.string.nonEmpty('')).toBe(false);
  });
});

describe('is.boolean.parse', () => {
  it('should parse boolean-like values or return undefined', () => {
    expect(is.boolean.parse('yes')).toBe(true);
    expect(is.boolean.parse('no')).toBe(false);
    expect(is.boolean.parse('maybe')).toBeUndefined();
  });
});

describe('branded collection checks', () => {
  it('should recognize WeakMap / WeakSet / ArrayBuffer / DataView', () => {
    expect(is.weakMap(new WeakMap())).toBe(true);
    expect(is.weakSet(new WeakSet())).toBe(true);
    expect(is.arrayBuffer(new ArrayBuffer(8))).toBe(true);
    expect(is.dataView(new DataView(new ArrayBuffer(8)))).toBe(true);
  });

  it('should reject tag spoofs for the new brand checks', () => {
    expect(is.weakMap({ [Symbol.toStringTag]: 'WeakMap' })).toBe(false);
    expect(is.arrayBuffer({ [Symbol.toStringTag]: 'ArrayBuffer' })).toBe(false);
  });
});

describe('NUMERIC_STRING is linear under rejection', () => {
  it('should reject a long digit string with a trailing junk char quickly', () => {
    const hostile = `${'1'.repeat(80_000)}x`;
    const start = performance.now();

    expect(is.numeric(hostile)).toBe(false);

    expect(performance.now() - start).toBeLessThan(250);
  });
});

describe('Float16Array', () => {
  it('should treat Float16Array as a typed array when the runtime provides it', () => {
    const Float16 = (globalThis as { Float16Array?: typeof Float16Array }).Float16Array;

    if (!Float16) return;

    expect(is.typedArray(new Float16(2))).toBe(true);
    expect(is.array(new Float16(2))).toBe(false);
  });
});
