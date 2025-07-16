import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isEmptyObject", () => {
   describe("true test cases", () => {
      it("should return true for an empty object", () => {
         expect(IsHelper.isEmptyObject({})).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an object with a property", () => {
         expect(IsHelper.isEmptyObject({ a: 1 })).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isEmptyObject([])).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isEmptyObject("")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isEmptyObject(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isEmptyObject(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isEmptyObject(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isEmptyObject(undefined)).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isEmptyObject(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isEmptyObject(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isEmptyObject(new Set())).toBe(false);
      });

      it("should return false for a Date object", () => {
         expect(IsHelper.isEmptyObject(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isEmptyObject(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for Date object created with epoch timestamp", () => {
         expect(IsHelper.isEmptyObject(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isEmptyObject(new Uint8Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isEmptyObject(new Int8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isEmptyObject(new Uint16Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isEmptyObject(new Int16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isEmptyObject(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isEmptyObject(new Int32Array())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isEmptyObject(new BigInt64Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isEmptyObject(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isEmptyObject(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isEmptyObject(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isEmptyObject(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isEmptyObject(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isEmptyObject(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isEmptyObject(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isEmptyObject(Symbol())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isEmptyObject(/.*/)).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isEmptyObject(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isEmptyObject(Promise.resolve())).toBe(false);
      });

      it("should return false for a DataView", () => {
         expect(IsHelper.isEmptyObject(new DataView(new ArrayBuffer(8)))).toBe(false);
      });
   });
});

describe("isPlainObject", () => {
   describe("true test cases", () => {
      it("should return true for an empty object", () => {
         expect(IsHelper.isPlainObject({})).toBe(true);
      });

      it("should return true for an object with a property", () => {
         expect(IsHelper.isPlainObject({ a: 1 })).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an empty array", () => {
         expect(IsHelper.isPlainObject([])).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.isPlainObject("")).toBe(false);
      });

      it("should return false for a boolean", () => {
         expect(IsHelper.isPlainObject(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isPlainObject(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isPlainObject(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isPlainObject(undefined)).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isPlainObject(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isPlainObject(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isPlainObject(new Set())).toBe(false);
      });

      it("should return false for a Date object", () => {
         expect(IsHelper.isPlainObject(new Date())).toBe(false);
      });

      it("should return false for a Date object created with a string", () => {
         expect(IsHelper.isPlainObject(new Date("2021-01-01T00:00:00.000Z"))).toBe(false);
      });

      it("should return false for Date object created with epoch timestamp", () => {
         expect(IsHelper.isPlainObject(new Date(1735689600))).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isPlainObject(new Uint8Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isPlainObject(new Int8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isPlainObject(new Uint16Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isPlainObject(new Int16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isPlainObject(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isPlainObject(new Int32Array())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isPlainObject(new BigInt64Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isPlainObject(new BigUint64Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isPlainObject(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isPlainObject(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isPlainObject(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isPlainObject(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isPlainObject(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isPlainObject(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isPlainObject(Symbol())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isPlainObject(/.*/)).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isPlainObject(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isPlainObject(Promise.resolve())).toBe(false);
      });

      it("should return false for a DataView", () => {
         expect(IsHelper.isPlainObject(new DataView(new ArrayBuffer(8)))).toBe(false);
      });
   });
});
