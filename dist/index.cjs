'use strict';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const _IsHelper = class _IsHelper {
};
/** Determine whether any given unknown value is of type array.
 * Will return false if the value is null or undefined.
 */
__publicField(_IsHelper, "isArray", (value) => {
  if (_IsHelper.isNullOrUndefined(value)) {
    return false;
  }
  return Array.isArray(value) || value instanceof Float64Array || value instanceof Float32Array || value instanceof Int8Array || value instanceof Int16Array || value instanceof Int32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Uint32Array || value instanceof Uint8ClampedArray || value instanceof BigInt64Array || value instanceof BigUint64Array;
});
/** Determine whether any given unknown value can be converted into a boolean
 * This includes the number types 1 and 0 and
 * the string types "true", "false", "y", "n", "yes", "no".
 * Will return false if the value is null or undefined or is not a boolean.
 */
__publicField(_IsHelper, "isBoolean", (value) => {
  return !_IsHelper.isNullOrUndefined(value) && (typeof value === "boolean" && (value === true || value === false) || typeof value === "string" && (value.toLowerCase() === "true" || value.toLowerCase() === "false") || typeof value === "string" && value.toLowerCase() === "y" || typeof value === "string" && value.toLowerCase() === "n" || typeof value === "string" && value.toLowerCase() === "yes" || typeof value === "string" && value.toLowerCase() === "no" || typeof value === "string" && value === "1" || typeof value === "string" && value === "0" || value === 1 || value === 0);
});
/** Will take any unknown value and attempt to return a true boolean.  Uses the
 * isBoolean method to determine if the value can be converted to a boolean.  Will
 * return a default value of false if the value cannot be converted.
 */
__publicField(_IsHelper, "getBooleanValue", (value) => {
  if (!_IsHelper.isBoolean(value)) {
    return false;
  }
  return typeof value === "boolean" && value === true || typeof value === "string" && value.toLowerCase() === "true" || typeof value === "string" && value.toLowerCase() === "y" || typeof value === "string" && value.toLowerCase() === "yes" || typeof value === "string" && value.toLowerCase() === "1" || value === 1;
});
/** Determines whether any unknown value is a JavaScript Date object. */
__publicField(_IsHelper, "isDate", (value) => {
  return Object.prototype.toString.call(value) === "[object Date]";
});
/** Determines whether any unknown value is an empty array.  Uses the
 * isArray method to determine if the value is an array and then checks
 * the length of the array to determine if it is empty.
 */
__publicField(_IsHelper, "isEmptyArray", (value) => {
  return _IsHelper.isArray(value) && value.length === 0;
});
/** Determines whether any unknown value is an empty object.  Uses the
 * isObject method to determine if the value is an object and then checks
 * the length of the object to determine if it is empty.  Will return
 * false if the value cannot be converted into an object */
__publicField(_IsHelper, "isEmptyObject", (value) => {
  return _IsHelper.isObject(value) && Object.keys(value).length === 0;
});
/** Determines whether any unknown value is an empty string.  Will return
 * false if the value cannot be converted into a string. */
__publicField(_IsHelper, "isEmptyString", (value) => {
  return _IsHelper.isString(value) && String(value).length === 0;
});
/** Determines whether any unknown value is an empty string or whitespace.  Will return
 * false if the value cannot be converted into a string. */
__publicField(_IsHelper, "isEmptyStringOrWhitespace", (value) => {
  return _IsHelper.isEmptyString(value) || _IsHelper.isWhiteSpaceString(value);
});
/** Determines whether any unknown value is a function. */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
__publicField(_IsHelper, "isFunction", (value) => {
  return typeof value === "function";
});
/** Determines whether any unknown value is in the format of an IP Address (v4). */
__publicField(_IsHelper, "isIpv4", (value) => {
  if (typeof value !== "string") {
    return false;
  }
  const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
  return regex.test(value);
});
/** Determines whether an unknown value is an array, and, if it is, returns
 * if the array is empty.  Will return false if the value is not an array.
 */
__publicField(_IsHelper, "isNonEmptyArray", (value) => {
  return !_IsHelper.isNullOrUndefined(value) && _IsHelper.isArray(value) && !_IsHelper.isEmptyArray(value);
});
/** Determines if an unknown value is equal to a JavaScript null */
__publicField(_IsHelper, "isNull", (value) => {
  return value === null;
});
/** Determines if an unknown value is equal to a JavaScript null or a JavaScript undefined */
__publicField(_IsHelper, "isNullOrUndefined", (value) => {
  return _IsHelper.isNull(value) || _IsHelper.isUndefined(value);
});
/** Determines if an unknown value is equal to a JavaScript null, a JavaScript
 * undefined, an empty string, or a string that contains only whitespace. */
__publicField(_IsHelper, "isNullOrUndefinedOrEmptyStringOrWhitespace", (value) => {
  return _IsHelper.isNullOrUndefined(value) || _IsHelper.isEmptyStringOrWhitespace(value);
});
/** Determines if an unknown value can be converted into any type of number. */
__publicField(_IsHelper, "isNumber", (value) => {
  if (_IsHelper.isNullOrUndefined(value)) {
    return false;
  }
  if (typeof value === "number") {
    return true;
  }
  if (typeof value !== "string") {
    return false;
  }
  if (_IsHelper.isEmptyStringOrWhitespace(value)) {
    return false;
  }
  const regex = /^-{0,1}\d*\.{0,1}\d{0,2}$/g;
  return regex.test(String(value));
});
/** Determines if an unknown value can be converted into any type of
 * number and, if so, is the number greater than zero.
 */
__publicField(_IsHelper, "isPositiveNumber", (value) => {
  if (!_IsHelper.isNumber(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }
  return true;
});
/** Determines if an unknown value can be converted into
 * a number and, if so, is the number a whole integer. */
__publicField(_IsHelper, "isInteger", (value) => {
  if (!_IsHelper.isNumber(value)) {
    return false;
  }
  if (!Number.isInteger(Number.parseFloat(value.toString()))) {
    return false;
  }
  return true;
});
/** Determines if an unknown value can be converted into
 * a number and, if so, is the number a whole integer and its
 * value greater than zero. */
__publicField(_IsHelper, "isPositiveInteger", (value) => {
  if (!_IsHelper.isInteger(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }
  return true;
});
/** Determines if an unknown value has the JavaScript primitive type
 * of object. */
__publicField(_IsHelper, "isObject", (value) => {
  return !_IsHelper.isNullOrUndefined(value) && typeof value === "object" && !_IsHelper.isFunction(value) && Object.prototype.toString.call(value) === "[object Object]";
});
/** Determines if an unknown value has the JavaScript primitive type
 * of object, and, if so, does it only contain "model-based" properties
 * (anything that can be prototyped). */
__publicField(_IsHelper, "isPlainObject", (value) => {
  if (!_IsHelper.isObject(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.getPrototypeOf({});
});
/** Determines if an unknown value is a string. */
__publicField(_IsHelper, "isString", (value) => {
  return typeof value === "string";
});
/** Determines if an unknown value is a JavaScript undefined or
 * equal to the string value of "undefined". */
__publicField(_IsHelper, "isUndefined", (value) => {
  return typeof value === "undefined" || value === void 0;
});
/** Determines if an unknown value is a string that contains only whitespace. */
__publicField(_IsHelper, "isWhiteSpaceString", (value) => {
  return _IsHelper.isString(value) && !_IsHelper.isEmptyString(value) && !/\S/.test(String(value));
});
let IsHelper = _IsHelper;

module.exports = IsHelper;
//# sourceMappingURL=index.cjs.map
