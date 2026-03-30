// ---------------------------------------------------------------------------
// Type interfaces
// ---------------------------------------------------------------------------

interface IsArray {
   <T = unknown>(value: unknown): value is T[];
   empty(value: unknown): boolean;
   nonEmpty(value: unknown): value is unknown[];
}

interface IsString {
   (value: unknown): value is string;
   empty(value: unknown): boolean;
   whitespace(value: unknown): boolean;
   blank(value: unknown): boolean;
}

interface IsNumber {
   (value: unknown): value is number;
   positive(value: unknown): value is number;
   integer(value: unknown): value is number;
   positiveInteger(value: unknown): value is number;
}

interface IsBoolean {
   (value: unknown): value is boolean;
   value(value: unknown): boolean;
}

interface IsObject {
   (value: unknown): value is object;
   empty(value: unknown): boolean;
   plain<T = unknown>(value: unknown): value is Record<string | number | symbol, T>;
}

type CheckFn = (value: unknown) => boolean;

interface Is {
   null(value: unknown): value is null;
   undefined(value: unknown): value is undefined;
   nil(value: unknown): value is null | undefined;
   defined(value: unknown): boolean;
   blank(value: unknown): value is null | undefined | "";
   array: IsArray;
   string: IsString;
   number: IsNumber;
   boolean: IsBoolean;
   object: IsObject;
   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
   fn(value: unknown): value is Function;
   date(value: unknown): value is Date;
   ipv4(value: unknown): boolean;
   any(...checks: CheckFn[]): CheckFn;
   every(...checks: CheckFn[]): CheckFn;
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

const is: Is = {
   null: (value: unknown): value is null => value === null,

   undefined: (value: unknown): value is undefined => typeof value === "undefined" || value === undefined,

   nil(value: unknown): value is null | undefined {
      return value === null || value === undefined;
   },

   defined(value: unknown): boolean {
      return value !== null && value !== undefined;
   },

   blank(value: unknown): value is null | undefined | "" {
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

   every(...checks: CheckFn[]): CheckFn {
      return (value: unknown) => checks.every((check) => check(value));
   },
};

export default is;
