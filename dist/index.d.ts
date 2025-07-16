/** Encapsulating class for all is-checkers.  All methods
 * below this are static so there does not need to be any
 * references to constructors.  This class is meant to be
 * used as a utility class for checking the type of unknown
 * values.  This class is not meant to be instantiated.
 */
declare class IsHelper {
    /** Determine whether any given unknown value is of type array.
     * Will return false if the value is null or undefined.
     */
    static isArray: <T = unknown>(value: unknown) => value is T[];
    /** Determine whether any given unknown value can be converted into a boolean
     * This includes the number types 1 and 0 and
     * the string types "true", "false", "y", "n", "yes", "no".
     * Will return false if the value is null or undefined or is not a boolean.
     */
    static isBoolean: (value: unknown) => value is boolean;
    /** Will take any unknown value and attempt to return a true boolean.  Uses the
     * isBoolean method to determine if the value can be converted to a boolean.  Will
     * return a default value of false if the value cannot be converted.
     */
    static getBooleanValue: (value: unknown) => boolean;
    /** Determines whether any unknown value is a JavaScript Date object. */
    static isDate: (value: unknown) => value is Date;
    /** Determines whether any unknown value is an empty array.  Uses the
     * isArray method to determine if the value is an array and then checks
     * the length of the array to determine if it is empty.
     */
    static isEmptyArray: (value: unknown) => boolean;
    /** Determines whether any unknown value is an empty object.  Uses the
     * isObject method to determine if the value is an object and then checks
     * the length of the object to determine if it is empty.  Will return
     * false if the value cannot be converted into an object */
    static isEmptyObject: (value: unknown) => boolean;
    /** Determines whether any unknown value is an empty string.  Will return
     * false if the value cannot be converted into a string. */
    static isEmptyString: (value: unknown) => boolean;
    /** Determines whether any unknown value is an empty string or whitespace.  Will return
     * false if the value cannot be converted into a string. */
    static isEmptyStringOrWhitespace: (value: unknown) => boolean;
    /** Determines whether any unknown value is a function. */
    static isFunction: (value: unknown) => value is Function;
    /** Determines whether any unknown value is in the format of an IP Address (v4). */
    static isIpv4: (value: unknown) => boolean;
    /** Determines whether an unknown value is an array, and, if it is, returns
     * if the array is empty.  Will return false if the value is not an array.
     */
    static isNonEmptyArray: (value: unknown) => value is unknown[];
    /** Determines if an unknown value is equal to a JavaScript null */
    static isNull: (value: unknown) => value is null;
    /** Determines if an unknown value is equal to a JavaScript null or a JavaScript undefined */
    static isNullOrUndefined: (value: unknown) => value is null | undefined;
    /** Determines if an unknown value is equal to a JavaScript null, a JavaScript
     * undefined, an empty string, or a string that contains only whitespace. */
    static isNullOrUndefinedOrEmptyStringOrWhitespace: (value: unknown) => value is null | undefined | "";
    /** Determines if an unknown value can be converted into any type of number. */
    static isNumber: (value: unknown) => value is number;
    /** Determines if an unknown value can be converted into any type of
     * number and, if so, is the number greater than zero.
     */
    static isPositiveNumber: (value: unknown) => value is number;
    /** Determines if an unknown value can be converted into
     * a number and, if so, is the number a whole integer. */
    static isInteger: (value: unknown) => value is number;
    /** Determines if an unknown value can be converted into
     * a number and, if so, is the number a whole integer and its
     * value greater than zero. */
    static isPositiveInteger: (value: unknown) => value is number;
    /** Determines if an unknown value has the JavaScript primitive type
     * of object. */
    static isObject: (value: unknown) => value is object;
    /** Determines if an unknown value has the JavaScript primitive type
     * of object, and, if so, does it only contain "model-based" properties
     * (anything that can be prototyped). */
    static isPlainObject: <T = unknown>(value: unknown) => value is Record<string | number | symbol, T>;
    /** Determines if an unknown value is a string. */
    static isString: (value: unknown) => value is string;
    /** Determines if an unknown value is a JavaScript undefined or
     * equal to the string value of "undefined". */
    static isUndefined: (value: unknown) => value is undefined;
    /** Determines if an unknown value is a string that contains only whitespace. */
    static isWhiteSpaceString: (value: unknown) => value is string;
}

export { IsHelper as default };
