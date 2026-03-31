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

// ---------------------------------------------------------------------------
// Type interfaces
// ---------------------------------------------------------------------------

/**
 * Array type-checking utilities.
 *
 * Callable as a function to check if a value is an array (including typed arrays
 * like `Float64Array`, `Uint8Array`, etc.), with sub-methods for emptiness checks.
 */
export interface IsArray {
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
export interface IsString {
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
export interface IsNumber {
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
export interface IsBoolean {
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
export interface IsObject {
   /** Returns `true` if the value is a plain `object` (not an array, `null`, or function). */
   (value: unknown): value is object;
   /** Returns `true` if the value is an object with no own enumerable properties. */
   empty(value: unknown): boolean;
   /** Returns `true` if the value is a plain object whose prototype is `Object.prototype` or `null`. */
   plain<T = unknown>(value: unknown): value is Record<string | number | symbol, T>;
}

/** A predicate function that accepts an `unknown` value and returns a `boolean`. Used with {@linkcode Is.any} and {@linkcode Is.all}. */
export type CheckFn = (value: unknown) => boolean;

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
export interface Is {
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
   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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

// ---------------------------------------------------------------------------
// Builder functions
// ---------------------------------------------------------------------------

function buildIsArray(): IsArray {
   const check = <T = unknown>(value: unknown): value is T[] => {
      if (value === null || value === undefined) return false;
      return (
         Array.isArray(value) ||
         value instanceof Float64Array ||
         value instanceof Float32Array ||
         value instanceof Int8Array ||
         value instanceof Int16Array ||
         value instanceof Int32Array ||
         value instanceof Uint8Array ||
         value instanceof Uint16Array ||
         value instanceof Uint32Array ||
         value instanceof Uint8ClampedArray ||
         value instanceof BigInt64Array ||
         value instanceof BigUint64Array
      );
   };

   check.empty = (value: unknown): boolean => {
      return check(value) && (value as unknown[] | { length: number }).length === 0;
   };

   check.nonEmpty = (value: unknown): value is unknown[] => {
      return check(value) && (value as unknown[] | { length: number }).length > 0;
   };

   return check;
}

function buildIsString(): IsString {
   const check = (value: unknown): value is string => typeof value === "string";

   check.empty = (value: unknown): boolean => check(value) && value.length === 0;

   check.whitespace = (value: unknown): boolean => check(value) && value.length > 0 && !/\S/.test(value);

   check.blank = (value: unknown): boolean => check.empty(value) || check.whitespace(value);

   return check;
}

function buildIsNumber(): IsNumber {
   const isStringCheck = (value: unknown): value is string => typeof value === "string";
   const isBlankString = (value: unknown): boolean =>
      isStringCheck(value) && (value.length === 0 || (value.length > 0 && !/\S/.test(value)));

   const check = (value: unknown): value is number => {
      if (value === null || value === undefined) return false;
      if (typeof value === "number") return true;
      if (typeof value !== "string") return false;
      if (isBlankString(value)) return false;
      return /^-{0,1}\d*\.{0,1}\d{0,2}$/.test(String(value));
   };

   check.positive = (value: unknown): value is number => {
      if (!check(value)) return false;
      return Number(value) > 0;
   };

   check.integer = (value: unknown): value is number => {
      if (!check(value)) return false;
      return Number.isInteger(Number.parseFloat(value.toString()));
   };

   check.positiveInteger = (value: unknown): value is number => {
      if (!check.integer(value)) return false;
      return Number(value) > 0;
   };

   return check;
}

function buildIsBoolean(): IsBoolean {
   const check = (value: unknown): value is boolean => {
      if (value === null || value === undefined) return false;
      if (typeof value === "boolean") return true;
      if (typeof value === "string") {
         const lower = value.toLowerCase();
         return (
            lower === "true" ||
            lower === "false" ||
            lower === "y" ||
            lower === "n" ||
            lower === "yes" ||
            lower === "no" ||
            value === "1" ||
            value === "0"
         );
      }
      return value === 1 || value === 0;
   };

   check.value = (val: unknown): boolean => {
      if (!check(val)) return false;
      const v = val as boolean | string | number;
      if (typeof v === "boolean") return v;
      if (typeof v === "string") {
         const lower = v.toLowerCase();
         return lower === "true" || lower === "y" || lower === "yes" || lower === "1";
      }
      return v === 1;
   };

   return check;
}

function buildIsObject(): IsObject {
   const isFn = (value: unknown): boolean => typeof value === "function";

   const check = (value: unknown): value is object => {
      return (
         value !== null &&
         value !== undefined &&
         typeof value === "object" &&
         !isFn(value) &&
         Object.prototype.toString.call(value) === "[object Object]"
      );
   };

   check.empty = (value: unknown): boolean => {
      return check(value) && Object.keys(value).length === 0;
   };

   check.plain = <T = unknown>(value: unknown): value is Record<string | number | symbol, T> => {
      if (!check(value)) return false;
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.getPrototypeOf({});
   };

   return check;
}

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

const isArray = buildIsArray();
const isString = buildIsString();
const isNumber = buildIsNumber();
const isBoolean = buildIsBoolean();
const isObject = buildIsObject();

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
const is: Is = {
   null: (value: unknown): value is null => value === null,

   undefined: (value: unknown): value is undefined => typeof value === "undefined" || value === undefined,

   nil(value: unknown): value is null | undefined {
      return value === null || value === undefined;
   },

   defined(value: unknown): boolean {
      return value !== null && value !== undefined;
   },

   nothing(value: unknown): value is null | undefined | "" {
      return this.nil(value) || isString.blank(value);
   },

   array: isArray,
   string: isString,
   number: isNumber,
   boolean: isBoolean,
   object: isObject,

   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
   fn: (value: unknown): value is Function => typeof value === "function",

   date: (value: unknown): value is Date => Object.prototype.toString.call(value) === "[object Date]",

   ipv4(value: unknown): boolean {
      if (typeof value !== "string") return false;
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
   },

   any(...checks: CheckFn[]): CheckFn {
      return (value: unknown) => checks.some((check) => check(value));
   },

   all(...checks: CheckFn[]): CheckFn {
      return (value: unknown) => checks.every((check) => check(value));
   },
};

export default is;
