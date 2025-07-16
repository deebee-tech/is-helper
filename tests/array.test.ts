import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isArray", () => {
   describe("true test cases", () => {
      it("should return true for a normal array", () => {
         expect(IsHelper.isArray([1, 2, 3])).toBe(true);
      });

      it("should return true for an empty array", () => {
         expect(IsHelper.isArray([])).toBe(true);
      });

      it("should return true for a Float32Array", () => {
         expect(IsHelper.isArray(new Float32Array())).toBe(true);
      });

      it("should return true for a Float64Array", () => {
         expect(IsHelper.isArray(new Float64Array())).toBe(true);
      });

      it("should return true for an Int8Array", () => {
         expect(IsHelper.isArray(new Int8Array())).toBe(true);
      });

      it("should return true for an Int16Array", () => {
         expect(IsHelper.isArray(new Int16Array())).toBe(true);
      });

      it("should return true for an Int32Array", () => {
         expect(IsHelper.isArray(new Int32Array())).toBe(true);
      });

      it("should return true for a Uint8Array", () => {
         expect(IsHelper.isArray(new Uint8Array())).toBe(true);
      });

      it("should return true for a Uint16Array", () => {
         expect(IsHelper.isArray(new Uint16Array())).toBe(true);
      });

      it("should return true for a Uint32Array", () => {
         expect(IsHelper.isArray(new Uint32Array())).toBe(true);
      });

      it("should return true for a Uint8ClampedArray", () => {
         expect(IsHelper.isArray(new Uint8ClampedArray())).toBe(true);
      });

      it("should return true for a BigInt64Array", () => {
         expect(IsHelper.isArray(new BigInt64Array())).toBe(true);
      });

      it("should return true for a BigUint64Array", () => {
         expect(IsHelper.isArray(new BigUint64Array())).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string", () => {
         expect(IsHelper.isArray("")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isArray(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isArray(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isArray(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isArray(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isArray({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isArray({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isArray(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isArray(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isArray(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isArray(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isArray(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isArray(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isArray(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isArray(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isArray(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isArray(new WeakSet())).toBe(false);
      });

      it("should return false for a DataView", () => {
         expect(IsHelper.isArray(new DataView(new ArrayBuffer(8)))).toBe(false);
      });
   });
});

describe("isEmptyArray", () => {
   describe("true test cases", () => {
      it("should return true for an empty array", () => {
         expect(IsHelper.isEmptyArray([])).toBe(true);
      });

      it("should return true for a Float32Array", () => {
         expect(IsHelper.isEmptyArray(new Float32Array())).toBe(true);
      });

      it("should return true for a Float64Array", () => {
         expect(IsHelper.isEmptyArray(new Float64Array())).toBe(true);
      });

      it("should return true for an Int8Array", () => {
         expect(IsHelper.isEmptyArray(new Int8Array())).toBe(true);
      });

      it("should return true for an Int16Array", () => {
         expect(IsHelper.isEmptyArray(new Int16Array())).toBe(true);
      });

      it("should return true for an Int32Array", () => {
         expect(IsHelper.isEmptyArray(new Int32Array())).toBe(true);
      });

      it("should return true for a Uint8Array", () => {
         expect(IsHelper.isEmptyArray(new Uint8Array())).toBe(true);
      });

      it("should return true for a Uint16Array", () => {
         expect(IsHelper.isEmptyArray(new Uint16Array())).toBe(true);
      });

      it("should return true for a Uint32Array", () => {
         expect(IsHelper.isEmptyArray(new Uint32Array())).toBe(true);
      });

      it("should return true for a Uint8ClampedArray", () => {
         expect(IsHelper.isEmptyArray(new Uint8ClampedArray())).toBe(true);
      });

      it("should return true for a BigInt64Array", () => {
         expect(IsHelper.isEmptyArray(new BigInt64Array())).toBe(true);
      });

      it("should return true for a BigUint64Array", () => {
         expect(IsHelper.isEmptyArray(new BigUint64Array())).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a normal array", () => {
         expect(IsHelper.isEmptyArray([1, 2, 3])).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isEmptyArray("")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isEmptyArray(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isEmptyArray(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isEmptyArray(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isEmptyArray(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isEmptyArray({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isEmptyArray({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isEmptyArray(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isEmptyArray(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isEmptyArray(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isEmptyArray(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isEmptyArray(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isEmptyArray(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isEmptyArray(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isEmptyArray(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isEmptyArray(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isEmptyArray(new WeakSet())).toBe(false);
      });

      it("should return false for a DataView", () => {
         expect(IsHelper.isEmptyArray(new DataView(new ArrayBuffer(8)))).toBe(false);
      });
   });
});

describe("isNonEmptyArray", () => {
   describe("true test cases", () => {
      it("should return true for an normal array", () => {
         expect(IsHelper.isNonEmptyArray([1, 2, 3])).toBe(true);
      });

      it("should return true for a Float32Array", () => {
         expect(IsHelper.isNonEmptyArray(new Float32Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for a Float64Array", () => {
         expect(IsHelper.isNonEmptyArray(new Float64Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for an Int8Array", () => {
         expect(IsHelper.isNonEmptyArray(new Int8Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for an Int16Array", () => {
         expect(IsHelper.isNonEmptyArray(new Int16Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for an Int32Array", () => {
         expect(IsHelper.isNonEmptyArray(new Int32Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for a Uint8Array", () => {
         expect(IsHelper.isNonEmptyArray(new Uint8Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for a Uint16Array", () => {
         expect(IsHelper.isNonEmptyArray(new Uint16Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for a Uint32Array", () => {
         expect(IsHelper.isNonEmptyArray(new Uint32Array([1, 2, 3]))).toBe(true);
      });

      it("should return true for a Uint8ClampedArray", () => {
         expect(IsHelper.isNonEmptyArray(new Uint8ClampedArray([1, 2, 3]))).toBe(true);
      });

      it("should return true for a BigInt64Array", () => {
         expect(IsHelper.isNonEmptyArray(new BigInt64Array([1n, 2n, 3n]))).toBe(true);
      });

      it("should return true for a BigUint64Array", () => {
         expect(IsHelper.isNonEmptyArray(new BigUint64Array([1n, 2n, 3n]))).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an empty array", () => {
         expect(IsHelper.isNonEmptyArray([])).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isNonEmptyArray(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isNonEmptyArray(new Float64Array())).toBe(false);
      });

      it("should return false for an Int8Array", () => {
         expect(IsHelper.isNonEmptyArray(new Int8Array())).toBe(false);
      });

      it("should return false for an Int16Array", () => {
         expect(IsHelper.isNonEmptyArray(new Int16Array())).toBe(false);
      });

      it("should return false for an Int32Array", () => {
         expect(IsHelper.isNonEmptyArray(new Int32Array())).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isNonEmptyArray(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isNonEmptyArray(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isNonEmptyArray(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isNonEmptyArray(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isNonEmptyArray(new BigInt64Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isNonEmptyArray(new BigUint64Array())).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isNonEmptyArray("")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isNonEmptyArray(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isNonEmptyArray(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isNonEmptyArray(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isNonEmptyArray(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isNonEmptyArray({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isNonEmptyArray({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isNonEmptyArray(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isNonEmptyArray(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isNonEmptyArray(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isNonEmptyArray(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isNonEmptyArray(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isNonEmptyArray(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isNonEmptyArray(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isNonEmptyArray(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isNonEmptyArray(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isNonEmptyArray(new WeakSet())).toBe(false);
      });

      it("should return false for a DataView", () => {
         expect(IsHelper.isNonEmptyArray(new DataView(new ArrayBuffer(8)))).toBe(false);
      });
   });
});
