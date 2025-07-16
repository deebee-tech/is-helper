import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isBoolean", () => {
   describe("true test cases", () => {
      it("should return true for a true boolean", () => {
         expect(IsHelper.isBoolean(true)).toBe(true);
      });

      it("should return true for a false boolean", () => {
         expect(IsHelper.isBoolean(false)).toBe(true);
      });

      it("should return true for a string of 'true'", () => {
         expect(IsHelper.isBoolean("true")).toBe(true);
      });

      it("should return true for a string of 'false'", () => {
         expect(IsHelper.isBoolean("false")).toBe(true);
      });

      it("should return true for a string of 'TRUE'", () => {
         expect(IsHelper.isBoolean("TRUE")).toBe(true);
      });

      it("should return true for a string of 'FALSE'", () => {
         expect(IsHelper.isBoolean("FALSE")).toBe(true);
      });

      it("should return true for a string of '1'", () => {
         expect(IsHelper.isBoolean("1")).toBe(true);
      });

      it("should return true for a string of '0'", () => {
         expect(IsHelper.isBoolean("0")).toBe(true);
      });

      it("should return true for a number of 1", () => {
         expect(IsHelper.isBoolean(1)).toBe(true);
      });

      it("should return true for a number of 0", () => {
         expect(IsHelper.isBoolean(0)).toBe(true);
      });

      it("should return true for a string of 'y'", () => {
         expect(IsHelper.isBoolean("y")).toBe(true);
      });

      it("should return true for a string of 'n'", () => {
         expect(IsHelper.isBoolean("n")).toBe(true);
      });

      it("should return true for a string of 'yes'", () => {
         expect(IsHelper.isBoolean("yes")).toBe(true);
      });

      it("should return true for a string of 'no'", () => {
         expect(IsHelper.isBoolean("no")).toBe(true);
      });

      it("should return true for a string of 'Y'", () => {
         expect(IsHelper.isBoolean("Y")).toBe(true);
      });

      it("should return true for a string of 'N'", () => {
         expect(IsHelper.isBoolean("N")).toBe(true);
      });

      it("should return true for a string of 'YES'", () => {
         expect(IsHelper.isBoolean("YES")).toBe(true);
      });

      it("should return true for a string of 'NO'", () => {
         expect(IsHelper.isBoolean("NO")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string", () => {
         expect(IsHelper.isBoolean("")).toBe(false);
      });

      it("should return false for a non-binary number", () => {
         expect(IsHelper.isBoolean(2)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isBoolean(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isBoolean(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isBoolean({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isBoolean({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isBoolean(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isBoolean(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isBoolean(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isBoolean(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isBoolean(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isBoolean(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isBoolean(new Date())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isBoolean([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isBoolean([1])).toBe(false);
      });

      it("should return false for an array or booleans", () => {
         expect(IsHelper.isBoolean([true])).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isBoolean(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isBoolean(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isBoolean(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isBoolean(new WeakSet())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isBoolean(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isBoolean(new Float64Array())).toBe(false);
      });

      it("should return false for an Int8Array", () => {
         expect(IsHelper.isBoolean(new Int8Array())).toBe(false);
      });

      it("should return false for an Int16Array", () => {
         expect(IsHelper.isBoolean(new Int16Array())).toBe(false);
      });

      it("should return false for an Int32Array", () => {
         expect(IsHelper.isBoolean(new Int32Array())).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isBoolean(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isBoolean(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isBoolean(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.isBoolean(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.isBoolean(new BigInt64Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.isBoolean(new BigUint64Array())).toBe(false);
      });
   });
});

describe("getBooleanValue", () => {
   describe("true test cases", () => {
      it("should return true for a true boolean", () => {
         expect(IsHelper.getBooleanValue(true)).toBe(true);
      });

      it("should return true for a string of 'true'", () => {
         expect(IsHelper.getBooleanValue("true")).toBe(true);
      });

      it("should return true for a string of 'TRUE'", () => {
         expect(IsHelper.getBooleanValue("TRUE")).toBe(true);
      });

      it("should return true for a string of '1'", () => {
         expect(IsHelper.getBooleanValue("1")).toBe(true);
      });

      it("should return true for a number of 1", () => {
         expect(IsHelper.getBooleanValue(1)).toBe(true);
      });

      it("should return true for a string of 'y'", () => {
         expect(IsHelper.getBooleanValue("y")).toBe(true);
      });

      it("should return true for a string of 'yes'", () => {
         expect(IsHelper.getBooleanValue("yes")).toBe(true);
      });

      it("should return true for a string of 'Y'", () => {
         expect(IsHelper.getBooleanValue("Y")).toBe(true);
      });

      it("should return true for a string of 'YES'", () => {
         expect(IsHelper.getBooleanValue("YES")).toBe(true);
      });
   });
   describe("false test cases", () => {
      it("should return true for a false boolean", () => {
         expect(IsHelper.getBooleanValue(false)).toBe(false);
      });

      it("should return true for a string of 'false'", () => {
         expect(IsHelper.getBooleanValue("false")).toBe(false);
      });

      it("should return true for a string of 'FALSE'", () => {
         expect(IsHelper.getBooleanValue("FALSE")).toBe(false);
      });

      it("should return true for a string of '0'", () => {
         expect(IsHelper.getBooleanValue("0")).toBe(false);
      });

      it("should return true for a number of 0", () => {
         expect(IsHelper.getBooleanValue(0)).toBe(false);
      });

      it("should return true for a string of 'n'", () => {
         expect(IsHelper.getBooleanValue("n")).toBe(false);
      });

      it("should return true for a string of 'no'", () => {
         expect(IsHelper.getBooleanValue("no")).toBe(false);
      });

      it("should return true for a string of 'N'", () => {
         expect(IsHelper.getBooleanValue("N")).toBe(false);
      });

      it("should return true for a string of 'NO'", () => {
         expect(IsHelper.getBooleanValue("NO")).toBe(false);
      });

      it("should return false for a string", () => {
         expect(IsHelper.getBooleanValue("")).toBe(false);
      });

      it("should return false for a non-binary number", () => {
         expect(IsHelper.getBooleanValue(2)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.getBooleanValue(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.getBooleanValue(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.getBooleanValue({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.getBooleanValue({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.getBooleanValue(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.getBooleanValue(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.getBooleanValue(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.getBooleanValue(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.getBooleanValue(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.getBooleanValue(Symbol())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.getBooleanValue(new Date())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.getBooleanValue([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.getBooleanValue([1])).toBe(false);
      });

      it("should return false for an array or booleans", () => {
         expect(IsHelper.getBooleanValue([true])).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.getBooleanValue(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.getBooleanValue(Promise.resolve())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.getBooleanValue(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.getBooleanValue(new WeakSet())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.getBooleanValue(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.getBooleanValue(new Float64Array())).toBe(false);
      });

      it("should return false for an Int8Array", () => {
         expect(IsHelper.getBooleanValue(new Int8Array())).toBe(false);
      });

      it("should return false for an Int16Array", () => {
         expect(IsHelper.getBooleanValue(new Int16Array())).toBe(false);
      });

      it("should return false for an Int32Array", () => {
         expect(IsHelper.getBooleanValue(new Int32Array())).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.getBooleanValue(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.getBooleanValue(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.getBooleanValue(new Uint32Array())).toBe(false);
      });

      it("should return false for a Uint8ClampedArray", () => {
         expect(IsHelper.getBooleanValue(new Uint8ClampedArray())).toBe(false);
      });

      it("should return false for a BigInt64Array", () => {
         expect(IsHelper.getBooleanValue(new BigInt64Array())).toBe(false);
      });

      it("should return false for a BigUint64Array", () => {
         expect(IsHelper.getBooleanValue(new BigUint64Array())).toBe(false);
      });
   });
});
