import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isDate", () => {
   describe("true test cases", () => {
      it("should return true for a Date object", () => {
         expect(IsHelper.isDate(new Date())).toBe(true);
      });

      it("should return true for a Date object created with a string", () => {
         expect(IsHelper.isDate(new Date("2021-01-01T00:00:00.000Z"))).toBe(true);
      });

      it("should return true for Date object created with epoch timestamp", () => {
         expect(IsHelper.isDate(new Date(1735689600))).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string", () => {
         expect(IsHelper.isDate("")).toBe(false);
      });
      it("should return false for a boolean", () => {
         expect(IsHelper.isDate(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isDate(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isDate(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isDate(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isDate({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isDate({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isDate(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isDate(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isDate(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isDate([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isDate([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isDate(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isDate(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isDate(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isDate(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isDate(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isDate(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isDate(BigInt(1))).toBe(false);
      });

      it("should return false for Float32Array", () => {
         expect(IsHelper.isDate(new Float32Array())).toBe(false);
      });

      it("should return false for Float64Array", () => {
         expect(IsHelper.isDate(new Float64Array())).toBe(false);
      });

      it("should return false for Int8Array", () => {
         expect(IsHelper.isDate(new Int8Array())).toBe(false);
      });

      it("should return false for Int16Array", () => {
         expect(IsHelper.isDate(new Int16Array())).toBe(false);
      });

      it("should return false for Int32Array", () => {
         expect(IsHelper.isDate(new Int32Array())).toBe(false);
      });

      it("should return false for Uint8Array", () => {
         expect(IsHelper.isDate(new Uint8Array())).toBe(false);
      });

      it("should return false for Uint16Array", () => {
         expect(IsHelper.isDate(new Uint16Array())).toBe(false);
      });

      it("should return false for Uint32Array", () => {
         expect(IsHelper.isDate(new Uint32Array())).toBe(false);
      });

      it("should return false for Uint8ClampedArray", () => {
         expect(IsHelper.isDate(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for BigInt64Array", () => {
         expect(IsHelper.isDate(new BigInt64Array())).toBe(false);
      });

      it("should return false for BigUint64Array", () => {
         expect(IsHelper.isDate(new BigUint64Array())).toBe(false);
      });

      it("should return false for a string number", () => {
         expect(IsHelper.isDate("1")).toBe(false);
      });

      it("should return false for a string boolean", () => {
         expect(IsHelper.isDate("true")).toBe(false);
      });
   });
});
