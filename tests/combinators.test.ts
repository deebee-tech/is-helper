import { describe, expect, it } from "vitest";
import is from "../src";

describe("is.nil", () => {
   it("should return true for null", () => {
      expect(is.nil(null)).toBe(true);
   });

   it("should return true for undefined", () => {
      expect(is.nil(undefined)).toBe(true);
   });

   it("should return false for 0", () => {
      expect(is.nil(0)).toBe(false);
   });

   it("should return false for empty string", () => {
      expect(is.nil("")).toBe(false);
   });

   it("should return false for false", () => {
      expect(is.nil(false)).toBe(false);
   });
});

describe("is.defined", () => {
   it("should return true for 0", () => {
      expect(is.defined(0)).toBe(true);
   });

   it("should return true for empty string", () => {
      expect(is.defined("")).toBe(true);
   });

   it("should return true for false", () => {
      expect(is.defined(false)).toBe(true);
   });

   it("should return false for null", () => {
      expect(is.defined(null)).toBe(false);
   });

   it("should return false for undefined", () => {
      expect(is.defined(undefined)).toBe(false);
   });
});

describe("is.nothing", () => {
   it("should return true for null", () => {
      expect(is.nothing(null)).toBe(true);
   });

   it("should return true for undefined", () => {
      expect(is.nothing(undefined)).toBe(true);
   });

   it("should return true for empty string", () => {
      expect(is.nothing("")).toBe(true);
   });

   it("should return true for whitespace string", () => {
      expect(is.nothing(" ")).toBe(true);
   });

   it("should return true for tab string", () => {
      expect(is.nothing("\t")).toBe(true);
   });

   it("should return true for newline string", () => {
      expect(is.nothing("\n")).toBe(true);
   });

   it("should return false for a string with content", () => {
      expect(is.nothing("hello")).toBe(false);
   });

   it("should return false for 0", () => {
      expect(is.nothing(0)).toBe(false);
   });

   it("should return false for false", () => {
      expect(is.nothing(false)).toBe(false);
   });

   it("should return false for an object", () => {
      expect(is.nothing({})).toBe(false);
   });

   it("should return false for an array", () => {
      expect(is.nothing([])).toBe(false);
   });
});

describe("is.fn", () => {
   it("should return true for a function", () => {
      expect(is.fn(() => {})).toBe(true);
   });

   it("should return true for a named function", () => {
      function foo() {}
      expect(is.fn(foo)).toBe(true);
   });

   it("should return false for an object", () => {
      expect(is.fn({})).toBe(false);
   });

   it("should return false for null", () => {
      expect(is.fn(null)).toBe(false);
   });

   it("should return false for a string", () => {
      expect(is.fn("function")).toBe(false);
   });
});

describe("is.any", () => {
   it("should return true when any check passes", () => {
      const check = is.any(is.null, is.undefined);
      expect(check(null)).toBe(true);
      expect(check(undefined)).toBe(true);
   });

   it("should return false when no check passes", () => {
      const check = is.any(is.null, is.undefined);
      expect(check(0)).toBe(false);
      expect(check("")).toBe(false);
      expect(check(false)).toBe(false);
   });

   it("should work with namespace sub-properties", () => {
      const check = is.any(is.nil, is.string.blank);
      expect(check(null)).toBe(true);
      expect(check(undefined)).toBe(true);
      expect(check("")).toBe(true);
      expect(check(" ")).toBe(true);
      expect(check("hello")).toBe(false);
      expect(check(42)).toBe(false);
   });

   it("should work inline without storing", () => {
      expect(is.any(is.null, is.undefined, is.string.empty)(null)).toBe(true);
      expect(is.any(is.null, is.undefined, is.string.empty)("")).toBe(true);
      expect(is.any(is.null, is.undefined, is.string.empty)("x")).toBe(false);
   });
});

describe("is.all", () => {
   it("should return true when all checks pass", () => {
      const isNonBlankString = is.all(is.string, (v) => !is.string.blank(v));
      expect(isNonBlankString("hello")).toBe(true);
   });

   it("should return false when any check fails", () => {
      const isNonBlankString = is.all(is.string, (v) => !is.string.blank(v));
      expect(isNonBlankString("")).toBe(false);
      expect(isNonBlankString(" ")).toBe(false);
      expect(isNonBlankString(42)).toBe(false);
      expect(isNonBlankString(null)).toBe(false);
   });

   it("should work with number sub-properties", () => {
      const isPositiveInt = is.all(is.number.integer, is.number.positive);
      expect(isPositiveInt(5)).toBe(true);
      expect(isPositiveInt(-5)).toBe(false);
      expect(isPositiveInt(1.5)).toBe(false);
      expect(isPositiveInt("hello")).toBe(false);
   });

   it("should work inline without storing", () => {
      expect(is.all(is.string, (v) => !is.string.blank(v))("hello")).toBe(true);
      expect(is.all(is.string, (v) => !is.string.blank(v))("")).toBe(false);
   });
});
