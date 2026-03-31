//#region src/index.d.ts
/**
 * @module
 *
 * Zero-dependency type-checking utilities for JavaScript and TypeScript.
 * Every check works with `unknown` values and returns proper type guards
 * where possible.
 *
 * @example
 * ```ts
 * import is from "@deebeetech/is-helper";
 *
 * is.string("hello"); // true
 * is.number(42);      // true
 * is.nil(null);       // true
 * ```
 */
/**
 * Array type-checking utilities.
 *
 * Callable as a function to check if a value is an array (including typed arrays
 * like `Float64Array`, `Uint8Array`, etc.), with sub-methods for emptiness checks.
 */
interface IsArray {
  /** Returns `true` if the value is an `Array` or any typed array. */
  <T = unknown>(value: unknown): value is T[];
  /** Returns `true` if the value is an empty array or typed array (length 0). */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a non-empty array or typed array (length > 0). */
  nonEmpty(value: unknown): value is unknown[];
}
/**
 * String type-checking utilities.
 *
 * Callable as a function to check if a value is a string, with sub-methods
 * for empty, whitespace, and blank checks.
 */
interface IsString {
  /** Returns `true` if the value is a `string`. */
  (value: unknown): value is string;
  /** Returns `true` if the value is an empty string (`""`). */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a non-empty string that contains only whitespace. */
  whitespace(value: unknown): boolean;
  /** Returns `true` if the value is an empty string or a whitespace-only string. */
  blank(value: unknown): boolean;
}
/**
 * Number type-checking utilities.
 *
 * Callable as a function to check if a value is a number or numeric string
 * (up to two decimal places), with sub-methods for sign and integer checks.
 */
interface IsNumber {
  /** Returns `true` if the value is a `number` or a numeric string (up to two decimal places). */
  (value: unknown): value is number;
  /** Returns `true` if the value is a positive number or numeric string (> 0). */
  positive(value: unknown): value is number;
  /** Returns `true` if the value is an integer number or numeric string. */
  integer(value: unknown): value is number;
  /** Returns `true` if the value is a positive integer number or numeric string. */
  positiveInteger(value: unknown): value is number;
}
/**
 * Boolean type-checking utilities.
 *
 * Callable as a function to check if a value is a boolean or boolean-like value
 * (`"true"`, `"false"`, `"y"`, `"n"`, `"yes"`, `"no"`, `"1"`, `"0"`, `1`, `0`),
 * with a sub-method to extract the actual boolean value.
 */
interface IsBoolean {
  /** Returns `true` if the value is a `boolean` or a boolean-like string/number. */
  (value: unknown): value is boolean;
  /** Extracts the boolean meaning from a boolean-like value. Returns `false` if the value is not boolean-like. */
  value(value: unknown): boolean;
}
/**
 * Object type-checking utilities.
 *
 * Callable as a function to check if a value is a plain object (arrays, `null`,
 * and functions are excluded), with sub-methods for emptiness and prototype checks.
 */
interface IsObject {
  /** Returns `true` if the value is a plain `object` (not an array, `null`, or function). */
  (value: unknown): value is object;
  /** Returns `true` if the value is an object with no own enumerable properties. */
  empty(value: unknown): boolean;
  /** Returns `true` if the value is a plain object whose prototype is `Object.prototype` or `null`. */
  plain<T = unknown>(value: unknown): value is Record<string | number | symbol, T>;
}
/** A predicate function that accepts an `unknown` value and returns a `boolean`. Used with {@linkcode Is.any} and {@linkcode Is.all}. */
type CheckFn = (value: unknown) => boolean;
/**
 * The main `is` interface that exposes all type-checking utilities.
 *
 * @example
 * ```ts
 * import is from "@deebeetech/is-helper";
 *
 * is.string("hello");    // true
 * is.number(42);         // true
 * is.nil(null);          // true
 * is.array([1, 2, 3]);   // true
 * ```
 */
interface Is {
  /** Returns `true` if the value is strictly `null`. */
  null(value: unknown): value is null;
  /** Returns `true` if the value is `undefined`. */
  undefined(value: unknown): value is undefined;
  /** Returns `true` if the value is `null` or `undefined`. */
  nil(value: unknown): value is null | undefined;
  /** Returns `true` if the value is not `null` and not `undefined`. */
  defined(value: unknown): boolean;
  /** Returns `true` if the value is `null`, `undefined`, an empty string, or a whitespace-only string. */
  nothing(value: unknown): value is null | undefined | "";
  /** Array type-checking utilities. See {@linkcode IsArray}. */
  array: IsArray;
  /** String type-checking utilities. See {@linkcode IsString}. */
  string: IsString;
  /** Number type-checking utilities. See {@linkcode IsNumber}. */
  number: IsNumber;
  /** Boolean type-checking utilities. See {@linkcode IsBoolean}. */
  boolean: IsBoolean;
  /** Object type-checking utilities. See {@linkcode IsObject}. */
  object: IsObject;
  /** Returns `true` if the value is a function. */
  fn(value: unknown): value is Function;
  /** Returns `true` if the value is a `Date` instance. */
  date(value: unknown): value is Date;
  /** Returns `true` if the value is a valid IPv4 address string. */
  ipv4(value: unknown): boolean;
  /** Creates a check that returns `true` if **any** of the given checks pass for a value. */
  any(...checks: CheckFn[]): CheckFn;
  /** Creates a check that returns `true` only if **all** given checks pass for a value. */
  all(...checks: CheckFn[]): CheckFn;
}
/**
 * A collection of "is"-style type-checking helpers.
 *
 * Each method accepts an `unknown` value and returns a boolean (or type guard).
 * Sub-namespaces like `is.string`, `is.number`, `is.array`, etc. provide
 * additional specialized checks.
 *
 * @example
 * ```ts
 * import is from "@deebeetech/is-helper";
 *
 * is.string("hello");         // true
 * is.number.positive(5);      // true
 * is.array.nonEmpty([1, 2]);  // true
 * is.boolean.value("yes");    // true
 * ```
 */
declare const is: Is;
//#endregion
export { CheckFn, Is, IsArray, IsBoolean, IsNumber, IsObject, IsString, is as default };
//# sourceMappingURL=index.d.mts.map