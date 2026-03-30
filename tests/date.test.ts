import { describe, expect, it } from "vitest";
import is from "../src";

describe("is.date", () => {
   describe("true test cases", () => {
      it("should return true for a Date object", () => {
         expect(is.date(new Date())).toBe(true);
      });

      it("should return true for a Date object created with a string", () => {
         expect(is.date(new Date("2021-01-01T00:00:00.000Z"))).toBe(true);
      });

      it("should return true for Date object created with epoch timestamp", () => {
         expect(is.date(new Date(1735689600))).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string", () => {
         expect(is.date("")).toBe(false);
      });
      it("should return false for a boolean", () => {
         expect(is.date(true)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.date(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(is.date(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(is.date(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.date({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.date({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.date(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.date(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.date(new Set())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.date([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.date([1])).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.date(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.date(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.date(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.date(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.date(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.date(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.date(BigInt(1))).toBe(false);
      });

      it("should return false for Float32Array", () => {
         expect(is.date(new Float32Array())).toBe(false);
      });

      it("should return false for Float64Array", () => {
         expect(is.date(new Float64Array())).toBe(false);
      });

      it("should return false for Int8Array", () => {
         expect(is.date(new Int8Array())).toBe(false);
      });

      it("should return false for Int16Array", () => {
         expect(is.date(new Int16Array())).toBe(false);
      });

      it("should return false for Int32Array", () => {
         expect(is.date(new Int32Array())).toBe(false);
      });

      it("should return false for Uint8Array", () => {
         expect(is.date(new Uint8Array())).toBe(false);
      });

      it("should return false for Uint16Array", () => {
         expect(is.date(new Uint16Array())).toBe(false);
      });

      it("should return false for Uint32Array", () => {
         expect(is.date(new Uint32Array())).toBe(false);
      });

      it("should return false for Uint8ClampedArray", () => {
         expect(is.date(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for BigInt64Array", () => {
         expect(is.date(new BigInt64Array())).toBe(false);
      });

      it("should return false for BigUint64Array", () => {
         expect(is.date(new BigUint64Array())).toBe(false);
      });

      it("should return false for a string number", () => {
         expect(is.date("1")).toBe(false);
      });

      it("should return false for a string boolean", () => {
         expect(is.date("true")).toBe(false);
      });
   });
});
