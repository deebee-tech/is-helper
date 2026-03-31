import { describe, expect, it } from "vitest";
import is from "../src";

describe("is.null", () => {
   describe("true test cases", () => {
      it("should return true for null", () => {
         expect(is.null(null)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a number", () => {
         expect(is.null(1)).toBe(false);
      });

      it("should return false for a negative number", () => {
         expect(is.null(-1)).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(is.null(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(is.null(-1.1)).toBe(false);
      });

      it("should return false for a number string", () => {
         expect(is.null("1")).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(is.null("-1")).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(is.null("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(is.null("-1.1")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(is.null("")).toBe(false);
      });

      it("should return false for an whitespace string", () => {
         expect(is.null(" ")).toBe(false);
      });

      it("should return false for undefined", () => {
         expect(is.null(undefined)).toBe(false);
      });

      it("should return false for a string", () => {
         expect(is.null("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(is.null(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.null({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.null({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.null(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.null(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.null(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.null([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.null([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.null(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.null(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.null(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(is.null(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(is.null(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.null(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.null(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.null(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(is.null(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(is.null(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.null(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.null(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.null(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(is.null(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.null(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.null(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.null(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.null(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.null(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(is.null("1n")).toBe(false);
      });
   });
});

describe("is.undefined", () => {
   describe("true test cases", () => {
      it("should return true for undefined", () => {
         expect(is.undefined(undefined)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for null", () => {
         expect(is.undefined(null)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.undefined(1)).toBe(false);
      });

      it("should return false for a negative number", () => {
         expect(is.undefined(-1)).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(is.undefined(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(is.undefined(-1.1)).toBe(false);
      });

      it("should return false for a number string", () => {
         expect(is.undefined("1")).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(is.undefined("-1")).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(is.undefined("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(is.undefined("-1.1")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(is.undefined("")).toBe(false);
      });

      it("should return false for an whitespace string", () => {
         expect(is.undefined(" ")).toBe(false);
      });

      it("should return false for a string", () => {
         expect(is.undefined("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(is.undefined(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.undefined({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.undefined({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.undefined(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.undefined(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.undefined(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.undefined([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.undefined([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.undefined(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.undefined(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.undefined(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(is.undefined(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(is.undefined(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.undefined(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.undefined(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.undefined(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(is.undefined(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(is.undefined(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.undefined(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.undefined(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.undefined(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(is.undefined(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.undefined(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.undefined(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.undefined(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.undefined(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.undefined(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(is.undefined("1n")).toBe(false);
      });
   });
});

describe("is.nil", () => {
   describe("true test cases", () => {
      it("should return true for undefined", () => {
         expect(is.nil(undefined)).toBe(true);
      });

      it("should return true for null", () => {
         expect(is.nil(null)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a number", () => {
         expect(is.nil(1)).toBe(false);
      });

      it("should return false for a negative number", () => {
         expect(is.nil(-1)).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(is.nil(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(is.nil(-1.1)).toBe(false);
      });

      it("should return false for a number string", () => {
         expect(is.nil("1")).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(is.nil("-1")).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(is.nil("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(is.nil("-1.1")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(is.nil("")).toBe(false);
      });

      it("should return false for an whitespace string", () => {
         expect(is.nil(" ")).toBe(false);
      });

      it("should return false for a string", () => {
         expect(is.nil("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(is.nil(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.nil({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.nil({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.nil(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.nil(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.nil(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.nil([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.nil([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.nil(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.nil(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.nil(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(is.nil(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(is.nil(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.nil(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.nil(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.nil(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(is.nil(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(is.nil(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.nil(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.nil(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.nil(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(is.nil(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.nil(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.nil(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.nil(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.nil(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.nil(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(is.nil("1n")).toBe(false);
      });
   });
});

describe("is.nothing", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(is.nothing("")).toBe(true);
      });

      it("should return true for a string with whitespace", () => {
         expect(is.nothing(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(is.nothing("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(is.nothing("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(is.nothing("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(is.nothing("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(is.nothing("\t\n ")).toBe(true);
      });

      it("should return true for a null", () => {
         expect(is.nothing(null)).toBe(true);
      });

      it("should return true for an undefined", () => {
         expect(is.nothing(undefined)).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string with a value", () => {
         expect(is.nothing("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(is.nothing(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(is.nothing("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(is.nothing("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(is.nothing("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(is.nothing("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(is.nothing(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(is.nothing(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.nothing(1)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.nothing({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.nothing({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.nothing(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.nothing(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.nothing(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.nothing(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.nothing(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.nothing(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.nothing(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.nothing(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.nothing([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.nothing([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.nothing(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.nothing(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.nothing(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.nothing(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.nothing(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.nothing(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.nothing(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.nothing(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.nothing(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.nothing(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.nothing(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.nothing(Symbol())).toBe(false);
      });
   });
});
