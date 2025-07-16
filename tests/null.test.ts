import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isNull", () => {
   describe("true test cases", () => {
      it("should return true for null", () => {
         expect(IsHelper.isNull(null)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a number", () => {
         expect(IsHelper.isNull(1)).toBe(false);
      });

      it("should return false for a negative number", () => {
         expect(IsHelper.isNull(-1)).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(IsHelper.isNull(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(IsHelper.isNull(-1.1)).toBe(false);
      });

      it("should return false for a number string", () => {
         expect(IsHelper.isNull("1")).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(IsHelper.isNull("-1")).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(IsHelper.isNull("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(IsHelper.isNull("-1.1")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(IsHelper.isNull("")).toBe(false);
      });

      it("should return false for an whitespace string", () => {
         expect(IsHelper.isNull(" ")).toBe(false);
      });

      it("should return false for undefined", () => {
         expect(IsHelper.isNull(undefined)).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isNull("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isNull(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isNull({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isNull({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isNull(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isNull(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isNull(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isNull([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isNull([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isNull(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isNull(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isNull(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isNull(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isNull(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isNull(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isNull(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isNull(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isNull(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isNull(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isNull(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isNull(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isNull(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isNull(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isNull(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isNull(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isNull(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isNull(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isNull(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isNull("1n")).toBe(false);
      });
   });
});

describe("isUndefined", () => {
   describe("true test cases", () => {
      it("should return true for undefined", () => {
         expect(IsHelper.isUndefined(undefined)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for null", () => {
         expect(IsHelper.isUndefined(null)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isUndefined(1)).toBe(false);
      });

      it("should return false for a negative number", () => {
         expect(IsHelper.isUndefined(-1)).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(IsHelper.isUndefined(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(IsHelper.isUndefined(-1.1)).toBe(false);
      });

      it("should return false for a number string", () => {
         expect(IsHelper.isUndefined("1")).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(IsHelper.isUndefined("-1")).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(IsHelper.isUndefined("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(IsHelper.isUndefined("-1.1")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(IsHelper.isUndefined("")).toBe(false);
      });

      it("should return false for an whitespace string", () => {
         expect(IsHelper.isUndefined(" ")).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isUndefined("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isUndefined(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isUndefined({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isUndefined({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isUndefined(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isUndefined(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isUndefined(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isUndefined([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isUndefined([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isUndefined(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isUndefined(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isUndefined(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isUndefined(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isUndefined(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isUndefined(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isUndefined(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isUndefined(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isUndefined(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isUndefined(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isUndefined(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isUndefined(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isUndefined(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isUndefined(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isUndefined(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isUndefined(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isUndefined(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isUndefined(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isUndefined(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isUndefined("1n")).toBe(false);
      });
   });
});

describe("isNullOrUndefined", () => {
   describe("true test cases", () => {
      it("should return true for undefined", () => {
         expect(IsHelper.isNullOrUndefined(undefined)).toBe(true);
      });

      it("should return true for null", () => {
         expect(IsHelper.isNullOrUndefined(null)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a number", () => {
         expect(IsHelper.isNullOrUndefined(1)).toBe(false);
      });

      it("should return false for a negative number", () => {
         expect(IsHelper.isNullOrUndefined(-1)).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(IsHelper.isNullOrUndefined(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(IsHelper.isNullOrUndefined(-1.1)).toBe(false);
      });

      it("should return false for a number string", () => {
         expect(IsHelper.isNullOrUndefined("1")).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(IsHelper.isNullOrUndefined("-1")).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(IsHelper.isNullOrUndefined("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(IsHelper.isNullOrUndefined("-1.1")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(IsHelper.isNullOrUndefined("")).toBe(false);
      });

      it("should return false for an whitespace string", () => {
         expect(IsHelper.isNullOrUndefined(" ")).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isNullOrUndefined("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isNullOrUndefined(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isNullOrUndefined({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isNullOrUndefined({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isNullOrUndefined(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isNullOrUndefined(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isNullOrUndefined(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isNullOrUndefined([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isNullOrUndefined([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isNullOrUndefined(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isNullOrUndefined(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isNullOrUndefined(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isNullOrUndefined(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isNullOrUndefined(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isNullOrUndefined(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isNullOrUndefined(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isNullOrUndefined(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isNullOrUndefined(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isNullOrUndefined(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isNullOrUndefined(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isNullOrUndefined(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isNullOrUndefined(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isNullOrUndefined(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isNullOrUndefined(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isNullOrUndefined(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isNullOrUndefined(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isNullOrUndefined(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isNullOrUndefined(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isNullOrUndefined("1n")).toBe(false);
      });
   });
});

describe("isNullOrUndefinedOrEmptyStringOrWhitespace", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("")).toBe(true);
      });

      it("should return true for a string with whitespace", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\t\n ")).toBe(true);
      });

      it("should return true for a null", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(null)).toBe(true);
      });

      it("should return true for an undefined", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(undefined)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string with a value", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(1)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isNullOrUndefinedOrEmptyStringOrWhitespace(Symbol())).toBe(false);
      });
   });
});
