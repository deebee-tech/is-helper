import { describe, expect, it } from "vitest";
import is from "../src";

describe("is.string", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(is.string("")).toBe(true);
      });

      it("should return true for a string with whitespace", () => {
         expect(is.string(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(is.string("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(is.string("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(is.string("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(is.string("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(is.string("\t\n ")).toBe(true);
      });

      it("should return true for a string with a value", () => {
         expect(is.string("a")).toBe(true);
      });

      it("should return true for a string with whitespace at the beginning", () => {
         expect(is.string(" a")).toBe(true);
      });

      it("should return true for a string with whitespace at the end", () => {
         expect(is.string("a ")).toBe(true);
      });

      it("should return true for a string with whitespace in the middle", () => {
         expect(is.string("a b")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and a value", () => {
         expect(is.string("\t\na")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(is.string("\t\n a")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for boolean true", () => {
         expect(is.string(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(is.string(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.string(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(is.string(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(is.string(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.string({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.string({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.string(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.string(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.string(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.string(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.string(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.string(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.string(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.string([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.string([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.string(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.string(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.string(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.string(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.string(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.string(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.string(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.string(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.string(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.string(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.string(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string(Symbol())).toBe(false);
      });
   });
});

describe("is.string.empty", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(is.string.empty("")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string with a value", () => {
         expect(is.string.empty("a")).toBe(false);
      });

      it("should return false for a string with whitespace", () => {
         expect(is.string.empty(" ")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(is.string.empty(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(is.string.empty("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(is.string.empty("a b")).toBe(false);
      });

      it("should return false for a string with a newline character", () => {
         expect(is.string.empty("\n")).toBe(false);
      });

      it("should return false for a string with a tab character", () => {
         expect(is.string.empty("\t")).toBe(false);
      });

      it("should return false for a string with a newline and tab character", () => {
         expect(is.string.empty("\n\t")).toBe(false);
      });

      it("should return false for a string with a tab and newline character", () => {
         expect(is.string.empty("\t\n")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(is.string.empty("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace", () => {
         expect(is.string.empty("\t\n ")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(is.string.empty("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(is.string.empty(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(is.string.empty(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.string.empty(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(is.string.empty(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(is.string.empty(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.string.empty({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.string.empty({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.string.empty(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.string.empty(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.string.empty(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.string.empty(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.string.empty(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string.empty(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.string.empty(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.string.empty(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.string.empty([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.string.empty([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.string.empty(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.string.empty(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.string.empty(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.string.empty(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.string.empty(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.string.empty(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.string.empty(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.string.empty(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.string.empty(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.string.empty(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.string.empty(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string.empty(Symbol())).toBe(false);
      });
   });
});

describe("is.string.whitespace", () => {
   describe("true test cases", () => {
      it("should return true for a string with whitespace", () => {
         expect(is.string.whitespace(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(is.string.whitespace("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(is.string.whitespace("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(is.string.whitespace("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(is.string.whitespace("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(is.string.whitespace("\t\n ")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an empty string", () => {
         expect(is.string.whitespace("")).toBe(false);
      });

      it("should return false for a string with a value", () => {
         expect(is.string.whitespace("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(is.string.whitespace(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(is.string.whitespace("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(is.string.whitespace("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(is.string.whitespace("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(is.string.whitespace("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(is.string.whitespace(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(is.string.whitespace(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.string.whitespace(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(is.string.whitespace(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(is.string.whitespace(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.string.whitespace({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.string.whitespace({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.string.whitespace(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.string.whitespace(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.string.whitespace(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.string.whitespace(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.string.whitespace(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string.whitespace(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.string.whitespace(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.string.whitespace(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.string.whitespace([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.string.whitespace([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.string.whitespace(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.string.whitespace(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.string.whitespace(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.string.whitespace(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.string.whitespace(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.string.whitespace(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.string.whitespace(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.string.whitespace(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.string.whitespace(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.string.whitespace(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.string.whitespace(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string.whitespace(Symbol())).toBe(false);
      });
   });
});

describe("is.string.blank", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(is.string.blank("")).toBe(true);
      });

      it("should return true for a string with whitespace", () => {
         expect(is.string.blank(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(is.string.blank("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(is.string.blank("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(is.string.blank("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(is.string.blank("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(is.string.blank("\t\n ")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string with a value", () => {
         expect(is.string.blank("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(is.string.blank(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(is.string.blank("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(is.string.blank("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(is.string.blank("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(is.string.blank("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(is.string.blank(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(is.string.blank(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.string.blank(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(is.string.blank(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(is.string.blank(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.string.blank({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.string.blank({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.string.blank(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.string.blank(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.string.blank(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.string.blank(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.string.blank(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string.blank(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.string.blank(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.string.blank(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.string.blank([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.string.blank([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.string.blank(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.string.blank(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.string.blank(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.string.blank(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.string.blank(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.string.blank(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.string.blank(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.string.blank(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.string.blank(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.string.blank(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.string.blank(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.string.blank(Symbol())).toBe(false);
      });
   });
});

describe("is.ipv4", () => {
   describe("true test cases", () => {
      it("should return true for an Ipv4 string", () => {
         expect(is.ipv4("123.123.123.123")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an Ipv4 format but with alpha character string", () => {
         expect(is.ipv4("xxx.xxx.xxx.xxx")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(is.ipv4("")).toBe(false);
      });

      it("should return false for a string with whitespace", () => {
         expect(is.ipv4(" ")).toBe(false);
      });

      it("should return false for a string with a newline character", () => {
         expect(is.ipv4("\n")).toBe(false);
      });

      it("should return false for a string with a tab character", () => {
         expect(is.ipv4("\t")).toBe(false);
      });

      it("should return false for a string with a newline and tab character", () => {
         expect(is.ipv4("\n\t")).toBe(false);
      });

      it("should return false for a string with a tab and newline character", () => {
         expect(is.ipv4("\t\n")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace", () => {
         expect(is.ipv4("\t\n ")).toBe(false);
      });

      it("should return false for a string with a value", () => {
         expect(is.ipv4("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(is.ipv4(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(is.ipv4("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(is.ipv4("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(is.ipv4("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(is.ipv4("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(is.ipv4(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(is.ipv4(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(is.ipv4(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(is.ipv4(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(is.ipv4(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(is.ipv4({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(is.ipv4({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(is.ipv4(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(is.ipv4(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(is.ipv4(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(is.ipv4(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(is.ipv4(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.ipv4(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(is.ipv4(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(is.ipv4(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(is.ipv4([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(is.ipv4([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(is.ipv4(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(is.ipv4(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(is.ipv4(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(is.ipv4(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(is.ipv4(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(is.ipv4(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(is.ipv4(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(is.ipv4(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(is.ipv4(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(is.ipv4(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(is.ipv4(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(is.ipv4(Symbol())).toBe(false);
      });
   });
});
