/**
 * @module
 *
 * Zero-dependency type-checking utilities for JavaScript and TypeScript.
 * Every check accepts an `unknown` value, never throws, and returns a proper
 * type guard wherever the true branch has a TypeScript type to narrow to.
 *
 * @example
 * ```ts
 * import is, { type Guard, type TypedArray } from '@deebeetech/is-helper';
 * // or: import { is } from '@deebeetech/is-helper';
 *
 * is.string('hello'); // true
 * is.number(42);      // true
 * is.nil(null);       // true
 * ```
 */

// ---------------------------------------------------------------------------
// Internal brand-check helpers
// ---------------------------------------------------------------------------

/**
 * Every reflection primitive below is wrapped, because every one of them throws on a revoked Proxy,
 * and the trapping ones additionally throw on a Proxy with a hostile handler. A value arriving at a
 * type check is by definition untrusted; a check that throws instead of answering is a check that
 * moved the crash rather than preventing it. These are the library's floor: `never throws` is a
 * promise the module doc makes, so it is kept here once rather than at forty call sites.
 */
const objectTag = (value: unknown): string => {
  try {
    return Object.prototype.toString.call(value);
  } catch {
    return '';
  }
};

const isArraySafe = (value: unknown): boolean => {
  try {
    return Array.isArray(value);
  } catch {
    return false;
  }
};

/** The count of own enumerable keys, or `undefined` if the value refuses to be inspected. */
const ownKeyCount = (value: object): number | undefined => {
  try {
    return Object.keys(value).length;
  } catch {
    return undefined;
  }
};

/**
 * `Object.prototype.toString` is not a brand check — `{ [Symbol.toStringTag]: 'Date' }` tags as
 * `[object Date]`. These pristine accessors, captured at module load, are. Invoking one against a
 * value succeeds only if the value carries the matching internal slot, which is realm-independent
 * (so values from a vm, worker, or iframe pass) and unforgeable (so tag spoofs fail).
 */
const dateGetTime = Date.prototype.getTime as (this: unknown) => number;
const regExpSource = Object.getOwnPropertyDescriptor(RegExp.prototype, 'source')?.get;
const mapSize = Object.getOwnPropertyDescriptor(Map.prototype, 'size')?.get;
const setSize = Object.getOwnPropertyDescriptor(Set.prototype, 'size')?.get;
const typedArrayPrototype = Object.getPrototypeOf(Int8Array.prototype) as object;
const typedArrayTag = Object.getOwnPropertyDescriptor(
  // %TypedArray%.prototype — the shared prototype behind Int8Array, Float64Array, and the rest.
  typedArrayPrototype,
  Symbol.toStringTag,
)?.get as ((this: unknown) => string | undefined) | undefined;
const typedArrayLength = Object.getOwnPropertyDescriptor(typedArrayPrototype, 'length')?.get as
  ((this: unknown) => number) | undefined;
const arrayBufferByteLength = Object.getOwnPropertyDescriptor(
  ArrayBuffer.prototype,
  'byteLength',
)?.get;
const dataViewByteLength = Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength')?.get;
const weakMapHas = WeakMap.prototype.has as (this: unknown, key: object) => boolean;
const weakSetHas = WeakSet.prototype.has as (this: unknown, key: object) => boolean;

/** Native `Object` source, captured once — used by {@linkcode IsObject.plain} for a realm-independent prototype check. */
const nativeObjectSource = Function.prototype.toString.call(Object);

const hasBrand = (getter: ((this: unknown) => unknown) | undefined, value: unknown): boolean => {
  if (typeof getter !== 'function') return false;

  try {
    getter.call(value);
    return true;
  } catch {
    return false;
  }
};

const hasMethodBrand = (
  method: ((this: unknown, key: object) => unknown) | undefined,
  value: unknown,
): boolean => {
  if (typeof method !== 'function') return false;

  try {
    method.call(value, {});
    return true;
  } catch {
    return false;
  }
};

const brandedSize = (
  getter: ((this: unknown) => unknown) | undefined,
  value: unknown,
): number | undefined => {
  if (typeof getter !== 'function') return undefined;

  try {
    const size = getter.call(value);

    return typeof size === 'number' ? size : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Hoisted to module scope so `nothing` and `empty` never reach for `this`. An unbound `is.nothing`
 * passed to `is.any` — or destructured, or handed to `Array.prototype.filter` — would otherwise
 * throw in strict-mode ESM.
 */
const isNil = (value: unknown): value is null | undefined => value === null || value === undefined;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A predicate that accepts an `unknown` value and returns a `boolean`. Used with {@linkcode Is.any}, {@linkcode Is.all}, and {@linkcode Is.not}. */
export type CheckFn = (value: unknown) => boolean;

/** A predicate that narrows an `unknown` value to `T`. */
export type Guard<T> = (value: unknown) => value is T;

/** Extracts the guarded type from a {@linkcode Guard}. A plain {@linkcode CheckFn} contributes `unknown`. */
export type Guarded<G> = G extends Guard<infer T> ? T : unknown;

/** Folds a tuple of checks into the intersection of everything they guard. */
export type GuardedAll<G extends readonly CheckFn[]> = G extends readonly [
  infer Head,
  ...infer Tail,
]
  ? (Head extends Guard<infer T> ? T : unknown) &
      (Tail extends readonly CheckFn[] ? GuardedAll<Tail> : unknown)
  : unknown;

/** Any JavaScript primitive value. */
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;

/**
 * The sound top type for functions: safe to test for, callable *or* constructable, and returning
 * `unknown` rather than `any`. The construct signature keeps class constructors assignable under
 * {@linkcode Is.fn} narrowing.
 */
export type AnyFn = {
  (...args: any[]): unknown;
  new (...args: any[]): unknown;
};

/** Any typed array. Excludes `DataView`, which is a binary view but not an indexed numeric array. */
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float16Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

// ---------------------------------------------------------------------------
// Type interfaces
// ---------------------------------------------------------------------------

/**
 * Array type-checking utilities.
 *
 * Callable as a function to check if a value is an `Array`, with sub-methods for emptiness and
 * element-wise checks.
 */
export interface IsArray {
  /** Returns `true` if the value is an `Array`. Typed arrays are **not** arrays — see {@linkcode Is.typedArray}. Cross-realm safe. */
  <T = unknown>(value: unknown): value is T[];
  /** Returns `true` if the value is an empty array (length 0). */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a non-empty array, narrowing to the non-empty tuple `[T, ...T[]]` so `value[0]` is safe under `noUncheckedIndexedAccess`. */
  nonEmpty<T>(value: T[] | null | undefined): value is [T, ...T[]];
  /** Returns `true` if the value is a non-empty readonly array. */
  nonEmpty<T>(value: readonly T[] | null | undefined): value is readonly [T, ...T[]];
  /** Returns `true` if the value is a non-empty array. */
  nonEmpty<T = unknown>(value: unknown): value is [T, ...T[]];
  /**
   * Creates a check that passes when the value is an array whose every item passes `itemCheck`. An
   * empty array passes vacuously — compose with {@linkcode IsArray.nonEmpty} via {@linkcode Is.all}
   * if that is not what you want. Hostile proxies, throwing index/length getters, and a throwing
   * `itemCheck` all return `false` rather than throwing — same policy as {@linkcode IsObject.of}.
   */
  of<T>(itemCheck: Guard<T>): Guard<T[]>;
  /** Creates a check that passes when the value is an array whose every item passes `itemCheck`. */
  of(itemCheck: CheckFn): Guard<unknown[]>;
}

/**
 * String type-checking utilities.
 *
 * Callable as a function to check if a value is a string, with sub-methods for empty, whitespace,
 * and blank checks. Accepts primitives only — the wrapper object `new String('x')` is `false`.
 */
export interface IsString {
  /** Returns `true` if the value is a `string`. */
  (value: unknown): value is string;
  /** Returns `true` if the value is an empty string (`''`). */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a non-empty string, narrowing away `''`. */
  nonEmpty(value: unknown): value is string;
  /** Returns `true` if the value is a non-empty string that contains only whitespace. */
  whitespace(value: unknown): boolean;
  /** Returns `true` if the value is an empty string or a whitespace-only string. */
  blank(value: unknown): boolean;
}

/**
 * Number type-checking utilities.
 *
 * Callable as a function to check if a value is a `number`. Strictly `typeof`-based: numeric
 * strings are **not** numbers — use {@linkcode Is.numeric} for those. Accepts primitives only —
 * the wrapper object `new Number(1)` is `false`.
 */
export interface IsNumber {
  /** Returns `true` if the value is a `number`. `NaN` and `±Infinity` are numbers and return `true` — use {@linkcode IsNumber.finite} to exclude them. */
  (value: unknown): value is number;
  /** Returns `true` if the value is a finite number (excludes `NaN`, `Infinity`, and `-Infinity`). */
  finite(value: unknown): value is number;
  /** Returns `true` if the value is the number `NaN`. Unlike the global `isNaN`, this does not coerce: `is.number.nan('abc')` is `false`. */
  nan(value: unknown): boolean;
  /** Returns `true` if the value is a finite number greater than `0`. */
  positive(value: unknown): value is number;
  /** Returns `true` if the value is a finite number less than `0`. Note `-0` is not negative. */
  negative(value: unknown): value is number;
  /** Returns `true` if the value is a finite number greater than or equal to `0`. */
  nonNegative(value: unknown): value is number;
  /** Returns `true` if the value is a finite number less than or equal to `0`. Note `-0` satisfies this (`-0 === 0`). */
  nonPositive(value: unknown): value is number;
  /** Returns `true` if the value is an integer. */
  integer(value: unknown): value is number;
  /** Returns `true` if the value is an integer greater than `0`. */
  positiveInteger(value: unknown): value is number;
  /** Returns `true` if the value is an integer less than `0`. */
  negativeInteger(value: unknown): value is number;
  /** Returns `true` if the value is an integer greater than or equal to `0`. */
  nonNegativeInteger(value: unknown): value is number;
  /** Returns `true` if the value is an integer less than or equal to `0`. */
  nonPositiveInteger(value: unknown): value is number;
  /** Returns `true` if the value is an integer exactly representable as a JS number — i.e. within `Number.MAX_SAFE_INTEGER`. Use this wherever JS numbers meet 64-bit database integer columns. */
  safeInteger(value: unknown): value is number;
}

/**
 * Numeric-value utilities — the coercive counterpart to {@linkcode Is.number}.
 *
 * Callable as a function to check if a value is a finite number *or* a string that parses to one.
 */
export interface IsNumeric {
  /**
   * Returns `true` if the value is a finite `number`, or a string that parses to a finite number.
   *
   * Accepts decimal and scientific notation (`'42'`, `'3.14159'`, `'1e-7'`, `'+5'`, `'.5'`, `'5.'`).
   * Rejects blanks, hex/binary/octal literals (`'0x10'`), whitespace-padded strings (`' 42 '`),
   * `'Infinity'`, `'NaN'`, and the degenerate `'-'` / `'.'` / `'-.'`.
   *
   * Not a type guard: a `string` may or may not be numeric, so narrowing the false branch would be
   * unsound. Use {@linkcode IsNumeric.parse} to get a typed `number`.
   */
  (value: unknown): boolean;
  /** Parses a numeric value to a `number`, or returns `undefined` if it is not numeric. Never returns `NaN`. */
  parse(value: unknown): number | undefined;
}

/**
 * Boolean type-checking utilities.
 *
 * Callable as a function to check if a value is a `boolean`. Strictly `typeof`-based — use
 * {@linkcode IsBoolean.like} for boolean-like strings and numbers. Accepts primitives only — the
 * wrapper object `new Boolean(true)` is `false`.
 */
export interface IsBoolean {
  /** Returns `true` if the value is a `boolean`. */
  (value: unknown): value is boolean;
  /** Returns `true` if the value is a `boolean`, or a boolean-like string or number (`'true'`, `'false'`, `'y'`, `'n'`, `'yes'`, `'no'`, `'1'`, `'0'`, `1`, `0`). Not a type guard: narrowing away every string on the false branch would be unsound. */
  like(value: unknown): boolean;
  /** Extracts the boolean meaning from a boolean-like value. Returns `false` if the value is not boolean-like. */
  value(value: unknown): boolean;
  /**
   * Parses a boolean-like value to a `boolean`, or returns `undefined` if it is not boolean-like.
   * Unlike {@linkcode IsBoolean.value}, this does not collapse the unrecognized case to `false`.
   */
  parse(value: unknown): boolean | undefined;
}

/**
 * Object type-checking utilities.
 *
 * Callable as a function to check if a value is a plain `[object Object]` — arrays, `null`,
 * functions, and built-ins whose tag is not `[object Object]` (`Map`, `Set`, `Date`, `RegExp`,
 * `Promise`, typed arrays, …) are excluded. `Error` is also excluded by tag in ordinary realms;
 * note that `Date`/`RegExp`/`Error` do **not** define their own `Symbol.toStringTag` — the tag
 * comes from the default `Object.prototype.toString` brand.
 */
export interface IsObject {
  /** Returns `true` if the value's object tag is `[object Object]`. Class instances and null-prototype objects are accepted; use {@linkcode IsObject.plain} for dictionary-shaped objects only. */
  (value: unknown): value is Record<string, unknown>;
  /** Returns `true` if the value is an object with no own enumerable properties. */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is an `[object Object]` with at least one own enumerable property. */
  nonEmpty(value: unknown): value is Record<string, unknown>;
  /**
   * Returns `true` if the value is a dictionary-shaped object: either a null-prototype object, or an
   * object whose immediate prototype is a realm's `Object.prototype` (verified via the native
   * `Object` source string, so cross-realm plain objects pass). Class instances fail.
   */
  plain<T = unknown>(value: unknown): value is Record<string | number | symbol, T>;
  /**
   * Creates a check that passes when every own enumerable string-keyed value passes `valueCheck`.
   * An empty object passes vacuously. Inherited, symbol-keyed, and non-enumerable properties are not
   * inspected. Hostile proxies, throwing getters, and a throwing `valueCheck` all return `false`
   * rather than throwing — same policy as {@linkcode IsArray.of}.
   */
  of<T>(valueCheck: Guard<T>): Guard<Record<string, T>>;
  /** Creates a check that passes when every own enumerable string-keyed value passes `valueCheck`. */
  of(valueCheck: CheckFn): Guard<Record<string, unknown>>;
}

/**
 * Date type-checking utilities.
 *
 * Callable as a function to check if a value is a `Date` — **including an Invalid Date**, which is
 * still a `Date`. Use {@linkcode IsDate.valid} for one you can actually format.
 */
export interface IsDate {
  /** Returns `true` if the value is a `Date`, including an Invalid Date. Brand-checks the internal slot, so cross-realm Dates pass and tag spoofs do not. */
  (value: unknown): value is Date;
  /** Returns `true` only if the value is a `Date` whose time is not `NaN`. An Invalid Date's every getter is `NaN` and its `toISOString()` throws. */
  valid(value: unknown): value is Date;
  /** Returns `true` only if the value is a `Date` holding an invalid time. Returns `false` for non-Dates — this is **not** `!valid`. */
  invalid(value: unknown): boolean;
}

/**
 * Error type-checking utilities.
 *
 * Callable as a function to check if a value is an `Error`, with a sub-method for safely extracting
 * a message from anything a `catch` block hands you.
 */
export interface IsError {
  /** Returns `true` if the value is an `Error` — any subclass, and cross-realm safe. */
  (value: unknown): value is Error;
  /** The `message` of an `Error`, or `String(value)` for a non-`Error` throw. Returns `fallback` for `null`/`undefined` and for any value that cannot produce a string. Never throws. */
  message(value: unknown, fallback?: string): string;
}

/**
 * Map type-checking utilities.
 *
 * Callable as a function to check if a value is a `Map`, with sub-methods for emptiness checks.
 */
export interface IsMap {
  /** Returns `true` if the value is a `Map`, including subclasses and cross-realm Maps. Brand-checks the internal slot, so tag spoofs and `Object.create(Map.prototype)` return `false`. */
  <K = unknown, V = unknown>(value: unknown): value is Map<K, V>;
  /** Returns `true` if the value is an empty `Map` (size 0). */
  empty(value: unknown): value is Map<unknown, unknown>;
  /** Returns `true` if the value is a non-empty `Map` (size > 0). */
  nonEmpty(value: unknown): value is Map<unknown, unknown>;
}

/**
 * Set type-checking utilities.
 *
 * Callable as a function to check if a value is a `Set`, with sub-methods for emptiness checks.
 */
export interface IsSet {
  /** Returns `true` if the value is a `Set`, including subclasses and cross-realm Sets. Brand-checks the internal slot, so tag spoofs and `Object.create(Set.prototype)` return `false`. */
  <T = unknown>(value: unknown): value is Set<T>;
  /** Returns `true` if the value is an empty `Set` (size 0). */
  empty(value: unknown): value is Set<unknown>;
  /** Returns `true` if the value is a non-empty `Set` (size > 0). */
  nonEmpty(value: unknown): value is Set<unknown>;
}

/**
 * Promise type-checking utilities.
 *
 * Callable as a function to check if a value is a native `Promise`, with a sub-method for the
 * broader *thenable* protocol that `await` actually cares about.
 */
export interface IsPromise {
  /** Returns `true` if the value is a native `Promise`, including subclasses and cross-realm promises. */
  (value: unknown): value is Promise<unknown>;
  /** Returns `true` if the value is *thenable* — an object or function with a callable `then`. Userland promise implementations pass this but not the base check. */
  like(value: unknown): value is PromiseLike<unknown>;
}

/**
 * A collection of "is"-style type-checking helpers.
 *
 * @example
 * ```ts
 * import is from '@deebeetech/is-helper';
 *
 * is.string('hello');         // true
 * is.number.positive(5);      // true
 * is.array.nonEmpty([1, 2]);  // true
 * is.boolean.like('yes');     // true
 * ```
 */
export interface Is {
  /** Returns `true` if the value is strictly `null`. */
  null(value: unknown): value is null;
  /** Returns `true` if the value is `undefined`. */
  undefined(value: unknown): value is undefined;
  /** Returns `true` if the value is `null` or `undefined`. */
  nil(value: unknown): value is null | undefined;
  /** Returns `true` if the value is neither `null` nor `undefined`, narrowing `T` to `NonNullable<T>`. */
  defined<T>(value: T): value is NonNullable<T>;
  /** Returns `true` if the value is `null`, `undefined`, an empty string, or a whitespace-only string. Not a type guard — "blank string" has no TypeScript type. Use {@linkcode Is.nil} or {@linkcode Is.defined} when you need narrowing. */
  nothing(value: unknown): boolean;
  /** Returns `true` for `null`, `undefined`, a blank string, an empty array or typed array, an empty `Map` or `Set`, or an object with no own enumerable keys. Numbers, booleans, symbols, functions, `Date`, `RegExp`, and `Error` are never empty — `0` and `false` are values. */
  empty(value: unknown): boolean;
  /** Array type-checking utilities. See {@linkcode IsArray}. */
  array: IsArray;
  /** Returns `true` if the value is a typed array (`Uint8Array`, `Float64Array`, …). Brand-checks the internal slot, so it is cross-realm safe and unspoofable. `DataView` is `false`; Node's `Buffer` is `true` (it is a `Uint8Array`). */
  typedArray(value: unknown): value is TypedArray;
  /** Returns `true` if the value is an `ArrayBuffer`. Brand-checks the internal slot. */
  arrayBuffer(value: unknown): value is ArrayBuffer;
  /** Returns `true` if the value is a `DataView`. Brand-checks the internal slot. */
  dataView(value: unknown): value is DataView;
  /** Returns `true` if the value is a `WeakMap`. Brand-checks the internal slot. */
  weakMap(value: unknown): value is WeakMap<object, unknown>;
  /** Returns `true` if the value is a `WeakSet`. Brand-checks the internal slot. */
  weakSet(value: unknown): value is WeakSet<object>;
  /** String type-checking utilities. See {@linkcode IsString}. */
  string: IsString;
  /** Number type-checking utilities. See {@linkcode IsNumber}. */
  number: IsNumber;
  /** Numeric-value utilities, including numeric strings. See {@linkcode IsNumeric}. */
  numeric: IsNumeric;
  /** Boolean type-checking utilities. See {@linkcode IsBoolean}. */
  boolean: IsBoolean;
  /** Object type-checking utilities. See {@linkcode IsObject}. */
  object: IsObject;
  /** Returns `true` for any non-null value whose `typeof` is `'object'` — **including arrays** and built-ins like `Date`, `Map`, and `RegExp` — narrowing to `Record<string, unknown>` so a string key reads as `unknown`. This is the broad counterpart to {@linkcode Is.object} (which is `[object Object]`-only): it matches exactly `value !== null && typeof value === 'object'`, i.e. the classic hand-rolled guard, and centralizes the `as Record<string, unknown>` cast that guard always needed. Functions return `false` (`typeof` is `'function'`). */
  objectLike(value: unknown): value is Record<string, unknown>;
  /** Date type-checking utilities. See {@linkcode IsDate}. */
  date: IsDate;
  /** Error type-checking utilities. See {@linkcode IsError}. */
  error: IsError;
  /** Map type-checking utilities. See {@linkcode IsMap}. */
  map: IsMap;
  /** Set type-checking utilities. See {@linkcode IsSet}. */
  set: IsSet;
  /** Promise type-checking utilities. See {@linkcode IsPromise}. */
  promise: IsPromise;
  /** Returns `true` if the value is a function. Narrows to {@linkcode AnyFn}, which returns `unknown` rather than `any` — cast to a concrete signature to use the return value. */
  fn(value: unknown): value is AnyFn;
  /** Returns `true` if the value is a `RegExp`. Cross-realm safe and unspoofable. */
  regexp(value: unknown): value is RegExp;
  /** Returns `true` if the value is a `symbol`. */
  symbol(value: unknown): value is symbol;
  /** Returns `true` if the value is a `bigint`. Unlike {@linkcode Is.numeric}, no string coercion. */
  bigint(value: unknown): value is bigint;
  /** Returns `true` if the value is a primitive — not an object and not a function. Boxed primitives (`new String('x')`) are objects and return `false`. This is **not** `!is.object(x)`: `is.object(new Date())` and `is.primitive(new Date())` are both `false`. */
  primitive(value: unknown): value is Primitive;
  /** Returns `true` if the value implements the iterable protocol. **Strings are iterable** and return `true` — for "a collection but not a string", use `is.all(is.iterable, is.not(is.string))`. */
  iterable(value: unknown): value is Iterable<unknown>;
  /** Returns `true` if the value implements the async iterable protocol. Async generators are not sync-iterable, so they return `false` from {@linkcode Is.iterable}. */
  asyncIterable(value: unknown): value is AsyncIterable<unknown>;
  /** Returns `true` if the value is a valid IPv4 address string. Rejects leading zeros (`'01.1.1.1'`) — inet_aton-style octal parsing makes those a common allowlist bypass. */
  ipv4(value: unknown): boolean;
  /** Returns `true` if the value is a valid IPv6 address string, including compressed and IPv4-mapped forms. Zone IDs (`fe80::1%eth0`) are rejected. */
  ipv6(value: unknown): boolean;
  /** Returns `true` if the value is a valid IPv4 or IPv6 address string. */
  ip(value: unknown): boolean;
  /** Returns `true` if the value is an RFC 9562 UUID string, version 1–8, in canonical hyphenated form. Case-insensitive. Deliberately rejects the nil UUID, the max UUID, the braced and `urn:uuid:` forms, and unhyphenated hex. */
  uuid(value: unknown): boolean;
  /** Returns `true` if the value is a plausible email-address string. Deliberately permissive shape validation, not RFC 5322 conformance. */
  email(value: unknown): boolean;
  /** Creates a check that passes when the value is an instance of `ctor`. **Realm-blind** — a `Date` from a worker fails this but passes {@linkcode Is.date}, so prefer the named built-in checks for built-in types. Throws `TypeError` if `ctor` is not a constructor (including arrow functions and bound functions, which `instanceof` rejects). */
  instanceOf<T>(ctor: abstract new (...args: never[]) => T): Guard<T>;
  /** Creates a check that passes when the value is one of `values`. Comparison is SameValueZero: `NaN` matches `NaN`, and `-0` matches `0`. */
  oneOf<const T extends readonly (string | number | bigint | boolean | null | undefined)[]>(
    ...values: T
  ): Guard<T[number]>;
  /** Creates a check that passes if **any** of the given checks pass. When every check is a type guard the result narrows to their union; a plain {@linkcode CheckFn} contributes `unknown`, correctly collapsing it. */
  any<const G extends readonly CheckFn[]>(...checks: G): Guard<Guarded<G[number]>>;
  /**
   * Creates a check that passes only if **all** the given checks pass. When the checks are type
   * guards the result narrows to their intersection; plain {@linkcode CheckFn} arguments contribute
   * `unknown` and do not weaken the others. With zero checks this is vacuously `true` for every
   * value — compose deliberately.
   */
  all<const G extends readonly CheckFn[]>(...checks: G): Guard<GuardedAll<G>>;
  /** Creates a check that passes when the given check does **not**. Note this **widens**: `is.not(is.string.blank)` is `true` for `42`, `{}`, and `null` — every value the wrapped check rejects. Compose with {@linkcode Is.all} to keep the type constrained: `is.all(is.string, is.not(is.string.blank))`. */
  not(check: CheckFn): CheckFn;
  /**
   * Throws `TypeError` if `check(value)` is false; otherwise returns `value` narrowed by `check`.
   * This is the library's one intentional throw — every other method keeps the never-throws contract.
   */
  assert<T>(value: unknown, check: Guard<T>, message?: string): T;
  assert(value: unknown, check: CheckFn, message?: string): unknown;
}

// ---------------------------------------------------------------------------
// Builder functions
// ---------------------------------------------------------------------------

function buildIsArray(): IsArray {
  const check = <T = unknown>(value: unknown): value is T[] => isArraySafe(value);

  check.empty = (value: unknown): boolean => {
    if (!check(value)) return false;

    try {
      return value.length === 0;
    } catch {
      return false;
    }
  };

  check.nonEmpty = ((value: unknown): boolean => {
    if (!check(value)) return false;

    try {
      return value.length > 0;
    } catch {
      return false;
    }
  }) as IsArray['nonEmpty'];

  check.of = ((itemCheck: CheckFn) => (value: unknown) => {
    if (!check(value)) return false;

    try {
      // An index loop, not `.every()`: every() skips holes, so `[1, , 3].every(is.number)` is true
      // and would narrow a sparse array containing `undefined` to `number[]`. Length/index access and
      // itemCheck may throw on a hostile proxy or getter — an `is.*` check must not.
      for (let i = 0; i < value.length; i++) {
        if (!itemCheck(value[i])) return false;
      }
    } catch {
      return false;
    }

    return true;
  }) as IsArray['of'];

  return check;
}

function buildIsString(): IsString {
  const check = (value: unknown): value is string => typeof value === 'string';

  check.empty = (value: unknown): boolean => check(value) && value.length === 0;

  check.nonEmpty = (value: unknown): value is string => check(value) && value.length > 0;

  check.whitespace = (value: unknown): boolean =>
    check(value) && value.length > 0 && !/\S/.test(value);

  check.blank = (value: unknown): boolean => check.empty(value) || check.whitespace(value);

  return check;
}

function buildIsNumber(): IsNumber {
  const check = (value: unknown): value is number => typeof value === 'number';

  check.finite = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value);

  // Number.isNaN, never the global isNaN(): the global coerces ('abc' -> true) and throws a
  // TypeError on Symbol and BigInt.
  check.nan = (value: unknown): boolean => typeof value === 'number' && Number.isNaN(value);

  check.positive = (value: unknown): value is number => check.finite(value) && value > 0;

  check.negative = (value: unknown): value is number => check.finite(value) && value < 0;

  check.nonNegative = (value: unknown): value is number => check.finite(value) && value >= 0;

  check.nonPositive = (value: unknown): value is number => check.finite(value) && value <= 0;

  check.integer = (value: unknown): value is number => Number.isInteger(value);

  check.positiveInteger = (value: unknown): value is number => check.integer(value) && value > 0;

  check.negativeInteger = (value: unknown): value is number => check.integer(value) && value < 0;

  check.nonNegativeInteger = (value: unknown): value is number =>
    check.integer(value) && value >= 0;

  check.nonPositiveInteger = (value: unknown): value is number =>
    check.integer(value) && value <= 0;

  check.safeInteger = (value: unknown): value is number => Number.isSafeInteger(value);

  return check;
}

/**
 * Shape validation only. `Number.isFinite` still does the magnitude check afterwards: `'1e999'`
 * matches this pattern but overflows to `Infinity`.
 *
 * The digit run is owned once (`\d+(?:\.\d*)?`) rather than `\d+\.?\d*`, which is quadratic under
 * rejection — the same class of bug the EMAIL pattern below was rewritten to avoid.
 */
const NUMERIC_STRING = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

function buildIsNumeric(): IsNumeric {
  const check = (value: unknown): boolean => {
    if (typeof value === 'number') return Number.isFinite(value);
    if (typeof value !== 'string') return false;
    if (!NUMERIC_STRING.test(value)) return false;

    return Number.isFinite(Number(value));
  };

  check.parse = (value: unknown): number | undefined => (check(value) ? Number(value) : undefined);

  return check;
}

function buildIsBoolean(): IsBoolean {
  const check = (value: unknown): value is boolean => typeof value === 'boolean';

  check.like = (value: unknown): boolean => {
    if (typeof value === 'boolean') return true;

    if (typeof value === 'string') {
      const lower = value.toLowerCase();

      return (
        lower === 'true' ||
        lower === 'false' ||
        lower === 'y' ||
        lower === 'n' ||
        lower === 'yes' ||
        lower === 'no' ||
        value === '1' ||
        value === '0'
      );
    }

    return value === 1 || value === 0;
  };

  // Gated on `like`, not on `check` — otherwise is.boolean.value('yes') would silently be false.
  check.value = (value: unknown): boolean => {
    if (!check.like(value)) return false;
    if (typeof value === 'boolean') return value;

    if (typeof value === 'string') {
      const lower = value.toLowerCase();

      return lower === 'true' || lower === 'y' || lower === 'yes' || lower === '1';
    }

    return value === 1;
  };

  check.parse = (value: unknown): boolean | undefined =>
    check.like(value) ? check.value(value) : undefined;

  return check;
}

function buildIsObject(): IsObject {
  const check = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === 'object' && objectTag(value) === '[object Object]';

  check.empty = (value: unknown): boolean => check(value) && ownKeyCount(value) === 0;

  check.nonEmpty = (value: unknown): value is Record<string, unknown> => {
    const count = check(value) ? ownKeyCount(value) : undefined;

    return count !== undefined && count > 0;
  };

  check.plain = <T = unknown>(value: unknown): value is Record<string | number | symbol, T> => {
    if (!check(value)) return false;

    try {
      const prototype = Object.getPrototypeOf(value) as object | null;

      // Null-prototype dictionary.
      if (prototype === null) return true;

      // Class instances (and anything deeper than Object.prototype) have a non-null grand-proto.
      if (Object.getPrototypeOf(prototype) !== null) return false;

      // Realm-independent: the immediate proto is some realm's Object.prototype iff its constructor
      // still stringifies as the native Object function.
      const ctor = (prototype as { constructor?: unknown }).constructor;

      return (
        typeof ctor === 'function' && Function.prototype.toString.call(ctor) === nativeObjectSource
      );
    } catch {
      return false;
    }
  };

  check.of = ((valueCheck: CheckFn) => (value: unknown) => {
    if (!check(value)) return false;

    try {
      // Object.keys and the property reads below invoke getters and Proxy traps, either of which
      // may throw. An `is.*` check must not — including a throwing valueCheck (same policy as
      // is.array.of).
      for (const key of Object.keys(value)) {
        if (!valueCheck(value[key])) return false;
      }
    } catch {
      return false;
    }

    return true;
  }) as IsObject['of'];

  return check;
}

function buildIsDate(): IsDate {
  const check = (value: unknown): value is Date => hasBrand(dateGetTime, value);

  check.valid = (value: unknown): value is Date =>
    check(value) && !Number.isNaN(dateGetTime.call(value));

  check.invalid = (value: unknown): boolean =>
    check(value) && Number.isNaN(dateGetTime.call(value));

  return check;
}

function buildIsError(): IsError {
  /**
   * `instanceof` first: it is the fast path, and it catches `DOMException` (which inherits from
   * Error but carries its own tag). The tag check then catches cross-realm errors, which
   * `instanceof` misses. The two miss disjoint sets, so the union is correct.
   */
  const check = (value: unknown): value is Error => {
    try {
      if (value instanceof Error) return true;
    } catch {
      // `instanceof` walks the prototype chain, which a revoked Proxy refuses.
      return false;
    }

    // Error is the one built-in with no pristine accessor to brand-check against, so the tag is all
    // there is — and the tag alone is forgeable, because `Symbol.toStringTag` OVERRIDES the built-in
    // tag rather than being overridden by it. `{ [Symbol.toStringTag]: 'Error' }` reports as
    // '[object Error]'. What separates the forgery from the real thing is that a genuine Error has
    // no `Symbol.toStringTag` anywhere on its chain — Error.prototype simply does not define one —
    // so requiring its absence closes the hole while still admitting cross-realm errors, which
    // `instanceof` above cannot see.
    if (objectTag(value) !== '[object Error]') return false;

    try {
      return !(Symbol.toStringTag in (value as object));
    } catch {
      return false;
    }
  };

  check.message = (value: unknown, fallback = ''): string => {
    if (isNil(value)) return fallback;

    try {
      if (check(value)) {
        const message: unknown = value.message;

        return typeof message === 'string' ? message : fallback;
      }

      // String() throws on Object.create(null) and on any value with a throwing toString.
      return String(value);
    } catch {
      return fallback;
    }
  };

  return check;
}

// The sub-methods read the slot directly rather than going through `check` so that the size is read
// exactly once and can never throw.
function buildIsMap(): IsMap {
  const check = <K = unknown, V = unknown>(value: unknown): value is Map<K, V> =>
    brandedSize(mapSize, value) !== undefined;

  check.empty = (value: unknown): value is Map<unknown, unknown> =>
    brandedSize(mapSize, value) === 0;

  check.nonEmpty = (value: unknown): value is Map<unknown, unknown> => {
    const size = brandedSize(mapSize, value);

    return size !== undefined && size > 0;
  };

  return check;
}

function buildIsSet(): IsSet {
  const check = <T = unknown>(value: unknown): value is Set<T> =>
    brandedSize(setSize, value) !== undefined;

  check.empty = (value: unknown): value is Set<unknown> => brandedSize(setSize, value) === 0;

  check.nonEmpty = (value: unknown): value is Set<unknown> => {
    const size = brandedSize(setSize, value);

    return size !== undefined && size > 0;
  };

  return check;
}

function buildIsPromise(): IsPromise {
  const objectLike = (value: unknown): boolean =>
    value !== null && (typeof value === 'object' || typeof value === 'function');

  const hasThen = (value: unknown): boolean => {
    try {
      return typeof (value as { then?: unknown }).then === 'function';
    } catch {
      // A throwing getter, a hostile Proxy trap, or a revoked Proxy.
      return false;
    }
  };

  // Promise has no built-in tag of its own — '[object Promise]' comes from an inherited
  // Symbol.toStringTag and is therefore spoofable. Requiring a callable `then` as well rejects
  // plain spoofs.
  const check = (value: unknown): value is Promise<unknown> =>
    objectLike(value) && objectTag(value) === '[object Promise]' && hasThen(value);

  check.like = (value: unknown): value is PromiseLike<unknown> =>
    objectLike(value) && hasThen(value);

  return check;
}

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

const isArray = buildIsArray();
const isString = buildIsString();
const isNumber = buildIsNumber();
const isNumeric = buildIsNumeric();
const isBoolean = buildIsBoolean();
const isObject = buildIsObject();
const isDate = buildIsDate();
const isError = buildIsError();
const isMap = buildIsMap();
const isSet = buildIsSet();
const isPromise = buildIsPromise();

// The %TypedArray% tag getter returns undefined — rather than throwing — for anything without the
// [[TypedArrayName]] slot, so it doubles as the brand check.
const isTypedArray = (value: unknown): value is TypedArray =>
  typedArrayTag !== undefined && typedArrayTag.call(value) !== undefined;

// No leading zeros: `'01.1.1.1'` is rejected. `[01]?` in the classic pattern accepts them, and
// inet_aton-style parsers treat those octets as octal — an allowlist bypass.
const IPV4_OCTET = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)';
const IPV4 = new RegExp(`^(?:${IPV4_OCTET}\\.){3}${IPV4_OCTET}$`);

const HEXTET = /^[0-9a-f]{1,4}$/i;

/** IPv4 with no leading zeros — shared by `is.ipv4` and the IPv4-mapped IPv6 tail. */
const isIPv4String = (value: string): boolean => IPV4.test(value);

/**
 * Linear split/count IPv6 validator. Zone IDs are rejected. An IPv4-mapped tail is rewritten to two
 * hextets so the 8-group budget stays uniform.
 */
const isIPv6String = (value: string): boolean => {
  if (value.length === 0 || value.includes('%')) return false;

  let addr = value;
  const lastColon = addr.lastIndexOf(':');

  if (lastColon !== -1) {
    const tail = addr.slice(lastColon + 1);

    if (tail.includes('.')) {
      if (!isIPv4String(tail)) return false;

      // An IPv4-mapped suffix consumes two hextets.
      addr = `${addr.slice(0, lastColon)}:0:0`;
    }
  }

  const sides = addr.split('::');

  if (sides.length > 2) return false;

  const parseSide = (side: string): string[] | null => {
    if (side === '') return [];

    const parts = side.split(':');

    return parts.every((part) => HEXTET.test(part)) ? parts : null;
  };

  if (sides.length === 1) {
    const parts = parseSide(sides[0]!);

    return parts !== null && parts.length === 8;
  }

  const left = parseSide(sides[0]!);
  const right = parseSide(sides[1]!);

  if (left === null || right === null) return false;

  // `::` must compress at least one zero hextet.
  return left.length + right.length < 8;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// The domain class excludes `.` so that exactly one dot-split is possible. The obvious
// /^[^\s@]+@[^\s@]+\.[^\s@]+$/ is quadratic: 'a@' + '.'.repeat(100_000) + ' ' takes seconds.
const EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

/**
 * A collection of "is"-style type-checking helpers.
 *
 * Each method accepts an `unknown` value and returns a boolean, or a type guard where the true
 * branch has a type to narrow to. Sub-namespaces like `is.string`, `is.number`, and `is.array`
 * provide additional specialized checks.
 *
 * @example
 * ```ts
 * import is from '@deebeetech/is-helper';
 *
 * is.string('hello');         // true
 * is.number.positive(5);      // true
 * is.array.nonEmpty([1, 2]);  // true
 * is.boolean.like('yes');     // true
 * ```
 */
const is: Is = {
  null: (value: unknown): value is null => value === null,

  undefined: (value: unknown): value is undefined => value === undefined,

  nil: isNil,

  // Not `value != null`: loose equality is special-cased for `document.all`.
  defined<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
  },

  nothing(value: unknown): boolean {
    return isNil(value) || isString.blank(value);
  },

  empty(value: unknown): boolean {
    if (isNil(value)) return true;
    if (isString(value)) return isString.blank(value);
    if (isArray(value)) return isArray.empty(value);
    // Pristine length/size accessors — a hostile subclass getter must not throw out of is.empty.
    if (isTypedArray(value)) return brandedSize(typedArrayLength, value) === 0;
    if (brandedSize(mapSize, value) === 0) return true;
    if (brandedSize(setSize, value) === 0) return true;
    // isObject is [object Object]-gated, so Date, RegExp, and Error fall through to false rather
    // than being reported empty merely for having no own enumerable keys.
    // A value that refuses to be inspected is not proven empty, so it is not empty.
    if (isObject(value)) return ownKeyCount(value) === 0;

    return false;
  },

  array: isArray,
  typedArray: isTypedArray,
  arrayBuffer: (value: unknown): value is ArrayBuffer => hasBrand(arrayBufferByteLength, value),
  dataView: (value: unknown): value is DataView => hasBrand(dataViewByteLength, value),
  weakMap: (value: unknown): value is WeakMap<object, unknown> => hasMethodBrand(weakMapHas, value),
  weakSet: (value: unknown): value is WeakSet<object> => hasMethodBrand(weakSetHas, value),
  string: isString,
  number: isNumber,
  numeric: isNumeric,
  boolean: isBoolean,
  object: isObject,

  // The array-accepting counterpart to is.object. Narrows to Record<string, unknown> — the exact
  // cast the `x && typeof x === 'object'` guard always had to write by hand — and reading any string
  // key yields `unknown`, so the narrowing is loose but never unsound. Functions are excluded
  // (typeof 'function'); null is excluded (the whole reason the hand-rolled guard needs `x &&`).
  objectLike: (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === 'object',

  date: isDate,
  error: isError,
  map: isMap,
  set: isSet,
  promise: isPromise,

  fn: (value: unknown): value is AnyFn => typeof value === 'function',

  // Both halves are required: the tag alone false-positives on a Symbol.toStringTag spoof, and the
  // `source` brand alone false-positives on RegExp.prototype itself, which a spec legacy
  // special-case lets return '(?:)' instead of throwing.
  regexp: (value: unknown): value is RegExp =>
    objectTag(value) === '[object RegExp]' && hasBrand(regExpSource, value),

  symbol: (value: unknown): value is symbol => typeof value === 'symbol',

  bigint: (value: unknown): value is bigint => typeof value === 'bigint',

  // The typeof clauses harden against `document.all`, whose typeof is 'undefined' but which is an
  // object. Strict === is unaffected by its exotic slot, so real undefined is caught by the first
  // gate and document.all correctly falls through to false.
  primitive(value: unknown): value is Primitive {
    return (
      value === null ||
      value === undefined ||
      (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined')
    );
  },

  iterable(value: unknown): value is Iterable<unknown> {
    if (isNil(value)) return false;

    try {
      return typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function';
    } catch {
      return false;
    }
  },

  asyncIterable(value: unknown): value is AsyncIterable<unknown> {
    if (isNil(value)) return false;

    try {
      return (
        typeof (value as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function'
      );
    } catch {
      return false;
    }
  },

  ipv4(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    return isIPv4String(value);
  },

  ipv6(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    return isIPv6String(value);
  },

  ip(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    return isIPv4String(value) || isIPv6String(value);
  },

  uuid(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    return UUID.test(value);
  },

  email(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    return EMAIL.test(value);
  },

  instanceOf<T>(ctor: abstract new (...args: never[]) => T): Guard<T> {
    // Fail fast. Letting `instanceof` throw would defer the TypeError to guard-call time, far from
    // the mistake — and this ships to plain-JS consumers, where the parameter type is unenforced.
    // `typeof === 'function'` is not enough: arrow and bound functions pass it, then throw from
    // `instanceof` because they have no object prototype. Checking the prototype here means the
    // guard's catch cannot swallow a bad ctor into a silent forever-false.
    if (
      typeof ctor !== 'function' ||
      ctor.prototype === null ||
      typeof ctor.prototype !== 'object'
    ) {
      throw new TypeError('is.instanceOf() expects a constructor');
    }

    return (value: unknown): value is T => {
      try {
        return value instanceof (ctor as unknown as AnyFn);
      } catch {
        // A revoked Proxy, or a throwing Symbol.hasInstance.
        return false;
      }
    };
  },

  oneOf<const T extends readonly (string | number | bigint | boolean | null | undefined)[]>(
    ...values: T
  ): Guard<T[number]> {
    return ((value: unknown) => (values as readonly unknown[]).includes(value)) as Guard<T[number]>;
  },

  any<const G extends readonly CheckFn[]>(...checks: G): Guard<Guarded<G[number]>> {
    return ((value: unknown) => checks.some((check) => check(value))) as Guard<Guarded<G[number]>>;
  },

  all<const G extends readonly CheckFn[]>(...checks: G): Guard<GuardedAll<G>> {
    return ((value: unknown) => checks.every((check) => check(value))) as Guard<GuardedAll<G>>;
  },

  not(check: CheckFn): CheckFn {
    return (value: unknown) => !check(value);
  },

  assert(value: unknown, check: CheckFn, message?: string): unknown {
    if (!check(value)) {
      throw new TypeError(message ?? 'is.assert() failed');
    }

    return value;
  },
};

export { is };
export default is;
