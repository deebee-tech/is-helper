import { describe, expect, it } from "vitest";
import IsHelper from "../src";

describe("isString", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(IsHelper.isString("")).toBe(true);
      });

      it("should return true for a string with whitespace", () => {
         expect(IsHelper.isString(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(IsHelper.isString("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(IsHelper.isString("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(IsHelper.isString("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(IsHelper.isString("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(IsHelper.isString("\t\n ")).toBe(true);
      });

      it("should return true for a string with a value", () => {
         expect(IsHelper.isString("a")).toBe(true);
      });

      it("should return true for a string with whitespace at the beginning", () => {
         expect(IsHelper.isString(" a")).toBe(true);
      });

      it("should return true for a string with whitespace at the end", () => {
         expect(IsHelper.isString("a ")).toBe(true);
      });

      it("should return true for a string with whitespace in the middle", () => {
         expect(IsHelper.isString("a b")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and a value", () => {
         expect(IsHelper.isString("\t\na")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(IsHelper.isString("\t\n a")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for boolean true", () => {
         expect(IsHelper.isString(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(IsHelper.isString(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isString(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isString(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isString(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isString({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isString({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isString(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isString(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isString(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isString(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isString(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isString(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isString(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isString(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isString([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isString([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isString(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isString(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isString(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isString(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isString(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isString(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isString(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isString(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isString(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isString(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isString(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isString(Symbol())).toBe(false);
      });
   });
});

describe("isEmptyString", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(IsHelper.isEmptyString("")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string with a value", () => {
         expect(IsHelper.isEmptyString("a")).toBe(false);
      });

      it("should return false for a string with whitespace", () => {
         expect(IsHelper.isEmptyString(" ")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(IsHelper.isEmptyString(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(IsHelper.isEmptyString("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(IsHelper.isEmptyString("a b")).toBe(false);
      });

      it("should return false for a string with a newline character", () => {
         expect(IsHelper.isEmptyString("\n")).toBe(false);
      });

      it("should return false for a string with a tab character", () => {
         expect(IsHelper.isEmptyString("\t")).toBe(false);
      });

      it("should return false for a string with a newline and tab character", () => {
         expect(IsHelper.isEmptyString("\n\t")).toBe(false);
      });

      it("should return false for a string with a tab and newline character", () => {
         expect(IsHelper.isEmptyString("\t\n")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(IsHelper.isEmptyString("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace", () => {
         expect(IsHelper.isEmptyString("\t\n ")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(IsHelper.isEmptyString("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(IsHelper.isEmptyString(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(IsHelper.isEmptyString(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isEmptyString(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isEmptyString(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isEmptyString(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isEmptyString({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isEmptyString({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isEmptyString(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isEmptyString(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isEmptyString(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isEmptyString(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isEmptyString(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isEmptyString(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isEmptyString(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isEmptyString(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isEmptyString([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isEmptyString([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isEmptyString(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isEmptyString(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isEmptyString(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isEmptyString(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isEmptyString(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isEmptyString(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isEmptyString(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isEmptyString(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isEmptyString(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isEmptyString(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isEmptyString(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isEmptyString(Symbol())).toBe(false);
      });
   });
});

describe("isWhiteSpaceString", () => {
   describe("true test cases", () => {
      it("should return true for a string with whitespace", () => {
         expect(IsHelper.isWhiteSpaceString(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(IsHelper.isWhiteSpaceString("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(IsHelper.isWhiteSpaceString("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(IsHelper.isWhiteSpaceString("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(IsHelper.isWhiteSpaceString("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(IsHelper.isWhiteSpaceString("\t\n ")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an empty string", () => {
         expect(IsHelper.isWhiteSpaceString("")).toBe(false);
      });

      it("should return false for a string with a value", () => {
         expect(IsHelper.isWhiteSpaceString("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(IsHelper.isWhiteSpaceString(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(IsHelper.isWhiteSpaceString("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(IsHelper.isWhiteSpaceString("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(IsHelper.isWhiteSpaceString("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(IsHelper.isWhiteSpaceString("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(IsHelper.isWhiteSpaceString(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(IsHelper.isWhiteSpaceString(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isWhiteSpaceString(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isWhiteSpaceString(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isWhiteSpaceString(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isWhiteSpaceString({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isWhiteSpaceString({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isWhiteSpaceString(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isWhiteSpaceString(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isWhiteSpaceString(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isWhiteSpaceString(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isWhiteSpaceString(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isWhiteSpaceString(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isWhiteSpaceString(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isWhiteSpaceString(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isWhiteSpaceString([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isWhiteSpaceString([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isWhiteSpaceString(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isWhiteSpaceString(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isWhiteSpaceString(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isWhiteSpaceString(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isWhiteSpaceString(Symbol())).toBe(false);
      });
   });
});

describe("isEmptyStringOrWhitespace", () => {
   describe("true test cases", () => {
      it("should return true for an empty string", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("")).toBe(true);
      });

      it("should return true for a string with whitespace", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(" ")).toBe(true);
      });

      it("should return true for a string with a newline character", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\n")).toBe(true);
      });

      it("should return true for a string with a tab character", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\t")).toBe(true);
      });

      it("should return true for a string with a newline and tab character", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\n\t")).toBe(true);
      });

      it("should return true for a string with a tab and newline character", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\t\n")).toBe(true);
      });

      it("should return true for a string with a tab and newline character and whitespace", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\t\n ")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for a string with a value", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(IsHelper.isEmptyStringOrWhitespace("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isEmptyStringOrWhitespace({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isEmptyStringOrWhitespace({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isEmptyStringOrWhitespace(Symbol())).toBe(false);
      });
   });
});

describe("isIpv4", () => {
   describe("true test cases", () => {
      it("should return true for an Ipv4 string", () => {
         expect(IsHelper.isIpv4("123.123.123.123")).toBe(true);
      });
   });

   describe("false test cases", () => {
      it("should return false for an Ipv4 format but with alpha character string", () => {
         expect(IsHelper.isIpv4("xxx.xxx.xxx.xxx")).toBe(false);
      });

      it("should return false for an empty string", () => {
         expect(IsHelper.isIpv4("")).toBe(false);
      });

      it("should return false for a string with whitespace", () => {
         expect(IsHelper.isIpv4(" ")).toBe(false);
      });

      it("should return false for a string with a newline character", () => {
         expect(IsHelper.isIpv4("\n")).toBe(false);
      });

      it("should return false for a string with a tab character", () => {
         expect(IsHelper.isIpv4("\t")).toBe(false);
      });

      it("should return false for a string with a newline and tab character", () => {
         expect(IsHelper.isIpv4("\n\t")).toBe(false);
      });

      it("should return false for a string with a tab and newline character", () => {
         expect(IsHelper.isIpv4("\t\n")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace", () => {
         expect(IsHelper.isIpv4("\t\n ")).toBe(false);
      });

      it("should return false for a string with a value", () => {
         expect(IsHelper.isIpv4("a")).toBe(false);
      });

      it("should return false for a string with whitespace at the beginning", () => {
         expect(IsHelper.isIpv4(" a")).toBe(false);
      });

      it("should return false for a string with whitespace at the end", () => {
         expect(IsHelper.isIpv4("a ")).toBe(false);
      });

      it("should return false for a string with whitespace in the middle", () => {
         expect(IsHelper.isIpv4("a b")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and a value", () => {
         expect(IsHelper.isIpv4("\t\na")).toBe(false);
      });

      it("should return false for a string with a tab and newline character and whitespace at the beginning", () => {
         expect(IsHelper.isIpv4("\t\n a")).toBe(false);
      });

      it("should return false for boolean true", () => {
         expect(IsHelper.isIpv4(true)).toBe(false);
      });

      it("should return false for boolean false", () => {
         expect(IsHelper.isIpv4(false)).toBe(false);
      });

      it("should return false for a number", () => {
         expect(IsHelper.isIpv4(1)).toBe(false);
      });

      it("should return false for a null", () => {
         expect(IsHelper.isIpv4(null)).toBe(false);
      });

      it("should return false for an undefined", () => {
         expect(IsHelper.isIpv4(undefined)).toBe(false);
      });

      it("should return false for an empty object", () => {
         expect(IsHelper.isIpv4({})).toBe(false);
      });

      it("should return false for an object", () => {
         expect(IsHelper.isIpv4({ a: 1 })).toBe(false);
      });

      it("should return false for a function", () => {
         expect(IsHelper.isIpv4(() => {})).toBe(false);
      });

      it("should return false for a Map", () => {
         expect(IsHelper.isIpv4(new Map())).toBe(false);
      });

      it("should return false for a Set", () => {
         expect(IsHelper.isIpv4(new Set())).toBe(false);
      });

      it("should return false for a Date", () => {
         expect(IsHelper.isIpv4(new Date())).toBe(false);
      });

      it("should return false for a RegExp", () => {
         expect(IsHelper.isIpv4(/.*/)).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isIpv4(Symbol())).toBe(false);
      });

      it("should return false for an Error", () => {
         expect(IsHelper.isIpv4(new Error())).toBe(false);
      });

      it("should return false for a Promise", () => {
         expect(IsHelper.isIpv4(Promise.resolve())).toBe(false);
      });

      it("should return false for an empty array", () => {
         expect(IsHelper.isIpv4([])).toBe(false);
      });

      it("should return false for an array", () => {
         expect(IsHelper.isIpv4([1])).toBe(false);
      });

      it("should return false for a Uint8Array", () => {
         expect(IsHelper.isIpv4(new Uint8Array())).toBe(false);
      });

      it("should return false for a Uint16Array", () => {
         expect(IsHelper.isIpv4(new Uint16Array())).toBe(false);
      });

      it("should return false for a Uint32Array", () => {
         expect(IsHelper.isIpv4(new Uint32Array())).toBe(false);
      });

      it("should return false for a Int8Array", () => {
         expect(IsHelper.isIpv4(new Int8Array())).toBe(false);
      });

      it("should return false for a Int16Array", () => {
         expect(IsHelper.isIpv4(new Int16Array())).toBe(false);
      });

      it("should return false for a Int32Array", () => {
         expect(IsHelper.isIpv4(new Int32Array())).toBe(false);
      });

      it("should return false for a Float32Array", () => {
         expect(IsHelper.isIpv4(new Float32Array())).toBe(false);
      });

      it("should return false for a Float64Array", () => {
         expect(IsHelper.isIpv4(new Float64Array())).toBe(false);
      });

      it("should return false for a WeakMap", () => {
         expect(IsHelper.isIpv4(new WeakMap())).toBe(false);
      });

      it("should return false for a WeakSet", () => {
         expect(IsHelper.isIpv4(new WeakSet())).toBe(false);
      });

      it("should return false for a BigInt", () => {
         expect(IsHelper.isIpv4(BigInt(1))).toBe(false);
      });

      it("should return false for a Symbol", () => {
         expect(IsHelper.isIpv4(Symbol())).toBe(false);
      });
   });
});
