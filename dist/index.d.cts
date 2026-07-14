//#region src/index.d.ts
/**
 * @module
 *
 * Zero-dependency type-checking utilities for JavaScript and TypeScript.
 * Every check accepts an `unknown` value, never throws, and returns a proper
 * type guard wherever the true branch has a TypeScript type to narrow to.
 *
 * @example
 * ```ts
 * import is from '@deebeetech/is-helper';
 *
 * is.string('hello'); // true
 * is.number(42);      // true
 * is.nil(null);       // true
 * ```
 */
/** A predicate that accepts an `unknown` value and returns a `boolean`. Used with {@linkcode Is.any}, {@linkcode Is.all}, and {@linkcode Is.not}. */
type CheckFn = (value: unknown) => boolean;
/** A predicate that narrows an `unknown` value to `T`. */
type Guard<T> = (value: unknown) => value is T;
/** Extracts the guarded type from a {@linkcode Guard}. A plain {@linkcode CheckFn} contributes `unknown`. */
type Guarded<G> = G extends Guard<infer T> ? T : unknown;
/** Folds a tuple of checks into the intersection of everything they guard. */
type GuardedAll<G extends readonly CheckFn[]> = G extends readonly [infer Head, ...infer Tail] ? (Head extends Guard<infer T> ? T : unknown) & (Tail extends readonly CheckFn[] ? GuardedAll<Tail> : unknown) : unknown;
/** Any JavaScript primitive value. */
type Primitive = string | number | bigint | boolean | symbol | null | undefined;
/** The sound top type for functions: safe to test for, callable, and returning `unknown` rather than `any`. */
type AnyFn = (...args: any[]) => unknown;
/** Any typed array. Excludes `DataView`, which is a binary view but not an indexed numeric array. */
type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
/**
 * Array type-checking utilities.
 *
 * Callable as a function to check if a value is an `Array`, with sub-methods for emptiness and
 * element-wise checks.
 */
interface IsArray {
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
  /** Creates a check that passes when the value is an array whose every item passes `itemCheck`. An empty array passes vacuously — compose with {@linkcode IsArray.nonEmpty} via {@linkcode Is.all} if that is not what you want. */
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
interface IsString {
  /** Returns `true` if the value is a `string`. */
  (value: unknown): value is string;
  /** Returns `true` if the value is an empty string (`''`). */
  empty(value: unknown): boolean;
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
interface IsNumber {
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
  /** Returns `true` if the value is an integer. */
  integer(value: unknown): value is number;
  /** Returns `true` if the value is an integer greater than `0`. */
  positiveInteger(value: unknown): value is number;
  /** Returns `true` if the value is an integer exactly representable as a JS number — i.e. within `Number.MAX_SAFE_INTEGER`. Use this wherever JS numbers meet 64-bit database integer columns. */
  safeInteger(value: unknown): value is number;
}
/**
 * Numeric-value utilities — the coercive counterpart to {@linkcode Is.number}.
 *
 * Callable as a function to check if a value is a finite number *or* a string that parses to one.
 */
interface IsNumeric {
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
interface IsBoolean {
  /** Returns `true` if the value is a `boolean`. */
  (value: unknown): value is boolean;
  /** Returns `true` if the value is a `boolean`, or a boolean-like string or number (`'true'`, `'false'`, `'y'`, `'n'`, `'yes'`, `'no'`, `'1'`, `'0'`, `1`, `0`). Not a type guard: narrowing away every string on the false branch would be unsound. */
  like(value: unknown): boolean;
  /** Extracts the boolean meaning from a boolean-like value. Returns `false` if the value is not boolean-like. */
  value(value: unknown): boolean;
}
/**
 * Object type-checking utilities.
 *
 * Callable as a function to check if a value is a plain `[object Object]` — arrays, `null`,
 * functions, and every built-in carrying its own `Symbol.toStringTag` (`Map`, `Set`, `Date`,
 * `RegExp`, `Error`, `Promise`, typed arrays) are excluded.
 */
interface IsObject {
  /** Returns `true` if the value's object tag is `[object Object]`. Class instances and null-prototype objects are accepted; use {@linkcode IsObject.plain} to exclude class instances. */
  (value: unknown): value is Record<string, unknown>;
  /** Returns `true` if the value is an object with no own enumerable properties. */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is an object whose prototype is `Object.prototype` or `null` — i.e. not a class instance. */
  plain<T = unknown>(value: unknown): value is Record<string | number | symbol, T>;
  /** Creates a check that passes when every own enumerable string-keyed value passes `valueCheck`. An empty object passes vacuously. Inherited, symbol-keyed, and non-enumerable properties are not inspected. */
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
interface IsDate {
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
interface IsError {
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
interface IsMap {
  /** Returns `true` if the value is a `Map`, including subclasses and cross-realm Maps. Brand-checks the internal slot, so tag spoofs and `Object.create(Map.prototype)` return `false`. */
  <K = unknown, V = unknown>(value: unknown): value is Map<K, V>;
  /** Returns `true` if the value is an empty `Map` (size 0). */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a non-empty `Map` (size > 0). */
  nonEmpty(value: unknown): value is Map<unknown, unknown>;
}
/**
 * Set type-checking utilities.
 *
 * Callable as a function to check if a value is a `Set`, with sub-methods for emptiness checks.
 */
interface IsSet {
  /** Returns `true` if the value is a `Set`, including subclasses and cross-realm Sets. Brand-checks the internal slot, so tag spoofs and `Object.create(Set.prototype)` return `false`. */
  <T = unknown>(value: unknown): value is Set<T>;
  /** Returns `true` if the value is an empty `Set` (size 0). */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a non-empty `Set` (size > 0). */
  nonEmpty(value: unknown): value is Set<unknown>;
}
/**
 * Promise type-checking utilities.
 *
 * Callable as a function to check if a value is a native `Promise`, with a sub-method for the
 * broader *thenable* protocol that `await` actually cares about.
 */
interface IsPromise {
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
interface Is {
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
  /** Returns `true` if the value is a valid IPv4 address string. */
  ipv4(value: unknown): boolean;
  /** Returns `true` if the value is an RFC 9562 UUID string, version 1–8, in canonical hyphenated form. Case-insensitive. Deliberately rejects the nil UUID, the max UUID, the braced and `urn:uuid:` forms, and unhyphenated hex. */
  uuid(value: unknown): boolean;
  /** Returns `true` if the value is a plausible email-address string. Deliberately permissive shape validation, not RFC 5322 conformance. */
  email(value: unknown): boolean;
  /** Creates a check that passes when the value is an instance of `ctor`. **Realm-blind** — a `Date` from a worker fails this but passes {@linkcode Is.date}, so prefer the named built-in checks for built-in types. Throws `TypeError` if `ctor` is not a constructor. */
  instanceOf<T>(ctor: abstract new (...args: never[]) => T): Guard<T>;
  /** Creates a check that passes when the value is one of `values`. Comparison is SameValueZero: `NaN` matches `NaN`, and `-0` matches `0`. */
  oneOf<const T extends readonly (string | number | bigint | boolean | null | undefined)[]>(...values: T): Guard<T[number]>;
  /** Creates a check that passes if **any** of the given checks pass. When every check is a type guard the result narrows to their union; a plain {@linkcode CheckFn} contributes `unknown`, correctly collapsing it. */
  any<const G extends readonly CheckFn[]>(...checks: G): Guard<Guarded<G[number]>>;
  /** Creates a check that passes only if **all** the given checks pass. When the checks are type guards the result narrows to their intersection; plain {@linkcode CheckFn} arguments contribute `unknown` and do not weaken the others. */
  all<const G extends readonly CheckFn[]>(...checks: G): Guard<GuardedAll<G>>;
  /** Creates a check that passes when the given check does **not**. Note this **widens**: `is.not(is.string.blank)` is `true` for `42`, `{}`, and `null` — every value the wrapped check rejects. Compose with {@linkcode Is.all} to keep the type constrained: `is.all(is.string, is.not(is.string.blank))`. */
  not(check: CheckFn): CheckFn;
}
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
declare const is: Is;
//#endregion
export { AnyFn, CheckFn, Guard, Guarded, GuardedAll, Is, IsArray, IsBoolean, IsDate, IsError, IsMap, IsNumber, IsNumeric, IsObject, IsPromise, IsSet, IsString, Primitive, TypedArray, is as default };
//# sourceMappingURL=index.d.cts.map