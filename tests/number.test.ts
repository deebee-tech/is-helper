import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isNumber", () => {
   describe("true test cases", () => {
      it("should return true for a number", () => {
         expect(IsHelper.isNumber(1)).toBe(true);
      });

      it("should return true for a negative number", () => {
         expect(IsHelper.isNumber(-1)).toBe(true);
      });

      it("should return true for a decimal number", () => {
         expect(IsHelper.isNumber(1.1)).toBe(true);
      });

      it("should return true for a negative decimal number", () => {
         expect(IsHelper.isNumber(-1.1)).toBe(true);
      });

      it("should return true for a number string", () => {
         expect(IsHelper.isNumber("1")).toBe(true);
      });

      it("should return true for a negative number string", () => {
         expect(IsHelper.isNumber("-1")).toBe(true);
      });

      it("should return true for a decimal number string", () => {
         expect(IsHelper.isNumber("1.1")).toBe(true);
      });

      it("should return true for a negative decimal number string", () => {
         expect(IsHelper.isNumber("-1.1")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an empty string", () => {
         expect(IsHelper.isNumber("")).toBe(false);
      });
      it("should return false for an whitespace string", () => {
         expect(IsHelper.isNumber(" ")).toBe(false);
      });

      it("should return false for undefined", () => {
         expect(IsHelper.isNumber(undefined)).toBe(false);
      });

      it("should return false for null", () => {
         expect(IsHelper.isNumber(null)).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isNumber("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isNumber(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isNumber({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isNumber({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isNumber(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isNumber(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isNumber(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isNumber([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isNumber([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isNumber(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isNumber(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isNumber(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isNumber(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isNumber(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isNumber(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isNumber(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isNumber(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isNumber(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isNumber(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isNumber(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isNumber(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isNumber(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isNumber(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isNumber(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isNumber(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isNumber(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isNumber(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isNumber(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isNumber("1n")).toBe(false);
      });
   });
});

describe("isPositiveNumber", () => {
   describe("true test cases", () => {
      it("should return true for a number", () => {
         expect(IsHelper.isPositiveNumber(1)).toBe(true);
      });

      it("should return true for a number string", () => {
         expect(IsHelper.isPositiveNumber("1")).toBe(true);
      });

      it("should return true for a decimal number", () => {
         expect(IsHelper.isPositiveNumber(1.1)).toBe(true);
      });

      it("should return true for a decimal number string", () => {
         expect(IsHelper.isPositiveNumber("1.1")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a negative number", () => {
         expect(IsHelper.isPositiveNumber(-1)).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(IsHelper.isPositiveNumber("-1")).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(IsHelper.isPositiveNumber(-1.1)).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(IsHelper.isPositiveNumber("-1.1")).toBe(false);
      });
      it("should return false for an empty string", () => {
         expect(IsHelper.isPositiveNumber("")).toBe(false);
      });
      it("should return false for an whitespace string", () => {
         expect(IsHelper.isPositiveNumber(" ")).toBe(false);
      });

      it("should return false for undefined", () => {
         expect(IsHelper.isPositiveNumber(undefined)).toBe(false);
      });

      it("should return false for null", () => {
         expect(IsHelper.isPositiveNumber(null)).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isPositiveNumber("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isPositiveNumber(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isPositiveNumber({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isPositiveNumber({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isPositiveNumber(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isPositiveNumber(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isPositiveNumber(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isPositiveNumber([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isPositiveNumber([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isPositiveNumber(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isPositiveNumber(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isPositiveNumber(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isPositiveNumber(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isPositiveNumber(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isPositiveNumber(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isPositiveNumber(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isPositiveNumber(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isPositiveNumber(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isPositiveNumber(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isPositiveNumber(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isPositiveNumber(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isPositiveNumber(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isPositiveNumber(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isPositiveNumber(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isPositiveNumber(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isPositiveNumber(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isPositiveNumber(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isPositiveNumber(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isPositiveNumber("1n")).toBe(false);
      });
   });
});

describe("isInteger", () => {
   describe("true test cases", () => {
      it("should return true for a number", () => {
         expect(IsHelper.isInteger(1)).toBe(true);
      });

      it("should return true for a negative number", () => {
         expect(IsHelper.isInteger(-1)).toBe(true);
      });

      it("should return true for a number string", () => {
         expect(IsHelper.isInteger("1")).toBe(true);
      });

      it("should return true for a negative number string", () => {
         expect(IsHelper.isInteger("-1")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a decimal number", () => {
         expect(IsHelper.isInteger(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(IsHelper.isInteger(-1.1)).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(IsHelper.isInteger("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(IsHelper.isInteger("-1.1")).toBe(false);
      });
      it("should return false for an empty string", () => {
         expect(IsHelper.isInteger("")).toBe(false);
      });
      it("should return false for an whitespace string", () => {
         expect(IsHelper.isInteger(" ")).toBe(false);
      });

      it("should return false for undefined", () => {
         expect(IsHelper.isInteger(undefined)).toBe(false);
      });

      it("should return false for null", () => {
         expect(IsHelper.isInteger(null)).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isInteger("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isInteger(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isInteger({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isInteger({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isInteger(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isInteger(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isInteger(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isInteger([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isInteger([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isInteger(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isInteger(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isInteger(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isInteger(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isInteger(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isInteger(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isInteger(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isInteger(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isInteger(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isInteger(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isInteger(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isInteger(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isInteger(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isInteger(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isInteger(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isInteger(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isInteger(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isInteger(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isInteger(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isInteger("1n")).toBe(false);
      });
   });
});

describe("isPositiveInteger", () => {
   describe("true test cases", () => {
      it("should return true for a number", () => {
         expect(IsHelper.isPositiveInteger(1)).toBe(true);
      });

      it("should return true for a number string", () => {
         expect(IsHelper.isPositiveInteger("1")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a negative number", () => {
         expect(IsHelper.isPositiveInteger(-1)).toBe(false);
      });

      it("should return false for a negative number string", () => {
         expect(IsHelper.isPositiveInteger("-1")).toBe(false);
      });

      it("should return false for a decimal number", () => {
         expect(IsHelper.isPositiveInteger(1.1)).toBe(false);
      });

      it("should return false for a negative decimal number", () => {
         expect(IsHelper.isPositiveInteger(-1.1)).toBe(false);
      });

      it("should return false for a decimal number string", () => {
         expect(IsHelper.isPositiveInteger("1.1")).toBe(false);
      });

      it("should return false for a negative decimal number string", () => {
         expect(IsHelper.isPositiveInteger("-1.1")).toBe(false);
      });
      it("should return false for an empty string", () => {
         expect(IsHelper.isPositiveInteger("")).toBe(false);
      });
      it("should return false for an whitespace string", () => {
         expect(IsHelper.isPositiveInteger(" ")).toBe(false);
      });

      it("should return false for undefined", () => {
         expect(IsHelper.isPositiveInteger(undefined)).toBe(false);
      });

      it("should return false for null", () => {
         expect(IsHelper.isPositiveInteger(null)).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isPositiveInteger("a")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isPositiveInteger(true)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isPositiveInteger({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isPositiveInteger({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isPositiveInteger(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isPositiveInteger(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isPositiveInteger(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isPositiveInteger([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isPositiveInteger([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isPositiveInteger(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isPositiveInteger(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isPositiveInteger(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isPositiveInteger(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for a Date object created with an epoch timestamp", () => {
         expect(IsHelper.isPositiveInteger(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isPositiveInteger(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isPositiveInteger(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isPositiveInteger(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isPositiveInteger(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isPositiveInteger(new BigInt64Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isPositiveInteger(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isPositiveInteger(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isPositiveInteger(new Int32Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isPositiveInteger(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isPositiveInteger(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isPositiveInteger(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isPositiveInteger(new WeakSet())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isPositiveInteger(new WeakMap())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isPositiveInteger(BigInt(1))).toBe(false);
      });

      it("should return false for a BigInt string", () => {
         expect(IsHelper.isPositiveInteger("1n")).toBe(false);
      });
   });
});
