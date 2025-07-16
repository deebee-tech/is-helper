/** Encapsulating class for all is-checkers.  All methods
 * below this are static so there does not need to be any
 * references to constructors.  This class is meant to be
 * used as a utility class for checking the type of unknown
 * values.  This class is not meant to be instantiated.
 */
export default class IsHelper {
   /** Determine whether any given unknown value is of type array.
    * Will return false if the value is null or undefined.
    */
   public static isArray = <T = unknown>(value: unknown): value is T[] => {
      if (this.isNullOrUndefined(value)) {
         return false;
      }

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

   /** Determine whether any given unknown value can be converted into a boolean
    * This includes the number types 1 and 0 and
    * the string types "true", "false", "y", "n", "yes", "no".
    * Will return false if the value is null or undefined or is not a boolean.
    */
   public static isBoolean = (value: unknown): value is boolean => {
      return (
         !IsHelper.isNullOrUndefined(value) &&
         ((typeof value === "boolean" && (value === true || value === false)) ||
            (typeof value === "string" && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) ||
            (typeof value === "string" && (value as string).toLowerCase() === "y") ||
            (typeof value === "string" && (value as string).toLowerCase() === "n") ||
            (typeof value === "string" && (value as string).toLowerCase() === "yes") ||
            (typeof value === "string" && (value as string).toLowerCase() === "no") ||
            (typeof value === "string" && (value as string) === "1") ||
            (typeof value === "string" && (value as string) === "0") ||
            value === 1 ||
            value === 0)
      );
   };

   /** Will take any unknown value and attempt to return a true boolean.  Uses the
    * isBoolean method to determine if the value can be converted to a boolean.  Will
    * return a default value of false if the value cannot be converted.
    */
   public static getBooleanValue = (value: unknown): boolean => {
      if (!this.isBoolean(value)) {
         return false;
      }

      return (
         (typeof value === "boolean" && value === true) ||
         (typeof value === "string" && (value as string).toLowerCase() === "true") ||
         (typeof value === "string" && (value as string).toLowerCase() === "y") ||
         (typeof value === "string" && (value as string).toLowerCase() === "yes") ||
         (typeof value === "string" && (value as string).toLowerCase() === "1") ||
         (value as unknown) === 1
      );
   };

   /** Determines whether any unknown value is a JavaScript Date object. */
   public static isDate = (value: unknown): value is Date => {
      return Object.prototype.toString.call(value) === "[object Date]";
   };

   /** Determines whether any unknown value is an empty array.  Uses the
    * isArray method to determine if the value is an array and then checks
    * the length of the array to determine if it is empty.
    */
   public static isEmptyArray = (value: unknown): boolean => {
      return IsHelper.isArray(value) && value.length === 0;
   };

   /** Determines whether any unknown value is an empty object.  Uses the
    * isObject method to determine if the value is an object and then checks
    * the length of the object to determine if it is empty.  Will return
    * false if the value cannot be converted into an object */
   public static isEmptyObject = (value: unknown): boolean => {
      return IsHelper.isObject(value) && Object.keys(value).length === 0;
   };

   /** Determines whether any unknown value is an empty string.  Will return
    * false if the value cannot be converted into a string. */
   public static isEmptyString = (value: unknown): boolean => {
      return IsHelper.isString(value) && String(value).length === 0;
   };

   /** Determines whether any unknown value is an empty string or whitespace.  Will return
    * false if the value cannot be converted into a string. */
   public static isEmptyStringOrWhitespace = (value: unknown): boolean => {
      return IsHelper.isEmptyString(value) || IsHelper.isWhiteSpaceString(value);
   };

   /** Determines whether any unknown value is a function. */
   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
   public static isFunction = (value: unknown): value is Function => {
      return typeof value === "function";
   };

   /** Determines whether any unknown value is in the format of an IP Address (v4). */
   public static isIpv4 = (value: unknown): boolean => {
      if (typeof value !== "string") {
         return false;
      }

      const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;

      return regex.test(value);
   };

   /** Determines whether an unknown value is an array, and, if it is, returns
    * if the array is empty.  Will return false if the value is not an array.
    */
   public static isNonEmptyArray = (value: unknown): value is unknown[] => {
      return !IsHelper.isNullOrUndefined(value) && IsHelper.isArray(value) && !IsHelper.isEmptyArray(value);
   };

   /** Determines if an unknown value is equal to a JavaScript null */
   public static isNull = (value: unknown): value is null => {
      return value === null;
   };

   /** Determines if an unknown value is equal to a JavaScript null or a JavaScript undefined */
   public static isNullOrUndefined = (value: unknown): value is null | undefined => {
      return IsHelper.isNull(value) || IsHelper.isUndefined(value);
   };

   /** Determines if an unknown value is equal to a JavaScript null, a JavaScript
    * undefined, an empty string, or a string that contains only whitespace. */
   public static isNullOrUndefinedOrEmptyStringOrWhitespace = (value: unknown): value is null | undefined | "" => {
      return IsHelper.isNullOrUndefined(value) || IsHelper.isEmptyStringOrWhitespace(value);
   };

   /** Determines if an unknown value can be converted into any type of number. */
   public static isNumber = (value: unknown): value is number => {
      if (IsHelper.isNullOrUndefined(value)) {
         return false;
      }

      if (typeof value === "number") {
         return true;
      }

      if (typeof value !== "string") {
         return false;
      }

      if (IsHelper.isEmptyStringOrWhitespace(value)) {
         return false;
      }

      const regex = /^-{0,1}\d*\.{0,1}\d{0,2}$/g;

      return regex.test(String(value));
   };

   /** Determines if an unknown value can be converted into any type of
    * number and, if so, is the number greater than zero.
    */
   public static isPositiveNumber = (value: unknown): value is number => {
      if (!IsHelper.isNumber(value)) {
         return false;
      }

      if (value <= 0) {
         return false;
      }

      return true;
   };

   /** Determines if an unknown value can be converted into
    * a number and, if so, is the number a whole integer. */
   public static isInteger = (value: unknown): value is number => {
      if (!IsHelper.isNumber(value)) {
         return false;
      }

      if (!Number.isInteger(Number.parseFloat(value.toString()))) {
         return false;
      }

      return true;
   };

   /** Determines if an unknown value can be converted into
    * a number and, if so, is the number a whole integer and its
    * value greater than zero. */
   public static isPositiveInteger = (value: unknown): value is number => {
      if (!IsHelper.isInteger(value)) {
         return false;
      }

      if (value <= 0) {
         return false;
      }

      return true;
   };

   /** Determines if an unknown value has the JavaScript primitive type
    * of object. */
   public static isObject = (value: unknown): value is object => {
      return (
         !IsHelper.isNullOrUndefined(value) &&
         typeof value === "object" &&
         !IsHelper.isFunction(value) &&
         Object.prototype.toString.call(value) === "[object Object]"
      );
   };

   /** Determines if an unknown value has the JavaScript primitive type
    * of object, and, if so, does it only contain "model-based" properties
    * (anything that can be prototyped). */
   public static isPlainObject = <T = unknown>(value: unknown): value is Record<string | number | symbol, T> => {
      if (!this.isObject(value)) {
         return false;
      }

      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.getPrototypeOf({});
   };

   /** Determines if an unknown value is a string. */
   public static isString = (value: unknown): value is string => {
      return typeof value === "string";
   };

   /** Determines if an unknown value is a JavaScript undefined or
    * equal to the string value of "undefined". */
   public static isUndefined = (value: unknown): value is undefined => {
      return typeof value === "undefined" || value === undefined;
   };

   /** Determines if an unknown value is a string that contains only whitespace. */
   public static isWhiteSpaceString = (value: unknown): value is string => {
      return IsHelper.isString(value) && !IsHelper.isEmptyString(value) && !/\S/.test(String(value));
   };
}
